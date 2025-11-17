const h2list = document.getElementsByTagName("h2");
const button = document.getElementById("btn");

let isStopped = false;  

button.addEventListener("click", () => {
    isStopped = !isStopped;  
    for (let h of h2list) {
        if (isStopped) {
            h.style.animation = "none";
            button.innerText="start" 
            button.style.backgroundColor ="green";
             button.style.color="white"; 
        } else {
            h.style.animation = ""; 
            button.innerText="stop" ;
            button.style.backgroundColor ="red";
            button.style.color="white";  
        }
    }
});
