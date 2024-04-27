const BASE_URL = 'https://openexchangerates.org/api/historical/';
const today = new Date().toISOString().slice(0, 10);
const app_id = '44f87c17c7d34bcda28a42a27723baaf';
//const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
// the above url is from video
const dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
let FromCurr = document.querySelector(".from select");
let ToCurr = document.querySelector(".to select");
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
const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png` ;
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
    
    // const URL = `${BASE_URL}/${FromCurr.value.toLowerCase()}/${ToCurr.value.toLowerCase()}.json`;
    // the above url is from video
    const URL = `${BASE_URL}${today}.json?base=${FromCurr.value.toLowerCase()}&symbols=${ToCurr.value.toLowerCase()}&app_id=${app_id}`;
    
    let res = await fetch(URL);
    let data = res.json();
    console.log(data);
})
