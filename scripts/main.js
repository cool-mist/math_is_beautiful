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

var APPLICATION = new Application();

var UTIL      = APPLICATION._util;
var SETTINGS  = APPLICATION._settings; //Current settings
var CONTROLS;                            // to control sketch parameters @controls.js :TODO

APPLICATION.register(new GeneratorDefinition("sierpinskiTriangle.js", "sierpinskiTriangleGenerator")); // https://en.wikipedia.org/wiki/Sierpinski_triangle
APPLICATION.register(new GeneratorDefinition("sierpinskiCarpet.js"  , "sierpinskiCarpetGenerator"))  ; // https://en.wikipedia.org/wiki/Sierpinski_carpet

APPLICATION.init();

function setup()      { APPLICATION.setup(); }
function draw()       { APPLICATION.draw(); }
function keyPressed() { APPLICATION.keyPressed(keyCode); }