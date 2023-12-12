/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */


/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
    // Start by creating the json object to be returned
    // According to the document, this should always contain the searchTerm
    results = { "SearchTerm": searchTerm, "Results": [] };

    if (checkListPopulated(scannedTextObj) == false || !searchTerm) {
        // Inform the user that no searchTerm was given and don't run the search
        console.log("No data in json/word")
    }
    else {
        for (let bookNum in scannedTextObj) {
            if (scannedTextObj[bookNum].hasOwnProperty("Content")) {
                let contentList = scannedTextObj[bookNum].Content;
                // Make sure the "Content" section contains elements before searching
                if (checkListPopulated(contentList)) {
                    for (let contentNum in contentList) {
                        let foundSearchTerm = false;
                        let lineText = (contentList[contentNum].Text);

                        // Formatting to make the text more searchable
                        // General Punctuation
                        lineText = lineText.replace(/[\.,!?()]/g, " ");
                        // Hyphen Check at End of String
                        // (could not replace all hyphens as some may be part of a word)
                        if (lineText.charAt(lineText.length - 1) == "-") {
                            lineText = lineText.replace(/-$/, " ");
                        }
                        // Adding space buffer to ends of string for simpler searching
                        lineText = " " + lineText + " ";
                        lineText = lineText.replace(/[  ]/g, " ");

                        // General Check
                        if (lineText.includes(" " + searchTerm + " ")) {
                            foundSearchTerm = true;
                        }

                        // Add the current item to the results list in the desired format
                        if (foundSearchTerm == true) {
                            let foundResults = {
                                "ISBN": scannedTextObj[bookNum].ISBN,
                                "Page": contentList[contentNum].Page,
                                "Line": contentList[contentNum].Line
                            };
                            results.Results.push(foundResults);
                        }
                    }
                }
            }

        }
    }

    return results;

}

//////////////////////////////////////////////////////////
// HELPER FUNCTIONS
//////////////////////////////////////////////////////////


// Checks to see if a list contains 1 or more elements
function checkListPopulated(list) {
    if (list == undefined || list.length == 0) {
        return false;
    }
    else {
        return true;
    }
}


//////////////////////////////////////////////////////////
// BOOK SEARCH SAMPLE DATA
//////////////////////////////////////////////////////////

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            }
        ]
    }
]

// JSON useful for testing case sensitivity and correct word finding features
// Ex: Should not find Page 89 "They" when searching "The"
const hitchhikerIn =
    [
        {
            "Title": "The Hitchhiker's Guide to the Galaxy",
            "ISBN": "9780393320908",
            "Content": [
                {
                    "Page": 13,
                    "Line": 7,
                    "Text": "The stars twinkled like diamonds against the blackness of space."
                },
                {
                    "Page": 22,
                    "Line": 12,
                    "Text": "The ship hurtled through the void, its engines roaring"
                },
                {
                    "Page": 31,
                    "Line": 15,
                    "Text": "The universe was vast and mysterious, full of wonders and dangers."
                },
                {
                    "Page": 89,
                    "Line": 10,
                    "Text": "They never saw a sky such as this."

                }
            ]
        }
    ]


const emptyDataIn = [
    {

    }
]

const emptyContentIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [

        ]
    }
]


//////////////////////////////////////////////////////////
// OUTPUT SAMPLE DATA
//////////////////////////////////////////////////////////

/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const multiWordOut = {
    "SearchTerm": "and however",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const multiWordPunctOut = {
    "SearchTerm": "own momentum",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}

const doesNotContainTermOut = {
    "SearchTerm": "wizard",
    "Results": [

    ]
}

const emptyDataOut = {
    "SearchTerm": "the",
    "Results": [

    ]
}

const caseSensOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780393320908",
            "Page": 13,
            "Line": 7
        },
        {
            "ISBN": "9780393320908",
            "Page": 22,
            "Line": 12
        }
    ]
}

const wordMatchOut = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780393320908",
            "Page": 13,
            "Line": 7
        },
        {
            "ISBN": "9780393320908",
            "Page": 22,
            "Line": 12
        },
        {
            "ISBN": "9780393320908",
            "Page": 31,
            "Line": 15
        }
    ]
}

const hyphenOut = {
    "SearchTerm": "dark",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}

const emptySearchTermOut = {
    "SearchTerm": "",
    "Results": [

    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

// Check desired result given an empy input JSON
const test3result = findSearchTermInBooks("the", emptyDataIn);
if (JSON.stringify(emptyDataOut) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", emptyDataOut);
    console.log("Received:", test3result);
}

// Check desired result given the "Content" field is empty
const test4result = findSearchTermInBooks("the", emptyContentIn);
if (JSON.stringify(emptyDataOut) === JSON.stringify(test4result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", emptyDataOut);
    console.log("Received:", test4result);
}

// Check proper case matching (Searching "the" should not return results with "The")
const test5result = findSearchTermInBooks("the", hitchhikerIn);
if (JSON.stringify(caseSensOut) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", caseSensOut);
    console.log("Received:", test5result);
}

// Check proper word matching. (Should match the exact word, not just a substring)
// Ex: "The" should not return results with "They"
const test6result = findSearchTermInBooks("The", hitchhikerIn);
if (JSON.stringify(wordMatchOut) === JSON.stringify(test6result)) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", wordMatchOut);
    console.log("Received:", test6result);
}

// Check matches for lines ending in a hyphen
const test7result = findSearchTermInBooks("dark", twentyLeaguesIn);
if (JSON.stringify(hyphenOut) === JSON.stringify(test7result)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", hyphenOut);
    console.log("Received:", test7result);
}

// Check results for an empty searchTerm passed
const test8result = findSearchTermInBooks("", twentyLeaguesIn);
if (JSON.stringify(emptySearchTermOut) === JSON.stringify(test8result)) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", emptySearchTermOut);
    console.log("Received:", test7result);
}

// Check for a word that does not exist in the input JSON 
const test9result = findSearchTermInBooks("wizard", twentyLeaguesIn);
if (JSON.stringify(doesNotContainTermOut) === JSON.stringify(test9result)) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", doesNotContainTermOut);
    console.log("Received:", test9result);
}

// Check multi-word search
const test10result = findSearchTermInBooks("and however", twentyLeaguesIn);
if (JSON.stringify(multiWordOut) === JSON.stringify(test10result)) {
    console.log("PASS: Test 10");
} else {
    console.log("FAIL: Test 10");
    console.log("Expected:", multiWordOut);
    console.log("Received:", test10result);
}

// Check multi-word search with punctuation
const test11result = findSearchTermInBooks("own momentum", twentyLeaguesIn);
if (JSON.stringify(multiWordPunctOut) === JSON.stringify(test11result)) {
    console.log("PASS: Test 11");
} else {
    console.log("FAIL: Test 11");
    console.log("Expected:", multiWordPunctOut);
    console.log("Received:", test11result);
}