"use client";

import { reformData } from "@/utils/function";
import { WeatherDataType } from "@/utils/types";
import { ChartData } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import styles from "../styles/charts/chart.module.scss";

type ChartProps = {
    weatherData: WeatherDataType | undefined;
};

export default function Chart({ weatherData}: ChartProps) {

    const chartDataTemp: ChartData<"line", number[], string> | null = weatherData
    ? reformData(weatherData).temperatureChart
    : null;

    const chartDataHumidity: ChartData<"line", number[], string> | null = weatherData
    ? reformData(weatherData).humidityChart
    : null;

    const chartDataAppTemp: ChartData<"line", number[], string> | null = weatherData
    ? reformData(weatherData).apparentTemperatureChart
    : null;

    return (
        <div className={styles.chart_container}>
            <section className="chart_temp">
                {chartDataTemp && (
                    <Line
                        data={chartDataTemp}
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
            <section className="chart_humidity">
                {chartDataHumidity && (
                    <Line
                        data={chartDataHumidity}
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
            <section className="chart_appTemp">
                {chartDataAppTemp && (
                    <Line
                        data={chartDataAppTemp}
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

