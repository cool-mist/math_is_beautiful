function drawUsingSerpinskiTriangleGenerator(Settings){
    let sizeOfEachSquare = Settings.canvasSize / Settings.numSquares;
    for (var i = 0; i < Settings.numSquares; i++) {
        let startX = i*sizeOfEachSquare;
        for(var j = 0; j < Settings.numSquares; j++){
            let startY = j*sizeOfEachSquare;
            multiTriangle(startX, startY, sizeOfEachSquare, sizeOfEachSquare, Settings.maxDepth);   
        }
    }
}

function multiTriangle(x, y, w, h, depth){
    sierpinskiTriangle(x    , y    , x + w, y    , x + w / 2, y + h / 2, depth);
    sierpinskiTriangle(x    , y    , x    , y + h, x + w / 2, y + h / 2, depth);
    sierpinskiTriangle(x + w, y    , x + w, y + h, x + w / 2, y + h / 2, depth);
    sierpinskiTriangle(x    , y + h, x + w, y + h, x + w / 2, y + h / 2, depth);
}

function sierpinskiTriangle(x1, y1, x2, y2, x3, y3, depth){
    fillRandomColor();

    triangle(x1, y1, x2, y2, x3, y3);
    cutTriangles(x1, y1, x2, y2, x3, y3, depth);
}

function cutTriangles(x1, y1, x2, y2, x3, y3, depth){

    if(depth <= 0){
        return;
    }

    fillRandomColor();
    let x12 = mid(x1, x2);
    let x23 = mid(x2, x3);
    let x13 = mid(x1, x3);
    let y12 = mid(y1, y2);
    let y23 = mid(y2, y3);
    let y13 = mid(y1, y3);
    triangle(x12, y12, x23, y23, x13, y13);

    cutTriangles(x1, y1, x12, y12, x13, y13, depth-1);
    cutTriangles(x12, y12, x2, y2, x23, y23, depth-1);
    cutTriangles(x13, y13, x23, y23, x3, y3, depth-1);
}

function mid(x1, x2){
    return (x1 + x2)/2;
}

function fillRandomColor(){
    fill(random(Settings.hue), random(Settings.sat), random(Settings.bri));
}