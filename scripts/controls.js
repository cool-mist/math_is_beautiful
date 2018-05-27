function Controls(application){
	this._application = application;
	this._settings    = application._settings;
	this._generators  = application._loadedDefinitions;
}

Controls.prototype._parent = "control-panel";

Controls.prototype.keyPressed = function(keyCode){
    if(keyCode === this._settings.saveImage){
        this._application.exportPNG();
        return;

    } else if(keyCode === this._settings.newImage){
        // No action
    } else if(keyCode === this._settings.nextGenerator){
        this._application.selectNextGenerator();
        this._settings.reset();

    }else if(keyCode === this._settings.incrementComplexity){
        this._settings.modifyComplexity(1);

    }else if(keyCode === this._settings.decrementComplexity){
        this._settings.modifyComplexity(-1);

    } else if(keyCode === this._settings.incrementPatternCount){
        this._settings.modifyPatternCount(1);

    }else if(keyCode === this._settings.decrementPatternCount){
        this._settings.modifyPatternCount(-1);

    }else{
        return; // Not a valid event that I can handle
    }

    this._application.redraw();
    this.updateWidgets();
};

Controls.prototype.updateWidgets = function(){
    this._generatorName._active.selected(this._generators[this._application._currentGenerator].name);
    this._complexity._active.value(this._settings.complexity);
    this._size._active.value(this._settings.patternCount);
}

Controls.prototype.reset = function(){
	this._settings.reset();

    createGeneratorNameWidget(this);
    createComplexityWidget(this);
    createSizeWidget(this);

    function createGeneratorNameWidget(controls){
        if(controls._generatorName !== undefined){
            controls._generatorName.remove();
        } 
        controls._generatorName = createWidgetContainer(); 

        let widget = createSelect();
        for (var i = 0; i < controls._generators.length; i++) {
            widget.option(controls._generators[i].name);
            if(i === controls._application._currentGenerator){
                widget.selected(controls._generators[i].name);
            }
        }
        
        widget.changed(function(){
            let application = controls._application;
            application.selectGeneratorByName(this.selected());
            application._settings.reset();
            controls.reset();
            application.redraw();
        });

        let newImg = createButton("New");
        newImg.mouseClicked(function(){
            controls.keyPressed(controls._settings.newImage);
        });

        let next = createButton("Next");
        next.mouseClicked(function(){
            controls.keyPressed(controls._settings.nextGenerator);
        });

        controls._generatorName._active = widget;
        widget.parent(controls._generatorName);
        newImg.parent(controls._generatorName);
        next.parent(controls._generatorName);
    }

    function createComplexityWidget(controls){
        if(controls._complexity !== undefined){
            controls._complexity.remove();
        }
        controls._complexity = createWidgetContainer(); 

        let widget = createSlider(controls._settings.minComplexity, controls._settings.maxComplexity, controls._settings.complexity, 1);
        let help   = createSpan("Complexity");

        widget.changed(function(){
            controls._settings.setComplexity(this.value());
            controls._application.redraw();
        });

        controls._complexity._active = widget;
        widget.parent(controls._complexity);
        help.parent(controls._complexity);
    }


    function createSizeWidget(controls){
        if(controls._size != undefined){
            controls._size.remove();
        }
        controls._size = createWidgetContainer();

        let widget = createSlider(controls._settings.minPatternCount, controls._settings.maxPatternCount, controls._settings.patternCount, 1);
        let help   = createSpan("Size");

        controls._size._active = widget;
        widget.parent(controls._size);
        help.parent(controls._size);

    }

    function createWidgetContainer(){
        let div = createDiv();
        div.class("widget");
        div.parent("control-panel");

        return div;
    }
}