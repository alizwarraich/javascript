var input = document.getElementById("input");
var button = document.getElementById("addCategory");
var list = document.getElementById("list");
var deleteButton = document.querySelectorAll("ul>li>button")

var items = list.children;

function addListeners() {
    deleteButton = document.querySelectorAll("ul>li>button")

    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener("click", toggle);
    }

    for (let i = 0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener("click", del);
    }
}

addListeners();

function toggle() {
    this.classList.toggle("done");
}

function del(i) {
    // this.classList.toggle('done')
    this.parentNode.remove();
}

function addCategory() {
    var li = document.createElement("li");
    var button = document.createElement("button");
    li.appendChild(document.createTextNode(input.value));
    li.classList.add("white-color");
    button.appendChild(document.createTextNode("X"));
    li.appendChild(button);
    list.appendChild(li);
    input.value = "";
    addListeners();
}

function addListenerClick() {
    if (input.value.length > 0) {
        addCategory();
    }
    else {
        alert("Please input a value!");
    }
}

function addListenerPress(event) {
    if (event.which === 13) {
        if (input.value.length > 0)
            addCategory();
        else
            alert("Please input a value!");
    }
}

button.addEventListener("click", addListenerClick)

input.addEventListener("keypress", addListenerPress)