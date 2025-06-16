import "./dice.css"


export default function Dice(diceContainer: HTMLElement) {
    
    const rollButton = document.getElementById("roll-dice")
    const rollsRef = document.getElementById("roll-count")
    const messageRef = document.getElementById("win-message")
    const diceRef = diceContainer!.querySelectorAll(".die") as NodeListOf<HTMLButtonElement>

    const count = diceRef.length
    let dice: number[] = []
    let win = false
    let rolls = 0

    function newGame() {
        dice = Array.from({ length: count }, () => ( Math.floor(Math.random() * 6) + 1))
        rolls = 0
        win = false
        render()
        clearPinned()
    }
   
    function checkWin() {
        console.log(`checking for win: ${dice}`)
        let i = dice.length-1;
        const val=dice[0]
        while (i>0){
            if (dice[i] !== val) {
                return false;
            }
            i--;
        }
        console.log(`win for ${dice}`);
        return true;        
    }

    function rollDice() {
        if (win) {
            newGame();
        } else {
            rolls+=1
            rollsRef!.textContent = `Rolls: ${rolls}`
            diceRef.forEach((die, index) => {
                if (!die.classList.contains("active")) {
                    dice[index] = Math.floor(Math.random() * 6) + 1
                    die.textContent = dice[index].toString()
                }
            })
            if (checkWin()) {
                messageRef!.textContent = "You win!"
                rollButton!.textContent = "New Game"
                // start win animation
                diceRef.forEach((die) => {
                    die.classList.add("win")
                    die.classList.remove("active")
                })
                setTimeout(() => {
                    diceRef.forEach((die) => {
                        die.classList.remove("win")
                    })
                }, 3000)
                win = true
            }
        }
    }

    function clearPinned() {
        diceRef.forEach((die) => {
            die.classList.remove("active")
        })
    }

    function render() {
        if (win) {
            messageRef!.textContent = "You win!"
            rollButton!.textContent = "New Game"
        } else {
            messageRef!.textContent = ""
            rollButton!.textContent = "Roll"
        }
        rollsRef!.textContent = `Rolls: ${rolls}`
        diceRef.forEach((die, index) => {
            die.textContent = dice[index].toString()
        })
    }

    function togglePinned(e: Event) {
        const target = e.target as HTMLElement
        target.classList.toggle("active")
    }

    rollButton!.addEventListener("click", rollDice)
    diceRef.forEach((die) => {
        die.addEventListener("click", togglePinned)
    })
    newGame()
}


if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        const diceContainer = document.getElementById("dice-container")
        if (diceContainer) {
            Dice(diceContainer)
        }
    })
} else {
    const diceContainer = document.getElementById("dice-container")
    if (diceContainer) {
        Dice(diceContainer)
    }
}
