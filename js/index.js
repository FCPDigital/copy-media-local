(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});
function createElFromString(pattern) {
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

function FormAlert(formElement) {
	this._display = false;
	this.parent = formElement;

	this.el = createElFromString("<div class=\"form__alert\">\n\t\t<span class=\"form__alert-content\"></span>\n\t\t</div>");
	this.content = this.el.querySelector(".form__alert-content");
	this.el.id = "alert-" + this.parent.el.name;
	this.content.innerHTML = this.parent.alert;
	this.parent.el.parentNode.appendChild(this.el);
}

FormAlert.prototype = {
	get display() {
		return this._display;
	},

	set display(value) {
		if (!value) {
			this._display = false;
			this.el.className = this.el.className.replace(/\s?form__alert\-\-display/, "");
		} else if (!this.el.className.match("form__alert--display")) {
			this._display = true;
			this.el.className += " form__alert--display";
		}
	}
};

/*****************************************$
*
*
*			Form Element
*
*
*******************************************/

function FormInput(el) {
	this.el = el;
	this.type = el.getAttribute("type");
	this.required = this.el.getAttribute("required") && this.el.getAttribute("required") != "false" ? true : false;
	this.pattern = this.el.getAttribute("pattern") ? this.el.getAttribute("pattern") : this.defaultPattern;
	this.alert = el.getAttribute("data-alert");
	this.initEvents();
	this.alertLabel = new FormAlert(this);
}

FormInput.prototype = {
	set alert(value) {
		this._alert = value ? value : "Champs incomplet";
	},
	get alert() {
		return this._alert;
	},

	get warning() {
		return this._warning;
	},

	set warning(value) {
		if (value) {
			console.log("Display");
			this.alertLabel.display = true;
		}

		if (!value) {
			console.log("Hide");
			this.alertLabel.display = false;
		}

		this._warning = value;
	},

	get defaultPattern() {
		switch (this.type) {
			case "email":
				return (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
				);break;
			case "tel":
				return (/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/
				);break;
			default:
				return null;
		}
	},

	get isValid() {
		this.update();
		if (this.required) {
			if (this.pattern && !this.value.match(this.pattern)) return false;
			if (this.value == "" || this.value == null) return false;
		}
		return true;
	},

	update: function update() {
		this.value = this.el.value;
	},

	initEvents: function initEvents() {
		this.el.addEventListener("change", this.update.bind(this), false);
		this.el.addEventListener("input", this.update.bind(this), false);
	}

	/*****************************************$
 *
 *
 *			Form Select
 *
 *
 *******************************************/

};function FormSelect(el) {
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
	for (var i = 0; i < options.length; i++) {
		this.setOption(options[i], i);
	}

	this.el = el;
	this.el.style.display = "none";
	this.el.parentNode.insertBefore(this.customEl, this.el);
	this.customTitleValue = this.el.getAttribute("data-title") ? this.el.getAttribute("data-title") : "Sélectionnez votre choix";
	this.customTitle.innerHTML = this.customTitleValue;
}

FormSelect.prototype = {

	setOption: function setOption(el, rank) {
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

		option.customEl.addEventListener("click", function (e) {
			self.setCurrent(option);
			e.stopPropagation();
		});

		this.options.push(option);
	},

	toggle: function toggle() {
		if (this.display) {
			this.display = false;
		} else {
			this.display = true;
		}
	},

	set display(display) {
		this._display = display ? true : false;

		if (this._display === true && !this.customEl.className.match("list-open")) {
			this.customEl.className += " list-open";
			this.customList.style = "max-height: " + this.options.length * this.customEl.offsetHeight + "px;";
		} else {
			this.customEl.className = this.customEl.className.replace(/\s?list\-open/, '');
			this.customList.style = "";
		}
	},

	get display() {
		return this._display;
	},

	get isValid() {
		// this.update();
		// if(this.required) {
		// 	if( this.pattern && !this.value.match(this.pattern) ) return false;
		// 	if( this.value == "" || this.value == null ) return false;
		// }
		return true;
	},

	initPattern: function initPattern() {
		this.pattern = "<div class='select-custom'>\n\t\t\t<div class='select-custom__title-container'>\n\t\t\t\t<p class='select-custom__title'>S\xE9lectionnez votre choix</p>\n\t\t\t\t<a href=\"#\" class=\"select-custom__ico-down\"></a>\n\t\t\t</div>\n\t\t\t<div class='select-custom__list'>\n\t\t\t</div>\n\t\t</div>";
		this.optionPattern = "<div class=\"select-custom__item\">\n\t\t\t<p class=\"select-custom__item-title\"></p>\n\t\t</div>";
	},

	setCurrent: function setCurrent(option) {
		if (this.current) {
			this.current.customEl.className = this.current.customEl.className.replace(/\s?select\-custom__item\-\-selected/, "");
		}
		this.el.selectedIndex = option.rank;
		this.customTitle.innerHTML = option.display;
		this.current = option;
		this.current.customEl.className += " select-custom__item--selected";
		this.display = false;
	},

	initEvent: function initEvent() {
		var self = this;
		this.customTitle.addEventListener("click", function () {
			self.toggle();
		});
		this.customArrow.addEventListener("click", function () {
			self.toggle();
		});
		this.customEl.addEventListener("click", function (event) {
			if (event.stopPropagation) {
				event.stopPropagation();
			}
			event.cancelBubble = true;
			console.log("Hello from custom el");
		});
		window.addEventListener("click", function () {
			console.log("Hello from world");
			self.display = false;
		});
	}

	/*****************************************$
 *
 *
 *			Form
 *
 *
 *******************************************/

};function Form(arg) {
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
	fromNode: function fromNode(el) {

		this.el = el;
		this.id = el.getAttribute("id");
		this.action = el.getAttribute("action");
		this.method = el.getAttribute("method") ? el.getAttribute("method") : "GET";
		this.el.setAttribute("novalidate", "novalidate");
		this.getFields();
	},
	fromParam: function fromParam(args) {
		this.el = document.createElement("form");
		this.id = args.id;
		this.action = args.action;
		this.method = args.method;
	},


	get isValid() {
		var valid = true;
		for (var i = 0; i < this.fields.length; i++) {
			if (this.fields[i].isValid) {
				console.log(this.fields[i].el + " est valide");
				this.fields[i].warning = false;
			} else {
				console.log(this.fields[i].el + " n'est pas valide");
				this.fields[i].warning = true;
				valid = false;
			}
		}
		return valid;
	},

	// Action
	set action(value) {
		if (value && value instanceof String) {
			this._action = value;
		} else {
			console.warn("Action is not defined or is null");
		}
	},

	get action() {
		return this._action;
	},

	// Id
	set id(value) {
		if (value) {
			this._id = value;
		} else {
			console.warn("Id is not defined or is null");
		}
	},

	get id() {
		return this._id;
	},

	// Method
	set method(value) {
		if (value && this.AVAILABLE_METHOD.indexOf(value) >= 0) {
			this._method = value;
		} else {
			console.warn("Method is not defined or is null of not available");
		}
	},

	get method() {
		return this._method;
	},

	getFields: function getFields() {
		var elements = this.el.querySelectorAll("input, textarea, select, output");
		for (var i = 0; i < elements.length; i++) {
			var constructor = FormInput;

			switch (elements[i].tagName) {
				case "INPUT":
					constructor = FormInput;break;
				case "SELECT":
					constructor = FormSelect;break;
				case "TEXTAREA":
					constructor = FormInput;break;
				default:
					constructor = null;
			}

			if (constructor) this.fields.push(new constructor(elements[i]));
		}
	},

	initEvents: function initEvents() {
		var self = this;
		this.el.addEventListener("submit", function (e) {

			if (self.isValid) {
				return true;
			}
			e.preventDefault();
		}, false);
	}

	/*****************************************$
 *
 *
 *			Manager
 *
 *
 *******************************************/

};var FormFarm = {
	forms: [],
	init: function init() {
		var forms = document.querySelectorAll("form");
		for (var i = 0; i < forms.length; i++) {
			this.forms.push(new Form(forms[i]));
		}
	}
};

exports.default = FormFarm;

},{}],2:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(Element.prototype, 'outerWidth', {
  'get': function get() {
    var height = this.clientWidth;
    var computedStyle = window.getComputedStyle(this);
    height += parseInt(computedStyle.marginLeft, 10);
    height += parseInt(computedStyle.marginRight, 10);
    height += parseInt(computedStyle.borderLeftWidth, 10);
    height += parseInt(computedStyle.borderRightWidth, 10);
    return height;
  }
});

Object.defineProperty(Element.prototype, 'outerHeight', {
  'get': function get() {
    var height = this.clientHeight;
    var computedStyle = window.getComputedStyle(this);
    height += parseInt(computedStyle.marginTop, 10);
    height += parseInt(computedStyle.marginBottom, 10);
    height += parseInt(computedStyle.borderTopWidth, 10);
    height += parseInt(computedStyle.borderBottomWidth, 10);
    return height;
  }
});

var Carousel = function () {
  function Carousel(element) {
    var _this = this;

    _classCallCheck(this, Carousel);

    this.element = element;
    this.container = element.querySelector(".carousel__container");
    this.size = 3;
    this.interval = 3000;
    this.items = [];
    this.leftButton = this.element.querySelector(".carousel__selector--left");
    this.rightButton = this.element.querySelector(".carousel__selector--right");
    this.selectorContainer = this.element.querySelector(".carousel__selectors");

    var items = element.querySelectorAll(".carousel__item");
    items.forEach(function (item, index) {
      _this.items[index] = new CarouselItem(item, index, _this);
    });

    this.refresh();
    this.initEvents();
    window.addEventListener("resize", function () {
      _this.refresh();
    });
  }

  _createClass(Carousel, [{
    key: 'refreshTimeout',
    value: function refreshTimeout() {
      var _this2 = this;

      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        _this2.next();
      }, this.interval);
    }
  }, {
    key: 'next',
    value: function next() {
      this.items.forEach(function (item) {
        item.next();
      });
      this.refreshTimeout();
    }
  }, {
    key: 'previous',
    value: function previous() {
      this.items.forEach(function (item) {
        item.previous();
      });
      this.refreshTimeout();
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.widthSize = this.items[0].element.outerWidth;
      this.size = Math.floor(window.innerWidth / this.widthSize);
      this.widthComputed = window.innerWidth / this.size;

      this.items.forEach(function (item) {
        item.updateSizes();
        item.restorePosition();
        item.updatePosition();
      });
      this.refreshTimeout();

      if (this.isActive) {
        this.container.style.height = this.items[0].element.outerHeight + 70 + "px";
        this.element.classList.remove("carousel--disabled");
      } else {
        this.container.style.height = this.items[0].element.outerHeight + "px";
        this.element.classList.add("carousel--disabled");
      }

      console.log(this.isActive);
    }
  }, {
    key: 'initEvents',
    value: function initEvents() {
      var _this3 = this;

      this.leftButton.addEventListener("click", function () {
        _this3.previous();
      });
      this.rightButton.addEventListener("click", function () {
        _this3.next();
      });
    }
  }, {
    key: 'isActive',
    get: function get() {
      return this.size < this.items.length ? true : false;
    }
  }]);

  return Carousel;
}();

var CarouselItem = function () {
  function CarouselItem(element, index, carousel) {
    _classCallCheck(this, CarouselItem);

    this.element = element;
    this.carousel = carousel;
    this._position = index;
    this.startPosition = index;
  }

  _createClass(CarouselItem, [{
    key: 'restorePosition',
    value: function restorePosition() {
      this._position = this.startPosition;
    }
  }, {
    key: 'updatePosition',
    value: function updatePosition() {
      this.position = this._position;
    }
  }, {
    key: 'updateSizes',
    value: function updateSizes() {
      this.sizes = {
        width: this.element.outerWidth,
        height: this.element.outerHeight
      };
    }
  }, {
    key: 'next',
    value: function next() {
      if (!this.carousel.isActive) return;
      if (this.position == this.carousel.items.length - 1) {
        this.needJump = "left";
        this.position = 0;
      } else {
        this.position += 1;
      }
    }
  }, {
    key: 'previous',
    value: function previous() {
      if (!this.carousel.isActive) return;
      if (this.position == -1) {
        this.needJump = "right";
        this.position = this.carousel.items.length - 2;
      } else {
        this.position -= 1;
      }
    }
  }, {
    key: 'position',
    set: function set(position) {
      var _this4 = this;

      if (position > this.carousel.items.length - 1 || position < -1) return;
      var timeout = 0;
      if (this.needJump) {
        this.element.style.transitionDuration = "0s";
        if (this.needJump == "left") {
          this.element.style.left = -this.carousel.widthComputed + "px";
        } else {
          this.element.style.left = this.carousel.widthComputed * this.carousel.size + "px";
        }

        timeout = 30;
      }

      setTimeout(function () {

        if (_this4.needJump) {
          _this4.element.style.transitionDuration = ".6s";
        }

        _this4._position = position;
        var left = _this4._position * _this4.carousel.widthComputed + (_this4.carousel.widthComputed - _this4.carousel.widthSize) / 2;
        _this4.element.style.left = left + "px";
        _this4.element.setAttribute("data-position", position);
        _this4.needJump = false;
      }, timeout);
    },
    get: function get() {
      return this._position;
    }
  }]);

  return CarouselItem;
}();

exports.default = Carousel;

},{}],3:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
function Thumbnails(element) {
  this.element = element;
  this.items = element.querySelectorAll(".thumbnail");
  this._current = null;
}

Thumbnails.prototype = {

  get current() {
    if (this._current >= 0) {
      return this._current;
    }
    this.current = 0;
    return 0;
  },

  set current(value) {
    if (this._current) {
      this.hide(this.current);
    }

    this.show(value);
    this._current = value;
  },

  hide: function hide(rank) {
    this.items[rank].classList.replace("thumbnail--visible", "thumbnail--hidden");
  },

  show: function show(rank) {
    this.items[rank].classList.replace("thumbnail--hidden", "thumbnail--visible");
  }
};

exports.default = Thumbnails;

},{}],4:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
function Toggler(element) {
  this.element = element;
  this.getTargets();
  this.initEvents();
}

Toggler.prototype = {

  getTargets: function getTargets() {
    this.selectors = this.element.getAttribute("data-toggle-target").split(/,\s?/);
    this.modifiers = this.element.getAttribute("data-toggle-modifier").split(/,\s?/);
    this.targets = [];
    for (var i = 0; i < this.selectors.length; i++) {
      this.targets.push(document.querySelector(this.selectors[i]));
      if (!this.modifiers[i]) {
        this.modifiers[i] = "hidden";
      }
    }
  },

  toggle: function toggle() {
    for (var i = 0; i < this.targets.length; i++) {
      this.targets[i].classList.toggle(this.modifiers[i]);
    }
  },

  initEvents: function initEvents() {
    var self = this;
    this.element.addEventListener("click", function (e) {
      self.toggle();
      e.preventDefault();
    });
  }
};

var TogglerManager = {

  togglers: [],

  findByElement: function findByElement(element) {
    for (var i = 0; i < this.togglers.length; i++) {
      if (this.togglers[i].element === element) {
        return this.togglers[i];
      }
    }
  },

  init: function init() {
    var elements = document.querySelectorAll("*[data-toggle-target]");
    for (var i = 0; i < elements.length; i++) {
      this.togglers.push(new Toggler(elements[i]));
    }
  }
};

exports.Toggler = Toggler;
exports.default = TogglerManager;

},{}],5:[function(require,module,exports){
var _carousel = require("./components/carousel.js");

var _carousel2 = _interopRequireDefault(_carousel);

var _thumbnails = require("./components/thumbnails.js");

var _thumbnails2 = _interopRequireDefault(_thumbnails);

var _toggler = require("./components/toggler.js");

var _toggler2 = _interopRequireDefault(_toggler);

var _formfarm = require("./../formfarm/components/formfarm.js");

var _formfarm2 = _interopRequireDefault(_formfarm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var offsetTop = function offsetTop(element) {
    var top = 0,
        left = 0;
    do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while (element);

    return {
        top: top,
        left: left
    };
};

Object.defineProperties(window, {
    scrollTop: {
        get: function get() {
            return document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
        },
        set: function set(value) {
            var scrollTop = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop = value;
        }
    }
});

function manageHomeCarousel() {
    if (document.querySelector("#home-carousel")) {
        var sectionCarousel = document.querySelector("#anchor-2");

        var thumbnails = new _thumbnails2.default(sectionCarousel.querySelector(".thumbnails"));
        var carousel = new _carousel2.default(document.querySelector("#home-carousel"));
        carousel.onChange = function (current, last, rank) {
            //last.querySelector(".btn-morph-cross").click();
            var toggler = _toggler2.default.findByElement(last.querySelector(".btn-morph-cross"));
            if (toggler && toggler.element.classList.contains("btn-morph-cross--active")) {
                toggler.toggle();
            }
            thumbnails.current = rank;
        };
    }
}

window.addEventListener("load", function () {
    manageHomeCarousel();
    _toggler2.default.init();
    _formfarm2.default.init();

    var carouselElement = document.querySelector("#product-carousel");
    console.log("Helll");
    new _carousel2.default(carouselElement);
});

},{"./../formfarm/components/formfarm.js":1,"./components/carousel.js":2,"./components/thumbnails.js":3,"./components/toggler.js":4}]},{},[5])

//# sourceMappingURL=index.js.map
