$(function(){
    picIndex=0;

    function jumpTo(i){
        $('html,body').animate({
            scrollTop:$(".aaa1").offset().top},{duration:500,easing:'swing'});
        return false;
    }

    // 大图渐入渐出：
    $(".bigPic2").fadeOut(0);
    $(".bigPic3").fadeOut(0);

    $(".bigPicBox>.next").click(nextPic);

    function nextPic() {
        // console.log("picIndex:" + picIndex);
        $(".bigPic").eq(picIndex).fadeOut(0, function () {
            picIndex = (picIndex + 1) % 3;
                $(".bigPic").eq(picIndex).fadeIn(0, function () {
                    // console.log("picIndex:" + picIndex);
                })
        });
        $(".bigIntro").eq(picIndex).css({left:0});
        $(".bigIntro").eq(picIndex).animate({
            left:"1.0rem"
        },300,"swing");

        $(".smallIntro").eq(picIndex).css({left:0});
        $(".smallIntro").eq(picIndex).animate({
            left:"1.0rem"
        },300,"swing");

    }
    setInterval(nextPic,3000);


    // 效果体验滑动切换
    function choose(){
        if(!($(this).hasClass("chosen"))) {
            $(this).siblings().removeClass("chosen");
            $(this).addClass("chosen");

            if($(this).hasClass("leftIndex1")){
                $(".left2").slideUp(800,function(){
                    $(".left1").slideDown(800);
                });
                // $(".left1").fadeIn();
            }
            else if($(this).hasClass("leftIndex2")){
                $(".left1").slideUp(800,function(){
                    $(".left2").slideDown(800);
                });
                // $(".left2").fadeIn();
            }
            else if($(this).hasClass("rightIndex1")){
                // $(".right2").slideUp(800,function(){
                //     $(".right1").slideDown(800);
                // });
                $(".right2").animate({
                    width: "0"
                },800,function(){
                    $(".right2").css({display:"none"});
                    $(".right1").css({overflow:"hidden"});
                    $(".right1").css({display:"block", width:"0"});
                    $(".right1").animate({
                        width:"2.40rem",
                    },800)
                });

            }
            else if($(this).hasClass("rightIndex2")){
                // $(".right1").slideUp(800,function(){
                //     $(".right2").slideDown(800);
                //
                // });
                $(".right1").animate({
                    width: "0"
                },800,function(){
                    $(".right1").css({display:"none"});
                    $(".right2").css({overflow:"hidden"});
                    $(".right2").css({display:"block", width:"0"});
                    $(".right2").animate({
                        width:"2.40rem",
                    },800)
                });
            }
        }
    }
    $(".leftIndexLine>a").click(choose);
    $(".rightIndexLine>a").click(choose);

    //效果体验 before->after

    $(".leftBtn").click(function(){
        $(this).hide();
        $(".leftBox>.imgBox").slideDown(2000);
    })



});
















//rem相对尺寸:

(function(doc, win) {
    var docEl = doc.documentElement,
        isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
        dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
        dpr = 1,
        scale = 1 / dpr,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    docEl.dataset.dpr = dpr;
    var metaEl = doc.createElement('meta');
    metaEl.name = 'viewport';
    metaEl.content = 'initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale;
    docEl.firstElementChild.appendChild(metaEl);
    var recalc = function() {
        var width = docEl.clientWidth;
        console.log("docwidth"+docEl.clientWidth);
        // if (width / dpr > 690) {
        //     width = 690 * dpr;
        // }
        // 乘以100，px : rem = 100 : 1
        docEl.style.fontSize = 100 * (width / 690) + 'px';
        console.log(docEl.style.fontSize);
    };
    recalc()
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
})(document, window);