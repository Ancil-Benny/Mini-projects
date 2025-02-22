function rollDice() {
    const input = document.getElementById('diceinp').value;
    const diceimg = document.getElementById('diceimg');
    const label = document.getElementById('dicenum');
    const values = [];
    const images = [];

    for (let i = 0; i < input; i++) {
        const value = Math.floor(Math.random() * 6) + 1;
        values.push(value);
        images.push(`<img src="Dices/d${value}.png" alt="Dice ${value}" style="margin: 5px">`);
    }

    label.textContent = `dice: ${values.join(', ')}`;
    diceimg.innerHTML = images.join('');
}