const fileName = document.getElementById('file-name');
const fileContent = document.getElementById('file-content');
const searchStat = document.getElementById('search-statistic');
const wordCount = document.getElementById('word-count');
const keyWord = document.getElementById('keyword');
const topFiveWords = document.getElementById('most-used-word');
const bottomFiveWords = document.getElementById('least-used-word');

let bookTextArray;



// window.onload = () => {
//     fileContent.value = '';
//     searchStat.innerHTML = '';
//     keyWord.value = '';
// }

function reset() {
    bookTextArray = '';
    keyWord.value = '';
    searchStat.innerHTML = '';
    wordCount.innerHTML = '';

    while (topFiveWords.hasChildNodes()) {
        topFiveWords.removeChild(topFiveWords.firstChild);
    }

    while (bottomFiveWords.hasChildNodes()) {
        bottomFiveWords.removeChild(bottomFiveWords.firstChild);
    }

}


function loadBook(textFileName, displayName) {

   reset();

    //http request
    let http = new XMLHttpRequest();
    let url = `books/${textFileName}`;

    http.open("GET", url, true);
    http.send();

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            currentBook = http.responseText;

            fileName.innerHTML = displayName;

            fileContent.innerHTML = currentBook.replace(/(?:\n\r|\n|\r)/g, '<br>');

            fileContent.scrollTop = 0;

            tallyText(currentBook);


        }
    }


}



// let testString = "Essentials  is  a series  lolly-pop  is  a  that_ series, series a cover's the most used used and important methods for topic."



function tallyText(anyText) {


    // find only words between 2 white spaces
    bookTextArray = anyText.toLowerCase().match(/\b\S+\b/g);

    console.log(bookTextArray)

    //word count includes stop words
    wordCount.innerHTML = `Word Count: ${bookTextArray.length}`;

    uncommonWords();

    sortedArray();

}




// remove stopwords from text array
function uncommonWords() {
    let stopWords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"];
    for (let i = 0; i < stopWords.length; i++) {
        for (let j = 0; j < bookTextArray.length; j++) {
            if (stopWords[i] === bookTextArray[j]) {
                bookTextArray.splice(j, 1);
            }
        }
    }
}


// tally each word with a count (key: value)
function sortedArray() {
    let textObject = {};

    for (let word of bookTextArray) {
        if (textObject[word] > 0) {
            textObject[word] += 1;
        } else {
            //get the string into the object
            textObject[word] = 1;
        }
    }

    // Object to Array
    let tallyArray = Object.entries(textObject);


    //sort the text decending order
    tallyArray.sort(function (first, second) {
        return second[1] - first[1];
    });

    // console.log(tallyArray);

    topFiveBookWords(tallyArray);

    bottomFiveBookWords(tallyArray);

}


// isolate and display 5 most used words
function topFiveBookWords(anySortedArray) {

    let topFive = anySortedArray.slice(0, 5);

    for (let topword of topFive) {
        let listItemTop = document.createElement('li');
        topFiveWords.appendChild(listItemTop);

        listItemTop.innerHTML = `${topword[0]}: ${topword[1]}`

    }
    console.log(topFiveWords.childNodes)

}


// isolate and display 5 least used words
function bottomFiveBookWords(anySortedArray) {

    let bottomFive = anySortedArray.slice(-5);

    for (let bottomword of bottomFive) {
        let listItemBottom = document.createElement('li');
        bottomFiveWords.appendChild(listItemBottom);

        listItemBottom.innerHTML = `${bottomword[0]}: ${bottomword[1]}`
    }

}


// for search input field
function markText() {

    // removes the <mark> tag to clear already highlighted words
    let markedWords = document.querySelectorAll('.marked');
    for (let i = 0; i < markedWords.length; i++) {
        markedWords[i].outerHTML = markedWords[i].innerHTML;
    }


    // find and mark searched keyword
    let bookTextInField = fileContent.innerHTML;
    let keyword = keyWord.value;

    let allMatches = new RegExp("\\b" + keyword + "\\b", "gi");
    let markMe = '<mark class="marked">$&</mark>';
    let newContent = bookTextInField.replace(allMatches, markMe);

    fileContent.innerHTML = newContent;

    // display number of marked words found
    let newMarkedWords = document.querySelectorAll('.marked');
    searchStat.innerHTML = `${newMarkedWords.length} matches found.`

    // scroll first match into view leaving parent div stationary
    if (newMarkedWords.length > 0) {
        let target = newMarkedWords[0];
        target.parentNode.scrollTop = target.offsetTop - target.parentNode.offsetTop;
    }

}