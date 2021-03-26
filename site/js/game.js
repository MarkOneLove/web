function clean() {
    document.getElementById("field").innerHTML = '';
}

function start() {

    var colors = ['red', 'darkred', 'salmon', 'gold', 'tomato', 'orangered', 'orange', 'yellow', 'khaki', 'wheat', 'black', 'silver', 'azure', 'white', 'pink', 'indigo', 'purple', 'magenta', 'blue', 'darkblue', 'cyan', 'olive', 'lime', 'aquamarine', 'skyblue'];
    var boxesFilled = [];

    document.getElementById("field").innerHTML = '';

    var n = document.getElementById("input").value;
    var regex=/^[a-zA-Z]+$/;
    console.log(n);
    if (!n.match(regex)) 
    {
        if(n>=2 && n<=5) {
            var field = document.getElementById("field");
            field.style.cssText = `grid-template-rows: repeat(${n}, 100px); grid-template-columns: repeat(${n}, 100px);` 
            document.getElementById("error").textContent = " ";

            for (i = 0; i < n*n; i++) {
                var element = document.createElement("BUTTON");
                element.innerHTML = '';
                console.log(colors[i]);
                element.style.cssText = "margin: 1vh; outline: none; border: none; border-radius: 1vh;"
                var rand = Math.floor(Math.random() * 25)+1;
                console.log(boxesFilled[rand])
                element.style.backgroundColor = colors[rand];
                if(boxesFilled[rand] == undefined && boxesFilled[rand] == false) {
                    element.style.backgroundColor = colors[rand];
                    boxesFilled[rand] = true;
                    console.log("sd")
                } 

                document.getElementById("field").appendChild(element);
            }
        }
        else 
        {
            document.getElementById("error").textContent = "Number can not be less than 2 and should not be more than 5.";
        }
    }
    else 
    {
        document.getElementById("error").textContent = "Input  is not a number.";
    }
}