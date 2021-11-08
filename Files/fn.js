
// functions

var ip = document.getElementById("ip"), // input field
    opG_A_C = [ // TOG (term-operator group) character array
        []
    ],
    opG_A_S = [ // TOG string (combined-character) array
        []
    ], 
    opG_A_Sc = [], // TOG string (combined character-comma) array
    opG_A_C_L = [ // character length array (per TOG)
        []
    ], 
    opG_Cn = [], // cumulative total no. of characters (per TOGs, inclusive of commas, characters and operators)
    opG_A_T = [], // TOG length array
    opG_D_P = [], // decimal places/characters after decimal point - array (for each TOG)
    opG_Dp_L = [], // number of decimal places for each TOG, in array format

    cm_PsA = [], // comma positional index array (for equation)
    cm_Ct = 0, // comma count check (per TOG) 

    dc_TOG = false, // decimal check (per TOG)
    ng_TOG = false, // negative modifier check (per TOG)
    br_TOG = false, // brackets check (per TOG)
    nm_Ct = 0, // numeral count check, by 3 (per TOG)
    nm_DF = false, // equation default (clearing) status
    cL = false, // CLEAR (defaulting) status check - when clear to '0'
    etq_A = false, // allow for equate?
    op_B_p = false, // operator button clicked? (in most recent time)
    eqS = "", // equation string (inclusive of memory indexes, in DOM structure, that host numerals)

    sC_a = ["+", "×", "÷", ".", "%", "(", ")", "e"], // special characters array (for aNc coding)
    sC_aC = ["B", "C", "D", "P", "H", "X", "Y", "E"]; // respective 'codes' for characters above

function opG_Cm_U(_A, e) { // create TOG-element based array (based of display equation - with commas)
    var _L = e.length - 1,
        t = 0, // index iterator (for opG_Cn array)
        m = 0, // index iterator (for opG_A_Sc array)
        c;
    for (i = 0; i <= _L; i++) {
        c = e[i]; // character at index
        if (i === opG_Cn[t]) { // 
            m++; // subsequent array element
            _A[m] = c;
            t++;
        } else {
            if (_A[m] === undefined) {
                _A[m] = ""; // define as string if element (at index not defined)
            }
            _A[m] += c; // concatenate character(s)
        }  
    }
}

function opG_Am(c, r) { // modify TOG array(s)
    var o_C = str_O(c), // check if operator
        p_C = c === '%', // check if percentage
        _B = opG_A_S, // TOG (combined string)
        _A_L = opG_A_C.length - 1, // current TOG index
        dEq = d_1._3_1.innerHTML,
        _A_L_L, // current TOG subarray index
        _A,
        b,
        s;

    if (r) { // replacing last character (operator change)
        var c_L;

        s = true; // replacing true
        _A_L--;
        _A = opG_A_C[_A_L]; // get previous array TOG (character)
        _A_L_L = _A.length - 1; 
        _A[_A_L_L] = c; // replace character in array with new
        b = _B.length - 2;  // get previous array (not current)
        c_L = _B[b].charAt(_B[b].length - 1); // last character (for opg_A_S arr. element change)

        _B[b] = st_Lc(c, c_L, _B[b]); // replace character in TOG string
    } else { // normal
        s = false; // replacing false
        _A = opG_A_C[_A_L]; // get current array TOG (character)
        _A_L_L = nm_DF && (o_C || p_C) ? _A.length - 1 : _A.length; // conditions: operator and nm_DF

        _A[_A_L_L] = c; // add character to array
        b = _B.length - 1;  
        if (_B[b] === undefined) { // if string is not valid yet (undefined)
            _B[b] = c; // add a value
        } else if (!nm_DF) {
            _B[b] += c; // concatenate a value if not numeral defaulting
        }
    }

    nm_DF = false;
    DvT_1(c, s, _A_L, _A_L_L, false, null, op_B_p);
}

function cL_C(n) { // execute CLEAR (reset calculator situation)
    etq_A = false; // disallow equating

    df_OpgV();
    df_DvIn();
    df_DsO();

    sT_o = true; // reset any checks
    eqMemI = 0; // reset memory index count
    rsZr("0", n); // reset to zero
    nm_DF = false;
    mem_E_fn(true); // activate memory list

    io_L = setInterval(io_Lp, 1000/60); // restart input-overflow-detect loop
}

function nM_C(n) { // input numeral on click - (1 - 9)
    var c = bt[n].firstElementChild.innerHTML;
    if (nm_DF) { // if equation (in position) to be defaulted
        df_DsO();
        df_DvIn();
        df_OpgV();
    }
    if (!cL) { // if not in CLEAR status (proceed normally)
        opG_Am(c, false); // modify    
        if (dc_TOG) { // decimal detection
            bt_ED(n, true); // remain decimal disabled
        } else {
            if (nm_Ct < 3) { // numeral detailing for comma insertion
                nm_Ct++; // increment
            } else {
                var fC = ",", // first character
                    rfId = opG_Cn[opG_Cn.length - 1], // reference index  (if applicable only)
                    c_S = (rfId === undefined) ? 0 : rfId,
                    rC = d_1._3_1.innerHTML.slice(c_S, d_1._3_1.innerHTML.length),
                    rCp = nmP_M(rC), // attain purified version (no modifiers)
                    aC = fC.concat(rCp.s),
                    aC = rCp.m.concat(aC), // add the modifier back (if applicable)
                    aAC = d_1._3_1.innerHTML.slice(0, c_S).concat(aC);

                d_1._3_1.innerHTML = aAC;
                ip.innerHTML = mtL ? aAC : aAC.replace(ipM.innerHTML, "");

                cm_PsU(rfId, d_1._3_1.innerHTML, fC);
                
                cm_Ct++; // increment count
                nm_Ct = 1; // reset to default
            }
            bt_ED(n, false); // disable/enable buttons
        }
        cm_Psc();
        if (!eqS_a) { 
            d_1._3_1.innerHTML += c;
            ip.innerHTML += c;
        }
    } else { // if CLEAR - REPLACE THE ZERO
        nm_Ct++; 
        df_DvIn(); // reset DevInfo
        rsZr(c, null); // reset to the numeral (replace the '0')
        cL = false; 
        bt_ED(n, false); // disable/enable buttons
        d_1._3_1.innerHTML = c;
    }
    mem_E_fn(false); 
}

function op_C(n) { // input operator
    var tc_L = d_1._3_1.innerHTML.charAt(d_1._3_1.innerHTML.length - 1),
        c = bt[n].firstElementChild.innerHTML,
        eq_DfNm = false, // status check if Lines 165-177 has run (nm_DF)
        d_Dv = true; // check for DevInfo duplication

    eqS_a = false;
    if (nm_DF) { // if equation (in position) to be defaulted, and supplemented
        var m_Dx = strN_L("dx=", ip.innerHTML, 4), // find index of memeory to retrieve (assumed to be most recent)
            d_i = memAns[m_Dx - 1] + c; // display input

        opA_mem(m_Dx, true);
        
        df_DvIn(); // default completely
        df_OpgV();
        up_OpgV(d_i, true, m_Dx); // update for new numeral (answer) and operator
        d_Dv = false;
        eq_DfNm = true;
    }

    opG_A_Sc[opG_A_Sc.length] = strB_Ltog(d_1._3_1.innerHTML); // add to TOG array (inclusive of commas)

    if (str_O(c_L)) { // if operator (previous character)
        var nRo;
        opG_Am(c, true); // modify (replace operator)
        bt_ED(n, false);
        nRo = st_Lc(c, c_L, d_1._3_1.innerHTML);
        d_1._3_1.innerHTML = nRo;
        eqS = st_Lc(c, c_L, eqS);
        ip.innerHTML = st_Lc(c, c_L, ip.innerHTML); // new input consists of replaced operator
    } else {
        opMemN++; // increment
        opG_Am(c, false);
        bt_ED(n, false);
        if (!eq_DfNm) {
            opG_Cn[opG_A_C.length - 1] = d_1._3_1.innerHTML.length + 1;
        }

        if (!mem_In || nm_DF) { // DO THIS STATEMENT ONLY IF MEMORY INDEX JUST ADDED
            eqS += c + ";"; // add operator
        } else { // JUST ADD the operator
            eqS += c + ";";
            mem_In = false;
        }
        opG_A_C[opG_A_C.length] = []; // break the TOG (move to next with next input)
        opG_A_S[opG_A_S.length] = []; // same effect "" break TOG
        if (d_Dv) {
            d_1._3_1.innerHTML += c; 
        }
        ip.innerHTML += c;
    }
    dc_TOG = false; // reset check (since TOG shifted to new)
    eq_DfNm = false;
    nm_Ct = 0;
    cm_Ct = 0;
    cm_PsA = [];

    mem_E_fn(true); // ENABLE CLICK FUNCTION FOR MEMORY ENTRIES
}

function dc_C(n) { // input decimal
    var c = bt[n].firstElementChild.innerHTML;

    opG_Am(c, false);
    bt_ED(n, false);
    dc_TOG = true; // decimal check true
    d_1._3_1.innerHTML += c;
    ip.innerHTML += c;
    cL = false;

    mem_E_fn(false);
}

function br_C(n) { // input brackets
    var c;
    if (!br_TOG) { // if brackets inactive - add open bracket
        c = "(";
        br_TOG = true; // open bracket added (in current TOG)
        mem_E_fn(true); // active memory list
    } else { // else, add closed bracket
        c = ")";
        br_TOG = false; // closed bracket added
        mem_E_fn(false);
    }
    if (!cL) {
        opG_Am(c, false);
        bt_ED(n, false);
        d_1._3_1.innerHTML += c;
        ip.innerHTML += c;
    } else { // if CLEAR
        df_DvIn(); // reset DevInfo
        rsZr(c, null); // reset to the numeral (replace the '0')
        cL = false; 
        bt_ED(n, false); // disable/enable buttons
        d_1._3_1.innerHTML = c;
    }
}

function pc_C(n) { // input percentage
    var c = bt[n].firstElementChild.innerHTML,
        d_Dv = true;
    if (nm_DF) { // if equation (in position) to be defaulted, and supplemented
        var m_Dx = memAns.length,
            d_i = memAns[m_Dx - 1] + c; // display input

        opA_mem(m_Dx, true);

        df_DvIn(); // default completely (except display)
        df_OpgV();
        up_OpgV(d_i, true, m_Dx); // update for new numeral (answer) and operator
        d_Dv = false;
    }
    opG_Am(c, false);
    bt_ED(n, false);
    if (d_Dv) {
        d_1._3_1.innerHTML += c; 
    }
    ip.innerHTML += c;
    cL = false;

    mem_E_fn(false);
}

function z_C(n) { // input numeral - '0'
    var c = bt[n].firstElementChild.innerHTML;
    if (nm_DF) { // if equation (in position) to be defaulted
        df_DsO();
        df_DvIn();
        df_OpgV();
    }
    if (!cL) {
        opG_Am(c, false);
        if (dc_TOG) { // decimal detection
            bt_ED(n, true); // remain decimal disabled
        } else {
            if (nm_Ct < 3) {
                nm_Ct++;
            } else {
                var fC = ",", // refer to nM_C for more info
                    rfId = opG_Cn[opG_Cn.length - 1],
                    c_S = (rfId === undefined) ? 0 : rfId,
                    rC = d_1._3_1.innerHTML.slice(c_S, d_1._3_1.innerHTML.length), 
                    rCp = nmP_M(rC), // attain purified version (no modifiers)
                    aC = fC.concat(rCp.s),
                    aC = rCp.m.concat(aC),
                    aAC = d_1._3_1.innerHTML.slice(0, c_S).concat(aC);

                d_1._3_1.innerHTML = aAC;  
                if (eqMemI === 0) { // if no memory indexes
                    ip.innerHTML = mtL ? aAC : aAC.replace(ipM.innerHTML, "");
                } else { // if memory indexes exist
                    var rCpM = (rCp.m.length) ? "-" : "", // place negative symbol only (no brackets)
                        cbS_N = rCpM + rCp.s, // combined string numeral (with modifier)
                        cbS_D = ip.innerHTML.lastIndexOf(cbS_N), // get index reference of numeral (comma updating)
                        cbS_D_m = rCpM ? (cbS_D + 1) : cbS_D,
                        num_S = ip.innerHTML.slice(0, cbS_D_m), // slice entire display equation (without the last numeral)
                        c_aC = aC.slice(aC.indexOf(","), aC.length); // modify (slice) the aC for only purified numeral
                    ip.innerHTML = num_S.concat(c_aC);
                }

                cm_PsU(rfId, d_1._3_1.innerHTML, fC);

                cm_Ct++; // increment count
                nm_Ct = 1; // reset to default
            }
            bt_ED(n, false); // disable/enable buttons
        }
        cm_Psc();
        if (!eqS_a) {
            d_1._3_1.innerHTML += c;
            ip.innerHTML += c;
        }
    } else {
        df_DvIn(); // reset DevInfo
        rsZr(c, null); // reset to the numeral (replace the '0')
        cL = false; 
        bt_ED(n, false); // disable/enable buttons
        d_1._3_1.innerHTML = c;
    }

    mem_E_fn(false);

}

function nG_C(n) { // negative modifier
    var c = "-"; // hypen character
    ng_TOG = true; 
    if (!cL) {
        opG_Am(c, false);
        bt_ED(n, false);
        d_1._3_1.innerHTML += c;
        ip.innerHTML += c;
    } else { // if CLEAR
        df_DvIn(); // reset DevInfo
        rsZr(c, null); // reset to the numeral (replace the '0')
        cL = false; 
        bt_ED(n, false); // disable/enable buttons
        d_1._3_1.innerHTML = c;
    }
    mem_E_fn(false);
}

function bt_Ck() { // button click (function(s) dependable on button index)
    dB_A(); // check for any active DevTools
    var n = Number(this.dataset.n); // button index
    switch (n) {
        case 0: // clear
            op_B_p = false; // operator button not clicked
            cL_C(n);
        break;
        case 1: // brackets
            etq_A = true;
            op_B_p = false;
            br_C(n); // input
        break;
        case 2: // percentage
            etq_A = true;
            op_B_p = false;
            pc_C(n);
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
            etq_A = true; // allow for equating
            op_B_p = false;
            nM_C(n); // input function (refer above)
        break;
        case 3: // operators
        case 7:
        case 11:
        case 15:
            etq_A = true;
            op_B_p = true;
            op_C(n); 
        break;
        case 16: // negative modifier
            etq_A = true;
            op_B_p = false;
            nG_C(n);
        break;
        case 17: // numeral - '0'
            etq_A = true;
            op_B_p = false;
            z_C(n);
        break;
        case 18: // decimal point - '.'
            etq_A = true;
            op_B_p = false;
            dc_C(n); 
        break;
        case 19: // equate - '='
            var _L = qS.length - 1, // length of equation string
                _gL = opG_A_C.length - 1; // number of terms in equation (to be looped)
                aNc = ""; // alpha-numeric code
            op_B_p = false;
            for (i = 0; i <= _L; i++) { // create the ANC code by looping thru
                var c = qS[i]; // check each character
                if (num_N(c)) { // check for numeral
                    aNc += c; // add-on to aNc code
                } else if (cX_a(sC_a, c, true)) { // check for other characters
                    var j = cX_a(sC_a, c, false);
                    aNc += sC_aC[j];
                } else if (rgX(/[-]/g, c)) { // check for negative sign 
                    if ((str_L(aNc) === "X") || (str_L(aNc) === "E") || aNc === "") { // if last character of aNc is 'X' / 'E' OR aNc does not have codes (new)
                        aNc += "M"; // modifier
                    } else { // subtraction else if
                        aNc += "A";
                    }
                }
            }
            for (j = 0; j <= _gL; j++) { // update decimal_character(s) array
                var r_X = cX_a(opG_A_C[j], ".", false), // reference index (at decimal point)
                    k = r_X + 1, 
                    q = 0; 
                opG_D_P[j] = []; // create empty space for array 
                if (r_X !== -1) {
                    while (num_N(opG_A_C[j][k])) { // as long as numeral is detected after a decimal point, add to (decimal_character) array
                        opG_D_P[j][q] = opG_A_C[j][k];
                        k++;
                        q++; // iterate for both arrays
                    }
                }
            }
            if (aNc.includes("H") && opG_A_S.length === 1) { // if equated parameter(s) is just an standalone numeral (with percentage symbol)
                var u_aNc = aNc.replace("H", "D100"); // replace 'H' (percentage symbol) with 'D100' (dividing by 100)
                aNc = u_aNc;
            }
            if (etq_A) { // new equation input and no incomplete decimal tracks
                anc_D(aNc); // decode the code and do the operation(s)
                bt_ED(n, false); // disable necessary buttons
            } else {
                var m = "New Input not detected",
                    b = "Equation cannot be re-processed without a new input.";
                nw_Ntf(m, b, 1);
            }
        break;
    }
}

for (i = 0; i <= _Lbt; i++) { // loop thru buttons
    bt[i].addEventListener("click", bt_Ck); // add click event
}