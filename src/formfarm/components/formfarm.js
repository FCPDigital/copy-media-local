function createElFromString(pattern){
	var el = document.createElement("fragment");
	el.innerHTML = pattern;
	return el.childNodes[0];
}


/*****************************************$
*
*
*			Form Alert
*
*
*******************************************/

function FormAlert(formElement){
	this._display = false;
	this.parent = formElement;


	this.el = createElFromString(`<div class="form__alert">
		<span class="form__alert-content"></span>
		</div>`);
	this.content = this.el.querySelector(".form__alert-content");
	this.el.id = "alert-"+this.parent.el.name;
	this.content.innerHTML = this.parent.alert;
	this.parent.el.parentNode.appendChild(this.el);
}

FormAlert.prototype = {
	get display(){
		return this._display;
	},

	set display(value){
		if( !value ){
			this._display = false;
			this.el.className = this.el.className.replace(/\s?form__alert\-\-display/, "");
		} else if( !this.el.className.match("form__alert--display")) {
			this._display = true;
			this.el.className += " form__alert--display";
		}
	}
}


/*****************************************$
*
*
*			Form Element
*
*
*******************************************/

function FormInput(el) {
	this.el = el;
	this.type = el.getAttribute("type");
	this.required = this.el.getAttribute("required") && this.el.getAttribute("required") != "false" ? true : false;
	this.pattern = this.el.getAttribute("pattern") ? this.el.getAttribute("pattern") : this.defaultPattern;
	this.alert = el.getAttribute("data-alert");
	this.initEvents();
	this.alertLabel = new FormAlert(this);
}

FormInput.prototype = {
	set alert(value){ this._alert = value ? value : "Champs incomplet"; },
	get alert(){ return this._alert; },

	get warning(){
		return this._warning;
	},

	set warning(value){
		if(value){
			console.log("Display")
			this.alertLabel.display = true;
		}

		if(!value){
			console.log("Hide")
			this.alertLabel.display = false;
		}

		this._warning = value;
	},

	get defaultPattern(){
		switch(this.type){
			case "email" : return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/; break;
			case "tel": return /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/; break;
			default :  return null;
		}
	},

	get isValid() {
		this.update();
		if(this.required) {
			if( this.pattern && !this.value.match(this.pattern) ) return false;
			if( this.value == "" || this.value == null ) return false;
		}
		return true;
	},

	update: function(){
		this.value = this.el.value;
	},

	initEvents: function(){
		this.el.addEventListener("change", this.update.bind(this), false)
		this.el.addEventListener("input", this.update.bind(this), false)
	}
}


/*****************************************$
*
*
*			Form Select
*
*
*******************************************/

function FormSelect(el){
	this.initPattern();
	this.type = "select";
	this.options = [];
	this._display = false;
	this.customEl = createElFromString(this.pattern);
	this.customTitle = this.customEl.querySelector(".select-custom__title");
	this.customList = this.customEl.querySelector(".select-custom__list");
	this.customArrow = this.customEl.querySelector(".select-custom__ico-down");
	this.initEvent();


	var options = el.querySelectorAll("option");
	for(var i=0; i<options.length; i++){
		this.setOption(options[i], i);
	}

	this.el = el;
	this.el.style.display = "none";
	this.el.parentNode.insertBefore(this.customEl, this.el);
	this.customTitleValue = this.el.getAttribute("data-title") ? this.el.getAttribute("data-title") : "Sélectionnez votre choix" ;
	this.customTitle.innerHTML = this.customTitleValue;
}


FormSelect.prototype = {

	setOption: function(el, rank){
		var self = this;
		var option = {
			el: el,
			rank: rank,
			value: el.getAttribute("value"),
			display: el.innerHTML,
			customEl: createElFromString(this.optionPattern)
		};

		option.customEl.querySelector(".select-custom__item-title").innerHTML = option.display;
		this.customList.appendChild(option.customEl);

		option.customEl.addEventListener("click", function(e){
			self.setCurrent(option);
			e.stopPropagation();
		})

		this.options.push(option);
	},

	toggle: function(){
		if( this.display ){
			this.display = false;
		} else {
			this.display = true;
		}
	},

	set display(display){
		this._display = display ? true : false;

		if( this._display === true && !this.customEl.className.match("list-open")) {
			this.customEl.className += " list-open"
			this.customList.style = "max-height: "+this.options.length*this.customEl.offsetHeight+"px;";
		} else {
			this.customEl.className = this.customEl.className.replace(/\s?list\-open/, '');
			this.customList.style = "";
		}
 	},

	get display(){
		return this._display;
	},


	get isValid() {
		// this.update();
		// if(this.required) {
		// 	if( this.pattern && !this.value.match(this.pattern) ) return false;
		// 	if( this.value == "" || this.value == null ) return false;
		// }
		return true;
	},


	initPattern: function(){
		this.pattern = `<div class='select-custom'>
			<div class='select-custom__title-container'>
				<p class='select-custom__title'>Sélectionnez votre choix</p>
				<a href="#" class="select-custom__ico-down"></a>
			</div>
			<div class='select-custom__list'>
			</div>
		</div>`;
		this.optionPattern = `<div class="select-custom__item">
			<p class="select-custom__item-title"></p>
		</div>`;
	},


	setCurrent: function(option){
		if( this.current ){
			this.current.customEl.className = this.current.customEl.className.replace(/\s?select\-custom__item\-\-selected/, "");
		}
		this.el.selectedIndex = option.rank;
		this.customTitle.innerHTML = option.display;
		this.current = option;
		this.current.customEl.className += " select-custom__item--selected";
		this.display = false;
	},

	initEvent: function() {
		var self = this;
		this.customTitle.addEventListener("click", function(){
			self.toggle();
		})
		this.customArrow.addEventListener("click", function(){
			self.toggle();
		})
		this.customEl.addEventListener("click", function(event){
			if (event.stopPropagation) {
			  event.stopPropagation();
			}
			event.cancelBubble = true;
			console.log("Hello from custom el")
		})
		window.addEventListener("click", function(){
			console.log("Hello from world")
			self.display = false;
		})
	}

}



/*****************************************$
*
*
*			Form
*
*
*******************************************/


function Form(arg) {
	this.AVAILABLE_TYPE = ["text", "number", "email", "password", "tel", "checkbox", "radio", "textarea", "select", "hidden", "button"];
	this.AVAILABLE_METHOD = ['GET', 'POST', 'PUT', 'PATCH'];

	this.fields = [];
	this._action = null;
	this._id = null;
	this._method = "POST";
	this.hasError = false;

	this.fromNode(arg);
	this.initEvents();
}


Form.prototype = {

	fromNode(el) {


		this.el = el;
		this.id = el.getAttribute("id");
		this.action = el.getAttribute("action");
		this.method = el.getAttribute("method") ? el.getAttribute("method") : "GET";
		this.el.setAttribute("novalidate", "novalidate")
		this.getFields();
	},

	fromParam(args) {
		this.el = document.createElement("form");
		this.id = args.id;
		this.action = args.action;
		this.method = args.method;
	},

	get isValid(){
		var valid = true;
		for(var i=0; i<this.fields.length; i++){
			if( this.fields[i].isValid ){
				console.log(this.fields[i].el + " est valide")
				this.fields[i].warning = false
			} else {
				console.log(this.fields[i].el + " n'est pas valide")
				this.fields[i].warning = true
				valid = false;
			}
		}
		return valid;
	},


	// Action
	set action(value) {
		if( value && value instanceof String ){
			this._action = value
		} else {
			console.warn("Action is not defined or is null");
		}
	},

	get action() {
		return this._action;
	},

	// Id
	set id(value) {
		if( value ){
			this._id = value;
		} else {
			console.warn("Id is not defined or is null");
		}
	},

	get id() {
		return this._id;
	},

	// Method
	set method(value){
		if( value &&  this.AVAILABLE_METHOD.indexOf(value) >= 0 ) {
			this._method = value;
		} else {
			console.warn("Method is not defined or is null of not available");
		}
	},

	get method(){
		return this._method
	},


	getFields: function() {
		var elements = this.el.querySelectorAll("input, textarea, select, output");
		for(var i=0; i<elements.length; i++){
			var constructor = FormInput;

			switch(elements[i].tagName) {
				case "INPUT" : constructor = FormInput; break;
				case "SELECT" : constructor = FormSelect; break;
				case "TEXTAREA" : constructor = FormInput; break;
				default: constructor = null;
			}

			if ( constructor) this.fields.push(new constructor(elements[i]));
		}
	},


	initEvents: function(){
		var self = this;
		this.el.addEventListener("submit", function(e){


			if( self.isValid ){
				return true;
			}
			e.preventDefault();
		}, false)
	}

}


/*****************************************$
*
*
*			Manager
*
*
*******************************************/

var FormFarm = {
	forms: [],
	init: function(){
		var forms = document.querySelectorAll("form");
		for(var i=0; i<forms.length; i++){
			this.forms.push(new Form(forms[i]));
		}
	}
}


export default FormFarm;
