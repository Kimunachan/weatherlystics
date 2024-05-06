"use client";

import { useState } from "react";
import styles from "../styles/pages/page.module.scss";
import Form from "./Form";

const Page = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  

  const DateValue = new Date().toISOString().split("T")[0];
  const DateValue = new Date().toISOString().split("T")[0];

  const [showSecondDate, setShowSecondDate] = useState(false);

  const toggleSecondDate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowSecondDate(!showSecondDate);
  };

  return (
    <>
      <header className={styles.header}>
        <div className="header">Weatherlystics</div>
      </header>

      <main className={styles.main}>
        <div className="card">
          <Form
            location={{ latitude, longitude }}
            DateValue={DateValue}
            showSecondDate={showSecondDate}
            toggleSecondDate={toggleSecondDate}
            
          />
        </div>
        <div className={styles.sectionTwo}>
          <div className={styles.sectiontwo}>{/* Ihr JSX hier */}</div>
        </div>
        <div className={styles.sectionThree}>{/* Ihr JSX hier */}</div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Weatherlystics</p>
        </div>
      </footer>
    </>
  );
};

export default Page;
