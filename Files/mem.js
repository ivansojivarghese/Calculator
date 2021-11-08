
// memory

var m_Bdy = document.getElementById("mem"), // memory body
    mMc = document.getElementById("mem_C"),
    m_Tle = document.getElementById("dgB_m"), // memory button tile
    m_B_Tle = document.getElementById("mem_B_cls"), // memory close button tile
    
    memEq = [], // memory equations
    memAns = [], // memory answers
    memAnsN = []; // memory answers (normal)

m_B_Tle.addEventListener("click", function() {
    a_Nv("mem", false); // add click to tile page
});

function nwMem(a, e, aN) { // new entry to memory
    if (memAns.length === 0) { // if no entries have been recorded previously
        m_Tle.classList.remove("tleD");
        m_Tle.classList.add("tleA"); // enable tile
        m_Tle.addEventListener("click", function() {
            // mem_Bn(true);
            a_Nv("mem", true);
        }); // enable link to memory list (from calculator)
    }
    upMem(a, e, aN); // UPDATE memory data storage spaces (arrays)
    crMemEn(a, e); // CREATE new memory entry
}

function crMemEn(a, e) { // create memory entry
    var mE = nwEL("DIV"), // memory entry (tile)

        mX = nwEL("DIV"), // memory index
        mX_h = nwEL("H3"), // memory index h3

        mC = nwEL("DIV"), // memory content
        mC_h = nwEL("H3"), // memory content h3
        mC_hs = nwEL("SPAN"), // memory content h3 span
        mC_P_c = nwEL("DIV"), // memory content p container 
        mC_p1 = nwEL("P"), // memory content p 1

        mC_p1s = nwEL("SPAN"), // memory content p 1 span
        p_tS = 230, // memory content p span width threshold (230px, excluding 20px padding-left)
        mE_T = 122; // memory entry (tile) height (px)

    // adding respective (styling) classes
    mE.classList.add("mem_E"); // memory entry
    mE.classList.add("tle_E"); 
    mE.classList.add("mem_Df"); // default style
    mMc.appendChild(mE);

    mX.classList.add("idx"); // memory index
    mX.title = "Memory Index: " + memAns.length; 
    mX_h.innerHTML = memAns.length;
    mX.appendChild(mX_h); 
    mE.appendChild(mX);

    mE.dataset.mem = memAns.length;

    mC.classList.add("ct"); // memory content
    mC_hs.innerHTML = a; // memory content h3 span
    mC_h.appendChild(mC_hs); // memory content h3
    mC_h.title = a; // add respective tooltip titles
    mC_P_c.classList.add("pC"); // memory content p container
    mC_P_c.title = e;
    mC_p1s.innerHTML = e; // memory content p span

    mC_p1.appendChild(mC_p1s);
    mC_P_c.appendChild(mC_p1);
    mC.appendChild(mC_P_c);
    mC.appendChild(mC_h);
    mE.appendChild(mC);

    if (mem_Psp(mC_p1s, p_tS)) { // CREATE p span 2 only if [p span 1] has overflown
        var mC_p2 = nwEL("P"),
            mC_p2s = nwEL("SPAN"),
            _L = opG_A_S.length - 1,
            _R = "", 
            cd = true; // loop condition
        while (cd) { // LOOP THROUGH span 1 innerHTML (removing a single TOG from the end, until it fits within threshold)
            var str = opG_A_Sc[_L],
                s = e.lastIndexOf(str), // get start index of specified string
                sL = e.slice(0, s), // extract the entire equation (removed the TOG in focus)
                c_str = str.concat(_R); 
            mC_p1s.innerHTML = sL; // update p span 1 without a TOG
            mC_p2s.innerHTML = c_str; // Add the '_L' indexed TOGs to the p span 2 
            _R = c_str; // update base string
            if (mem_Psp(mC_p1s, p_tS)) { // if still overflowing
                _L--;
            } else {
                cd = false; // stop loop
            }
        }

        mC_p2.appendChild(mC_p2s); // add span to p
        mC_P_c.appendChild(mC_p2); // add p to p container 

        if (mem_Psp(mC_p2s, p_tS)) { // CHECK for any overflow on p span 2 as well
            mem_E_ov(mC_p2s, p_tS); // overflow (elipse additions)
        }
    }
    if (mem_Psp(mC_hs, p_tS)) { // if h3 ans overflow
        mem_E_ov(mC_hs, p_tS); // add ellipses
    }

    mMc.scrollTo(0, memAns.length * mE_T); // scroll to last (show most recent equations first)
}

function upMem(a, e, aN) { // UPDATE memory data storage spaces (arrays)
    memAns[memAns.length] = a;
    memEq[memEq.length] = e;
    memAnsN[memAnsN.length] = aN;
    
}

function mem_Psp(s, t) { // CHECK properties of memory p span width
    var bD = s.getBoundingClientRect(),
        bD_w = bD.width,
        rs = false;
    if (bD_w >= t) { // if width (span 1) greater than threshold
        rs = true; 
    }
    return rs;
}

function mem_E_ov(g, h) { // memory entry overflow (add elipses)
    var ab = true, // loop condition
        _Lb = g.innerHTML.length - 1,
        s_str = "",
        r_str = "";
    while (ab) { // loop while true (slicing out overflown charcters...)
        s_str = g.innerHTML.slice(0, _Lb); // slice out the string without the final character
        g.innerHTML = s_str; // interpolate with 1 less character
        if (mem_Psp(g, h)) { // if still overflowing
            _Lb--; // decrement: increase no. of character reductions
        } else {
            ab = false; // stop loop
        }
    }
    r_str = g.innerHTML.slice(0, g.innerHTML.length - 3); // add elipses to final 5 characters, after the slice
    g.innerHTML = r_str.concat("...");
}

function mem_E_fn(s) { // activate/deactive memory list
    var mem_Ec = document.getElementsByClassName("mem_E"),
        _L = memAns.length;
    if (_L) { // if some memory entries exist
        for (i = 0; i <= _L - 1; i++) {
            var cL = mem_Ec[i].classList.contains("mem_Df");
            if (s) {
                if (cL) { // if contains class/function
                    mem_Ec[i].classList.remove("mem_Df"); // enable click function
                    mem_Ec[i].addEventListener("click", mem_DsI); 
                    mem_Ec[i].removeEventListener("click", memL_ntf); // remove notification
                }
            } else {
                if (!cL) { // if does not contain class/function
                    mem_Ec[i].classList.add("mem_Df"); // disable click function
                    mem_Ec[i].removeEventListener("click", mem_DsI); 
                    mem_Ec[i].addEventListener("click", memL_ntf); // add notification
                }
            }
        }
    }
}

function memL_ntf() { // memory list (disabled) click notif
    var m = "Memory Sequence disabled",
        b = "Sequences can only added in the presence of a non-numeric character.";
    nw_Ntf(m, b, 1);
}

function mem_DsI() { // input numeral from memory basin to equation
    var m_Dx = this.dataset.mem, // get memory index
        _An = String(memAns[m_Dx - 1]), // get answer from memory (based off index) - string format
        _A = [13, 0, 2, 3, 7, 11, 15, 19, 1, 4, 5, 6, 8, 9, 10, 12, 13, 14, 16, 17, 18]; // button network arrangement
        // enable operators and percentage, disable others

    if (br_TOG) { // if brackets already active (open without closed)
        _A = [12, 0, 2, 3, 7, 11, 15, 19, 1, 4, 5, 6, 8, 9, 10, 12, 13, 14, 16, 17, 18];
        // enable same as above, additional brackets
    }  

    for (i = 0, j = 0, k = 0; i <= _An.length - 1; i++) { // loop through equation (to attain indv. characters - update opG_A_S and opG_A_C)
        var c = _An[i]; // character
        if (str_O(c)) { // check for operator (to divide by TOG)
            opG_A_C[opG_A_C.length - 1][j] = c; // character array
            opG_A_S[opG_A_S.length - 1] += c; // combined string array
            j++; // proceed to next array column
        } else { // if not operator
            if (j === 0) {
                opG_A_S[opG_A_S.length - 1] = ""; // default array column space to string type (if new, at j = 0)
            }
            opG_A_C[opG_A_C.length - 1][j] = c;
            opG_A_S[opG_A_S.length - 1] += c;
            j++;
        }
    }

    if (nm_DF || cL) { // enable memory list during CLEAR or answer output (equating)
        opA_mem(m_Dx, true); // create respective memory index to display
        df_DvIn(); // reset devInfo
    } else {
        opA_mem(m_Dx, false); 
    }

    up_OpgV(_An, false, m_Dx); // update opG globals to contain new numerals
    mem_E_fn(false); // disable memory list
    bt_ED_m(_A); // PERFORM button enabling/disabling

    cL = false;
    a_Nv("mem", false); // close memory screen
}