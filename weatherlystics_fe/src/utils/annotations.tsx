import { ChartDataset, PluginOptionsByType } from 'chart.js';

    type MinMax = {
        min: number;
        max: number;
        xMin: number | string;
        xMax: number | string;
    };
    
    type DatasetItem = {
        x: number | string;
        y: number;
    }

    export const getMinMaxPerDataset = (datasets: ChartDataset<'line'>[]): MinMax[] => {
        return datasets.map(dataset => {
        const values = dataset.data.map(item => (typeof item === 'object' ? (item as DatasetItem).y : item)) as number[];
        const min = Math.min(...values);
        const max = Math.max(...values);
        const minIndex = values.indexOf(min);
        const maxIndex = values.indexOf(max);
        const xMin = typeof dataset.data[minIndex] === 'object' ? (dataset.data[minIndex] as DatasetItem).x : minIndex;
        const xMax = typeof dataset.data[maxIndex] === 'object' ? (dataset.data[maxIndex] as DatasetItem).x : maxIndex;
        return { min, max, xMin, xMax };
        });
    };

    export const createAnnotations = (minMax: MinMax[]): PluginOptionsByType<'line'>['annotation']['annotations'] => {
        return minMax.flatMap((range) => [
        {
            type: 'point' as const,
            xValue: range.xMin,
            yValue: range.min,
            backgroundColor: 'red',
            radius: 5,
            label: {
            content: `Min: ${range.min}`,
            position: 'start' as const,
            enabled: true,
            },
        },
        {
            type: 'point' as const,
            xValue: range.xMax,
            yValue: range.max,
            backgroundColor: 'blue',
            radius: 5,
            label: {
            content: `Max: ${range.max}`,
            position: 'start' as const,
            enabled: true,
            },
        },
        ]);
    };