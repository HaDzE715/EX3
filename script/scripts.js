    
    
    
    let numShorot = 7;
    let flag = true;
    
    /* a function that stops code execution for a given number of seconds */
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms * 1000));
    }
    
    function makeSquare() {
        squr = document.createElement('div'); 
        squr.setAttribute('class', 'square'); 
        const randomColor = Math.floor(Math.random() * 16777215).toString(16); /* generate a random color */
        squr.style.backgroundColor = '#' + randomColor; 
        squr.style.opacity = '0.3'; 
        squr.addEventListener('mouseover', function () { if (flag) { this.style.opacity = '1' } }); 
        squr.addEventListener('mouseout', function () { if (flag) { this.style.opacity = '0.3' } });
        return squr;
    }
    
    function makeShora() {
        shora = document.createElement('div');
        shora.setAttribute('class', 'shora');
        for (var i = 0; i < 4; i++) { /* Adds four squares to one line */
            shora.appendChild(makeSquare()); /* puts the div#square in the shora element */
        }
        return shora;
    }
    
    async function lightSqursUp() {
        if(!flag){
            return;
        }
        flag = false; /* don't interrupt me while i'm lighting */
        randNum = Math.floor(Math.random() * numShorot); /* returns a random number in [0, numShorot] */
        shoraToLight = document.querySelectorAll('.shora')[randNum]; /* get the random shora to light */
        shoraSqurs = shoraToLight.querySelectorAll('.square'); /* get array of all the childs squares of the shora to light */
        originalSqursClrs = [];
        colorsToLight = ['#000000', '#FFFFFF'];
        for (var i = 0; i < 5; i++) { /* number of times to light */
            for (var j = 0; j < 4; j++) {
                if (i == 0) { /* save their original colors to go back to them */
                    originalSqursClrs.push(shoraSqurs[j].style.backgroundColor);
                }
                if (i == 4) {
                    shoraSqurs[j].style.backgroundColor = originalSqursClrs[j]; /* its the last loop, back to original color */
                    await sleep(0.1); /* stop for 0.1 second */
                }
                else {
                    shoraSqurs[j].style.backgroundColor = colorsToLight[i % 2]; /* change color */
                    await sleep(0.1);
                }
            }
        }
        flag = true; /* now you can interrupt */
    }
    
    window.onload = function () {
        let shorotContainer = document.getElementsByTagName('main')[0]; 
        for (var i = 0; i < numShorot; i++) {
            shorotContainer.appendChild(makeShora());
        };
        document.querySelector('#plus').addEventListener('click', lightSqursUp);
    }