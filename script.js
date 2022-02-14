let shotSound=document.getElementById("shotSound");
let explosionSound=document.getElementById("explosionSound");
let music=document.getElementById("music");
let gameOverSound=document.getElementById("gameOverSound");
let friendLostSound=document.getElementById("friendLostSound");
let friendSavedSound=document.getElementById("friendSavedSound");
music.addEventListener("ended", function(){ music.currentTime = 0; music.play(); }, false);
music.play();


function start() {
  $("#start-screen").hide();

  $("#background").append("<div id='player' class='anima1'></div>");
  $("#background").append("<div id='enemy1' class='anima1'></div>");
  $("#background").append("<div id='enemy2'></div>");
  $("#background").append("<div id='friend' class='anima3'></div>");
  $("#background").append("<div id='scoreboard'></div>");
  $("#background").append("<div id='energy'></div>");
  let game = {};
  let gameOver = false;
  let points=0;
  let savedFriends=0;
  let lostFriends=0;
  let playerEnergy = 3;
  
  
  game.timer = setInterval(loop, 30);
  function loop() {
    backgroundMovement();
    playerMovement();
    heliEnemyMovement();
    truckMovement();
    friendMovement();
    collisions();
    showScoreboard();
    energyControl();
  }
  function backgroundMovement() {
    left = parseInt($("#background").css("background-position"));
    $("#background").css("background-position", left - 10);
  }
  const KEY = {
    W: 87,
    S: 83,
    D: 68
  }

  game.pressed = [];

  $(document).keydown(function (e) {
    game.pressed[e.which] = true;
  });


  $(document).keyup(function (e) {
    game.pressed[e.which] = false;
  });

  function playerMovement() {

    if (game.pressed[KEY.W]) {

      let top = parseInt($("#player").css("top"));
      $("#player").css("top", top - 10);
      if (top <= 0) {

        $("#player").css("top", top + 10);
      }

    }

    if (game.pressed[KEY.S]) {

      let top = parseInt($("#player").css("top"));
      $("#player").css("top", top + 10);
      if (top >= 434) {
        $("#player").css("top", top - 10);

      }
    }

    if (game.pressed[KEY.D]) {
      apacheShot();

    }


  }
  let speed = 5;
  let yAxisPosition = parseInt(Math.random() * 334);
  function heliEnemyMovement() {

    xAxisPosition = parseInt($("#enemy1").css("left"));
    $("#enemy1").css("left", xAxisPosition - speed);
    $("#enemy1").css("top", yAxisPosition);

    if (xAxisPosition <= 0) {
      yAxisPosition = parseInt(Math.random() * 334);
      $("#enemy1").css("left", 694);
      $("#enemy1").css("top", yAxisPosition);

    }
    
  }

  function truckMovement() {
    xAxisPosition = parseInt($("#enemy2").css("left"));
    $("#enemy2").css("left", xAxisPosition - speed);

    if (xAxisPosition <= 0) {

      $("#enemy2").css("left", 775);

    }
    
  }
  function friendMovement() {
    xAxisPosition = parseInt($("#friend").css("left"));
    $("#friend").css("left", xAxisPosition + 1);

    if (xAxisPosition > 906) {

      $("#friend").css("left", 0);

    }
  }
  let shotPermission = true;
  function apacheShot() {
    
    if (shotPermission == true) {
      shotSound.play()
      shotPermission = false;

      let top = parseInt($("#player").css("top"))
      xAxisPosition = parseInt($("#player").css("left"))
      xAxisShot = xAxisPosition + 190;
      shotTop = top + 37;
      $("#background").append("<div id='shot'></div");
      $("#shot").css("top", shotTop);
      $("#shot").css("left", xAxisShot);

      shotTime = window.setInterval(executeShot, 30);

    }

    function executeShot() {
      xAxisPosition = parseInt($("#shot").css("left"));
      $("#shot").css("left", xAxisPosition + 20);

      if (xAxisPosition > 900) {

        window.clearInterval(shotTime);
        shotTime = null;
        $("#shot").remove();
        shotPermission = true;

      }
    }
  }

  function collisions() {
    let collision1 = ($('#player').collision($('#enemy1')));
    let collision2 = ($("#player").collision($("#enemy2")));
    let collision3 = ($("#shot").collision($("#enemy1")));
    let collision4 = ($("#shot").collision($("#enemy2")));
    let collision5 = ($("#player").collision($("#friend")));
    let collision6 = ($("#enemy2").collision($("#friend")));
    if (collision1.length > 0) {
      explosionSound.play()
      playerEnergy --;
      enemy1 = parseInt($("#enemy1").css("left"));
      enemy1YAxis = parseInt($("#enemy1").css("top"));
      explosion1(enemy1, enemy1YAxis);

      yAxisPosition = parseInt(Math.random() * 334);
      $("#enemy1").css("left", 694);
      $("#enemy1").css("top", yAxisPosition);
    }
    if (collision2.length > 0) {
      explosionSound.play()
      playerEnergy --
      enemy2Xmain = parseInt($("#enemy2").css("left"));
      enemy2Ymain = parseInt($("#enemy2").css("top"));
      explosion2(enemy2Xmain, enemy2Ymain);
  
      $("#enemy2").remove();
  
      enemy2Respawn();
      
    }
    if (collision3.length>0) {
      explosionSound.play()
      points+=100;
      speed+=1
      enemy1XAxis = parseInt($("#enemy1").css("left"));
      enemy1YAxis = parseInt($("#enemy1").css("top"));
        
      explosion1(enemy1XAxis,enemy1YAxis);
      $("#shot").css("left",950);
        
      yAxisPosition = parseInt(Math.random() * 334);
      $("#enemy1").css("left",694);
      $("#enemy1").css("top",yAxisPosition);
        
      }
      if (collision4.length>0) {
        explosionSound.play()
      points+=50;
        enemy2XAxis = parseInt($("#enemy2").css("left"));
        enemy2YAxis = parseInt($("#enemy2").css("top"));
        $("#enemy2").remove();
      
        explosion2(enemy2XAxis,enemy2YAxis);
        $("#shot").css("left",950);
        
        enemy2Respawn();
          
        }
  
    if (collision5.length > 0) {
      friendSavedSound.play()
      savedFriends++
      friendRespawn();
      $("#friend").remove();
    }
    if (collision6.length>0) {
      friendLostSound.play();
	    lostFriends++
      friendXAxis = parseInt($("#friend").css("left"));
      friendYAxis = parseInt($("#friend").css("top"));
      console.log('friend',friendXAxis,friendYAxis)
      explosion3(friendXAxis,friendYAxis);
      $("#friend").remove();
          
      friendRespawn();
          
      }

  }
  function explosion1(enemy1XAxis, enemy1YAxis) {
    $("#background").append("<div id='explosion1'></div");
    $("#explosion1").css("background-image", "url(imgs/explosao.png)");
    let div = $("#explosion1");
    div.css("top", enemy1YAxis);
    div.css("left", enemy1XAxis);
    div.animate({ width: 200, opacity: 0 }, "slow");

    let explosionTime = window.setInterval(removeExplosion, 1000);

    function removeExplosion() {

      div.remove();
      window.clearInterval(explosionTime);
      explosionTime = null;

    }

  }
  
  function enemy2Respawn() {

    let collisionTime4 = window.setInterval(respawn4, 5000); //reposiciona4

    function respawn4() {
      window.clearInterval(collisionTime4);
      collisionTime4 = null;

      if (gameOver == false) {

        $("#background").append("<div id='enemy2'></div");

      }

    }
  }
  

  function explosion2(enemy2Y, enemy2Y) {
    
    $("#background").append("<div id='explosion2'></div");
    $("#explosion2").css("background-image", "url(imgs/explosao.png)");
    let div2 = $("#explosion2");
    div2.css("top", enemy2Y);
    div2.css("left", enemy2Y);
    div2.animate({ width: 200, opacity: 0 }, "slow");

    let explosionTime2 = window.setInterval(removeExplosion2, 1000);

    function removeExplosion2() {

      div2.remove();
      window.clearInterval(explosionTime2);
      explosionTime2 = null;

    }
  }
  function explosion3(friendX,friendY) {
    console.log('friend',friendX,friendY)
    $("#background").append("<div id='explosion3' class='anima4'></div");
    $("#explosion3").css("top",friendY);
    $("#explosion3").css("left",friendX);
    let explosion3Time=window.setInterval(explosion3Reset, 1000);
    function explosion3Reset() {
    $("#explosion3").remove();
    window.clearInterval(explosion3Time);
    explosion3Time=null;
        
    }
    
    } 
  
  function friendRespawn() {

    let friendTime = window.setInterval(respawn6, 6000);

    function respawn6() {
      window.clearInterval(friendTime);
      friendTime = null;

      if (gameOver == false) {

        $("#background").append("<div id='friend' class='anima3'></div>");

      }

    }

  }
   function showScoreboard(){
    $("#scoreboard").html("<h2> Pontos: " + points + " Salvos: " + savedFriends + " Perdidos: " + lostFriends + "</h2>");
   }
   function energyControl() {
	
		if (playerEnergy==3) {
			
			$("#energy").css("background-image", "url(imgs/energia3.png)");
		}
	
		if (playerEnergy==2) {
			
			$("#energy").css("background-image", "url(imgs/energia2.png)");
		}
	
		if (playerEnergy==1) {
			
			$("#energy").css("background-image", "url(imgs/energia1.png)");
		}
	
		if (playerEnergy==0) {
			
			$("#energy").css("background-image", "url(imgs/energia0.png)");
			gameOverFunction();
			//Game Over
		}
	
	}
  function gameOverFunction() {
    gameOver=true;
    music.pause();
    gameOverSound.play();
    
    window.clearInterval(game.timer);
    game.timer=null;
    
    $("#player").remove();
    $("#enemy1").remove();
    $("#enemy2").remove();
    $("#friend").remove();
    
    $("#background").append("<div id='end'></div>");
    
    $("#end").html("<h1> Game Over </h1><points>Sua pontuação foi: " + points + "</points>" + "<div id='restart' onClick=restartGame()><h3>Jogar Novamente</h3></div>");
    }
  
}
function restartGame(){
  gameOverSound.pause();
  $("#end").remove();
  start();
}
