'use client';

import { Calendar, Hash, Clock, Eye } from 'lucide-react';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { USEFUL_DAY_OPTIONS } from '../constants/report-options';
import type { UseFormReturn } from 'react-hook-form';
import type { DailyReportData } from '../types/daily-report';

interface ReportHeaderProps {
    form: UseFormReturn<DailyReportData>;
}

export const ReportHeader = ({ form }: ReportHeaderProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-center bg-gray-600 text-white py-3 px-4 rounded">
                    RELATÓRIO DIÁRIO DE OBRA
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* First row - Main fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="reportNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                    <Hash className="h-4 w-4" />
                                    Relatório nº
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: 1" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="reportDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Data
                                </FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="deadlineProgress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    Prazo Decorrido
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: 1/300" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Second row - Additional fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <FormField
                        control={form.control}
                        name="isUsefulWorkDay"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm">
                                    Informe se a data corresponde a um dia útil
                                    e trabalhado normalmente
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione uma opção" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {USEFUL_DAY_OPTIONS.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="fiscalVisitApproval"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-6">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm flex items-center gap-2">
                                        <Eye className="h-4 w-4" />
                                        Fiscal visitou a obra?
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>
            </CardContent>
        </Card>
    );
};
