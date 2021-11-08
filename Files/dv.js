
// developer tools (back-end monitoring)

var dvB = document.getElementById("ic"), // icon button
    icC = document.getElementById("icCh"), // icon button logo
    dV = document.getElementById("dev"), // dev tools element (container)
    fR = document.getElementById("fr"), // calculator frame
    rM = cWid(document.body) - 1200,
    dCs = true; // dev tools closed?

function dTgg() { // toggle dev tools (open/close)
    if (dCs) { // if closed
        dvB.title = "Close DevInfo"; // change tooltip
        dV.style.transform = "none"; // reveal dev tools
        icC.innerHTML = "×"; // change button icon
        fR.style.marginLeft = rM + "px"; // shift calculator to left
        dCs = false; 
    } else { // if open
        dvB.title = "Open DevInfo";
        dV.style.transform = ""; // close dev tools
        icC.innerHTML = "<"; // change button icon
        fR.style.marginLeft = "calc((100vw - 390px) / 2)"; // shift calculator to original
        dCs = true; 
    }    
}

function cWid(el) { // return (client)width of element
    return el.clientWidth; 
}

dvB.addEventListener("click", dTgg);