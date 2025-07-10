'use client';

import { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
    Building2,
    Camera,
    MessageSquare,
    CheckCircle,
    Clock,
    Eye,
    BarChart3,
    ChevronLeft,
    ChevronRight,
    HardHat,
    Download,
    TrendingUp,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CollapsibleSidebar } from '@/components/collapsible-sidebar';
import { ExpandableContractsView } from '@/components/expandable-contracts-view';
import { EnhancedPhotoUpload } from '@/components/enhanced-photo-upload';
import { EnhancedDocumentUpload } from '@/components/enhanced-document-upload';
import { ChatComponent } from '@/components/chat-component';
import { MeetingMinutes } from '@/components/meeting-minutes';
import { ClientFinancialDetailed } from '@/components/client-financial-detailed';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { Slider } from '@/components/ui/slider';
import RDOVisualizationScreen from '@/components/rdo-visualization-screen';
import ConstructionDisplay from '@/components/construction-display';
import PlanningManagement from '@/components/planning-management';

interface Expense {
    id: string;
    date: string;
    nf: string;
    description: string;
    supplier: string;
    phase: string;
    class: string;
    type: string;
    cost: number;
    paymentMethod: string;
}

export default function ClientePage() {
    const router = useRouter();
    const [selectedProject, setSelectedProject] = useState<string>('1');
    const [activeTab, setActiveTab] = useState('projetos');
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const [expenses] = useState<Expense[]>([
        {
            id: '1',
            date: '2024-01-15',
            nf: 'NF-001',
            description: 'Concreto usinado FCK 25',
            supplier: 'Concreteira São Paulo',
            phase: 'Estrutura',
            class: 'Concreto',
            type: 'Material',
            cost: 15000,
            paymentMethod: 'PIX',
        },
        {
            id: '2',
            date: '2024-01-18',
            nf: 'NF-002',
            description: 'Ferragem CA-50 12mm',
            supplier: 'Aços Bragança',
            phase: 'Estrutura',
            class: 'Aço',
            type: 'Material',
            cost: 8500,
            paymentMethod: 'Transferência',
        },
        {
            id: '3',
            date: '2024-01-20',
            nf: 'NF-003',
            description: 'Pedreiro especializado',
            supplier: 'João Silva Construções',
            phase: 'Alvenarias e Reboco',
            class: 'Mão de obra especializada',
            type: 'Mão de obra',
            cost: 3200,
            paymentMethod: 'Cheque',
        },
        {
            id: '4',
            date: '2024-01-25',
            nf: 'NF-004',
            description: 'Tijolos cerâmicos',
            supplier: 'Cerâmica Moderna',
            phase: 'Alvenarias e Reboco',
            class: 'Cerâmica',
            type: 'Material',
            cost: 2800,
            paymentMethod: 'Dinheiro',
        },
        {
            id: '5',
            date: '2024-02-01',
            nf: 'NF-005',
            description: 'Tubulações PVC',
            supplier: 'Hidráulica Total',
            phase: 'Instalações hidráulicas',
            class: 'PVC',
            type: 'Material',
            cost: 1200,
            paymentMethod: 'PIX',
        },
        {
            id: '6',
            date: '2024-02-05',
            nf: 'NF-006',
            description: 'Fios e cabos elétricos',
            supplier: 'Elétrica Santos',
            phase: 'Instalações elétricas',
            class: 'Fios e cabos',
            type: 'Material',
            cost: 1800,
            paymentMethod: 'Transferência',
        },
        {
            id: '7',
            date: '2024-02-10',
            nf: 'NF-007',
            description: 'Telhas cerâmicas',
            supplier: 'Telhas & Coberturas',
            phase: 'Telhado e forro',
            class: 'Cerâmica',
            type: 'Material',
            cost: 4500,
            paymentMethod: 'Cheque',
        },
        {
            id: '8',
            date: '2024-02-15',
            nf: 'NF-008',
            description: 'Porcelanato 60x60',
            supplier: 'Revestimentos Premium',
            phase: 'Revestimento piso e parede',
            class: 'Cerâmica',
            type: 'Material',
            cost: 6200,
            paymentMethod: 'Dinheiro',
        },
        {
            id: '9',
            date: '2024-03-01',
            nf: 'NF-009',
            description: 'Tinta acrílica premium',
            supplier: 'Tintas & Cores',
            phase: 'Pintura',
            class: 'Tinta',
            type: 'Material',
            cost: 1800,
            paymentMethod: 'PIX',
        },
        {
            id: '10',
            date: '2024-03-05',
            nf: 'NF-010',
            description: 'Pintor especializado',
            supplier: 'Pinturas Profissionais',
            phase: 'Pintura',
            class: 'Mão de obra especializada',
            type: 'Mão de obra',
            cost: 2400,
            paymentMethod: 'Transferência',
        },
    ]);

    const projects = [
        {
            id: '1',
            name: 'Residência Familiar - Alphaville',
            status: 'Em Andamento',
            progress: 65,
            startDate: '2024-01-15',
            expectedEnd: '2024-08-30',
            contractType: 'Projeto + Administração de Obra',
        },
        {
            id: '2',
            name: 'Reforma Comercial - Centro',
            status: 'Finalizado',
            progress: 100,
            startDate: '2023-10-01',
            expectedEnd: '2024-02-15',
            contractType: 'Obra',
        },
    ];

    useEffect(() => {
        const lastProject = localStorage.getItem('lastAccessedProject');
        if (lastProject) {
            setSelectedProject(lastProject);
        }
    }, []);

    const [phases, setPhases] = useState([
        { name: 'Fundações', progress: 100, status: 'completed' },
        { name: 'Estrutura', progress: 85, status: 'in-progress' },
        { name: 'Mão de obra', progress: 85, status: 'in-progress' },
        { name: 'Alvenaria', progress: 45, status: 'in-progress' },
        { name: 'Administração', progress: 45, status: 'in-progress' },
        { name: 'Projetos e aprovações', progress: 45, status: 'in-progress' },
        { name: 'Telhado e forro', progress: 45, status: 'in-progress' },
        {
            name: 'Portas, janelas e vidros',
            progress: 45,
            status: 'in-progress',
        },
        { name: 'Instalação hidáulica', progress: 45, status: 'in-progress' },
        { name: 'Instalação Elétrica', progress: 45, status: 'in-progress' },
        { name: 'Serviços preliminares', progress: 45, status: 'in-progress' },
        { name: 'Cobertura', progress: 0, status: 'pending' },
        { name: 'Pintura interna e externa', progress: 0, status: 'pending' },
        { name: 'Revestimento piso e parede', progress: 0, status: 'pending' },
        { name: 'Paredes e reboco', progress: 0, status: 'pending' },
        { name: 'Bancadas, louças e metais', progress: 0, status: 'pending' },
        { name: 'Serviços complementares', progress: 0, status: 'pending' },
        { name: 'Instalações complementares', progress: 0, status: 'pending' },
        { name: 'Instalações', progress: 0, status: 'pending' },
        { name: 'Acabamento', progress: 0, status: 'pending' },
    ]);

    const handleSliderChange = (index: number, value: number) => {
        const updated = [...phases];
        updated[index].progress = value;
        setPhases(updated);
    };

    const projectInfo = {
        area: 180,
        address: 'Rua das Flores, 123 - Alphaville, Barueri/SP',
        startDate: '2024-01-15',
        endDate: '2025-01-15',
        workType: 'Residência Unifamiliar',
        owner: 'João Silva',
        totalCost: 450000,
        constructionPermit: 'ALV-2024-001234',
        permitExpiry: '2025-01-15',
    };

    const technicalResponsibles = {
        obra: {
            name: 'Eng. Carlos Silva',
            registration: 'CREA-SP 123456789',
            email: 'carlos.silva@avantgarde.com',
            phone: '(11) 99999-1111',
            specialty: 'Engenharia Civil - Execução de Obras',
            icon: HardHat,
            color: 'text-orange-600',
        },
        arquitetura: {
            name: 'Arq. Maria Santos',
            registration: 'CAU-SP 987654321',
            email: 'maria.santos@avantgarde.com',
            phone: '(11) 99999-2222',
            specialty: 'Arquitetura e Urbanismo',
            icon: Building2,
            color: 'text-blue-600',
        },
    };

    const recentPhotos = [
        {
            id: 1,
            date: '2024-03-01',
            description: 'Progresso da alvenaria',
            projectId: '1',
            imageUrl:
                '/placeholder.svg?height=300&width=400&text=Alvenaria+em+progresso',
        },
        {
            id: 2,
            date: '2024-02-28',
            description: 'Estrutura concluída',
            projectId: '1',
            imageUrl:
                '/placeholder.svg?height=300&width=400&text=Estrutura+concluída',
        },
        {
            id: 3,
            date: '2024-02-15',
            description: 'Concretagem da laje',
            projectId: '1',
            imageUrl:
                '/placeholder.svg?height=300&width=400&text=Concretagem+da+laje',
        },
    ];

    const rdoList = [
        {
            id: 169,
            date: '2024-03-01',
            project: 'Residência Alphaville',
            activities: 'Execução de superestrutura, alvenaria',
            weather: 'Nublado/Claro',
            workforce: 6,
        },
        {
            id: 168,
            date: '2024-02-29',
            project: 'Residência Alphaville',
            activities: 'Montagem de lajes pré-fabricadas',
            weather: 'Ensolarado',
            workforce: 5,
        },
        {
            id: 167,
            date: '2024-02-28',
            project: 'Residência Alphaville',
            activities: 'Concretagem da estrutura',
            weather: 'Parcialmente nublado',
            workforce: 8,
        },
    ];

    // Dados de gastos mensais para o gráfico
    const monthlyExpenses = [
        { month: 'Jan', value: 45000 },
        { month: 'Fev', value: 38000 },
        { month: 'Mar', value: 52000 },
        { month: 'Abr', value: 41000 },
        { month: 'Mai', value: 47000 },
        { month: 'Jun', value: 35000 },
        { month: 'Jul', value: 0 },
        { month: 'Ago', value: 0 },
        { month: 'Set', value: 0 },
        { month: 'Out', value: 0 },
        { month: 'Nov', value: 0 },
        { month: 'Dez', value: 0 },
    ];

    const selectedProjectData = projects.find((p) => p.id === selectedProject);

    const nextPhoto = () => {
        setCurrentPhotoIndex((prev) => (prev + 1) % recentPhotos.length);
    };

    const prevPhoto = () => {
        setCurrentPhotoIndex(
            (prev) => (prev - 1 + recentPhotos.length) % recentPhotos.length
        );
    };

    const handleDownloadReceipt = (receiptName: string) => {
        console.log('Baixando recibo:', receiptName);
        const link = document.createElement('a');
        link.href = `/placeholder.pdf?name=${receiptName}`;
        link.download = receiptName;
        link.click();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                {/* Sidebar Recolhível */}
                <CollapsibleSidebar
                    userType="client"
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    onExit={() => router.push('/')}
                    isCollapsed={isCollapsed}
                    onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
                />

                {/* Main Content com margem dinâmica */}
                <div
                    className="flex-1 p-6 transition-all duration-300"
                    style={{ marginLeft: isCollapsed ? '4rem' : '16rem' }}
                >
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {selectedProjectData?.name}
                                </h1>
                                <p className="text-gray-600">
                                    {selectedProjectData?.status} •{' '}
                                    {selectedProjectData?.progress}% concluído
                                </p>
                                <p className="text-sm text-gray-500">
                                    Contrato:{' '}
                                    {selectedProjectData?.contractType}
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Label className="text-sm font-medium">
                                    Projeto:
                                </Label>
                                <Select
                                    value={selectedProject}
                                    onValueChange={setSelectedProject}
                                >
                                    <SelectTrigger className="w-64">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {projects.map((project) => (
                                            <SelectItem
                                                key={project.id}
                                                value={project.id}
                                            >
                                                {project.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button onClick={() => setActiveTab('chat')}>
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Fale conosco
                                </Button>
                            </div>
                        </div>

                        {activeTab === 'projetos' && (
                            <div className="space-y-6">
                                {/* Project Info Card */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                                            Informações Gerais do Projeto
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-600">
                                                    Proprietário
                                                </p>
                                                <p className="font-medium">
                                                    {projectInfo.owner}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-600">
                                                    Tipo de Obra
                                                </p>
                                                <p className="font-medium">
                                                    {projectInfo.workType}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-600">
                                                    Área Total
                                                </p>
                                                <p className="font-medium">
                                                    {projectInfo.area} m²
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-600">
                                                    Endereço
                                                </p>
                                                <p className="font-medium">
                                                    {projectInfo.address}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-600">
                                                    Data de Início
                                                </p>
                                                <p className="font-medium">
                                                    {new Date(
                                                        projectInfo.startDate
                                                    ).toLocaleDateString(
                                                        'pt-BR'
                                                    )}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-600">
                                                    Previsão de Término
                                                </p>
                                                <p className="font-medium">
                                                    {new Date(
                                                        projectInfo.endDate
                                                    ).toLocaleDateString(
                                                        'pt-BR'
                                                    )}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-600">
                                                    Custo Total Atual
                                                </p>
                                                <p className="font-medium text-blue-600">
                                                    R${' '}
                                                    {projectInfo.totalCost.toLocaleString(
                                                        'pt-BR'
                                                    )}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-600">
                                                    Custo por m²
                                                </p>
                                                <p className="font-medium text-blue-600">
                                                    R${' '}
                                                    {(
                                                        projectInfo.totalCost /
                                                        projectInfo.area
                                                    ).toLocaleString('pt-BR')}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-600">
                                                    Status
                                                </p>
                                                <Badge variant="default">
                                                    {
                                                        selectedProjectData?.status
                                                    }
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Gastos Totais ao Longo do Ano */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                                            Gastos Totais ao Longo do Ano - 2024
                                        </CardTitle>
                                        <CardDescription>
                                            Evolução mensal dos investimentos na
                                            obra
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-80">
                                            <ResponsiveContainer
                                                width="100%"
                                                height="100%"
                                            >
                                                <BarChart
                                                    data={monthlyExpenses}
                                                >
                                                    <CartesianGrid
                                                        strokeDasharray="3 3"
                                                        stroke="#f0f0f0"
                                                    />
                                                    <XAxis
                                                        dataKey="month"
                                                        stroke="#666"
                                                        fontSize={12}
                                                    />
                                                    <YAxis
                                                        stroke="#666"
                                                        fontSize={12}
                                                        tickFormatter={(
                                                            value
                                                        ) =>
                                                            `R$ ${(
                                                                value / 1000
                                                            ).toFixed(0)}k`
                                                        }
                                                    />
                                                    <Tooltip
                                                        formatter={(
                                                            value: number
                                                        ) => [
                                                            `R$ ${value.toLocaleString(
                                                                'pt-BR'
                                                            )}`,
                                                            'Gastos',
                                                        ]}
                                                        labelFormatter={(
                                                            label
                                                        ) => `Mês: ${label}`}
                                                        contentStyle={{
                                                            backgroundColor:
                                                                '#fff',
                                                            border: '1px solid #e2e8f0',
                                                            borderRadius: '8px',
                                                        }}
                                                    />
                                                    <Bar
                                                        dataKey="value"
                                                        fill="#4A7C59"
                                                        radius={[4, 4, 0, 0]}
                                                    />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                                            <div className="p-3 bg-green-50 rounded-lg">
                                                <p className="text-sm text-gray-600">
                                                    Total Investido
                                                </p>
                                                <p className="text-lg font-bold text-green-600">
                                                    R$ 258.000
                                                </p>
                                            </div>
                                            <div className="p-3 bg-blue-50 rounded-lg">
                                                <p className="text-sm text-gray-600">
                                                    Média Mensal
                                                </p>
                                                <p className="text-lg font-bold text-blue-600">
                                                    R$ 43.000
                                                </p>
                                            </div>

                                            <div className="p-3 bg-purple-50 rounded-lg">
                                                <p className="text-sm text-gray-600">
                                                    Meses Ativos
                                                </p>
                                                <p className="text-lg font-bold text-purple-600">
                                                    6 meses
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Progress Overview */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                                            Progresso da Obra
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent>
                                        {/* Container com scroll - altura máxima definida */}
                                        <div className="space-y-6 max-h-80 overflow-y-auto pr-2">
                                            {phases.map((phase, index) => (
                                                <div
                                                    key={index}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-2">
                                                            {phase.status ===
                                                                'completed' && (
                                                                <CheckCircle className="h-4 w-4 text-green-600" />
                                                            )}
                                                            {phase.status ===
                                                                'in-progress' && (
                                                                <Clock className="h-4 w-4 text-blue-600" />
                                                            )}
                                                            {phase.status ===
                                                                'pending' && (
                                                                <Clock className="h-4 w-4 text-gray-400" />
                                                            )}
                                                            <span className="font-medium">
                                                                {phase.name}
                                                            </span>
                                                        </div>
                                                        <span className="text-sm text-gray-600">
                                                            {phase.progress}%
                                                        </span>
                                                    </div>

                                                    <Slider
                                                        value={[phase.progress]}
                                                        min={0}
                                                        disabled
                                                        max={100}
                                                        step={1}
                                                        onValueChange={(
                                                            value
                                                        ) =>
                                                            handleSliderChange(
                                                                index,
                                                                value[0]
                                                            )
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Carrossel de Fotos Recentes */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Camera className="h-5 w-5 mr-2 text-blue-600" />
                                            Fotos Recentes
                                        </CardTitle>
                                        <CardDescription>
                                            Últimas atualizações fotográficas
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="relative">
                                            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                                                <img
                                                    src={
                                                        recentPhotos[
                                                            currentPhotoIndex
                                                        ]?.imageUrl ||
                                                        '/placeholder.svg'
                                                    }
                                                    alt={
                                                        recentPhotos[
                                                            currentPhotoIndex
                                                        ]?.description
                                                    }
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="flex items-center justify-between mb-4">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={prevPhoto}
                                                    disabled={
                                                        recentPhotos.length <= 1
                                                    }
                                                >
                                                    <ChevronLeft className="h-4 w-4" />
                                                </Button>

                                                <div className="text-center">
                                                    <p className="font-medium">
                                                        {
                                                            recentPhotos[
                                                                currentPhotoIndex
                                                            ]?.description
                                                        }
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {new Date(
                                                            recentPhotos[
                                                                currentPhotoIndex
                                                            ]?.date
                                                        ).toLocaleDateString(
                                                            'pt-BR'
                                                        )}
                                                    </p>
                                                </div>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={nextPhoto}
                                                    disabled={
                                                        recentPhotos.length <= 1
                                                    }
                                                >
                                                    <ChevronRight className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            <div className="flex justify-center space-x-2">
                                                {recentPhotos.map(
                                                    (_, index) => (
                                                        <button
                                                            key={index}
                                                            className={`w-2 h-2 rounded-full ${
                                                                index ===
                                                                currentPhotoIndex
                                                                    ? 'bg-blue-600'
                                                                    : 'bg-gray-300'
                                                            }`}
                                                            onClick={() =>
                                                                setCurrentPhotoIndex(
                                                                    index
                                                                )
                                                            }
                                                        />
                                                    )
                                                )}
                                            </div>

                                            <div className="mt-4">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="w-full"
                                                    onClick={() =>
                                                        setActiveTab('fotos')
                                                    }
                                                >
                                                    <Eye className="h-4 w-4 mr-1" />
                                                    Ver Todas as Fotos
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {activeTab === 'financeiro' && (
                            <div className="space-y-6">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Resumo Financeiro
                                </h1>
                                <ClientFinancialDetailed
                                    projectId={selectedProject}
                                    expenses={expenses}
                                />
                            </div>
                        )}

                        {activeTab === 'planning' && (
                            <div className="space-y-6">
                                <PlanningManagement />
                            </div>
                        )}

                        {activeTab === 'contratos' && (
                            <div className="space-y-6">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Contratos
                                </h1>
                                <ExpandableContractsView userType="client" />
                            </div>
                        )}

                        {activeTab === 'fotos' && (
                            <div className="space-y-6">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Galeria de Fotos
                                </h1>
                                <EnhancedPhotoUpload
                                    projectId={selectedProject}
                                    projectName={
                                        selectedProjectData?.name || 'Projeto'
                                    }
                                />
                            </div>
                        )}

                        {activeTab === 'documents' && (
                            <div className="space-y-6">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Documentos
                                </h1>
                                <EnhancedDocumentUpload
                                    projectId={selectedProject}
                                    projectName={
                                        selectedProjectData?.name || 'Projeto'
                                    }
                                />
                            </div>
                        )}

                        {activeTab === 'dados-obra' && (
                            <div className="space-y-6">
                                <ConstructionDisplay />
                            </div>
                        )}

                        {activeTab === 'rdo' && (
                            <div className="space-y-6">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Relatórios Diários de Obra (RDO)
                                </h1>

                                <Card>
                                    <CardContent>
                                        <RDOVisualizationScreen />
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {activeTab === 'atas' && (
                            <div className="space-y-6">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Atas de Reunião
                                </h1>
                                <MeetingMinutes
                                    userType="client"
                                    userId="cliente1"
                                    projectId={selectedProject}
                                />
                            </div>
                        )}

                        {activeTab === 'chat' && (
                            <div className="space-y-6">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Fale Conosco
                                </h1>
                                <ChatComponent
                                    userType="client"
                                    userId="cliente1"
                                    projectId={selectedProject}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
