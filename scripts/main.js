/*Globals - The only set of globals coming from THIS app*/

var APPLICATION = {
    registerInitializedListener : function(callback){
        this.onApplicationInitialized = callback;
    }
};  

var UTIL;                // General purpose utils

var SETTINGS;            // Current settings for this sketch

var SKETCH;              // var pertaining to sketch
var CONTROLS;            // to control sketch parameters

var ALL_PATTERN_SCRIPTS; // All scripts to be loaded
var LOADED_GENERATORS;   // TODO

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
    .script("scripts/controls.js")
    .script("scripts/helper/utils.js").wait(function(){
        UTIL = getUtil(); 
    })
    .script("scripts/helper/settings.js").wait(function(){
        SETTINGS = getAppSettings();
    })
    .script("scripts/sketch.js").wait(function(){
        SKETCH = getSketch(SETTINGS);
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
    }).wait()
    .script("https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/p5.js").wait()
    .script("https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.dom.js").wait(function(){
        APPLICATION.onApplicationInitialized();
    })
;
