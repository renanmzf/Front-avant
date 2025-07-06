'use client';

import { RDOVisualization } from './rdo-visualization';
import { MOCK_RDOS } from '../constants/rdo-visualization';

export default function RDOVisualizationScreen() {
    return (
        <div className="container mx-auto  py-8">
            <RDOVisualization rdos={MOCK_RDOS} />
        </div>
    );
}
