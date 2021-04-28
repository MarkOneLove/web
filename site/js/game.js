var totalSeconds = 0;
var count = true;
var playing = false;

function clean() {
    document.getElementById("field").innerHTML = '';
    document.getElementById("result").textContent = "";
    document.getElementById("minutes").innerHTML = "00";
    document.getElementById("seconds").innerHTML = "00";
    totalSeconds = 0;
    count = false;
    playing = false;
}

function start() {
    if(playing == false)
    {
        playing = true;
        count = true;
        var minutesLabel = document.getElementById("minutes");
        var secondsLabel = document.getElementById("seconds");
        var totalSeconds = 0;

        function setTime()
        {   
            if(count) 
            {
                ++totalSeconds;
                secondsLabel.innerHTML = pad(totalSeconds%60);
                minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
            }
            else {
                clearInterval(refreshIntervalId);
            }
        }

        function pad(val)
        {
            var valString = val + "";
            if(valString.length < 2)
            {
                return "0" + valString;
            }
            else
            {
                return valString;
            }
        }

        var colors = ['red', 'darkred', 'salmon', 'gold', 'tomato', 'orangered', 'orange', 'yellow', 'khaki', 'wheat', 'seagreen', 'silver', 'azure', 'white', 'pink', 'indigo', 'purple', 'magenta', 'blue', 'darkblue', 'cyan', 'olive', 'lime', 'aquamarine', 'skyblue']; //static Colors
        var colorNames = ['Red', 'Dark red', 'Salmon', 'Gold', 'Tomato', 'Orange red', 'Orange', 'Yellow', 'Khaki', 'Wheat', 'Sea green', 'Silver', 'Azure', 'White', 'Pink', 'Indigo', 'Purple', 'Magenta', 'Blue', 'Dark blue', 'Cyan', 'Olive', 'Lime', 'Aqua marine', 'Skyblue']; //static Names
        var boxesFilled = []; // all boxes/buttons used

        var colorsFinal = [];
        var namesFinal = [];

        var click = true;

        var matches = 0;

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
                var refreshIntervalId = setInterval(setTime, 1000);
                for(var j = 0; j < n*n+1; j++)  //fill seq array with c/t parameter
                {
                    var NorC = Math.floor(Math.random() * 2); // color or name

                    var num = Math.floor(Math.random() * colors.length);
                    while(used[num] == true) {
                        num = Math.floor(Math.random() * colors.length);
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

                //console.log(seq);
                //console.log(pairs);
                //console.log(colorsFinal)
                //console.log(namesFinal)

                //console.log(used)
                //console.log(boxesFilled)

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
                        openedArr[opened] = this.id; 
                        if(seq[this.id] == true) // COLOR
                        {
                            document.getElementById(this.id).style.backgroundColor = colorsFinal[this.id];
                        }
                        else  // TEXT
                        {
                            document.getElementById(this.id).textContent = namesFinal[this.id];
                            document.getElementById(this.id).style.textAlign = "center";
                            document.getElementById(this.id).style.fontSize = "small";
                            document.getElementById(this.id).style.backgroundColor = "DarkGrey";
                        }
                        if(opened == 1) {
                            click = false;
                            opened = 0;
                            if(pairs[openedArr[0]] == openedArr[1] || pairs.indexOf(parseInt(openedArr[0])) == openedArr[1] ) 
                            {
                                matches++;
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
                }
                if(matches == n*n/2) {
                    document.getElementById("result").textContent = "Game over. Your time:";
                    totalSeconds = 0;
                    clearInterval(refreshIntervalId);
                }
            }
            return false;
        }
    }
    else
    {
        
    }
}
