
// misc.
var bt_nA = []; // buttons network array (dis/enb)

for (i = 0; i <= _Lbt; i++) { // set respective networked (linked) buttons for each
    // element n = 0: no. of buttons to disable (from the rear)
    // element 1 - e: button indexes that are to remain enabled
    // element e - 19: button indexes that are to remain disabled (based of n=0 value)
    // element i: some buttons disable itself to prevent consecutive duplication
    switch (i) {
        case 0: // CLEAR
            bt_nA[i] = [5, 0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14, 16, 18, 19, 3, 7, 11, 15, 17];

            // disable '0' button and operators 
        break;
        case 1: // brackets
            bt_nA[i] = [7, 0, 4, 5, 6, 8, 9, 10, 12, 13, 14, 16, 17, 19, 3, 7, 11, 15, 1, 2, 18];

            // disable percentage, operators and decimal and brackets itself; enable the modifier (if applicable)
        break;
        case 2: // percentage
            bt_nA[i] = [14, 0, 3, 7, 11, 15, 19, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14, 16, 17, 18];

            // disable percentage, numerals, modifier, decimal, brackets
        break;
        case 4: // numerals - '1-9'
        case 5:
        case 6:
        case 8:
        case 9:
        case 10:
        case 12:
        case 13:
        case 14:
            bt_nA[i] = [2, 0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 19, 18, 1, 16];

            // disable (decimal, modifier and > brackets - if applicable)
        break;
        case 3: // operators
        case 7:
        case 11:
        case 15:
            var o_A = [3, 7, 11, 15, 4, 5, 6, 8, 9, 10, 12, 13, 14, 17, 1], // array of the operator-indexes (plus additional buttons to enable)
                d_A = [2, 18, 16, i], // array of buttons to disable
                oM_A = oA_d(i, o_A); // return a array without the targeted index (case)
            oM_A.unshift(d_A.length); // ADD (no. to disable) in front
            bt_nA[i] = oM_A.concat(d_A); // ADD button(indexes) to disable at rear

            // disable itself, enable the other 3 operators and brackets, disable percentage, decimal and modifier
        break;
        case 16: // negative modifier
            bt_nA[i] = [8, 0, 4, 5, 6, 8, 9, 10, 12, 13, 14, 17, 19, 1, 2, 3, 7, 11, 15, 16, 18];

            // disable brackets, percentage, operators, modifier and decimal
        break;
        case 17: // numeral - '0'
            bt_nA[i] = [2, 0, 2, 3, 7, 11, 15, 19, 4, 5, 6, 8, 9, 10, 12, 13, 14, 17, 18, 1, 16];

            // disable (decimal, modifier and > brackets - if applicable) - also 0 itself if recurring pattern possible (from first character in new TOG)
        break;
        case 18: // decimal point - '.'
            bt_nA[i] = [8, 0, 4, 5, 6, 8, 9, 10, 12, 13, 14, 17, 19, 1, 2, 3, 7, 11, 15, 16, 18];

            // disable itself, operators, brackets, percentage, and modifier
        break;
        case 19: // equate
            bt_nA[i] = [3, 0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 19, 1, 16, 18];

            // disable brackets, modifier, and decimal
        break;
    }
}

function bt_ED(i, d) { // disable/enable buttons
    var _L, // (no. of buttons)
        nD, // no. btn to disable (be declared below)
        v_1, 
        v_2, // values 1 & 2 (for network array rearrangment - if needed)
        dF;

    switch (i) { // preset value [changing bt_nA[i] if needed] (condition-based) per individual button
        case 1: // brackets
            if (!br_TOG) { // if brackets closed - check for false
                bt_nA[i] = [14, 0, 3, 7, 11, 15, 19, 1, 4, 5, 6, 8, 9, 10, 12, 13, 14, 17, 2, 16, 18];

                // disable numerals, brackets, percentage, decimal, modifier
            } else { // if brackets open 
                bt_nA[i] = [7, 0, 4, 5, 6, 8, 9, 10, 12, 13, 14, 16, 17, 19, 3, 7, 11, 15, 1, 2, 18];

                // disable percentage, operators and decimal and brackets itself; enable the modifier (if applicable)
            }
        break;
        case 2: // percentage
            if (br_TOG) { // if brackets open - check for true
                bt_nA[i][0] = 13;

                // disable numerals, percentage, decimal, modifier - but leave brackets enabled
            }
        break;
        case 4: // numerals - '1-9'
        case 5:
        case 6:
        case 8:
        case 9:
        case 10:
        case 12:
        case 13:
        case 14:
            if (br_TOG && d) { // if brackets and decimal
                v_1 = 18;
                v_2 = 1;
                nA_a(i, v_1, v_2); // rearrange network array to new format (swap decimal and brackets buttons)
                bt_nA[i][0] = 2; // enable everything except for decimal and modifier
            } else if (br_TOG) { // if brackets active (opened)
                bt_nA[i][0] = 1; // enable (everything) except for modifier
            } else if (d) { // if only decimal active... 
                bt_nA[i][0] = 3; // disable decimal as well with brackets and modifier
            } else {
                bt_nA[i][0] = 2; // (reset - back to default)
            }
        break;
        case 3: // operators 
        case 7:
        case 11:
        case 15:
            if (br_TOG) { // if brackets active (opened)
                bt_nA[i][0] = 5; // include brackets index (1) in button disabling loop
            } else {
                bt_nA[i][0] = 4; // reset back 
            }
        break;
        case 17: // numeral '0'
            var n = opG_A_C[opG_A_C.length - 1].length - 1; // current pos (as when after character has been entered)
            if (fC_tog(n)) { // check if numeral '0' is the first numeral of a TOG
                v_1 = 4;
                v_2 = 18;
                nA_a(i, v_1, v_2); // rearrange network array to new format (swap decimal with '7' button - prevent decimal from disabling)
                bt_nA[i][0] = 12; 
            } else {
                if (br_TOG && d) { // if brackets (open) and decimal active 
                    v_1 = 18;
                    v_2 = 1;
                    nA_a(i, v_1, v_2); // rearrange decimal (make disable) and brackets (make enable)
                    bt_nA[i][0] = 2;
                } else if (br_TOG) { // if brackets active (opened)
                    bt_nA[i][0] = 1; // enable (everything) except for modifier
                } else if (d) { // if only decimal active
                    bt_nA[i][0] = 3; // disable decimal, brackets and modifier
                } else {
                    bt_nA[i][0] = 2; // (reset - back to default)
                }
            }
        break; 
    }

    // set variables after preset

    nD = bt_nA[i][0]; // set no. btn to disable (different due to circumstance)
    _L  = bt_nA[i].length - 1;
    dF = _L - nD; // difference (no. of buttons - no. to disable) - buttons to enable

    eD_L(_L, dF, i, null); // loop through buttons network (enable and disable)

    if (v_1 && v_2) { // if both values have defined values (means a array format change was initiated - nA_a)
        nA_a(i, v_2, v_1); // reset back the array
    }
}

function eD_L(_L, dF, i, _Ar) { // loop through relevant buttons for enabling/disabling (with parameters)
    for (m = _L; m > dF; m--) { // disable
        var el = (i !== null) ? bt[bt_nA[i][m]] : bt[_Ar[m]]; // get button el index (during looping) - only if 'i' (button index) is valid
        if (!el.classList.contains("bDis")) { // if does not contain bDis class (disable)
            el.classList.add("bDis"); // add bDis
            el.classList.remove("bEn"); // remove bEn 
            el.removeEventListener("click", bt_Ck); // remove click    
            el.addEventListener("click", bD_ntf); // ADD button disable information message event listener
        }
    }
    for (k = 1; k <= dF; k++) { // enable
        var el = (i !== null) ? bt[bt_nA[i][k]] : bt[_Ar[k]]; // get button el index (during looping)
        if (el.classList.contains("bDis")) { // if btn contains bDis class (enable)
            el.classList.remove("bDis"); // remove bDis
            el.classList.add("bEn"); // add bEn 
            el.addEventListener("click", bt_Ck); // add click
            el.removeEventListener("click", bD_ntf); 
        }
    }
}

function oA_d(i, A) { // modify operators - to enable (take out one that is disabling)
    var A_L = A.length - 1,
        B = []; // modified array (for return)
    for (j = 0, k = 0; j <= A_L; j++) {
        if (i === A[j]) { // if target index is found, delete it (return element as undefined)
            delete A[j];
        } else {
            B[k] = A[j]; // add undeleted elements to new array (with no undefined holes)
            k++;
        }
    }
    return B;
}

function bD_ntf() { // notify when clicked (for disabled buttons)
    var m = "Input Button disabled", // message
        b = "Button has been disabled to protect equation integrity. Reset the Calculator, or try a different equation."; // blurb
    nw_Ntf(m, b, 1); // enable Level 1 advisory
}