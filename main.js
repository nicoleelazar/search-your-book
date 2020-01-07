const fileName = document.getElementById('file-name');
let fileContent = document.getElementById('file-content');
const searchStat = document.getElementById('search-statistic');
const keyWord = document.getElementById('keyword');
const topFiveWords = document.getElementById('most-used-word');
const bottomFiveWords = document.getElementById('least-used-word');



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
            currentBook = http.responseText;

            fileContent.innerHTML = currentBook.replace(/(?:\n\r|\n|\r)/g, '<br>');


            fileContent.scrollTop = 0;


            // tallyText(currentBook);


        }
    }

}


function markText() {
    let bookTextInField = fileContent.innerHTML;
    let searchedWord = keyWord.value;

    let allMatches = new RegExp(searchedWord, "gi");
    let markMe = "<mark>hello</mark>";

    let newContent = bookTextInField.replace(allMatches, markMe);

    fileContent.innerHTML = newContent

}


let testString = "Essentials is a series lolly-pop is a that_ series, series a cover's the most used used and important methods for topic."








let bookTextArray;

tallyText(testString);



function tallyText(anyText) {
    // text to array removing symbols
    bookTextArray = anyText.replace(/([^A-Za-z0-9\s-])/g, "").toLowerCase().split(' ');

    //do this here for word count
    console.log(bookTextArray.length)

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


// tally each word
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

    console.log(tallyArray);

    topFiveBookWords(tallyArray);

    bottomFiveBookWords(tallyArray);

}


function topFiveBookWords(anySortedArray) {

    let topFive = anySortedArray.slice(0, 5);

    for (let topword of topFive) {
        let listItemTop = document.createElement('li');
        topFiveWords.appendChild(listItemTop);

        listItemTop.innerHTML = `${topword[0]}: ${topword[1]}`

    }

}


function bottomFiveBookWords(anySortedArray) {

    let bottomFive = anySortedArray.slice(-5);

    for (let bottomword of bottomFive) {
        let listItemBottom = document.createElement('li');
        bottomFiveWords.appendChild(listItemBottom);

        listItemBottom.innerHTML = `${bottomword[0]}: ${bottomword[1]}`
    }

}






// //TEST CODE ON TEST STRING


// let testString = "Essentials is a series lolly-pop is a that_ series, series a cover's the most used used and important methods for topic."

// // part 1
// //remove all symbols not including hyphen
// let textArray = testString.replace(/([^A-Za-z0-9\s-])/g, "").toLowerCase().split(' ');

// //function 2
// for (let i = 0; i < stopWords.length; i++) {
//     for (let j = 0; j < textArray.length; j++) {
//         if (stopWords[i] === textArray[j]) {
//             textArray.splice(j, 1);
//         }
//     }
// }
// console.log(textArray.length);




// //function 3
// let textObject = {};

// for (let word of textArray) {

//     if (textObject[word] > 0) {
//         textObject[word] += 1;
//     } else {
//         //get the string into the object
//         textObject[word] = 1;

//     }
//     console.log(textObject)
// }

// let treatedArr = Object.entries(textObject);



// treatedArr.sort(function (first, second) {
//     return second[1] - first[1];
// });
// console.log(treatedArr);


// //function 4
// let topFive = treatedArr.slice(0, 5);
// console.log(topFive);

// for (let topword of topFive) {
//     let listItemTop = document.createElement('li');
//     topFiveWords.appendChild(listItemTop);

//     listItemTop.innerHTML = `${topword[0]}: ${topword[1]}`

// }

// let bottomFive = treatedArr.slice(-5);
// console.log(bottomFive)

// for (let bottomword of bottomFive) {
//     let listItemBottom = document.createElement('li');
//     bottomFiveWords.appendChild(listItemBottom);
//     listItemBottom.innerHTML = `${bottomword[0]}: ${bottomword[1]}`
// }