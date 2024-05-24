"use client";

import { reformData } from "@/utils/function";
import { WeatherDataType } from "@/utils/types";
import styles from "../styles/charts/chart.module.scss";

type TextChartProps = {
    weatherData: WeatherDataType | undefined | WeatherDataType[];
};

type ChartData = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
    }[];
};

export default function textChart({ weatherData }: TextChartProps) {

    if (!weatherData) {
        return;
    }
    let chartData: any;
    if(Array.isArray(weatherData)) {
        chartData = weatherData.map((data) => reformData(data));
    }
    else {
        chartData = reformData(weatherData);
    }
    

    const renderTextData = (data: ChartData, unit: string) => {
        if (!data) return <div>Data is not available</div>;
    
        const labels = data.labels;
    
        return (
            <div>
                {data.datasets.map((dataset, index) => (
                    <div key={index}>
                        <h3>{dataset.label}</h3>
                        <ul>
                            {labels.map((label: string, index: number) => (
                                <li key={index}>
                                    {label}: {dataset.data[index]} {unit}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={styles.text_container}>
            <section data-testid="chart_temp" className="chart_temp">
                {chartData && renderTextData(chartData.temperatureChart, "°C")}
            </section>
            <section data-testid="chart_humidity" className="chart_humidity">
                {chartData && renderTextData(chartData.humidityChart, "%")}
            </section>
            <section data-testid="chart_appTemp" className="chart_appTemp">
                {chartData && renderTextData(chartData.apparentTemperatureChart, "°C")}
            </section>
        </div>
    );
};
