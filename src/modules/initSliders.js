class Slider{
  constructor({main, wrap, position = 0, next, prev, slideSelector, counterSelector = null, slidesToShow = 1, infinity = true, activeItemClass = '', reviewsSlider = false, breakpoints = null}){
      this.main = document.querySelector(main);
      this.mainSelector = main;
      this.wrap = document.querySelector(wrap);
      this.wrapSelector = wrap;
      this.slides = document.querySelector(wrap).children;
      this.slideSelector = slideSelector;
      this.counterSelector = counterSelector;
      this.next = document.querySelector(next);
      this.prev = document.querySelector(prev);
      this.slidesToShow = slidesToShow;
      this.reviewsSlider = reviewsSlider;
      this.breakpoints = breakpoints;
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
      this.renderControls();
      this.initAdaptive();
      
    }

  setPosition(position) {
    this.options.position = position;
    this.updateSlideVisibility(`translateX(-${this.options.position * this.options.slideWidth}%)`);
    this.renderControls();
  }
    
  renderControls() {
    this.updateArrowVisibility();
    this.updateCounter();
  }

  updateCounter() {
    if (this.counterSelector !== null) {
      console.log(`${this.counterSelector}>.slider-counter-content`);
      const content = document.querySelector(`${this.counterSelector}>.slider-counter-content`),
            currentSlide = content.querySelector('.slider-counter-content__current'),
            totalSlides = content.querySelector('.slider-counter-content__total');

      currentSlide.textContent = (this.options.position + 1).toString();
      totalSlides.textContent = (this.slides.length).toString();
    }
  }

  initAdaptive() {

    const compareBreakpoints = (a, b) => {
      return +b - +a;
    }
    const recalculateParams = () => {
      const orderedKeys = Object.keys(this.breakpoints).sort(compareBreakpoints);
      for (let key of orderedKeys) {
        if (window.innerWidth > +key) {
          this.slidesToShow = this.breakpoints[key];
          this.options.slideWidth = Math.floor(100 / this.slidesToShow);
          const style = document.head.querySelector(`[id$="${this.wrapSelector}-style"]`);
          this.updateStyleElement(style);
          break;
        }
      }
    };

    if (this.breakpoints !== null) {
      recalculateParams();

      window.addEventListener("resize", () => {
        recalculateParams();

        this.updateSlideVisibility('');
        this.renderControls();
      });
    }
  }

  updateStyleElement(elem) {
    elem.textContent = `
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
        elem.textContent += `          ${this.mainSelector}{
          overflow: hidden !important;
      }`;
    }
  }

  addGloClass() {
  }

  addSlyles() {
      const style = document.createElement('style');
      style.id = `${this.wrapSelector}-style`;
      document.head.append(style);
      this.updateStyleElement(style);
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

          this.updateSlideVisibility(`translateX(-${this.options.position * this.options.slideWidth}%)`);
      }

      this.highlightActiveItem();
      this.renderControls();
  }

  nextSlider() {
      if(this.options.infinity || this.options.position < this.slides.length - this.slidesToShow){
            ++this.options.position;
            if(this.options.position > this.slides.length - this.slidesToShow){
                this.options.position = 0;
          }

          this.updateSlideVisibility(`translateX(-${this.options.position * this.options.slideWidth}%)`);

          this.highlightActiveItem();
          this.renderControls();
      }
  }

  updateSlideVisibility(styleText) {
    if (this.reviewsSlider) {
      for (let slide of this.slides) {
        slide.style.transform = styleText;// `translateX(-${this.options.position * this.options.slideWidth}%)`;
      }
    } else {
      this.wrap.style.transform = styleText;//`translateX(-${this.options.position * this.options.slideWidth}%)`;
    }

    if (styleText === '') {
      this.options.position = 0;
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

  // const portfolioSlider = new Slider({
  //   main: '.portfolio-slider-wrapper',
  //   wrap: '.portfolio-slider',
  //   next: '#portfolio-arrow_right',
  //   prev: '#portfolio-arrow_left',
  //   slideSelector: '.portfolio-slider__slide',
  //   reviewsSlider: true,
  //   infinity: false,
  //   //breakpoints: {"1080" : 3, "0" : 1}
  // });

  // portfolioSlider.init();

  const documentsSlider = new Slider({
    main: '.transparency-slider-wrap',
    wrap: '.transparency-slider',
    next: '#transparency-arrow_right',
    prev: '#transparency-arrow_left',
    slideSelector: '.transparency-item',
    infinity: false,
    breakpoints: {"1080" : 3, "0" : 1}
  });

  documentsSlider.init();

  const popupDocumentsSlider = new Slider({
    main: '.popup-transparency-slider-wrap',
    wrap: '.popup-transparency-slider',
    next: '#transparency_right',
    prev: '#transparency_left',
    slideSelector: '.popup-transparency-slider__slide',
    counterSelector: '#transparency-popup-counter',
    reviewsSlider: true,
    infinity: false
  });

  popupDocumentsSlider.init();
  popupDocumentsSlider.prev.style.visibility = 'hidden';
  popupDocumentsSlider.next.style.visibility = 'hidden';

  const docsPopup = document.querySelector('.popup-transparency');
  
  document.addEventListener('click', (event) => {
    if (event.target.closest('.transparency-item')) {
      const docs = document.querySelectorAll('.transparency-item');
      docs.forEach((item, i) => {
        if (item === event.target.closest('.transparency-item')) {
          popupDocumentsSlider.setPosition(i);
        }
      });

      docsPopup.style.visibility = 'visible';
    } else if (!event.target.closest('.popup-dialog-transparency') || event.target.closest('.popup-dialog-transparency>.close')) {
      docsPopup.style.visibility = 'hidden';
      popupDocumentsSlider.prev.style.visibility = 'hidden';
      popupDocumentsSlider.next.style.visibility = 'hidden';
    }
  });  
  
  const portfolioPopupSlider = new Slider({
    main: '.popup-portfolio-slider-wrap',
    wrap: '.popup-portfolio-slider',
    next: '#popup_portfolio_right',
    prev: '#popup_portfolio_left',
    slideSelector: '.popup-portfolio-slider__slide',
    counterSelector: '#popup-portfolio-counter',
    //reviewsSlider: true,
    infinity: false
  });

  portfolioPopupSlider.init();
  portfolioPopupSlider.prev.style.visibility = 'hidden';
  portfolioPopupSlider.next.style.visibility = 'hidden';

  const portfolioPopup = document.querySelector('.popup-portfolio'),
        texts = document.querySelectorAll('.popup-portfolio-text');

  document.addEventListener('click', (event) => {
    if (event.target.closest('.portfolio-slider__slide-frame')) {
      const docs = document.querySelectorAll('.portfolio-slider__slide-frame');

      docs.forEach((item, i) => {
        if (item === event.target.closest('.portfolio-slider__slide-frame')) {
          portfolioPopupSlider.setPosition(i - portfolioPopupSlider.slides.length);
          texts[i - portfolioPopupSlider.slides.length].style.display = 'block';
        }
      });

      portfolioPopup.style.visibility = 'visible';
    } else if (!event.target.closest('.popup-dialog-portfolio') || event.target.closest('.popup-dialog-portfolio>.close')) {
      portfolioPopup.style.visibility = 'hidden';
      portfolioPopupSlider.prev.style.visibility = 'hidden';
      portfolioPopupSlider.next.style.visibility = 'hidden';
    }
  });  

  const updateText = () => {
    texts.forEach((item, i) => {
      item.style.display = portfolioPopupSlider.options.position === i ? "block" : 'none';
    });
  }
  
  portfolioPopupSlider.prev.addEventListener('click', updateText);
  portfolioPopupSlider.next.addEventListener('click', updateText);


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