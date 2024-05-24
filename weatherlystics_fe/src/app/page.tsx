"use client";

import { WeatherDataType } from "@/utils/types";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import styles from "../styles/pages/page.module.scss";
import Form from "./Form";
import Chart from "./chart";
import TextChart from "./textChart";

export default function Page() {
  const [weatherData, setWeatherData] = useState<WeatherDataType>();
  const [showCharts, setShowCharts] = useState(true); // State to toggle between charts and text

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowCharts(event.target.checked);
  };

  return (
    <>
      <div className="body">
        <header className={styles.header}>
          <div className="header">Weatherlystics</div>
        </header>

        <main className={styles.main}>
          <section className="card">
            <Form setWeatherData={setWeatherData} />
          </section>

          {/* Toggle Switch */}
          <div className={styles.toggleContainer}>
            <FormControlLabel
              control={
                <Switch
                  checked={showCharts}
                  onChange={handleToggle}
                  name="toggleCharts"
                  color="primary"
                  data-testid="toggleCharts"
                />
              }
              label={showCharts ? "Show Text" : "Show Charts"}
            />
          </div>

          <section className={styles.sectionTwo}>
            <div className="card">
              {showCharts ? (
                <Chart weatherData={weatherData} />
              ) : (
                <TextChart weatherData={weatherData} />
              )}
            </div>
          </section>
        </main>
        
        <footer className="footer">
          <div className="footer-content">
            <p>&copy; 2024 Weatherlystics</p>
          </div>
        </footer>
      </div>
    </>
  );
}
