let movies = [
    "limelight",
    "aliens",
    "maleficent",
    "jumanji",
    "frozen",
    "Brave",
    "gravity",
    "skyfall",
    "batman",
    "madagascar",
    "minions",
    "twilight",
    "inception",
    "titanic",
    "transformers",
    "avater",
    "tarzan",
    "godzilla",
    "terminator",
];
let images=[
    "./image/0.jpg",
    "./image/1.jpg",
    "./image/2.jpg",
    "./image/3.jpg",
    "./image/4.jpg",
    "./image/5.jpg",
    "./image/6.jpg",
];
function randomMovieName()
{
    let index = Math.floor(Math.random() * movies.length);
    return movies[index].toUpperCase();
}

function generateButton()
{
    let letters=[];
    let c=65;
    for(let i=1;i<=26;i++){
        let a = String.fromCharCode(c); 
        c++;
        letters.push(a);
        
    }
    let Allbtn = letters.map((letter)=>
        `<button class="btn btn-lg btn-info m-2" id='`+letter+`'>`+letter+`</button>`
    ).join('');
    document.getElementById('alphabet').innerHTML=Allbtn;
}
let movie  = randomMovieName();
let mistakes = document.getElementById('mistake-count');
let GuessWord = document.getElementById('guess-word');
let title  = document.getElementById('title');
title.style.fontSize="2em";
let currentWord;
let mistakeCount = 6;
let imageIndex=0;
let count=0;
mistakes.innerHTML=6;
//let isDone = new Map();

function replaceChar(origString, replaceChar, index) {

    let newStringArray = origString.split("");
    newStringArray[index] = replaceChar;
    let newString = newStringArray.join("");
    return newString;
}
// function frequencyCount()
// {
    
//     for(let i=0;i<movie.length;i++) {
//         isDone.set(movie.charAt(i),true);
//     }
    
// }
function setButton(value)
{
    let x=65;
    for(let i=1;i<=26;i++){
        let letter = String.fromCharCode(x); 
        x++;
        document.getElementById(letter).disabled=value;
    }
}
function play(letter)
{
    //current = GuessWord.innerHTML;
    let letterPosition=[];
    let isFound = false;
    for(var i=0;i<movie.length;i++) {
        if(movie.charAt(i)==letter && currentWord.charAt(i)=='-'){
            letterPosition.push(i);
            isFound=true;
            
        }
    }
    if(isFound==false){

        document.getElementById(letter).disabled=true;
        if(mistakeCount==1){
            mistakes.innerHTML=0;
            document.getElementById('image').src = images[images.length-1];
            GuessWord.innerHTML=movie;
            GuessWord.style.color="red";
            title.innerHTML="Game Over!";
            title.style.color="red";
            setButton(true);
            return;
        }
        if(mistakeCount>0){
            mistakeCount--;
            document.getElementById('image').src = images[++imageIndex];
            mistakes.innerHTML=mistakeCount;
        }
       
    
    }
    else{
        
        for(var pos of letterPosition) {
            currentWord  = replaceChar(currentWord,letter,pos);
        }
        
        document.getElementById(letter).disabled=true;
        
        GuessWord.innerHTML=currentWord; 
        //count++

        if(currentWord==movie){
            title.innerHTML="Win!";
            title.style.color="Green"
            setButton(true);
        }
        //console.log(current);
       
    }
   
}
function resetGame()
{
    movie = randomMovieName();
    document.getElementById('image').src = images[0];
    mistakeCount = 6;
    mistakes.innerHTML=mistakeCount;
    imageIndex=0;
    title.innerHTML="Guess the movie name:"
    title.style.color="black";
    GuessWord.style.color="black";
    count=0;
    setButton(false);
    setup();
    
}
function setup()
{
    console.log(movie);
    currentWord="";
    let len=0;
    while(len!=movie.length){
        currentWord+='-';
        len++;
    }
    GuessWord.innerHTML=currentWord;
    GuessWord.style.fontSize="4em";

}
function addBtnEvent()
{
    let x=65;
    for(let i=1;i<=26;i++){
        let letter = String.fromCharCode(x); 
        x++;
        document.getElementById(letter).addEventListener("click",()=>{play(letter)},false);
    }
    document.getElementById('reset').addEventListener("click",()=>{resetGame()});
}

generateButton();
addBtnEvent();
setup();


