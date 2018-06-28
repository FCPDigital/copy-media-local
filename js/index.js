(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
function Carousel(element) {
  this.element = element;
  this.headItems = this.element.querySelectorAll(".carousel__header-item");
  this.items = this.element.querySelectorAll(".carousel__body-item");
  this._current = 0;
  this.initEvents();
}

Carousel.prototype = {
  get current() {
    if (this._current >= 0) {
      return this._current;
    }
    for (var i = 0; i < this.headItems.length; i++) {
      if (this.headItems[i].classList.contains("carousel__header-item--active")) {
        return i;
      }
    }
    this.current = 0;
    return 0;
  },

  set current(value) {
    if (value !== this.current) {
      this.hide(this.current);
      setTimeout(function () {
        this.show(value);
      }.bind(this), 350);
    }
    var last = this._current;
    this._current = value;
    this.onChange.call(this, this.items[this.current], this.items[last], this.current);
  },

  getHead: function getHead(rank) {
    return this.headItems[rank];
  },

  getBody: function getBody(rank) {
    return this.items[rank];
  },

  hide: function hide(rank) {
    this.headItems[rank].classList.remove("carousel__header-item--active");
    this.items[rank].classList.replace("carousel__body-item--visible", "carousel__body-item--hidding");
    setTimeout(function () {
      this.items[rank].classList.replace("carousel__body-item--hidding", "carousel__body-item--hidden");
    }.bind(this), 350);
  },

  show: function show(rank) {
    this.headItems[rank].classList.add("carousel__header-item--active");
    this.items[rank].classList.replace("carousel__body-item--hidden", "carousel__body-item--hidding");
    this.items[rank].classList.replace("carousel__body-item--hidding", "carousel__body-item--visible");
  },

  initHeadEvent: function initHeadEvent(element, rank) {
    var self = this;
    element.addEventListener("click", function (e) {
      self.current = rank;
      e.preventDefault();
    });
  },

  initEvents: function initEvents() {
    for (var i = 0; i < this.headItems.length; i++) {
      this.initHeadEvent(this.headItems[i], i);
    }
  },

  onChange: function onChange(callback) {
    this.onChange = callback;
  }
};

exports.default = Carousel;

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
var _carousel = require("./components/carousel.js");

var _carousel2 = _interopRequireDefault(_carousel);

var _thumbnails = require("./components/thumbnails.js");

var _thumbnails2 = _interopRequireDefault(_thumbnails);

var _toggler = require("./components/toggler.js");

var _toggler2 = _interopRequireDefault(_toggler);

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
});

},{"./components/carousel.js":1,"./components/thumbnails.js":2,"./components/toggler.js":3}]},{},[4])

//# sourceMappingURL=index.js.map
