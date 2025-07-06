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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Search,
    Filter,
    LucidePieChart,
    Download,
    FileText,
    Calendar,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import CostAnalysisScreen from './cost-analysis-screen';


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

interface ClientFinancialDetailedProps {
    projectId: string;
    expenses: Expense[];
}

export function ClientFinancialDetailed({
    projectId,
    expenses,
}: ClientFinancialDetailedProps) {
   
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
    const [selectedPhases, setSelectedPhases] = useState<string[]>([]);
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    // Get unique values for filters
    const uniquePhases = [...new Set(expenses.map((e) => e.phase))];
    const uniqueClasses = [...new Set(expenses.map((e) => e.class))];
    const uniqueTypes = [...new Set(expenses.map((e) => e.type))];

    // Get available months
    const availableMonths = [
        ...new Set(expenses.map((e) => e.date.substring(0, 7))),
    ].sort();

    // Filter expenses based on search and filters
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

            const matchesPeriod =
                selectedPeriod === 'all' ||
                expense.date.startsWith(selectedPeriod);
            const matchesPhase =
                selectedPhases.length === 0 ||
                selectedPhases.includes(expense.phase);
            const matchesClass =
                selectedClasses.length === 0 ||
                selectedClasses.includes(expense.class);
            const matchesType =
                selectedTypes.length === 0 ||
                selectedTypes.includes(expense.type);

            return (
                matchesSearch &&
                matchesPeriod &&
                matchesPhase &&
                matchesClass &&
                matchesType
            );
        });
    }, [
        expenses,
        searchTerm,
        selectedPeriod,
        selectedPhases,
        selectedClasses,
        selectedTypes,
    ]);

    // Calculate analytics
    const analytics = useMemo(() => {
        const totalCost = filteredExpenses.reduce(
            (sum, expense) => sum + expense.cost,
            0
        );

        const costsByType = uniqueTypes
            .map((type) => ({
                name: type,
                value: filteredExpenses
                    .filter((e) => e.type === type)
                    .reduce((sum, expense) => sum + expense.cost, 0),
            }))
            .filter((item) => item.value > 0)
            .sort((a, b) => b.value - a.value);

        return {
            totalCost,
            costsByType,
            totalExpenses: filteredExpenses.length,
        };
    }, [filteredExpenses]);

    const clearAllFilters = () => {
        setSelectedPhases([]);
        setSelectedClasses([]);
        setSelectedTypes([]);
        setSelectedPeriod('all');
        setSearchTerm('');
    };

    const hasActiveFilters =
        selectedPhases.length > 0 ||
        selectedClasses.length > 0 ||
        selectedTypes.length > 0 ||
        selectedPeriod !== 'all' ||
        searchTerm;

    const COLORS = [
        '#4A7C59',
        '#E97451',
        '#8884d8',
        '#82ca9d',
        '#ffc658',
        '#ff7300',
    ];

    return (
        <div className="space-y-6">
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-700">
                                    Total Investido
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
                            <LucidePieChart className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-700">
                                    Período Selecionado
                                </p>
                                <p className="text-lg font-bold text-green-800">
                                    {selectedPeriod === 'all'
                                        ? 'Todo o período'
                                        : new Date(
                                              selectedPeriod + '-01'
                                          ).toLocaleDateString('pt-BR', {
                                              month: 'long',
                                              year: 'numeric',
                                          })}
                                </p>
                                <p className="text-xs text-green-600">
                                    {selectedPeriod === 'all'
                                        ? `${availableMonths.length} meses`
                                        : 'Mês específico'}
                                </p>
                            </div>
                            <Calendar className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
               
                <CardContent>
                   

                {/* GRAFICOS COM TAB E TABELA*/}
                <CostAnalysisScreen/>


                </CardContent>
            </Card>

          
          
        </div>
    );
}
