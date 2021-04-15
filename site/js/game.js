function clean() {
    document.getElementById("field").innerHTML = '';
}

function start() {

    var colors = ['red', 'darkred', 'salmon', 'gold', 'tomato', 'orangered', 'orange', 'yellow', 'khaki', 'wheat', 'seagreen', 'silver', 'azure', 'white', 'pink', 'indigo', 'purple', 'magenta', 'blue', 'darkblue', 'cyan', 'olive', 'lime', 'aquamarine', 'skyblue']; //static Colors
    var colorNames = ['Red', 'Dark red', 'Salmon', 'Gold', 'Tomato', 'Orange red', 'Orange', 'Yellow', 'Khaki', 'Wheat', 'Sea green', 'Silver', 'Azure', 'White', 'Pink', 'Indigo', 'Purple', 'Magenta', 'Blue', 'Dark blue', 'Cyan', 'Olive', 'Lime', 'Aquamarine', 'Skyblue']; //static Names
    var boxesFilled = []; // all boxes/buttons used

    var colorsFinal = [];
    var namesFinal = [];

    click = true;

    var pairs = [];

    var used = []; // used colors&names

    document.getElementById("field").innerHTML = '';

    var n = document.getElementById("input").value;

    var opened = 0; // number of opened cells
    var openedArr = []; // oppened cells

    var regex=/^[a-zA-Z]+$/;
    var seq = [n*n];

    if (!n.match(regex)) 
    {
        if(n==2 || n==4 || n==6) { //2, 4, 6,
            for(var j = 0; j < n*n+1; j++)  //fill seq array with c/t parameter
            {
                var NorC = Math.floor(Math.random() * 2); // color or name

                var num = Math.floor(Math.random() * (n*n))+1;
                while(used[num] == true) {
                    num = Math.floor(Math.random() * (n*n))+1;
                }
                used[num] = true;

                while(boxesFilled[j] == true) {
                    j++;
                }
                if(j == n*n) {
                    break;
                }

                if(NorC == 1) {
                    seq[j] = true; // Color
                    colorsFinal[j] = colors[num];
                }
                else {
                    seq[j] = false; // Text
                    namesFinal[j] = colorNames[num];
                }
                boxesFilled[j] = true;

                var rand = Math.floor(Math.random() * (n*n));

                while(rand == j || boxesFilled[rand] == true) {
                    rand = Math.floor(Math.random() * (n*n));
                }

                boxesFilled[rand] = true;
                seq[rand] = !seq[j];
                if(seq[rand] == true) {
                    colorsFinal[rand] = colors[num];
                }
                else {
                    namesFinal[rand] = colorNames[num];
                }

                pairs[j] = rand;
            }

            console.log(seq);
            console.log(pairs);
            console.log(colorsFinal)
            console.log(namesFinal)

            var field = document.getElementById("field");
            field.style.cssText = `grid-template-rows: repeat(${n}, 100px); grid-template-columns: repeat(${n}, 100px);` 
            document.getElementById("error").textContent = " ";

            for (i = 0; i < n*n; i++) { //add boxes (frontend)
                var element = document.createElement("BUTTON");
                element.innerHTML = '';

                element.id = i;

                element.onclick = buttonClick;

                element.style.cssText = "margin: 1vh; outline: none; border: none; border-radius: 1vh;"

                /*if(seq[i] == true) 
                {
                    element.style.backgroundColor = colorsFinal[i];
                }
                else
                {
                    element.textContent = namesFinal[i];
                    element.style.color = "black";
                }*/

                element.style.backgroundColor = "black";
                element.textContent = "";

                document.getElementById("field").appendChild(element);
            }
        }
        else 
        {
            document.getElementById("error").textContent = "You can use only given numbers.";
        }
    }
    else 
    {
        document.getElementById("error").textContent = "Input  is not a number.";
    }


    function buttonClick() {
        if(click == true) {
            if(document.getElementById(this.id).style.backgroundColor == "black" && document.getElementById(this.id).textContent == "") {
                if(opened <= 1) 
                {
                    if(seq[this.id] == true) // COLOR
                    {
                        document.getElementById(this.id).style.backgroundColor = colorsFinal[this.id];
                    }
                    else  // TEXT
                    {
                        document.getElementById(this.id).textContent = namesFinal[this.id];
                        document.getElementById(this.id).style.textAlign = "center";
                        document.getElementById(this.id).style.fontSize = "small";
                    }
                    openedArr[opened] = this.id;

                    if(opened == 1) {
                        click = false;
                    
                        opened = 0;
                        console.log(pairs.indexOf(openedArr[0]))
                        console.log(openedArr)
                        if(pairs[openedArr[0]] == openedArr[1] || pairs.indexOf(parseInt(openedArr[0])) == openedArr[1] ) 
                        {
                            console.log("pair")
                            click = true;
                        }
                        else
                        {
                            setTimeout(function(){ // hide after 1000 milsecs
                                openedArr.forEach(element => {
                                    document.getElementById(element).style.backgroundColor = "black";
                                    document.getElementById(element).textContent = "";
                                    click = true;
                                });
                            }, 1000);
                        }
                    }
                    else 
                    {
                        opened++;
                    }

                }
            return false;
            }
        }
    }

}
