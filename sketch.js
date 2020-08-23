var ninja;
var AppleGroup, MelonGroup, StrawGroup, PeachGroup;
var count,ground, gameOver,time,star;

var score = 0;
var pScore = 0;
var visibility = 255;
var chance = 0;
var image1,image2,image3,ninjaImg,star3, star4;


var blade = 0;
var  gameState = "rules";
//mode is different from gameState, specifies the level of game
var mode = "ran";

function preload(){
  backImage = loadImage("background.jpg");
  appleImg = loadImage("fruit/apple.png");
  appleSlice1 = loadImage("fruit/apple-1.png");
  appleSlice2 = loadImage("fruit/apple-2.png");
  strawImg = loadImage("fruit/straw.png");
  strawSlice1 = loadImage("fruit/straw-1.png");
  strawSlice2 = loadImage("fruit/straw-2.png");
  melonImg = loadImage("fruit/melon.png");
  melonSlice1 = loadImage("fruit/melon-1.png");
  melonSlice2 = loadImage("fruit/melon-2.png");
  peachImg = loadImage("fruit/peach.png");
  peachSlice1 = loadImage("fruit/peach-1.png");
  peachSlice2 = loadImage("fruit/peach-2.png");
  ninjaImg = loadImage("ninja.png");
  boomImg = loadImage("fruit/boom.png");
  gameOverImg = loadImage("game-over.png");
  boomSound = loadSound("boom.mp3");
  clockSound = loadSound("clock.mp3");
  powerImg = loadImage("power.png");
  star3 = loadImage("star3.png");
  star4 = loadImage("star4.png");
  xImg = loadImage("lose.png");
}


function setup() {
  createCanvas(windowWidth/2,windowHeight/2);
 
  AppleGroup = createGroup();
  StrawGroup = createGroup();
  MelonGroup = createGroup();
  PeachGroup = createGroup();
  BoomGroup = createGroup();
  NinjaGroup = createGroup();

  ninja = createSprite(width/2,height-80,0.05,0.05);
 
  yesButton = createButton("Yes");
  yesButton.position(width/2,height*3/4);
  yesButton.hide();

  startButton = createButton("Start");
  startButton.position(width/2-10,height*7/10);
  startButton.hide();

  resetButton = createButton("Reset");
  resetButton.position(width/8,height/8);
  resetButton.hide();

  gameOver = createSprite(width/2,height/3,20,20);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  power = createSprite(width/2,height/5,20,20);
  power.addImage(powerImg);
  power.scale = 0.6;
  power.visible = false;

  image1 = createSprite(width/3,height/2,50,50);
  image1.addImage(ninjaImg);
  image1.scale = 0.1;

  image2 = createSprite(width/2 + 20,height/2,50,50);
  image2.addImage(star3);
  image2.scale = 0.3;

  image3 = createSprite(width*2/3 + 30,height/2,50,50);
  image3.addImage(star4);
  image3.scale = 0.14;
  console.log(width);

  x1 = createSprite(width*3/4 + 20,height/4,20,20);
  x1.addImage(xImg);
  x1.scale = 0.7;

  x2 = createSprite(width*5/6 + 10,height/4,20,20);
  x2.addImage(xImg);
  x2.scale = 0.7;

  x3 = createSprite(width*9/10 + 10,height/4,20,20);
  x3.addImage(xImg);
  x3.scale = 0.7;

  begButton = createButton("Beginner");
  begButton.position(width*3/8,height/4);
  begButton.hide();

  advButton = createButton("Advance");
  advButton.position(width*5/8,height/4);
  advButton.hide();

  wall1 = createSprite(width+10,height/2,20,height);
  wall2 = createSprite(-10,height/2,20,height);

  ninja.velocityX = 25;
}

function draw() {
  background(backImage);
  begButton.hide();
  advButton.hide();

  stroke("white");
  fill("white");
  image1.visible = false;
  image2.visible = false;
  image3.visible = false;
  if(gameState=== "powerPlay" || gameState === "play" || gameState === "end"){
    x1.visible = true;
    x2.visible = true;
    x3.visible = true;
  }else{
    x1.visible = false;
    x2.visible = false;
    x3.visible = false;
  }

  if(gameState !== "autoMode"){
    ninja.x = mouseX;
  }

    if(gameState === "rules"){
      yesButton.show();
      textSize(25);
      text("Rules: ",width/2-30,height*3/8-10);
      text("The goal of this game is to slice the fruit",width/3,height*7/16);
      text("To slice the fruit, press the space bar",width/3,height/2+10);
      text("Beware of the falling bombs!",width/3,height*9/16+20);
      text("Are you ready to become the next fruit ninja?",width/3,height*5/8+30);
      yesButton.mousePressed(()=>{
        gameState = "options";
        yesButton.hide();
      })
      
    }

    if(gameState === "options"){
      textSize(30);
      text("Choose Your Ninja Blade",width*5/16,height/4);
      image1.visible = true;
      image2.visible = true;
      image3.visible = true;

      if(mousePressedOver(image1)){
        blade = 1;
        startButton.show();
      } 
      if (mousePressedOver(image2)){
        blade = 2;
        startButton.show();
      } 
      if(mousePressedOver(image3)){
        blade = 3;
        startButton.show();
      }

      startButton.mousePressed(()=>{
        gameState = "options2";
        startButton.hide();
      })
    }

    if(mousePressedOver(image1) || touches.length>0){
      ninja.scale = 0.05;
      ninja.addImage(ninjaImg);
      touches=[];
    }else if(mousePressedOver(image2) || touches.length>0){
      ninja.scale = 0.15;
      ninja.addImage(star3);
      touches=[];
    }else if(mousePressedOver(image3) || touches.length>0){
      ninja.scale = 0.08;
      ninja.addImage(star4);
      touches=[];
    }

    if(gameState === "options2"){
      begButton.show();
      advButton.show();

      begButton.mousePressed(()=>{
        mode = "beg";
        gameState = "play";
        begButton.hide();
        
      })

      advButton.mousePressed(()=>{
        mode = "adv";
        gameState = "play";
        advButton.hide();
      })
    }

    if(gameState === "play"){
      power.visible = false; 
      gameOver.visible = false;
      textSize(20);
      text("Score: "+ score,width*3/4 + 30,height/5-15);
        spawnApples();
        spawnStraws();
        spawnMelons();
        spawnPeaches();
        spawnBooms();
        if(keyWentDown("space") || touches.length>0){
          //Creates a star to slice the fruit.
          createStar(); 
          touches = [];   
        }
    
        if(frameCount %Math.round(random(800,1400)) === 0){
          clockSound.play();
          time = 10;
          gameState = "powerPlay";
        }
        if(score >0 && score % 500 === 0){
          time = 5
          gameState = "autoMode";
        }
        //this function holds all of the for loops of the fruit, as well as the sliced fruit.
        fruitCut();
    }
    
    if(gameState === "autoMode"){
    /*AutoMode is a way of rewarding the player by giving them 5 seconds 
    to relax and automatically score points*/
      textSize(30);
      text("Auto Mode!",width*3/8,height/5);
      time = time - 0.03;
      textSize(20);
      text("Time Left 0:0" + Math.round(time),width/20,height/5-15);
      if(time < 0){
        NinjaGroup.destroyEach();
        gameState = "play";
      }
    
      text("Score: "+ score, width*3/4 + 30,height/5-15);
    
      ninja.bounceOff(wall1);
      ninja.bounceOff(wall2);
      spawnApples();
      spawnStraws();
      spawnMelons();
      spawnPeaches();
      fruitCut();
      if(frameCount% 2 === 0){
        createStar();
      }
    }
    
    if(gameState === "powerPlay"){
      //in powerplay, players can earn double points and bombs will not have an effect
      power.visible = true; 
      textSize(20);
      text("Power Score: "+ pScore, width*3/4 + 20,height/5-15);
      
      time = time - 0.03;
      text("Time Left 0:0" + Math.round(time), width/20,height/5-15);
      if(time < 0){
        gameState = "play";
      }
    
      spawnApples();
      spawnStraws();
      spawnMelons();
      spawnPeaches();
      spawnBooms();
    
      if(keyWentDown("space") || touches.length>0){
        createStar();
        touches = [];
      }
    
      fruitCut(); 
    }
    
    if(gameState === "end"){
      power.visible = false;
      //you get three chances before completely dying
      if(chance === 3){
        gameOver.visible = true;
        resetButton.hide();
      }else{
        resetButton.show();
      }
    
      AppleGroup.destroyEach();
      PeachGroup.destroyEach();
      MelonGroup.destroyEach();
      StrawGroup.destroyEach();
    
      textSize(30);
      fill("white");
      stroke("white");
      if(pScore > 0){
        text("Score: " + score,width*7/16,height*11/16 - 30);
        text("Power Score: "+ pScore,width/2,height*3/4 - 20);
        text("Total Score: "+ (score + pScore),width/2,height*13/16 - 10);
      }else{
        text("Score: " + score, width*7/16,height*3/4-20);
        text("Total Score: "+ score,width*7/16,height*3/4+20);
      }
    
      resetButton.mousePressed(()=>{
        gameState = "play";
        resetButton.hide();
      })
    
      if(chance === 1){
        x1.destroy();
      }else if(chance === 2){
        x2.destroy();
      }else if(chance === 3){
        x3.destroy();
      }
    }
 
  drawSprites();
}

/*These spawn functions are to create the various fruits and show on screen according to 
frameCount and random places*/

function spawnApples(){
  if(frameCount %25 === 0){
    var apple = createSprite(random(0,width),random(-80,0),20,20);
    apple.addImage(appleImg);
    if(mode === "beg"){
      apple.velocityY = 8 + 3*(frameCount/500);
      apple.lifetime = height/(8 + 3*(frameCount/500));
    }else if(mode === "adv"){
      apple.velocityY = 11 + 3*(frameCount/500);
      apple.lifetime = height/(11 + 3*(frameCount/500));
    }
    apple.scale = 0.6;
    AppleGroup.add(apple);
  }
}
function spawnStraws(){
  if(frameCount %25 === 0){
    var straw = createSprite(random(0,width),random(-80,0),20,20);
    straw.addImage(strawImg);
    if(mode === "beg"){
      straw.velocityY = 8 + 3*(frameCount/500);
      straw.lifetime = height/(8 + 3*(frameCount/500));
    }else if(mode === "adv"){
      straw.velocityY = 11 + 3*(frameCount/500);
      straw.lifetime = height/(11 + 3*(frameCount/500));
    }
    straw.scale = 0.6;
    StrawGroup.add(straw);
  }
}
function spawnMelons(){
  if(frameCount %25 === 0){
    var melon = createSprite(random(0,width),random(-80,0),20,20);
    melon.addImage(melonImg);
    if(mode === "beg"){
      melon.velocityY = 8 + 3*(frameCount/500);
      melon.lifetime = height/(8 + 3*(frameCount/500));
    }else if(mode === "adv"){
      melon.velocityY = 11 + 3*(frameCount/500);
      melon.lifetime = height/(11 + 3*(frameCount/500));
    }
    melon.scale = 0.6;
    MelonGroup.add(melon);
  }
}
function spawnPeaches(){
  if(frameCount %25 === 0){
    var peach = createSprite(random(0,width),random(-80,0),20,20);
    peach.addImage(peachImg);
    if(mode === "beg"){
      peach.velocityY = 8 + 3*(frameCount/500);
      peach.lifetime = height/(8 + 3*(frameCount/500));
    }else if(mode === "adv"){
      peach.velocityY = 11 + 3*(frameCount/500);
      peach.lifetime = height/(11 + 3*(frameCount/500));
    }
    peach.scale = 0.6;
    PeachGroup.add(peach);
  }
}
function spawnBooms(){
  if(frameCount %60 === 0){
    var boom = createSprite(random(0,width),random(-80,0),20,20);
    boom.addImage(boomImg);
    if(mode === "beg"){
      boom.velocityY = 8 + 3*(frameCount/500);
      boom.lifetime = height/(8 + 3*(frameCount/500));
    }else if(mode === "adv"){
      boom.velocityY = 11 + 3*(frameCount/500);
      boom.lifetime = height/(11 + 3*(frameCount/500));
    }
    boom.rotationSpeed = random(-0.5,0.5);
    boom.scale = 0.8;
    BoomGroup.add(boom);
  }
}

function createStar(){
  star = createSprite(ninja.x,height-30,20,20);
  star.velocityY = -7;
  star.rotationSpeed = 20;
  //star.addImage(ninjaImg);
  if(blade === 1){
    star.addImage(ninjaImg);
    star.scale = 0.07;
  }
  if(blade === 2){
    star.addImage(star3);
    star.scale = 0.14;
  }
  if(blade === 3){
    star.addImage(star4);
    star.scale = 0.1;
  }
  star.lifetime = 57.1;
  NinjaGroup.add(star);
}

function fruitCut(){
  /*the purpose of each of these for loops is to point to each individual fruit, "slice"
  the fruit by creating a sprite for each slice and destroying the whole fruit, and 
  increase the score based on the mode and gameState*/
  for(var a = 0; a<AppleGroup.length; a++){
    var appleTemp = AppleGroup.get(a);
    for(var n = 0; n<NinjaGroup.length; n++){
      var ninjaTemp = NinjaGroup.get(n);
      if(ninjaTemp.isTouching(appleTemp)){
        if((gameState === "play" || gameState === "autoMode") && mode === "adv"){
          score = score + 1;
        }if(gameState === "powerPlay" && mode === "adv"){
          pScore = pScore + 5;
        }
        if((gameState === "play" || gameState === "autoMode" )&& mode === "beg"){
          score = score + 5;
        }if(gameState === "powerPlay" && mode === "beg"){
          pScore = pScore + 10;
        }

        appleTemp.destroy();
        ninjaTemp.destroy();
        appleS = createSprite(appleTemp.x-10,appleTemp.y,20,20);
        appleS.addImage(appleSlice1);
        appleS.scale = 0.6;
        if(mode === "beg"){
          appleS.velocityY =  random(6 + 3*(frameCount/500),10 + 3*(frameCount/500));
        }else if(mode === "adv"){
          appleS.velocityY = random(9 + 3*(frameCount/500),13 + 3*(frameCount/500));
        }
        appleS.rotationSpeed = random(-3,3)
        appleS2 = createSprite(appleTemp.x + 10,appleTemp.y,20,20);
        appleS2.addImage(appleSlice2);
        appleS2.scale = 0.6;
        if(mode === "beg"){
          appleS2.velocityY =  random(6 + 3*(frameCount/500),10 + 3*(frameCount/500));
        }else if(mode === "adv"){
          appleS2.velocityY = random(9 + 3*(frameCount/500),13 + 3*(frameCount/500));
        }
        appleS2.rotationSpeed = random(-3,3);
        if(appleS.y>height){
          appleS.destroy();
        }
        if(appleS2.y>height){
          appleS2.destroy();
        }
      }
    }
  }
  for(var s = 0; s<StrawGroup.length; s++){
    var strawTemp = StrawGroup.get(s);
      for(var n = 0; n<NinjaGroup.length; n++){
        var ninjaTemp = NinjaGroup.get(n);
      if(ninjaTemp.isTouching(strawTemp)){
        if((gameState === "play" || gameState === "autoMode") && mode === "adv"){
          score = score + 1;
        }if(gameState === "powerPlay" && mode === "adv"){
          pScore = pScore + 5;
        }
        if((gameState === "play" || gameState === "autoMode" )&& mode === "beg"){
          score = score + 5;
        }if(gameState === "powerPlay" && mode === "beg"){
          pScore = pScore + 10;
        }
        strawTemp.destroy();
        ninjaTemp.destroy();
        strawS = createSprite(strawTemp.x-10,strawTemp.y,20,20);
        strawS.addImage(strawSlice1);
        strawS.scale = 0.6;
        if(mode === "beg"){
          strawS.velocityY =  random(6 + 3*(frameCount/500),10 + 3*(frameCount/500));
        }else if(mode === "adv"){
          strawS.velocityY = random(9 + 3*(frameCount/500),13 + 3*(frameCount/500));
        }
        strawS.rotationSpeed = random(-3,3)
        strawS2 = createSprite(strawTemp.x + 10,strawTemp.y,20,20);
        strawS2.addImage(strawSlice2);
        strawS2.scale = 0.6;
        if(mode === "beg"){
          strawS2.velocityY =  random(6 + 3*(frameCount/500),10 + 3*(frameCount/500));
        }else if(mode === "adv"){
          strawS2.velocityY = random(9 + 3*(frameCount/500),13 + 3*(frameCount/500));
        }
        strawS2.rotationSpeed = random(-3,3);
        if(strawS.y>height){
          strawS.destroy();
        }
        if(strawS2.y>height){
          strawS2.destroy();
        }
      }

    }
  }
  for(var m = 0; m<MelonGroup.length; m++){
    var melonTemp = MelonGroup.get(m);
      for(var n = 0; n<NinjaGroup.length; n++){
        var ninjaTemp = NinjaGroup.get(n);
      if(ninjaTemp.isTouching(melonTemp)){
        if((gameState === "play" || gameState === "autoMode") && mode === "adv"){
          score = score + 1;
        }if(gameState === "powerPlay" && mode === "adv"){
          pScore = pScore + 5;
        }
        if((gameState === "play" || gameState === "autoMode" )&& mode === "beg"){
          score = score + 5;
        }if(gameState === "powerPlay" && mode === "beg"){
          pScore = pScore + 10;
        }
        melonTemp.destroy();
        ninjaTemp.destroy();
        melonS = createSprite(melonTemp.x-10,melonTemp.y,20,20);
        melonS.addImage(melonSlice1);
        melonS.scale = 0.6;
        if(mode === "beg"){
          melonS.velocityY =  random(6 + 3*(frameCount/500),10 + 3*(frameCount/500));
        }else if(mode === "adv"){
          melonS.velocityY = random(9 + 3*(frameCount/500),13 + 3*(frameCount/500));
        }
        melonS.rotationSpeed = random(-3,3)
        melonS2 = createSprite(melonTemp.x + 10,melonTemp.y,20,20);
        melonS2.addImage(melonSlice2);
        melonS2.scale = 0.6;
        if(mode === "beg"){
          melonS2.velocityY =  random(6 + 3*(frameCount/500),10 + 3*(frameCount/500));
        }else if(mode === "adv"){
          melonS2.velocityY = random(9 + 3*(frameCount/500),13 + 3*(frameCount/500));
        }
        melonS2.rotationSpeed = random(-3,3);
        if(melonS.y>height){
          melonS.destroy();
        }
        if(melonS2.y>height){
          melonS2.destroy();
        }
      }

    }
  }
  for(var p = 0; p<PeachGroup.length; p++){
    var peachTemp = PeachGroup.get(p);
    for(var n = 0; n<NinjaGroup.length; n++){
      var ninjaTemp = NinjaGroup.get(n);
      if(ninjaTemp.isTouching(peachTemp)){
        if((gameState === "play" || gameState === "autoMode") && mode === "adv"){
          score = score + 1;
        }if(gameState === "powerPlay" && mode === "adv"){
          pScore = pScore + 5;
        }
        if((gameState === "play" || gameState === "autoMode" )&& mode === "beg"){
          score = score + 5;
        }if(gameState === "powerPlay" && mode === "beg"){
          pScore = pScore + 10;
        }
        peachTemp.destroy();
        ninjaTemp.destroy();
        peachS = createSprite(peachTemp.x-10,peachTemp.y,20,20);
        peachS.addImage(peachSlice1);
        peachS.scale = 0.6;
        if(mode === "beg"){
          peachS.velocityY =  random(6 + 3*(frameCount/500),10 + 3*(frameCount/500));
        }else if(mode === "adv"){
          peachS.velocityY = random(9 + 3*(frameCount/500),13 + 3*(frameCount/500));
        }
        peachS.rotationSpeed = random(-3,3)
        peachS2 = createSprite(peachTemp.x + 10,peachTemp.y,20,20);
        peachS2.addImage(peachSlice2);
        peachS2.scale = 0.6;
        if(mode === "beg"){
          peachS2.velocityY =  random(6 + 3*(frameCount/500),10 + 3*(frameCount/500));
        }else if(mode === "adv"){
          peachS2.velocityY = random(9 + 3*(frameCount/500),13 + 3*(frameCount/500));
        }
        peachS2.rotationSpeed = random(-3,3);
        if(peachS.y>height){
          peachS.destroy();
        }
        if(peachS2.y>height){
          peachS2.destroy();
        }
      }
    }
  }
  for(var b = 0; b<BoomGroup.length; b++){
    var boomTemp = BoomGroup.get(b);
    for(var n = 0; n<NinjaGroup.length; n++){
      var ninjaTemp = NinjaGroup.get(n);
      if(ninjaTemp.isTouching(boomTemp) && gameState=== "play"){
        boomSound.play();
        gameState = "end";
        //chance is a variable used to track the strikeouts
        chance = chance + 1;
      }
    }
  }
}