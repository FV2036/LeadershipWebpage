let W = 650; 
let H = 450; // dimensions of canvas optimum as per my laptop screen
let start_BG, LR_BG, BR_BG; // living room and bedroom background 
// background images taken from the music video https://www.youtube.com/watch?v=91VRyTvjoX4
// cropped and resized using Microsoft Picture Manager

//let backgroundColour = 0;
let clearButton, startButton, roomChange, heartButton;
let Hstate = 0;
let roomNum = -1; // initiating the room variable, sketch will start outside the house

let heartbeatSound;

let lampA1, lampA2;
let lampB1, lampB2;

function preload() {
  
  start_BG = loadImage('De_Una_Vez.jpg');
  LR_BG = loadImage('Living_Room_Background.png');
  BR_BG = loadImage('Bedroom_Background.jpg');
  // Used to remove person from the background image - https://theinpaint.com/tutorials/online/how-to-remove-tourists-from-photo
  
  heartbeatSound = loadSound("Heartbeat_Sound.mp3");
  //https://freesound.org/people/InspectorJ/sounds/485076/
}

function setup() {
  createCanvas(W, H);

  // RGB colour values taken from - https://www.rapidtables.com/web/color/RGB_Color.html
  background(255, 182, 193); // light pink

  lampA1 = new Lamp(270, 390);
  lampA2 = new Lamp(480, 270);
  
  lampB1 = new Lamp(240, 360);
  lampB2 = new Lamp(430, 480);
  
  startButton = createButton('Start');
  startButton.position(100, 460);
  startButton.mousePressed(checkRoomstate);
  
  roomChange = createButton('Next Room');
  roomChange.position(225, 460);
  roomChange.mousePressed(checkRoomstate);
  
  heartButton = createButton('Heart');
  heartButton.position(375, 460);
  heartButton.mousePressed(checkHstate);

  clearButton = createButton('Clear');
  clearButton.position(500, 460);
  clearButton.mousePressed(clearE);
  
  
  //noLoop(); // so that the draw() function doesn't loop. This is done to ensure draw function elements don't appear when user enters the different rooms
}

function draw() {
  
  if (roomNum == -1) { // start page
    
   image(start_BG, 0, 0, 650, 450);
    
}


  if (roomNum == 0) { // bedroom
    roomBedroom();

    if (Hstate == 0) { // broken heart
      heartBroken();
    } else if (Hstate == 1) { // healed heart
      heartHealed();

    } else if (Hstate == 2) { // glowing heart
      heartGlowing();
    }

  } else if (roomNum == 1) { // living room
    roomLivingroom();
  }

}

function checkRoomstate() {

  roomNum++;

  if (roomNum > 1) {
    roomNum = 0;
  }

}

function roomLivingroom() {
  //roomNum = 1

  clear();
  heartbeatSound.stop();
  background(0, 0, 139); // dark blue
  //image(LR_BG, 0, 0, LR_BG.width / 2, LR_BG.height / 2);
  image(LR_BG, 0, 0, 650, 450);
  
  textSize(16);
  text('Living Room', W / 2-100, H / 2-200);

  lampA1.drawLampA();
  lampA2.drawLampA();
  //lamp1.drawLamp(200, 200);
  lampB1.drawLampB();
  lampB2.drawLampB();


}

function roomBedroom() {
  //roomNum = 0
  
  clear();
  background(199, 21, 133); //palevioletred
  image(BR_BG, 0, 0, 650, 450);
  heartbeatSound.play(); //https://freesound.org/people/InspectorJ/sounds/485076/
  
  stroke(255,255,255);
  textSize(16);
  text('Bedroom', W / 2-100, H / 2-200);
}

function checkHstate() {

  if (roomNum === 0) { // only if current room is bedroom
    Hstate++;

    if (Hstate >= 3) {
      Hstate = 0;
    }
  }

}

function heartBroken() {
  //Hstate = 0

  // Heart shape sketch from -  https://editor.p5js.org/saberkhan/sketches/9YxbMpF5Z
  noStroke();
  //quad(300, 300, 275, 325, 300, 350, 325, 325);
  //arc(288, 313, 35, 35, PI - QUARTER_PI, 0);
  //arc(313, 313, 35, 35, PI - QUARTER_PI, QUARTER_PI);
  
  //fill(255, 0, 0); // red
  fill(96, 0, 0); // red
  quad(300, 250, 275, 275, 300, 300, 325, 275);
  arc(288, 263, 35, 35, PI - QUARTER_PI, 0);
  arc(313, 263, 35, 35, PI - QUARTER_PI, QUARTER_PI);
  
  strokeWeight(2);
  stroke(0,0,0,192);
  line(300, 251, 310, 270); // crack
  line(310,270,289,288);

}

function heartHealed() {
  // Hstate = 1

  noStroke();
  fill(192,0,0);
  quad(300, 250, 275, 275, 300, 300, 325, 275);
  arc(288, 263, 35, 35, PI - QUARTER_PI, 0);
  arc(313, 263, 35, 35, PI - QUARTER_PI, QUARTER_PI);
}

function heartGlowing() {
  // Hstate = 2
  
  noStroke();
  //fill(192,0,0,224);
  fill(220,20,60,224); // crimson
  quad(300, 250, 275, 275, 300, 300, 325, 275);
  arc(288, 263, 35, 35, PI - QUARTER_PI, 0);
  arc(313, 263, 35, 35, PI - QUARTER_PI, QUARTER_PI);
  
   for (let i = 0; i < 10; i++) { // the heart should glow
    noStroke();
    fill(255,165, 0, 88 - 10 * i); // golden glow
    circle(300, 270 , 12 * i);
  }

}

class Lamp {

  constructor(x, y) {
    this.Px = x;
    this.Py = y;
    //this.brightness = (0, 0, 0);
  }
  
  drawLampA() { // the lamp with the hemispherical lampshade
  if(mouseX > this.Px - 45 && mouseX < this.Px + 45 && mouseY > this.Py - 45 && mouseY < this.Py + 50) {
    // if the mouse is on or near this particular lamp, it should glow
     for (let i = 0; i < 10; i++) {
     noStroke();
    fill(255, 96 - 10 * i); // the brightness of the lamp light decreases further away from the lamp
    //print('opacity ' + 96-10*i);
    circle(this.Px, this.Py -20 , 15 * i);
    //print('radius ' + 10*i);  
      }
  }
    
  noFill(); // 150, 300
  //stroke(255, 255, 255);
  fill(255,255,240,192); // ivory
  arc(this.Px, this.Py, 90, 90, PI, 0, CHORD);
  fill(255,215,0); // gold
  fill(212,175,55); // metallic gold
  line(this.Px-20, this.Py, this.Px-20, this.Py+20);
  triangle(this.Px, this.Py-50, this.Px+5, this.Py-45, this.Px-5, this.Py-45);
  rectMode(CENTER);
  rect(this.Px, this.Py+20, 10, 40);
  arc(this.Px, this.Py+45, 25, 12, PI, 0, CHORD);
      
    }

  drawLampB() { // the lamp with the trapezoidal lampshade
  
    if(mouseX > this.Px - 50 && mouseX < this.Px + 50 && mouseY > this.Py - 170 && mouseY < this.Py - 65) {
    // if the mouse is on or near this particular lamp, it should glow
      //fill(100, 0, 160); // its colour changes when it glows
      //fill(186,85,211, 96);
      //quad(this.Px- 20, this.Py- 150, this.Px+ 20, this.Py - 150, this.Px + 45, this.Py - 100, this.Px - 45, this.Py - 100);
      //text('glowing', this.Px, this.Py);
      
      for (let i = 0; i < 10; i++) {
        noStroke();
        fill(255, 96 - 10 * i); // the brightness of the lamp light decreases further away from the lamp
        //print('opacity ' + 96-10*i);
        circle(this.Px, this.Py - 125, 15 * i);
        //print('radius ' + 10*i);

      }

    }

    //stroke(255, 255, 255);
    noStroke();
    
    fill(75,0,130,192); // indigo
    quad(this.Px- 20, this.Py- 150, this.Px+ 20, this.Py - 150, this.Px + 45, this.Py - 100, this.Px - 45, this.Py - 100); //lampshade
    fill(148,0,211); // dark violet
    ellipse(this.Px, this.Py - 150, 40, 10); // top of the lamp
    fill(192,192,192); // silver
    quad(this.Px - 15, this.Py - 70, this.Px + 15, this.Py - 70, this.Px + 25, this.Py - 50, this.Px - 25, this.Py - 50); // lamp stand
    rectMode(CENTER)
    rect(this.Px, this.Py - 80, 15, 40); // what I learnt: shapes drawn later appear to be 'in front of' shapes drawn earlier
    
    
  }
} // end of Lamp Class

function clearE() {

  clear();
  heartbeatSound.stop();
  background(0);



}