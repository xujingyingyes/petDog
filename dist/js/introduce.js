/**
 * Created by zhubinge on 2018/1/30.
 */
$(function () {
    var position = $$.getUrlParam('position');
    if(position === 'team') {
        $(document).scrollTop(905);
    }
    if (position === 'culture') {
        $(document).scrollTop(3400);
    }
    var circular = Math.PI * 2,
        endOne = circular * 0.4,
        endTwo = endOne + circular * 0.07,
        endThree = endTwo + circular * 0.53;
    function drawCircle(el, color, start, end){
        // 禁止右键菜单
        $(el).bind('contextmenu', function(e){
            return false;
        });
        var ctx = el.getContext('2d'),
            lineWidth = 25,
            r = el.width / 2;
        ctx.translate( -33, 136.5);
        ctx.rotate(Math.PI * -0.35);
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.putImageData(ctx.getImageData(0, 0, 190, 190), 0, 0);
        // 绘制 arc(x坐标, y坐标, r半径, 起始, 结束, false顺时针);
        ctx.arc(r, r, (r - lineWidth / 2), start, end, false);
        ctx.stroke();
    }
    drawCircle($('#canvas-graduate-1')[0], '#E2812F', 0, endOne);
    drawCircle($('#canvas-graduate-2')[0], '#4C85BB', endOne, endTwo);
    drawCircle($('#canvas-graduate-3')[0], '#D52626', endTwo, endThree);

    function BannerAnimation() {
        this.ul = $('.banner ul')[0];
        this.leftList = [-531, -1290, -2047, -2855, -3600, -4365];
        this.currentPage = 0;
        this.hover = false;
        this.animation = false;
        this.direction = 'next';
        this.auto = false;
        this.timeOut = null;
    }

    BannerAnimation.prototype = {
        // 下一页
        nextPage: function () {
                // console.log('下一页', this.hover, this.animation);
                // 如果鼠标没有移上
                if (!this.hover && !this.animation) {
                    this.direction = 'next';
                    this.currentPage++;
                    if (this.currentPage > 5) {
                        this.currentPage = 5;
                    }
                    var _this = this;
                    $(this.ul).animate({
                        left: this.leftList[this.currentPage]
                    },'normal', 'linear', function () {
                        _this.animation = false;
                        if (_this.currentPage === 5) {
                            $(_this.ul).css({
                                left: _this.leftList[0]
                            });
                            _this.currentPage = 0;
                        }
                        if(_this.auto) {
                            _this.timeOut = setTimeout(function () {
                                _this.dispatchFun(_this.auto);
                            },2000);
                        }
                    })
                }
            },
        // 上一页
        previousPage: function () {
            if (!this.hover && !this.animation) {
                this.direction = 'previous';
                this.currentPage--;
                if (this.currentPage < -1) {
                    this.currentPage = -1;
                }
                if (this.currentPage === -1) {
                    $(this.ul).css({
                        left: this.leftList[5]
                    });
                    this.currentPage = 4;
                }
                var _this = this;
                this.animation = true;
                $(this.ul).animate({
                    left: this.leftList[this.currentPage]
                },'normal', 'linear', function () {
                    _this.animation = false;
                })
            }
        },
        dispatchFun: function (auto) {
            if (this.animation) return;
            this.auto = auto;
            if (this.auto) {
                this.nextPage();
            }
        }
    };

    var myBanner = new BannerAnimation();
    var bannerBox = $('.banner');
    var timeOut;
    bannerBox.mouseover(function () {
        if (!myBanner.hover) {
            myBanner.auto = false;
            myBanner.hover = true;
            if (timeOut) {
                clearTimeout(timeOut);
            }
            if(myBanner.timeOut) {
                clearTimeout(myBanner.timeOut);
            }
        }
    });
    bannerBox.mouseleave(function () {
        myBanner.hover = false;
        if (!myBanner.animation) {
            timeOut = setTimeout(function () {
                if (!myBanner.hover) {
                    myBanner.auto = true;
                    myBanner.dispatchFun(true);
                }
            }, 2000);
        }
    });
    bannerBox.click(function (e) {
        var target = e.target.className;
        if(target === 'banner_left') {
            myBanner.hover = false;
            myBanner.previousPage();
            myBanner.hover = true;
        } else if (target === 'banner_right') {
            myBanner.hover = false;
            myBanner.nextPage();
            myBanner.hover = true;
        }
    });
    setTimeout(function () {
        myBanner.dispatchFun(true);
    }, 1000);

});
