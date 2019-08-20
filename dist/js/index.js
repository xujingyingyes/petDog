 $(function() {
    $('.invest').on('click',function (e) {
        e.preventDefault();
        var t = $(window).scrollTop();
        var t2=$('#main').height()+$('#tab-carousel').height();
        $('body,html').animate({scrollTop:t+t2-116},100);
    });

    $('.loan').on('click',function (e) {
        e.preventDefault();
        var t = $(window).scrollTop();
        var t2=$('#main').height()+$('#tab-carousel').height()+$('#financing').height();
        $('body,html').animate({scrollTop:t+t2-116},100);
    });

        var shades = $('#shades'),
        sleft = shades.find('.left'),
        sright = shades.find('.right');
    var state = 0;
    sleft.on({
        mouseover: function(e) {
            if (state === 0) return;
            state = 0;
            sleft.addClass('hover');
            sright.removeClass('hover');
        }
    });

    sright.on({
        mouseover: function(e) {
            if (state === 1) return;
            state = 1;
            sright.addClass('hover');
            sleft.removeClass('hover');
        }
    });

    // $.ajax({
    //     url: $$.Webapi.notice,
    //     success: function(content) {
    //         console.log(content)
    //         if (content.resCode == "0000") {
    //             var resList = content.resultList;
    //             var artlist = [];
    //             var $ul = $("#notice > ul");
    //             if (resList) {
    //                 var _data;
    //                 for (var i = 0, len = resList.length; i < len; i++) {
    //                     _data = new Date( parseInt(resList[i].showTime));
    //                     var mm=parseInt(_data.getMonth() + 1)>9 ?parseInt(_data.getMonth() + 1):'0'+parseInt(_data.getMonth() + 1);
    //                     var dd=parseInt(_data.getDate())>9 ? parseInt(_data.getDate()):'0'+parseInt(_data.getDate());
    //                     artlist.push('<li><a href="notice_details.html?col=noticedetail&from=notice.html&id=' + resList[i].id + '"><span class="fl">' + resList[i].title + '</span> <span class="fr">' + mm+'-' + dd+ '</span> </a></li>')
    //                 }
    //             }
    //             $ul.html(artlist.join(''));
    //             $$.autoNotice($ul, 4000);
    //         }
    //     }
    // });
    // $.ajax({
    //     url: $$.Webapi.getfriendAward,
    //     success: function(content) {
    //         if (content.resCode == "0000") {
    //             var respond = content.data;
    //                 _investReward = ((respond.investReward*100).toFixed(2)*100/100),
    //                 awardText1 = '',
    //                 awardText2 = '';
    //             if(respond.day == 0){
    //                 awardText1 = '好友注册之日起的每笔投资，均可得收益的'+ _investReward +'%奖励'
    //             }else if(respond.day%365 == 0 && respond.day > 0){
    //                 awardText1 = '好友注册之日起'+ respond.day/365 +'年内的每笔投资，均可得收益的'+ _investReward +'%奖励'
    //             }else if(respond.day%365 !=0){
    //                 awardText1 = '好友注册之日起'+ respond.day +'天内的每笔投资，均可得收益的'+ _investReward +'%奖励'
    //             }

    //             if(respond.singleReward==0 && respond.reward>0 && respond.inviteeReward==respond.reward){
    //                 awardText2 = '好友注册绑卡并实名认证后，您与好友各得'+ respond.reward +'元现金奖励';
    //             }else if(respond.singleReward==0 && respond.reward>0 && respond.inviteeReward>0 && respond.inviteeReward !=respond.reward){
    //                 awardText2 = '好友注册绑卡并实名认证后，您得'+ respond.reward +'元现金奖励，您的好友得'+ respond.inviteeReward +'元现金奖励';
    //             }else if(respond.singleReward==0 && respond.reward==0 && respond.inviteeReward>0){
    //                 awardText2 = '好友注册绑卡并实名认证后，您的好友得'+ respond.inviteeReward +'元现金奖励';
    //             }else if(respond.singleReward==0 && respond.reward>0 && respond.inviteeReward==0){
    //                 awardText2 = '好友注册绑卡并实名认证后，您得'+ respond.reward +'元现金奖励';
    //             }else if(respond.singleReward!=0 && respond.reward>0 && respond.inviteeReward==respond.reward){
    //                 awardText2 = '好友单笔投资满'+ respond.singleReward +'元，您与好友各得'+ respond.reward +'元现金奖励';
    //             }else if(respond.singleReward!=0 && respond.reward>0 && respond.inviteeReward>0 && respond.inviteeReward!=respond.reward){
    //                 awardText2 = '好友单笔投资满'+ respond.singleReward +'元，您得'+ respond.reward +'元现金奖励，您的好友得'+ respond.inviteeReward +'元现金奖励';
    //             }else if(respond.singleReward!=0 && respond.reward==0 && respond.inviteeReward>0){
    //                 awardText2 = '好友单笔投资满'+ respond.singleReward +'元，您的好友得'+ respond.inviteeReward +'元现金奖励';
    //             }else if(respond.singleReward!=0 && respond.reward>0 && respond.inviteeReward==0){
    //                 awardText2 = '好友单笔投资满'+ respond.singleReward +'元，您得'+ respond.reward +'元现金奖励';
    //             }
    //             $('.enjoy-award').text(_investReward);
    //             $('.invest-award1').text(awardText1+';');
    //             $('.invest-award2').text(awardText2+'。');
    //         }
    //     }
    // });

    var tabcont = $('.tabcontent');
    $("#mslider").slide({
        mainCell: ".bd ul",
        autoPlay: true,
        effect: 'leftLoop',
        endFun: function(i) {
            tabcont.eq(i).fadeIn().siblings().hide()
        }
    });

    (function() {
        var bannerList = [{
            bgColor: '',
            imgUrl: 'image/banner-sq1.jpg?v=20171211',
            redirectUrl: 'sy_details.html?col=contentdetail&from=syConverge.html&id=379'
        }];
        var domlist = [];
        var dotlist = $('#dotlist');
        $.each(bannerList, function(i, val) {
            domlist.push('<li><a class="a1" style="background-color:' + val.bgColor + ';background-image:url(' + val.imgUrl + ')" href="' + val.redirectUrl + '">&nbsp;</a></li>');
            dotlist.append('<li/>')
        });

        $('#bannerlist').html(domlist.join(''));
        $("#slideBox").slide({
            mainCell: ".bd ul",
            autoPlay: true,
            effect: "fold",
            delayTime: 1000,
            startFun: function(i, c, slider, titCell, mainCell, targetCell, prevCell, nextCell) {
                var _slid = slider.find('a').eq(i);
                if (!_slid.attr('data-src')) {
                    return;
                }
                _slid.css('background', _slid.attr('data-src'));
                _slid.removeAttr('data-src')
            },
            interTime: 3500
        });
    }());

 })