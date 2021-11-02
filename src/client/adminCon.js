const aBtn = document.querySelector("#adminBtn");
const aText = document.querySelector("#admin");

aText.style.display = "none";

aBtn.addEventListener("click",()=> {
    aBtn.style.display = "none";
    aText.style.display = "block";
    
})