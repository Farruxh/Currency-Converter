const BASE_URL = "https://api.exchangerate-api.com/v4/latest";
const dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
let FromCurr = document.querySelector(".from select");
let ToCurr = document.querySelector(".to select");
let input = document.querySelector(".input");
let message = document.querySelector(".msg");
let mode = document.querySelector(".mode");
let body = document.querySelector("body");
let container = document.querySelector(".container");
let heading2 = document.querySelector(".heading");
let para = document.querySelector(".para");
let para_from = document.querySelector(".para_from");
let para_to = document.querySelector(".para_to");
let dark_mode = "white";
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
    message.innerHTML = `<div>${a} <b>${FromCurr.value}</b> = ${value} <b>${ToCurr.value}</b></div>`;
})
mode.addEventListener("click", () =>{
    if(dark_mode === "white"){
        body.classList.remove("body");
        container.classList.remove("container");
        btn.classList.remove("button");
        heading2.classList.remove("heading");
        message.classList.remove("msg");
        para.classList.remove("para");
        para_from.classList.remove("para_from");
        para_to.classList.remove("para_to");
    
        body.classList.add("body1");
        container.classList.add("container1");
        btn.classList.add("button1");
        heading2.classList.add("heading2");
        message.classList.add("msg2");
        para.classList.add("para2");
        para_from.classList.add("para_from1");
        para_to.classList.add("para_to1");
        mode.innerHTML = `<i class="fa-solid fa-sun"></i>`;
        mode.classList.add("mode1");
            
        dark_mode = "black";
    }
    else if(dark_mode === "black"){
        body.classList.remove("body1");
        container.classList.remove("container1");
        btn.classList.remove("button1");
        heading2.classList.remove("heading2");
        message.classList.remove("msg2");
        para.classList.remove("para2");
        para_from.classList.remove("para_from1");
        para_to.classList.remove("para_to1");
        mode.classList.remove("mode1");
    
        body.classList.add("body");
        container.classList.add("container");
        btn.classList.add("button");
        heading2.classList.add("heading");
        message.classList.add("msg");
        para.classList.add("para");
        para_from.classList.add("para_from");
        para_to.classList.add("para_to");
        mode.classList.add("mode");
        mode.innerHTML = `<i class="fa-solid fa-moon"></i>`;
            
        dark_mode = "white"; 
    }
});