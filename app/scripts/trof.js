/* HTML5 Rabid Scratch Effect
 * http://rabidflash.com/html5-scratch-card-effect/
 *
 */
if (typeof Object.create !== 'function') {
    ScratchCard.create = function (obj) {
        function F() {};
        F.prototype = obj;
        return new F();
    };
}
var scratchCardId = 0;
(function ($, window, document, undefined) {
    var scratchCardTemplate = $("<Canvas class='scratchCanvas' style='display:none'></Canvas>");

    var ScratchCard = {
        init: function (options, elem) {

            var self = this;

            self.elem = elem;
            self.$elem = $(elem);


            self.options = $.extend({}, $.fn.rabidScratchCard.options, options);
            self.options.backgGroundImage = self.$elem.data("backgroundimage");
            self.options.foreGroundImage = self.$elem.data("foregroundimage");

            self.loadedImages = 0;

            var canvasBgImg = new Image();
            canvasBgImg.onload = function () {
                self.newScratchCanvas = scratchCardTemplate.clone();
                self.$elem.html(self.newScratchCanvas);
                self.theCanvas = self.newScratchCanvas;

                self.ctx = self.theCanvas[0].getContext("2d");


                $(window).bind('mousedown', $.proxy(self.addDownHandler, self));
                self.theCanvas.bind('mouseup', $.proxy(self.addUpHandler, self));
                $(window).bind('mouseup', $.proxy(self.addUpHandler, self));
                self.theCanvas.bind('touchmove', $.proxy(self.touchmoveHandler, self));

                $(self.theCanvas).css({
                    "backgroundImage": "url(" + canvasBgImg.src + ")",

                })

                self.theCanvas[0].width = canvasBgImg.width;
                self.theCanvas[0].height = canvasBgImg.height;
                self.loadedImages++;

                self.theCanvas.css("display", "inline")
                self.initX = self.theCanvas.offset().left;
                self.initY = self.theCanvas.offset().top;


            };



            var bgImg = new Image();
            bgImg.onload = function () {

                self.srcImg = bgImg;
                canvasBgImg.src = self.options.foreGroundImage;
            }
            bgImg.src = self.options.backgGroundImage;



        },

        addDownHandler: function (e) {
            var self = this;
            self.theCanvas.bind('mousemove', $.proxy(self.mouseMoveHandler, self));
        },
        addUpHandler: function (e) {

            var self = this;
            self.theCanvas.unbind('mousemove')

        },
        mouseMoveHandler: function (e) {
            var self = this;

            var mouseX = e.pageX - e.currentTarget.offsetLeft;
            mouseY = e.pageY - e.currentTarget.offsetTop;
            self.reveal(mouseX, mouseY, self);
        },

        touchmoveHandler: function (e) {
            var self = this;
            e.preventDefault();
            var event = window.event;
            mouseX = event.touches[0].pageX - self.initX;
            mouseY = event.touches[0].pageY - self.initY;
            self.reveal(mouseX, mouseY, self);
        },
        reveal: function (mouseX, mouseY, self) {
            self.ctx.save();
            // Can't make a true circle, so we make an arced line that happens to trace a circle - 'i' is used to define our radius.
            self.ctx.arc(mouseX, mouseY, self.options.revealRadius, 0, 2 * Math.PI, false);
            self.ctx.clip();
            self.ctx.drawImage(self.srcImg, 0, 0);
            self.ctx.restore();
        }
    }


    $.fn.rabidScratchCard = function (options) {
        return this.each(function () {
            var scratchCard = Object.create(ScratchCard);
            scratchCard.init(options, this);
        });
    };
    //Defaults
    $.fn.rabidScratchCard.options = {

        foreGroundImage: null,
        backgGroundImage: null,
        revealRadius: 30
    };
})(jQuery, window, document);



$(document).ready(function () {
    $(".panel").rabidScratchCard({
        revealRadius: 2
    });
});