var px, py, pw , ph;
var cx, cy, cv, bx, by,bd;
var vx, vy , vmax, maxangle;
var botlevel;
var pscore, cscore;
var freeze;
function setup() {
  createCanvas(600, 400);
 
  restart()
  maxangle = 75/180*PI
  pscore =0
  cscore = 0
  
}

function restart(){
  px = 0
  py = height/2
  pw = 20
  ph = 100
  pv = 0
  cx =width - pw
  cy = height/2
  cv = 0
  bx = width/2
  by = height/2
  bd = 20
  vmax =7
  vx = 0
  vy = 0
  freeze = true
}

function draw() {
   background(30, 105, 50);
  // partition of ground
  stroke(0)
  strokeWeight(3)
  for (var i =0; i< height/10; i++)
  {
    line(width/2, height/10 * i, width/2, height/20 + height/10 * i)
  }
  
 // movement of player's paddle and its boundries
  py = pv + py
  if( mouseY < ph/2)
   {mouseY = ph/2}
  if(mouseY + ph/2 > height)
  {mouseY = height - ph/2}
  rect(px, mouseY-ph/2 ,pw, ph);
   
  //movement of computers paddle
  //computer controls its paddle
  cv = by - cy
  // should not move faster than player
  if(cv <= -4)
  {cv = -4}
  if(cv>= 4)
  {cv= 4}
 // update paddle's position 
  cy = cv + cy
  // limit paddle's position
  if( cy < ph/2)
   {cy = ph/2}
  if(cy + ph/2 > height)
  {cy = height - ph/2}
  
  rect(cx, cy-ph/2, pw,ph);
  
  //drawing of ball
       // movement of ball
  bx = bx + vx
  by = by + vy
  ///ball hit with wall
  
  if(by-bd/2 <= 0)  // hit at the top wall
  {    vy = vy * -1
   by = bd/2}
 
  if(by + bd/2 >=height)  // hit at bottom
  {by = height - bd/2
   vy = vy * -1}
   
  if (bx + bd/2 >= width) // hit at the right wall
  {vx = vx * -1
   bx = width - bd/2
  // player's score
     pscore++
  restart()
  }
    
  
  
  if(bx-bd/2 <= 0)  // hitting the left wall
  {vx = vx * -1
   bx = bd/2
    // computer's score
   cscore++
  restart()
  }
  // collision with player's paddle
  
  if ( bx - bd/2 <= pw+px &&
     by <= mouseY + ph &&
     by >= mouseY - ph)
  {
    var range = (by - mouseY)/ (ph/2);
   var angle = range * maxangle; //-1.3 to 1.3
    // update ball,s speed after collision
   
    vx = vmax * cos(angle);
    vy = vmax * sin(angle);
  }
  
  // collision with computer's paddle
  
  if ( bx + bd/2 >= width-pw &&
     by <= cy + ph/2 &&
     by >= cy - ph/2)
  {
    var range = (by - cy)/ (ph/2);
   var angle = range * maxangle; //-1.3 to 1.3
    // update ball,s speed after collision
   
    vx = -vmax * cos(angle);
    vy = vmax * sin(angle);
  }
 strokeWeight(0)
  ellipse(bx,by,bd,bd);
  
  // change the text size
  textSize(24)
 text(pscore, 0.25 * width, 0.25 * height);
 text(cscore, 0.75 * width, 0.25 * height);
  
}

 function keyPressed(){
  if( freeze == true)
  { vx = -vmax
   vy = vmax
  freeze = false}
   
    
   {cv = 6}
 }
