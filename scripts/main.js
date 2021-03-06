let LOGGER = new Logger("Main");

LOGGER.info("--- Math is Beautiful");
LOGGER.info("--- Collection of interesting geometries, inspired by nature, powered by math and p5js(https://p5js.org/)");
LOGGER.info("--- https://github.com/cool-mist/math_is_beautiful");

/* 
Register generators (GeneratorDefinition) with APPLICATION 

A recursive generator function must be of the form function(x, y, w, h, complexity)
All measurements from canvas area top-left

x : x coordinate of draw area 
y : y coordinate of draw area
w : width of draw area
h : height of draw area
complexity : complexity of the pattern

*/
let APPLICATION = new Application();

let UTIL      = APPLICATION._util;
let SETTINGS  = APPLICATION._settings; //Current settings


// APPLICATION.queueGenerator(new GeneratorDefinition("example.js" , "exampleGenerator"))    ; // Example generator

APPLICATION.queueGenerator(new GeneratorDefinition("sierpinskiTriangle.js", "sierpinskiTriangleGenerator")); // https://en.wikipedia.org/wiki/Sierpinski_triangle
APPLICATION.queueGenerator(new GeneratorDefinition("sierpinskiCarpet.js"  , "sierpinskiCarpetGenerator"))  ; // https://en.wikipedia.org/wiki/Sierpinski_carpet
APPLICATION.queueGenerator(new GeneratorDefinition("heighwayDragon.js"    , "heighwayDragonGenerator"))    ; //http://ecademy.agnesscott.edu/~lriddle/ifs/heighway/heighway.htm


APPLICATION.init();

/* p5 global functions */
function setup()      { APPLICATION.setup(); }
function draw()       { APPLICATION.draw(); }
function keyPressed() { APPLICATION.keyPressed(keyCode); }