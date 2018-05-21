function sierpinskiCarpetGenerator(x, y, w, h, complexity){
	rectMode(CENTER);
	fillRandomColor();
	rect(x + w / 2, y + h / 2, w, h);
	sierpinskiCarpet(x, y, w, h, complexity);
}

function sierpinskiCarpet(x, y, w, h, depth){
	
	fillRandomColor();

	let xmid = mid(x, x + w);
	let ymid = mid(y, y + h)
	rect(xmid, ymid, w/3, h/3);

	if(depth <= 1){
		return;
	}

	sierpinskiCarpet(x             , y, w / 3, h / 3, depth - 1);
	sierpinskiCarpet(x + w / 3     , y, w / 3, h / 3, depth - 1);
	sierpinskiCarpet(x + 2 * w / 3 , y, w / 3, h / 3, depth - 1);

	sierpinskiCarpet(x             , y + h / 3, w / 3, h / 3, depth - 1);
	sierpinskiCarpet(x + 2 * w / 3 , y + h / 3, w / 3, h / 3, depth - 1);

	sierpinskiCarpet(x             , y + 2 * h / 3, w / 3, h / 3, depth - 1);
	sierpinskiCarpet(x + w / 3     , y + 2 * h / 3, w / 3, h / 3, depth - 1);
	sierpinskiCarpet(x + 2 * w / 3 , y + 2 * h / 3, w / 3, h / 3, depth - 1);
}