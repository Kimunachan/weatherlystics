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
  const chartData = reformData(weatherData);
  console.log(chartData);

  const renderTextData = (data: ChartData | ChartData[], unit: string) => {
    if (!data) return <div>Data is not available</div>;

    if (Array.isArray(data)) {
      return (
        <div>
          {data.map(
            (chart, chartIndex) =>
              chart.datasets && (
                <div key={chartIndex}>
                  {chart.datasets.map(
                    (dataset, datasetIndex) =>
                      chart.labels && (
                        <div key={datasetIndex}>
                          <h3>{dataset.label}</h3>
                          <ul>
                            {chart.labels.map(
                              (label: string, labelIndex: number) => (
                                <li key={labelIndex}>
                                  {label}: {dataset.data[labelIndex]} {unit}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )
                  )}
                </div>
              )
          )}
        </div>
      );
    } else {
      const labels = data.labels;

      return (
        data.datasets && (
          <div>
            {data.datasets.map(
              (dataset, index) =>
                labels && (
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
                )
            )}
          </div>
        )
      );
    }
  };

  return (
    <div className={styles.text_container}>
      {chartData && Array.isArray(chartData) ? (
        chartData.map((data, index) => (
          <div key={index}>
            <section data-testid={`chart_temp_${index}`} className="chart_temp">
              {renderTextData(data.temperatureChart, "°C")}
            </section>
            <section
              data-testid={`chart_humidity_${index}`}
              className="chart_humidity"
            >
              {renderTextData(data.humidityChart, "%")}
            </section>
            <section
              data-testid={`chart_appTemp_${index}`}
              className="chart_appTemp"
            >
              {renderTextData(data.apparentTemperatureChart, "°C")}
            </section>
          </div>
        ))
      ) : (
        <div>
          <section data-testid="chart_temp" className="chart_temp">
            {renderTextData(chartData.temperatureChart, "°C")}
          </section>
          <section data-testid="chart_humidity" className="chart_humidity">
            {renderTextData(chartData.humidityChart, "%")}
          </section>
          <section data-testid="chart_appTemp" className="chart_appTemp">
            {renderTextData(chartData.apparentTemperatureChart, "°C")}
          </section>
        </div>
      )}
    </div>
  );
}
