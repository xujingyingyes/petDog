$(function () {
    var myCanvas = $('#myCanvas')[0];
    //�򵥵ؼ�⵱ǰ������Ƿ�֧��Canvas����������һЩ��֧��html5�����������ʾ�﷨����
    if(myCanvas.getContext){
        // ��ȡ��Ӧ��CanvasRenderingContext2D����(����)
        var ctx = myCanvas.getContext("2d");
        // �����µ�ͼƬ����
        var img = new Image();
        // ָ��ͼƬ��URL
        img.src = "../../image/info/letter_of_commitment.jpg";
        // ���������ͼƬ��Ϻ��ٻ���ͼƬ
        img.onload = function(){
            // ��Canvas�����ϵ�����(10,10)Ϊ��ʼ�㣬����ͼ��
            ctx.drawImage(img, 0, 0);
        };
    } else {
        $('.commitment').removeClass('hide').addClass('show-img');
    }
    // ��ֹ�Ҽ��˵�
    $(myCanvas).bind('contextmenu', function(e){
        return false;
    });
});