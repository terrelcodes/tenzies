import { useEffect, useState } from "react"
import "./dice.css"

interface Die {
    value: number;
    pinned: boolean;
}

export default function Dice({ count }: { count: number }) {
    const [dice, setDice] = useState<Die[]>([]);
    const [win, setWin] = useState(false);
    const [rolls, setRolls] = useState(0);

    function newGame() {
        setDice(Array.from({ length: count }, () => ({ value: Math.floor(Math.random() * 6) + 1, pinned: false })));
        setRolls(0);
        setWin(false);
    }
    useEffect(() => {
        newGame()
        if (checkWin(dice)) {
            setWin(true)
        }
    }, [])

   
    function checkWin(dice: Die[]) {
        const v = dice.map(die => die.value)
        console.log(`checking for win: ${v}`)
        let i = v.length-1;
        const val=v[0]
        while (i>0){
            if (v[i] !== val) {
                return false;
            }
            i--;
        }
        console.log(`win for ${v}`);
        return true;        
    }

    function rollDice() {
        if (win) {
            newGame();
        } else {
            setRolls(rolls => rolls + 1);
            setDice(dice.map((die) => (die.pinned ? die : { ...die, value: Math.floor(Math.random() * 6) + 1 })));
            if (checkWin(dice)) {
                setWin(true);
            }
        }
    }

    return (<><div className="dice">
        {dice.map((die, index) => (
            <button key={index} className={`die ${die.pinned ? 'active' : ''}`} onClick={() => {
                setDice(dice.map((d, i) => i === index ? { ...d, pinned: !d.pinned } : d));
            }}>
                {die.value}
            </button>
        ))}
    </div><p>Rolls: {rolls}</p>
        <button onClick={rollDice}>{win ? "You win!" : "Roll"}</button>
    </>
    )
}