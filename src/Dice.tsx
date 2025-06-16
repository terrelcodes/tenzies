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
        newGame();
    },[count]);


    function checkWin(dice: Die[]) {
        const val=dice[0].value
        for (const die of dice){
            if (die.value !== val) {
                return false;
            }
        }
        return true;        
    }

    function rollDice() {
        if (win) {
            setWin(false);
            setRolls(0);
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
                <img src={`/${die.value}.svg`} alt={`${die.value} die`} />
            </button>
        ))}
    </div><p>Rolls: {rolls}</p>
        <button onClick={rollDice}>{win ? "You win!" : "Roll"}</button>
    </>
    )
}