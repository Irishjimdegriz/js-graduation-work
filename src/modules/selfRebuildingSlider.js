class SelfRebuildingSlider{
  constructor({main, wrap, position = 1, next = null, prev = null, slideSelector, counterSelector = null, slidesToShow = 1, infinity = true, activeItemClass = '', reviewsSlider = false, breakpoints = null, repairTypesSlider = false, isHorizontal = true, noFlex = false, scrollByPixels = null, portfolioSlider = false}){
      this.main = document.querySelector(main);
      this.mainSelector = main;
      this.wrap = document.querySelector(wrap);
      this.wrapSelector = wrap;
      this.slides = document.querySelector(wrap).children;
      this.slideSelector = slideSelector;
      this.counterSelector = counterSelector;
      this.next = document.querySelector(next);
      this.nextSelector = next;
      this.prev = document.querySelector(prev);
      this.prevSelector = prev;
      this.slidesToShow = slidesToShow;
      this.reviewsSlider = reviewsSlider;
      this.repairTypesSlider = repairTypesSlider;
      this.breakpoints = breakpoints;
      this.scrollByPixels = scrollByPixels;
      this.visible = true;
      this.portfolioSlider = portfolioSlider;
      this.options = {
          position,
          infinity,
          slideWidth: this.portfolioSlider ? 100 : Math.floor(100 / this.slidesToShow),
          activeItemClass,
          isHorizontal,
          noFlex
      };
  }

  init() {
      this.addStyles();
   
      this.prevSlider(); 

      this.controlSlider();
      this.initAdaptive();


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
          this.options.slideWidth = this.portfolioSlider ? 100 : Math.floor(100 / this.slidesToShow);
          const style = document.head.querySelector(`[id$="${this.wrapSelector}-style"]`);
          this.updateStyleElement(style);
          break;
        }
      }

      if (this.slidesToShow !== 1) {
        this.options.position = 1;
      } else {
        this.options.position = 0;

        this.slides = document.querySelector(this.wrapSelector).children;

        while (!this.slides[this.options.position].classList.contains('first-slide')) {
          this.nextSlider();
        }
      }

      this.highlightActiveItem(); 
    };

    if (this.breakpoints !== null) {
      recalculateParams();

      window.addEventListener("resize", () => {
        recalculateParams();

        ///this.updateSlideVisibility('');
        //this.renderControls();
      });
    }
  }

  updateStyleElement(elem) {
    elem.textContent = `
      ${this.wrapSelector}{
          flex-wrap: nowrap !important;
          align-items: center !important;
          transition: all .5s !important;
          will-change: transform !important;
          margin: 0 auto !important;
      }
      `;

      if (!this.reviewsSlider) {
        elem.textContent += `          ${this.mainSelector}{
          overflow: hidden !important;
          padding-bottom: 40px;
      }`;

      if (!this.repairTypesSlider) {
        elem.textContent += `          ${this.wrapSelector}{
          display: flex !important;
      }`;
      }

      if (!this.options.noFlex) {
        elem.textContent += `${this.slideSelector}{
          flex: 0 0 ${this.options.slideWidth}% !important;
          margin: auto 0 !important;
          margin-top: 50px !important;
          justify-content: initial !important;
          margin-top: 40px !important;
          max-width: 100% !important;
      }`;
      }

      elem.textContent += `${this.prevSelector}, ${this.nextSelector} {
        top: 37%;
      }`;
    }
  }

  addStyles() {
      const style = document.createElement('style');
      style.id = `${this.wrapSelector}-style`;
      document.head.append(style);
      this.updateStyleElement(style);
  }

  controlSlider() {
    if (this.prevSelector !== null && this.nextSelector !== null) {
      document.querySelector(this.prevSelector).addEventListener('click', this.prevSlider.bind(this));
      document.querySelector(this.nextSelector).addEventListener('click', this.nextSlider.bind(this));
    }
  }

  prevSlider() {
    this.slides = document.querySelector(this.wrapSelector).children;
    this.slides[0].before(this.slides[this.slides.length - 1]);

    this.highlightActiveItem();
  }
  
  nextSlider() {
    this.slides = document.querySelector(this.wrapSelector).children;
    this.slides[this.slides.length - 1].after(this.slides[0]);

    this.highlightActiveItem();
  }

  highlightActiveItem() {
      for (let slide of this.slides) {
        slide.classList.remove(this.options.activeItemClass);
      }

      this.slides[this.options.position].classList.add(this.options.activeItemClass);
  }
}

const selfRebuldingSlider = () => {
  const createSelfRebuildingSlider = (selector, breakpoints) => {
    const slider = new SelfRebuildingSlider({
      main: `.${selector}-slider-wrap`,
      wrap: `.${selector}-slider`,
      next: `#${selector}-arrow_right`,
      prev: `#${selector}-arrow_left`,
      slideSelector: `.${selector}-slider__slide`,
      breakpoints,
      activeItemClass: 'active-item'
    });
  
    slider.init();
  };

  createSelfRebuildingSlider('formula', {"865" : 3, "0" : 1});
  createSelfRebuildingSlider('problems', {"0" : 1});
};

export default selfRebuldingSlider;