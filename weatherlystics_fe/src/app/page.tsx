import styles from "../styles/pages/page.module.scss";
import Form from "./Form";

export default async function Page() {
  return (
    <>
      <div className="body">
        <header className={styles.header}>
          <div className="header">Weatherlystics</div>
        </header>

        <main className={styles.main}>
          <div className="card">
            <Form />
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
      </div>
    </>
  );
}
