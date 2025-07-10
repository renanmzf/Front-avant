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
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Search,
    Filter,
    BarChart3,
    LucidePieChart,
    Download,
    FileText,
    Calculator,
} from 'lucide-react';
import { constructionWBS } from './construction-wbs-data';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import CostAnalysisScreen from './cost-analysis-screen';
import { usePlanningManagement } from '@/hooks/use-planning-management';
import { CreateExecutionForm } from './create-execution-form';

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

interface ExpensesByPhasesProps {
    projectId: string;
    projectName: string;
}

export function ExpensesByPhases({
    projectId,
    projectName,
}: ExpensesByPhasesProps) {
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
            paymentMethod: 'Boleto',
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
            paymentMethod: 'Dinheiro',
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
            paymentMethod: 'Cartão de crédito',
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
            paymentMethod: 'Boleto',
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
            paymentMethod: 'Dinheiro',
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
            paymentMethod: 'Cartão de crédito',
        },
    ]);

    // Filters state
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPhases, setSelectedPhases] = useState<string[]>([]);
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    // Get unique values for filters
    const uniquePhases = [...new Set(expenses.map((e) => e.phase))];
    const uniqueClasses = [...new Set(expenses.map((e) => e.class))];
    const uniqueTypes = [...new Set(expenses.map((e) => e.type))];
    const uniqueSuppliers = [...new Set(expenses.map((e) => e.supplier))];

    // Filter expenses
    const filteredExpenses = useMemo(() => {
        return expenses.filter((expense) => {
            const matchesSearch =
                expense.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                expense.supplier
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                expense.nf.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesPhase =
                selectedPhases.length === 0 ||
                selectedPhases.includes(expense.phase);
            const matchesClass =
                selectedClasses.length === 0 ||
                selectedClasses.includes(expense.class);
            const matchesType =
                selectedTypes.length === 0 ||
                selectedTypes.includes(expense.type);
            const matchesSupplier =
                selectedSuppliers.length === 0 ||
                selectedSuppliers.includes(expense.supplier);

            const matchesDateFrom = !dateFrom || expense.date >= dateFrom;
            const matchesDateTo = !dateTo || expense.date <= dateTo;

            return (
                matchesSearch &&
                matchesPhase &&
                matchesClass &&
                matchesType &&
                matchesSupplier &&
                matchesDateFrom &&
                matchesDateTo
            );
        });
    }, [
        expenses,
        searchTerm,
        selectedPhases,
        selectedClasses,
        selectedTypes,
        selectedSuppliers,
        dateFrom,
        dateTo,
    ]);

    // Calculate analytics
    const analytics = useMemo(() => {
        const totalCost = filteredExpenses.reduce(
            (sum, expense) => sum + expense.cost,
            0
        );
        const approvedCost = filteredExpenses.reduce(
            (sum, expense) => sum + expense.cost,
            0
        );
        const pendingCost = 0;

        const costsByPhase = uniquePhases
            .map((phase) => ({
                name: phase,
                value: filteredExpenses
                    .filter((e) => e.phase === phase)
                    .reduce((sum, expense) => sum + expense.cost, 0),
                color:
                    constructionWBS.phases.find((p) => p.name === phase)
                        ?.color || '#8884d8',
            }))
            .filter((item) => item.value > 0)
            .sort((a, b) => b.value - a.value);

        const costsByType = uniqueTypes
            .map((type) => ({
                name: type,
                value: filteredExpenses
                    .filter((e) => e.type === type)
                    .reduce((sum, expense) => sum + expense.cost, 0),
            }))
            .filter((item) => item.value > 0)
            .sort((a, b) => b.value - a.value);

        // ABC Analysis
        const sortedExpenses = [...filteredExpenses].sort(
            (a, b) => b.cost - a.cost
        );
        const totalExpensesValue = sortedExpenses.reduce(
            (sum, expense) => sum + expense.cost,
            0
        );

        let accumulatedValue = 0;
        let aCutoffIndex = -1;
        let bCutoffIndex = -1;

        for (let i = 0; i < sortedExpenses.length; i++) {
            accumulatedValue += sortedExpenses[i].cost;
            const accumulatedPercentage = accumulatedValue / totalExpensesValue;

            if (aCutoffIndex === -1 && accumulatedPercentage >= 0.8) {
                aCutoffIndex = i;
            } else if (bCutoffIndex === -1 && accumulatedPercentage >= 0.95) {
                bCutoffIndex = i;
                break;
            }
        }

        const aExpenses = sortedExpenses.slice(0, aCutoffIndex + 1);
        const bExpenses = sortedExpenses.slice(
            aCutoffIndex + 1,
            bCutoffIndex === -1 ? undefined : bCutoffIndex + 1
        );
        const cExpenses =
            bCutoffIndex === -1
                ? sortedExpenses.slice(aCutoffIndex + 1)
                : sortedExpenses.slice(bCutoffIndex + 1);

        const abcAnalysis = {
            a: {
                percentage:
                    totalExpensesValue > 0
                        ? (aExpenses.reduce(
                              (sum, expense) => sum + expense.cost,
                              0
                          ) /
                              totalExpensesValue) *
                          100
                        : 0,
                value: aExpenses.reduce(
                    (sum, expense) => sum + expense.cost,
                    0
                ),
                count: aExpenses.length,
            },
            b: {
                percentage:
                    totalExpensesValue > 0
                        ? (bExpenses.reduce(
                              (sum, expense) => sum + expense.cost,
                              0
                          ) /
                              totalExpensesValue) *
                          100
                        : 0,
                value: bExpenses.reduce(
                    (sum, expense) => sum + expense.cost,
                    0
                ),
                count: bExpenses.length,
            },
            c: {
                percentage:
                    totalExpensesValue > 0
                        ? (cExpenses.reduce(
                              (sum, expense) => sum + expense.cost,
                              0
                          ) /
                              totalExpensesValue) *
                          100
                        : 0,
                value: cExpenses.reduce(
                    (sum, expense) => sum + expense.cost,
                    0
                ),
                count: cExpenses.length,
            },
        };

        return {
            totalCost,
            approvedCost,
            pendingCost,
            costsByPhase,
            costsByType,
            totalExpenses: filteredExpenses.length,
            abcAnalysis: abcAnalysis,
        };
    }, [filteredExpenses]);

    const clearAllFilters = () => {
        setSelectedPhases([]);
        setSelectedClasses([]);
        setSelectedTypes([]);
        setSelectedSuppliers([]);
        setDateFrom('');
        setDateTo('');
        setSearchTerm('');
    };

    const hasActiveFilters =
        selectedPhases.length > 0 ||
        selectedClasses.length > 0 ||
        selectedTypes.length > 0 ||
        selectedSuppliers.length > 0 ||
        dateFrom ||
        dateTo ||
        searchTerm;

    const COLORS = [
        '#4A7C59',
        '#E97451',
        '#8884d8',
        '#82ca9d',
        '#ffc658',
        '#ff7300',
        '#00ff00',
        '#ff00ff',
    ];

    const {
        planningData,
        executionForm,
        isSubmitting,
        showCreateExecution,
        setShowCreateExecution,
        createExecution,
    } = usePlanningManagement();

    const handleAddExecution = (stageId: string) => {
        executionForm.setValue('stageId', stageId);
        setShowCreateExecution(true);
    };

    return (
        <div className="space-y-6">
            <div className='w-full'>
                <Button
                    
                    variant="outline"
                    onClick={() => setShowCreateExecution(true)}
                    className="flex items-center gap-2 hover:bg-primary/90 bg-primary text-primary-foreground hover:text-white"
                >
                    <Calculator className="h-4 w-4" />
                    Novo Lançamento
                </Button>
            </div>
            {/* Create Execution Form */}
            {showCreateExecution && (
                <CreateExecutionForm
                    form={executionForm}
                    stages={planningData.stages}
                    isSubmitting={isSubmitting}
                    onSubmit={createExecution}
                    onCancel={() => setShowCreateExecution(false)}
                />
            )}

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-700">
                                    Total Gasto
                                </p>
                                <p className="text-2xl font-bold text-blue-800">
                                    R${' '}
                                    {analytics.totalCost.toLocaleString(
                                        'pt-BR'
                                    )}
                                </p>
                                <p className="text-xs text-blue-600">
                                    {analytics.totalExpenses} lançamentos
                                </p>
                            </div>
                            <BarChart3 className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-700">
                                    Aprovado
                                </p>
                                <p className="text-2xl font-bold text-green-800">
                                    R${' '}
                                    {analytics.approvedCost.toLocaleString(
                                        'pt-BR'
                                    )}
                                </p>
                                <p className="text-xs text-green-600">
                                    {(
                                        (analytics.approvedCost /
                                            analytics.totalCost) *
                                        100
                                    ).toFixed(1)}
                                    % do total
                                </p>
                            </div>
                            <FileText className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-orange-700">
                                    Pendente
                                </p>
                                <p className="text-2xl font-bold text-orange-800">
                                    R${' '}
                                    {analytics.pendingCost.toLocaleString(
                                        'pt-BR'
                                    )}
                                </p>
                                <p className="text-xs text-orange-600">
                                    {(
                                        (analytics.pendingCost /
                                            analytics.totalCost) *
                                        100
                                    ).toFixed(1)}
                                    % do total
                                </p>
                            </div>
                            <FileText className="h-8 w-8 text-orange-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardContent>
                    {/* GRAFICOS COM TAB E TABELA*/}
                    <CostAnalysisScreen />
                </CardContent>
            </Card>
        </div>
    );
}
