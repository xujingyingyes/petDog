/**
 * fuck ie8!
 */

$(function() {
    $(".swiper-container").hide();
    $(".swiper-pagination").hide();
    $(".swiper-container-ie8")
        .show()
        .slide({
            mainCell: ".swiper-wrapper-ie8",
            titCell: ".hd ul",
            effect: "left",
            autoPlay: true,
            autoPage: true,
            vis: 3
        });
});