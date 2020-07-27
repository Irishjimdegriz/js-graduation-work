'use strict';

import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import { polyfill } from 'es6-promise'; polyfill();
import 'whatwg-fetch';
import 'mdn-polyfills/Node.prototype.append';
import 'es6-symbol';
import 'iterators-polyfill';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();
import 'node-before-polyfill';
import 'node-after-polyfill';

import phoneAccordeon from './modules/phoneAccordeon';
import burgerMenu from './modules/burgerMenu';
import smoothScrolling from './modules/smoothScrolling';
import fullList from './modules/fullList';
import phoneMask from './modules/phoneMask';
import privacyPolicy from './modules/privacyPolicy';
import hint from './modules/hint';
import initSliders from './modules/initSliders';
import selfRebuildingSlider from './modules/selfRebuildingSlider';
import consult from './modules/consult';
import howWeWorkTabs from './modules/howWeWorkTabs';
import accordeon from './modules/accordeon';
import sendForm from './modules/sendForm';
import dataLoad from './modules/dataLoad';

phoneAccordeon();
burgerMenu();
smoothScrolling();
fullList();
phoneMask();
privacyPolicy();
hint();
initSliders();
selfRebuildingSlider();
consult();
howWeWorkTabs();
accordeon();
sendForm();
dataLoad();

