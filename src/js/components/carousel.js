Object.defineProperty(Element.prototype, 'outerWidth', {
    'get': function(){
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
    'get': function(){
        var height = this.clientHeight;
        var computedStyle = window.getComputedStyle(this); 
        height += parseInt(computedStyle.marginTop, 10);
        height += parseInt(computedStyle.marginBottom, 10);
        height += parseInt(computedStyle.borderTopWidth, 10);
        height += parseInt(computedStyle.borderBottomWidth, 10);
        return height;
    }
});


class Carousel {
  constructor(element){
    this.element = element;
    this.container = element.querySelector(".carousel__container");
    this.size = 3;
    this.interval = 3000;
    this.items = [];
    this.leftButton = this.element.querySelector(".carousel__selector--left");
    this.rightButton = this.element.querySelector(".carousel__selector--right");
    this.selectorContainer = this.element.querySelector(".carousel__selectors");

    var items = element.querySelectorAll(".carousel__item");
    items.forEach((item, index) => {
      this.items[index] = new CarouselItem(item, index, this);
    })

    this.refresh();
    this.initEvents();
    window.addEventListener("resize", ()=>{
      this.refresh();
    })
  }

  get isActive(){
    return this.size < this.items.length ? true : false; 
  }

  refreshTimeout(){
    if( this.timeout ) clearTimeout(this.timeout); 
    this.timeout = setTimeout(()=>{
      this.next();
    }, this.interval)
  }

  next(){
    this.items.forEach(item => {
      item.next();
    })
    this.refreshTimeout();
  }

  previous(){
    this.items.forEach(item => {
      item.previous();
    })
    this.refreshTimeout();
  }

  refresh(){
    this.widthSize = this.items[0].element.outerWidth;
    this.size = Math.floor(window.innerWidth/this.widthSize);
    this.widthComputed = window.innerWidth/this.size;

    this.items.forEach(item => {
      item.updateSizes();
      item.restorePosition();
      item.updatePosition();
    });
    this.refreshTimeout();

    if( this.isActive ){
      this.container.style.height = this.items[0].element.outerHeight + 70 + "px";
      this.element.classList.remove("carousel--disabled")
    } else {
      this.container.style.height = this.items[0].element.outerHeight + "px";
      this.element.classList.add("carousel--disabled")
    }

    console.log(this.isActive);
  }

  initEvents(){
    this.leftButton.addEventListener("click", ()=>{
      this.previous();
    })
    this.rightButton.addEventListener("click", ()=>{
      this.next();
    })
  }
}

class CarouselItem {
  constructor(element, index, carousel) {
    this.element = element;
    this.carousel = carousel;
    this._position = index;
    this.startPosition = index;
  }

  restorePosition(){
    this._position = this.startPosition; 
  }

  updatePosition(){
    this.position = this._position;
  }

  updateSizes(){
    this.sizes = {
      width: this.element.outerWidth,
      height: this.element.outerHeight
    }
  }

  next(){
    if( !this.carousel.isActive ) return;
    if( this.position == this.carousel.items.length - 1 ){
      this.needJump = "left";
      this.position = 0;
    } else {
      this.position += 1;  
    }
  }

  previous(){
    if( !this.carousel.isActive ) return;
    if( this.position == -1 ){
      this.needJump = "right";
      this.position = this.carousel.items.length - 2;
    } else {
      this.position -= 1;   
    }
  }

  set position(position) {

    if( position > this.carousel.items.length - 1 || position < -1 ) return;
    var timeout = 0;
    if( this.needJump ) {
      this.element.style.transitionDuration = "0s";
      if( this.needJump == "left") {
        this.element.style.left = -this.carousel.widthComputed+"px";  
      } else {
        this.element.style.left = this.carousel.widthComputed*this.carousel.size+"px";  
      }
      
      timeout = 30;
    }


    setTimeout(()=>{
      
      if( this.needJump ) {
        this.element.style.transitionDuration = ".6s";
      }
      
      this._position = position;
      var left = this._position*this.carousel.widthComputed + (this.carousel.widthComputed - this.carousel.widthSize)/2
      this.element.style.left = left + "px"; 
      this.element.setAttribute("data-position", position);
      this.needJump = false;
    }, timeout)
    
  }

  get position() {
    return this._position;
  }
}

export default Carousel;