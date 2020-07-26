class Slider{
  constructor({main, wrap, position = 0, next = null, prev = null, slideSelector, counterSelector = null, slidesToShow = 1, infinity = true, activeItemClass = '', reviewsSlider = false, breakpoints = null, repairTypesSlider = false, isHorizontal = true, noFlex = false, scrollByPixels = null, portfolioSlider = false}){
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

  hide() {
    this.wrap.style.display = 'none';
    this.visible = false;
    if (this.prevSelector !== null && this.nextSelector !== null) {
      this.clearControl(this.prevSelector);
      this.clearControl(this.nextSelector);
      this.prev = document.querySelector(this.prevSelector);
      this.next = document.querySelector(this.nextSelector);
      this.prev.style.visibility = 'hidden';
      this.next.style.visibility = 'hidden';
      //document.querySelector(this.nextSelector).style.visibility = 'hidden';
      //this.prev
      //this.next.style.visibility = 'hidden';
    }
  }

  clearControl(elem) {
    let oldElement = document.querySelector(elem);
    let newElement = oldElement.cloneNode(true);
    oldElement.parentNode.replaceChild(newElement, oldElement);

  }

  show() {
    this.wrap.style.display = 'block';
    this.visible = true;
    this.renderControls();
    this.controlSlider();
  }

  setPosition(position) {
    this.options.position = position;
    this.updateSlideVisibility(`translate${this.options.isHorizontal ? "X" : "Y"}(-${this.scrollByPixels !== null ? this.scrollByPixels.step * this.options.position + "px" : this.options.position * this.options.slideWidth + "%"})`);
    this.renderControls();
  }
    
  renderControls() {
    this.updateArrowVisibility();
    this.updateCounter();
  }

  updateCounter() {
    if (this.counterSelector !== null && this.visible) {
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
          this.options.slideWidth = this.portfolioSlider ? 100 : Math.floor(100 / this.slidesToShow);
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
      }`;
      }
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
    if (this.prevSelector !== null && this.nextSelector !== null) {
      document.querySelector(this.prevSelector).addEventListener('click', this.prevSlider.bind(this));
      document.querySelector(this.nextSelector).addEventListener('click', this.nextSlider.bind(this));
    }
    // this.prev.addEventListener('click', this.prevSlider.bind(this));
    // this.next.addEventListener('click', this.nextSlider.bind(this));
  }

  prevSlider() {
      if(this.options.infinity || this.options.position > 0){
          --this.options.position;
          if(this.options.position < 0){
              this.options.position = this.slides.length - this.slidesToShow;
          }
          this.updateSlideVisibility(`translate${this.options.isHorizontal ? "X" : "Y"}(-${this.scrollByPixels !== null ? this.scrollByPixels.step * this.options.position + "px" : this.options.position * this.options.slideWidth + "%"})`);
          //this.updateSlideVisibility(`translate${this.options.isHorizontal ? "X" : "Y"}(-${this.options.position * this.options.slideWidth}%)`);
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

          this.updateSlideVisibility(`translate${this.options.isHorizontal ? "X" : "Y"}(-${this.scrollByPixels !== null ? this.scrollByPixels.step * this.options.position + "px" : this.options.position * this.options.slideWidth + "%"})`);
          //this.updateSlideVisibility(`translate${this.options.isHorizontal ? "X" : "Y"}(-${this.options.position * this.options.slideWidth}%)`);

          this.highlightActiveItem();
          this.renderControls();
      }
  }

  updateSlideVisibility(styleText) {
    if (this.reviewsSlider) {
      const slides = document.querySelectorAll(this.slideSelector);

      for (let slide of this.slides) {
        slide.style.transform = styleText;
      }
    } else {
      this.wrap.style.transform = styleText;
    }

    if (styleText === '') {
      this.options.position = 0;
    }
  }

  updateArrowVisibility() {
    const prev = document.querySelector(this.prevSelector),
          next = document.querySelector(this.nextSelector);


    if (!this.options.infinity) {
      if (this.options.position === 0) {
        prev.style.visibility = 'hidden';
      } else {
        prev.style.visibility = 'visible';
      }

      if (this.options.position === this.slides.length - this.slidesToShow) {
        next.style.visibility = 'hidden';
      } else {
        next.style.visibility = 'visible';
      }
    } else {
      prev.style.visibility = 'visible';
      next.style.visibility = 'visible';
    }
  }

  highlightActiveItem() {
    if (this.options.activeItemClass !== '') {
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
  const initNavSlider = (main, wrap, next, prev, slideSelector, fromPopup = false) => {
    const navSlider = new Slider({
      main,
      wrap,
      next,
      prev,
      slideSelector,
      reviewsSlider: true,
      infinity: false,
      noflex: true,
      breakpoints: {"1024" : 5, "0" : 2},
      scrollByPixels: {"step": 170, "stepCount": 3}
    });

    navSlider.init();

    if (fromPopup) {
      navSlider.hide();
    }

    return navSlider;
  };


//   const formulaSlider = new Slider({
//     main: '.formula-slider-wrap',
//     wrap: '.formula-slider',
//     next: '#formula-arrow_right',
//     prev: '#formula-arrow_left',
//     slideSelector: '.formula-slider__slide',
//     activeItemClass: 'active-item'
// });
//   formulaSlider.init();

  const repairTypesSliders = [];
  for (let i = 1; i <= 5; i++) {
    const repairTypesSlider = new Slider({
      main: '.repair-types-slider',
      wrap: `.types-repair${i}`,
      next: '#repair-types-arrow_right',
      prev: '#repair-types-arrow_left',
      slideSelector: '.slider-counter-responsive',
      counterSelector: '#repair-counter',
      reviewsSlider: true,
      repairTypesSlider: true,
      isHorizontal: false
    });
  
    repairTypesSlider.init();
    repairTypesSliders.push(repairTypesSlider);

    repairTypesSlider.hide();
  }

  repairTypesSliders[0].show();

  const repairTypesButtonsContainer = document.querySelector('.nav-list-repair'),
        repairTypesButtons = repairTypesButtonsContainer.querySelectorAll('.repair-types-nav__item');

  repairTypesButtonsContainer.addEventListener('click', (event) => {
    if (event.target.closest('.repair-types-nav__item')) {
      repairTypesSliders.forEach(item => { item.hide(); });
      for (let i = 0; i < repairTypesButtons.length; i++) {
        repairTypesButtons[i].classList.remove('active');

        if (event.target.closest('.repair-types-nav__item') === repairTypesButtons[i]) {
          repairTypesSliders[i].show();
          repairTypesButtons[i].classList.add('active');
        }
      }
    }
  });

  initNavSlider('.repair-types-nav', '.nav-list-repair', '#nav-arrow-repair-right_base', '#nav-arrow-repair-left_base', '.repair-types-nav__item');

  const designSliders = [];
  for (let i = 1; i <= 5; i++) {
    const designSlider = new Slider({
      main: '.designs-slider',
      wrap: `.designs-slider__style${i}`,
      next: '#design_right',
      prev: '#design_left',
      counterSelector: '#designs-counter',
      //slideSelector: '.slider-counter-responsive',
      reviewsSlider: true,
      repairTypesSlider: true,
      isHorizontal: false
    });
  
    designSlider.init();
    designSliders.push(designSlider);

    designSlider.hide();
  }

  designSliders[0].show();

  const designButtonsContainer = document.querySelector('.nav-list-designs'),
        designButtons = designButtonsContainer.querySelectorAll('.designs-nav__item'),
        previewBlocks = document.querySelectorAll('.preview-block'),
        previewBlocksContainer = document.querySelector('.designs>.wrapper');

  designButtonsContainer.addEventListener('click', (event) => {
    if (event.target.closest('.designs-nav__item')) {
      designSliders.forEach(item => { item.hide(); });
      previewBlocks.forEach(item => { item.classList.remove('visible')});

      for (let i = 0; i < designButtons.length; i++) {
        designButtons[i].classList.remove('active');

        if (event.target.closest('.designs-nav__item') === designButtons[i]) {
          designSliders[i].show();
          designButtons[i].classList.add('active');
          previewBlocks[i].classList.add('visible');
        }
      }
    }
  });

  previewBlocksContainer.addEventListener('click', (event) => {
    if (event.target.closest('.preview-block')) {
      for (let i = 0; i < previewBlocks.length; i++) {
        if (event.target.closest('.preview-block') === previewBlocks[i]) {
          const previewBlockItems = previewBlocks[i].querySelectorAll('.preview-block__item');
          for (let j = 0; j < previewBlockItems.length; j++) {
            previewBlockItems[j].querySelector('.preview-block__item-inner').classList.remove('preview_active');
            if (event.target.closest('.preview-block__item') === previewBlockItems[j]) {
              designSliders[i].setPosition(j);
              previewBlockItems[j].querySelector('.preview-block__item-inner').classList.add('preview_active');
            }
          }
          break;
        }
      }
    }
  });

  initNavSlider('.nav-designs', '#designs-list', '#nav-arrow-designs_right', '#nav-arrow-designs_left');
  const designPopupButtonsSlider = initNavSlider('.nav-popup-designs', '#nav-list-popup-designs', '#nav-arrow-popup-designs_right', '#nav-arrow-popup-designs_left', null, true);

  const popupDesignSliders = [];
  for (let i = 1; i <= 5; i++) {
    const popupDesignSlider = new Slider({
      main: '.popupDesignSlider',
      wrap: `.popup-designs-slider__style${i}`,
      next: '#popup_design_right',
      prev: '#popup_design_left',
      counterSelector: '#popup-designs-counter',
      //slideSelector: '.slider-counter-responsive',
      reviewsSlider: true,
      repairTypesSlider: true,
      isHorizontal: false
    });
  
    popupDesignSlider.init();
    popupDesignSliders.push(popupDesignSlider);

    popupDesignSlider.hide();
  }

  const designPopup = document.querySelector('.popup-design'),
        designTexts = document.querySelectorAll('.popup-design-text');

  document.addEventListener('click', (event) => {
    if (event.target.closest('.link-list-designs')) {
      designPopup.style.visibility = 'visible';
      popupDesignSliders[0].show();
      designPopupButtonsSlider.show();
    } else if (!event.target.closest('.popup-dialog-design') || event.target.closest('.popup-dialog-design>.close')) {
      designPopup.style.visibility = 'hidden';
      popupDesignSliders.forEach(item => item.hide());
      designPopupButtonsSlider.hide();
    }
  });  

  const popupDesignButtonsContainer = document.getElementById('nav-list-popup-designs'),
        popupDesignButtons = popupDesignButtonsContainer.querySelectorAll('.designs-nav__item');

  popupDesignButtonsContainer.addEventListener('click', (event) => {
    if (event.target.closest('.designs-nav__item')) {
      popupDesignSliders.forEach(item => item.hide());
      for (let i = 0; i < popupDesignButtons.length; i++) {
        if (popupDesignButtons[i] === event.target.closest('.designs-nav__item')) {
          popupDesignSliders[i].show();
          designTexts.forEach((item, index) => {
            item.style.display = index === i ? "block" : 'none';
          });
        }
      }
    }
  });

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
    infinity: false,
    isHorizontal: false
  });

  popupDocumentsSlider.init();
  popupDocumentsSlider.hide();

  const docsPopup = document.querySelector('.popup-transparency');
  
  document.addEventListener('click', (event) => {
    if (event.target.closest('.transparency-item')) {
      popupDocumentsSlider.show();
      const docs = document.querySelectorAll('.transparency-item');
      docs.forEach((item, i) => {
        if (item === event.target.closest('.transparency-item')) {
          popupDocumentsSlider.setPosition(i);
        }
      });

      docsPopup.style.visibility = 'visible';
    } else if (!event.target.closest('.popup-dialog-transparency') || event.target.closest('.popup-dialog-transparency>.close')) {
      popupDocumentsSlider.hide();
      docsPopup.style.visibility = 'hidden';
      popupDocumentsSlider.prev.style.visibility = 'hidden';
      popupDocumentsSlider.next.style.visibility = 'hidden';
    }
  });  

  //portfolio

  const portfolioSlider = new Slider({
    main: '.portfolio-slider-wrap',
    wrap: '.portfolio-slider',
    next: '#portfolio-arrow_right',
    prev: '#portfolio-arrow_left',
    slideSelector: '.portfolio-slider__slide',
    reviewsSlider: true,
    portfolioSlider: true,
    slidesToShow: 3,
    breakpoints: {"1080" : 3, "900" : 2, "0" : 1},
    infinity: false
  });

  portfolioSlider.init();

  const portfolioSliderMobile = new Slider({
    main: '.portfolio-slider-wrap',
    wrap: '.portfolio-slider-mobile',
    next: '#portfolio-arrow-mobile_right',
    prev: '#portfolio-arrow-mobile_left',
    slideSelector: '.portfolio-slider__slide',
    counterSelector: '#portfolio-counter',
    isHorizontal: false,
    reviewsSlider: true,
    infinity: false
  });

  portfolioSliderMobile.init();
  
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
  portfolioPopupSlider.hide();

  const portfolioPopup = document.querySelector('.popup-portfolio'),
        texts = document.querySelectorAll('.popup-portfolio-text');

  document.addEventListener('click', (event) => {
    if (event.target.closest('.portfolio-slider__slide-frame')) {
      portfolioPopupSlider.show();
      const docs = document.querySelectorAll('.portfolio-slider__slide-frame');

      docs.forEach((item, i) => {
        if (item === event.target.closest('.portfolio-slider__slide-frame')) {
          portfolioPopupSlider.setPosition(i - portfolioPopupSlider.slides.length);
          texts[i - portfolioPopupSlider.slides.length].style.display = 'flex';
        }
      });

      portfolioPopup.style.visibility = 'visible';
    } else if (!event.target.closest('.popup-dialog-portfolio') || event.target.closest('.popup-dialog-portfolio>.close')) {
      portfolioPopup.style.visibility = 'hidden';
      portfolioPopupSlider.hide();
    }
  });  

  const updateText = () => {
    texts.forEach((item, i) => {
      item.style.display = portfolioPopupSlider.options.position === i ? "flex" : 'none';
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

//initSliders();

export default initSliders;