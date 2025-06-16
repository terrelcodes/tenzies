import "./dice.css"


export default function Dice(diceContainer: HTMLElement) {

    const rollButton = document.getElementById("roll-button")
    const rollsRef = document.getElementById("roll-count")
    const messageRef = document.getElementById("win-message")
    const diceRef = diceContainer!.querySelectorAll(".die") as NodeListOf<HTMLButtonElement>

    const count = diceRef.length
    let dice: number[] = []
    let win = false
    let rolls = 0

    function newGame() {
        dice = Array.from({ length: count }, () => (Math.floor(Math.random() * 6) + 1))
        rolls = 0
        win = false
        render()
        clearPinned()
    }

    function checkWin() {
        console.log(`checking for win: ${dice}`)
        let i = dice.length - 1;
        const val = dice[0]
        while (i > 0) {
            if (dice[i] !== val) {
                return false;
            }
            i--;
        }
        console.log(`win for ${dice}`);
        return true;
    }
    function setDie(die: HTMLButtonElement, value: number) {
        const img = die.firstElementChild as HTMLImageElement
        img.src = `/${value}.svg`
        img.alt = value.toString()
    }
    function rollDice() {
        if (win) {
            newGame();
        } else {
            rolls += 1
            rollsRef!.textContent = rolls.toString()
            diceRef.forEach((die, index) => {
                if (!die.classList.contains("active")) {
                    dice[index] = Math.floor(Math.random() * 6) + 1
                    setDie(die, dice[index])
                    console.log(`${index}: rolled ${dice[index]}`)
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
        rollsRef!.textContent = rolls.toString()
        diceRef.forEach((die, index) => {
            setDie(die, dice[index])
        })
    }

    function togglePinned(e: Event) {
        const target = e.target as HTMLElement
        const die = target.closest(".die") as HTMLButtonElement
        console.log(`toggling ${die.classList}`)
        die.classList.toggle("active")
    }

    function handleKeyPress(e: KeyboardEvent) {
        // Only handle number keys 1-9 and 0
        if (!/^[0-9]$/.test(e.key)) return;

        // Convert key to index (0-9)
        const index = e.key === '0' ? 9 : parseInt(e.key) - 1;

        // Check if index is valid for our dice
        if (index >= 0 && index < diceRef.length) {
            diceRef[index].click()
        }
    }

    rollButton!.addEventListener("click", rollDice)
    diceRef.forEach((die) => {
        die.addEventListener("click", togglePinned)
    })
    document.addEventListener("keydown", handleKeyPress)
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
