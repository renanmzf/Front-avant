'use client';

import { useState, useMemo } from 'react';
import {
    Search,
    Download,
    Filter,
    ArrowUpDown,
    Calendar,
    FileText,
    Building,
    DollarSign,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
    formatCurrency,
    formatDate,
    formatPercentage,
    calculateAdmFee,
    getUniqueValues,
    applyTableFilters,
} from '../utils/cost-analysis-utils';
import {
    COST_TYPE_LABELS,
    PAYMENT_METHOD_LABELS,
} from '../constants/cost-analysis';
import type { ExpenseEntry, TableFilters } from '../types/cost-analysis';

interface ExpenseTableProps {
    entries: ExpenseEntry[];
    className?: string;
}

type SortField = 'date' | 'invoiceNumber' | 'supplier' | 'value' | 'none';
type SortOrder = 'asc' | 'desc';

export const ExpenseTable = ({
    entries,
    className = '',
}: ExpenseTableProps) => {
    const { toast } = useToast();
    const [filters, setFilters] = useState<TableFilters>({
        search: '',
        dateRange: { start: '', end: '' },
        supplier: '',
        stage: '',
        class: '',
        type: '',
        valueRange: { min: 0, max: 0 },
    });

    const [sortField, setSortField] = useState<SortField>('none');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
    const [downloadingNF, setDownloadingNF] = useState<string | null>(null);

    const uniqueSuppliers = useMemo(
        () => getUniqueValues(entries, 'supplier'),
        [entries]
    );
    const uniqueStages = useMemo(
        () => getUniqueValues(entries, 'stage'),
        [entries]
    );
    const uniqueClasses = useMemo(
        () => getUniqueValues(entries, 'class'),
        [entries]
    );

    // Calculate supplier with highest total value
    const supplierTotals = useMemo(() => {
        const totals: Record<string, number> = {};
        entries.forEach((entry) => {
            totals[entry.supplier] =
                (totals[entry.supplier] || 0) + entry.value;
        });
        return totals;
    }, [entries]);

    const topSupplier = useMemo(() => {
        return Object.entries(supplierTotals).reduce(
            (max, [supplier, total]) =>
                total > max.total ? { supplier, total } : max,
            { supplier: '', total: 0 }
        );
    }, [supplierTotals]);

    const filteredAndSortedEntries = useMemo(() => {
        let filtered = applyTableFilters(entries, filters);

        // Apply sorting
        if (sortField !== 'none') {
            filtered = [...filtered].sort((a, b) => {
                let aValue: any;
                let bValue: any;

                switch (sortField) {
                    case 'date':
                        aValue = new Date(a.date).getTime();
                        bValue = new Date(b.date).getTime();
                        break;
                    case 'invoiceNumber':
                        aValue = a.invoiceNumber;
                        bValue = b.invoiceNumber;
                        break;
                    case 'supplier':
                        aValue = supplierTotals[a.supplier] || 0;
                        bValue = supplierTotals[b.supplier] || 0;
                        break;
                    case 'value':
                        aValue = a.value;
                        bValue = b.value;
                        break;
                    default:
                        return 0;
                }

                if (sortOrder === 'asc') {
                    return aValue > bValue ? 1 : -1;
                } else {
                    return aValue < bValue ? 1 : -1;
                }
            });
        }

        return filtered;
    }, [entries, filters, sortField, sortOrder, supplierTotals]);

    const handleQuickFilter = (field: SortField) => {
        if (sortField === field && sortOrder === 'desc') {
            // Reset if clicking the same field that's already sorted desc
            setSortField('none');
            setSortOrder('desc');
        } else {
            setSortField(field);
            setSortOrder('desc'); // Always start with desc for "most recent/highest" behavior
        }
    };

    const handleNFDownload = async (entry: ExpenseEntry) => {
        setDownloadingNF(entry.id);

        try {
            // Simulate API call to get the invoice file
            await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate loading time

            // In a real application, you would:
            // 1. Make an API call to get the file URL or blob
            // 2. Create a download link and trigger the download

            // For demonstration, we'll simulate the download
            const fileName = `${entry.invoiceNumber}_${entry.supplier.replace(
                /\s+/g,
                '_'
            )}.pdf`;

            // Create a mock blob URL (in real app, this would come from your API)
            const mockFileContent = `Nota Fiscal: ${
                entry.invoiceNumber
            }\nFornecedor: ${entry.supplier}\nValor: ${formatCurrency(
                entry.value
            )}\nData: ${formatDate(entry.date)}`;
            const blob = new Blob([mockFileContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);

            // Create download link and trigger download
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up the blob URL
            URL.revokeObjectURL(url);

            toast({
                title: 'Download iniciado',
                description: `Nota fiscal ${entry.invoiceNumber} está sendo baixada.`,
            });
        } catch (error) {
            console.error('Error downloading invoice:', error);
            toast({
                title: 'Erro no download',
                description: `Não foi possível baixar a nota fiscal ${entry.invoiceNumber}.`,
                variant: 'destructive',
            });
        } finally {
            setDownloadingNF(null);
        }
    };

    const handleExport = () => {
        console.log('Exporting data...', filteredAndSortedEntries);
        alert('Funcionalidade de exportação será implementada');
    };

    const getTypeColor = (type: string) => {
        const colors = {
            material: 'bg-red-100 text-red-800',
            labor: 'bg-emerald-100 text-emerald-800',
            services: 'bg-blue-100 text-blue-800',
            rental: 'bg-amber-100 text-amber-800',
            administration: 'bg-violet-100 text-violet-800',
        };
        return (
            colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
        );
    };

    const getSortIcon = (field: SortField) => {
        if (sortField === field) {
            return sortOrder === 'desc' ? '↓' : '↑';
        }
        return '';
    };

    return (
        <Card className={`w-full ${className}`}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-semibold text-gray-900">
                            Lançamentos Detalhados
                        </CardTitle>
                        <CardDescription>
                            Transparência total dos investimentos realizados
                        </CardDescription>
                    </div>
                    <Button
                        onClick={handleExport}
                        variant="outline"
                        className="bg-transparent"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Exportar
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {/* Search and Period Filter */}
                <div className="space-y-4 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Buscar por descrição, fornecedor ou NF..."
                                    value={filters.search}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            search: e.target.value,
                                        })
                                    }
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <Select value="total" onValueChange={() => {}}>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Todo o período" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="total">
                                    Todo o período
                                </SelectItem>
                                <SelectItem value="month">Este mês</SelectItem>
                                <SelectItem value="year">Este ano</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Quick Filters */}
                    <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2 w-full">
                            <Filter className="h-4 w-4" />
                            <span className="font-medium">
                                Filtros Rápidos:
                            </span>
                        </div>

                        <Button
                            variant={
                                sortField === 'date' ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => handleQuickFilter('date')}
                            className="text-xs"
                        >
                            <Calendar className="h-3 w-3 mr-1" />
                            Datas Recentes {getSortIcon('date')}
                        </Button>

                        <Button
                            variant={
                                sortField === 'invoiceNumber'
                                    ? 'default'
                                    : 'outline'
                            }
                            size="sm"
                            onClick={() => handleQuickFilter('invoiceNumber')}
                            className="text-xs"
                        >
                            <FileText className="h-3 w-3 mr-1" />
                            NF Recentes {getSortIcon('invoiceNumber')}
                        </Button>

                        <Button
                            variant={
                                sortField === 'supplier' ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => handleQuickFilter('supplier')}
                            className="text-xs"
                        >
                            <Building className="h-3 w-3 mr-1" />
                            Maior Fornecedor {getSortIcon('supplier')}
                        </Button>

                        <Button
                            variant={
                                sortField === 'value' ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => handleQuickFilter('value')}
                            className="text-xs"
                        >
                            <DollarSign className="h-3 w-3 mr-1" />
                            Maior Valor {getSortIcon('value')}
                        </Button>

                        {sortField !== 'none' && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setSortField('none');
                                    setSortOrder('desc');
                                }}
                                className="text-xs text-red-600 hover:text-red-700"
                            >
                                Limpar Ordenação
                            </Button>
                        )}
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-4">
                        <Select
                            value={filters.stage || 'all'}
                            onValueChange={(value) =>
                                setFilters({
                                    ...filters,
                                    stage: value === 'all' ? '' : value,
                                })
                            }
                        >
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Etapa" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Todas as etapas
                                </SelectItem>
                                {uniqueStages.map((stage) => (
                                    <SelectItem key={stage} value={stage}>
                                        {stage}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={filters.class || 'all'}
                            onValueChange={(value) =>
                                setFilters({
                                    ...filters,
                                    class: value === 'all' ? '' : value,
                                })
                            }
                        >
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Classe" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Todas as classes
                                </SelectItem>
                                {uniqueClasses.map((cls) => (
                                    <SelectItem key={cls} value={cls}>
                                        {cls}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={filters.type || 'all'}
                            onValueChange={(value) =>
                                setFilters({
                                    ...filters,
                                    type: value === 'all' ? '' : (value as any),
                                })
                            }
                        >
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Todos os tipos
                                </SelectItem>
                                {Object.entries(COST_TYPE_LABELS).map(
                                    ([key, label]) => (
                                        <SelectItem key={key} value={key}>
                                            {label}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Active Sort Indicator */}
                    {sortField !== 'none' && (
                        <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-2 rounded">
                            <ArrowUpDown className="h-4 w-4" />
                            <span>
                                Ordenado por:{' '}
                                <strong>
                                    {sortField === 'date' && 'Data'}
                                    {sortField === 'invoiceNumber' &&
                                        'Nota Fiscal'}
                                    {sortField === 'supplier' &&
                                        'Fornecedor (por valor total)'}
                                    {sortField === 'value' && 'Valor'}
                                </strong>{' '}
                                (
                                {sortOrder === 'desc'
                                    ? 'Maior para menor'
                                    : 'Menor para maior'}
                                )
                            </span>
                            {sortField === 'supplier' &&
                                topSupplier.supplier && (
                                    <span className="text-xs">
                                        (Maior: {topSupplier.supplier} -{' '}
                                        {formatCurrency(topSupplier.total)})
                                    </span>
                                )}
                        </div>
                    )}
                </div>

                {/* Table */}
                <div className="border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="min-w-[100px]">
                                        Data
                                    </TableHead>
                                    <TableHead className="min-w-[80px]">
                                        NF
                                    </TableHead>
                                    <TableHead className="min-w-[200px]">
                                        Descrição
                                    </TableHead>
                                    <TableHead className="min-w-[150px]">
                                        Fornecedor
                                    </TableHead>
                                    <TableHead className="min-w-[120px]">
                                        Etapa
                                    </TableHead>
                                    <TableHead className="min-w-[100px]">
                                        Classe
                                    </TableHead>
                                    <TableHead className="min-w-[100px]">
                                        Tipo
                                    </TableHead>
                                    <TableHead className="min-w-[120px]">
                                        Forma de Pagamento
                                    </TableHead>
                                    <TableHead className="min-w-[80px] text-center">
                                        ADM
                                    </TableHead>
                                    <TableHead className="min-w-[100px] text-right">
                                        Taxa ADM
                                    </TableHead>
                                    <TableHead className="min-w-[100px] text-right">
                                        Valor
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredAndSortedEntries.map((entry) => {
                                    const admFee = calculateAdmFee(
                                        entry.value,
                                        entry.admPercentage
                                    );
                                    const isDownloading =
                                        downloadingNF === entry.id;

                                    return (
                                        <TableRow
                                            key={entry.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <TableCell>
                                                {formatDate(entry.date)}
                                            </TableCell>
                                            <TableCell>
                                                <button
                                                    onClick={() =>
                                                        handleNFDownload(entry)
                                                    }
                                                    disabled={isDownloading}
                                                    className="group flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title={`Baixar nota fiscal ${entry.invoiceNumber}`}
                                                >
                                                    <span>
                                                        {entry.invoiceNumber}
                                                    </span>
                                                    {isDownloading ? (
                                                        <div className="w-3 h-3 border border-blue-600 border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <Download className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                                    )}
                                                </button>
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                {entry.description}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span>
                                                        {entry.supplier}
                                                    </span>
                                                    {sortField ===
                                                        'supplier' && (
                                                        <span className="text-xs text-gray-500">
                                                            Total:{' '}
                                                            {formatCurrency(
                                                                supplierTotals[
                                                                    entry
                                                                        .supplier
                                                                ] || 0
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>{entry.stage}</TableCell>
                                            <TableCell>{entry.class}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={getTypeColor(
                                                        entry.type
                                                    )}
                                                >
                                                    {
                                                        COST_TYPE_LABELS[
                                                            entry.type
                                                        ]
                                                    }
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    PAYMENT_METHOD_LABELS[
                                                        entry.paymentMethod
                                                    ]
                                                }
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge
                                                    variant="outline"
                                                    className="bg-blue-50 text-blue-700 border-blue-200"
                                                >
                                                    {formatPercentage(
                                                        entry.admPercentage
                                                    )}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <span className="font-semibold text-green-600">
                                                    {formatCurrency(admFee)}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right font-semibold">
                                                {formatCurrency(entry.value)}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {filteredAndSortedEntries.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <Filter className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>
                            Nenhum lançamento encontrado com os filtros
                            aplicados
                        </p>
                    </div>
                )}

                <div className="mt-4 text-sm text-gray-600">
                    Mostrando {filteredAndSortedEntries.length} de{' '}
                    {entries.length} lançamentos
                    {sortField !== 'none' && (
                        <span className="ml-2 text-blue-600">
                            • Ordenado por{' '}
                            {sortField === 'date'
                                ? 'data'
                                : sortField === 'invoiceNumber'
                                ? 'NF'
                                : sortField === 'supplier'
                                ? 'fornecedor'
                                : 'valor'}
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
