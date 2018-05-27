function heighwayDragonGeneratorSettings(){
    return {
        maxComplexity : 16,
        maxSize : 2,
    }
}

function heighwayDragonGenerator(x, y, width, height, depth){
    depth = map(depth, SETTINGS.minComplexity, SETTINGS.maxComplexity, 1, 16);
    fillBackground();
    rect(x, y, width, height);

    push();
    _heighwayDragonGenerator(x + width / 5, y , width, height, depth, color(0));
    pop();

    push();
    _heighwayDragonGenerator(x + width / 5, y + height / 2, width, height, depth, color(80));
    pop();
}

function _heighwayDragonGenerator(x, y, width, height, depth, color){
    
    triangle(x , y + height / 2 , x + width / 2, y, x + width, y + height / 2);
    translate(x, y + height / 2);
    push();
    heighwayDragon(width, depth, color);
    pop();
}

function heighwayDragon(baseLength, depth, color){
    if(depth <= 0){
        return;
    }

    fillBackground();
    triangle(0, 0, baseLength / 2, -(baseLength / 2), baseLength / 2, 0);
    push();

    let newBaseLength = baseLength / sqrt(2);
    rotate(- PI / 4);
    fill(color);
    triangle(0, 0, newBaseLength, 0, newBaseLength / 2, -(newBaseLength / 2));
    heighwayDragon(newBaseLength, depth - 1, color);
    pop();

    push();
    translate(baseLength , 0);
    rotate(- 3 * PI / 4);
    fill(color);
    triangle(0, 0, newBaseLength, 0, newBaseLength / 2, -(newBaseLength / 2));
    heighwayDragon(newBaseLength, depth - 1, color);
    pop();  
}

let fillBackground = function(){
    fill(120);
};