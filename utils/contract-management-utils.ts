export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('pt-BR');
};

export const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`;
};

export const generateContractNumber = (): string => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, '0');
    return `CONT-${year}-${random}`;
};

export const calculateContractTotal = (paymentTerms: any[]): number => {
    return paymentTerms.reduce((total, term) => total + term.amount, 0);
};

export const validateContractForm = (data: any): string[] => {
    const errors: string[] = [];

    if (!data.title?.trim()) {
        errors.push('Título do contrato é obrigatório');
    }

    if (!data.description?.trim()) {
        errors.push('Descrição do contrato é obrigatória');
    }

    if (!data.type) {
        errors.push('Tipo de contrato é obrigatório');
    }

    if (!data.value || data.value <= 0) {
        errors.push('Valor do contrato deve ser maior que zero');
    }

    if (!data.startDate) {
        errors.push('Data de início é obrigatória');
    }

    if (data.paymentTerms?.length === 0) {
        errors.push('Pelo menos um termo de pagamento é obrigatório');
    }

    return errors;
};
