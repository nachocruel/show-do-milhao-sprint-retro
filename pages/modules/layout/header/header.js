import styles from './header.module.css'

export default function PageHeader() {
    return (<div className={styles.header}>
        <img alt="milho" src="../../../../../milho.png" className={styles.img}/>
        <h1 className={styles.text}>Show do Milhão (Sprint retrô)</h1>
    </div>
    )
}