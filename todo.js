const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

  const TODOS_LS = "toDos";
  
  let toDos = [];

function deltoDo (event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter((x) => {
    return x.id !== li.id; // 필터함수는 배열안의 아이템을 다 돌면서 실행코드에 맞는걸 찾아냄
  });
  toDos = cleanToDos;//저장을 안해주면 객체수가 유지되어서 객체삭제가 한번만 볼때만 이루어짐
  saveToDos(); // 그 저장됨 값을 다시 로콜에 저장해야 클릭할때마다 배열이 다르게 저장됨.
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

  function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    // const newId = toDos.length + 1;
    // const newId = toDoInput.value;
    delBtn.innerText = "💟";
    delBtn.addEventListener("click", deltoDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = text;
    toDoList.appendChild(li);
    const toDoObj = {
      text: text, //키에 text대신 name으로 변경하면 리로드 되고 나서 값이 undefined됨
      id: text
    };
    toDos.push(toDoObj);
    saveToDos();
}

// 할일들을 작성하면 실행되는 함수
function handleSubmit(event) {
  event.preventDefault(); //중요!!!! 창이 새로고침 없이 submit만!이 코드를 사용하지 않으면 객체도 리스트도 쌓이지 않고 보이지도 않음
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = ""; // 새로고침이 안됨으로 따로 작성해줘야 유저가 번거롭지 않게 그전 인풋값이 사라짐.
}

// 웹이 열리면 실행되는 함수(그 전에 작성되었던 것이 저장되었다가 리로드했을때 유지됨)
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  } 
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();