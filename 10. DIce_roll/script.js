const input = document.getElementById('diceinp');
const submit = document.getElementById('submit');
const label = document.getElementById('dicenum');
const d1 = document.getElementById('d1');
const d2 = document.getElementById('d2');
const d3 = document.getElementById('d3');
const d4 = document.getElementById('d4');
const d5 = document.getElementById('d5');
const d6 = document.getElementById('d6');

const nums = [];
submit.onclick = function(){
    d1.style.display = "none";
    d2.style.display = "none";
    d3.style.display = "none";
    d4.style.display = "none";
    d5.style.display = "none";
    d6.style.display = "none";
nums.length = 0;
const number = input.value;
if(isNaN(number) || number>6 || number<1){
    alert('invalid');
}
else{
getRandom(number);
for(let n of nums){
 if(n==1)
    d1.style.display = "block";
else if(n==2)
    d2.style.display = "block";
else if(n==3)
    d3.style.display = "block";
else if(n==4)
    d4.style.display = "block";
else if(n==5)
    d5.style.display = "block";
else if(n==6)
    d6.style.display = "block";
}
}
}

function getRandom(n){
    for(let i = 0; i<n;i++){
    let rand = Math.floor(Math.random()*6)+1;
    nums.push(rand);
    }
}