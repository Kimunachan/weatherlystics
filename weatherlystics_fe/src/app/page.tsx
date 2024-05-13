"use client";

import { WeatherDataType } from "@/utils/types";

import { useState } from "react";
import styles from "../styles/pages/page.module.scss";
import Form from "./Form";
import Chart from "./chart";



export default function Page() {

  const [weatherData, setWeatherData] = useState<WeatherDataType>();

  
    return (
      <>
        <div className="body">
          <header className={styles.header}>
            <div className="header">Weatherlystics</div>
          </header>
  
          <main className={styles.main}>
            <section className="card">
              <Form
              setWeatherData={setWeatherData}
              />
            </section>
            <section className={styles.sectionTwo}>
              <div className="card">
                <Chart
                weatherData={weatherData}
                />
              </div>
            </section>
            <section className={styles.sectionThree}>{/* Ihr JSX hier */}</section>
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
