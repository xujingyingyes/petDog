$.ajaxSetup({
    dataType: "json",
    contentType: "application/json",
    accept: "application/json",
    headers: {
        "client": 1
    }
});

$(function() {
    var inited;
    var ENV = (function() {
        var dom = document.domain;
        var env;
        switch (dom) {
            case 'www.sy8.com':
                env = 'prod';
                break;
            case 'www.sy9.com':
                env = 'beta';
                break;
            case 'www.shangyingjr.com':
                env = 'tempprod';
                break;
            case 'www.shangyingjf.com':
                env = 'preprod';
                break;
            case '10.52.2.53':
                env = 'yc';
                break;
            default:
                env = 'dev';
                break;
        }
        return {
            prod: '//api.sy8.com/eurekaFrontBK/',
            beta: '//api.sy9.com/eurekaFrontBK/',
            yc: 'http://10.52.2.53:7011/', // ѹ��
            dev: 'http://10.52.2.203:7011/', //����
            tempprod: '//api.shangyingjr.com/eurekaFrontBK/',
            preprod: '//api.shangyingjf.com/eurekaFrontBK/',
        }[env]
    }());

    var $$ = {
        months: [1,2,3,4,5,6,7,8,9,10,11,12],
        Webapi: {
            contentindex: ENV + 'api/content/shangYi/list', //��Ӯ���б�
            contentdetail: ENV + 'api/content/shangYi/detail', //��Ӯ������
            bannerList: ENV + 'api/content/banner',
            notice: ENV + 'api/content/notice/list', // ��ҳ����
            noticedetail: ENV + 'api/content/notice/detail', //��������
            helplist: ENV + 'api/content/help/list', //��������
            blank: ENV + 'api/content/notice/list',
            getfriendAward:  ENV + 'api/config/getfriendAward', // ����Ͷ�ʽ�������
            queryOperateData: ENV + 'api/report/queryOperateData'  //��Ӫ���ݱ���ӿ�
        },
        getUrlParam: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //����һ������Ŀ�������������ʽ����
            var r = window.location.search.substr(1).match(reg); //ƥ��Ŀ�����
            if (r != null) return unescape(r[2]);
            return null; //���ز���ֵ
        },
        autoNotice: function(eleID, interval) {
            var ele = eleID,
                time;
            time = setInterval(runNext, interval);
            ele.hover(function() {
                clearInterval(time);
            }, function() {
                clearInterval(time);
                time = setInterval(runNext, interval);
            });

            function runNext() {
                var first = ele.find("li").eq(0);
                var  liHeight = ele.find("li").height();
                ele.css({ "position": "absolute" }).animate({ 'top': -liHeight }, 500, function() {
                    ele.append(ele.find("li").eq(0));
                    // ele.find("li").eq(0).remove();
                    ele.css({ "top": "0" });
                });
            }
        },
        init: function() {
            if (inited) return;
              // setHeader();
            if ((location.pathname.match(/info/))) {
                setNav();
            }
           // setFooter();
           // setStair();
            //setService();
        }
    };


    function setNav() {
        if($('.tab-top')[0]) return;
        var nav = [],
            focus = location.pathname.replace(/\/html\/info\/(.+)\.html/, '$1'),
            arr = {
                introduce: 0,
                record_info: 1,
                bank_depository: 1,
                operation_report: 2,
                safety_guarantee: 3,
                audit_info: 4,
                laws: 5,
                major_matters: 6,
                letter_of_commitment: 7,
                contact_us: 8
            };
        nav.push('<div class="tab-top">');
        nav.push('    <div class="margin clearfix idTabs" id="aboutUsTab">');
        nav.push('        <a class="tab-bar fl" href="/html/info/introduce.html">��˾����</a>');
        nav.push('        <a class="tab-bar fl" href="/html/info/record_info.html">������Ϣ</a>');
        nav.push('        <a class="tab-bar fl" href="/html/info/operation_report.html">��Ӫ����</a>');
        nav.push('        <a class="tab-bar fl" href="/html/info/safety_guarantee.html">��ȫ����</a>');
        nav.push('        <a class="tab-bar fl" href="/html/info/audit_info.html">�����Ϣ</a>');
        nav.push('        <a class="tab-bar fl" href="/html/info/laws.html">���ɷ���</a>');
        nav.push('        <a class="tab-bar fl" href="/html/info/major_matters.html">�ش�����</a>');
        nav.push('        <a class="tab-bar fl" href="/html/info/letter_of_commitment.html">���˳�ŵ��</a>');
        nav.push('        <a class="tab-bar fl selected" href="/html/info/contact_us.html">��ϵ����</a>');
        nav.push('    </div>');
        nav.push('</div>');
        $('#main').prepend(nav.join(''));
        $($('.tab-bar')[arr[focus]]).addClass('selected').append('<span class="icon-sanjiao"></span>');
    }
    function setHeader() {
        var headers = [];
        var $head;
        var $myPath = location.pathname.replace(/^\/dist\/|^\//, ''); //����|����
        var $pathName = '';
        if ($myPath.match(/info/)) {
            $pathName = '/html/info/introduce.html';
        }else {
            $pathName = '/' + $myPath;
        }
        var $active;
        if (document.getElementById('head')) { return; }
        headers.push('<div class="placehd"></div>');
        headers.push('<div id="head">');
        headers.push('     <div class="top clearfix">');
        headers.push('          <div class="margin0"> �������� 400-728-5588��������9:00-18:00��');
        headers.push('             <div class="top-r clearfix fr\">' );
        headers.push('                  <a href="/notice.html" class="fl note"><span class="icon-notice top-icon"></span>ƽ̨����');
        headers.push('                      <div class="showit bg-no"></div>');
        headers.push('                  </a>');
        headers.push('                  <a href="javascript:volid(0);" class="fl note"><span class="icon-wechat top-icon"></span>΢�Ź��ں�');
        headers.push('                      <div class="showit"><img src="/image/gongzhonghao.png" alt="" width="130"></div>');
        headers.push('                  </a>');
        headers.push('                  <a href="javascript:volid(0);" class="fl note"><span class="icon-download top-icon"></span>����APP��');
        headers.push('                      <div class="showit"><img src="/image/download-app.png" alt="" width="130"></div>');
        headers.push('                  </a>');
        headers.push('              </div>');
        headers.push('          </div>');
        headers.push('     </div>');
        headers.push('     <div class="head clearfix margin0">');
        headers.push('          <div class="logo fl">');
        headers.push('              <a href="/index.html"><img src="/image/slogin.svg" alt=""></a>');
        headers.push('          </div>');
        headers.push('         <div class="nav fr">');
        headers.push('              <ul class="clearfix">');
        headers.push('                  <li class="fl"><a href="/index.html" class="">��ҳ</a></li>');
        headers.push('                  <li class="fl"><a href="/syConverge.html" class="">��Ӯ��</a></li>');
        headers.push('                  <li class="fl"><a href="/problem.html" class="">��������</a></li>');
        headers.push('                  <li class="fl"><a href="/html/info/introduce.html" class="">��Ϣ��¶</a></li>');
        headers.push('              </ul>');
        headers.push('         </div>');
        headers.push('      </div>');
        headers.push(' </div>');

        $head = $(headers.join(''));
        $('body').prepend($head);

        $active = $head.find('a[href="' + $pathName + '"]');
        if (!$active.length && location.search && $$.getUrlParam('from')) {
            var $match = $$.getUrlParam('from').match(/^(.+).(html)/);
            if ($match) {
                $active = $head.find('a[href="' + $match[0] + '"]')
            }
        }
        $active.addClass('active');

        //����
        (function() {
            var a_on = $('.top-r a');
            a_on.each(function(index) {
                var $this = $(this);
                $this.on({
                    mouseover: function(e) {
                        $this.find('.showit').addClass('on')
                    },
                    mouseout: function(e) {
                        $this.find('.showit').removeClass('on')
                    },
                    click: function(e) {
                        if (index === 0) {

                        }
                    }
                })
            });
        }());

    }
    function setFooter() {
        var footers = [];
        if (document.getElementById('footer')) { return; }
        footers.push('<footer id="bottom-footer">');
        footers.push('   <div id="bottom">');
        footers.push('      <div class="margin-footer">');
        footers.push('         <p class="tit">�Ƹ����㣬���ֿɼ�</p>');
        footers.push('         <div class="line"></div>');
        footers.push('         <ul class="Column clearfix">');
        footers.push('              <li class="about-us fl">');
        footers.push('                 <p class="dt">��������</p>');
        footers.push('                  <div class="link">');
        footers.push('                           <a href="/html/info/introduce.html">��˾����</a>');
        // footers.push('                           <a href="/html/info/introduce.html?position=team">�����Ŷ�</a>');
        footers.push('                           <a href="/html/info/introduce.html?position=culture">��ҵ�Ļ�</a>');
        footers.push('                           <a href="/html/info/safety_guarantee.html">��ȫ����</a><br>');
        footers.push('                           <a href="/notice.html">ƽ̨����</a>');
        footers.push('                           <a href="/problem.html">��������</a>');
        footers.push('                   </div>');
        footers.push('              </li>');
        footers.push('               <li class="hot-line fl">');
        footers.push('                  <p class="dt">��������<span class="f18">&nbsp;&nbsp;(��ѯ/Ͷ��/�ٱ�)</span></p><p class="tel">400-728-5588</p> <p>����ʱ�䣺������9:00-18:00</p><p>��˾��ַ��www.sy8.com</p><p>��˾���䣺cs@sy8.com</p>');
        footers.push('               </li>')
        footers.push('               <li class="QR fl clearfix">');
        footers.push('                   <div class="QR-box fl"><img src="/image/download-app.png" alt=""><span>����APP<br>��Ӯ���</span></div>');
        footers.push('                   <div class="QR-box fl"><img src="/image/gongzhonghao.png" alt=""><span>��ע΢�Ź��ں�<br>gh_f4e1a07bbe55</span></div>');
        footers.push('                   <div class="QR-box fl"> <img src="/image/kefu.png" alt="">���߿ͷ�  </div>');
        footers.push('               </li>');
        footers.push('           </ul>');
        footers.push('        </div>');
        footers.push('    </div>');
        footers.push('    <div id="back">');
        footers.push('         <div class="margin-footer clearfix">');
        footers.push('              Copyright ? 2015-2017 ��Ӯ�� <span>|</span><a href="http://www.miitbeian.gov.cn" target="_blank" class="underline hover-fff">��ICP��15024345��-1</a><span>|</span>�Ϻ���Ӯ�ֵ㻥����������Ϣ�������޹�˾');
        footers.push('               <div class="img-box fr">');
        footers.push('                  <a href="http://webscan.360.cn/index/checkwebsite/url/www.sy8.com"  target="_blank"><img src="/image/360.png" alt="" width="86"></a>');
        footers.push('                  <a href="https://trustsealinfo.verisign.com/splash?form_file=fdf/splash.fdf&dn=www.sy8.com&lang=zh_cn"  target="_blank"><img src="/image/norton.png" alt="" width="86"></a>');
        footers.push('                  <a href="http://www.wdzj.com/"  target="_blank"><img src="/image/wdzj.png" alt="" width="86"></a>')
        footers.push('                  <a href="/image/Itrust.png" data-lightbox="image-3" data-title=""><img src="/image/xin.png" alt="" class="xin" width="45"></a>');
        footers.push('              </div>');
        footers.push('         </div>');
        footers.push('     </div>');
        footers.push('</footer>');

        $('body').append($(footers.join('')));
    }

    function setService(){
        var service = [];
        if (document.getElementById('kefu')) { return; }
        service.push('<div id="kefu">');
        service.push('<div class="title clearfix" id="title">��Ӯ������߿ͷ� <div class="fr closeit"><span class="icon-close"></span></div></div>');
        service.push('<iframe id="iframeId" name="myframe" src="https://www.sobot.com/chat/h5/index.html?sysNum=a36c58ed16154b7e884246f62507f07a" width="400" height="360" scrolling="no" style="background-color: transparent;" frameborder="0">');
        service.push(' </iframe>');
        service.push('</div>');
        $('body').append($(service.join('')));

         (function() {
             $('.closeit').on('click',function(){
                $('#kefu').hide();

             });

        }());


    }

    function setStair() {
        var stair = [];
        stair.push('<section class="stair">');
        stair.push('<ul> <li class="floor">');
        stair.push('            <span class="icon-kefu icons"></span>');
        stair.push('           <div class="layer"><div class="ver text"> ���߿ͷ�</div></div>');
        stair.push('     </li>');
        stair.push('     <li class="floor">');
        stair.push('            <span class="icon-tel1 icons"></span>');
        stair.push('           <div class="layer"><div class="text">  <p class="hot-line">�ͷ�����</p><p class="tel">400-728-5588</p> </div> </div>');
        stair.push('      </li>');
        stair.push('     <li class="floor">');
        stair.push('            <span class="icon-wechat2 icons"></span>');
        stair.push('           <div class="layer"><div class="text"> <p class="sao">ɨ���ά���ע</p> <p class="wk">΢�ſͷ�</p></div><img src="/image/kefu.png" alt="" width="106"> </div>');
        stair.push('      </li>');
        stair.push('      <li class="floor gift">');
        stair.push('            <span class="icon-activity icons"></span>');
        //stair.push('           <div class="layer"></div>');
        stair.push('       </li>');
        stair.push('       <li class="floor back-top">');
        stair.push('             <span class="icon-top icons"></span>');
        stair.push('            <div class="layer"><div class="ver text">���ض���</div></div>');
        stair.push('       </li> </ul>');
        stair.push(' </section>');
        $('#stair').append(stair.join(''));

        //�����
        (function() {
            var stairs = $('.stair li');

            $(window).scroll(function(){
                var h = $(window).scrollTop();
                if( h >200){
                    $('.back-top').fadeIn(100);
                }else{
                    $('.back-top').fadeOut(100);
                };
            });

            stairs.each(function(index) {
                var $this = $(this);
                $this.on({
                    mouseover: function(e) {
                        $this.addClass('active')
                    },
                    mouseout: function(e) {
                        $this.removeClass('active')
                    },
                    click: function(e) {
                         if (index === 0) {
                            $('#kefu').fadeIn(100);
                        }
                        if (index === stairs.length - 1) {
                            $('html,body').animate({ scrollTop: 0 }, 300);
                            stairs.trigger('mouseout')
                        }
                    }
                })
            });
        }());
    }


    window.$$ = $$;
    $$.init();
});

// Extend the default Number object with a formatMoney() method:
// usage: someVar.formatMoney(decimalPlaces, symbol, thousandsSeparator, decimalSeparator)
// defaults: (2, "$", ",", ".")
Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "$";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var number = this,
        negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};
