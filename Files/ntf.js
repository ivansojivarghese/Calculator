
// notifications

var n_Bdy = document.getElementById("ntf"), // notif body
    n_Mb = document.getElementById("ntf_M"), // notif quick view bar
    n_Mbc = document.getElementById("ntf_Mc"), // notif quick view bar color rep
    n_Mbp = document.getElementById("ntf_Mpt"), // notif quick view bar p text
    n_Tle = document.getElementById("dgB_n"), // notif button tile
    n_H = document.getElementById("dgB_nH"), // notif button tile h1
    n_B_Tle = document.getElementById("ntf_B_cls"), // notif close button tile
    n_Tle_C = document.getElementById("ntf_C"), // notif tile content body
    n_Zm = document.getElementById("ntf_zM"), // notif zero notif message

    ntf_Dis = false, // ntf display status (to prevent multiple recurrences)
    ntf_n = 0, // number of activated notifs
    ntf_T = 132; // height of each notif


n_Tle.addEventListener("click", function() {
    a_Nv("ntf", true); // add click to tile page (close)
});

n_B_Tle.addEventListener("click", function() {
    a_Nv("ntf", false); // add click to tile page (close)
});


function nw_Ntf(m, b, p) { // new notication
    var cL = nM_sh(m, p); // show/hide message
    if (ntf_n === 0) {
        n_Zm.remove(); // remove text
    }
    if (!ntf_Dis) { // prevent recurrence if currently being shown to user
        // ntf_Dis = true;
        crNtfEn(cL, p, m, b); // create ntf entry
        ntf_Dis = true;
        setTimeout(function() {
            nM_Ic(); // UX - increment notif no. and tile scale animation
            ntf_Dis = false; // set condition to prevent multiple recurrences
        }, 3300); /*message view time + transition to hide time*/
    }
}

function crNtfEn(c, p, m, b) { // create a ntf entry into ntf view
    var nE = nwEL("DIV"), // notif entry
        nE_d = nwEL("DIV"), // notif entry index (placement for time/priority)
        nE_dC = nwEL("DIV"), // notif entry index (colour - priority)
        nE_dT = nwEL("DIV"), // notif entry index (time)
        nE_dTp = nwEL("P"), // notif entry index (time) - p
        nE_dCd = nwEL("DIV"), // notif entry index (colour) - div

        nE_c = nwEL("DIV"), // notif entry content
        nE_cM = nwEL("DIV"), // notif entry content message title
        nE_cB = nwEL("DIV"), // notif entry content message blurb
        nE_cMp = nwEL("P"), // notif entry content message title p
        nE_cBp = nwEL("P"), // notif entry content message blurb p 

        t = tme(); // return time

    nE.classList.add("tle_E");
    nE_d.classList.add("idx");
    nE_dC.classList.add("ntf_Ec_C");
    nE_dT.classList.add("ntf_Ec_T");
    nE_dCd.classList.add("pr_Clr");

    nE_c.classList.add("ct");
    nE_cM.classList.add("ntf_Ec_M");
    nE_cB.classList.add("ntf_Ec_Mb"); 
    nE_cM.title = m;
    nE_cB.title = b;

    nE_dTp.innerHTML = t; // add time
    nE_dCd.style.backgroundColor = c;
    nE_dCd.title = "Priority Level: " + p; // add priority level
    nE_cMp.innerHTML = m; // add message
    nE_cBp.innerHTML = b; // add blurb

    nE_dT.appendChild(nE_dTp);
    nE_dC.appendChild(nE_dCd);
    nE_cM.appendChild(nE_cMp);
    nE_cB.appendChild(nE_cBp);
    nE_d.appendChild(nE_dT);
    nE_d.appendChild(nE_dC);
    nE_c.appendChild(nE_cM);
    nE_c.appendChild(nE_cB);
    nE.appendChild(nE_d);
    nE.appendChild(nE_c);
    n_Tle_C.appendChild(nE);

    n_Tle_C.scrollTo(0, ntf_T * ntf_n); // scroll to bottom of list
}

function nM_Ic() { // UX - increment ntf tile no. of notifs
    ntf_n++;
    n_H.innerHTML = ntf_n < 10 ? ntf_n : "9+"; // increment and update no. (DON'T UPDATE AFTER 9 notifs)
    n_Tle.style.transform = "scale(1.1)"; // apply a 'scaling' effect on tile button as well
    setTimeout(function() {
        n_Tle.style.transform = "";
    }, 150);
}

function nM_sh(m, p) { // show/hide ntf message bar
    var c_Hx; // color rep hex code
    switch (p) {
        case 1:
            c_Hx = "#009ACD"; // Level 1 - blue
        break;
        case 2:
            c_Hx = "#E08641"; // Level 2 - orange
        break;
        case 3:
            c_Hx = "#BF263C"; // Level 3 - red
        break;
        default:
            c_Hx = "#1C1C1C"; // default - black
        break;
    }
    n_Mbc.style.backgroundColor = c_Hx;
    n_Mbp.innerHTML = "Level " + p + ": " + m;
    if (!ntf_Dis) {
        n_Mb.style.transform = "translateX(-50%)"; // show in view
    }
    setTimeout(function() {
        n_Mb.style.transform = "translateX(-50%) translateY(-100px)"; // hide in view
    }, 3000); // after 3 sec.
    return c_Hx; // return hex colour
}