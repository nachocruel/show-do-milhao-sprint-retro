import { useState, useEffect } from 'react'

import styles from './sidebar.module.css'
export default function SideBar() {
    const [nickName, setUserName] = useState('')
    const [result, setResult] = useState([])

    useEffect(async () => {
      const response = await fetch("/api/roomadd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: null, roomname: 'sprint_retro' })
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      const users = JSON.parse(data.result);
      setResult(users);
    }, [])
    
    const addUser = async () => {
        try {
          const response = await fetch("/api/roomadd", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: nickName, roomname: 'sprint_retro' })
          });
    
          const data = await response.json();
          if (response.status !== 200) {
            throw data.error || new Error(`Request failed with status ${response.status}`);
          }

          const users = JSON.parse(data.result);
          for(let user of users) {
            if(user.username == nickName) {
                localStorage.setItem("user", JSON.stringify(user));
            }
          }

          setResult(users);
          setUserName("");
        } catch(error) {
          console.error(error);
          alert(error.message);
        }
    }

  
    return (<div className={styles.sidebar}>
        <div>
            <div className={styles.inputs}>
                <input placeholder='Nick name' type='text' value={nickName} onChange={(e) => setUserName(e.target.value)}></input>
                <input type='button' value="Adicionar" onClick={(_) => addUser()}></input>
            </div>
            <ul>
                {
                   result.map(user => {if (!user.turn) return <li className={styles.li}>{user.username} <span className={styles.span}> - score: {user.totalScore}</span></li>
                    else  return <li className={styles.li_turn}>{user.username} <span className={styles.spanturn}> - score: {user.totalScore}</span></li>})
                }
            </ul>
        </div>
    </div>
    )
}