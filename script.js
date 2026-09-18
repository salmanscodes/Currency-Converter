let select=document.querySelectorAll(".select-container select");
let amount=document.querySelector(".amount input");
let from=document.querySelector(".from select")
let to=document.querySelector(".to select")
let btn=document.querySelector(".msg button");
let msg=document.querySelector(".msg p");
// async function main(){
//     let response=await fetch(url);
//     let data=await response.json()
// console.log("From 2",currency,"to pkr = " ,data[currency]["pkr"]*2);
// }

// main();

// for(code in countryList){
//     console.log(code,countryList[code]);
// }

for(let option of select) {
    for(code in countryList){
        let newoption=document.createElement("option");
       newoption.innerText=code;
       newoption.value=code;
       if(option.name==="from"&&code==="USD"){
        newoption.selected="selected";
       }
       else if(option.name==="To"&&code==="PKR"){
        newoption.selected="selected";
       }
       option.append(newoption);
    }

    option.addEventListener("change",e =>{
        updateFlag(e.target);
})
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}


const updateExchangeRate=async ()=>{
    let amountVal=amount.value;
     if (amountVal === "" || amountVal < 1) {
          amountVal = 1;
          amount.value = "1";
    }
    let currency = from.value.toLowerCase();
    let url=`https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`;
    let response=await fetch(url);
    let data=await response.json()
    let rate=data[currency][to.value.toLowerCase()];
    let finalAmount=rate*amountVal;
    msg.innerText=`${amountVal} ${from.value} = ${finalAmount} ${to.value}`;
    console.log(amountVal,from.value," = ",finalAmount,to.value);
}
updateExchangeRate();
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load", () => {
  updateExchangeRate();
});