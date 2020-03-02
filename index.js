$(function(){
    //当前图片的标号
    picIndex=0;

    //导航栏hover：
    // $(".nav").hover(function(){
    //     $(this).find("a").css({color:"rgba(60,222,223,0.64)"});
    //     console.log("hhhh");
    // },);

    // 大图切换：
    $(".bigPic2").fadeOut(0);
    $(".bigPic3").fadeOut(0);

    $(".bigPicBox>.next").click(nextPic);
    $(".bigPicBox>.last").click(lastPic);

    var interval;
	interval=setInterval(nextPic,3000);

    function nextPic() {
        let i=(picIndex+1)%3;
        $(".listTitle").eq(i).trigger('click');
    }

    function lastPic() {
        let i=picIndex-1;
        i=i>-1?i:2;
        $(".listTitle").eq(i).trigger('click');
    }

    //鼠标放在半圆图标上时，停止计数器
    $(".bigPicBox>.next").hover(function(){
        clearInterval(interval);
		$(this).animate({opacity:1});
		
    },function(){
		interval=setInterval(nextPic,3000);
        $(this).animate({opacity:0.5});
    });
	
    $(".bigPicBox>.last").hover(function(){
		clearInterval(interval);
        $(this).animate({opacity:1});
    },function(){
		interval=setInterval(nextPic,3000);
        $(this).animate({opacity:0.5});
    });

    //点击小标题切换图片：
    $(".listTitle").click(function(){
        //竖线消失
        $(".listIcon").eq(picIndex).animate({opacity:0});
        $(".listTitle").eq(picIndex).css({fontWeight:"normal"});
        //竖线显示
        //$(this).siblings().animate({opacity:1});
        let idStr=$(this).attr("id").substring(5,6);
        let id=parseInt(idStr);
        $(".listIcon").eq(id).animate({opacity:1});
        //字体：粗体
        $(".listTitle").eq(id).css({fontWeight:"bold"});
        changeBigPic(id);
    })

    //鼠标放在小标题上时，停止计数器
    $(".listTitle").hover(function(){
        clearInterval(interval);
    },function(){
        interval=setInterval(nextPic,3000);
    });



    //从picIndex的图片跳转到toIndex的图片
    function changeBigPic(toIndex){
        //当前图片fadeout：
        $(".bigPic").eq(picIndex).fadeOut(0,
            //fadeOut动作完成后开始跳出目标图片
            function () {
                picIndex=toIndex;
                //目标图片图片闪现：
                $(".bigPic").eq(picIndex).fadeIn(0);
                //大文字滑动动画：
                $(".bigIntro").eq(picIndex).css({left:0});
                $(".bigIntro").eq(picIndex).animate({left:"1.0rem"},500,"swing");
                //小文字滑动动画：
                $(".smallIntro").eq(picIndex).css({left:0});
                $(".smallIntro").eq(picIndex).animate({left:"1.0rem"},500,"swing");
        });
    }



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

            else if($(this).hasClass("rightIndex2")){
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

            else if($(this).hasClass("rightIndex1")){
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

            else if($(this).hasClass("leftIndex2")){
                $(".left1").slideUp(800,function(){
                    $(".left2").slideDown(800);
                });
                // $(".left2").fadeIn();
            }


        }
    }
    $(".leftIndexLine>a").click(choose);
    $(".rightIndexLine>a").click(choose);

    //效果体验 before->after

    $(".leftBtn").click(function(){
        $(this).hide();
        $(this).siblings().slideDown(2000);
    })

    $(".rightBtn").click(function(){
        $(this).hide();
        let newImg=$(this).siblings();
        newImg.css({display:"block",width:"0"});
        newImg.animate({
            width:"2.10rem",
        },2000);
    })


    //入场动画

    // product隐藏
    let smallHeight=$(".smallPicBox").css("height");
    let smallWidth=$(".smallPicBox").css("width");
    let smallMargin=$(".smallPicBox").css("marginLeft");
    $(".smallPicBox").css("height",parseInt(smallHeight));

    console.log("smallWidth:"+smallWidth);
    console.log("smallMargin:"+smallMargin);
    $(".smallPicBox").css({marginLeft: "100%"});
    $(".smallPicBox").css({width: smallWidth});

    // Effect隐藏
    $(".left1").slideUp(0);
    $(".right1").css({overflow:"hidden"});
    $(".right1").css({display:"block", width:"0"});

    //监听页面滚动：
    let hasAppeared1=false;
    let hasAppeared2=false;
    $(window).scroll(function() {
        //为了保证兼容性，这里取两个值，哪个有值取哪一个
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var browHeight = document.documentElement.clientHeight || document.body.clientHeight;

        //product动画：

        H1=$(".smallPicBox").offset().top+parseFloat(smallHeight)/2;
        if(scrollTop+browHeight>H1 && !hasAppeared1){
             $(".smallPicBox").animate({marginLeft: smallMargin},600,"swing");
             hasAppeared1=true;
        };

        //effect动画：
        H2=$(".effectBox").offset().top+parseFloat($(".effectBox").css("height"))/2;

        if(scrollTop+browHeight>H2 && !hasAppeared2){
            $(".left1").slideDown(800);
            $(".right1").animate({
                width:"2.40rem",
            },800);
            hasAppeared2=true;
        }
    });// $(window).scroll




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


//点击导航栏滑动页面：
function jumpTo(i){
    let H;
    if(i==0)
        H=0;
    else
        H=$(".title").eq(i-1).offset().top;
    $('html,body').animate(
        {scrollTop:H},
        {duration:500,easing:'swing'}
    );
    return false;
}