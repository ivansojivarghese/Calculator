
// DevTools functions

var d_1 = {
        c : document.getElementById("dev1"),
        _1 : document.getElementById("d1_1"),
        _2 : document.getElementById("d1_2"),
        _3 : document.getElementById("d1_3"),
        _3_1 : document.getElementById("d1_3.1"),
        _4 : document.getElementById("d1_4"),
        n : 0 // track how many appended lines
    },
    d_2 = {
        _1 : document.getElementById("d2_1")
    },
    qS = ""; // equation string

function DvT_1(h, s, r, c, u, m, p) { // input characters in span, part of DevTools 1
    if (h) { // if legitimate string character
        var nP = nwEL("P"), // new paragraph 
            d2_S = d_1._2.innerHTML,
            d3_S = d_1._3.innerHTML,
            oC = str_O(d2_S.charAt(d2_S.length - 1)), // operator check (for last entered character)
            mC = (c === 0 && h === "-") ? true : false,
            sC = false, // check for last character (digit) - only applicable when u = true [default:false]
            ySc = d_1.n * 26, // y-scroll (in px) value - occurrence * line height
            tL = ""; // length of TOG (to be shown if applicable)

        // USE 'm' to find the last character - nmP(memAns[mDx - 1].s)

        if (oC) { // if operator
            if (s) { // if replacing previous
                var _L = opG_A_C_L[r].length; 
                opG_A_C_L[r][_L - 1] = 0; // default last array (column) index 
            } else {
                opG_A_C_L[r] = []; // declare new array column
            }
        }
        d_1._1.innerHTML = h;
        
        if (u) { // if memory (index) is being used
            var mD = document.getElementsByClassName("memDx"), 
                mD_f = mD[mD.length - 1].clientWidth, // get first memory index (el. width) in eq.
                Lc_m = nmP_M(memAns[m - 1]); // negative (mem. index) numeral in string - purified
            sC = (h === Lc_m.s[Lc_m.s.length - 1]) && (c === Lc_m.s.length) && (Lc_m.m === "-") ? true : false; // set to true if character 'h' in focus matches last digit in numeral (if 'u'=true)  OR operator detected
            opG_A_C_L[r][0] = mD_f;
            if (Lc_m.m === "-") {
                ng_TOG = true; // set to true if negative numeral
            }
        } else {
            opG_A_C_L[r][c] = d_1._1.clientWidth;  // add length value to respective array
        }
        if (str_O(h)) { // if current character is operator
            var _L = opG_A_C_L[r].length - 1, 
                n = 0,
                a; 
            for (i = 0; i <= _L; i++) { // looping thru each character length (and adding them up) for TOG total length
                a = opG_A_C_L[r][i] ? opG_A_C_L[r][i] : 0;
                n += a; // increment using value 'a' only if it's valid
            }
            opG_A_T[r] = n;
            tL = " ------- TOG total: " + n + "px";     
        }
        if (s) { // if replacing
            var L_1 = d2_S.charAt(d2_S.length - 1),
                L_2 = d3_S.charAt(d3_S.length - 1);
            d_1._2.innerHTML = st_Lc(h, L_1, d2_S); 
            d_1._3.innerHTML = st_Lc(h, L_2, d3_S);
        } else { // or if adding on
            if (!sC) {
                sC = (str_O(h) && op_B_p) ? true : false; // EXCEPTION for sC: true IF operator is detected
            }
            if (mC) { // first character in numeral (negative in mem. index)
                d_1._3.innerHTML += "(" + h;
            } else if (sC && ng_TOG) { // last character in numeral
                if (op_B_p) { // if operator clicked
                    d_1._3.innerHTML += ")" + h;
                } else {
                    d_1._3.innerHTML += h + ")";
                }
                ng_TOG = false; // end of negative modifier
            } else {
                d_1._3.innerHTML += h;
            }
            if (oC) {
                d_1._2.innerHTML = h;
            } else {
                d_1._2.innerHTML += h;
            }
        }

        nP.innerHTML = "(" + r + ", " + c + "): '" + h + "' = " + opG_A_C_L[r][c] + "px" + tL; // concatenate to string format - (0, 1): '9' = 45px
        d_1._4.appendChild(nP); // append string
        d_1._4.scrollTo(0, ySc); // scroll to last
        d_1.n++;

        qS = d_1._3.innerHTML; // update to equation string variable
    }
}

function Dvt_2(_A) { // Update DEV 2 
    var _L = _A.length - 1;
    for (i = 0; i <= _L; i++) {
        var nP = nwEL("P"), // create new paragraph element
            oJp = Object.getOwnPropertyNames(_A[i]), // return an array of names, of object properties, of an object
            str = "";
        for (j = 0; j <= oJp.length - 1; j++) {
            str += oJp[j] + ": " + _A[i][oJp[j]] + " ; "; // concat (object-property-name) + (object-property-value, using name)
        }
        nP.innerHTML = str;
        d_2._1.appendChild(nP);
    }
}