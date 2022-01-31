// get input tag from class inputField
const inputField = document.querySelector('.inputField input');
// get button tag from class inputField
const button = document.querySelector('.inputField button');
const todoList = document.querySelector('.todoList');

showTasks();

// check if enter is clicked while focusing on inputField
inputField.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        // get value from input tag
        const inputValue = inputField.value;
        let getLocalStorageData = localStorage.getItem('todoList')
        if (getLocalStorageData == null) {
            listArray = []
        } else {
            listArray = JSON.parse(getLocalStorageData)
        }
        listArray.push(inputValue)
        localStorage.setItem('todoList', JSON.stringify(listArray))
        showTasks();
    }
});

button.addEventListener('click', () => {
    // get value from input tag
    const inputValue = inputField.value;
    let getLocalStorageData = localStorage.getItem('todoList')
    if (getLocalStorageData == null) {
        listArray = []
    } else {
        listArray = JSON.parse(getLocalStorageData)
    }
    listArray.push(inputValue)
    localStorage.setItem('todoList', JSON.stringify(listArray))
    showTasks();
})

function showTasks() {
    let getLocalStorageData = localStorage.getItem('todoList')
    if (getLocalStorageData == null) {
        listArray = []
    } else {
        listArray = JSON.parse(getLocalStorageData)
    }
    let newLiTag = ""
    let finished = 0
    listArray.forEach(function (item, index) {
        if (item.includes("<strike>")) {
            newLiTag += `<li>${item} <div class="icons"><span style="background: #e74c3c;" onclick="checkTask('${item}', ${index})"><i class="fas fa-times"></i></span><span onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></div></li>`
            finished += 1
        } else {
            newLiTag += `<li>${item} <div class="icons"><span onclick="checkTask('${item}', ${index})"><i class="fas fa-check"></i></span><span onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></div></li>`
        }
    })
    todoList.innerHTML = newLiTag
    const pendingTasks = document.querySelector(".pending")
    pendingTasks.textContent = listArray.length - finished
}

function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem('todoList')
    listArray = JSON.parse(getLocalStorageData)
    listArray.splice(index, 1)
    localStorage.setItem('todoList', JSON.stringify(listArray))
    showTasks();
}

function checkTask(item, index) {
    let getLocalStorageData = localStorage.getItem('todoList')
    listArray = JSON.parse(getLocalStorageData)
    // from todoList find item in li
    let li = document.querySelectorAll('.todoList li')
    let liItem = li[index]
    let foundLi = undefined
    console.log(liItem.textContent)
    console.log(item)
    if (liItem.textContent.includes(item.replace("<strike>", "").replace("</strike>", ""))) {
        foundLi = liItem
    } else {}
    // check if item already have strike
    if (item.includes("<strike>")) {
        // remove strike
        listArray[index] = item.replace("<strike>", "").replace("</strike>", "")
        localStorage.setItem('todoList', JSON.stringify(listArray))
        // showTasks();
    } else {
        listArray.splice(index, 1, `<strike>${item}</strike>`)
    }
    localStorage.setItem('todoList', JSON.stringify(listArray))
    showTasks();
}

// get button in footer
const footerButton = document.querySelector('.footer button');

footerButton.addEventListener('click', () => {
    listArray = [];
    localStorage.setItem('todoList', JSON.stringify(listArray))
    showTasks();
})