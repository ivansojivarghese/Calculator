
// universal math functions 

var op_Fn = [sbtct, add, mply, dvde]; // array of math operation functions


function sbtct(a, b, d) { // subtraction (index 1 - A)
    var z = ((a / 10) - (b / 10)) * 10, // do the relevant operation on the 2 terms - divide and multiply by 10 factor; deal with floating point numbers
        r = ex_Fx(z); // to deal with decimal values (if applicable)
    eqa_M(r, d); // modify eq_A array ('simplification' process)
}

function add(a, b, d) { // addition (index 2 - B)
    var z = ((a / 10) + (b / 10)) * 10,
        r = ex_Fx(z);
    eqa_M(r, d); 
}

function mply(a, b, d) { // multiplication (index 3 - C)
    var z = ((a / 10) * (b / 10)) * 100,
        r = ex_Fx(z);
    eqa_M(r, d); 
}

function dvde(a, b, d) { // divide (index 4 - D)
    var z = a / b,
        r = ex_Fx(z);
    eqa_M(r, d);
}


function ex_Fx(z) { // display decimal values accordingly
    var n = z.toString(), // convert number to string (with character reference)
        d = n.indexOf("."), // index (initial - to search for decimal point)
        n_C = n_ZD_(n, d), // case output object (depending on number characteristics)
        r; // modified version of 'z' original number
        
    if (op_A.length === 1) { // IF NO MORE operations after this point (this is LAST)
        switch (n_C.oT) {
            case 1: // if number of decimal places less than 5
                r = z; // return original
            break;
            case 2: // "" if more than 5
                r = z.toFixed(aO_d);
            break;
            case 3: // "" more than 5, and recurring pattern exists in some form
                var fP = n_C.rP, // get the recur-digit object properties
                    _i = fP.w, // whole integer digit(s)
                    _f = (fP.b) ? fP.b : "", // prefix (if applicable)
                    _p = fP.d, // pattern
                    _s = (fP.t) ? fP.t : "", // suffix (if applicable)
                    _z = Number(_i + "." + _f + outP_c(_p, (p_iTr(_p) - 1)) + _s);  // combine all numeric strings (convert to number form)
                r = _z;

                // r =  
                    // w
                    // b (if applicable)
                    // d
                    // t (if applicable)
            break;
            case 4: // if extensive number of leading zeroes (detected), with a non-zero integer
                r = Math.round(z); // round off to integer itself
            break;
            case 5: // if number has an abnormal high-occurrence single-digit pattern (in decimal places)
                var p = n_C.p_P ? n_C.p_P : "";
                r = z.toFixed(p.length);                 
            break;
            case 6: // specifically for exponentials (in the form 'ne-n')
                var p = n_C.exP;
                r = z.toFixed(p); // round off to exponential exponent no.
            break;
        }
    } else {
        r = z; // display as original number
    }

    return r;

    // USE [number].toExponential(2) if: 
        // 1. FINAL OUTCOME depends on this division operation (NO more operations to take place after this - op_A.length = 1) AND
            // 2. FINAL OUTCOME contains 0 values in tenths and hundreths places
}

function p_iTr(p) { // pattern iteration for display output
    var _L = p.length, // no. of digits in pattern
        rs; // output
    switch (_L) {
        case 1:
            rs = 5; // output no. of times for pattern iteration in display output
        break;
        case 2:
            rs = 3;
        break;
        case 3:
        case 4:
            rs = 2;
        break;
        default:
            rs = 1;
        break;
    }
    return rs;
}

function eqa_M(r, d) { // modify eq_A array ('simplification' process)
    var x = cvt_N(r, false), // convert the outcome (number) to ANC code format
        _L = eq_A.length - 1,
        y = [], // eq_A replicate array
        z = []; // draft array (with modified elements) for (update of) eq_A array
    for (i = 0; i <= _L; i++) { // array 'y' is a replicate of eq_A (as of parsing at this line)
        y[i] = eq_A[i]; // loop through...
    }
    y[d - 1] = x; // the operation outcome (between 2 terms + operator) replaces the 3 elements [term 1]
    y[d] = null; // other 2 elements are void [operator]
    y[d + 1] = null; // [term 2]
    for (j = 0, k = 0; j <= _L; j++) {
        if (y[j] !== null) {
            z[k] = y[j]; // draft the 'z' array using only legitimate (non-void) values of 'y' array
            k++;
        }
    }
    eq_A = z; // update new
    op_A = r_Op(eq_A, aN_o_Cf_); // update the order of operations again...
}


function cvt_N(c, s) { // convert an [numerical only] ANC code to number (s = true) / vice versa - number to ANC code (s = false)
    var anc_A = ["P", "M"], // ANC character codes (relevant ones only) - decimal point and negative modifier
        anc_Ac = [".", "-"], // reverse of above ""
        _A = s ? anc_A : anc_Ac, // choose the primary focus (and secondary focus) arrays depending on circumstance ('s' parameter)
        _Aa = s ? anc_Ac : anc_A,
        _Lc_,
        q = ""; // return variable

    c = s ? c : String(c); // if 's' is false, convert ANC code to string format
    _Lc_ = c.length - 1;

    for (i = 0; i <= _Lc_; i++) { // loop through characters
        var h = c[i];
        if (cX_a(_A, h, true)) { // find character within array
            var d = cX_a(_A, h, false);
            q += _Aa[d]; // add reference character in string
        } else {
            q += h;
        }
    }

    if (s) { // return number (non-ANC) or string (ANC) depending on circumstance
        return Number(q);
    } else {
        return q;
    }
}