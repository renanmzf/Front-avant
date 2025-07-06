-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_minutes ENABLE ROW LEVEL SECURITY;
ALTER TABLE measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE history_logs ENABLE ROW LEVEL SECURITY;

-- Create user roles enum
CREATE TYPE user_role AS ENUM ('client', 'service_provider', 'minor_admin', 'full_admin');

-- Create tables with proper structure
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'client',
    cpf_cnpj VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    client_id UUID REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'planning',
    start_date DATE,
    end_date DATE,
    budget DECIMAL(15,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id),
    user_id UUID REFERENCES users(id),
    role VARCHAR(50) NOT NULL, -- 'manager', 'viewer', etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(project_id, user_id)
);

CREATE TABLE IF NOT EXISTS contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id),
    service_provider_id UUID REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    value DECIMAL(15,2),
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id),
    contract_id UUID REFERENCES contracts(id),
    amount DECIMAL(15,2) NOT NULL,
    description TEXT,
    payment_date DATE,
    status VARCHAR(50) DEFAULT 'pending',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id),
    url VARCHAR(500) NOT NULL,
    description TEXT,
    taken_date DATE,
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS meeting_minutes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id),
    title VARCHAR(255) NOT NULL,
    content TEXT,
    meeting_date DATE,
    participants TEXT[],
    public_to_client BOOLEAN DEFAULT false,
    public_to_provider BOOLEAN DEFAULT false,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS measurements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID REFERENCES contracts(id),
    project_id UUID REFERENCES projects(id),
    service_provider_id UUID REFERENCES users(id),
    description TEXT NOT NULL,
    quantity DECIMAL(10,3),
    unit VARCHAR(20),
    unit_price DECIMAL(10,2),
    total_value DECIMAL(15,2),
    measurement_date DATE,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS history_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    table_name VARCHAR(50),
    record_id UUID,
    project_id UUID REFERENCES projects(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Helper function to get current user ID
CREATE OR REPLACE FUNCTION current_user_id() RETURNS UUID AS $$
BEGIN
    RETURN COALESCE(
        current_setting('app.current_user_id', true)::UUID,
        '00000000-0000-0000-0000-000000000000'::UUID
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to get current user role
CREATE OR REPLACE FUNCTION current_user_role() RETURNS user_role AS $$
BEGIN
    RETURN COALESCE(
        current_setting('app.current_user_role', true)::user_role,
        'client'::user_role
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user is assigned to project
CREATE OR REPLACE FUNCTION user_has_project_access(project_uuid UUID) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM project_assignments 
        WHERE project_id = project_uuid 
        AND user_id = current_user_id()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- USERS TABLE POLICIES
-- =====================================================

-- Full admins can see all users
CREATE POLICY "full_admins_all_users" ON users
    FOR ALL USING (current_user_role() = 'full_admin');

-- Users can see their own record
CREATE POLICY "users_own_record" ON users
    FOR ALL USING (id = current_user_id());

-- Minor admins can see users in their assigned projects
CREATE POLICY "minor_admins_project_users" ON users
    FOR SELECT USING (
        current_user_role() = 'minor_admin' AND
        EXISTS (
            SELECT 1 FROM project_assignments pa1
            JOIN project_assignments pa2 ON pa1.project_id = pa2.project_id
            WHERE pa1.user_id = current_user_id()
            AND pa2.user_id = users.id
        )
    );

-- =====================================================
-- PROJECTS TABLE POLICIES
-- =====================================================

-- Full admins can access all projects
CREATE POLICY "full_admins_all_projects" ON projects
    FOR ALL USING (current_user_role() = 'full_admin');

-- Clients can only see their own projects
CREATE POLICY "clients_own_projects" ON projects
    FOR SELECT USING (
        current_user_role() = 'client' AND 
        client_id = current_user_id()
    );

-- Service providers can see projects they have contracts for
CREATE POLICY "providers_contract_projects" ON projects
    FOR SELECT USING (
        current_user_role() = 'service_provider' AND
        EXISTS (
            SELECT 1 FROM contracts 
            WHERE project_id = projects.id 
            AND service_provider_id = current_user_id()
        )
    );

-- Minor admins can see assigned projects
CREATE POLICY "minor_admins_assigned_projects" ON projects
    FOR ALL USING (
        current_user_role() = 'minor_admin' AND
        user_has_project_access(projects.id)
    );

-- =====================================================
-- PAYMENTS TABLE POLICIES
-- =====================================================

-- Full admins can access all payments
CREATE POLICY "full_admins_all_payments" ON payments
    FOR ALL USING (current_user_role() = 'full_admin');

-- Clients can see payments for their projects
CREATE POLICY "clients_project_payments" ON payments
    FOR SELECT USING (
        current_user_role() = 'client' AND
        EXISTS (
            SELECT 1 FROM projects 
            WHERE id = payments.project_id 
            AND client_id = current_user_id()
        )
    );

-- Service providers can see payments for their contracts
CREATE POLICY "providers_contract_payments" ON payments
    FOR SELECT USING (
        current_user_role() = 'service_provider' AND
        EXISTS (
            SELECT 1 FROM contracts 
            WHERE id = payments.contract_id 
            AND service_provider_id = current_user_id()
        )
    );

-- Minor admins can see payments for assigned projects
CREATE POLICY "minor_admins_project_payments" ON payments
    FOR ALL USING (
        current_user_role() = 'minor_admin' AND
        user_has_project_access(payments.project_id)
    );

-- =====================================================
-- PHOTOS TABLE POLICIES
-- =====================================================

-- Full admins can access all photos
CREATE POLICY "full_admins_all_photos" ON photos
    FOR ALL USING (current_user_role() = 'full_admin');

-- Clients can see photos from their projects
CREATE POLICY "clients_project_photos" ON photos
    FOR SELECT USING (
        current_user_role() = 'client' AND
        EXISTS (
            SELECT 1 FROM projects 
            WHERE id = photos.project_id 
            AND client_id = current_user_id()
        )
    );

-- Service providers can see photos from projects they work on
CREATE POLICY "providers_project_photos" ON photos
    FOR SELECT USING (
        current_user_role() = 'service_provider' AND
        EXISTS (
            SELECT 1 FROM contracts 
            WHERE project_id = photos.project_id 
            AND service_provider_id = current_user_id()
        )
    );

-- Minor admins can manage photos for assigned projects
CREATE POLICY "minor_admins_project_photos" ON photos
    FOR ALL USING (
        current_user_role() = 'minor_admin' AND
        user_has_project_access(photos.project_id)
    );

-- =====================================================
-- MEETING MINUTES TABLE POLICIES
-- =====================================================

-- Full admins can access all meeting minutes
CREATE POLICY "full_admins_all_meetings" ON meeting_minutes
    FOR ALL USING (current_user_role() = 'full_admin');

-- Clients can see public meeting minutes from their projects
CREATE POLICY "clients_public_meetings" ON meeting_minutes
    FOR SELECT USING (
        current_user_role() = 'client' AND
        public_to_client = true AND
        EXISTS (
            SELECT 1 FROM projects 
            WHERE id = meeting_minutes.project_id 
            AND client_id = current_user_id()
        )
    );

-- Service providers can see public meeting minutes from their projects
CREATE POLICY "providers_public_meetings" ON meeting_minutes
    FOR SELECT USING (
        current_user_role() = 'service_provider' AND
        public_to_provider = true AND
        EXISTS (
            SELECT 1 FROM contracts 
            WHERE project_id = meeting_minutes.project_id 
            AND service_provider_id = current_user_id()
        )
    );

-- Minor admins can manage meeting minutes for assigned projects
CREATE POLICY "minor_admins_project_meetings" ON meeting_minutes
    FOR ALL USING (
        current_user_role() = 'minor_admin' AND
        user_has_project_access(meeting_minutes.project_id)
    );

-- =====================================================
-- MEASUREMENTS TABLE POLICIES
-- =====================================================

-- Full admins can access all measurements
CREATE POLICY "full_admins_all_measurements" ON measurements
    FOR ALL USING (current_user_role() = 'full_admin');

-- Service providers can only see their own measurements
CREATE POLICY "providers_own_measurements" ON measurements
    FOR ALL USING (
        current_user_role() = 'service_provider' AND
        service_provider_id = current_user_id()
    );

-- Clients can see measurements for their projects
CREATE POLICY "clients_project_measurements" ON measurements
    FOR SELECT USING (
        current_user_role() = 'client' AND
        EXISTS (
            SELECT 1 FROM projects 
            WHERE id = measurements.project_id 
            AND client_id = current_user_id()
        )
    );

-- Minor admins can manage measurements for assigned projects
CREATE POLICY "minor_admins_project_measurements" ON measurements
    FOR ALL USING (
        current_user_role() = 'minor_admin' AND
        user_has_project_access(measurements.project_id)
    );

-- =====================================================
-- CONTRACTS TABLE POLICIES
-- =====================================================

-- Full admins can access all contracts
CREATE POLICY "full_admins_all_contracts" ON contracts
    FOR ALL USING (current_user_role() = 'full_admin');

-- Service providers can see their own contracts
CREATE POLICY "providers_own_contracts" ON contracts
    FOR ALL USING (
        current_user_role() = 'service_provider' AND
        service_provider_id = current_user_id()
    );

-- Clients can see contracts for their projects
CREATE POLICY "clients_project_contracts" ON contracts
    FOR SELECT USING (
        current_user_role() = 'client' AND
        EXISTS (
            SELECT 1 FROM projects 
            WHERE id = contracts.project_id 
            AND client_id = current_user_id()
        )
    );

-- Minor admins can manage contracts for assigned projects
CREATE POLICY "minor_admins_project_contracts" ON contracts
    FOR ALL USING (
        current_user_role() = 'minor_admin' AND
        user_has_project_access(contracts.project_id)
    );

-- =====================================================
-- HISTORY LOGS TABLE POLICIES
-- =====================================================

-- Full admins can access all history logs
CREATE POLICY "full_admins_all_history" ON history_logs
    FOR ALL USING (current_user_role() = 'full_admin');

-- Minor admins can see history for assigned projects
CREATE POLICY "minor_admins_project_history" ON history_logs
    FOR SELECT USING (
        current_user_role() = 'minor_admin' AND
        (project_id IS NULL OR user_has_project_access(project_id))
    );

-- Users can see their own actions
CREATE POLICY "users_own_history" ON history_logs
    FOR SELECT USING (user_id = current_user_id());

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Indexes for RLS performance
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_contracts_service_provider_id ON contracts(service_provider_id);
CREATE INDEX IF NOT EXISTS idx_contracts_project_id ON contracts(project_id);
CREATE INDEX IF NOT EXISTS idx_payments_project_id ON payments(project_id);
CREATE INDEX IF NOT EXISTS idx_payments_contract_id ON payments(contract_id);
CREATE INDEX IF NOT EXISTS idx_photos_project_id ON photos(project_id);
CREATE INDEX IF NOT EXISTS idx_meeting_minutes_project_id ON meeting_minutes(project_id);
CREATE INDEX IF NOT EXISTS idx_measurements_service_provider_id ON measurements(service_provider_id);
CREATE INDEX IF NOT EXISTS idx_measurements_project_id ON measurements(project_id);
CREATE INDEX IF NOT EXISTS idx_project_assignments_user_id ON project_assignments(user_id);
CREATE INDEX IF NOT EXISTS idx_project_assignments_project_id ON project_assignments(project_id);
CREATE INDEX IF NOT EXISTS idx_history_logs_user_id ON history_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_history_logs_project_id ON history_logs(project_id);

-- =====================================================
-- EXAMPLE USAGE FUNCTIONS
-- =====================================================

-- Function to set user context (call this when user logs in)
CREATE OR REPLACE FUNCTION set_user_context(user_uuid UUID, user_role_param user_role) RETURNS VOID AS $$
BEGIN
    PERFORM set_config('app.current_user_id', user_uuid::TEXT, true);
    PERFORM set_config('app.current_user_role', user_role_param::TEXT, true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clear user context (call this when user logs out)
CREATE OR REPLACE FUNCTION clear_user_context() RETURNS VOID AS $$
BEGIN
    PERFORM set_config('app.current_user_id', '', true);
    PERFORM set_config('app.current_user_role', '', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- SAMPLE DATA FOR TESTING
-- =====================================================

-- Insert sample users
INSERT INTO users (id, email, name, role) VALUES
    ('11111111-1111-1111-1111-111111111111', 'admin@avantgarde.com', 'Admin Full', 'full_admin'),
    ('22222222-2222-2222-2222-222222222222', 'minor@avantgarde.com', 'Admin Minor', 'minor_admin'),
    ('33333333-3333-3333-3333-333333333333', 'client@example.com', 'João Silva', 'client'),
    ('44444444-4444-4444-4444-444444444444', 'provider@example.com', 'Construções ABC', 'service_provider')
ON CONFLICT (id) DO NOTHING;

-- Insert sample project
INSERT INTO projects (id, name, client_id, status) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Residência Alphaville', '33333333-3333-3333-3333-333333333333', 'in_progress')
ON CONFLICT (id) DO NOTHING;

-- Assign minor admin to project
INSERT INTO project_assignments (project_id, user_id, role) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222', 'manager')
ON CONFLICT (project_id, user_id) DO NOTHING;

-- =====================================================
-- TESTING QUERIES
-- =====================================================

/*
-- Test as client
SELECT set_user_context('33333333-3333-3333-3333-333333333333', 'client');
SELECT * FROM projects; -- Should only see their own projects

-- Test as service provider
SELECT set_user_context('44444444-4444-4444-4444-444444444444', 'service_provider');
SELECT * FROM projects; -- Should only see projects they have contracts for

-- Test as minor admin
SELECT set_user_context('22222222-2222-2222-2222-222222222222', 'minor_admin');
SELECT * FROM projects; -- Should only see assigned projects

-- Test as full admin
SELECT set_user_context('11111111-1111-1111-1111-111111111111', 'full_admin');
SELECT * FROM projects; -- Should see all projects
*/
