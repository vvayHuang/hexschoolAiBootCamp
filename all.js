// 導覽列漢堡選單
$(".navbar-btn").click(function () {
    $(".navbar-collapse").toggleClass("show");

});

// back to top
$("#scrollToTop").click(function (e) {
    $("html,body").animate(
        {
            scrollTop: 0
        },
        100
    );
});

// 常見問題區塊摺疊效果
$('.qa-item').click(function (e) {
    $(this).toggleClass('active');
    $(this).find('.add-icon').toggleClass('d-none');
    $(this).find('.remove-icon').toggleClass('d-block');
    $(this).find('.qa-content p').toggleClass('show');
});


// 下拉選單
$('.product-category-filter').click(function (e) {
    $('.dropdown-menu').toggleClass('show');
});

$('.filter').click(function (e) {
    $('#filter').toggleClass('show');
});

$('.new-old').click(function (e) {
    $('#new-old').toggleClass('show');
});
$('.new-to-old').click(function (e) {
    $('.dropdown-menu').toggleClass('show');
    $('.dropdown-text').text($('.new-to-old').text());
});
$('.old-to-new').click(function (e) {
    $('.dropdown-menu').toggleClass('show');
    $('.dropdown-text').text($('.old-to-new').text());
});

// swiper卡片輪播
const swiper = new Swiper('.swiper', {
    spaceBetween: 24,
    breakpoints: {
        375: {
            slidesPerView: 1,
            slidesPerGroup: 1,
        },
        576: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        },
        768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
        },
    },


    // 分頁、左右箭頭、滾動條若有使用則必需設定          
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
    // 左右箭頭    
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // 滾動條
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
});