let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

var level = 0;
var started = false;

function HeaderText(){
  $("#level-title").text("Your Level is " + level);
}

function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.round(Math.random() * 3); //generate random number
  var randomChosenColour = buttonColours[randomNumber]; // use random # to find color at
                                                          // that index & store in var
  gamePattern.push(randomChosenColour); //store that color in array
  $("#" + randomChosenColour).fadeOut(80).fadeIn(80).fadeOut(80).fadeIn(80); //flash button
  playSound(randomChosenColour); //play sound assoc with random button
}

function increaseLevel(){
  level++; //change the level
  HeaderText(); //display the new level
}

function playSound(name){
  var newAudio = "sounds/" + name + ".mp3";
  $( "#audio" ).attr( "src", newAudio );
  $('audio#audio')[0].play();

  // var audio = new Audio("sounds/" + name + ".mp3");
  // audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");   //adds pressed class!!
  setTimeout(function(){                        // removes press class after 50ms
    $("#" + currentColour).removeClass("pressed");
  },100);

}

function checkAnswer(currentLevel, userColour){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel] ){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence();
        increaseLevel();
      },1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key To Restart")
    startOver();
  }

}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;

}


$(document).on("keypress", function(){
  if (!started){
    level++;
    nextSequence();
    HeaderText();
    started = true;
  } else {
    alert("You already pressed a key")
  }
})



$(document).on('click', '.btn', function(){
  var userChosenColour = $(this).attr('id'); //id of button clicked
  userClickedPattern.push(userChosenColour); // store button click in array
  var indexOfLastClick = userClickedPattern.lastIndexOf(userChosenColour);
  playSound(userChosenColour); //play sound of button color
  animatePress(userChosenColour); //animate button pressed

  checkAnswer(indexOfLastClick, userChosenColour);

  console.log("id = " + userChosenColour);
  console.log("Clicked pattern: " + userClickedPattern);
  console.log("game pattern: "+ gamePattern);
  console.log("index is: " + indexOfLastClick);


});
