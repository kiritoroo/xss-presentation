import jQuery from 'jquery'

import Experience from '../Experience/Experience';

export default class Stage {
  constructor() {


    this.preload().then(() => {
      this.initStage()
    })
    this.bindEvents()
  }

  async preload() {
    window.$ = window.jQuery = jQuery
    this.currentAnimateIndex = 0
  }

  initStage() {

    $('.nav').on('tap', 'a', function (e) {
      var obj = $(findParentA(e.target));
      var index = obj.attr('index');
      this.activeIndex(index);
    })

    $("#text-container").show();
    setTimeout(function () {
      $('.page1').fadeIn(3000);
      $('.nav').fadeIn(3000);
    }, 1000);
  }

  bindEvents() {
    document.addEventListener('scene:prevStage', (e) => this.onPrev(e))
    document.addEventListener('scene:nextStage', (e) => this.onNext(e))
  }

  activeIndex(index) {
    index = parseInt(index);

    console.log('slide change');

    $('.active').removeClass('active');
    $('.section').removeClass('fp-completely').hide();
    $('.page' + (index + 1)).addClass('fp-completely').fadeIn(3000);
    $('[index="' + index + '"]').parent().addClass("active");
  }

  onPrev(e) {
    this.currentAnimateIndex -= 1
    console.log(this.currentAnimateIndex);
    this.activeIndex(this.currentAnimateIndex);
  }

  onNext(e) {
    this.currentAnimateIndex += 1
    console.log(this.currentAnimateIndex);
    this.activeIndex(this.currentAnimateIndex);
  }
}

function findParentA(el) {
  var returnObj = el;
  if (el.nodeName != 'A') {
      returnObj = findParentA(el.parentElement);
  }
  return returnObj;
}