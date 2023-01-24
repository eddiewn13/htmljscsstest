let personArray = [];
let startPickedAmount = 0;
let themeArray = ["50s","60s","70s", "80s", "90s", "Jazz", "Superhjältar", "Antagonister", "Rustisk och robust"];
let themeHistory = [];



function saveData() {
    localStorage.setItem("personArray", JSON.stringify(personArray));
    localStorage.setItem("themeArray", JSON.stringify(themeArray));
    localStorage.setItem("themeHistory", JSON.stringify(themeHistory));
}

function loadData() {
    if (localStorage.personArray != null) {
        personArray = JSON.parse(localStorage.getItem("personArray"));
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
    themeArray.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item;
        list.appendChild(li);
    })
    saveData();
}



function loadPeopleList() {
    loadData();
    let list = document.getElementById("personList")
    personArray.forEach((item) => {
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

    personArray = [];
    saveData();
}

function removeAllThemesFunction() {
    loadData();

    themeArray = ["50s", "60s","70s", "80s", "90s", "Jazz", "Superhjältar", "Antagonister", "Rustisk och robust"];
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
            this.startPickedAmount = startPickedAmount,
        ]

        personArray.push(person)

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
    personArray.pop();
    saveData();

    let list = document.querySelectorAll('#personList li')
    for (let i = 0; li = list[i]; i++) {
        li.parentNode.removeChild(li);
    }


    loadPeopleList();
}



document.getElementById("calculate").addEventListener("click", calculateThemePerson);

function calculateThemePerson() {
    if (personArray.length < 2) {
        alert("You need more names")
    }else{
    loadData()

    let chosenFirst;
    let chosenSecond;
    let theme;
    let firstRandom = Math.floor(Math.random(1) * personArray.length)
    let secondRandom

    chosenFirst = personArray[firstRandom]
    do {
        secondRandom = Math.floor(Math.random(1) * personArray.length)
        chosenSecond = personArray[secondRandom]
    } while (firstRandom == secondRandom)

    personArray[firstRandom][1]++;
    personArray[secondRandom][1]++;

    theme = themeArray[Math.floor(Math.random(1) * themeArray.length)];
    while (themeHistory.includes(theme)) {
        theme = themeArray[Math.floor(Math.random(1) * themeArray.length)];
    }


    document.getElementById("firstPerson").innerHTML = chosenFirst;
    document.getElementById("secondPerson").innerHTML = chosenSecond;

    document.getElementById("themeResult").innerHTML = theme;



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
    }
    loadPeopleList();


    let historyList = document.querySelectorAll('#historyList li')
    for (let i = 0; li = historyList[i]; i++) {
        li.parentNode.removeChild(li);
    }
    loadHistoryList();
}

}

loadPeopleList();
loadThemeList();
loadHistoryList();