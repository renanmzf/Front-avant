export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('pt-BR');
};

export const calculateTotalPaid = (payments: any[]): number => {
    return payments
        .filter((payment) => payment.status === 'paid')
        .reduce((total, payment) => total + payment.amount, 0);
};

export const calculatePendingAmount = (payments: any[]): number => {
    return payments
        .filter(
            (payment) =>
                payment.status === 'pending' || payment.status === 'overdue'
        )
        .reduce((total, payment) => total + payment.amount, 0);
};

export const getOverduePayments = (payments: any[]): any[] => {
    const today = new Date();
    return payments.filter((payment) => {
        if (payment.status !== 'pending') return false;
        const dueDate = new Date(payment.dueDate);
        return dueDate < today;
    });
};

export const getProjectCardColor = (index: number): string => {
    const colors = [
        'bg-blue-50 border-blue-200',
        'bg-green-50 border-green-200',
        'bg-purple-50 border-purple-200',
        'bg-orange-50 border-orange-200',
        'bg-pink-50 border-pink-200',
        'bg-indigo-50 border-indigo-200',
    ];
    return colors[index % colors.length];
};
