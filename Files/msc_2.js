
// misc. 2
var eqS_a = false; 


function tme() { // return the time (24H - Hours/Minutes)
    var d = new Date();
        m = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes(); // add '0' infront of minutes value if single-digit (less than 10)
        s = d.getHours() + ":" + m;
    return s;
}

function str_Rj(s) { // string reverse (to array) - join (to string)
    var _A = s.split("", s.length), // split input string into array of 'n' substring elements
        _rA = _A.reverse().join(""); // reverse, and then join
    return _rA;
}

function st_Lc(c, L, s) { // string last character change
    var s_N = str_Rj(s).replace(L, c); // replace old character with new (reversed string - changes first instance of targeted character)
    return str_Rj(s_N); // reverse again back to original - return
}

function num_N(n) { // check for numbers (digits: 0 - 9)
    var rgE = /[0-9]/g, // check for range of digits
        rs = rgE.test(n);
    return rs;
}

function alp_C(c) { // check for any latin alphabet characters
    var rgE = /[a-z|A-Z]/g, // uppercase and lowercase
        rs = rgE.test(c);
    return rs;
}

function cX_a(_A, c, s) { // compare with array (find values and return if exists)
    var rgE = _A.indexOf(c), // find a specific character among array elements
        rs = (rgE === -1) ? false : true; // -1 returned if no match is found
    if (s) { // status check (for different return val.)
        return rs; // return boolean
    } else {
        return rgE; // return index (assuming boolean is true)
    }
}

function fC_tog(n) { // check if a numeral is the first numeral in a new TOG
    var rs = !n ? true : false;  // return true if character (numeral) pos. is 0 (first)
    if (!rs) { // else, loop through previous characters (from pos.) to check
        for (i = (n - 1); i >= 0; i--) {
            if (num_N(opG_A_C[opG_A_C.length - 1][i])) { // check for numeral
                rs = false;
                break;
            } else {
                rs = true;
            }
        }
    }
    return rs;
}

function nA_a(i, v_1, v_2) { // (button) network array arrangement (shifting)
    var f_E = bt_nA[i].shift(), // get 1st element removed (no. disabled)
        p_1 = bt_nA[i].indexOf(v_1), // temporary bt_nA[i] array from this point
        p_2 = bt_nA[i].indexOf(v_2); // find index pos. of specified values

    bt_nA[i][p_1] = v_2; // swap the values (with respective pos.)
    bt_nA[i][p_2] = v_1;  
    bt_nA[i].unshift(f_E); // add back removed first element
}

function rgX(c, s) { // find any character in a given string (universal)
    var rgE = c,
        rs = rgE.test(s);
    return rs;
}

function str_L(s) { // find last character in a string
    var c = s.charAt(s.length - 1);
    return c;
}

function ext_N(a) { // extract number from a string (percentage ANC code)
    var _L = a.length - 1,
        n = a.slice(0, _L); // extract the number from all characters (removing the last percentage character)
    
    return cvt_N(n, true);
}

function nwEL(el) { // create new HTML DOM elements (faster method)
    var res = document.createElement(el);
    return res;
}

function strN_L(sP, str, f) { // find a known numeral value(s) from a string 
    var _d = str.lastIndexOf(sP) + f, // initial index
        _L = true, // loop condition
        rs = ""; // output numeral
    while (_L) {
        if (num_N(str[_d])) { // loop through characters (numerals) until non-numeric
            rs += str[_d];
            _d++;
        } else {
            _L = false;
        }
    }
    return Number(rs); // return
}

function cm_PsU(r, h, c) { // comma position update
    var _An = 0, // array index, incrementing with progress
        s = r ? r : 0; // s = r if, r is defined
    for (i = s; i <= h.length - 1; i++) { // update pos. in array
        if (h[i] === c) {
            cm_PsA[_An] = i; // set position of specific comma in equation (in order)
            _An++;
        }
    }
}

function cm_Psc() { // comma position change (in display output during equation formation)
    if (cm_PsA.length && !dc_TOG) { // if contains at least 1 comma, no decimals are present
        var _sA;
        if (eqMemI === 0) { // if no memory indexes used
            var _L = cm_PsA.length - 1,
                aC;
            _sA = d_1._3_1.innerHTML.split("", d_1._3_1.innerHTML.length);
            for (i = 0; i <= _L; i++) {
                var iX = cm_PsA[i],
                    a = _sA[iX],
                    b = _sA[iX + 1];
                _sA[iX] = b;
                _sA[iX + 1] = a; 
                cm_PsA[i]++;
            }
            aC = _sA.join("");
            d_1._3_1.innerHTML = aC;
            ip.innerHTML = mtL ? aC : aC.replace(ipM.innerHTML, "");
        } else { // if memory indexes have been used
            var c_str = cm_A_Nm(opG_A_S[opG_A_S.length - 1]), // modify entering numeral with comma placements
                o_Rgx = new RegExp(";", "g"), // literal regular expression - search for ';' - identification of operator placements
                dsH = "", // display output HTML
                d1H = ""; // dev output HTML
            if (!eqS_a) { // if new TOG (no modifications made)
                eqS += c_str; // add numeral 
            } else { // replace with new comma annotations
                var w = eqS.slice(0, eqS.lastIndexOf(";") + 1); // slice out the entire eqS (without the TOG in focus - at the end)
                eqS = w.concat(c_str);
            }
            _sA = eqS.split(o_Rgx);
            for (k = 0; k <= _sA.length - 1; k++) { // split, removing the ';' placements - join back for display/dev output
                dsH += _sA[k];
            }
            d1H = d_1._3_1.innerHTML.slice(0, d_1._3_1.innerHTML.length - opG_A_S[opG_A_S.length - 1].length);
            ip.innerHTML = dsH; 
            d_1._3_1.innerHTML = d1H + c_str; // update dev info
            eqS_a = true; // update status check (code executed through)
        }
    } 
}

function ctnStr(c, s, i) { // add string to specific location (index) within string
    var fS = s.slice(0, i), // first part of string
        eS = s.slice(i, s.length); // second (end) part of string
    eS = c.concat(eS); // add character at beginning of second string
    fS = fS.concat(eS);
    return fS; // join both
}

function cm_A_Nm(m) { // identify if a numeral (in string format) requires commas in display output
    var nP_v = nmP_M(m.toString()), // convert numeral to string format (for looping), and determine its purified version
        n = nP_v.s, // get the main string 
        d = n.indexOf("."), // check for decimal placing
        dP_s = "", // decimal placement string (if applicable)
        t = 1, // numeral count (for comma placement)
        s, // loop start index
        rA = [], // output value (array of strings)
        r; // output value (string)
    if (d !== -1) { // if decimal exists
        s = d - 1; // start before decimal point
        dP_s = (s >= 3) ? n.slice(d, n.length) : ""; // retrieve the decimal placements (only if 'ans' numeral in the thousands)
    } else {
        s = n.length - 1; // start at end
    }
    if (s >= 3 && !alp_C(n)) { // if number to digits (applicable) greater than hundreds + NO non-numeric characters in string
        for (i = s; i >= 0; i--) {
            if (t === 4) { // every count of 4
                var a = n.slice(i + 1, i + 4), // slice the last 3 digits, since commas divide numerals by digits of 3
                    b = ",";
                r = b.concat(a); // concat with comma infront
                rA[rA.length] = r; 
                t = 1; // default
                i++; // backtrack iterator by 1
            } else if (n[i] !== undefined && n[i] !== "-") { // ensure no modifiers are accounted
                t++; // increment with defined digit
            }
            if (i === 0) { // after final processed numeral
                r = ""; // reset
                for (j = rA.length - 1; j >= 0; j--) { // loop through all strings and combine
                    r += rA[j];
                }
            }
        }
    } else {
        r = m; // return the original
    }

    r += dP_s; // add remaining decimal numbers

    if (t > 1) { // (t - 1) no. of unprocessed digits, add them to existing 'r' string
        var u = n.slice(0, t - 1); // digits in focus
        r = u.concat(r);
        r = nP_v.m.concat(r); // add the modifer (at front - if applicable)
    }
    return r;
}

function strB_Ltog(s) { // string bacwkards loop for TOG (most recent)
    var _L = s.length - 1,
        s_O = 0, // no. of operators detected
        rs = "";
    for (i = _L; i >= 0; i--) {
        var c = s[i];
        if (!str_O(c) || s_O === 0) { // if character is not operator, OR character is the FIRST detected operator
            rs = c.concat(rs); // add to front of 'rs' string
            s_O++; // increment normally
        } else if (s_O > 0) {
            break; // stop loop
        } else {
            s_O++; 
        }
    }
    return rs;
}

function a_Nv(e_Id, s) { /*tile viewer - navigation; open/close*/
    var e = document.getElementById(e_Id);
    if (s) {
        e.style.visibility = "visible"; // visible (end page)
    } else { 
        e.style.visibility = "hidden"; // hidden 
    }
    // visibility property only works if z-index is high enough, and calculator frame DOM element is parent
}

function rmvChild(pr) { // remove all child nodes (elements) from a parent in the DOM
    while (pr.firstChild) {
        pr.removeChild(pr.firstChild); // remove a child node as long as it exists
    }
}

function str_O(p) { // search for math (different) operators 
    var rgE = /[÷×-]/i, // operators ('+' excluded given its multi-purpose use (outputs error))
        rs = rgE.test(p) || p === "+"; // check ('+' check uses standard conditional check)
    return rs; 
}

function nmP_M(n) { // return the purified version of a number (no modifier and brackets)
    // assuming 'n' is in string format
    var res = { // output resultant
        s : "", // numeral string
        m : "" // modifer placer
    }; 
    if (n[0] === "(" && n[1] === "-") { // if both brackets and modifier in use
        res.s = n.slice(2, n.length); // slice out both
        res.m = "(-";
    } else if (n[0] === "-" || n[0] === "(") {
        res.s = n.slice(1, n.length); // remove ('slice' out the modifier/open bracket)
        res.m = n[0]; 
    } else {
        res.s = n; // normal
        res.m = ""; // unapplicable
    }
    return res;
}

