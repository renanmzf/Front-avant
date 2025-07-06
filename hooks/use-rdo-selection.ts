'use client';

import { useState, useMemo } from 'react';
import type { RDO } from '../types/rdo-visualization';

export const useRDOSelection = (rdos: RDO[]) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const selectedRDOs = useMemo(() => {
        return rdos.filter((rdo) => selectedIds.includes(rdo.id));
    }, [rdos, selectedIds]);

    const isAllSelected = useMemo(() => {
        return rdos.length > 0 && selectedIds.length === rdos.length;
    }, [rdos.length, selectedIds.length]);

    const isPartiallySelected = useMemo(() => {
        return selectedIds.length > 0 && selectedIds.length < rdos.length;
    }, [selectedIds.length, rdos.length]);

    const toggleSelection = (rdoId: string) => {
        setSelectedIds((prev) =>
            prev.includes(rdoId)
                ? prev.filter((id) => id !== rdoId)
                : [...prev, rdoId]
        );
    };

    const selectAll = () => {
        setSelectedIds(rdos.map((rdo) => rdo.id));
    };

    const selectNone = () => {
        setSelectedIds([]);
    };

    const toggleSelectAll = () => {
        if (isAllSelected) {
            selectNone();
        } else {
            selectAll();
        }
    };

    return {
        selectedIds,
        selectedRDOs,
        isAllSelected,
        isPartiallySelected,
        toggleSelection,
        selectAll,
        selectNone,
        toggleSelectAll,
    };
};
