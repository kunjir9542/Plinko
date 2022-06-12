
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Constraint = Matter.Constraint;
const Runner= Matter.Runner;
const Bounds=Matter.Bounds;
const Events=Matter.Events;


const drawBody = Helpers.drawBody;
const drawMouse = Helpers.drawMouse;
const drawConstraint = Helpers.drawConstraint;

let engine;
let ground;

let plinkoWall, plinkoWall2, plinkoWallAngle, plinkoWallAngle2;

let spinnyStuff, spinnyStuff2, spinnyStuff3;
let constraint, constraint2, constraint3;

let squares = [];
let balls = [];

function setup() {
  const canvas = createCanvas(0, 0);

  // create an engine
  engine = Engine.create();

  render = Render.create({
    element: document.body,
    engine: engine,
    options: { 
                width: 1920, 
                height: 1080,
                wireframes: false,
            }
});
Render.run(render);

  plinkoWall = Bodies.rectangle(400, 350, 20, 600, {isStatic: true});
  World.add(engine.world, [plinkoWall]);

  plinkoWall2 = Bodies.rectangle(1200, 350, 20, 600, {isStatic: true});
  World.add(engine.world, [plinkoWall2]);

  plinkoWallAngle = Bodies.rectangle(530, 780, 400, 20, {isStatic: true, angle: 0.785398});
  plinkoWallAngle2 = Bodies.rectangle(1070, 780, 400, 20, {isStatic: true, angle: -0.785398});

  World.add(engine.world, [plinkoWallAngle]);
  World.add(engine.world, [plinkoWallAngle2]);

  spinnyStuff = Bodies.rectangle(600, 100, 200, 10);
  constraint = Constraint.create({
    pointA: {x: 600, y: 100},
    bodyB: spinnyStuff,
    stiffness: 1,
    length: 0
  });

  World.add(engine.world, [spinnyStuff, constraint]);

  spinnyStuff2 = Bodies.rectangle(1000, 100, 200, 10);
  constraint2 = Constraint.create({
    pointA: {x: 1000, y: 100},
    bodyB: spinnyStuff2,
    length: 0
  });

  World.add(engine.world, [spinnyStuff2, constraint2]);

  spinnyStuff3 = Bodies.rectangle(800, 300, 200, 10);
  constraint3 = Constraint.create({
    pointA: {x: 800, y: 300},
    bodyB: spinnyStuff3,
    length: 0
  });

  World.add(engine.world, [spinnyStuff3, constraint3]);


  for (let index = 0; index < 3; index++) {
    var rectangle = Bodies.rectangle(600 + index*200, 500, 50, 50, {
        isStatic: true,
        angle: 0.785398
    
    });


    squares.push(rectangle);
}

World.add(engine.world, squares);

for (let x = 0; x < 5; x++) {
  for(let y = 0; y < 3; y++){

    var ball = Bodies.circle(500 + 100*x, -200 - 200*y, 20);


    balls.push(ball);
  }
}

World.add(engine.world, balls);





  // setup mouse
  var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
          stiffness: 0.1,
          render: {
              visible: false
          }
      }
  });

World.add(engine.world, mouseConstraint);
  // run the engine
  Engine.run(engine);
}

function draw() {
  background(0);

  stroke(255);
  fill(255);
  renderVertices(plinkoWall);
  renderVertices(plinkoWall2);
  renderVertices(plinkoWallAngle);
  renderVertices(plinkoWallAngle2);
  renderVertices(spinnyStuff);
  renderVertices(spinnyStuff2);
  renderVertices(spinnyStuff3);

  squares.forEach(element => {
    renderVertices(element);
});

balls.forEach(element => {
  renderVertices(element);
});

  stroke(128);
  strokeWeight(2);
  drawConstraint(constraint);
  drawConstraint(constraint2);
  drawConstraint(constraint3);

  noStroke();
  fill(128);
  



  


  drawMouse(mouseConstraint);
}


function renderVertices(body){
  var verts = body.vertices;
  beginShape();
  fill(127);
  for (var i = 0; i < verts.length; i++) {
    vertex(verts[i].x, verts[i].y);
  }
  endShape();
}
