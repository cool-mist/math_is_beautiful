function Logger(loggerName){
	this.name   = loggerName;
	this.timers = [];
}
Logger.prototype.info = function(msg) {
	console.info("[INFO] [" + this.name + "]" + msg);
};
Logger.prototype.error = function(msg) {
	console.error("[ERROR] ["  + this.name + "]" + msg);
};
Logger.prototype.debug = function(msg) {
	console.debug("[DEBUG] ["  + this.name + "]" + msg);
};
Logger.prototype.time = function(name){
	if(this.timers.name !== undefined && this.timers.name[0] !== "end"){
		this.error("Timer already defined and running");
		return;
	}
	this.timers.name = ["start", performance.now()];
}
Logger.prototype.timeEnd = function(name) {
	if(this.timers.name === undefined){
		this.error("Timer " + name + "is not yet started");
		return;
	}
	this.timers.name = ["end", (performance.now() - this.timers.name[1])]
	return this.timers.name[1];
};