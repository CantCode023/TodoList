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
    const pendingTasks = document.querySelector(".pending")
    pendingTasks.textContent = listArray.length
    let newLiTag = ""
    listArray.forEach(function (item, index) {
        newLiTag += `<li>${item} <div class="icons"><span onclick="checkTask('${item}', ${index})"><i class="fas fa-check"></i></span><span onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></div></li>`
        console.log(newLiTag)
    })
    todoList.innerHTML = newLiTag
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
    listArray.splice(index, 1, `<strike>${item}</strike>`)
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
