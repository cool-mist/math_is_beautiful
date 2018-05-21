function getSketchUtil(settings){
    return {

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
            createCanvas(settings.canvasSize, settings.canvasSize);
            noStroke();
            loop();
        },

        // Export canvas to file as PNG
        exportPNG : function(){
            saveCanvas('image', 'png');
        },
    }
}


/*General purpose util methods*/
function getUtil(){
    return {
        mid : function(x1, x2){
            return (x1 + x2)/2;
        },

        boundedIncrement : function (val, increment, min, max){
            val += increment;
            
            if(val <= min){
                return min;
            }

            if(val >= max){
                return max;
            }

            return val;
        } 
    }
}