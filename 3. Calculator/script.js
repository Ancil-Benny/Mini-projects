const par = document.querySelector("#digits");
let val = document.getElementById('inp');

let currentValue = "";
let previousValue = "";
let operator = null;

par.addEventListener("click", function (e) {
    // only buttons trigger actions
    if (!e.target.classList.contains("b")) return; 
    const clicked = e.target.innerText;


    if (!isNaN(clicked)) {
        // Append number
        currentValue += clicked;
        val.value = currentValue;
    } else if (clicked === "C") {
        // Clear everything
        currentValue = "";
        previousValue = "";
        operator = null;
        val.value = "0";
    } else if (["+", "-", "*", "/"].includes(clicked)) {
        // Store operator and prepare for the next value
        if (currentValue) {
            previousValue = currentValue;
            currentValue = "";
            operator = clicked;
        }
    } else if (clicked === "=") {
        // Perform calculation
        if (currentValue && previousValue && operator) {
            const num1 = parseFloat(previousValue);
            const num2 = parseFloat(currentValue);

            switch (operator) {
                case "+":
                    currentValue = (num1 + num2).toString();
                    break;
                case "-":
                    currentValue = (num1 - num2).toString();
                    break;
                case "*":
                    currentValue = (num1 * num2).toString();
                    break;
                case "/":
                    currentValue = num2 !== 0 ? (num1 / num2).toString() : "Error";
                    break;
            }

            val.value = currentValue;
            previousValue = "";
            operator = null;
        }
    }
});
