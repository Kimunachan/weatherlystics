"use client";

import { reformData } from "@/utils/function";
import { WeatherDataType } from "@/utils/types";
import styles from "../styles/charts/chart.module.scss";

type TextChartProps = {
    weatherData: WeatherDataType | undefined;
};

export default function textChart({ weatherData }: TextChartProps) {

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    const chartData = reformData(weatherData);

    const renderTextData = (data: any, label: string, unit: string) => {
        if (!data) return <div>{label} data is not available</div>;
        const labels = data.labels;
        const datasets = data.datasets[0].data;
        return (
            <div>
                <h3>{label}</h3>
                <ul>
                    {labels.map((label: string, index: number) => (
                        <li key={index}>
                            {label}: {datasets[index]} {unit}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className={styles.text_container}>
            <section data-testid="chart_temp" className="chart_temp">
                {chartData && renderTextData(chartData.temperatureChart, "Temperature", "°C")}
            </section>
            <section data-testid="chart_humidity" className="chart_humidity">
                {chartData && renderTextData(chartData.humidityChart, "Humidity", "%")}
            </section>
            <section data-testid="chart_appTemp" className="chart_appTemp">
                {chartData && renderTextData(chartData.apparentTemperatureChart, "Apparent Temperature", "°C")}
            </section>
        </div>
    );
};
