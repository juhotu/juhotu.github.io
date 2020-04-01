function date() {
    let dateObj = new Date();
    let today = dateObj.getUTCDate();
    let difference = 24;
    difference = difference - today;
    document.getElementById("dateDiff").innerHTML = "ENÄÄ " + difference + " PÄIVÄÄ CLUTCHIIN";
}