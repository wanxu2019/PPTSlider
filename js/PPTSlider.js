let global_timers=[];
(function($){
    function show(msg){
        console.log(msg);
    }
    function visualise(arr,index){
        for(let i=0;i<arr.length;i++){
            $(arr[i]).css("display","none");
        }
        $(arr[index]).css("display","");
    }
    function getImageInfos(arr){
        let imageInfos=[];
        for(let i=0;i<arr.length;i++){
            let imageInfo={};
            imageInfo["src"]=$(arr[i]).attr("data-src");
            imageInfos.push(imageInfo);
        }
        return imageInfos;
    }
    $.fn.PPTSlider = function(opts){
        opts = $.extend({}, $.fn.PPTSlider.opts, opts);
        //show(opts);
        //show(this);
        this.each(function(position,element){
            //$(element).append("hello"+position);
            //获取元素的所有孩子
            var childArr=$(element).children();
            //提取所有孩子标签中的有效信息
            let imageInfos=getImageInfos(childArr);
            //show(imageInfos);
            //移除所有原始元素
            $(element).children().remove();
            //生成新的元素
            //图片部分
            $(element).append("<div class='pptSlider-images'></div>");
            let width=$(element).width();
            for(let i=0;i<imageInfos.length;i++){
                $($(element).children(".pptSlider-images")[0]).append("<img src='"+imageInfos[i]["src"]+"' width='"+"100%"+"' style='display:none;'/>");
            }
            //按钮部分
            $(element).append("<div style='width:100%;' class='btn-operations'>" +
                "<a href='#' class='btn-left'><span class='pptslider-btn glyphicon glyphicon-step-backward'></span></a>"+
                "<a href='#' class='btn-pause'><span class='pptslider-btn glyphicon glyphicon-pause'></span></a>"+
                "<a href='#' class='btn-continue'><span class='pptslider-btn glyphicon glyphicon-play'></span></a>"+
                "<a href='#' class='btn-right' style='float:right;'><span class='pptslider-btn glyphicon glyphicon-step-forward'></span></a>"+
                "</div>");
            //为按钮添加事件
            function showPauseButton(){
                $($(element).find(".btn-pause")[0]).css("display","");
                $($(element).find(".btn-continue")[0]).css("display","none");
            }
            function showContinueButton() {
                $($(element).find(".btn-pause")[0]).css("display","none");
                $($(element).find(".btn-continue")[0]).css("display","");
            }
            $($(element).find(".btn-left")[0]).click(function(){
               playPreviousManually();
            });
            $($(element).find(".btn-pause")[0]).click(function(){                   stopAutoPlay();
            });
            $($(element).find(".btn-continue")[0]).click(function(){
               startAutoPlay();
            });
            $($(element).find(".btn-right")[0]).click(function(){
               playNextManually();
            });

            //设置轮播
            childArr=$($(element).children(".pptSlider-images")[0]).children();
            let currentIndex=0;
            let autoPlay=true;
            visualise(childArr,0);
            var autoPlayer;
            function startAutoPlay(){
                //清除所有全局定时器
                for(let i=0;i<global_timers.length;i++){
                    clearInterval(global_timers[i]);
                }
                autoPlayer=setInterval(function(){
                    //alert("hello");
                    if(autoPlay){
                        playNext();
                    }else{

                    }
                },opts.duration);
                global_timers.push(autoPlayer);
                showPauseButton();
            }
            function stopAutoPlay(){
                if(autoPlayer) {
                    clearInterval(autoPlayer);
                }
                showContinueButton();
            }
            function playPreviousManually(){
                stopAutoPlay();
                playPrevious();
            }
            function playPrevious(){
                    currentIndex=(currentIndex-1);
                    if(currentIndex<0){
                        if(opts.leftEndAlert){
                            alert("已到达起始页，为您跳转至本组ppt末尾页");
                        }
                        currentIndex=childArr.length-1;
                    }
                    visualise(childArr,currentIndex);
            }
            function playNextManually(){
                stopAutoPlay();
                playNext();
            }
            function playNext(){
                currentIndex++;
                if(currentIndex>=childArr.length){
                    if(opts.rightEndAlert){
                        alert("已到达末尾页，为您跳转至本组ppt首页");
                    }
                    currentIndex=0;
                }
                visualise(childArr,currentIndex);
            }

            //初始化状态
            if(opts.autoPlay){
                startAutoPlay();
            }else{
                stopAutoPlay();
            }
            //监听window resize事件
            window.onresize = () => {
                return (() => {
                    show("resized...");
                })();
            };
        });
    };
    $.fn.PPTSlider.opts = {
        autoPlay: false,
        dir: null,
        isAnimate: false,
        duration:3000,
        leftEndAlert:false,
        rightEndAlert:false,
    };
})(jQuery);