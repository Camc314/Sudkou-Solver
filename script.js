const unfinishedSudoku = {
    1: [
        [, , 5, , , 3, , 4,],
        [, , 7, , , 9, 1, 2,],
        [, 2, , , , , , ,],
        [, 5, , 8, 1, 6, , , 3],
        [4, , , 3, , 7, , , 6],
        [1, , , 4, 9, 2, , 5,],
        [, , , , , , , 3,],
        [, 3, 4, 5, , , 8, ,],
        [, 8, , 2, , , 9, ,]
    ],
    2:  [
        [, , 1, 9, , , , , 8],
        [6, , , , 8, 5, , 3, ,],
        [, , 7, , 6, , 1, , ,],
        [, 3, 4, , 9, , , , ,],
        [, , , 5, , 4, , , ,],
        [, , , , 1, , 4, 2, ,],
        [, , 5, , 7, , 9, , ,],
        [, 1, , 8, 4, , , , 7,],
        [7, , , , , 9, 2, , ,],
    ]
};

console.log(unfinishedSudoku);

// Store object for converting number to letters
const numToLetter = {
    1: "a",
    2: "b",
    3: "c",
    4: "d",
    5: "e",
    6: "f",
    7: "g",
    8: "h",
    9: "i",
}

const PossibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//Complete Sudoko for Testing
var sodoko1 = [[5, 3, 4, 6, 7, 8, 9, 1, 2],
[6, 7, 2, 1, 9, 5, 3, 4, 8],
[1, 9, 8, 3, 4, 2, 5, 6, 7],
[8, 5, 9, 7, 6, 1, 4, 2, 3],
[4, 2, 6, 8, 5, 3, 7, 9, 1],
[7, 1, 3, 9, 2, 4, 8, 5, 6],
[9, 6, 1, 5, 3, 7, 2, 8, 4],
[2, 8, 7, 4, 1, 9, 6, 3, 5],
[3, 4, 5, 2, 8, 6, 1, 7, 9]
];

//Incomplete Sudoko for Testing
let sodoko2 = [
    [, , 1, 9, , , , , 8],
    [6, , , , 8, 5, , 3, ,],
    [, , 7, , 6, , 1, , ,],
    [, 3, 4, , 9, , , , ,],
    [, , , 5, , 4, , , ,],
    [, , , , 1, , 4, 2, ,],
    [, , 5, , 7, , 9, , ,],
    [, 1, , 8, 4, , , , 7,],
    [7, , , , , 9, 2, , ,],
]

const sodoko3 = [
    [, , 5, , , 3, , 4,],
    [, , 7, , , 9, 1, 2,],
    [, 2, , , , , , ,],
    [, 5, , 8, 1, 6, , , 3],
    [4, , , 3, , 7, , , 6],
    [1, , , 4, 9, 2, , 5,],
    [, , , , , , , 3,],
    [, 3, 4, 5, , , 8, ,],
    [, 8, , 2, , , 9, ,]
]

//enables button functionality
window.onload = function () {
    document.getElementById("testSolutionButton").addEventListener("click", () => {
        testSudoko(storeInArray());
        console.log("update");
    });



    //DisplayOutputFixed(sodoko3);

    document.getElementById('solveButton').addEventListener('click', () => {
        let newArr = repeatSolve(unfinishedSudoku[1], 10);
        DisplayOutput(newArr);
    });

    document.getElementById('loadSudoko').addEventListener('click', () => {
        DisplayOutputFixed(unfinishedSudoku[2]);
    });


};

//Do a cool thing if its a successful solve;
const DisplayOutputSuccess = () => {
    console.trace()
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            setTimeout(() => (document.getElementById(numToLetter[i + 1] + (j + 1).toString(10)).classList.add('successSquare')), (10 * i + j) * 30);
        }
    }
    setTimeout(() => {
        for (let l = 0; l < 9; l++) {
            for (let m = 0; m < 9; m++) {
                setTimeout(() => (document.getElementById(numToLetter[l + 1] + (m + 1).toString(10)).classList.remove('successSquare')), (10 * l + m) * 30);
            }
        }
    }, 2640);

    return;
}

const DisplayOutputClear = () => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            document.getElementById(numToLetter[i + 1] + (j + 1).toString(10)).value = '';
        }
    } 
}

//Highlishts square with incorrect number in
const wrongNumber = (x, y) => {
    console.log(x + ' ' + y);
    document.getElementById(numToLetter[y + 1] + (x + 1).toString(10)).classList.add("wrongNo");
}

//Takes input values and returns an array
const storeInArray = () => {
    var array1 = [];
    for (let i = 0; i < 9; i++) {
        let subArray = []
        for (let j = 0; j < 9; j++) {
            //  console.log(numToLetter[i] + (j + 1).toString(10));
            subArray.push(parseInt(document.getElementById(numToLetter[i + 1] + (j + 1).toString(10)).value));
        }
        array1.push(subArray);
    }
    return array1;
}

//Takes an array, and tests if it is a valid sudoko solution
const testSudoko = (s) => {
    let validSolution1 = true;
    //Test all rows for duplicate numbers
    for (let i = 0; i < s.length; i++) {
        let s1 = s[i];

        for (let j = 0; j < s[i].length; j++) {

            if (countOccurrences(s1, (j + 1)) > 1) {
                validSolution1 = false;

                //return errors
                console.error(`There is too many ${j + 1} on line ${i + 1}`);
                console.log(`The duplicates are at: ${s1.indexOf(j + 1) + 1}, ${i + 1} and ${s1.lastIndexOf(j + 1)}, ${i + 1} `);

                //Highlight wrong squares on grid
                wrongNumber(s1.indexOf(j + 1), i);
                wrongNumber(s1.lastIndexOf(j + 1), i);
                break;
            }
        }
    }

    //Test all columns for duplicate numbers
    for (let i = 0; i < s.length; i++) {
        let s2 = s.map((value, index) => { return value[i]; });
        //console.log(s2);

        for (let j = 0; j < s[i].length; j++) {

            //test all values
            if (countOccurrences(s2, (j + 1)) > 1) {
                validSolution1 = false;

                //return errors
                console.error(`There is too many ${j + 1} on column ${i + 1}`);
                console.log(`The duplicates are at: ${i + 1},${s2.indexOf(j + 1) + 1} and ${i + 1},${s2.lastIndexOf(j + 1) + 1}`);

                //highlight wrong squares on grid
                wrongNumber(i, s2.indexOf(j + 1));
                wrongNumber(i, s2.lastIndexOf(j + 1));
                break;
            }
        }
    }

    //Test all squares for duplicate numbers
    for (let i = 0; i < 9; i += 3) {

        for (let j = 0; j < 9; j += 3) {

            let s3 = [];
            for (let k = 0; k < 3; k++) {

                for (let l = 0; l < 3; l++) {

                    s3.push(s[i + k][j + l]);
                }
            }
            //console.log(s3);

            // test all values
            for (let m = 0; m < s3.length; m++) {

                if (countOccurrences(s3, (m + 1)) > 1) {

                    validSolution1 = false;
                    console.error(`There is too many ${m + 1} in a square`);
                    break;
                }
            }
        }
    }

    // return success/fail on good/bad solution
    if (validSolution1 == true) {
        DisplayOutputSuccess();
        return ("It's a valid solution! Well Done! :D")
    } else {
        return ("Unfortunatly it's not a valid solution ):");
    }
}



const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);



testSudoko(sodoko1);

const checkPossibleVals = (s, col, row) => {
    if (typeof (s[row - 1][col - 1]) == 'number') {
        return s[row - 1][col - 1];
    }

    //initialize Return Array
    let possibleVal = [];

    //get column values
    let s2 = s.map((value, index) => { return value[col - 1]; });

    //set up for getting values in square
    var i;
    let s3 = [];
    if (1 <= col && col <= 3) {
        i = 0;
    }
    if (4 <= col && col <= 6) {
        i = 3;
    }
    if (7 <= col && col <= 9) {
        i = 6;
    }

    var j;
    if (1 <= row && row <= 3) {
        j = 0;
    } else if (4 <= row && row <= 5) {
        j = 3;
    } else if (7 <= row && row <= 9) {
        j = 6;
    }

    let s4 = [];

    //get values in square
    try {
        for (let k = 0; k < 3; k++) {
            for (let l = 0; l < 3; l++) {
                s4.push(s[j + k][i + l]);
            }
        }
    }
    catch (err) {

    }
    //Row Values
    //console.log(s[row-1]);
    //Column Values
    //console.log([... new Set(s2)]);
    //Square Values
    //console.log([... new Set(s4)]);

    //Combine all values
    let pv = possibleVal.concat(s[row - 1], s2, s4);

    //remove duplicates
    pv = [...new Set(pv)];

    //find inverse 
    let pvInverse = PossibleNumbers.filter(x => !pv.includes(x));
    //console.log(pvInverse);
    if (pvInverse.length == 1) {
        return pvInverse[0]
    } else {
        return pvInverse;
    }
}

const SolveSodoko = (s) => {
    for (let i = 1; i < 10; i++) {
        for (let j = 1; j < 10; j++) {
            s[i - 1][j - 1] = checkPossibleVals(s, j, i);
            //console.log('filling' + checkPossibleVals(s, j, i) + 'in ' + (i - 1) + (j - 1));
        }
    }

    //for (let k = 0; k < 9; k++) {
    //  s[k] = (s[k].map((d) => {
    //    return (typeof (d) == 'number') ? d : undefined;
    //}));
    //}

    let s5 = [];
    for (let i = 1; i < 10; i++) {
        for (let j = 1; j < 10; j++) {

            if (Array.isArray(s[i - 1][j - 1])) {
                //console.log('1');
                //console.log(s[i - 1][j - 1]);
                s5 = s5.concat(s[i - 1][j - 1]);
            } else {
                s5.push(s[i - 1][j - 1]);
            }
            //console.log('filling' + checkPossibleVals(s, j, i) + 'in ' + (i - 1) + (j - 1));
        }
        //console.log(s5);
        for (let k = 1; k < 10; k++) {
            if (countOccurrences(s5, k) == 1) {
                //console.log(s5)
                //console.log(s[i - 1]);
                //console.log(k);
                for (let m = 1; m <= 9; m++) {
                    try {
                        if ((s[i - 1][m - 1]).includes(k)) {
                            s[i - 1][m - 1] = k;
                            //console.log('Potentially a ' + k + ' at ' + i + m);
                        }
                    }
                    catch (err) {

                    }
                }


                //console.log('i: ' + i);
                //console.log(s5)
                //console.log('k: ' + k)
            }
        }
    }

    for (let i = 1; i < 10; i++) {
        for (let j = 1; j < 10; j++) {
            s[i - 1][j - 1] = checkPossibleVals(s, j, i);
            //console.log('filling' + checkPossibleVals(s, j, i) + 'in ' + (i - 1) + (j - 1));
        }
    }



    for (let i = 1; i < 10; i++) {
        let s7 = [];

        let s6 = s.map((value, index) => { return value[i - 1]; });

        for (let j = 0; j < 9; j++) {

            //console.log(s6[j])
            if (Array.isArray(s6[j])) {

                s7 = s7.concat(...s6[j]);
            } else if (typeof (s6[j]) == 'number') {
                s7.push(s6[j]);
            }
        }

        //console.log(s7);

        for (let k = 1; k < 10; k++) {
            if (countOccurrences(s7, k) == 1) {
                //console.log('only one ' + k)
                for (let m = 1; m < 10; m++) {
                    //console.log(typeof(s[i - 1][m - 1]))
                    if (typeof (s[m - 1][i - 1]) == 'object') {
                        //console.log('array');

                        if ((s[m - 1][i - 1]).includes(k)) {
                            s[m - 1][i - 1] = k;
                            //console.log('Potentially a ' + k + ' at ' + m + i);
                            //console.log((s[m - 1][i - 1]))
                        }
                    }
                }
            }
        }
    }

    return s;


}

const DisplayOutput = (s) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (typeof (s[i][j]) == 'number') {
                document.getElementById(numToLetter[i + 1] + (j + 1).toString(10)).value = s[i][j];
            } else {
                //document.getElementById(numToLetter[i + 1] + (j + 1).toString(10)).value = s[i][j].join('');
            }
        }
    }
}

const DisplayOutputFixed = (s) => {
    console.trace();
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (typeof (s[i][j]) == 'number') {
                document.getElementById(numToLetter[i + 1] + (j + 1).toString(10)).value = s[i][j];
                document.getElementById(numToLetter[i + 1] + (j + 1).toString(10)).classList.add('fixedNumber');
                document.getElementById(numToLetter[i + 1] + (j + 1).toString(10)).setAttribute('readonly','');
            }
        }
    }
}



const repeatSolve = (s, num) => {
    let arr = []
    for (var i = 0; i < num; i++) {
        arr = SolveSodoko(s);
    }
    return arr;
}