$(function () {
    var myCanvas = $('#myCanvas')[0];
    //简单地检测当前浏览器是否支持Canvas对象，以免在一些不支持html5的浏览器中提示语法错误
    if(myCanvas.getContext){
        // 获取对应的CanvasRenderingContext2D对象(画笔)
        var ctx = myCanvas.getContext("2d");
        // 创建新的图片对象
        var img = new Image();
        // 指定图片的URL
        img.src = "../../image/info/letter_of_commitment.jpg";
        // 浏览器加载图片完毕后再绘制图片
        img.onload = function(){
            // 以Canvas画布上的坐标(10,10)为起始点，绘制图像
            ctx.drawImage(img, 0, 0);
        };
    } else {
        $('.commitment').removeClass('hide').addClass('show-img');
    }
    // 禁止右键菜单
    $(myCanvas).bind('contextmenu', function(e){
        return false;
    });
});