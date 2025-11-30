function newElement() {
    let inputVal = document.getElementById("myInput").value;

    if (inputVal === "") {
        alert("Please enter something!");
        return;
    }

    let li = document.createElement("li");
    li.textContent = inputVal;
    li.setAttribute("onclick", "toggleCheck(this)");

    let span = document.createElement("span");
    span.className = "close";
    span.innerHTML = "×";
    span.setAttribute("onclick", "removeItem(event)");

    li.appendChild(span);

    document.getElementById("myUL").appendChild(li);

    document.getElementById("myInput").value = "";
}

function toggleCheck(item) {
    item.classList.toggle("checked");
}

function removeItem(event) {
    event.stopPropagation();
    event.target.parentElement.remove();
}

function removeAll() {
    document.getElementById("myUL").innerHTML = "";
}
