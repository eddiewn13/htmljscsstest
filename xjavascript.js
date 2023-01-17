let array = [];
let number = 0;
let themeArray = ["70s", "80s", "90s", "Rock & Roll", "Disco", "Blues"];
let themeHistory = [];

function saveData() {
    localStorage.setItem("array", JSON.stringify(array));
    localStorage.setItem("themeArray", JSON.stringify(themeArray));
    localStorage.setItem("themeHistory", JSON.stringify(themeHistory));
}

function loadData() {
    if (localStorage.array != null) {
        array = JSON.parse(localStorage.getItem("array"));
    }
    if (localStorage.themeArray != null) {
        themeArray = JSON.parse(localStorage.getItem("themeArray"))
    }
    if (localStorage.themeHistory != null) {
        themeHistory = JSON.parse(localStorage.getItem("themeHistory"))
    }

}

function loadHistoryList() {
    loadData();
    let list = document.getElementById("historyList")
    themeHistory.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item;
        list.appendChild(li);
    })
    saveData();
}

function loadThemeList() {
    loadData();
    let list = document.getElementById("themeList");
    console.log(themeArray)
    themeArray.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item;
        list.appendChild(li);
    })
    saveData();
}

function addThemeList() {

}

function loadPeopleList() {
    loadData();
    let list = document.getElementById("personList")
    array.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item;
        list.appendChild(li);
    })
    saveData();
}

function removeAllPeopleFunction() {
    loadData();
    let list = document.querySelectorAll('#personList li')
    for (let i = 0; li = list[i]; i++) {
        li.parentNode.removeChild(li);
    }

    array = [];
    saveData();
}

function removeAllThemesFunction() {
    loadData();

    themeArray = ["70s", "80s", "90s", "Rock & Roll", "Disco", "Blues"];
    saveData();


    let themeList = document.querySelectorAll('#themeList li')
    for (let i = 0; li = themeList[i]; i++) {
        li.parentNode.removeChild(li);
    }
    loadThemeList();


}

function addThemeFunction() {
    loadData();
    let themeName = document.getElementById("themeName").value;

    if (themeArray.includes(themeName)) {
        alert("Can't add already existing theme")
    } else if (themeName == "") {
        alert("Theme name can't be empty")
    } else {
        themeArray.push(themeName)
        saveData();

        let themeList = document.querySelectorAll('#themeList li')
        for (let i = 0; li = themeList[i]; i++) {
            li.parentNode.removeChild(li);
        }
        loadThemeList();

    }

}

function addPersonFunction() {
    loadData();

    let name = document.getElementById("personName").value;

    if (name == "") {
        alert("Name can not be empty")
    } else {
        let person = [
            this.name = name,
            this.number = number,
        ]

        array.push(person)

        saveData();

        let list = document.querySelectorAll('#personList li')
        for (let i = 0; li = list[i]; i++) {
            li.parentNode.removeChild(li);
        }
        loadPeopleList();

    }
}

function removeThemeFunction() {
    loadData();
    themeArray.pop();
    saveData();

    let list = document.querySelectorAll('#themeList li')
    for (let i = 0; li = list[i]; i++) {
        li.parentNode.removeChild(li);
    }


    loadThemeList();
}

function removePersonFunction() {
    loadData();
    array.pop();
    saveData();

    let list = document.querySelectorAll('#personList li')
    for (let i = 0; li = list[i]; i++) {
        li.parentNode.removeChild(li);
    }


    loadPeopleList();
}



document.getElementById("calculate").addEventListener("click", calculateThemePerson);

function calculateThemePerson() {
    if (array.length < 2) {
        alert("You need more names")
    }else{
    console.log("im clicked");
    loadData()

    let chosenFirst;
    let chosenSecond;
    let theme;
    let firstRandom = Math.floor(Math.random(1) * array.length)
    let secondRandom

    chosenFirst = array[firstRandom]
    do {
        console.log("hello1")
        secondRandom = Math.floor(Math.random(1) * array.length)
        chosenSecond = array[secondRandom]
    } while (firstRandom == secondRandom)

    array[firstRandom][1]++;
    array[secondRandom][1]++;

    theme = themeArray[Math.floor(Math.random(1) * themeArray.length)];
    while (themeHistory.includes(theme)) {
        console.log("hello2")
        theme = themeArray[Math.floor(Math.random(1) * themeArray.length)];
    }


    console.log(array)
    document.getElementById("firstPerson").innerHTML = "First person = " + chosenFirst;
    document.getElementById("secondPerson").innerHTML = "Second person = " + chosenSecond;

    document.getElementById("themeResult").innerHTML = "Theme = " + theme;



    if (themeHistory.length > 4) {
        themeHistory.shift();
        themeHistory.push(theme)
    } else {
        themeHistory.push(theme)
    }
    saveData();

    let personList = document.querySelectorAll('#personList li')
    for (let i = 0; li = personList[i]; i++) {
        li.parentNode.removeChild(li);
        console.log("Hello3")
    }
    loadPeopleList();


    let historyList = document.querySelectorAll('#historyList li')
    for (let i = 0; li = historyList[i]; i++) {
        li.parentNode.removeChild(li);
        console.log("Hello3")
    }
    loadHistoryList();
}

}

loadPeopleList();
loadThemeList();
loadHistoryList();