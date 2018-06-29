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
    this.container = element.querySelector(".carousel__container");
    this.size = 3;
    this.interval = 2000;
    this.items = [];
    var items = element.querySelectorAll(".carousel__item");
    items.forEach((item, index) => {
      this.items[index] = new CarouselItem(item, index, this);
    })

    this.refresh();

    window.addEventListener("resize", ()=>{
      this.refresh();
    })
  }

  refreshTimeout(){
    if( this.timeout ) clearTimeout(this.timeout); 
    setTimeout(()=>{
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
    this.items.forEach(item => {
      item.updateSizes();
      item.updatePosition();
    });
    this.widthSize = this.items[0].element.outerWidth;
    this.size = Math.floor(window.innerWidth/this.widthSize);
    this.container.style.height = this.items[0].element.outerHeight+"px";
    this.refreshTimeout();
  }
}

class CarouselItem {
  constructor(element, index, carousel) {
    this.element = element;
    this.carousel = carousel;
    this._position = index;
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
    if( this.position == this.carousel.items.length - 1 ){
      this.position = 0;
    } else {
      this.position += 1;  
    }
  }

  previous(){
    if( this.position == - 1 ){
      this.position = this.carousel.items.length - 1;
    } else {
      this.position -= 1;   
    }
  }

  set position(position) {
    console.log("Hello", this.carousel.items.length);
    if( position > this.carousel.items.length - 1 || position < 0 ) return;
    this.element.style.left = this._position*this.sizes.width + "px"; 
    console.log(this.element.style.left);
    this._position = position;
  } 

  get position() {
    return this._position;
  }
}

export default Carousel;