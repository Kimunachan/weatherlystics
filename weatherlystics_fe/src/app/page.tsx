"use client";

import { useState } from "react";
import styles from "../styles/pages/page.module.scss";
import Form from "./Form";


const Page = () => {
    const [location, setLocation] = useState({ latitude: '', longitude: '' });
    


    const getGeolocation = (event) => {
        event.preventDefault();
    
        if (typeof window !== 'undefined' && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success);
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });
    }



  const DateValue = new Date().toISOString().split('T')[0];

  const [showSecondDate, setShowSecondDate] = useState(false);

  const toggleSecondDate = (event) => {
    event.preventDefault();
    setShowSecondDate(!showSecondDate);
  };
  

  return (
    <div className={styles.container}>
    
      <header className={styles.header}>
        <div className="header">Weatherlystics</div>
      </header>
  
        <main className={styles.main}>
            <div className="card">
                <Form
                    location={location}
                    DateValue={DateValue}
                    showSecondDate={showSecondDate}
                    toggleSecondDate={toggleSecondDate}
                    getGeolocation={getGeolocation}
                />
            </div>
            <div className={styles.sectionTwo}>
                <div className={styles.sectiontwo}>
                    {/* Ihr JSX hier */}
                </div>
            </div>
            <div className={styles.sectionThree}>
            {/* Ihr JSX hier */}
            </div>
        </main>
  
      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 Weatherlystics</p>
        </div>
      </footer>
    </div>
    
  );
};

export default Page;