// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/y7sgcFhk6ZM
// const canvasWidth = window.innerWidth
// const canvasHeight = window.innerHeight
const canvasWidth = 600
const canvasHeight = 600
const bgCol = [51,30,200]
const mountainColor = [90,60,20]
const moonColor = [200,120,170]
const moonSize = 500
const boxSize = 10
const cols = canvasWidth/2
const rows = 20
let mountainPoints
let mountainPointsThreeDee = []

let scale = 0.01;
let start = 0;
let scrollVal = -canvasHeight * 5



function setup() {
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  
  makeMountainPointsThreeDee2()
  //mountainPointsThreeDee = makeMountainPointsThreeDee()
  console.log(mountainPointsThreeDee)
  translate(-canvasWidth, -canvasHeight)
  rotateX(-PI/3);
  drawMountainsThreeDee2()
}

function draw() {
  background(bgCol);
  //ambientLight(bgCol);
  angleMode(DEGREES)
  push()
    
    translate(0,-canvasHeight,-4000)
    rotateX(scrollVal/10)
    rotateY(scrollVal/12)
    rotateZ(scrollVal/15)

    //drawMoon()
    drawMoonSphere()
  pop()
  push()
    rotateX(90);
    //translate(-canvasWidth * 2, -canvasHeight, -2000)
    translate(-canvasWidth * 5.25, -canvasHeight * 6, canvasHeight/4);
    //drawMountain(mountainPoints)
    drawMountainsThreeDee2()
    translate(canvasWidth * 5.5, 0, 0);
    //drawMountain(mountainPoints)
    drawMountainsThreeDee2()
    //drawMountainThreeDee()
  pop()
  push()
    translate(0, canvasHeight/2 , 0)
    //translate(0, -canvasHeight * 2 + scrollVal,10)
    rotateX(86)
    drawGround()
  pop()
  push()
  translate(0, canvasHeight/2 , 0)
  rotateX(95)
  drawRoad()
  pop()
  scrollVal+=10
  // start += inc;
}

const makeMountainPoints = () => {
  const xoff = start;
  const mountainPoints = Array.from({length: canvasWidth * 4}, (el, i) => {
      const x = i
      const y = noise(i * scale) * canvasHeight;
      return {
        x, y
      }
  })
  return mountainPoints
}

// const makeMountainPointsThreeDee = () => {
//   const terrain = Array.from({length: canvasWidth}, (el, rowCount) => {
//       const cols = Array.from({length: canvasHeight}, (el, colCount) => {
//           const x = rowCount
//           const y = colCount
//           const z = map(noise(rowCount * 0.1, colCount * 0.1), 0, 1, -100, 100)
//           // console.log(x,y,z)
//         return {
//           x, y, z
//         }
//       })
//       return cols
//   })
//   return terrain
// }


function makeMountainPointsThreeDee2(){
  let xoff = 0
  let yoff = 0
  
  for(let x = 0; x< cols; x++){
    mountainPointsThreeDee[x] = []
  }
  for(let y= 0; y < rows; y++){
      for(let x = 0; x < cols; x++){
        mountainPointsThreeDee[x][y] = map(noise(xoff, yoff), 0, 1, -400, 400);
          xoff+=0.02
      }
      yoff+=0.02
  }
}




function drawMountain(){  
  strokeWeight(7)
  stroke(mountainColor)
  fill(bgCol)
  beginShape();
    mountainPoints.forEach(point => {
      vertex(point.x, point.y)
    })
  endShape();
}

function drawMountainsThreeDee2(){
  for (var y = 0; y < rows-1; y++) {
      //beginShape(TRIANGLE_STRIP);
      for (var x = 0; x < cols; x++) {
        push();
        translate(x*boxSize, y*boxSize, mountainPointsThreeDee[x][y]);
        fill(mountainColor)
        box(boxSize, boxSize * 4, boxSize * 10);
        pop();
        //vertex(x*scl, y*scl, terrain[x][y]);
        //vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
      }
      //endShape();
    }
}



// function  drawMountainThreeDee(){
//     mountainPointsThreeDee.forEach((point) => {   
//       console.log(point) 
//       translate(point.x * boxSize, point.y * boxSize, point.z)
//       box(boxSize)
//     })
// }

function drawMoon(){
  stroke(200)
  strokeWeight(100)
  fill(moonColor)
  ellipse(0,0,moonSize)
}

function drawMoonSphere(){
  emissiveMaterial(moonColor)
  //fill(moonColor)
  // noStroke()
  sphere(400)
}

function drawGround(){
  push()
  translate(-canvasWidth * 5, 0 , 0)
  fill(mountainColor)
  rect(-canvasWidth, -canvasHeight * 6, canvasWidth * 10, canvasHeight * 8)
  pop()
  drawRoad()
}




function drawRoad(){
  push()
  translate(0, -canvasHeight * 6,10)
  fill(0)
  rect(-100,0,200,10000)
  fill(255)
  push()
  translate(0,scrollVal + canvasHeight * 2,20)
  noStroke()
  for(let i = 0; i < 1000; i++){
      rect(0, 120 * i, 10,60)
  }
  pop()
  pop()
}
