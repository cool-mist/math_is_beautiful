function setup() {
    colorMode(HSB);
    createCanvas(Settings.canvasSize, Settings.canvasSize);
    background(random(255));
    noStroke();
}

function draw() {
    drawWithCurrentSettings(Settings);
    noLoop();
}

function drawWithCurrentSettings(Settings){
    let sizeOfEachSquare = Settings.canvasSize / Settings.numSquares;
    for (var i = 0; i < Settings.numSquares; i++) {
        let startX = i*sizeOfEachSquare;
        for(var j = 0; j < Settings.numSquares; j++){
            let startY = j*sizeOfEachSquare;
            Settings.generator(startX, startY, sizeOfEachSquare, sizeOfEachSquare, Settings.maxDepth);   
        }
    }
}

function keyPressed(){
    if(isGenerateNewImage(Settings, keyCode)){
        drawOnce();    
    }
    if(isSaveCanvasToPNG(Settings, keyCode)){
        savePNG();
    } 
    if(isSelectNextGenerator(Settings, keyCode)){
        selectNextGenerator(Settings);
    }
}

function isGenerateNewImage(Settings, keyCode){
    return keyCode === Settings.newImage;
}

function drawOnce(){
    redraw();
}


function isSaveCanvasToPNG(Settings, keyCode){
    return keyCode === Settings.saveImage;
}

function savePNG(){
    saveCanvas(Settings.generator, 'png');
}

function isSelectNextGenerator(Settings, keyCode){
    return keyCode === Settings.nextGenerator;
}

function selectNextGenerator(Settings){
    Settings.nextGen();
    redraw();
}