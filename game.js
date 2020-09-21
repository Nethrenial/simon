var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$('.btn').click(function() {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);


  playSound(userChosenColour);
  animatePress(userChosenColour);


  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  level++;
  $('#level-title').text("Level " + level);

}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {
  $('#' + currentColour).addClass("pressed");
  setTimeout(function() {
    $('#' + currentColour).removeClass("pressed");
  }, 100);
}


$(document).keypress(function() {

  if (!started) {

    $('#level-title').text("Level " + level);
    nextSequence();
    started = true;
  }
});
$(document).click(function() {

  if (!started) {

    $('#level-title').text("Level " + level);
    nextSequence();
    started = true;
  }
});




function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("Success");
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {

    var audio2 = new Audio("sounds/wrong.mp3");
    audio2.play();
    $("body").addClass("gameover");
    setTimeout(function() {
      $("body").removeClass("gameover");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();



  }
}
 function startOver(){
   level = 0;
   gamePattern = [];
   started = false;
 }
