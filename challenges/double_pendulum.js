/**
 * Live emulation of double pendulum movement in Js!
 * @pablooaliaga
 */

let width = 800;
let height = 600;


let r1 = 250;
let r2 = 100;
let m1 = 10;
let m2 = 10;
let a1 = 5*Math.PI/8;
let a2 = Math.PI/4;

//motion
let g = 0.5;

let a1_v = 0;
let a2_v = 0;

let a1_a = 0;
let a2_a = 0;

let px2, py2;
let cx,cy;

function setup (){
    createCanvas (width, height);
    cx = width/2;
    cy = height/4;
    buffer = createGraphics(width, height);
    buffer.background(230);
    buffer.translate(cx, cy);

    px2 = r1*sin(a1) + r2*sin(a2);
    py2 = r1*cos(a1) + r2*cos(a2);

  }
  
function draw(){

    background(230);
    
    image(buffer, 0, 0, width, height);
    
    strokeWeight(4);
    fill(0);
    
    //acceleration 
    let n1 = -g*(2*m1+m2)*sin(a1);
    let n2 = -m2*g*sin(a1-2*a2);
    let n3 = -2*sin(a1-a2);
    let n4 = m2*(pow(a2_v,2)*r2+pow(a1_v,2)*r1*cos(a1-a2))
    let div = r1*(2*m1+m2-m2*cos(2*a1 - 2*a2)); 
    a1_a = (n1+n2+(n3*n4))/div;

    n1 = 2*sin(a1-a2);
    n2 = pow(a1_v,2)*r1*(m1+m2);
    n3 = g*(m1+m2)*cos(a1);
    n4 = pow(a2_v,2)*r2*m2*cos(a1-a2);
    div = r2*(2*m1+m2-m2*cos(2*a1 - 2*a2));
    a2_a = (n1*(n2+n3+n4))/div; 

    translate(cx, cy);
    let x1 = r1*sin(a1);
    let y1 = r1*cos(a1);
    line(0,0,x1,y1);
    ellipse(x1,y1,16,16);

    let x2 = x1 + r2*sin(a2);
    let y2 = y1 + r2*cos(a2);
    line(x1,y1,x2,y2);
    ellipse(x2,y2,16,16);

    a1_v += a1_a;
    a2_v += a2_a;
    
    a1 += a1_v;
    a2 += a2_v;

    buffer.stroke(5);
    buffer.line(px2,py2,x2,y2);
    px2 = x2;
    py2 = y2;
    
}
  