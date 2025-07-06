'use client';

import { useState, useMemo } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
    Plus,
    DollarSign,
    TrendingUp,
    TrendingDown,
    FileText,
    Building2,
    Users,
    ArrowUpRight,
    ArrowDownLeft,
    Eye,
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import ContractManagementScreen from './contract-management-screen';

interface Payment {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: 'received' | 'paid';
    contractId: string;
    status: 'pending' | 'completed' | 'cancelled';
    method: 'transfer' | 'check' | 'cash' | 'pix';
    reference?: string;
    notes?: string;
}

interface Contract {
    id: string;
    title: string;
    projectId: string;
    projectName: string;
    clientName?: string;
    supplierName?: string;
    type: 'client' | 'supplier';
    totalValue: number;
    paidValue: number;
    receivedValue: number;
    balanceValue: number;
    expectedProfit: number;
    actualProfit: number;
    profitMargin: number;
    status: 'active' | 'completed' | 'paused' | 'cancelled';
    startDate: string;
    endDate?: string;
    description: string;
    payments: Payment[];
}

interface MonthlyFlow {
    month: string;
    received: number;
    paid: number;
    balance: number;
}

interface ContractsFinancialManagementProps {
    projectId?: string;
    userType: 'admin';
}

export function ContractsFinancialManagement({
    projectId,
    userType,
}: ContractsFinancialManagementProps) {
    const [contracts, setContracts] = useState<Contract[]>([
        {
            id: 'c1',
            title: 'Contrato Principal - Residência Alphaville',
            projectId: '1',
            projectName: 'Residência Alphaville',
            clientName: 'João Silva',
            type: 'client',
            totalValue: 150000,
            paidValue: 0,
            receivedValue: 75000,
            balanceValue: 75000,
            expectedProfit: 45000,
            actualProfit: 25000,
            profitMargin: 30,
            status: 'active',
            startDate: '2024-01-15',
            description:
                'Projeto arquitetônico e administração de obra completa',
            payments: [
                {
                    id: 'p1',
                    date: '2024-01-20',
                    description: 'Primeira parcela - Projeto',
                    amount: 45000,
                    type: 'received',
                    contractId: 'c1',
                    status: 'completed',
                    method: 'transfer',
                    reference: 'TED-001234',
                },
                {
                    id: 'p2',
                    date: '2024-02-15',
                    description: 'Segunda parcela - Início da obra',
                    amount: 30000,
                    type: 'received',
                    contractId: 'c1',
                    status: 'completed',
                    method: 'pix',
                    reference: 'PIX-567890',
                },
            ],
        },
        {
            id: 'c2',
            title: 'João Silva Construções - Estrutura',
            projectId: '1',
            projectName: 'Residência Alphaville',
            supplierName: 'João Silva Construções',
            type: 'supplier',
            totalValue: 85000,
            paidValue: 45000,
            receivedValue: 0,
            balanceValue: -45000,
            expectedProfit: -85000,
            actualProfit: -45000,
            profitMargin: 0,
            status: 'active',
            startDate: '2024-01-20',
            description: 'Execução de estrutura e fundação',
            payments: [
                {
                    id: 'p3',
                    date: '2024-01-25',
                    description: 'Pagamento - Fundação concluída',
                    amount: 25000,
                    type: 'paid',
                    contractId: 'c2',
                    status: 'completed',
                    method: 'transfer',
                    reference: 'TED-002345',
                },
                {
                    id: 'p4',
                    date: '2024-02-20',
                    description: 'Pagamento - Estrutura 50%',
                    amount: 20000,
                    type: 'paid',
                    contractId: 'c2',
                    status: 'completed',
                    method: 'transfer',
                    reference: 'TED-003456',
                },
            ],
        },
        {
            id: 'c3',
            title: 'Elétrica Santos - Instalações',
            projectId: '1',
            projectName: 'Residência Alphaville',
            supplierName: 'Elétrica Santos',
            type: 'supplier',
            totalValue: 15000,
            paidValue: 7500,
            receivedValue: 0,
            balanceValue: -7500,
            expectedProfit: -15000,
            actualProfit: -7500,
            profitMargin: 0,
            status: 'active',
            startDate: '2024-02-01',
            description: 'Instalações elétricas completas',
            payments: [
                {
                    id: 'p5',
                    date: '2024-02-10',
                    description: 'Adiantamento - Material elétrico',
                    amount: 7500,
                    type: 'paid',
                    contractId: 'c3',
                    status: 'completed',
                    method: 'pix',
                    reference: 'PIX-789012',
                },
            ],
        },
    ]);

    const [selectedContract, setSelectedContract] = useState<string | null>(
        null
    );
    const [isAddingPayment, setIsAddingPayment] = useState(false);
    const [newPayment, setNewPayment] = useState<Partial<Payment>>({
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        method: 'transfer',
    });

    // Filter contracts by project if specified
    const filteredContracts = useMemo(() => {
        if (projectId) {
            return contracts.filter(
                (contract) => contract.projectId === projectId
            );
        }
        return contracts;
    }, [contracts, projectId]);

    // Calculate monthly cash flow
    const monthlyFlow = useMemo(() => {
        const flowMap = new Map<string, { received: number; paid: number }>();

        contracts.forEach((contract) => {
            contract.payments.forEach((payment) => {
                if (payment.status === 'completed') {
                    const monthKey = payment.date.substring(0, 7); // YYYY-MM
                    const existing = flowMap.get(monthKey) || {
                        received: 0,
                        paid: 0,
                    };

                    if (payment.type === 'received') {
                        existing.received += payment.amount;
                    } else {
                        existing.paid += payment.amount;
                    }

                    flowMap.set(monthKey, existing);
                }
            });
        });

        const sortedMonths = Array.from(flowMap.keys()).sort();
        return sortedMonths.map((month) => {
            const data = flowMap.get(month)!;
            return {
                month: new Date(month + '-01').toLocaleDateString('pt-BR', {
                    month: 'short',
                    year: '2-digit',
                }),
                received: data.received,
                paid: data.paid,
                balance: data.received - data.paid,
            };
        });
    }, [contracts]);

    // Calculate totals
    const totals = useMemo(() => {
        const clientContracts = filteredContracts.filter(
            (c) => c.type === 'client'
        );
        const supplierContracts = filteredContracts.filter(
            (c) => c.type === 'supplier'
        );

        const totalReceived = clientContracts.reduce(
            (sum, c) => sum + c.receivedValue,
            0
        );
        const totalPaid = supplierContracts.reduce(
            (sum, c) => sum + c.paidValue,
            0
        );
        const totalExpected = clientContracts.reduce(
            (sum, c) => sum + c.totalValue,
            0
        );
        const totalCommitted = supplierContracts.reduce(
            (sum, c) => sum + c.totalValue,
            0
        );
        const currentProfit = totalReceived - totalPaid;
        const expectedProfit = totalExpected - totalCommitted;

        return {
            totalReceived,
            totalPaid,
            totalExpected,
            totalCommitted,
            currentProfit,
            expectedProfit,
            profitMargin:
                totalExpected > 0 ? (expectedProfit / totalExpected) * 100 : 0,
        };
    }, [filteredContracts]);

    const handleAddPayment = () => {
        if (newPayment.amount && newPayment.description && selectedContract) {
            const payment: Payment = {
                id: Date.now().toString(),
                date: newPayment.date || new Date().toISOString().split('T')[0],
                description: newPayment.description,
                amount: newPayment.amount,
                type: newPayment.type as 'received' | 'paid',
                contractId: selectedContract,
                status:
                    (newPayment.status as 'pending' | 'completed') || 'pending',
                method:
                    (newPayment.method as
                        | 'transfer'
                        | 'check'
                        | 'cash'
                        | 'pix') || 'transfer',
                reference: newPayment.reference,
                notes: newPayment.notes,
            };

            // Update contract
            setContracts((prev) =>
                prev.map((contract) => {
                    if (contract.id === selectedContract) {
                        const updatedPayments = [...contract.payments, payment];
                        const newPaidValue =
                            payment.type === 'paid' &&
                            payment.status === 'completed'
                                ? contract.paidValue + payment.amount
                                : contract.paidValue;
                        const newReceivedValue =
                            payment.type === 'received' &&
                            payment.status === 'completed'
                                ? contract.receivedValue + payment.amount
                                : contract.receivedValue;

                        return {
                            ...contract,
                            payments: updatedPayments,
                            paidValue: newPaidValue,
                            receivedValue: newReceivedValue,
                            balanceValue:
                                contract.type === 'client'
                                    ? contract.totalValue - newReceivedValue
                                    : newPaidValue - contract.totalValue,
                            actualProfit:
                                contract.type === 'client'
                                    ? newReceivedValue
                                    : -newPaidValue,
                        };
                    }
                    return contract;
                })
            );

            setNewPayment({
                date: new Date().toISOString().split('T')[0],
                status: 'pending',
                method: 'transfer',
            });
            setIsAddingPayment(false);
        }
    };

    const getContractProgress = (contract: Contract) => {
        if (contract.type === 'client') {
            return (contract.receivedValue / contract.totalValue) * 100;
        }
        return (contract.paidValue / contract.totalValue) * 100;
    };

    const COLORS = ['#4A7C59', '#E97451', '#8884d8', '#82ca9d'];

    return (
        <div className="space-y-6">
            {/* CONTRATO COM UM PROJETO VINCULADO */}
            <ContractManagementScreen />
        </div>
    );
}
