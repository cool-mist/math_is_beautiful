function mid(x1, x2){
    return (x1 + x2)/2;
}

function fillRandomColor(){
    fill(random(Settings.hue), random(Settings.sat), random(Settings.bri));
}

function boundedIncrement(val, increment, min, max){
	val += increment;
	
	if(val <= min){
		return min;
	}

	if(val >= max){
		return max;
	}

	return val;
}