let error = document.getElementById("errorbox")
let p1Score = document.getElementById("p1score");
let p2Score = document.getElementById("p2score");

let feedback = document.getElementById("feedbackmsg");

let turnicon = document.getElementById("turnicon")
let turnmsg = document.getElementById("turnmsg")

let score1 = 0
let score2 = 0

let turn = 1
let gameOver = false
let delay = 1500

x_imgs = new Set()
o_imgs = new Set()

const winConditions = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9]
]

const feedbacks = 
[
    "BRAVO",
    "Nice one",
    "well done",
    "keep trying",
    "good work",
    "what a move",
    "well played"
]

function initBody() {

}

function displayIcon(i) {
    var id = "img" + i.toString()
    var img = document.getElementById(id)

    if (img.src !== "file:///C:/Shobhit/HTML/index.html" && !gameOver) {
        errorbox.style.display = "block";
        errorbox.innerHTML = "This box is already filled"
        setTimeout(() => {
        errorbox.style.display = "none";

            
        },1500);
        return
    }

    if (turn % 2 === 0) {
        img.src = "o-icon.png"
        turnicon.style.background = "url('x-icon.png')"
        turnmsg.innerHTML = "Player 1's Turn"
    }
    else if (turn % 2 !== 0) {
        img.src = "x-icon.png"
        turnicon.style.background = "url('o-icon.png')"
        turnmsg.innerHTML = "Player 2's Turn"
    }

    makeArray()
    console.log(x_imgs)
    console.log(o_imgs)


    checkXWinner()
    checkOWinner()

    turn++  

    feedback.innerHTML = feedbacks[Math.floor(Math.random() * 7)]

    if (turn === 10 && !gameOver)
        makeDelay("Game Over !");

    console.log(turn)
}

function makeArray() {
    for (var i = 1; i < 10; i++) {
        var id = "img" + i.toString()
        var img = document.getElementById(id)
        if (img.src === "file:///C:/Shobhit/HTML/o-icon.png") {
            o_imgs.add(i)
        }
        else if (img.src === "file:///C:/Shobhit/HTML/x-icon.png") {
            x_imgs.add(i)

        }
    }
}

function checkXWinner() {

    for (var i = 0; i < winConditions.length; i++) {
        var allContains = true;

        winConditions[i].forEach(function (element) {
            if (!x_imgs.has(element))
                allContains = false;
        });

        if (allContains === true) {
            makeDelay("Player 1 Wins !", 500);
            score1++;
            p1Score.innerHTML = score1.toString();
        }
    }

}

function checkOWinner() {
    for (var i = 0; i < winConditions.length; i++) {
        var allContains = true;

        winConditions[i].forEach(function (element) {
            if (!o_imgs.has(element))
                allContains = false;
        });

        if (allContains === true) {
            makeDelay("Player 2 Wins !", 500);
            score2++;
            p2Score.innerHTML =score2.toString();
        }


    }

}


function makeDelay(msg, delay = 1500) {

    setTimeout(function () {
        feedback.innerHTML = msg.toString();
        gameOver = true
        reset()
        return
    }
        , delay)

}

function reset()
{
    for(var i = 1; i < 10; i++)
    {
        var id = "img" + i.toString()
        var img = document.getElementById(id)

        img.src = ""
        turn = 1
        turnicon.style.background = "url('x-icon.png')"
        turnmsg.innerHTML = "Player 1's Turn"
        gameOver = false

        x_imgs.clear()
        o_imgs.clear()
    }
    
}