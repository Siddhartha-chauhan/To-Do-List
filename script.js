const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector("#list-container");
function addTask(){
    if (inputBox.value === ''){
        alert("You must write something");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

         // Make draggable
        li.setAttribute("draggable", "true");


        listContainer.appendChild(li);
        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();

}


listContainer.addEventListener("click", function(e){
    if (e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
},false);

let draggedItem = null;

listContainer.addEventListener("dragstart", function(e) {
    if (e.target.tagName === "LI") {
        draggedItem = e.target;
    }
});


listContainer.addEventListener("dragover", function(e) {
    e.preventDefault();

    const closestLi = e.target.closest("li");
    if (!closestLi || closestLi === draggedItem) return;

    const rect = closestLi.getBoundingClientRect();
    const offset = e.clientY - rect.top;

    if (offset > rect.height / 2) {
        closestLi.insertAdjacentElement("afterend", draggedItem);
    } else {
        closestLi.insertAdjacentElement("beforebegin", draggedItem);
    }
});

listContainer.addEventListener("drop", function() {
    saveData();
});



function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
    //  Restore drag ability for saved items
    listContainer.querySelectorAll("li").forEach(li => {
        li.setAttribute("draggable", "true");
    });
}



showTask();
