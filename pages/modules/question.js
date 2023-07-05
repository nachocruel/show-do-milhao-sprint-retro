
import styles from "../index.module.css";
import useSound from 'use-sound';
import React, { useEffect } from "react";
import { SideBar } from './layout/sidebar/sidebar';

const li_a = React.createRef()
const li_b = React.createRef()
const li_c = React.createRef()
const li_d = React.createRef()
const li_e = React.createRef()

let selectedOption = null;
let user = null;
function SelectOption(option, e) {
    //if (user && user.turn) {
    selectedOption = option;
    switch (option) {
        case 'A':
            li_a.current.style.backgroundColor = "#ffb31a"

            li_b.current.style.backgroundColor = "transparent"

            li_c.current.style.backgroundColor = "transparent"

            li_d.current.style.backgroundColor = "transparent"

            li_e.current.style.backgroundColor = "transparent"
            break;
        case 'B':
            li_a.current.style.backgroundColor = "transparent"

            li_b.current.style.backgroundColor = "#ffb31a"

            li_c.current.style.backgroundColor = "transparent"

            li_d.current.style.backgroundColor = "transparent"

            li_e.current.style.backgroundColor = "transparent"
            break;
        case 'C':
            li_a.current.style.backgroundColor = "transparent"

            li_b.current.style.backgroundColor = "transparent"

            li_c.current.style.backgroundColor = "#ffb31a"

            li_d.current.style.backgroundColor = "transparent"

            li_e.current.style.backgroundColor = "transparent"
            break;
        case 'D':
            li_a.current.style.backgroundColor = "transparent"

            li_b.current.style.backgroundColor = "transparent"

            li_c.current.style.backgroundColor = "transparent"

            li_d.current.style.backgroundColor = "#ffb31a"

            li_e.current.style.backgroundColor = "transparent"
            break;
        case 'E':
            li_a.current.style.backgroundColor = "transparent"

            li_b.current.style.backgroundColor = "transparent"

            li_c.current.style.backgroundColor = "transparent"

            li_d.current.style.backgroundColor = "transparent"

            li_e.current.style.backgroundColor = "#ffb31a"
            break;
    }
    //} else
    //alert("Não é a sua vez!")
}

export default function Question({ result }) {
    useEffect(() => {
        user = JSON.parse(localStorage.getItem('user'));
    }, [])

    const [playVictory] = useSound('/tadaa-47995.mp3');
    const [playDefeat] = useSound('/fiasco-154915.mp3');

    const ConfirmOption = async (correta) => {
        if (selectedOption) {
            let score = 0;
            if (correta === selectedOption) {
                score = 1;
                playVictory();
            } else {
                playDefeat();
            }

            try {
                const response = await fetch("/api/add_score", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ score: score, username: user.username, roomname: 'sprint_retro' }),
                });

                const data = response.json();
            } catch (error) {
                console.error(error);
                alert(error.message);
            }

            /*const AddToListen = async (user) => {
                await fetch("/api/litemroute", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ uid: user.uid, nickname: user.username, roomname: 'sprint_retro' })
                }).then((_) => {
                    AddToListen({ uid: user.uid, nickname: user.username, roomname: 'sprint_retro' })
                });
            } */
        } else {
            alert('Selecione uma opção.')
        }
    }


    return (result && <div>

        <div className={styles.card}>
            <div className={styles.card_header}>
                {result.card.question}
            </div>
            <img className={styles.img_center} src={result.card.imagem_link}></img>
        </div>
        <h5 className={styles.result}>{result.question.questao}</h5>
        <ul className={styles.ul}>
            <li ref={li_a} id="li_a" className={styles.li} onClick={e => SelectOption('A', e)}><a href="#" className={styles.a}>A. {result.question.opcoes.A}</a></li>
            <li ref={li_b} id="li_b" className={styles.li} onClick={e => SelectOption('B', e)}><a href="#" className={styles.a}>B. {result.question.opcoes.B}</a></li>
            <li ref={li_c} id="li_c" className={styles.li} onClick={e => SelectOption('C', e)}><a href="#" className={styles.a}>C. {result.question.opcoes.C}</a></li>
            <li ref={li_d} id="li_c" className={styles.li} onClick={e => SelectOption('D', e)}><a href="#" className={styles.a}>D. {result.question.opcoes.D}</a></li>
            <li ref={li_e} id="li_e" className={styles.li} onClick={e => SelectOption('E', e)}><a href="#" className={styles.a}>E. {result.question.opcoes.E}</a></li>
        </ul>
        <div>
            <button className={styles.button} onClick={(_) => ConfirmOption(result.question.correta)}>Confirmar</button>
        </div>
    </div>
    )
}