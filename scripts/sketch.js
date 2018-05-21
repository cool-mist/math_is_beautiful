function setup() {
    SKETCH_UTIL.redraw();
}

function draw() {
    SKETCH_UTIL.drawTiled();
}

function keyPressed(){
    let action = SETTINGS.handleKeyPress(keyCode);
    if(action === SETTINGS.action.redraw){
        SKETCH_UTIL.redraw();
        return;
    }
    if(action === SETTINGS.action.save){
        SKETCH_UTIL.exportPNG();
        return;
    }
}