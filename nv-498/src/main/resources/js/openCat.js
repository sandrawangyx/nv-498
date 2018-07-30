function openCat(evt, catName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(catName).style.display = "block";
    evt.currentTarget.className += " active";

    //dynamically add div
    var outterDiv= document.getElementById(catName);
    var innerDiv = document.createElement('div');
innerDiv.className = "inner-bar-container";
innerDiv.setAttribute('data-profile','CSV/canPopulationByProvince.csv');
outterDiv.appendChild(innerDiv);
//document.body.appendChild(outterDiv);
var innerSvg = document.createElement('svg');
innerSvg.id="svg2";
innerDiv.appendChild(innerSvg);
}