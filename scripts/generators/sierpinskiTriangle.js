function sierpinskiTriangleGenerator(x, y, w, h, complexity){
    sierpinskiTriangle(x    , y    , x + w, y    , x + w / 2, y + h / 2, complexity);
    sierpinskiTriangle(x    , y    , x    , y + h, x + w / 2, y + h / 2, complexity);
    sierpinskiTriangle(x + w, y    , x + w, y + h, x + w / 2, y + h / 2, complexity);
    sierpinskiTriangle(x    , y + h, x + w, y + h, x + w / 2, y + h / 2, complexity);
}

function sierpinskiTriangle(x1, y1, x2, y2, x3, y3, depth){
    SKETCH_UTIL.fillRandomColor();

    triangle(x1, y1, x2, y2, x3, y3);
    cutTriangles(x1, y1, x2, y2, x3, y3, depth);
}

function cutTriangles(x1, y1, x2, y2, x3, y3, depth){

    if(depth <= 1){
        return;
    }

    SKETCH_UTIL.fillRandomColor();
    let x12 = UTIL.mid(x1, x2);
    let x23 = UTIL.mid(x2, x3);
    let x13 = UTIL.mid(x1, x3);
    let y12 = UTIL.mid(y1, y2);
    let y23 = UTIL.mid(y2, y3);
    let y13 = UTIL.mid(y1, y3);
    triangle(x12, y12, x23, y23, x13, y13);

    cutTriangles(x1, y1, x12, y12, x13, y13, depth-1);
    cutTriangles(x12, y12, x2, y2, x23, y23, depth-1);
    cutTriangles(x13, y13, x23, y23, x3, y3, depth-1);
}