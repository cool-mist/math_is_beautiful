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
    if(Settings.generator === "triangle"){
        drawUsingSerpinskiTriangleGenerator(Settings);
    } 
}

function keyPressed(){
    if(isGenerateNewImage(Settings, keyCode)){
        drawOnce();    
    }
    if(isSaveCanvasToPNG(Settings, keyCode)){
        savePNG();
    } 
}

function isGenerateNewImage(Settings, keyCode){
    return keyCode === Settings.newImage;
}

function isSaveCanvasToPNG(Settings, keyCode){
    return keyCode === Settings.saveImage;
}

function drawOnce(){
    redraw();
}

function savePNG(){
    saveCanvas(Settings.generator, 'png');
}