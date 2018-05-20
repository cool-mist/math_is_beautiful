function setup() {
    resetBoard();
}

function draw() {
    drawWithCurrentSettings(Settings);
    noLoop();
}

function drawWithCurrentSettings(Settings){
    let sizeOfEachSquare = Settings.canvasSize / Settings.patternCount;
    for (var i = 0; i < Settings.patternCount; i++) {
        let startX = i*sizeOfEachSquare;
        for(var j = 0; j < Settings.patternCount; j++){
            let startY = j*sizeOfEachSquare;
            Settings.generator(startX, startY, sizeOfEachSquare, sizeOfEachSquare, Settings.depth);   
        }
    }
}

function keyPressed(){
    if(isSaveCanvasToPNG(Settings, keyCode)){
        savePNG();
        return;
    }

    if(isGenerateNewImage(Settings, keyCode)){
        resetBoard();
        return;    
    }

    if(Settings.handleKeyPress(keyCode)){
        resetBoard();
        return;
    }
}

function isGenerateNewImage(Settings, keyCode){
    return keyCode === Settings.newImage;
}

function resetBoard(){
    Settings.init();
    createCanvas(Settings.canvasSize, Settings.canvasSize);
    noStroke();
    loop();
}


function isSaveCanvasToPNG(Settings, keyCode){
    return keyCode === Settings.saveImage;
}

function savePNG(){
    saveCanvas(Settings.generator, 'png');
}