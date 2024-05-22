"use client";

import { reformData } from "@/utils/function";
import { WeatherDataType } from "@/utils/types";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import styles from "../styles/charts/chart.module.scss";

type ChartProps = {
    weatherData: WeatherDataType | undefined;
};

export default function Chart({ weatherData}: ChartProps) {

    if (!weatherData) {
        return <div>Loading...</div>; 
    }

    const chartData = reformData(weatherData);

    return (
        <div className={styles.chart_container}>
            <section data-testid="chart_temp" className="chart_temp">
                {chartData && (
                    <Line
                        data={chartData.temperatureChart}
                        options={{
                            scales: {
                                "y-axis-temp": {
                                    type: "linear",
                                    display: true,
                                    position: "left",
                                    title: {
                                        display: true,
                                        text: "Temperature (°C)",
                                    },
                                    beginAtZero: true,
                                },
                            },
                        }}
                    />
                )}
            </section>
            <section data-testid="chart_humidity" className="chart_humidity">
                {chartData && (
                    <Line
                        data={chartData.humidityChart}
                        options={{
                            scales: {
                                "y-axis-humid": {
                                    type: "linear",
                                    display: true,
                                    position: "left",
                                    title: {
                                        display: true,
                                        text: "Humidity (%)",
                                    },
                                    beginAtZero: true,
                                },
                            },
                        }}
                    />
                )}
            </section>
            <section data-testid="chart_appTemp" className="chart_appTemp">
                {chartData && (
                    <Line
                        data={chartData.apparentTemperatureChart}
                        options={{
                            scales: {
                                "y-axis-appTemp": {
                                    type: "linear",
                                    display: true,
                                    position: "left",
                                    title: {
                                        display: true,
                                        text: "Apparent Temperature (°C)",
                                    },
                                    beginAtZero: true,
                                },
                            },
                        }}
                    />
                )}
            </section>
        </div>
    );
};

