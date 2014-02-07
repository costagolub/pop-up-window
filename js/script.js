'use strict';

// global object
// module 
var STEPS = (function(obj) {
  // constructor 
  // element = modal window
  // overlay = overlay 
  // timeSeconds = time in seconds (not milliseconds)
  // closeModal = button that should close modal window
  obj.Modal = function(element, overlay, timeSeconds, closeModal) {
    this.modal = $(element);
    this.overlay = $(overlay);
    this.time = timeSeconds;
    this.closeModal = $(closeModal);
    this.wHeight = $(window).height();
    this.wWidth = $(window).width();
  };
  // Prototype of Modal constructor
  obj.Modal.prototype = {
    showModal : function() {
      // create local "that" variable that points to obj.Modal;
      var that = this;
      // create timeout for modal window
      setTimeout(function() {
        that.overlay.fadeIn().addClass('md-show');
        that.setModalPosition();
        that.modal.fadeIn();
      }, this.time * 1000);
    },
    hideModal : function() {
      this.overlay.fadeOut().removeClass('md-show');
      this.modal.fadeOut();
    },
    bindHandlers : function() {
      // create local "that" variable that points to obj.Modal;
      var that = this;
      this.showModal();
      $(window).on('click', function(event) {
          var target = event.target.className.split(' ');
          if (target[1] === 'md-show') {
            that.hideModal();
          }
      });
      $(window).resize(function() {
        that.wResize($(this));
        that.setModalPosition();
      });

      // click handler
      this.closeModal.on('click', function() {
        that.hideModal();
        return false;
      });
    },
    init : function(days, cookieName) {
        if ($.cookie(cookieName) == null) {
            $.cookie(cookieName, 'yes', { expires: days, path: '/' });
            this.bindHandlers();
        }
    },
    setModalPosition : function() {
      var modalWidth = this.modal.outerWidth(),
          modalHeight = this.modal.outerHeight(),
          scroll = $(window).scrollTop(),
          checkW = this.wWidth < modalWidth,
          checkH = this.wHeight < modalHeight;
      this.modal.css({
          'left' : (checkW ? 0 : this.horizontalWindow(this.wWidth, modalWidth)),
          'top' : (checkH ? scroll : this.verticalWindow(this.wHeight, modalHeight, scroll))
      });
    },
    horizontalWindow : function(windowWidth, ModalWidth) {
      return (windowWidth - ModalWidth) / 2;
    },
    verticalWindow : function(windowHeigth, ModalHeight, scroll) {
      return ((windowHeigth - ModalHeight) / 2) + scroll;
    },
    wResize : function(win) {
      this.wHeight = $(win).height();
      this.wWidth = $(win).width();
    }
  };

  return obj;
}(STEPS || {}));

// load script after page loaded
$(window).bind('load', function() {
  // create variable modal
  var modal = new STEPS.Modal('.modalwindow', '.modaloverlay', 1, '.modalwindow-close');
  // init pop up window
  // modal.init(7, 'cookieName') - in parentheses type how many days pop-up window should not appear and cookie name 
  modal.init(7, 'modal_window');
});