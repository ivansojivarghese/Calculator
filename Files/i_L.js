
// loadup

var bt = document.getElementsByClassName("btn"), // all buttons in class
    _Lbt = bt.length - 1,
    cb = document.getElementById("cb"), // screen
    cbT = document.getElementById("cbT"), // timer
    t = 3, // start time (sec.)
    t_L, // timer loop
    io_L; // input overflow detect loop

function cB_n() { // calibration timer
    cbT.innerHTML = t;
    if (t < 1) {
        clearInterval(t_L); // stop
        cb.style.display = "none"; // show calculator
        dV.style.display = "block"; // and devtools
    } else {
        t--; // continue
    }
}

window.addEventListener("load", function() {
    for (i = 0; i <= _Lbt; i++) {
        bt[i].setAttribute("data-n", i); // add reference indexes (data attributing) to all buttons
    }
    dV.style.display = "none"; // SET DEVTOOLS display to none, then block briefly after
    dTgg();  // reset DevTools - open, close
    dTgg();
    cL_C(0); // set display/back-end to '0' (default)
    t_L = setInterval(cB_n, 1000); // start timer (countdown) loop; 
    io_L = setInterval(io_Lp, 1000/60); // start input-overflow-detect loop
});

