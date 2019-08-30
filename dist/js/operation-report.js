$(function(){
    var circular = Math.PI * 2,
            startOne = 0 - circular * 0.25,
            endOne = startOne + circular * 0.37;
    function drawCircle(el, color, start, end){
        if (!el.getContext){
            $('.my-canvas').addClass('hide');
            $('.canvas-box').addClass('show-bg');
        } else {
            // 禁止右键菜单
            $(el).bind('contextmenu', function(e){
                return false;
            });
            var ctx = el.getContext('2d'),
                    lineWidth = 95,
                    r = el.width / 2;
            ctx.beginPath();
            ctx.lineWidth = lineWidth;
            // 渐变色
            if(color === 'blue') {
                color = ctx.createLinearGradient(0,0,170,0);
                color.addColorStop('', '#6A9DDD');
                color.addColorStop('1.0', '#588CD4');
            } else {
                color = ctx.createLinearGradient(0,0,170,0);
                color.addColorStop('', '#EBA4A4');
                color.addColorStop('1.0', '#ED8A8A');
            }

            ctx.strokeStyle = color;

            ctx.putImageData(ctx.getImageData(0, 0, 190, 190), 0, 0);
            // 绘制 arc(x坐标, y坐标, r半径, 起始, 结束, false顺时针);
            ctx.arc(r, r, (r - lineWidth / 2), start, end, false);
            ctx.stroke();
        }
    }

    drawCircle($('#canvas-graduate-1')[0], 'pink', startOne, endOne);
    drawCircle($('#canvas-graduate-2')[0], 'blue', endOne, startOne);

    $.ajax({
        url: $$.Webapi.queryOperateData,
        success: function(data) {
            if(data.resCode = "0000") {
                var handler = data.data;
                handler.dataCountTime = new Date(handler.dataCountTime).getFullYear()+"-"+$$.months[new Date(handler.dataCountTime).getMonth()]+"-"+new Date(handler.dataCountTime).getDate();
                handler.totalDealAmt = new Number(handler.totalDealAmt).formatMoney(0, '', ',', '.');
                handler.loanAmt = new Number(handler.loanAmt).formatMoney(0, '', ',', '.');
                handler.relateLoanAmt = new Number(handler.relateLoanAmt).formatMoney(0, '', ',', '.');
                handler.overdueAmt = new Number(handler.overdueAmt).formatMoney(0, '', ',', '.');
                handler.overdueNinetyAmt = new Number(handler.overdueNinetyAmt).formatMoney(0, '', ',', '.');
                var data= handler;
                var deadline = template('deadline', data);
                var ddline1 = template('dd-tmp1', data);
                var ddline2 = template('dd-tmp2', data);
                var ddline3 = template('dd-tmp3', data);
                var ddline4 = template('dd-tmp4', data);
                var ddline5 = template('dd-tmp5', data);
                var ddline6 = template('dd-tmp6', data);
                $("#dateday").html(deadline);
                $("#dd-line1").html(ddline1);
                $("#dd-line2").html(ddline2);
                $("#dd-line3").html(ddline3);
                $("#dd-line4").html(ddline4);
                $("#dd-line5").html(ddline5);
                $("#dd-line6").html(ddline6);
            }
        }
    })

});

