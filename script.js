const BASE_URL = "https://api.exchangerate-api.com/v4/latest";
const dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
let FromCurr = document.querySelector(".from select");
let ToCurr = document.querySelector(".to select");
let input = document.querySelector(".input");
let message = document.querySelector(".msg");
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
    }
    select.addEventListener("change" , (evt)=>{
         updateFlag(evt.target);
    });
}
document.addEventListener("load" , ()=>{

})
const updateFlag = (element) =>{
    let currCode = element.value;
    let newSrc = `https://flagsapi.com/${countryList[currCode]}/flat/64.png` ;
    let img = element.parentElement.querySelector("img"); 
    img.src = newSrc; 
};
btn.addEventListener("click" , async (evty) =>{
    evty.preventDefault();
    let amount = document.querySelector(".amount input");
    let a = amount.value;
    if(a == "" || a < 1 ){
        a = 1;
        amount.value=1;
    }
    const URL = `${BASE_URL}/${FromCurr.value.toLowerCase()}`;
    let res = await fetch(URL);
    let data = await res.json();
    let value =  data.rates[ToCurr.value]  * input.value;
    // console.log(value);
    message.innerHTML = `<div>${a} <b>${FromCurr.value}</b> = ${value} <b>${ToCurr.value}</b></div>`;
})