"use client";

import { createAnnotations, getMinMaxPerDataset } from "@/utils/annotations";
import { reformData } from "@/utils/function";
import { WeatherDataType } from "@/utils/types";
import { Chart as ChartJS } from 'chart.js';
import "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";
import { Line } from "react-chartjs-2";
import styles from "../styles/charts/chart.module.scss";


ChartJS.register(annotationPlugin);

type ChartProps = {
  weatherData: WeatherDataType | undefined | WeatherDataType[];
};
type MinMax = {
  min: number;
  max: number;
  xMin: number | string;
  xMax: number | string;
};


export default function Chart({ weatherData }: ChartProps) {
  if (!weatherData) {
    return;
  }

  const chartData = reformData(weatherData);

  

  const tempMinMax: MinMax[] = getMinMaxPerDataset(chartData.temperatureChart.datasets);
  const humidMinMax: MinMax[] = getMinMaxPerDataset(chartData.humidityChart.datasets);
  const appTempMinMax: MinMax[] = getMinMaxPerDataset(chartData.apparentTemperatureChart.datasets);

  


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
              plugins: {
                annotation: {
                  annotations: createAnnotations(tempMinMax),
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
              plugins: {
                annotation: {
                  annotations: createAnnotations(humidMinMax),
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
              plugins: {
                annotation: {
                  annotations: createAnnotations(appTempMinMax),
                },
              },
            }}
          />
        )}
      </section>
    </div>
  );
}
