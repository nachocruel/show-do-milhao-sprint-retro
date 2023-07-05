import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "./index.module.css";
import Question from "./modules/question";
import PageHeader from "./modules/layout/header/header";
import SideBar from "./modules/layout/sidebar/sidebar"

let user = null;
export default function Home() {
  useEffect(() => {
    user = JSON.parse(localStorage.getItem('user'));
  }, [])

  const [result, setResult] = useState();
  async function GetQuetion(category) {
    if (user) {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category: category, username: user.username, roomname: 'sprint_retro' }),
        });

        const data = await response.json();
        if (response.status !== 200) {
          throw data.error || new Error(`Request failed with status ${response.status}`);
        }
        setResult(data.result);
      } catch (error) {
        // Consider implementing your own error handling logic here
        console.error(error);
        alert(error.message);
      }
    } else {
      alert('você ainda não entrou na sala.')
    }
  }

  return (
    <div>
      <Head>
        <title>Show do Milhão (Sprint Retrô) </title>
      </Head>
      <PageHeader />
      <SideBar />
      <main className={styles.main}>
        <h1>Categorias</h1>
        <div className={styles.div_button}>
          <button className={styles.button_category} type="button" onClick={e => GetQuetion('culture_pop')}>Cultura Pop</button>
          <button className={styles.button_category} onClick={e => GetQuetion('school_time')}>Tempo de escola</button>
          <button className={styles.button_category} onClick={e => GetQuetion('backend')}>Backend</button>
          <button className={styles.button_category} onClick={e => GetQuetion('frontend')}>Frontend</button>
        </div>
        <Question result={result} />
      </main>
    </div>
  );
}
