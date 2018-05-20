/* 
Registered generators 

A recursive generator function must be of the form generatorFunction(x, y, w, h, depth)
All measurements from canvas area top-left

x : x coordinate of draw area 
y : y coordinate of draw area
w : width of draw area
h : height of draw area
depth : recursion depth

*/

Settings.register(sierpinskiTriangleGenerator);
Settings.register(sierpinskiCarpetGenerator);


Settings.init();