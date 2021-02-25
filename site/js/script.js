function clean() {
    document.getElementById("field").innerHTML = '';
}

function start() {
    document.getElementById("field").innerHTML = '';

    var n = document.getElementById("input").value;
    var regex=/^[a-zA-Z]+$/;
    console.log(n);
    if (!n.match(regex)) 
    {
        var field = document.getElementById("field");
        field.style.cssText = `grid-template-rows: repeat(${n}, 100px); grid-template-columns: repeat(${n}, 100px);` 
        document.getElementById("error").textContent = " ";

        for (i = 0; i < n*n; i++) {
            var element = document.createElement("BUTTON");
            element.innerHTML = i + 1;
            element.style.cssText = "color: rgb(149, 56, 255); margin: 1vh; background-color: rgb(255, 255, 255); outline: none; border: rgb(149, 56, 255) solid 2px; border-radius: 1vh;"
            document.getElementById("field").appendChild(element);
        }
    }
    else 
    {
        document.getElementById("error").textContent = "Input  is not a number.";
    }
}