
// Calculator [parameters] defaulting functions

var eqMemI = 0, // no. of memory indexes in display equation 
    opMemN = 0, // no. of operators in display equation
    mem_In = false; // memory inserted? - dynamic variable that changes during equation creation

function df_DsO() { // default display ouput (remove overflow) and ipM
    var ipM_c = document.getElementById("ipM_c");
    ipP.setAttribute("class", "dg"); // reset classes for h1 in display
    ov1 = false; // values back to reset
    ov2 = false;
    ov2_C = 0;
    mtL = true;
    ip.innerHTML = "";
    if (ipM_c) {
        ipM_c.remove(); // remove only if element is defined in DOM
    }
    as_D.title = ""; // empty ans title
}

function df_DvIn() { // default DevInfo stats
    d_1._1.innerHTML = "";
    d_1._2.innerHTML = "";
    d_1._3.innerHTML = "";
    d_1._3_1.innerHTML = "";

    rmvChild(d_1._4); // remove all child elements from both
    rmvChild(d_2._1);
}

function df_OpgV() { // default opG arrays and index values
    opG_A_C = [
        []
    ]
    opG_A_S = [
        []
    ]
    opG_A_Sc = [];
    opG_A_C_L = [
        []
    ]
    opG_Cn = [];
    opG_A_T = [];
    opG_D_P = [];
    opG_Dp_L = [];
    br_A = [];
    cm_PsA = [];
    cm_Ct = 0; 
    dc_TOG = false;
    ng_TOG = false;
    br_TOG = false;
    nm_Ct = 0;
    opMemN = 0;
    qS = "";
    eqS = "";
    eqS_a = false;
}

function up_OpgV(d, s, m) { // update opG globals to new numerals
    var dA_c = [], // 'd' character array - to be looped
        _L = s ? d.length - 2 : d.length - 1, // looping limit depending on circumstances
        _Ldx_s, // last index of <span> (to be determined below)
        _Lx_str; // string (previous memory index)

    mem_In = true; // memory being inserted (status - true)

    // _L = m ? _L + 1 : _L; // increment 1 if modifier present (numeral is negative)
    for (j = 0; j <= d.length - 1; j++) {
        dA_c[j] = d[j]; // loop through for characters
        if (j <= _L) { // avoid looping final character - an operator
            var t = s ? 0 : opG_A_S.length - 1; // set based on circumstance
            DvT_1(d[j], false, t, j, true, m, op_B_p); // LOOP function for each of the characters for DevInfo input
        }
    }
    if (s) { 
        opG_A_C = [dA_c]; // character formation
        opG_A_S = [d]; // combined string formation
        d_1._3_1.innerHTML = d; // UPDATE DevInfo
    } else {
        d_1._3_1.innerHTML += d;
    }
    opG_Cn[opG_Cn.length] = d.length; // current index

    _Ldx_s = ip.innerHTML.lastIndexOf("<span"); // index of memory index HTML DOM in string (reference first character [<])
    _Lx_str = ip.innerHTML.slice(_Ldx_s, ip.innerHTML.length);
    eqS += _Lx_str; // add the DOM HTML <span> of memory index
}

function opA_mem(m_L, s) { // convert an output numeral (answer) to memory index form (during a continuous equation/memory retrieval process)
    var nw_S = nwEL("SPAN"); // new span

    nw_S.classList.add("memDx"); // styling and title
    nw_S.innerHTML = m_L; 
    nw_S.title = "Memory " + m_L + ": " + memAns[m_L - 1];
    nw_S.dataset.dx = m_L;

    if (s) { // if continuous equations (replacing Display content)
        ip.innerHTML = "";
        ip.appendChild(nw_S); // clear display, add index, then add operator 
        ansOv_(null); // overflow check
    } else { // if conducting memory retrieval, just add to display
        ip.appendChild(nw_S);
    }
    eqMemI++; // increment
}

function rsZr(c, n) { // reset back to a character (zero - default, other - replacement)
    ip.innerHTML = c;
    opG_A_C = [ // update globals - add the 0
        [c]
    ];
    opG_A_S = [c];
    qS += c; // update equation

    DvT_1(c, false, 0, 0, false, null, op_B_p); // update devinfo
    d_1._3_1.innerHTML = c;
    if (n !== null) {
        bt_ED(n, false); // disable buttons: 0
        cL = true; // update status
    }
}