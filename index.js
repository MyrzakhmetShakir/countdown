const inputContainer = document.querySelector(".choose");
const countContainer = document.querySelector(".countdown");
const completeContainer = document.querySelector(".complete");

const textInp = document.querySelector("#title");
const dateInp = document.querySelector("#data-picker");

const submitButton = document.querySelector(".submitButton");
const resetButton = document.querySelector("#countdown");
const newButton = document.querySelector(".newcount");

const spans = document.querySelectorAll("span");
const titleText = document.querySelector(".title-text");
const textInfo = document.querySelector(".complete-info");


let interval, storage;

function reset() {
    countContainer.hidden = true; completeContainer.hidden = true;
    textInp.value = ""; dateInp.value = "";
    inputContainer.hidden = false;
    storage = "";
    localStorage.removeItem("data");
}

function setCountDown(setDate, setText) {
    inputContainer.hidden = completeContainer.hidden = true;
        if(setText === "") {
            alert("Please, set the title");
            reset();
        } else {
            titleText.innerHTML = setText
            interval = setInterval(()=>{
                let diffEach = new Date(setDate) - new Date(); 
                spans[0].innerHTML = Math.floor(diffEach/1000/3600/24);
                spans[1].innerHTML = Math.floor((diffEach/1000/3600)%24);
                spans[2].innerHTML = Math.floor(diffEach/1000/60%60);
                spans[3].innerHTML = Math.floor(diffEach/1000%60);
            }, 1000);
            countContainer.hidden = false;
        }
        
}

function setComplete(setDate, setText) {
    countContainer.hidden = inputContainer.hidden = true;
    textInfo.innerHTML = `'${setText}' coundown finised on ${setDate}` 
    completeContainer.hidden = false;
}

let isInStorageData = localStorage.getItem("data");
if(isInStorageData !== null) {
    let arr = isInStorageData.split(",");
    new Date(arr[0]) - new Date() > 0 
        ? setCountDown(arr[0], arr[1])
        : setComplete(arr[0], arr[1]);
} else {  reset();  } 


submitButton.addEventListener('click', (event)=>{
    event.preventDefault();
    storage = [dateInp.value, textInp.value];
    localStorage.setItem("data", storage)
    new Date(dateInp.value) - new Date() > 0
        ? setCountDown(dateInp.value, textInp.value)
        : setComplete(dateInp.value, textInp.value)
    })

newButton.addEventListener("click", reset);

resetButton.addEventListener("click", () => {
    clearInterval(interval);
    spans.forEach(span => span.innerHTML = 0);
    reset();
})


