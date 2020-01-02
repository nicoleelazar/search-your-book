const fileName = document.getElementById('file-name');
const fileContent = document.getElementById('file-content');
const searchStat = document.getElementById('search-statistic');
const keyWord = document.getElementById('keyword');


window.onload = () => {
    fileContent.value = '';
    searchStat.innerHTML = '';
    keyWord.value = '';

}


function loadBook(textFileName, displayName) {

    fileName.innerHTML = displayName;

    //http request
    let http = new XMLHttpRequest();
    let url = `books/${textFileName}`;

    http.open("GET", url, true);
    http.send();

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            fileContent.value = http.responseText;

            fileContent.scrollTop = 0;

        }
    }
}