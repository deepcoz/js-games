(function(){
  var canvas;
  var ctx;

  var snake;
  var snake_dir;
  var snake_next_dir;
  var snake_speed;
  var snake_size = 5;

  var food = { x: 0, y: 0};
  
  var score;
  
  var wall;
  var wall_color_on = '#00FFFF'; // #FFFFFF
  var wall_color_off = '#606060'; // 606060
  var snake_color = '#417042'; // #FFFFFF
  var food_color = '#f3f786'; // #FFFFFF
  var bg_color = '#1d1b33'; // #000000

  var screen_snake;
  var screen_menu;
  var screen_setting;
  var screen_gameover;
  var button_newgame_menu;
  var button_newgame_setting;
  var button_newgame_gameover;
  var button_setting_menu;
  var button_setting_gameover;
  var ele_score;
  var wall_setting;

  function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
    snd.play().catch(function(err) {
        console.log('play failed', err.message);
    });
  }

  var activeDot = function (x, y, dot_color) {
    ctx.fillStyle = dot_color;
    ctx.fillRect(x * 10, y * 10, 10, 10);
  }

  var changeDir = function(key) {  
    if(key == 38 && snake_dir != 2) {
      snake_next_dir = 0;
    } else {
      if (key == 39 && snake_dir != 3){
          snake_next_dir = 1;
      } else {
        if (key == 40 && snake_dir != 0){
            snake_next_dir = 2;
        } else {  
          if (key == 37 && snake_dir != 1) {
              snake_next_dir = 3;
          } 
        }
      }
    }
  }

  var addFood = function(){
    food.x = Math.floor(Math.random() * ((canvas.width / 10) - 1));
    food.y = Math.floor(Math.random() * ((canvas.height / 10) - 1));
    for(var i = 0; i < snake.length; i++) {
        if(checkBlock(food.x, food.y, snake[i].x, snake[i].y)) {
          addFood();
        }
    }
  }

  var checkBlock = function(x, y, _x, _y) {
      return (x == _x && y == _y) ? true : false;
  }

  var altScore = function(score_val){
      ele_score.innerHTML = String(score_val);
  }

  var mainLoop = function() {
    var _x = snake[0].x;
    var _y = snake[0].y;
    snake_dir = snake_next_dir;

    // 0 - Up, 1 - Right, 2 - Down, 3 - Left
    switch(snake_dir) {
      case 0: _y--; break;
      case 1: _x++; break;
      case 2: _y++; break;
      case 3: _x--; break;
    }

    snake.pop();
    snake.unshift({x: _x, y: _y});

    // Wall
    if(wall == 1){
      // On
      if (snake[0].x < 0 || snake[0].x == canvas.width / 10 || snake[0].y < 0 || snake[0].y == canvas.height / 10) {
        showScreen(3);
        return;
      }
    } else {
      // Off
      for(var i = 0, x = snake.length; i < x; i++) {
        if(snake[i].x < 0) {
            snake[i].x = snake[i].x + (canvas.width / 10);
        }
        if(snake[i].x == canvas.width / 10) {
            snake[i].x = snake[i].x - (canvas.width / 10);
        }
        if(snake[i].y < 0) {
            snake[i].y = snake[i].y + (canvas.height / 10);
        }
        if(snake[i].y == canvas.height / 10) {
            snake[i].y = snake[i].y - (canvas.height / 10);
        }
      }
    }

    // Autophagy death
    for(var i = 1; i < snake.length; i++) {
      if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
        showScreen(3);
        return;
      }
    }
    
    // Eat Food
    if(checkBlock(snake[0].x, snake[0].y, food.x, food.y)) {
      snake[snake.length] = {x: snake[0].x, y: snake[0].y};
      score += 1;
      beep();
      altScore(score);
      addFood();
      activeDot(food.x, food.y, food_color);
    }

    ctx.beginPath();
    ctx.fillStyle = bg_color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(var i = 0; i < snake.length; i++) {
      activeDot(snake[i].x, snake[i].y, snake_color);
    }
    activeDot(food.x, food.y, food_color);

    // Debug
    //document.getElementById("debug").innerHTML = snake_dir + " " + snake_next_dir + " " + snake[0].x + " " + snake[0].y;
    setTimeout(mainLoop, snake_speed);
  }

  var newGame = function() {
    showScreen(0);
    screen_snake.focus();   
    
    snake = [];
    for(var i = snake_size; i >= 0; i--) {
      snake.push({x: i, y: 15});
    }
    snake_next_dir = 1;
    
    score = 0;
    altScore(score);
    
    addFood();

    canvas.onkeydown = function(evt) {
      evt = evt || window.event;
      changeDir(evt.keyCode);
    }
    mainLoop();
  }

  var setSnakeSpeed = function(speed_value) {
    snake_speed = speed_value;
  }

  var setWall = function(wall_value) {
    wall = wall_value;
    if (wall == 0) { screen_snake.style.borderColor = wall_color_off;  }
    if (wall == 1) { screen_snake.style.borderColor = wall_color_on;}
  }

  var showScreen = function(screen_opt){
    switch(screen_opt) {          
      case 0:  
        screen_snake.style.display = "block";
        screen_menu.style.display = "none";
        screen_setting.style.display = "none";
        screen_gameover.style.display = "none";
        break;
      case 1:  
        screen_snake.style.display = "none";
        screen_menu.style.display = "block";
        screen_setting.style.display = "none";
        screen_gameover.style.display = "none";
        break;
      case 2:
        screen_snake.style.display = "none";
        screen_menu.style.display = "none";
        screen_setting.style.display = "block";
        screen_gameover.style.display = "none";
        break;
      case 3: 
        screen_snake.style.display = "none";
        screen_menu.style.display = "none";
        screen_setting.style.display = "none";
        screen_gameover.style.display = "block";
        break;
    }
  }

  window.onload = function() {
    canvas = document.getElementById('snake');
    ctx = canvas.getContext('2d');
    
    // Screens
    screen_snake = document.getElementById("snake");
    screen_menu = document.getElementById("menu");
    screen_gameover = document.getElementById("gameover");
    screen_setting = document.getElementById("setting");
        
    // Buttons
    button_newgame_menu = document.getElementById("newgame_menu");
    button_newgame_setting = document.getElementById("newgame_setting");
    button_newgame_gameover = document.getElementById("newgame_gameover");
    button_setting_menu = document.getElementById("setting_menu");
    button_setting_gameover = document.getElementById("setting_gameover");

    // etc
    ele_score = document.getElementById("score_value");
    speed_setting = document.getElementsByName("speed");
    wall_setting = document.getElementsByName("wall");

    button_newgame_menu.onclick = function(){newGame();};
    button_newgame_gameover.onclick = function(){newGame();}; 
    button_newgame_setting.onclick = function(){newGame();}; 
    button_setting_menu.onclick = function(){showScreen(2);};
    button_setting_gameover.onclick = function(){showScreen(2)};

    setSnakeSpeed(150);
    setWall(1);

    showScreen("menu");

    // speed
    for(var i = 0; i < speed_setting.length; i++){
        speed_setting[i].addEventListener("click", function(){
            for(var i = 0; i < speed_setting.length; i++){
                if(speed_setting[i].checked){
                    setSnakeSpeed(speed_setting[i].value);
                }
            }
        });
    }
  
    // wall
    for(var i = 0; i < wall_setting.length; i++) {
        wall_setting[i].addEventListener("click", function(){
            for(var i = 0; i < wall_setting.length; i++){
                if(wall_setting[i].checked){
                    setWall(wall_setting[i].value);
                }
            }
        });
    }

    document.onkeydown = function(evt){
      if(screen_gameover.style.display == "block") {
          evt = evt || window.event;
          if(evt.keyCode == 32) {
            newGame();
          }
      }
    }

  }
})();
