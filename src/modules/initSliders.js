class Slider{
  constructor({main, wrap, position = 0, next, prev, slideSelector, slidesToShow = 1, infinity = true, activeItemClass = '', reviewsSlider = false}){
      this.main = document.querySelector(main);
      this.mainSelector = main;
      this.wrap = document.querySelector(wrap);
      this.wrapSelector = wrap;
      this.slides = document.querySelector(wrap).children;
      this.slideSelector = slideSelector;
      this.next = document.querySelector(next);
      this.prev = document.querySelector(prev);
      this.slidesToShow = slidesToShow;
      this.reviewsSlider = reviewsSlider;
      this.options = {
          position,
          infinity,
          slideWidth: Math.floor(100 / this.slidesToShow),
          activeItemClass
      };
  }

  init() {
      this.addGloClass();
      this.addSlyles();
      this.highlightActiveItem();

      if(!(this.prev && this.next)) {
        this.addArrow();
      }
      
      this.controlSlider();

      if (!this.options.infinity) {
        this.prev.style.visibility= 'hidden';
      }
  }

  addGloClass() {
      // this.main.classList.add('glo-slider');
      // this.wrap.classList.add('glo-slider__wrap');

      // for(let item of this.slides) {
      //   item.classList.add('glo-slider__item');
      // }
  }

  addSlyles() {
      const style = document.createElement('style');
      style.id = `${this.wrapSelector}-style`;
      document.head.append(style);
      style.textContent = `
          ${this.wrapSelector}{
              display: flex !important;
              flex-wrap: nowrap !important;
              align-items: center !important;
              transition: all .5s !important;
              will-change: transform !important;
              margin: 0 auto !important;
          }
          ${this.slideSelector}{
              flex: 0 0 ${this.options.slideWidth}% !important;
              margin: auto 0 !important;
          }
      `;

      if (!this.reviewsSlider) {
        style.textContent += `          ${this.mainSelector}{
          overflow: hidden !important;
      }`;
      }
  }

  controlSlider() {
      this.prev.addEventListener('click', this.prevSlider.bind(this));
      this.next.addEventListener('click', this.nextSlider.bind(this));
  }

  prevSlider() {
      if(this.options.infinity || this.options.position > 0){
          --this.options.position;
          if(this.options.position < 0){
              this.options.position = this.slides.length - this.slidesToShow;
          }

          if (this.reviewsSlider) {
            for (let slide of this.slides) {
              slide.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;
            }
          } else {
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;
          }
      }

      this.updateArrowVisibility();
      
      this.highlightActiveItem();
  }

  nextSlider() {
      if(this.options.infinity || this.options.position < this.slides.length - this.slidesToShow){
            ++this.options.position;
            if(this.options.position > this.slides.length - this.slidesToShow){
                this.options.position = 0;
          }

          
          if (this.reviewsSlider) {
            for (let slide of this.slides) {
              slide.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;
            }
          } else {
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;
          }
          //this.wrap.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;  
             
          this.updateArrowVisibility();

          this.highlightActiveItem();
      }
  }

  updateArrowVisibility() {
    if (!this.options.infinity) {
      if (this.options.position === 0) {
        this.prev.style.visibility= 'hidden';
      } else {
        this.prev.style.visibility= 'visible';
      }

      if (this.options.position === this.slides.length - this.slidesToShow) {
          this.next.style.visibility= 'hidden';
      } else {
        this.next.style.visibility= 'visible';
      }
    }
  }

  highlightActiveItem() {
    if (this.options.activeItemClass != '') {
      for (let slide of this.slides) {
        slide.classList.remove(this.options.activeItemClass);
      }

      this.slides[this.options.position].classList.add(this.options.activeItemClass);
    }
  }

  addArrow() {

  }
}

const initSliders = () => {
  const formulaSlider = new Slider({
    main: '.formula-slider-wrap',
    wrap: '.formula-slider',
    next: '#formula-arrow_right',
    prev: '#formula-arrow_left',
    slideSelector: '.formula-slider__slide',
    activeItemClass: 'active-item'
});
  formulaSlider.init();

  const repairTypesSliders = document.querySelectorAll('[class^="types=repair"]');

  const reviewsSlider = new Slider({
    main: '.reviews-slider-wrap',
    wrap: '.reviews-slider',
    next: '#reviews-arrow_right',
    prev: '#reviews-arrow_left',
    slideSelector: '.reviews-slider__slide',
    reviewsSlider: true,
    infinity: false
});

  reviewsSlider.init();

  const partnersSlider = new Slider({
    main: '.partners>.wrapper',
    wrap: '.partners-slider',
    next: '#partners-arrow_right',
    prev: '#partners-arrow_left',
    slideSelector: '.partners-slider__slide',
    slidesToShow: 3
});

    partnersSlider.init();
};

export default initSliders;