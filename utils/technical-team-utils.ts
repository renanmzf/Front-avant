export const formatPhone = (phone: string): string => {
    return phone;
};

export const getRegistryColor = (registryType: string): string => {
    const colors = {
        CAU: 'bg-blue-100 text-blue-800',
        CREA: 'bg-green-100 text-green-800',
        CFT: 'bg-purple-100 text-purple-800',
        CRQ: 'bg-orange-100 text-orange-800',
        OUTROS: 'bg-gray-100 text-gray-800',
    };
    return (
        colors[registryType as keyof typeof colors] ||
        'bg-gray-100 text-gray-800'
    );
};

export const getRoleIcon = (role: string): string => {
    const icons = {
        'Arquiteta Responsável': '🏗️',
        'Projetista Estrutural': '🏢',
        'Projetista Hidráulico': '🚰',
        'Projetista Elétrica': '⚡',
        'Responsável Técnico': '👷',
        Paisagista: '🌳',
        'Projetista de Ar Condicionado': '❄️',
        'Projetista de Incêndio': '🚒',
        'Consultor Ambiental': '🌱',
        'Coordenador de Projetos': '📋',
    };
    return icons[role as keyof typeof icons] || '👨‍💼';
};

export const contactProfessional = (phone: string): void => {
    const cleanPhone = phone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/55${cleanPhone}`;
    window.open(whatsappUrl, '_blank');
};

export const emailProfessional = (email: string): void => {
    window.location.href = `mailto:${email}`;
};
