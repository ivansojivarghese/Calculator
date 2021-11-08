
//  ANC code decoding
var aN_o = ["A", "B", "C", "D"], // ANC codes for the 4 operators
    aN_o_P = [1, 1, 2, 3], // priority levels for the operators above (index linked) - note that linear operators (add and minus are grouped together as same priority)
    aN_o_Cf_ = [0, 0, 0, 0], // operator (ANC code) count[ed] fixed

    aN_b = ["X", "Y"], // ANC code for (open, closed) brackets
    br_A = [], // bracket(s) indexes (updating) - on standby
    eq_A, // equation indexes (updating)
    op_A, // operators' indexes in desceding order 
    op_Ar; // "" - for reference purposes


function anc_D(a) { // decode (main function)
    var numEq_C = num_N(qS), // check (numerals - any form) exist in processing equation?
        opEq_C, // check (no. of operators vs. no. of TOGs) in equation?
        brEq_C = true; // check (if applicable) whether brackets have been enclosed [defualt: true]
    
    eq_A = a_Id(a); // indexed code
    op_A = r_Op(eq_A, aN_o_Cf_); // [object] array of coded (ANC) operators' indexes (ordered in descending order (per priority))
    op_Ar = op_A; // for post-equating reference
    opEq_C = (opG_A_C_L.length === op_A.length + 1) ? true : false; // true, if 1+ more TOG than operator no. - else false

    if (br_A.length) { // Remove any indexed brackets (X, Y) and re-index equation elements
        var n_A = a.replaceAll(/[XY]/g, ""), // remove brackets ANC (X, Y) from original ANC
            _L = br_A.length - 1; 
        op_A = b_Rm(eq_A, op_A);
        eq_A = a_Id(n_A); // update equation index (after new priorities have been set)
        for (b = 0; b <= _L; b++) { // loop through br_A to check for enclosure
            if (br_A[b][0] === null || br_A[b][1] === null) {
                brEq_C = false;
                break; // set false and break
            } else {
                brEq_C = true; // maintain default status
            }
        } 
    }

    // prioritise them, order of operations (BDMAS)
        // D, C, B, A
        // if 2 operators are same, the lower index (i.e. first occurring) is given more priority
        // sort the operations based of priority (which ones to do first) - operations inside brackets are given immediate priority
        // complete operations (between 2 surrounding numerals) 

    if (numEq_C && opEq_C && brEq_C) { // if (a) numeral exists, and operators' no. are correct
        if (op_A.length > 0) { // proceed only if an operation is involved in equation
            do { // execute once at least 
                var p = 0, // focus on first index (most priority) during a loop
                    r = cX_a(aN_o, op_A[p].d, false), // get index of operator in focus
                    e = op_A[p].n; // find the equation index of the operator in focus (target suceeding/preceeding values in equation index)

                pcT_n(e, r); // do percentage checks on terms that use the operator

                op_Fn[r](cvt_N(eq_A[e - 1], true), cvt_N(eq_A[e + 1], true), e); // do the operation function (while converting the numeral ANC code to numeral)
            } 
            while (op_A.length !== 0); // continue to loop through if there are more operations to conduct (op_A array is not empty) 
        }

        ds_P(cvt_N(eq_A[0], true)); // display final outcome (answer), and standby for sequential equating (add to memory)   
    } else {
        if (!opEq_C) { // if operator no. do not match up
            var b = "Ensure that operators are used with purpose. Clear out unnecessary operators.";
            nw_Ntf("Incomplete Equation", b, 2); // ADD level 2 WARNING! for opEq_C
        }
        if (!numEq_C) { // if no numerals exist
            var b = "Ensure that input contains numeric values.";
            nw_Ntf("Non-numeric input detected", b, 2);
        }
        if (!brEq_C) { // if brackets have no enclosure
            var b = "Ensure that brackets are enclosed properly.";
            nw_Ntf("Incomplete Equation", b, 2);
        }
    }

    etq_A = false; // prevent re-equating by user (without any new input)
}

function r_Op(_A, _Cf) { // get the indexes of operators in ANC code
    var _L = _A.length - 1,
        _L_cf = _Cf.length - 1,
        b = 1, // break point (divisor between linear operators and exponential operators)
        o_L, // total no. of linear operators (add and sub.)
        f = [], // store the fixed (count) values in variable (temp. array)
        a = [],
        a_L; // length of 'a' array

    for (w = 0; w <= _L; w++) { // find brackets (if any) and note their equation indexes
        var c = _A[w];
        if (cX_a(aN_b, c, true)) { // if match for bracket(s) characters
            var u = cX_a(aN_b, c, false), // open or closed status [0: open, 1: closed]
                x; 
            if (u) { // if closed
                x = w;
                br_A[br_A.length - 1][1] = x; // note index at closed (update 2nd element)
            } else { // if open
                x = [w, null]; // null element to make space for closed brackets index
                br_A[br_A.length] = x; // note index at opened
            }
        }
    }

    // set-up temp array 'f' for decrementation
    for (j = 0; j <= _L_cf; j++) { // loop through the 'f' variable (array) to account _Cf array (counting fixed values for number of operators)
        if (j === b) { // (at) while looping the addition operator (after subtraction has been looped)
            o_L = _Cf[j] + _Cf[j - 1]; 
            f[j] = o_L; // replace array values (grouping them to consider linear operators (add and subtract) with same priority levels)
            f[j - 1] = o_L; 
        } else { // others (multiply and divide)
            f[j] = _Cf[j]; // 'f' array is temp. (read-only version array of aN_o_Cf_ array)
        }
    }

    for (i = 0, v = 0, q = br_A.length; i <= _L; i++) { // set priority levels and equation indexes, take note indexes of brackets (open and close) as well [if exists]
        var c = _A[i];
        if (cX_a(aN_o, c, true)) { // if array element matches the operator codes...
            var y = cX_a(aN_o, c, false), // find the index of operator (ANC code) in aN_o
                _B = 0, // additional priority value(s) for [operators in] brackets
                r; 

            if (q) { // check if br_A (existence of brackets) is not empty
                if (i > br_A[v][1] && br_A[v + 1] !== undefined) { // if operator index is greater than bracket-pair (current) closing index
                    v++; // increment - focus on next (subsequent) bracket-pair (if next pair exists...)
                    q--; // decrement - remaining bracket-pairs to process
                }
                if (i < br_A[v][1] && i > br_A[v][0]) { // if operator index falls within the index(es) of opening/closing bracket-pair (operator inside it)
                    _B = 3 * q; // update additional priority value with base (3) * no. of bracket-pairs (remaining to count)
                }
            }    

            if (y <= 1) { // if addition, subtraction operators
                r = aN_o_P[y] + (((1 - 0.01) / o_L) * f[y]) + _B; // same as below... + priority is based on which operator (either 0 or 1) appears at the beginning
                f[0]--; // decrement both values (0 and 1) as linear operators' priorities are cal. on same level
                f[1]--;
            } else { // if multiplication, division operators
                r = aN_o_P[y] + (((1 - 0.01) / _Cf[y]) * f[y]) + _B; // calculate priority level (base + [de]incrementation [based on how many of the same type exist])
                f[y]--; // reference to array (aN_o_Cf_) [temp. array used as stated array is fixed value cannot be changed]
            }

            a[a.length] = { // add object to array with properties
                d : c, // ANC code
                e : u_Id(), // identifier code (unique within equation scope) 
                n : i, // relative equation index
                p : r // priority level
            }; 
        } 
    }
    a_L = a.length - 1;

    // sort
    for (z = 0; z <= a_L; z++) { // sort the operator (array) elements according to priority level (descending) - perform this operation at least a few times for a guarantee
        for (k = 0; k <= a_L; k++) {
            var _m = (k === a_L) ? (-1 * a_L) : 1; // get the modifier, +1 incrementation to (array) index to compare 2 consecutive elements
            if (a[k].p < a[k + _m].p && (_m === 1)) { // if the preceeding (0) element is less than suceeding (1), [these] elements need to be rearranged
                var x = a[k], 
                    y = a[k + _m];
                a[k] = y; // perform a value swap
                a[k + _m] = x;
            } 
        }
    }

    return a;
}

function a_Id(a) { // array index (number) the coded equation
    var _L = a.length - 1, 
        q = [], // equation index(es) element(s) array
        b = 0, // base index
        // conditional variables
        y = false; // 'operator/numerals' change check
    q[b] = ""; // declare as string (array elements)

    for (m = 0; m <= _L; m++) { // index the ANC code (separate numerals, operators and brackets)
        var c = a[m]; // get the (a) code
        if (cX_a(aN_o, c, true)) { // compare with array above (check if code = an operator) + 'numeral change' condition is true
            var y = cX_a(aN_o, c, false); // find index of operator
            b++; // increment index (next array element)
            aN_o_Cf_[y]++; // count (for a fixed value in r_Op)
            q[b] = c; // set value
            y = true; // allow to run control flow below (with incremented base index)
        } else if (cX_a(aN_b, c, true)) { // if code [character] relates to a bracket (either open or closed)
            // b++; // new el.
            b = (b === 0) ? b : b + 1; // increment 'b' if not = 0
            q[b] = c;
            y = true;
        } else if (y) { // if code [character] does not relate to an operator + changeover from other control flow (above)
            b++; 
            q[b] = c; 
            y = false; // make false (further characters can be added in control flow below - with no change of base index)    
        } else { // if code [character] does not relate to an operator (default control flow) + NO changeover from other control flow
            q[b] += c; // add on (string value) characters to array element 
        }
    }

    return q;
}