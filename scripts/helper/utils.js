/*General purpose util methods*/
function Util(settings){
    this._logger   = new Logger("Utils");
    this._settings = settings;    
}

Util.prototype.mid = function(x1, x2){
    return (x1 + x2)/2;
};

Util.prototype.boundedIncrement = function (val, increment, min, max){
    val += increment;
    
    if(val <= min){
        return min;
    }

    if(val >= max){
        return max;
    }

    return val;
};

Util.prototype.loadScript = function (url, callback){
    let script = document.createElement('script');
    let logger = this._logger;
    script.onload = function(){
        logger.debug("Loaded " + url);
        callback(url);
    };
    script.src = url;
    document.getElementsByTagName('html')[0].append(script);
};

/*Fill a random color for all subsequent shapes created using p5 in the canvas*/
Util.prototype.fillRandomColor = function(){
    fill(random(this._settings.hue), random(this._settings.sat), random(this._settings.bri));
}