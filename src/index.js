import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

let tempArray = [];
let newDataArray = [];
let displayArray = [];
let numberOfItem = 10;
let first = 0;
let actualPage = 1;
let maxPage;

let input = document.getElementById("inputSearch");

function Ajax(verbs, url, fnCb, data = null) {
    let httpRequest;
    if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+...
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 6 et antérieurs
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }

    httpRequest.onreadystatechange = alertContents;
    httpRequest.open(verbs, url);
    httpRequest.send(data);

    function alertContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                fnCb(httpRequest);
            }
        }
    }
}


Ajax('GET', 'http://localhost:3000/constants', function (responseConstants) {
    if (responseConstants.responseText) {
        setInterval(() => {
            if (responseConstants.responseText.includes('isTrue')) {
                Ajax('GET', 'http://localhost:3000/jobs', function (responseJobs) {
                    newDataArray = JSON.parse(responseJobs.responseText);
                    updateArray(tempArray, newDataArray)
                    maxPage = Math.ceil(displayArray.length / numberOfItem);
                    displayArray.sort(function(a, b) {
                        let c = new Date(a.date);
                        let d = new Date(b.date);
                        return c-d;
                    });
                    showList();
                })
            }
        }, 1000)

        searchFunction();
    }
})

function compareArray() {
    if (tempArray.length >= newDataArray.length) {
        return tempArray;
    } else {
        return newDataArray;
    }
}

let updateArray = (tempArray, newDataArray) => {
    if (JSON.stringify(tempArray) !== JSON.stringify(newDataArray)) {
        if (newDataArray === compareArray()) {
            newDataArray.forEach(function (eltNewData) {
                if (!tempArray.find(element => element.id === eltNewData.id)) {
                    tempArray.push(eltNewData);

                }
                if (input.value === "") {
                    displayArray = tempArray;

                }
            })

        } else {
            tempArray.forEach(function (eltTmpData) {
                if (!newDataArray.find(element => element.id === eltTmpData.id)) {
                    let index = tempArray.findIndex(element => element.id === eltTmpData.id)
                    tempArray.splice(index, 1).concat(tempArray.slice(index, 1))
                    let removeId = document.querySelector(`[data-index="${eltTmpData.id}"]`)
                    if (removeId) {
                        removeId.remove();
                    }
                }
            })
        }
    }
}


function searchFunction() {
    input.addEventListener("keyup", () => {
        let dict = [];

        function prePopulate() {
            displayArray = tempArray;
            Object.values(displayArray).forEach(function (word, i) {
                dict.push({"id": word.id, "name": word.name, "date": word.date});
            });
        }

        function search(term) {
            displayArray = []
            const regex = new RegExp(`^${term}`);

            for (term of dict) {
                if (term.name.match(regex)) {
                    displayArray.push({"id": term.id, "name": term.name, "date": term.date})
                }
                if (term.date.match(regex)) {
                    displayArray.push({"id": term.id, "name": term.name, "date": term.date})
                }
            }
            console.log('displayArray', displayArray.length)
        }

        prePopulate();
        search(input.value);
    })

}


document.getElementById('firstPage').addEventListener('click', () => {
    first = 0;
    actualPage = 1;
    showList();
})
document.getElementById('nextPage').addEventListener('click', () => {
    if (first + numberOfItem <= displayArray.length - 1) {
        first += numberOfItem;
        actualPage++;
        showList();
    }

})
document.getElementById('previous').addEventListener('click', () => {
    if (first - numberOfItem >= 0) {
        first -= numberOfItem;
        actualPage--;
        showList();
    }
})
document.getElementById('lastPage').addEventListener('click', () => {
    first = (maxPage * numberOfItem) - numberOfItem;
    actualPage = maxPage;
    showList();
})

function showList() {
    let showJobList = '';
    for (let i = first; i < first + numberOfItem; i++) {
        if (i < displayArray.length) {
            showJobList += `
            <tr data-index="${displayArray[i].id}">
                <td>${displayArray[i].id}</td><td>${displayArray[i].name}</td><td>${displayArray[i].date}</td>
            </tr>`;
        }
    }
    document.getElementById('jobList').innerHTML = showJobList;
    showPageInfo()
}

function showPageInfo() {
    document.getElementById('pageInfo').innerHTML = `Page ${actualPage} / ${maxPage}`
}


function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}