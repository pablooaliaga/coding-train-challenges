/**
 * Simple fractal tree in Js!
 * @pablooaliaga
 */

let width = 800;
let height = 800;


function draw_tree(len , angle, dec_factor, lvl = 1){
    //ending case
    if(len < height/100) return;

    lvl++;
    //recursive case
    buffer.line(0,0,0, -len);
    buffer.translate(0, -len);
    //first branch
    buffer.push();
    buffer.rotate(angle);
    draw_tree(dec_factor*len, angle, dec_factor, lvl);
    buffer.pop()
    //second branch
    buffer.push();
    buffer.rotate(-angle);
    draw_tree(dec_factor*len, angle, dec_factor, lvl);
    buffer.pop()

    //Random branchs

    //third branch
    if(random() < 0.5){
        buffer.push();
        buffer.rotate(angle/2);
        draw_tree(dec_factor*len, angle, dec_factor, lvl);
        buffer.pop()
    }
    
    //fourth branch
    if(random() < 0.5){
        buffer.push();
        buffer.rotate(-angle/2);
        draw_tree(dec_factor*len, angle, dec_factor, lvl);
        buffer.pop()
    }
}


function setup (){
    createCanvas (width, height);
    cx = width/2;
    cy = height;
    buffer = createGraphics(width, height);
    buffer.background(50);
    buffer.translate(cx, cy);
    buffer.stroke(255);
    draw_tree(150, PI/6, 6/8);

  }

  function draw(){

    image(buffer, 0, 0, width, height);
  
}
