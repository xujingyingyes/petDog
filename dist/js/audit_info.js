$(function () {
    var box = $('.audit-info');
    $('.right-arrow').click(function () {
        box.animate({
            left: -1200
        })
    });
    $('.left-arrow').click(function () {
        box.animate({
            left: 0
        })

    });
});
