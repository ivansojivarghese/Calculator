
// supplementing functions for msc_6.js file


function sbq_P(p, str) { // checks for 'subsequent' occurences of patterns
    var rgX = new RegExp(p, "g"), // set up new regex to check 'p' - constructor used to take in argument value
        res = str.match(rgX).length, // account no. of matches with regex in 'str'
        rs = true, // default output - true
        _pL = p.length, // length of (possible) pattern - given as argument to function
        d, 
        er; 
    rgX = new RegExp(p, ""); // update regex to single match only (search the first instance)
    if (res > 1) { // no. of matches must be more than 1 for a potential RECURRING pattern
        for (iA = 1; iA <= res; iA++) {
            d = str.search(rgX); // search index (initial, and subsequent) of rgX occurence
            if (er) { // if 'er' has been defined
                if (d !== er) { // if index of current rgX occurence is unequal to 'er' (expected occurence)
                    rs = false;
                    break; // no full pattern (yet) - return false
                }
            }
            er = d + _pL; // expected search index of following (subsequent) rgX occurence        
            str = str.replace(rgX, outP_c("_", _pL - 1)); // replace search pattern rgX with specified "_"
        }
        if (rs && s_Nat(p, res, str)) { // if pattern is 'dectected', but number string seems unnatural - proceed to secondary check
            var _AL = 3, // no. of indexes to test
                _A = d_Rdm_c(er, str.length, _AL, str, _pL, p); // return an array of character values at random indexes between final 'er' and str.length
            if (_A) { // if array is defined
                for (jB = 0; jB <= (_AL - 1); jB++) {
                    if (_A[jB].c !== _A[jB].e) { // if actual character do not match with expected character (in any of the indexes' test)
                        rs = false;
                        break;
                    }
                }
            } else {
                rs = false;
            } 
        }
    } else {
        rs = false; // return false if otherwise
    }
    return rs;
}

function d_Rdm_c(min, max, n, str, _L, p) {  // find 'n' different random characters between a 'min' and 'max' indexes of a string
    var rC_A = [],
        rN_D = []; // random integer database (for cross-check to prevent duplication)
    if ((max - min) > n) { // if search range (for random characters) is too small, return undefined
        for (jA = 0; jA <= (n - 1); jA++) {
            var nx,
                mD_r; // remainder value when modulus operator is applied
            do {
                nx = r_Ig(min, max); // return a random integer (as array index) 
            }
            while (rN_D.includes(nx)); // return again if integer has been returned previously
            rN_D[rN_D.length] = nx; // add integer to database
            mD_r = ((nx % _L) === 0) ? _L : nx % _L; // if modulus remainder is 0, attach _L value
            rC_A[jA] = { // create array element(s), with integer and (character at integer)
                x : nx, 
                c : str[nx],
                e : p[mD_r - 1] // find an expected character (using original pattern - 'p')
            }
        }
    } else {
        rC_A = undefined;
    }
    return rC_A;
}

function outP_c(k, n) { // output [a] character value(s), type and no. as arguments
    var s = k; // default character appears once (if 'n' is 0)
    for (i_k = 0; i_k <= (n - 1); i_k++) {
        s += k; // increment (concatenate) if 'n' more than 0
    }
    return s;
}

function s_Nat(p, n, str) { // determine the naturality of a number string
    var pcT = (p.length * n) / str.length, // determine pecentile of pattern occupancy in number string
        rs; 
    if (pcT <= .5) { // if percentile is lower, return true
        rs = true; // unnatural number string, needs secondary check
    } else {
        rs = false;
    }
    return rs;
}

function sbq_P_L(g, n) { // supplementary to sbq_P function - able to loop through multiple values of the 'g' parameter
    var gA_ = [], // temp. array to hold object literals (with properties)
        g_L = g.length - 1,
        rs, // object to return
        msc_2 = ""; // msc. variable - holding cumulative prefix digit(s), if applicable
    for (D_ = 0; D_ <= g_L; D_++) { // looping array
        if (D_ !== 0) { // i.e. "166" = ["166", "66", "6"];
            msc_2 += g[0]; // add first character of every 'g' variation
            g = g.substring(1); // return string with first character removed in every instance
        }
        gA_[D_] = { // define object literal
            tt : sbq_P(g, n), // test check (for consecutively appearing 'g' pattern)
            p : g, // pattern
            f : msc_2 // prefix (if applicable)
        }
    }
    for (q = g_L; q >= 0; q--) { // loop backwards (starting from end)
        if (gA_[q].tt) { // find the possible pattern ('tt' === true) with the least digits, hence looping from rear
            rs = {
                c : gA_[q].tt, // status check (for consecutive pattern recur)
                t : gA_[q].p, // pattern
                p : gA_[q].f ? gA_[q].f : undefined // prefix digit(s) - return undefined if not applicable
            };
            break;  
        }
    }
    if (!rs) { // if no pattern instance
        rs = {
            c : false, // return false
            t : undefined,
            p : undefined
        }
    }
    return rs;
}