$(function() {
    var $root = $('html,body');
    var Tab = $('.idTabs');
    var resultCount, pageSize = 20,
        currentPage = 1;
    var col = 16;
    var inited;

    Tab.find('a').on('click', function(e) {
        e.preventDefault();
        //var setted = this.dataset.setted;
        var setted = $(this).attr('data-setted');
        var wraper = this.getAttribute('href');
        col = this.name;
        if (setted || wraper.indexOf('javascript') > -1) return;
        resultCount = 0;
        currentPage = 1;
        this.setAttribute('data-setted', '1');
        inited = false;
        init(currentPage, wraper + '>ul', true);
    }).eq(0).trigger('click');

    (function() {
        var bannerList = [{
            bgColor: '',
            imgUrl: 'image/banner-sq2.jpg?v=20171211',
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

    function init(currentPage, wrapper, isFirst) {
        $.ajax({
            url: $$.Webapi.contentindex,
            data: {
                columnId: col,
                // recommend: 2,
                iPage: currentPage,
            },
            headers : {
                "client": 1
            },
            success: function(content) {
                if (content.resCode == "0000") {
                    resultCount = content.resultCount;
                    getHTML(content.resultList, wrapper, isFirst);
                    resultCount>0 && setPage($(wrapper).siblings('.page').find('ul'), wrapper);
                }
            }
        });
    }

    function setPage(pager, listWraper) {
        if (inited) {
            return
        }
        var pageWraper = $(pager);
        pageWraper.jqPaginator({
            totalPages: Math.ceil(resultCount / pageSize) || 0,
            visiblePages: pageSize,
            currentPage: currentPage,
            first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
            prev: '<li class="prev"><a href="javascript:void(0);"><i class="arrow arrow2"><\/i>上一页<\/a><\/li>',
            next: '<li class="next"><a href="javascript:void(0);">下一页<i class="arrow arrow3"><\/i><\/a><\/li>',
            last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
            page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
            onPageChange: function(num, type) {
                currentPage = num;
                if (!inited) {
                    inited = true;
                } else {
                    init(currentPage, listWraper, num === 1);
                }
            }
        });
    }

    function getHTML(resList, wraper, isFirst) {
        var artlist = [];
        var $ul = $(wraper);
        if (resList) {
            // getRecom(function(data) {
            //    var _data, isRec;

            //    if (data) {
            //       isRec = true;
            //       resList.unshift(data)
            //   }
            for (var i = 0, len = resList.length; i < len; i++) {
                _data = new Date( parseInt(resList[i].showTime));
                var mm=parseInt(_data.getMonth() + 1)>9 ?parseInt(_data.getMonth() + 1):'0'+parseInt(_data.getMonth() + 1);
                var dd=parseInt(_data.getDate())>9 ? parseInt(_data.getDate()):'0'+parseInt(_data.getDate());
                // if (isRec && i === 0) {
                //    artlist.push('<li class="first fl "><a href="/sy_details.html?col=contentdetail&from=syConverge.html&contentId='
                //           + resList[i].id + '"><img src="' + resList[i].imgUrl + '" alt=""> <div class="mask"><p>' + resList[i].title + '</p></div></a></li>')
                // } else {
                artlist.push('<li class="fl"><a href="sy_details.html?col=contentdetail&from=syConverge.html&id=' + resList[i].id + '"><img src="'
                    + resList[i].imgUrl + '" alt="" class="img"><b class="tit">' + resList[i].title + '</b> <div class="clearfix det"><i class="fl">'
                    + _data.getFullYear() + '-' + mm + '-' + dd + '</i></span><span class="liulan fr icon-liulan">&nbsp;'
                    + resList[i].pageView +'</span></div></a></li>')
                // }
            }
            return $ul.html(artlist.join('') || '暂无数据');
            // }, isFirst);
        } else {
            return $ul.html('暂无数据');
        }
    }

    function getRecom(callback, isRecom) {
        if (isRecom) {
            $.ajax({
                url: $$.Webapi.contentindex,
                data: {
                    columnId: col,
                    pageSize: 1,
                    // recommend: 1
                },
                success: function(content) {
                    if (content.resCode == "0000") {
                        if (typeof callback === 'function') {
                            callback.call(this, content.resultList && content.resultList.length ? content.resultList[0] : null)
                        }
                    }
                }
            });
        } else {
            callback.call(this, null)
        }
    }
});