
var as_D = document.getElementById("ansD"),
    aO_d = 5; // number of visible (reference) decimal places authorised

function r_Ig(min, max) { // return random integer between 2 values (only min inclusive)
    return Math.floor(Math.random() * (max - min)) + min;
}

function n_ZD_(n, d) { // find the characteristic of a number (output case ref. no.), if it is a decimal value
    var d_N, // number of decimal places (if applicable)
        rDe_, // recurring digits exist?
        c = { // return object
            oT : 0, // case outcome
            rP : undefined, // recurring pattern (if exists and applicable)
            p_P : undefined, // prefix digits (if exists and applicable to final answer)
            exP : undefined // no. of exponential places (if applicable only)
        }; 
    if (d !== -1) { // if decimal exists in number, continue detection
        d_N = (n.length - 1) - d; // difference between total number length and decimal place
        rDe_ = r_Dn(n, d, d_N); // get properties on decimal - if a pattern (recurring) exists, terminating digit, etc.
        if (d_N > aO_d) { // FIRST control flow: number of decimal places greater than 5?
            if (rDe_.c) { // SECOND control flow: check if recurring digits (pattern) exist (take note), and the terminating value (last decimal place)
                var _Lz = z_Lz(n, d, rDe_.w); // detect any leading zeroes (validity and no.)
                if (_Lz.v && _Lz.n > 0) { // if leading zeroes (detected) are valid, and at least 1 exists
                    if (_Lz.n <= aO_d) { // if no. of leading zeroes less than 5
                        if (ch_SgHr(rDe_, aO_d)) { // check for any Single-Digit Inconsistencies
                            c.oT = 5; // case output 5
                            c.p_P = rDe_.b; // reference prefix digits property across
                        } else {
                            c.oT = 3; // case output 3
                            c.rP = rDe_; // transfer [recur-digit] properties to return object
                        }
                    } else { // "" if greater than 5
                        // convert and display as exponential
                    }

                } else if (_Lz.n > 0) { // if invalid (with some leading zeroes)
                    if (_Lz.n <= aO_d && rDe_.d.length === 1) { // leading zeroes less than threshold, along with a single-digit pattern after [i.e. 3.004000000001]
                        c.oT = 5; // case output 5
                        c.p_P = rDe_.b; // reference prefix digits property across
                    } else if (_Lz.n <= aO_d) {
                        c.oT = 3; // case output 3
                        c.rP = rDe_; // transfer [recur-digit] properties to return object
                    } else if (rgX(/E/g, aNc)) { // IF an EXPONENTIAL EXISTS IN the original (processing) equation
                        c.oT = 1; // case output 1
                    } else {
                        c.oT = 4; // case output 4
                    }
                } // else if ((rDe_.d.length === 1 && (rDe_.d === "9" || rDe_.d === "0")) && rDe_.n > aO_d) { // single-digit high recurring pattern detected (that is abnormally not rounded well)
                    
                // '0' and '9' are known 'round-off' numerals - not necessary to output them as part of decimal placements
                else if (ch_SgHr(rDe_, aO_d)) {
                    c.oT = 5; // case output 5
                    c.p_P = rDe_.b; // reference prefix digits property across

                } else { // display as normal, given no special conditions
                    c.oT = 3; // case output 3
                    c.rP = rDe_; // transfer [recur-digit] properties to return object
                }
            } else if (rgX(/E/g, aNc)) { // if an EXPONENTIAL is detected
                c.exP = Number(aNc.charAt(aNc.indexOf("E") + 2)); // obtain the exponent value 
                c.oT = 6; // case output 6
            } else {
                c.oT = 2;  // case output 2
            }
        } else {
            c.oT = 1; // case output 1
        }
    } else {
        c.oT = 1; // case output 1
    }
    return c;
}

function ch_SgHr(r, aD) { // check for any single-digit high recurring consistencies
    if ((r.d.length === 1 && (r.d === "9" || r.d === "0")) && r.n > aD) {
        return true;
    } else {
        return false;
    }
}

function z_Lz(n, d, w) { // find number of leading zeroes in number
    var t = d + 1, // (index) first digit after decimal
        e = { // count leading zeroes
            v : Number(w) === 0 ? true : false, // valid, only if whole integer equals 0
            n : 0 // no.
        },  
        z_C;
    if (n.search("e") === -1) { // find 'e' if 'n' numeric string is in exponential notation
        do { // loop once
            // check the digit
            if (n[t] === "0") {
                e.n++; // add to leading zero count
                t++;
                z_C = true; /// set true (continue)
            } else {
                z_C = false; // set false (discontinue checking)
            }
        }
        while (z_C); 
    } else { // if 'e' is detected, find the notation number
        var c = Number(n[n.length - 1]); // convert last to character
        e.n = c - 1; 
    }
    return e; // return object containing validity and no.
}

function o_dx(t, _A) { // find index to target
    var _L = _A.length - 1,
        r; 
    for (j = 0; j <= _L; j++) { // get the index of operator object (in 'op_A' array) - with ref. from equation index (brackets inclusive)
        if (_A[j].n === t) { // if indexes match
            r = j; 
            break;
        }
    }
    return r; // return undefined if no match
}

function ds_P(ans) { // display calculator output (also add to memory)
    var dAns = cm_A_Nm(ans), // display answer (may include commas)
        dEq = d_1._3_1.innerHTML; // display equation (may include commas)

    as_D.title = "Answer: " + dAns; // add title (answer)

    Dvt_2(op_Ar); // UPDATE d_2 in DevInfo
    ansOv_(dAns); // set appropriate overflow level
    opG_Cm_U(opG_A_Sc, dEq); // update TOG array (character-comma combined string)
    nwMem(dAns, dEq, ans); // add to memory
    mem_E_fn(true); // activate memory list

    nm_DF = true; // equation can be defaulted with 0-9 buttons
}

function ansOv_(dAns) { // set appropriate overflow for answer output - aim is for lowest overflow possible (resulting in bigger font)
    var iB,
        iB_w; // declare

    // check for overflow    
    ipP.classList.remove("ov1", "ov2"); // reset variables
    ov1 = false; // overflows
    ov2 = false;

    mtL_E(mtL, false, (ipM ? true : false)); // multi-line toggle (disable if needed/exists)
    if (dAns !== undefined && dAns !== null) {
        ip.innerHTML = dAns;  // insert answer
    }
    iB = ip.getBoundingClientRect(); // bounding area of input span (with output answer)
    iB_w = iB.width; // "" width

    if (iB_w > iP_T) {
        if (!ov1) { // if overflow 1 (instance) 
            ipP.classList.add("ov1"); // smaller font
            ov1 = true; 
            iB = ip.getBoundingClientRect(); // UPDATE again
            iB_w = iB.width; 
            if (iB_w > iP_T) { // if ans still overflowing...
                var _Lc = true, // loop condition
                    m_Str; // modified string
                while (_Lc) { // REMOVE characters that have OVERFLOWN
                    var n_str = ip.innerHTML.slice(0, ip.innerHTML.length - 1); // remove last character
                    ip.innerHTML = n_str
                    iB = ip.getBoundingClientRect(); // UPDATE again
                    iB_w = iB.width; 
                    if (iB_w > iP_T) {
                        _Lc = true;
                    } else {
                        _Lc = false;
                    }
                }
                m_Str = ip.innerHTML.slice(0, ip.innerHTML.length - 3); 
                m_Str += "..."; // replace last 3 characters with ellipses
                ip.innerHTML = m_Str;
            }
        }
    }
}

function bt_ED_m(_A) { // performs similar to 'bt_ED()' function - manual mode
    var _L = _A.length - 1, // get length
        dF = _L - _A[0]; // find difference (total - no. to disable)

    eD_L(_L, dF, null, _A); 
}