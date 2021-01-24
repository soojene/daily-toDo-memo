const toDoForm = document.querySelector(".toDoForm"),
    taskInput = toDoForm.querySelector(".TaskJS");
const pendingList = document.querySelector("#taskList");
const finishList = document.querySelector("#finishList");

let idNumbers = 1; 

const finishTask = "finishedTask";
let finishedTasks = [];

const task = "ToDo";
let tasks = [];

function saveTasks (x, y) {
    localStorage.setItem(x, JSON.stringify(y));
}

function delFinishTask (event){
    const Btn = event.target;
    const li = Btn.parentNode;
    finishList.removeChild(li);
    const reSaveTasks = finishedTasks.filter((x) => {
        return x.id != li.id; 
    });
    finishedTasks = reSaveTasks;
    saveTasks(finishTask, finishedTasks);
}

function delTask (event){
    const btn = event.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);
    const reSaveTasks = tasks.filter((x) => {
        return x.id != li.id; 
    });
    tasks = reSaveTasks;
    saveTasks(task, tasks);
}

function moveListHandler (event){
    const btn = event.target;
    const li = btn.parentNode;
    const span = btn.nextSibling;
    if (btn.innerText === "✅"){
        pendingList.removeChild(li);
    const newSave = tasks.filter((x) => {
        return x.id != li.id; 
    });
    tasks = newSave;
    saveTasks(task, tasks);
    makeFinishList(span.innerText);
    }
    else if (btn.innerText === "🔃") {
        finishList.removeChild(li);
    const saveAgain = finishedTasks.filter((x) => {
        return x.id != li.id; 
    });
    finishedTasks = saveAgain;
    saveTasks(finishTask, finishedTasks);
    taskList(span.innerText);
    }
}

function makeFinishList (text){
    const fLi = document.createElement("li");
    const fBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newID = idNumbers;
    idNumbers += 1;
    fBtn.innerText = "🔃";
    delBtn.innerText = "❎";
    span.innerText = text;
    fBtn.addEventListener("click", moveListHandler);
    delBtn.addEventListener("click", delFinishTask);
    fLi.appendChild(delBtn);
    fLi.appendChild(fBtn);
    fLi.appendChild(span);
    finishList.appendChild(fLi);
    fLi.id = newID;
    const finishTaskObj = {
        text: text,
        id: newID
    }
    finishedTasks.push(finishTaskObj);
    saveTasks(finishTask, finishedTasks);
}

function taskList (text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const checkBtn = document.createElement("button");
    const span = document.createElement("span");
    const newID = idNumbers;
    idNumbers += 1;
    delBtn.innerText = "❎";
    checkBtn.innerText = "✅";
    delBtn.addEventListener("click", delTask);
    checkBtn.addEventListener("click", moveListHandler);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(checkBtn);
    li.appendChild(span);
    li.id = newID; // li에도 아이디를 주어야 나중에 li를 아이디로 찾아서 삭제 할 수 있음
    pendingList.appendChild(li);
    const taskObj = {
        text: text,
        id: newID
    };
    tasks.push(taskObj);
    saveTasks(task, tasks);
}

function inputchange(event){
    event.preventDefault();
    const lists = taskInput.value;
    taskList(lists);
    console.log(lists);
    taskInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(task);
    const loadedFinish = localStorage.getItem(finishTask);
    if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    const parsedFinish = JSON.parse(loadedFinish);
    parsedToDos.forEach(function(tasks) {
        taskList(tasks.text);
    });
    parsedFinish.forEach(function(finishedTasks) {
        makeFinishList(finishedTasks.text);
    });
    } 
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", inputchange);
}
init();