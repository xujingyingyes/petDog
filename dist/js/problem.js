$(function() {
    var $root = $('html,body');
    var Tab = $('.idTabs');
    var resultCount, pageSize = 20,
        currentPage = 1;
    var col = 5;

    Tab.find('a').on('click', function(e) {
        e.preventDefault();
        //var setted = this.dataset.setted;
        var setted = $(this).attr('data-setted');
        var wraper = this.getAttribute('href');
        if (setted) return;
        this.setAttribute('data-setted', '1');
        col = this.name;

        init(col, wraper);
    }).eq(0).trigger("click");


    function init(col, wraper) {
        $.ajax({
            url: $$.Webapi.helplist,
            data: {
                typeId: col,
                recommend: 1
            },
            success: function(content) {
                if (content.resCode == "0000") {
                    resultCount = content.resultCount;
                    getHTML(content.resultList, wraper + '>ul');
                }
            }
        });
    }



    function getHTML(resList, wraper) {
        var artlist = [];
        var $ul = $(wraper);
        if (resList) {
            for (var i = 0, len = resList.length; i < len; i++) {
                artlist.push('<li class="clearfix"><div class="count fl">' + (i + 1) + '</div><div class="box fl"><p class="pro">' + resList[i].title + '</p><p class="answer">' + resList[i].content + '</p></div></li>');
            }
        }
        return $ul.html(artlist.join(''));
    }
})
