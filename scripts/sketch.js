function setup() {}
function draw()  {}

APPLICATION.registerInitializedListener(function (){
    SKETCH.redraw();
    CONTROLS.reset();
    draw = drawAfterAppInitialized;
});

function drawAfterAppInitialized(){
    SKETCH.drawTiled();
}

function keyPressed(){
    let action = SETTINGS.handleKeyPress(keyCode);
    if(action === SETTINGS.action.redraw){
        SKETCH.redraw();
        return;
    }
    if(action === SETTINGS.action.save){
        SKETCH.exportPNG();
        return;
    }
}

function getSketch(settings){
    return {

        _parent : "sketch-board",
        _canvas : null,

        // To draw a tiled pattern based on the pattern generated in the square
        drawTiled : function(){
            let sizeOfEachSquare = settings.canvasSize / settings.patternCount;
            for (var i = 0; i < settings.patternCount; i++) {
                let startX = i*sizeOfEachSquare;
                for(var j = 0; j < settings.patternCount; j++){
                    let startY = j*sizeOfEachSquare;
                    settings.currentGenerator()(startX, startY, sizeOfEachSquare, sizeOfEachSquare, settings.complexity);   
                }
            }
            noLoop();
        },

        // Fill a random color for all subsequent shapes created using p5 in the canvas
        fillRandomColor : function(){
            fill(random(settings.hue), random(settings.sat), random(settings.bri));
        },

        // Redraw the canvas once.
        redraw : function(){
            colorMode(HSB);
            this._canvas = createCanvas(settings.canvasSize, settings.canvasSize);
            this._canvas.parent(this._parent);
            noStroke();
            loop();
        },

        // Export canvas to file as PNG
        exportPNG : function(){
            saveCanvas('image', 'png');
        },
    }
}