mainMenu({
  sticky: true, // 是否置頂
  mega: false, // 是否megaMenu
  needLink: false, // 如果同時需要連結和下層功能時(手機版選單)
});
// -----  基本功能開關   ---------------------------------------------------

sideNav({
  // 側邊選單
  hideSwitch: false, // hideSwitch 可以開關側邊選單
  needLink: true, // 如果同時需要連結和下層功能時
});

// tab功能
tabFunction({
  target: '.target1',
});
// mp2 新書展示
tabFunction({
  target: '.target2',
});
// mp2 最新消息
tabFunction({
  target: '.target3',
});

// 手風琴功能
accordionFunction({
  target: '.accordion',
  openContent: false, // 預設先展開所有內容
  openDefault: true, // 是否有預設開啟
  openIndex: 0, // 預設開啟第幾個
  autoClose: true, // 自動關閉其他開啟內容
  openSwitch: true, // 是否可開合/切換
});

window.addEventListener('load', () => {
  toggleSlider('header .language > button', 'header .language ul'); //語系開關切換
  // toggleSlider('header .navList .language > button', 'header .navList .language ul'); //語系開關切換
  toggleSlider('#mobileMenu .language > button', '#mobileMenu .language ul'); //語系開關切換手機版
  toggleSlider('header .fontSize > button', 'header .fontSize ul'); //文字大小展開開關切換
  toggleSlider('.shareBox .share', '.shareBox .shareBoxList'); //分享開關切換
  toggleSlider('.contentSearchBtn', '.contentSearchBox'); //LP 內容搜尋
  toggleSlider('.floatNav .floatSwitchBtn', '.floatNav .typeA'); //LP 內容搜尋

  //mp2 多筆swiper輪播
  const multipleSlider = document.querySelectorAll('.blockTypeG .multipleSlider');

  multipleSlider.forEach((item, index) => {
    item.classList.add(`ms${index}`);

    let multipleSwiper = new Swiper(`.blockTypeG .ms${index} .swiper`, {
      slideToClickedSlide: true,
      slidesPerView: 5,
      watchSlidesProgress: true,
      navigation: {
        nextEl: `.blockTypeG .ms${index} .nextSlider`,
        prevEl: `.blockTypeG .ms${index} .prevSlider`,
        disabledClass: 'swiperArrow-disabled', //不可點選樣式
      },
      autoplay: {
        delay: 5000,
      },
      on: {
        init: function (swiper) {
          console.log(swiper);

          swiperAutoPlaysFn(swiper);
        },
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        500: {
          slidesPerView: 2,
        },
        767: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 5,
        },
      },
    });
  });

  // -----  MP 輪播   ---------------------------------------------------
  const mpSlider = new Swiper('.mpSlider .swiper', {
    // 切換點
    pagination: {
      el: '.mpSlider .swiperPagination',
      clickable: true,
    },
    // 切換箭頭
    navigation: {
      nextEl: '.mpSlider .nextSlider', //自行設定樣式
      prevEl: '.mpSlider .prevSlider', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    autoplay: {
      delay: 5000,
    },
    on: {
      init: function (swiper) {
        swiperAutoPlaysFn(swiper);
        swiperA11Fn(swiper);
      },
    },
  });

  // -----  CP 輪播   ---------------------------------------------------
  const cpSlider = new Swiper('.cpSlider .swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    slideToClickedSlide: true,
    loop: false,
    // 切換箭頭
    navigation: {
      nextEl: '.cpSlider .nextSlider', //自行設定樣式
      prevEl: '.cpSlider .prevSlider', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    breakpoints: {
      100: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      },
      1000: {
        slidesPerView: 4,
      },
    },
    autoplay: {
      delay: 5000,
    },
    on: {
      init: function (swiper) {
        swiperAutoPlaysFn(swiper);
      },
    },
  });

  //跑馬燈
  const marqueeSlider = new Swiper('.marqueeSlider .swiper', {
    direction: 'vertical',
    // 切換點
    // 切換箭頭
    navigation: {
      nextEl: '.marqueeSlider .nextSlider', //自行設定樣式
      prevEl: '.marqueeSlider .prevSlider', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    autoplay: {
      delay: 5000,
    },
    on: {
      init: function (swiper) {
        swiperAutoPlaysFn(swiper);
      },
    },
  });

  //cp_album
  const sliderFor = new Swiper('.sliderFor .swiper', {
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: '.sliderFor .swiperPagination',
      type: 'fraction',
    },
    autoplay: {
      delay: 5000,
    },
    lazy: true,
    thumbs: {
      swiper: {
        el: '.navSlider .swiper',
        spaceBetween: 20,
        slideToClickedSlide: true,
        slidesPerView: 4,
        watchSlidesVisibility: true,
        navigation: {
          nextEl: '.navSlider .nextSlider',
          prevEl: '.navSlider .prevSlider',
          disabledClass: 'swiperArrow-disabled', //不可點選樣式
        },
        on: {
          init: function (swiper) {
            swiperA11Fn(swiper);
          },
          setTransition: function (swiper) {
            swiperA11Fn(swiper);
          },
        },
        breakpoints: {
          100: {
            slidesPerView: 2,
          },
          767: {
            slidesPerView: 3,
          },
          1000: {
            slidesPerView: 4,
          },
        },
      },
      autoScrollOffset: 1,
    },
    on: {
      init: function (swiper) {
        swiperAutoPlaysFn(swiper);
      },
    },
  });
  swiperNavKeyDownFn(sliderFor.thumbs.swiper, sliderFor);

  // -----  CP 輪播   ---------------------------------------------------
  const linkSlider = new Swiper('.linkSlider .swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    slideToClickedSlide: true,
    loop: false,
    // 切換箭頭
    navigation: {
      nextEl: '.linkSlider .nextSlider', //自行設定樣式
      prevEl: '.linkSlider .prevSlider', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    breakpoints: {
      100: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      },
      1000: {
        slidesPerView: 4,
      },
    },
    autoplay: {
      delay: 5000,
    },
    on: {
      init: function (swiper) {
        swiperAutoPlaysFn(swiper);
        swiperA11Fn(swiper);
      },
    },
  });
});
