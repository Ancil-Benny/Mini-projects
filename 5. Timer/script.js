const hoursLeftText = document.querySelector('.hoursleft').innerText;
const hoursRightText = document.querySelector('.hoursright').innerText;
const minutesLeftText = document.querySelector('.minutesleft').innerText;
const minutesRightText = document.querySelector('.minutesright').innerText;
const secondsLeftText = document.querySelector('.secondsleft').innerText;
const secondsRightText = document.querySelector('.secondsright').innerText;
let counter=0;
document.querySelector('.clockbody').addEventListener('click', (event) => {
    if (event.target.classList.contains('setbtn')) {
        switch (event.target.id) {
            case 'shl':
                const hoursLeftElement = document.querySelector('.hoursleft'); 
                counter = parseInt(hoursLeftElement.innerText);
                if(counter!=2){ 
                counter++; 
                hoursLeftElement.innerText = counter; 
                }
             
                break;
            case 'shr':
                const hoursrightElement = document.querySelector('.hoursright'); 
                counter = parseInt(hoursrightElement.innerText);
                if(counter!=3){ 
                counter++; 
                hoursrightElement.innerText = counter; 
                }
                break;
            case 'sml':
                const minLeftElement = document.querySelector('.minutesleft'); 
                counter = parseInt(minLeftElement.innerText);
                if(counter!=5){ 
                counter++; 
                minLeftElement.innerText = counter; 
                }
                break;
            case 'smr':
                const minrightElement = document.querySelector('.minutesright'); 
                counter = parseInt(minrightElement.innerText);
                if(counter!=9){ 
                counter++; 
                minrightElement.innerText = counter; 
                }
                break;
            case 'ssl':
                const secLeftElement = document.querySelector('.secondsleft'); 
                counter = parseInt(secLeftElement.innerText);
                if(counter!=5){ 
                counter++; 
                secLeftElement.innerText = counter; 
                }
                break;
            case 'ssr':
                const secrightElement = document.querySelector('.secondsright'); 
                counter = parseInt(secrightElement.innerText);
                if(counter!=9){ 
                counter++; 
                secrightElement.innerText = counter; 
                }
                break;
        }
    }
    else if (event.target.classList.contains('unsetbtn')) {
        switch (event.target.id) {
            case 'ushl':
                const hoursLeftElement = document.querySelector('.hoursleft'); 
                counter = parseInt(hoursLeftElement.innerText);
                if(counter!=0){ 
                counter--; 
                hoursLeftElement.innerText = counter; 
                }
                break;
            case 'ushr':
                const hoursrightElement = document.querySelector('.hoursright'); 
                counter = parseInt(hoursrightElement.innerText);
                if(counter!=0){ 
                counter--; 
                hoursrightElement.innerText = counter; 
                }
                break;
            case 'usml':
                const minLeftElement = document.querySelector('.minutesleft'); 
                counter = parseInt(minLeftElement.innerText);
                if(counter!=0){ 
                counter--; 
                minLeftElement.innerText = counter; 
                }
                break;
            case 'usmr':
                const minrightElement = document.querySelector('.minutesright'); 
                counter = parseInt(minrightElement.innerText);
                if(counter!=0){ 
                counter--; 
                minrightElement.innerText = counter; 
                }
            case 'ussl':
                const secLeftElement = document.querySelector('.secondsleft'); 
                counter = parseInt(secLeftElement.innerText);
                if(counter!=0){ 
                counter--; 
                secLeftElement.innerText = counter; 
                }
                break;
            case 'ussr':
                const secrightElement = document.querySelector('.secondsright'); 
                counter = parseInt(secrightElement.innerText);
                if(counter!=0){ 
                counter--; 
                secrightElement.innerText = counter; 
                }
                break;
        }
    }
});
let hours = parseInt(hoursLeftText + hoursRightText);
let minutes =parseInt(minutesLeftText + minutesRightText);
let seconds = parseInt(secondsLeftText + secondsRightText);

document.querySelector(".btntop").addEventListener('click', (e) => {
    if (e.target.id.includes('start')) {
        let hours = parseInt(document.querySelector('.hoursleft').innerText + document.querySelector('.hoursright').innerText);
        let minutes = parseInt(document.querySelector('.minutesleft').innerText + document.querySelector('.minutesright').innerText);
        let seconds = parseInt(document.querySelector('.secondsleft').innerText + document.querySelector('.secondsright').innerText);



        // Start the timer
        const timer = setInterval(() => {
            if (hours === 0 && minutes === 0 && seconds === 0) {
                clearInterval(timer);
                return;
            }

            // Decrement seconds
            seconds--;

            // Borrow from minutes and hours
            if (seconds < 0) {
                if (minutes > 0) {
                    seconds = 59;
                    minutes--;
                } else if (hours > 0) {
                    seconds = 59;
                    minutes = 59;
                    hours--;
                }
            }

            // Update 
            updateTimeOnDOM(hours, minutes, seconds);
        }, 1000);
    }
});

