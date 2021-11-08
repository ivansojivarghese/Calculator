
// miscellaneous

var ipP = ip.parentElement, // h1
    ipM, // input (2nd) line selector
    ov1 = false, // overflow 1 check
    ov2 = false,  // overflow 2 check
    ov2_C = 0, // overflow 2 count
    mtL = true, // multiline potential (can be enabled?)
    iP_T = 325, // input display threshold 
    usR = 100, // average user reaction time (ms.) - assumed
    sT_o = true, // single TOG overflow check
    
    devTest = true; // FOR DEVELOPER > true if currently in testing

function io_Lp() { // input overflow detect
    var iB = ip.getBoundingClientRect(), // bounding area of input span
        iMB = !mtL ? ipM.getBoundingClientRect() : null, // bounding area of multiLine input (when activated)
        iB_w = iB.width, // width property
        iMB_w = iMB ? iMB.width : null; // width property (when activated)

    if (ov1 && sT_o && opG_A_S.length === 1) { // overflow message when single TOG is nearing overflow 2
        var b = "Break down equation to smaller terms."; // blurb
        nw_Ntf("Display Output in Constraint", b, 2);
        sT_o = false;
    }
    if (iB_w > iP_T || iMB_w > iP_T) { // if input text length hit display threshold
        if (!ov1) { // if overflow 1 (instance) 
            ipP.classList.add("ov1"); // smaller font
            ov1 = true; 
        } else if (!ov2 || mtL) { // if overflow 2 (allow multi-line)
            var p_iMB_w = opG_A_T[ov2_C] + iMB_w; // prospective (2nd line input) width - with multiline transferred TOG
            if (p_iMB_w < iP_T) { //  if prospective value does not exceed iP_T in 2nd input
                mtL_E(mtL, true, null); // enable multiline            
                gOp_T(ov2_C, ip, ipM); // term-operator group line transfer
                mtL = false; // multi-line only need to be enabled once
                ov2_C++; // increment group index (standy following ones)
                if (p_iMB_w > (iP_T / 2)) { // if prospective value is greater than half the input field width (max display space)
                    var rM = (iP_T - p_iMB_w).toFixed(2), // display space remaining (round to 2 decimal places)
                        rM_S = rM + "px remaining. Display Ouput nearing limit.";
                    
                    nw_Ntf("Display Output in Constraint", rM_S, 2); // Lv. 2 - warning
                }
            } else { // else, overflow 3
                var _A = [19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]; // create a buttons network array
                    _m = "Display Output has exceeded legal number of characters (in length). Reset Calculator and try again.";

                nw_Ntf("Display Output in Limit", _m, 3); // Lv.3 - error
                clearInterval(io_L); // stop the overflow-check loop
                bt_ED_m(_A); // disable all buttons except the 'C' - clear
            }
        }
    }
}

function gOp_T(g, el, elM) { // group-operator-terms multi-line transfer (return combined string value from terms)
    
    var toG = "", // potential TOG to transfer multi-line
        t = 0, // string character-index iterator
        _L = true, // loop condition status
        fC = false, // first character checked?
        el_S = "", 
        el_R = ""; 
    do {
        var c = el.innerHTML[t]; // get first character, determine if normal string character or angular bracket, HTML element
        if (fC) {
            toG += c;
            if (str_O(c) && (el.innerHTML[t - 1] === ">")) { // if operator (adjacent to a closing angular bracket)
                _L = false;
            }
        } else if (!fC && c === "<") {
            toG += c;
            fC = true; // run once only
        } else if (!str_O(c)) { // if incrementing character(s) are not operators
            toG += c; // get character per index
        } else { // if character is an operator
            toG += c; // get character per index
            _L = false; 
        }
        t++; 
    } while (_L);

    el_S = el.innerHTML.slice(0, toG.length);
    el_R = el.innerHTML.replace(el_S, ""); 

    el.innerHTML = el_R;    
    elM.innerHTML += el_S;
}

function mtL_E(b, c, a) { // enable multi-line if conditions exist
    if (b && c) { // if multi-line has potential (has not been enabled)
        var spB, // span block (2nd line above active line)
            spIb; // span inline-block (inside spB) - holds input text content (secondary)
        spB = document.createElement("SPAN"); // create HTML span elements
        spIb = document.createElement("SPAN"); 

        ipP.classList.add("ov2"); // allow space for multiline

        spB.setAttribute("id", "ipM_c"); // set id for containing span
        spIb.setAttribute("id", "ipM"); // set id for input span
        spB.style.display = "block"; // avoid inline positioning with active line
        spB.appendChild(spIb); //  append secondary span
        ipP.insertBefore(spB, ip); // insert before active input line in h1 (parent) itself

        ipM = document.getElementById("ipM"); // select via id query
    } else { // if multi-line has been activated, and therefore to be removed
        mtL = true; // reset
        if (a) {
            var ipM_P = ipM.parentElement; // declare if multi-line is defined in DOM
            ipM_P.remove(); // remove multi-line span text
        }
    }
}

function dB_A() { // detect if debugging tools are active (during operation of program)
    var bef = new Date().getTime();
    if (!devTest) { // if not testing
        debugger; // break if DevTools console is open
    }
    var aft = new Date().getTime(); // 'aft' time check if delayed
    if ((aft - bef) > usR) { // if delay is big, then assumed that the console was open
        dV.style.display = "none";
    } else {
        dV.style.display = "block"; 
    }
}


