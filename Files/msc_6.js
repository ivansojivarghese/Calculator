

function r_Dn(n, d, f) { // find if recurring decimal places [digits or patterns] exist in a (given) number
    var t = d + 1, // (index) first digit after decimal
        tC = f + t, // (index) decimal contain - between first and last places
        
        w_D = n.substring(0, d), // whole number string (integer only)
        n_D = n.substring(t, tC), // number string (decimal places only)

        s = false, // check status (false by default - changes to true when recur (or pattern) detected)
        r_C = 0, // recurring pattern count
        s_rD, // pattern that recur(s)
        s_rI, // initial index of pattern (first digit)
        p_dS, // prefix digit(s) [before the recur] - if applicable
        s_tD, // suffix digit (last [different] character after recur) - if applicable

        g = "", // string database (accumulated)
        rs; // object holding required values (to be returned)

    for (v = t; v <= tC; v++) { // loop through digits
        var e = n[v], // current digit
            ms_1; // misc. variable 1
        switch (v) {
            case t: // first decimal place
                g += e; // add to string database
                if (sbq_P(g, n_D)) { // check for subsqnt. pattern (using 'g' character)
                    s = true; // pattern (digit) has been detected - break from looping further
                    s_rD = g;
                }
            break;
            default: // all other decimal places
                g = (e !== undefined) ? (g + e) : g; // add-on to 'g' if 'e' is of defined value
                ms_1 = sbq_P_L(g, n_D); // check for subsqnt. patterns (using 'g' characters, and reducing variations - "1234", "234", "34", "4")
                if (ms_1.c) {
                    s = true; // pattern found
                    s_rD = ms_1.t.length > 1 ? pC_s(ms_1.t) : ms_1.t; // get recur pattern (or digit)
                    p_dS = ms_1.p; // store prefix digit(s)
                }
            break;
        }
        if (s) {
            break; // if pattern found, break from loop
        }
    }
    if (s_rD) { // if valid pattern exists
        var rgX = new RegExp(s_rD, "g"); 
        r_C = n_D.match(rgX).length; // get no. of pattern matches
        s_rI = n_D.search(s_rD); // set the index (first instance of detected pattern)
        s_tD = (s_rD.search(n[tC - 1]) === -1) ? n[tC - 1] : undefined; // suffix digit (undefined if last digit is part of detected pattern)
    }   

    rs = { // create result object
        c : s, // check (status)
        b : p_dS, // preifx digit(s)
        d : s_rD, // recur pattern
        n : r_C, // no. of recur pattern occurences
        x : s_rI, // index of first digit in recur pattern
        t : s_tD, // suffix digit
        w : w_D, // integer (whole) digit(s)
    }
    return rs;
}

function pC_s(sP) { // rotate among characters to check if all are similar
    var rs = sP[0]; // return output - first character by default, provided all other characters in this potential pattern are similar
    for (r_L = 0; r_L <= sP.length - 2; r_L++) { // loop between consecutive digits in potential pattern (in order, inclusive of final character)
        if (sP[r_L] !== sP[r_L + 1]) { // check if any 2 chracters (digits) in this pattern are not similar
            rs = sP // output the entire pattern
        }
    }
    return rs;
}