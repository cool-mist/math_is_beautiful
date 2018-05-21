/*Globals - The only set of globals coming from THIS app*/
var UTIL;                // General purpose utils
var SETTINGS;            // Current settings for this 'sketch'
var SKETCH_UTIL;         // Util functions pertaining to the canvas or 'sketch'
var ALL_PATTERN_SCRIPTS; // All scripts to be loaded

/* 
Registered generators 

A recursive generator function must be of the form scriptNameGEnerator(x, y, w, h, complexity)
All measurements from canvas area top-left

x : x coordinate of draw area 
y : y coordinate of draw area
w : width of draw area
h : height of draw area
complexity : complexity of the pattern

*/

ALL_PATTERN_SCRIPTS = [
    "sierpinskiTriangle.js", // https://en.wikipedia.org/wiki/Sierpinski_triangle
    "sierpinskiCarpet.js"  , // https://en.wikipedia.org/wiki/Sierpinski_carpet
];

// Load all required scripts
$LAB.setOptions()
    .script("scripts/helper/utils.js").wait(function(){
        UTIL = getUtil(); 
    })
    .script("scripts/helper/settings.js").wait(function(){
        SETTINGS    = getAppSettings();
        SKETCH_UTIL = getSketchUtil(SETTINGS);
    })
    .wait(function(){
        for (var i = ALL_PATTERN_SCRIPTS.length - 1; i >= 0; i--) {
            let generatorScript = ALL_PATTERN_SCRIPTS[i];
            $LAB.script("scripts/generators/" + generatorScript).wait(function(){
                let generatorName = generatorScript.substr(0, generatorScript.indexOf('.')) + 'Generator';
                let generatorFunction =  eval(generatorName);
                SETTINGS.register(generatorFunction);
            });
        }
    })
    .wait(function(){
        $LAB.script("scripts/sketch.js").wait()
            .script("https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/p5.min.js")
            .script("https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.dom.min.js")
        }
    )
;

