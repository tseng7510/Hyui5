'use strict';
const setRWDWidth = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--RWDWidth'));

// -----------------------------------------------------------------------
// -----  支援js時，移除no-js  -------------------------------------------------------
// -----------------------------------------------------------------------
document.documentElement.classList.remove('no-js');

// -----------------------------------------------------------------------
// -----  共用效果  -------------------------------------------------------
// -----------------------------------------------------------------------

// 亂數數字
function randomFloor(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 亂數英文字
function randomLetter(max, letter = 'abcdefghijklmnopqrstuvwxyz') {
  let text = '';

  for (let i = 0; i < max; i++) text += letter.charAt(Math.floor(Math.random() * letter.length));
  return text;
}

// 改變標籤
function changeTag(oldTag, newTag) {
  let newTagElem = $(`<${newTag}></${newTag}>`);
  $.each(oldTag[0].attributes, function (index, attr) {
    newTagElem.attr(attr.name, attr.value);
  });
  oldTag.wrap(newTagElem);
  oldTag.children().unwrap();
}

// 取得隱藏元素寬度
function getHiddenElementWidth(element) {
  const rect = element[0].getBoundingClientRect();
  return rect.width;
}

function toggleSlider(elem, con) {
  const body = $('body');
  const targetSelect = $(elem);
  let checkDisplay;
  targetSelect.each(function () {
    let id = `ts_${randomLetter(3)}${randomFloor(0, 999)}`;
    let targetSelectCon = $(con);

    checkDisplay = targetSelectCon.css('display') === 'none';

    if (checkDisplay) {
      $(this).attr('aria-expanded', 'false');
    } else {
      $(this).attr('aria-expanded', 'true');
      $(this).addClass('active');
    }

    $(this).attr({
      'aria-pressed': 'false',
      'aria-haspopup': 'true',
      'aria-controls': `${id}_con`,
      id: id,
    });
    targetSelectCon.attr({
      id: `${id}_con`,
      'aria-labelledby': id,
    });

    $(this).on('click', function (e) {
      let expanded = $(this).attr('aria-expanded');
      if (expanded === 'true') {
        $(this).attr({
          'aria-expanded': 'false',
          'aria-pressed': 'false',
        });
        $(this).removeClass('active');
      } else {
        $(this).attr({
          'aria-expanded': 'true',
          'aria-pressed': 'true',
        });
        $(this).addClass('active');
      }
      targetSelectCon.slideToggle(200);
    });
  });

  body.on('keydown', function (e) {
    targetSelect.each(function () {
      const target = $(e.target);
      const targetCon = $(this).parent().children(con);
      const isInsideTarget = target.parents(con).length === 0;

      let allTarget = targetCon.find('a, button, input, textarea, select');

      if ($(this).attr('aria-expanded') === 'true' || !isInsideTarget) {
        if (e.code === 'Tab') {
          const firstTarget = allTarget.first();
          const lastTarget = allTarget.last();
          const shift = e.shiftKey;

          if (target === item) {
            e.preventDefault();
            // 當焦點在 item 上，依據 shift 條件決定移到第一或最後一個目標
            (shift ? lastTarget : firstTarget).focus();
          } else if ((shift && target === firstTarget) || (!shift && target === lastTarget)) {
            e.preventDefault();
            // 當焦點在 allTarget 的首或尾時，則循環回到 item
            item.focus();
          }
        }
        //Escape
        else if (e.code === 'Escape' && !isInsideTarget) {
          $(this).attr({
            'aria-expanded': 'false',
            'aria-pressed': 'false',
          });
          targetCon.slideUp(200);
          $(this).focus();
        }
      }
    });
  });

  // 點擊其他地方關閉;
  body.on('click', function (e) {
    const targetSelectCon = $(con);
    let isInsideTarget = $(e.target).parents(targetSelectCon).length === 0;

    targetSelect.each(function () {
      if ($(this).attr('aria-expanded') === 'true' && !$(e.target).is($(this)) && isInsideTarget) {
        $(this).attr({
          'aria-expanded': 'false',
          'aria-pressed': 'false',
        });
        $(this).removeClass('active');
        targetSelectCon.slideUp(200);
      }
    });
  });

  $(window).on('resize', (e) => {
    if (!checkDisplay) return;
    targetSelect.each(function () {
      $(this).attr({
        'aria-expanded': 'false',
        'aria-pressed': 'false',
      });
      $(con).slideUp(200);
    });
  });
}

// 增加透明黑底
$('.wrapper').prepend('<div class="overlay"></div>');
const overlay = $('.overlay');

// -----------------------------------------------------------------------
// -----  FontSize   -----------------------------------------------------
// -----------------------------------------------------------------------

// -----------------------------------------------------------------------

function fontSize() {
  const body = $('body');
  // 更新按鈕狀態與目標區域的字體 class
  function _updateView(buttons, target, activeClassName) {
    const sizeClasses = ['smallSize', 'mediumSize', 'largeSize'];

    // 更新按鈕的 ARIA 狀態和 active class
    buttons.each(function () {
      const button = $(this);
      const isTargetButton = button.hasClass(activeClassName);
      button.attr('aria-pressed', isTargetButton);
      button.parent().toggleClass('active', isTargetButton);
    });

    // 更新目標元素的 class
    target.removeClass(sizeClasses.join(' '));
    target.addClass(activeClassName);
  }

  // 創造新的 字體大小設定
  function _createCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toGMTString()}`; // jQuery 時代常用 toGMTString
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
  }

  // 讀取瀏覽器上 字體大小設定
  function _readCookie(name) {
    const value = `; ${document.cookie}`; // 這裡使用原生 JS 讀取 cookie 較為簡潔
    const parts = value.split(`; ${name}=`); // 這裡使用原生 JS 讀取 cookie 較為簡潔
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null;
  }

  // 設定字體切換功能 (使用 jQuery)
  function _setupFontSizeToggle(container, cookieName, target) {
    if (!container.length || !target.length) return; // 檢查 jQuery 物件是否存在

    const buttons = container.find('ul button');
    const buttonContainer = container.find('ul');
    const sizeClasses = ['smallSize', 'mediumSize', 'largeSize'];

    if (!buttonContainer.length || buttons.length === 0) return;

    // 使用事件委派 (Event Delegation)
    buttonContainer.on('click', 'button', function () {
      // 委派到 'button' 元素
      const button = $(this); // 'this' 指向被點擊的 button
      const selectedSize = sizeClasses.find((cls) => button.hasClass(cls));
      if (selectedSize) {
        _createCookie(cookieName, selectedSize, 365);
        _updateView(buttons, target, selectedSize);
      }
    });

    // 初始化 (使用 jQuery)
    const cookieValue = _readCookie(cookieName);
    const initialSize = sizeClasses.includes(cookieValue) ? cookieValue : 'smallSize';
    if (!cookieValue) _createCookie(cookieName, initialSize, 365);
    _updateView(buttons, target, initialSize);
  }

  // 頁首字體大小設定 (使用 jQuery)
  const fontSizeHeader = $('header .fontSize');
  if (fontSizeHeader.length) _setupFontSizeToggle(fontSizeHeader, 'FontSize', body);

  // 內頁字體大小設定 (使用 jQuery)
  const fontSizeInner = $('.fontSizeInner'); // 控制的對象
  const mainContent = $('.mainContentBox .mainContent');
  if (fontSizeInner.length && mainContent.length) _setupFontSizeToggle(fontSizeInner, 'FontSizeInner', mainContent);
}

// 確保在 DOM 載入完成後執行
$(window).on('load', function () {
  fontSize();
});

// -----------------------------------------------------------------------
// -----  menu   ------------------------------------------------------
// -----------------------------------------------------------------------
function mainMenu(obj) {
  const body = $('body');
  const header = $('header');
  const headTop = $('.headTop');
  const { sticky = true, needLink = false, mega = false } = obj;

  const menu = $('.mainMenu nav');
  if (menu.length === 0) return;

  // 有下層的增加 hasChild 的 class
  const checkChild = menu.find('li ul');
  checkChild.each(function () {
    $(this).parent().addClass('hasChild');
  });

  const hasChild = menu.find('.hasChild');

  function checkBorder(e) {
    if (mega) return;
    // 抓出該項目以下有多少層級
    const nextUl = e.find('ul');

    //確定最後一層ul的父層li共有幾個
    const hasChildLi = nextUl.last().parents('li');

    // 如果只有一層就不需要
    if (hasChildLi.length <= 1) return;

    // 確定選項的寬度 * 選項有幾層，由於第一層是直接向下不會左右展開，所以需要-1
    const checkUlWidth = getHiddenElementWidth(hasChildLi.last()) * hasChildLi.length - 1 || 0;

    //查詢第一層的位置
    const objectRect = hasChildLi.last().offset();

    // 如果第一層左邊 + 其他層寬度超過視窗的寬度，則新增leftSlider
    if ($(window).outerWidth() < objectRect.left + checkUlWidth) {
      hasChildLi.last().addClass('leftSlider');
    } else {
      hasChildLi.last().removeClass('leftSlider');
    }
  }

  // 滑鼠滑入
  function _handleMouseenter(e) {
    $(e.currentTarget).addClass('active');
    $(e.currentTarget).children('a').attr('aria-expanded', 'true');
    checkBorder($(e.currentTarget));
  }

  // 滑鼠滑出
  function _handleMouseleave(e) {
    $(e.currentTarget).removeClass('active');
    $(e.currentTarget).children('a').attr('aria-expanded', 'false');
    $(e.currentTarget).children('a').css('top', '');
  }

  // 選單層級展開fn
  function toggleAccordion(item, con) {
    let content = $(item).parent().children(con);
    if (content.css('display') !== 'none') {
      $(item).attr('aria-expanded', 'false');
      $(item).removeClass('active');
    } else {
      $(item).attr('aria-expanded', 'true');
      $(item).addClass('active');
    }
    content.slideToggle(200);
    content
      .parent('.hasChild')
      .siblings()
      .each(function () {
        $(this).children(con).slideUp();
        $(this).children('a').attr('aria-expanded', 'false');
      });
  }

  // 桌面版選單初始化與事件綁定
  function _initDesktopMenu() {
    // 是否為megaMenu
    if (mega) {
      menu.addClass('megaMenu');
      menu.removeClass('menu');
      const megaMenuChild = menu.find('ul ul .hasChild > a');
      megaMenuChild.removeAttr('aria-haspopup');
    }

    // 是否選單固定
    if (sticky) {
      const menu = $('.mainMenu');
      const headerMargin = parseInt(header.css('margin-bottom').replace('px', ''));

      $(window).on('scroll', function () {
        if ($(window).outerWidth() > setRWDWidth) {
          if (headTop.height() < $(window).scrollTop()) {
            menu.addClass('sticky');
            headTop.css('margin-bottom', `${headerMargin + menu.height()}px`);
          } else {
            menu.removeClass('sticky');
            headTop.css('margin-bottom', `${headerMargin}px`);
          }
        } else {
          headTop.removeAttr('style');
        }
      });
    }
    //無障礙操作
    const menuAllLi = menu.find('li');
    const menuAllA = menu.find('a');
    const lastA = menu.find('a').last();
    const firstA = menu.find('a').first();
    menu.on('keydown', function (e) {
      let checkTarget = menuAllA.each(function () {
        return $(e.target).is($(this));
      });
      if (!checkTarget || $(window).outerWidth() <= setRWDWidth) return;
      $(e.target).attr('aria-expanded', 'true');

      checkBorder($(e.target).parent('li'));
      if (e.code === 'Tab' && !e.shiftKey) {
        $(e.target).parent('li').addClass('active');
        $(e.target).parent('li').siblings().removeClass('active');
        if ($(e.target).is(lastA)) {
          menuAllLi.removeClass('active');
        }
      } else if (e.code === 'Tab' && e.shiftKey && $(e.target).is(firstA)) {
        menuAllLi.removeClass('active');
      }
    });
    hasChild.each(function () {
      // 無障礙設定
      const id = `menu_${randomLetter(3)}${randomFloor(0, 999)}`;
      const childA = $(this).children('a');
      const childUl = $(this).children('ul');
      childA.attr('aria-expanded', 'false');
      childA.attr('aria-haspopup', 'true');
      childA.attr('id', `${id}`);
      childA.attr('aria-controls', `${id}_con`);
      childUl.attr('id', `${id}_con`);
      childUl.attr('aria-labelledby', `${id}`);
    });

    // 滑鼠滑過
    hasChild.on('mouseenter', _handleMouseenter);
    hasChild.on('mouseleave', _handleMouseleave);
  }
  _initDesktopMenu();

  // 手機版選單初始化與事件綁定
  function _initMobileMenu() {
    const mobileMenu = $('<nav id="mobileMenu" aria-labelledby="mobileMainMenuBtn"></nav>');

    // 新增手機版主選單容器
    const mobileMainMenuBox = $('<div class="mobileMainMenuBox"></div>');

    // 新增手機版主選單關閉按鈕

    // 複製主選單
    const mainMenuClone = $(menu).clone(true);
    mainMenuClone.removeClass('mainMenu menu').addClass('mobileMainMenu');

    // 複製top選單
    if ($('.topNav').length > 0) {
      const topNavClone = $('.topNav').clone(true);
      topNavClone.find('.language').removeClass('sliderFn');
      topNavClone.find('.fontSize, .topSearch, #aU').remove();
      // 將 top選單 加入到 手機版主選單
      mobileMainMenuBox.prepend(topNavClone);

      changeTag(topNavClone, 'div');
    }

    // 將 主選單 加入到 手機版主選單
    mobileMainMenuBox.prepend(mainMenuClone);
    // 將 手機版主選單 加入到 手機版主選單(多包一層div)
    mobileMenu.append(mobileMainMenuBox);
    // 將 手機版主選單 加入到 header 前
    header.before(mobileMenu);
    // 轉換標籤
    changeTag(mainMenuClone, 'div');

    // 點擊選單按鈕 執行 展開側邊選單函式
    const mobileMainMenuBtn = $('#mobileMainMenuBtn');

    mobileMainMenuBtn.attr({
      'aria-controls': 'mobileMenu',
      'aria-expanded': 'false',
      'aria-pressed': 'false',
      'aria-haspopup': 'true',
    });

    // 展開側邊選單函式
    function _showSidebar() {
      mobileMenu.css({
        opacity: 1,
        display: 'block',
      });
      mobileMainMenuBtn.attr({
        'aria-expanded': 'true',
        'aria-pressed': 'true',
      });

      setTimeout(() => {
        mobileMenu.css('transform', 'translateX(0px)');
        mobileMenu.addClass('open');
      }, 0);

      mobileMainMenuBtn.addClass('active');
      body.addClass('noscroll');
      overlay.css({ 'z-index': '90', top: `${header.height()}px` });
      overlay.fadeIn(100);
    }

    // 隱藏側邊選單函式
    function _hideSidebar(overlayFn = true) {
      mobileMenu.css({
        transform: 'translateX(-100%)',
      });
      mobileMainMenuBtn.attr({
        'aria-expanded': 'false',
        'aria-pressed': 'false',
      });

      setTimeout(() => {
        mobileMenu.removeAttr('style');
      }, 300);

      mobileMenu.removeClass('open');
      body.removeClass('noscroll');
      mobileMainMenuBtn.removeClass('active');
      overlay.css('z-index', '');
      if (overlayFn) overlay.fadeOut(100);
    }

    mobileMainMenuBtn.on('click', function (e) {
      e.preventDefault();
      if (mobileMainMenuBtn.attr('aria-expanded') === 'true') {
        _hideSidebar();
      } else {
        _showSidebar();
      }
      mobileMainMenuBtn.focus();
    });

    overlay.on('click', function () {
      _hideSidebar();
    });
    // 手機版選單展開功能
    const mobileMenuLiHasChild = $('#mobileMenu li.hasChild');
    mobileMenuLiHasChild.each(function () {
      let childControl;

      if (!needLink) {
        childControl = $(this).children('a');
        childControl.attr('role', 'button');
      } else {
        $(this).addClass('needLink');
        const nextA = $(this).children('a');
        const nextBtn = $('<button class="nextLvl"></button>');
        nextA.after(nextBtn);
        nextBtn.attr('id', nextA.attr('id'));
        childControl = nextBtn;
      }

      // 無障礙設定 -- mobile
      const id = `mobileMenu_${randomLetter(3)}${randomFloor(0, 999)}`;
      const childUl = $(this).children('ul');
      childControl.attr({
        'aria-expanded': 'false',
        'aria-haspopup': 'true',
        'aria-controls': `${id}_con`,
      });
      childUl.attr({
        id: id,
        'aria-labelledby': id,
      });

      childControl.on('click', function (e) {
        if (!$(this).parent().hasClass('hasChild')) return;
        if (!needLink) {
          e.preventDefault();
        }
        toggleAccordion($(this), 'ul');
      });
    });

    // 手機版鍵盤無障礙設定
    const allMobileMenuTarget = mobileMenu.find('a,button,input,select');
    body.on('keydown', function (e) {
      if (e.code === 'Escape') {
        _hideSidebar();
      } else if (e.code === 'Tab' && !e.shiftKey && $(e.target).is('#mobileMainMenuBtn') && mobileMainMenuBtn.attr('aria-expanded') === 'true') {
        e.preventDefault();
        allMobileMenuTarget.eq(0).focus();
      } else if (e.code === 'Tab' && e.shiftKey && $(e.target).is(allMobileMenuTarget.eq(0))) {
        e.preventDefault();
        mobileMainMenuBtn.focus();
      }
    });

    $(window).on('resize', function () {
      if ($(window).outerWidth() <= setRWDWidth) {
        headTop.removeAttr('style');
      } else {
        body.removeClass('noscroll');
        _hideSidebar();
      }
    });
    $('#mobileSearchBtn').on('click', function () {
      _hideSidebar(false);
    });
  }
  _initMobileMenu();
}

// -----------------------------------------------------------------------
// -----  search   ------------------------------------------------------
// -----------------------------------------------------------------------

function webSearch() {
  const body = $('body');
  const webSearch = $('.webSearch');

  if (webSearch.length === 0) return;
  // console.warn('網站搜尋功能: webSearch 無法抓到(請檢查Html結構)，或是沒有使用到此功能');
  // return;

  const mobileSearchBtn = $('#mobileSearchBtn');
  const webSearchBtn = $(' #topSearchBtn');
  const searchTargetSelect = $('#topSearchBtn, #mobileSearchBtn');
  const webSearchAllTarget = webSearch.find('a, button, input, select, textarea');
  const id = `ws_${randomLetter(3)}${randomFloor(0, 999)}`;

  // 桌機搜尋按鈕進行設定與事件綁定
  webSearchBtn.attr({
    'aria-controls': `${id}_con`,
    'aria-expanded': 'false',
    'aria-pressed': 'false',
    'aria-haspopup': 'true',
  });
  webSearchBtn.on('click', function (e) {
    toggleContent(webSearchBtn);
  });

  // 行動版搜尋按鈕設定及事件綁定
  mobileSearchBtn.attr({
    'aria-controls': `${id}_con`,
    'aria-expanded': 'false',
    'aria-pressed': 'false',
    'aria-haspopup': 'true',
  });
  mobileSearchBtn.on('click', () => toggleContent(mobileSearchBtn));

  // 搜尋內容區塊設定 ARIA 標記，建立與觸發按鈕的關聯
  webSearch.attr({
    id: `${id}_con`,
    'aria-labelledby': `topSearchBtn mobileSearchBtn`,
  });

  //  切換搜尋展開/關閉的函式
  function toggleContent(elem, focus = false) {
    const isExpanded = $(elem).attr('aria-expanded') === 'true';
    overlay.css('top', `${$('header').height()}px`);
    if (isExpanded) {
      _hideSearchBox(elem);
      body.removeClass('noscroll');
    } else {
      _showSearchBox(elem);
      body.addClass('noscroll');
    }
  }

  function _showSearchBox(elem) {
    $(elem).attr({
      'aria-expanded': 'true',
      'aria-pressed': 'true',
    });
    $(elem).addClass('active');
    // 清空搜尋區塊內第一個可編輯項目的值（例如輸入框）
    setTimeout(() => {
      if (webSearchAllTarget.length > 0) webSearchAllTarget.eq(0).val('');
    });
    webSearch.slideDown(200);
    if (focus && webSearchAllTarget.length > 0) webSearchAllTarget.eq(0).focus();
    overlay.fadeIn(100);
  }

  function _hideSearchBox(elem, overLayFn = true) {
    $(elem).attr({
      'aria-expanded': 'false',
      'aria-pressed': 'false',
    });
    $(elem).removeClass('active');
    webSearch.slideUp(200);

    if (overLayFn) {
      overlay.fadeOut(100);
      setTimeout(() => {
        $(elem).focus();
      });
    }
  }

  // 鍵盤事件設定，支援 Tab、Enter、Alt+S 快捷鍵以及 Escape 關閉
  body.on('keydown', function (e) {
    const isSearchBtn = $(e.target).is(webSearchBtn) || $(e.target).is(mobileSearchBtn);
    const searchBtn = $(window).outerWidth() >= setRWDWidth ? webSearchBtn : mobileSearchBtn;
    const checkExpanded = $(e.target).attr('aria-expanded');
    const lastTarget = webSearchAllTarget.last();

    // Tab
    if (e.code === 'Tab') {
      if ($(e.target).is(lastTarget) && !e.shiftKey && searchBtn) {
        e.preventDefault();
        searchBtn.focus();
      } else if (isSearchBtn && checkExpanded === 'true') {
        if (!e.shiftKey) {
          if (webSearchAllTarget.length > 0) webSearchAllTarget.eq(0).focus();
        } else {
          e.preventDefault();
          lastTarget.focus();
        }
      }
      // Enter;
    } else if (e.code === 'Enter' && isSearchBtn) {
      setTimeout(() => {
        if (webSearchAllTarget.length > 0) webSearchAllTarget.eq(0).focus();
      });
      // Alt + S;
    } else if (e.altKey && e.code === 'KeyS') {
      toggleContent(searchBtn, true);
      // Escape
    } else if (e.code === 'Escape') {
      const checkDisplay = webSearch.css('display');
      if (checkDisplay === 'none') return;
      if ($(window).outerWidth() >= setRWDWidth && webSearchBtn) {
        toggleContent(webSearchBtn, true);
      } else if ($(window).outerWidth() < setRWDWidth && mobileSearchBtn) {
        toggleContent(mobileSearchBtn, true);
      }
    }
  });

  body.on('click', function (e) {
    const isInsideSearch = $(e.target).closest(webSearch).length === 0;
    searchTargetSelect.each(function () {
      if ($(this).attr('aria-expanded') === 'true' && !$(e.target).is($(this)) && isInsideSearch && webSearchBtn !== null) {
        $(this).attr({
          'aria-expanded': 'false',
          'aria-pressed': 'false',
        });
        $(this).removeClass('active');
        webSearch.slideUp();
        overlay.hide();
      }
    });
  });

  $('#mobileMainMenuBtn').on('click', function () {
    _hideSearchBox('#mobileSearchBtn', false);
  });
}
$(window).on('load', function () {
  webSearch();
});
// -----------------------------------------------------------------------
// -----  Tab   ------------------------------------------------------
// -----------------------------------------------------------------------

function tabFunction(obj) {
  const { target, autoClose = true, openContent = false, modeSwitch = false, windowWidth = setRWDWidth, openIndex = 0, openSwitch = true } = obj;

  const tabSet = $(target);
  if (tabSet.length === 0) return;

  const tabItems = tabSet.find('.tabItems');
  const tabBtn = tabSet.find('.tabBtn');
  const tabContent = tabSet.find('.tabContent');
  const tabContentIn = tabSet.find('.tabContentIn');

  //初始設定
  function tabInit(targetIndex) {
    tabItems.attr('role', 'tablist');

    tabBtn.each(function (i) {
      const id = `tab_${randomLetter(3)}${randomFloor(0, 999)}`;
      const controls = `${id}_con`;

      $(this).attr({
        role: 'tab',
        id: id,
        'aria-controls': controls,
        'aria-selected': 'false',
        'aria-expanded': 'false',
        tabindex: '-1',
      });

      if (tabContent.eq(i).length === 0) {
        console.error(`tab功能: ${obj.target}內容數量與按鈕數量不符`);
      } else {
        setAttributeFn(tabContent.eq(i), 'tabpanel', controls, id);
      }

      //模式切換-新增按鈕
      if (modeSwitch) {
        const mobileTabBtn = createMobileTabBtn(id, controls, $(this).html());
        tabContent.eq(i).prepend(mobileTabBtn);
      }
    });

    checkTarget(targetIndex);

    tabSet.attr('nowIndex', targetIndex);
  }

  // 創建移動版選項按鈕
  function createMobileTabBtn(id, controls, textContent) {
    const mobileTabBtn = $(`<button id="${id}" aria-controls="${controls}" class="mobileTabBtn" aria-expanded="false" type="button">${textContent}</button>`);
    return mobileTabBtn;
  }

  //執行
  tabInit(openIndex);

  //切換動作
  function checkTarget(targetIndex) {
    tabSet.attr('nowIndex', targetIndex);

    //點選的按鈕增加active，設定無障礙資訊
    tabBtn.eq(targetIndex).addClass('active');
    tabBtn.eq(targetIndex).attr({
      'aria-selected': 'true',
      'aria-expanded': 'true',
      tabindex: '0',
    });
    //內容的移除display
    tabContent.eq(targetIndex).removeAttr('style');

    //移除其他按鈕的active，設定無障礙資訊
    tabBtn.eq(targetIndex).siblings().removeClass('active');
    tabBtn.eq(targetIndex).siblings().attr({
      'aria-selected': 'false',
      'aria-expanded': 'false',
      tabindex: '-1',
    });

    //移除其他內容的active
    tabContent.eq(targetIndex).siblings().hide();
  }

  // 是否可開合/切換
  if (openSwitch) {
    //tab動作
    tabSet.on('click', function (e) {
      if (!$(e.target).hasClass('tabBtn')) return;

      let index = $(e.target).index();
      checkTarget(index);
    });

    tabSet.on('keydown', function (e) {
      if (!$(e.target).hasClass('tabBtn')) return;
      let index;
      //左右操作tab
      if (e.code === 'ArrowRight') {
        index = ($(e.target).index() + 1) % tabBtn.length;
        tabBtn.eq(index).focus();
        checkTarget(index);
      } else if (e.code === 'ArrowLeft') {
        index = ($(e.target).index() - 1 + tabBtn.length) % tabBtn.length;
        if (index < 0) index = 0;
        tabBtn.eq(index).focus();
        checkTarget(index);
      }
    });

    //模式切換-手風琴動作
    if (modeSwitch) {
      const mobileTabBtn = tabSet.find('.mobileTabBtn');

      tabSet.on('click', function (e) {
        if (!$(e.target).hasClass('mobileTabBtn')) return;
        let index = $(e.target).parents('.tabContent').index();
        mobileTabFn(mobileTabBtn.eq(index), index, mobileTabBtn);
      });
    }
  }

  function mobileTabFn(btn, i, mobileTabBtn) {
    tabContentIn.eq(i).slideToggle(200);
    tabSet.attr('nowIndex', i);
    let check = btn.attr('aria-expanded') === 'true' ? false : true;
    btn.attr('aria-expanded', check);
    btn.toggleClass('active');

    if (!autoClose) return;

    mobileTabBtn.eq(i).parents('.tabContent').siblings().find('.mobileTabBtn').removeClass('active');
    mobileTabBtn.eq(i).parents('.tabContent').siblings().find('.mobileTabBtn').attr('aria-expanded', 'false');
    mobileTabBtn.eq(i).parents('.tabContent').siblings().find('.tabContentIn').slideUp(200);

    setTimeout(() => {
      let btnClientRect = btn.get(0).getBoundingClientRect();
      if (btnClientRect.y < 0) {
        window.scrollTo({
          top: window.scrollY + btnClientRect.y - btnClientRect.height - 20,
          behavior: 'smooth',
        });
      }
    }, 200);
  }

  function removeAttributeFn(item) {
    item.removeAttr('aria-labelledby,role,id');
  }
  function setAttributeFn(item, role, id, labelledby) {
    item.attr({
      role: role,
      id: id,
      'aria-labelledby': labelledby,
    });
  }
  //模式切換-RWD
  function checkRWD() {
    const tabpanelBtn = tabSet.find('.tabContent .mobileTabBtn');
    const nowOpen = tabSet.attr('nowIndex');

    // 電腦版
    tabBtn.eq(nowOpen).addClass('active');
    tabBtn.eq(nowOpen).attr({
      'aria-selected': 'true',
      'aria-expanded': 'true',
      tabindex: '0',
    });

    tabBtn.eq(nowOpen).siblings().removeClass('active');
    tabBtn.eq(nowOpen).siblings().attr({
      'aria-selected': 'false',
      'aria-expanded': 'false',
      tabindex: '-1',
    });

    // 手機版
    tabpanelBtn.eq(nowOpen).addClass('active');
    tabpanelBtn.eq(nowOpen).attr('aria-expanded', 'true');

    tabpanelBtn.eq(nowOpen).siblings().removeClass('active');
    tabpanelBtn.eq(nowOpen).siblings().attr('aria-expanded', 'false');

    if ($(window).outerWidth() < windowWidth && modeSwitch) {
      //隱藏上方選單
      tabItems.hide();

      tabBtn.each(function (i) {
        const id = tabpanelBtn.eq(i).attr('id');
        const controls = tabpanelBtn.eq(i).attr('aria-controls');

        //顯示所有tab內容標籤
        tabContent.eq(i).removeAttr('style');
        //移除tab內容標籤
        removeAttributeFn(tabContent.eq(i));

        //顯示手風琴標籤按鈕
        tabpanelBtn.eq(i).removeAttr('style');
        // tabpanelBtn.eq(i).removeAttr('aria-hidden');
        //新增手風琴內容標籤
        setAttributeFn(tabContentIn.eq(i), 'region', controls, id);
        tabContentIn.eq(i).hide();
      });

      if (openContent) {
        tabContentIn.each(function (i) {
          $(this).css('display', 'block');
          tabpanelBtn.eq(i).addClass('active');
        });
      } else {
        //隱藏其他手風琴內容
        tabpanelBtn.eq(nowOpen).siblings().removeClass('active');
        //展開目前手風琴內容
        tabpanelBtn.eq(nowOpen).addClass('active');
        tabpanelBtn.eq(nowOpen).attr('aria-expanded', 'true');
        // tabpanelBtn.eq(nowOpen).focus();
        tabContentIn[nowOpen].removeAttr('style');
      }
    } else if ($(window).outerWidth() >= windowWidth && modeSwitch) {
      //增加上方選單
      tabItems.removeAttr('style');
      tabItems.attr('role', 'tablist');

      tabBtn.each(function (i) {
        const id = tabpanelBtn.eq(i).attr('id');
        const controls = tabpanelBtn.eq(i).attr('aria-controls');

        //顯示所有Tab內容
        tabContentIn.eq(i).removeAttr('style');
        //移除Tab內容標籤
        removeAttributeFn(tabContentIn.eq(i));
        tabContentIn.eq(i).removeAttr('style');

        //隱藏Tab標籤按鈕
        tabpanelBtn.eq(i).hide();
        //新增Tab內容標籤
        setAttributeFn(tabContent.eq(i), 'tabpanel', controls, id);
      });

      //展開目前Tab內容
      tabContent.eq(nowOpen).removeAttr('style');
      // tabBtn.eq(nowOpen).focus();

      //隱藏其他Tab內容
      tabContent.eq(nowOpen).siblings().hide();
    }
  }
  checkRWD();
  window.addEventListener('resize', checkRWD);
}

// tabFunction({
//   target: '.target1', // 執行目標，多組需要另外設定
//   modeSwitch: false, // 自動切換，尺寸以上tab功能，尺寸以下手風琴功能
//   openContent: false, // 展開所有內容，僅開啟模式切換時才可使用
//   openIndex: 0, // 開啟第幾個
//   width: 767, // 尺寸以上tab功能，尺寸以下手風琴功能
//   autoClose: true, // 自動關閉其他開啟內容
//   openSwitch: true, // 是否可開合/切換
//   });

// -----------------------------------------------------------------------
// -----   Accordion設定   ------------------------------------------------
// -----------------------------------------------------------------------
function accordionFunction(obj) {
  const { target, openContent = false, openDefault = false, openIndex = 0, autoClose = true, openSwitch = true, info } = obj;

  const accordionSet = $(target);
  if (accordionSet === null) return;
  // console.warn('手風琴功能: accordionSet 無法抓到(請檢查Html結構)，或是沒有使用到此功能');
  // return;

  const infoOpen = accordionSet.data('stateOpen');
  const infoClose = accordionSet.data('stateClose');
  const accordionBtn = accordionSet.find('.accordionBtn');
  const accordionCon = accordionSet.find('.accordionContent');

  //初始設定
  function accordionInit(targetIndex) {
    accordionSet.attr('nowIndex', targetIndex);
    accordionBtn.each(function (i) {
      const id = `accordion_${randomLetter(3)}${randomFloor(0, 999)}`;
      const controls = `${id}_con`;

      // 增加展開說明文字
      let accordionState;
      if (openSwitch) {
        accordionState = $(`<div class="accordionState"><span>${infoOpen}</span></div>`);
        $(this).append(accordionState);
      }

      //button
      $(this).attr({
        id: id,
        'aria-controls': controls,
        'aria-expanded': 'false',
      });

      //content
      accordionCon.eq(i).attr({
        id: controls,
        'aria-labelledby': id,
        role: 'region',
      });

      if (openContent) {
        // 預設先展開所有內容
        $(this).addClass('active');
        $(this).attr('aria-expanded', 'true');
        if (openSwitch) accordionState.html(infoClose);
      } else if (!openContent) {
        $(this).attr('aria-expanded', 'false');
        accordionCon.eq(i).hide();
      }
    });

    if (openDefault) {
      accordionBtn.eq(openIndex).parent().addClass('active');
      accordionBtn.eq(openIndex).attr('aria-expanded', 'true');
      accordionCon.eq(openIndex).slideDown(200);
      if (openSwitch) accordionBtn.eq(openIndex).find('.accordionState span').html(infoClose);
    }
  }
  accordionInit(openIndex);

  function accordionFn(btn, i) {
    const accordionState = btn.find('.accordionState span');
    accordionCon.eq(i).slideToggle(200);
    accordionSet.attr('nowIndex', i);
    let infoText = accordionState.text() === infoClose ? infoOpen : infoClose;

    let expanded = btn.attr('aria-expanded') === 'true' ? false : true;
    accordionState.html(infoText);
    btn.attr('aria-expanded', expanded);
    btn.parent().toggleClass('active');

    if (!autoClose) return;
    accordionBtn.eq(i).parent().siblings().find('.accordionBtn').removeClass('active');
    accordionBtn.eq(i).parent().siblings().find('.accordionState span').html(infoOpen);
    accordionCon.eq(i).parent().siblings().find('.accordionContent').slideUp(200);

    setTimeout(() => {
      let btnClientRect = btn.get(0).getBoundingClientRect();
      if (btnClientRect.y < 0) {
        window.scrollTo({
          top: window.scrollY + btnClientRect.y - btnClientRect.height - 20,
          behavior: 'smooth',
        });
      }
    }, 200);
  }

  // 是否可開合/切換
  if (openSwitch) {
    // 點擊切換
    accordionBtn.each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        accordionFn($(this), i);
      });
    });
  }
}

// accordionFunction({
//   target: '.target1',
//   openContent: false, // 預設先展開所有內容，僅開啟模式切換時才可使用
//   openDefault: true,是否有預設開啟
//   openIndex: 0, // 預設開啟第幾個
//   autoClose: true, // 自動關閉其他開啟內容
//   openSwitch: true, // 是否可開合/切換
// });

// -----------------------------------------------------------------------
// -----  fatFooter   ------------------------------------------------------
// -----------------------------------------------------------------------
function fatFooter() {
  const fatFooterBtn = $('#fatFooterBtn');

  if (fatFooterBtn === null) return;

  const fatFooterCon = $('.fatFooter nav > ul > li > ul');

  let idArray = [];
  fatFooterCon.each(function (i) {
    idArray.push(`fatFooter${i}`);
    $(this).attr({
      id: `fatFooter${i}_con`,
      'aria-labelledby': `fatFooterBtn`,
    });
  });

  fatFooterBtn.attr({
    'aria-controls': idArray.join(' '),
    'aria-expanded': 'true',
  });

  fatFooterBtn.on('click', function (e) {
    e.preventDefault();
    fatFooterBtn.attr('aria-expanded', fatFooterBtn.attr('aria-expanded') === 'true' ? 'false' : 'true');
    fatFooterCon.each(function (e) {
      $(this).slideToggle(200);
    });
  });
}
$(window).on('load', function () {
  fatFooter();
});
// -----------------------------------------------------------------------
// -----  sideNav   ------------------------------------------------------
// -----------------------------------------------------------------------
function sideNav(options) {
  const body = $('body');
  const { showDefault = true, needLink = false, duration = 200, floatType = true } = options;
  const mainBox = $('.innerPage .mainBox');
  const sideNav = $('.innerPage .mainBox .sideNav');
  const mainContentBox = $('.innerPage .mainBox .mainContentBox');
  floatType ? sideNav.addClass('typeA') : sideNav.addClass('typeB');
  if (sideNav.length === 0 || mainContentBox.length === 0) return;

  const nextOpen = sideNav.data('nextOpen') || '開啟下層選單 ';
  const nextClose = sideNav.data('nextClose') || '收合下層選單';
  const hasSideNavGap = parseInt(mainBox.css('gap').replace('px', ''));
  let sideNavWidth = sideNav.outerWidth();
  mainContentBox.css('width', `calc(100% - ${hasSideNavGap + sideNavWidth}px)`);

  const sideMenu = sideNav.find('nav#sideMenu');
  if (!sideMenu) return;
  const sideMenuContent = sideMenu.find('.sideMenuContent');
  sideMenu.attr('width', parseInt(sideMenuContent.css('width').replace('px', '')));
  const sideNavBtn = sideNav.find('#sideNavBtn');
  const allTarget = sideNav.find('a, button, input, select');

  if (sideNavBtn) {
    // 統一設定無障礙相關屬性與過渡效果
    function setTransitionBtn(btn, expanded, left = null, toLeft = null) {
      btn.attr({
        'aria-expanded': expanded ? 'true' : 'false',
        'aria-haspopup': 'true',
        'aria-controls': 'sideMenu',
      });
      btn.toggleClass('active');

      if ($(window).outerWidth() <= setRWDWidth && floatType) {
        btn.animate(
          {
            left: toLeft,
          },
          duration
        );
      }
    }
    setTransitionBtn(sideNavBtn, showDefault);

    function setTransition(elem, width, toWidth, dn) {
      if (($(window).outerWidth() <= setRWDWidth && floatType) || $(window).outerWidth() > setRWDWidth) {
        elem.css({
          overflow: 'hidden',
          width: `${width}px`,
        });
        elem.animate(
          {
            width: toWidth,
          },
          duration
        );
        if (dn) {
          setTimeout(() => {
            elem.hide();
          }, duration);
        }
      } else if ($(window).outerWidth() <= setRWDWidth && !floatType) {
        sideMenu.slideToggle(200);
      }
    }

    const sideMenuWidth = sideMenu.attr('width');
    sideNavBtn.on('click', function (e) {
      const isClosed = sideMenu.css('display') === 'none';

      if (isClosed) {
        // ---- 開啟選單 ----
        setTransition(sideMenu, 0, sideMenuWidth, false);
        setTransitionBtn(sideNavBtn, true, 0, sideMenuWidth);
        // 若為 mobile 模式，更新按鈕位置
        if ($(window).outerWidth() > setRWDWidth) {
          mainContentBox.css('width', `calc(100% - ${hasSideNavGap + sideNavWidth}px)`);
        }
      } else {
        // ---- 關閉選單 ----
        setTransition(sideMenu, sideMenuWidth, 0, true);
        setTransitionBtn(sideNavBtn, false, sideMenuWidth, 0);
      }
    });
  }

  // 設定 sideMenu 的無障礙屬性
  sideMenu.attr({
    'aria-labelledby': 'sideNavBtn',
    role: 'navigation',
  });

  // 為含下層選單的 li 加上 hasChild 類別
  sideMenu.find('li ul').each(function () {
    $(this).parent().addClass('hasChild');
  });

  // 設定所有含子選單項目的無障礙與點擊處理
  sideMenu.find('.hasChild').each(function (e) {
    const uid = `sn_${randomLetter(3)}${randomFloor(0, 999)}`;
    let childControl;
    if (!needLink) {
      childControl = $(this).find('a');
      childControl.attr('role', 'button');
    } else {
      $(this).addClass('needLink');
      const nextBtn = $(`<button class="nextLvl" aria-expanded ="false" type="button" aria-label="${nextOpen}"></button>`);
      $(this).children('a').after(nextBtn);
      childControl = nextBtn;
    }
    const childUl = $(this).children('ul');

    childControl.attr({
      'aria-haspopup': 'true',
      id: uid,
      'aria-controls': `${uid}_con`,
    });
    childControl.on('click', function (e) {
      e.preventDefault();
      toggleAccordion(childControl, 'ul', $(this));
    });
    childUl.attr({
      id: `${uid}_con`,
      'aria-labelledby': uid,
    });
  });

  // 手風琴切換函式
  function toggleAccordion(control, selector, parent) {
    const content = control.parent().children(selector);
    const isVisible = content.css('display') !== 'none';
    control.attr('aria-expanded', isVisible ? 'false' : 'true');
    parent.parent().toggleClass('active');
    content.slideToggle(200);

    if (needLink) {
      control.attr('aria-label', isVisible ? nextOpen : nextClose);
    }
    // 收合同層其他項目
    parent.parent().siblings().find(selector).slideUp(200);
    if (needLink) {
      parent.parent().siblings().children('button').attr({ 'aria-expanded': 'false', 'aria-label': nextOpen });
    } else {
      parent.parent().siblings().children('a').attr('aria-expanded', 'false');
    }
    parent.parent().siblings().removeClass('active');
  }

  let checkRwd = $(window).outerWidth() <= setRWDWidth;
  // 鍵盤無障礙設定（僅限 RWD 狀態下有效）
  body.on('keydown', function (e) {
    if (checkRwd && sideNavBtn.attr('aria-expanded') === 'true') {
      const focusable = [...allTarget].filter((item) => item.getBoundingClientRect().height !== 0);
      const lastFocusable = focusable.last();
      if (e.code === 'Tab') {
        if (e.shiftKey && $(e.target).is(allTarget.eq(0))) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && $(e.target).is(lastFocusable)) {
          e.preventDefault();
          sideNavBtn.focus();
        }
      }
    }
  });

  // 視窗載入與重置事件：調整響應式設定
  const checkRwdFn = () => {
    sideNavWidth = sideNav.offsetWidth;
    if ($(window).outerWidth() <= setRWDWidth) {
      checkRwd = true;
      mainContentBox.removeAttr('style');
      sideNavBtn.removeClass('active');
      sideNavBtn.attr('aria-expanded', 'false');
      sideMenu.removeAttr('style');
      if (floatType) {
        sideNavBtn.css({
          left: '',
          top: '80px',
        });
      } else {
        sideMenu.slideUp(200);
      }
    } else if ($(window).outerWidth() > setRWDWidth && checkRwd === true) {
      checkRwd = false;
      sideNavBtn.addClass('active');
      sideNavBtn.attr('aria-expanded', 'true');
      sideMenu.removeAttr('style');
      if (floatType) {
        mainContentBox.css('width', `calc(100% - ${hasSideNavGap + sideNav.offsetWidth}px)`);
      } else {
        sideMenu.slideDown(200);
      }
    }
  };
  $(window).on('load', checkRwdFn);
  $(window).on('resize', checkRwdFn);
}

// -----------------------------------------------------------------------
// -----   tableList樣式 加上 data-title   -------------------------------
// -----------------------------------------------------------------------

function tableAddDataAttributes() {
  const el = $('.tableList');
  if (el.length === 0) return;
  el.find('table').addClass('loaded');
  setTrAttr(el.find('table'));
  function setTrAttr(elem) {
    const thList = elem.find('th');
    const trList = elem.find('tr');

    trList.each(function () {
      const tdList = $(this).find('td');
      tdList.each(function (i) {
        $(this).attr('data-td-title', thList.eq(i).text());
      });
    });
  }
}
$(window).on('load', function () {
  tableAddDataAttributes();
});
// -----------------------------------------------------------------------
// -----   scrollTables   ------------------------------------------------
// -----------------------------------------------------------------------

function scrollTables() {
  const el = $('.tableScroll');
  if (el.length === 0) return;
  el.each(function () {
    const _this = $(this);
    const table = $(this).find('table');
    const caption = $(this).find('caption');
    const prevBtn = $(this).find('.scrollTablePrevBtn');
    const nextBtn = $(this).find('.scrollTableNextBtn');

    if (prevBtn.length === 0 || nextBtn.length === 0) {
      console.error('表格捲動功能: prevBtn 或 nextBtn 無法抓到，請檢查Html結構');
      return;
    }
    if (caption.length !== 0) {
      let captionMargin = parseInt(caption.css('margin-bottom').replace('px', '')) || 0;

      prevBtn.css('top', `${caption.offsetHeight + captionMargin}px`);
      nextBtn.css('top', `${caption.offsetHeight + captionMargin}px`);
    }

    const tableScrollIn = $('<div class="tableScrollIn"></div>');
    $(this).append(tableScrollIn);
    tableScrollIn.append(table);

    tableScrollIn.on('scroll', () => {
      checkScroll();
    });

    function checkScroll() {
      let tableScrollLeft = tableScrollIn.scrollLeft();
      let tableClientWidth = tableScrollIn.outerWidth();
      let tableScrollWidth = table.outerWidth();

      if (tableScrollLeft >= 0 && tableScrollLeft + tableClientWidth < tableScrollWidth) {
        nextBtn.css('display', 'block');
      } else {
        nextBtn.hide();
      }
      if (tableScrollLeft > 0) {
        prevBtn.css('display', 'block');
      } else {
        prevBtn.hide();
      }
    }
    checkScroll();
    $(window).on('resize', function () {
      checkScroll();
    });

    prevBtn.on('click', function (e) {
      e.preventDefault();
      tableScrollIn[0].scrollBy({ left: -100, behavior: 'smooth' });
    });
    nextBtn.on('click', function (e) {
      e.preventDefault();
      tableScrollIn[0].scrollBy({ left: 100, behavior: 'smooth' });
    });
  });
}
$(window).on('load', function () {
  scrollTables();
});
// -----------------------------------------------------------------------
// -----   swiper無障礙功能   -----------------------------------
// -----------------------------------------------------------------------
function swiperA11Fn(swiper) {
  if ($(swiper).length === 0) return;

  let noActive = 0;
  $(swiper.slides).filter(function (i) {
    if ($(this).hasClass('swiper-slide-thumb-active')) {
      noActive = i;
    }
  });

  const swiperSlide = $(swiper.el).find('.item');
  swiperSlide.each(function (i) {
    $(this).attr({
      role: 'button',
      tabindex: '0',
    });

    if (i === noActive) {
      $(this).attr('aria-pressed', 'true');
    } else {
      $(this).attr('aria-pressed', 'false');
    }
  });

  swiperSlide.on('click', function (e) {
    $(this).attr('aria-pressed', 'true');
    $(this).parent().siblings().find('.item').attr('aria-pressed', 'false');
  });

  //swiperAutoPlay切換功能
  const autoPlaySwitch = $(swiper.el).parent().parent().find('.autoPlaySwitch');

  if (autoPlaySwitch.length === 0) return;
  let nowState = swiper.autoplay.running ? true : false;
  let infoPlay = autoPlaySwitch.data('infoPlay');
  let infoStop = autoPlaySwitch.data('infoStop');
  nowState ? autoPlaySwitch.addClass('stop') : autoPlaySwitch.addClass('play');
  autoPlaySwitch.attr({
    'aria-label': infoStop,
    'data-altlabel': infoPlay,
  });

  autoPlaySwitch.on('click', function (e) {
    if (nowState) {
      nowState = false;
      swiper.autoplay.stop();
      autoPlaySwitch.addClass('play');
      autoPlaySwitch.removeClass('stop');
      autoPlaySwitch.attr({
        'aria-label': infoPlay,
        'data-altlabel': infoStop,
      });
    } else {
      nowState = true;
      swiper.autoplay.start();
      autoPlaySwitch.addClass('stop');
      autoPlaySwitch.removeClass('play');
      autoPlaySwitch.attr({
        'aria-label': infoStop,
        'data-altlabel': infoPlay,
      });
    }
  });
  swiper.slides.length === 1 ? autoPlaySwitch.remove() : null;
}

function swiperNavKeyDownFn(swiper, mainSwiper) {
  if ($(swiper).length === 0) return;
  $(swiper.slides).each(function (i) {
    $(this).data('swiperSlideIndex', i);
  });

  body.on('keydown', function (e) {
    if (e.code === 'Enter' && $(e.target).parent().data('swiperSlideIndex') !== undefined) {
      let index = $(e.target).parent().data('swiperSlideIndex');
      mainSwiper.slideTo(index, 1000, false);
      $(e.target).attr('aria-pressed', 'true');
      $(e.target).parent().siblings().find('.item').attr('aria-pressed', 'false');
    }
  });
}

// -----------------------------------------------------------------------
// -----   表單密碼顯示設定   ------------------------------------------------
// -----------------------------------------------------------------------

function formEye() {
  const checkEye = $('.formEyes');
  if (checkEye.length === 0) return;
  const password = checkEye.parent().find('input');
  const showPassword = checkEye.data('show');

  const hidePassword = checkEye.data('hide');
  checkEye.attr({
    'aria-label': showPassword,
    'aria-pressed': 'false',
  });

  checkEye.on('click', function (e) {
    if ($(this).attr('aria-pressed') === 'false') {
      $(this).addClass('active');
      password.attr('type', 'text');
      $(this).attr({
        'aria-pressed': 'true',
        'aria-label': hidePassword,
      });
    } else {
      $(this).removeClass('active');
      password.attr('type', 'password');
      $(this).attr({
        'aria-pressed': 'false',
        'aria-label': showPassword,
      });
    }
  });
}
$(window).on('load', function () {
  formEye();
});
// -----------------------------------------------------------------------
// -----   scroll top   ------------------------------------------------
// -----------------------------------------------------------------------

function scrollTopFn() {
  const scrollTop = $('#scrollTop');
  let scrollY = window.scrollY;
  if (scrollTop.length === 0) return;

  function scrollFN() {
    scrollY > 100 ? scrollTop.addClass('active') : scrollTop.removeClass('active');
  }

  $(window).on('scroll', function (e) {
    scrollY = window.scrollY;
    scrollFN();
  });

  scrollTop.on('click', function (e) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
$(window).on('load', function () {
  scrollTopFn();
});

// -----------------------------------------------------------------------
// -----  form 檔案上傳  ---------------------------------------------------
// -----------------------------------------------------------------------
function addFile() {
  const addFileName = $('.downloadFile');
  addFileName.on('change', pushFileName);

  function pushFileName(e) {
    let fileLen = e.target.files.length;
    const uploadInput = $(e.target).parent().find('.fileName');
    let allFileName = [];
    for (let i = 0; i < fileLen; i++) {
      allFileName.push(e.target.files[i].name);
    }
    uploadInput.html(allFileName.join(', '));
  }
}
$(window).on('load', function () {
  addFile();
});

// -----------------------------------------------------------------------
// -----  橫式跑馬燈   -----------------------------------------------------
// -----------------------------------------------------------------------
function marquee() {
  // 選取所有跑馬燈元件並進行迭代
  $('.marqueeSliderH').each(function () {
    const marquee = $(this); // 當前的跑馬燈元件
    const marqueeBox = marquee.find('.marqueeBox'); // 跑馬燈可視區域
    const marqueeList = marquee.find('.marqueeList'); // 跑馬燈內容列表
    const autoPlaySwitch = marquee.find('.autoPlaySwitch'); // 播放/暫停按鈕

    // 如果找不到必要的元素，則不執行
    if (marqueeList.length === 0) return;

    // 使用 let 宣告，以便在 resize 事件中更新
    let marqueeBoxWidth = marqueeBox.width();
    let marqueeListWidth = marqueeList.width();

    // 狀態變數
    let isPaused = false; // 是否手動暫停
    let isHover = false; // 滑鼠是否懸停
    let sliderMovePx = 0; // 已移動的像素

    // 監聽視窗大小變化，動態更新寬度
    $(window).on('resize', () => {
      marqueeBoxWidth = marqueeBox.width();
      marqueeListWidth = marqueeList.width();
    });

    // --- 複製跑馬燈內容以實現無縫滾動 ---
    // 避免 marqueeListWidth 為 0 時產生錯誤
    if (marqueeListWidth > 0) {
      // 計算需要複製多少個列表才能填滿可視區域，確保無縫滾動
      const clonesNeeded = Math.ceil(marqueeBoxWidth / marqueeListWidth);
      for (let i = 0; i < clonesNeeded; i++) {
        const $cloneList = marqueeList.clone();
        // 將複製出來的項目的 tabindex 設為 -1，避免鍵盤使用者重複選取
        $cloneList.find('a').attr('tabindex', '-1');
        // 將複製的列表附加到容器中
        marqueeBox.append($cloneList);
      }
    }

    // 取得所有跑馬燈列表（包含原始和複製的）
    const $allList = marqueeBox.find('.marqueeList');

    // --- 動畫邏輯 ---
    function marqueeMove() {
      // 使用 requestAnimationFrame 實現流暢動畫
      requestAnimationFrame(marqueeMove);

      // 如果滑鼠懸停或手動暫停，則停止動畫
      if (isHover || isPaused) return;

      sliderMovePx++;

      // 移動所有列表
      if (sliderMovePx <= marqueeListWidth) {
        $allList.css('transform', `translateX(-${sliderMovePx}px)`);
      } else {
        // 當第一個列表完全滾出可視區後，重置移動距離，實現無縫循環
        sliderMovePx = 0;
      }
    }
    marqueeMove();

    // --- 事件處理 ---
    // 滑鼠懸停時暫停
    marqueeBox.on('mouseenter', () => {
      isHover = true;
    });
    marqueeBox.on('mouseleave', () => {
      isHover = false;
    });

    // 提前宣告 infoPlay 和 infoStop 變數以確保作用域正確
    let infoPlay, infoStop;
    if (autoPlaySwitch.length) {
      infoPlay = autoPlaySwitch.data('info-play');
      infoStop = autoPlaySwitch.data('info-stop');
    }

    // 鍵盤操作 (Tab鍵)，讓使用者可以透過鍵盤暫停跑馬燈
    marqueeBox.on('keyup', function (e) {
      if (e.code === 'Tab') {
        e.preventDefault();
        sliderMovePx = -1; // 立即停止滾動
        setTimeout(() => {
          isPaused = true;
        });

        // 更新按鈕狀態
        if (autoPlaySwitch.length) {
          autoPlaySwitch.addClass('play').removeClass('stop');
          autoPlaySwitch.attr('aria-label', infoPlay);
          autoPlaySwitch.attr('data-altlabel', infoStop);
        }
      }
    });

    // --- 播放/暫停按鈕功能 ---
    if (autoPlaySwitch.length === 0) return;

    // 初始化按鈕狀態為 "播放中" (顯示 "stop" 圖示)
    autoPlaySwitch.addClass('stop');
    autoPlaySwitch.attr('aria-label', infoStop);
    autoPlaySwitch.attr('data-altlabel', infoPlay);

    // 點擊事件：切換播放/暫停狀態
    autoPlaySwitch.on('click', function (e) {
      if (!isPaused) {
        isPaused = true;
        $(this).addClass('play').removeClass('stop');
        $(this).attr('aria-label', infoPlay);
        $(this).attr('data-altlabel', infoStop);
      } else {
        isPaused = false;
        $(this).addClass('stop').removeClass('play');
        $(this).attr('aria-label', infoStop);
        $(this).attr('data-altlabel', infoPlay);
      }
    });
  });
}

// 確保在 DOM 載入完成後執行
$(window).on('load', function () {
  marquee();
});

// -----------------------------------------------------------------------
// -----  無障礙快捷鍵盤組合 a11yKeyCode   ----------------------------------
// -----------------------------------------------------------------------
function a11yKeyCode() {
  const body = $('body');
  body.on('keydown', (e) => {
    switch (e.altKey && e.code) {
      case true && 'KeyU':
        const aU = $('#aU');
        aU.focus();
        break;
      case true && 'KeyC':
        const aC = $('#aC');
        aC.focus();
        break;
      case true && 'KeyZ':
        const aZ = $('#aZ');
        aZ.focus();
        break;
    }
  });
}
$(window).on('load', function () {
  a11yKeyCode();
});
// -----------------------------------------------------------------------
// -----   fancyBox新增需要綁定才有效果   -----------------------------------
// -----------------------------------------------------------------------

function fancyBoxFn() {
  const fancyBoxElem = document.querySelectorAll('[data-fancybox]');
  if (fancyBoxElem.length > 0) {
    // 確認引入語系
    let checkLang = document.querySelectorAll('script');

    let lang;
    checkLang.forEach((elem) => {
      const path = elem.attributes.src?.value;
      if (path === undefined) return;
      const match = path?.match(/fancybox\/l10n/);
      const fancyboxPath = match ? match[0] : null;
      if (!fancyboxPath) return;
      const fileName = path?.split('/').pop();
      const locale = fileName?.split('.')[0];
      lang = locale;
    });

    // 一般設定
    Fancybox.bind('[data-fancybox]', {
      l10n: Fancybox.l10n[lang],
      on: {
        '*': (fancyboxRef, eventName) => {
          // 關閉按鈕無障礙問題
          if (eventName === 'done') {
            let closeBtn = fancyboxRef.container?.querySelector('[data-fancybox-close]');
            closeBtn?.insertAdjacentHTML('afterbegin', `<span>${fancyboxRef.options.l10n.CLOSE}</span>`);
            closeBtn.setAttribute('aria-label', fancyboxRef.options.l10n.CLOSE);
          }
        },
      },
    });

    // 進入網頁開啟燈箱
    let showPopup = document.querySelector('.showPopup');
    if (showPopup) {
      Fancybox.show(
        [
          {
            src: `#${showPopup.getAttribute('id')}`,
            type: 'inline',
          },
        ],
        {
          l10n: Fancybox.l10n[lang],
          on: {
            '*': (fancyboxRef, eventName) => {
              // 關閉按鈕無障礙問題
              if (eventName === 'done') {
                let closeBtn = fancyboxRef.container?.querySelector('[data-fancybox-close]');
                closeBtn?.insertAdjacentHTML('afterbegin', `<span>${fancyboxRef.options.l10n.CLOSE}</span>`);
                closeBtn.setAttribute('aria-label', fancyboxRef.options.l10n.CLOSE);
              }
            },
          },
        }
      );
    }
  }
}

window.addEventListener('load', () => fancyBoxFn());
