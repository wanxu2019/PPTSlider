(function($){
    $.fn.PPTSlider = function(opts){
        opts = $.extend({}, $.fn.PPTSlider.opts, opts);
        this.each(function(){
            
        });
    };
    $.fn.PPTSlider.opts = {
        autoPlay: false,
        dir: null,
        isAnimate: false
    };
})(jQuery);