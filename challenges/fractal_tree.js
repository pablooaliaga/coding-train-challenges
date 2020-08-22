/**
 * Simple fractal tree in Js!
 * @pablooaliaga
 */

let width = 800;
let height = 800;

//Step size in which the tree will be displayed
let dx = 2;
let dec_factor = 0.7;
let angle = Math.PI/6;
let tree_array = []; //array will store points to draw organized in lvls for now.... after in steps also.
let initial_len = 200;
let number_of_lvls = 0;

function compute_tree(current_x=0, current_y=0, current_angle=0, lvl = 0){
    let len = initial_len*Math.pow(dec_factor, lvl);
    //ending case
    if(len < height/100) return;
    
    let begin_point = {x: current_x, y: current_y};
    
    let end_x = current_x + len*cos(Math.PI/2 - current_angle);
    let end_y = current_y - len*sin(Math.PI/2 - current_angle);
    let end_point = {x: end_x, y: end_y};
    
    let line = {begin: begin_point, end: end_point};
    //add new points to array
    if(tree_array[lvl] == undefined) tree_array[lvl] = [];
    tree_array[lvl].push(line);
    lvl++;
    //recursive case
    //first branch
    compute_tree(end_x,end_y, current_angle+angle, lvl);
    //second branch
    compute_tree(end_x,end_y, current_angle-angle, lvl);
    //third branch
    if(random() < 0.7) compute_tree(end_x, end_y, current_angle + (angle/2), lvl);
    //fourth branch
    if(random() < 0.7) compute_tree(end_x, end_y, current_angle - (angle/2), lvl);
}

function draw_lvl(level){
    if(level==0) background(30);
    let lines = tree_array[level];
    for(let i=0; i < lines.length; i++){
        let l= lines[i];
        line(l.begin.x,l.begin.y,l.end.x,l.end.y);
    } 
}

function setup (){
    createCanvas (width, height);
    cx = width/2;
    cy = height;
    background(30);
    compute_tree();
    number_of_lvls = tree_array.length;
  }
function draw(){
    translate(cx, cy);
    stroke(200);
    draw_lvl(floor(frameCount/5) % number_of_lvls);
}
