$(function() {
    init();

    function init() {
        var $col = $$.getUrlParam('col');
        var $id = $$.getUrlParam('id'),
            $columnId = $$.getUrlParam('columnId'),
            $contentId = $$.getUrlParam('contentId');
        var $datas = {};
        var from = $$.getUrlParam('from');
        if ($id) {
            $datas.id = $id
        } else if ($columnId) {
            $datas.columnId = $columnId
        } else if ($contentId) {
            $datas.contentId = $contentId
        }
        $.ajax({
            url: $$.Webapi[$col],
            data: $datas,
            success: function(content) {

                if (content.resCode == "0000") {
                    var _data = content.data || content.resultList;
                    getHTML(_data, "#main .margin");
                }
            }
        });
        document.getElementById('reback').setAttribute('href', '/' + from.replace(/\$/, '#'))
    }

    function getHTML(resList, wraper) {
        var artlist;
        if (resList) {
            var _data = new Date(resList.showTime);
            document.title = resList.title + "-商赢金服";
            var mm=parseInt(_data.getMonth() + 1)>9 ?parseInt(_data.getMonth() + 1):'0'+parseInt(_data.getMonth() + 1);
            var dd=parseInt(_data.getDate())>9 ? parseInt(_data.getDate()):'0'+parseInt(_data.getDate());
            artlist = '<div class="title-box"><p class="name">' + resList.title + '</p><p class="date">' + _data.getFullYear() + '-' + mm + '-' + dd+"&nbsp;&nbsp;&nbsp;&nbsp;" + resList.comeFrom +
                '&nbsp;&nbsp;&nbsp;&nbsp;<span class="looks">阅读&nbsp;'+ resList.pageView +'</span></p></div><div class="content"><div class="detail">'
                + resList.content + '</div></div>'
        }
        return $(wraper).html(artlist);
    }
})
