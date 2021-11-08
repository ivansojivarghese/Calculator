

var apB_A = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], // latin alphabets
    uId_e = []; // entered (returned) unique ids


// Percentage (percentile) conditions
function pcT_n(e, r) { // determine appropriate percentile conversions (usage)
    var t = [eq_A[e - 1], eq_A[e + 1]], // equation terms 1 and 2
        g = [t[0].endsWith("H"), t[1].endsWith("H")], // boolean check to see if they are percentages (terms 1 and 2 respt.)
        x, // extracted (to-be) number
        y; // extracted number (secondary to 'x')

    // conditions to percentages
    if (g[0] && !g[1]) { // if term 1 is true (a percentile), term 2 is false
        x = ext_N(t[0]) / 100; // extract (just) number from percentage - (convert to percentile with division by 100) - term 1
        eq_A[e - 1] = cvt_N(x, false); // update array with coversion of Number to ANC code
    } else if ((!g[0] && g[1]) || (g[0] && g[1])) { // if term 1 is false, term 2 is true -- OR -- both terms are true

        x = ext_N(t[1]) / 100; // extract term 2 number
        y = g[0] ? (ext_N(t[0]) / 100) : cvt_N(t[0], true); // term 1 number extraction - either number conversion or percentage extraction depending on g[0]
        eq_A[e - 1] = cvt_N(y, false); // update array (for term 1)
        if (r === 0 || r === 1) { // if operation is addition or subtraction 

            var z = x * y; // find relative value to term 1 (percentile is relative to secondary term [1])
            eq_A[e + 1] = cvt_N(z, false); // update array

        } else { // else if multiplication or division
            eq_A[e + 1] = cvt_N(x, false); // update array
        }
    }
}

// removing ANC indexed brackets (both 'X' and 'Y') - updating eq. indexes for operations
function b_Rm(a, _A) {
    var _L = _A.length - 1,
        _La = a.length - 1,
        a_A = [], // new (temp.) array
        rgE = /[XY]/g; // brackets ANC code regex test

    // loop thru every element in 'a' (equation index/'eq_A'), return array with objects containing each of the equation groups - operators will have the identifier (as a property)
    for (i = 0, k = 0; i <= _La; i++) {
        if (!rgE.test(a[i])) { // only add non-bracket characters to array (regex testing to check for 'X/Y' ANC code)
            var dx = o_dx(i, _A); // get the index of operator object (in 'op_A' array) - with ref. from equation index (brackets inclusive)
            a_A[k] = {
                d : a[i], // ANC character
                e : (dx !== undefined) ? _A[dx].e : null // identifier
            }
            k++;
        }
    }
    _La = a_A.length - 1; // update new looping length (with brackets removed)

    // update 'n' property (index) values (after brackets removal)
    for (i = 0; i <= _L; i++) { // loop through all operators 
        var i_D = _A[i].e; // get the id 
        for (j = 0; j <= _La; j++) { // find matching operator with same id
            if (a_A[j].e === i_D) {
                _A[i].n = j; // set the new index
                break;
            }
        }
    }

    return _A;
}

function u_Id() { // create unique identifiers for characters (operators)
    // 2 parts: 3-digit numeral - alphabet character
    // '123' + 'A' = '123A'
    do {
        var d = r_Ig(100, 1000),  // return a random integer from 100 - 999
            a = apB_A[r_Ig(0, apB_A.length - 1)], // return a random alphabet (A-Z)
            f = d + a; // 'd + a' returns the 'id'
    }
    while (uId_e.indexOf(f) !== -1); // create another 'id' if uniqueness is not met - if similar id is found in global var.

    uId_e.push(f); // add to global var. for reference
    return f; 
}