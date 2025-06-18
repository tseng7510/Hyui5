'use strict';
// -----------------------------------------------------------------------
// -----  RWD切換判斷，與_variable.scss 的 --RWDWidth連動  ------------------
// -----------------------------------------------------------------------
const setRWDWidth = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--RWDWidth'));

// -----------------------------------------------------------------------
// -----  支援js時，移除no-js  -------------------------------------------------------
// -----------------------------------------------------------------------
document.documentElement.classList.remove('no-js');

// -----------------------------------------------------------------------
// -----  共用效果  -------------------------------------------------------
// -----------------------------------------------------------------------

function jsSlideUp(element, time = 200) {
  let ele = window.getComputedStyle(element);
  let display = ele.display;
  let speed = time;
  element.style.display = display;
  if (display !== 'none') {
    let totalHeight = element.offsetHeight;
    element.style.overflow = 'hidden';

    element.style.height = `${totalHeight}px`;
    element.style.transitionProperty = 'height';
    element.style.transitionDuration = `${speed}ms`;
    setTimeout(() => {
      element.style.height = `0px`;
    }, 0);
    setTimeout(() => {
      element.style.display = 'none';
      element.style.removeProperty('height');
      element.style.removeProperty('overflow');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
    }, speed);
  }
}
// 使用方式
// let target = document.querySelector('.target');
// let a = document.querySelector('.a');
// target.addEventListener('click',(e)=>{
//   jsSlideUp(a);
// })

function jsSlideDown(element, time = 200) {
  let ele = window.getComputedStyle(element);
  let display = ele.display;
  let speed = time;
  element.style.display = display;
  if (display === 'none') {
    element.style.display = 'block';
    element.style.overflow = 'hidden';
    let totalHeight = element.offsetHeight;
    element.style.height = '0px';
    element.style.transitionProperty = 'height';
    element.style.transitionDuration = `${speed}ms`;
    setTimeout(() => {
      element.style.height = `${totalHeight}px`;
    }, 0);
    setTimeout(() => {
      element.style.removeProperty('height');
      element.style.removeProperty('overflow');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
    }, speed);
  }
}
// 使用方式
// let target = document.querySelector('.target');
// let a = document.querySelector('.a');
// target.addEventListener('click',(e)=>{
//   jsSlideDown(a);
// })

function jsSlideToggle(element, time = 200) {
  let ele = window.getComputedStyle(element);

  let display = ele.display;
  let speed = time;
  element.style.display = display;
  if (display === 'none') {
    element.style.display = 'block';
    let totalHeight = element.offsetHeight;
    element.style.overflow = 'hidden';
    element.style.height = '0px';
    element.style.transitionProperty = 'height';
    element.style.transitionDuration = `${speed}ms`;
    setTimeout(() => {
      element.style.height = `${totalHeight}px`;
    }, 0);
    setTimeout(() => {
      element.style.removeProperty('height');
      element.style.removeProperty('overflow');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
    }, speed);
  } else {
    let totalHeight2 = element.offsetHeight;
    element.style.overflow = 'hidden';
    element.style.height = `${totalHeight2}px`;
    element.style.transitionProperty = 'height';
    element.style.transitionDuration = `${speed}ms`;
    setTimeout(() => {
      element.style.height = `0px`;
    }, 0);
    setTimeout(() => {
      element.style.display = 'none';
      element.style.removeProperty('height');
      element.style.removeProperty('overflow');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
    }, speed);
  }
}
// 使用方式
// let target = document.querySelector('.target');
// let a = document.querySelector('.a');
// target.addEventListener('click',(e)=>{
//   jsSlideToggle(a);
// })

function jsSlideToggleWidth(element, time = 200) {
  let ele = window.getComputedStyle(element);
  let display = ele.display;
  let speed = time;
  element.style.display = display;
  if (display === 'none') {
    element.style.display = 'block';
    let totalWidth = element.offsetWidth;
    element.style.overflow = 'hidden';
    element.style.width = '0px';
    element.style.transitionProperty = 'width';
    element.style.transitionDuration = `${speed}ms`;
    setTimeout(() => {
      element.style.width = `${totalWidth}px`;
    }, 0);
    setTimeout(() => {
      element.style.removeProperty('width');
      element.style.removeProperty('overflow');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
    }, speed);
  } else {
    let totalWidth2 = element.offsetWidth;
    element.style.overflow = 'hidden';
    element.style.width = `${totalWidth2}px`;
    element.style.transitionProperty = 'width';
    element.style.transitionDuration = `${speed}ms`;
    setTimeout(() => {
      element.style.width = `0px`;
    }, 0);
    setTimeout(() => {
      element.style.display = 'none';
      element.style.removeProperty('width');
      element.style.removeProperty('overflow');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
    }, speed);
  }
}
// 使用方式
// let target = document.querySelector('.target');
// let a = document.querySelector('.a');
// target.addEventListener('click',(e)=>{
//   jsSlideToggleWidth(a);
// })

function jsFadeIn(element, time = 200) {
  let ele = window.getComputedStyle(element);
  let display = ele.display;
  let speed = time;

  if (display === 'none') {
    display = 'block';
    let opacity = 0;
    element.style.display = display;
    element.style.opacity = 0;

    element.style.transitionProperty = 'opacity';
    element.style.transitionDuration = `${speed}ms`;
    setTimeout(() => {
      element.style.opacity = `1`;
    }, 0);
    setTimeout(() => {
      element.style.display = 'block';
      element.style.removeProperty('opacity');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
    }, speed);
  }
}
// 使用方式
// let target = document.querySelector('.target');
// let a = document.querySelector('.a');
// target.addEventListener('click',(e)=>{
//   jsFadeIn(a);
// })

function jsFadeOut(element, time = 200) {
  let ele = window.getComputedStyle(element);
  let display = ele.display;
  let speed = time;

  if (display !== 'none') {
    element.style.transitionProperty = 'opacity';
    element.style.transitionDuration = `${speed}ms`;
    setTimeout(() => {
      element.style.opacity = `0`;
    }, 0);
    setTimeout(() => {
      element.style.display = 'none';
      element.style.removeProperty('opacity');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
    }, speed);
  }
}
// 使用方式
// let target = document.querySelector('.target');
// let a = document.querySelector('.a');
// target.addEventListener('click',(e)=>{
//   jsFadeOut(a);
// })

function jsFadeToggle(element, time = 200) {
  let ele = window.getComputedStyle(element);
  let display = ele.display;
  let speed = time;

  if (display === 'none') {
    display = 'block';
    let opacity = 0;
    element.style.display = display;
    element.style.opacity = 0;

    element.style.transitionProperty = 'opacity';
    element.style.transitionDuration = `${speed}ms`;
    setTimeout(() => {
      element.style.opacity = `1`;
    }, 0);
    setTimeout(() => {
      element.style.display = 'block';
      element.style.removeProperty('opacity');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
    }, speed);
  } else {
    element.style.transitionProperty = 'opacity';
    element.style.transitionDuration = `${speed}ms`;
    setTimeout(() => {
      element.style.opacity = `0`;
    }, 0);
    setTimeout(() => {
      element.style.display = 'none';
      element.style.removeProperty('opacity');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
    }, speed);
  }
}
// 使用方式
// let target = document.querySelector('.target');
// let a = document.querySelector('.a');
// target.addEventListener('click',(e)=>{
//   jsFadeToggle(a);
// })

function toggleSlider(elem, con) {
  const targetSelect = document.querySelectorAll(elem);
  targetSelect.forEach((item) => {
    let id = `ts_${randomLetter(3)}${randomFloor(0, 999)}`;
    let targetSelectCon = document.querySelector(con);
    const checkDisplay = window.getComputedStyle(targetSelectCon).display === 'none';

    if (checkDisplay) {
      item.setAttribute('aria-expanded', 'false');
    } else {
      item.setAttribute('aria-expanded', 'true');
      item.classList.add('active');
    }
    item.setAttribute('aria-pressed', 'false');
    item.setAttribute('aria-haspopup', 'true');
    item.setAttribute('aria-controls', `${id}_con`);
    item.setAttribute('id', id);
    targetSelectCon.setAttribute('id', `${id}_con`);
    targetSelectCon.setAttribute('aria-labelledby', id);

    item.addEventListener('click', (e) => {
      let expanded = item.getAttribute('aria-expanded');
      if (expanded === 'true') {
        item.setAttribute('aria-expanded', 'false');
        item.setAttribute('aria-pressed', 'false');
        item.classList.remove('active');
      } else {
        item.setAttribute('aria-expanded', 'true');
        item.setAttribute('aria-pressed', 'true');
        item.classList.add('active');
      }
      jsSlideToggle(targetSelectCon);
    });
  });

  window.addEventListener('keydown', (e) => {
    targetSelect.forEach((item, i) => {
      const targetCon = item.parentNode.querySelector(con);
      let allTarget = targetCon.querySelectorAll('a, button, input, textarea, select');
      if (item.getAttribute('aria-expanded') === 'true') {
        if (e.code === 'Tab' && e.shiftKey && e.target === item) {
          e.preventDefault();
          allTarget[allTarget.length - 1].focus();
        } else if (e.code === 'Tab' && !e.shiftKey && e.target === allTarget[allTarget.length - 1]) {
          e.preventDefault();
          item.focus();
        }
        //Escape
        else if (e.code === 'Escape') {
          item.setAttribute('aria-expanded', 'false');
          item.setAttribute('aria-pressed', 'false');
          jsSlideUp(targetCon);
          item.focus();
        }
      }
    });
  });

  // 點擊其他地方關閉;
  window.addEventListener('click', (e) => {
    const targetSelectCon = document.querySelector(con);
    let parents = jsParents(e.target, targetSelectCon).length === 0;

    targetSelect.forEach((item) => {
      if (item.getAttribute('aria-expanded') === 'true' && e.target !== item && parents) {
        item.setAttribute('aria-expanded', 'false');
        item.setAttribute('aria-pressed', 'false');
        item.classList.remove('active');
        jsSlideUp(targetSelectCon);
      }
    });
  });

  // window.addEventListener('resize', (e) => {
  //   targetSelect.forEach((item, i) => {
  //     const targetCon = document.querySelector(con);
  //     item.setAttribute('aria-expanded', 'false');
  //     item.setAttribute('aria-pressed', 'false');
  //     item.classList.remove('active');
  //     jsSlideUp(targetCon);
  //   });
  // });
}
// 使用方式
// toggleSlider('.target','.con');

function jsParents(element, elementCheck) {
  const matched = [];

  const elements = typeof element === 'string' ? document.querySelectorAll(element) : element;

  // 取得每個元素的所有父節點，直到 <html>
  function getParents(el) {
    while (el.parentNode && el.parentNode !== document.documentElement) {
      matched.push(el.parentNode);
      el = el.parentNode;
    }
  }

  // 處理集合與單一元素
  if (elements) {
    if (elements.length === undefined) {
      getParents(elements);
    } else {
      elements?.forEach(getParents);
    }
  }

  // 根據 elementCheck 過濾父節點
  const filtered = matched.filter((parent) => {
    if (!elementCheck) {
      return true;
    } else if (elementCheck[0] === '#') {
      return parent.id === elementCheck.slice(1);
    } else if (elementCheck[0] === '.') {
      return parent.classList.contains(elementCheck.slice(1));
    } else if (typeof elementCheck === 'string') {
      return parent.localName === elementCheck.toLowerCase();
    } else {
      return parent === elementCheck;
    }
  });

  // 利用 Set 來進行去重，再反轉順序
  return Array.from(new Set(filtered)).reverse();
}

// 使用方式
// 第一個參數可使用'.target','#target',變數，第二個參數可使用'ul','.out','#out'
// let target = document.querySelector('.target');
// jsParents(target) 變數方式
// jsParents('.target/#target'); 抓取'.target/#target'所有父層
// jsParents('.target/#target','ul'); 抓取'.target/#target'所有tag為ul的父層
// jsParents('.target/#target','.out'); 抓取'.target/#target'所有class為out的父層
// jsParents('.target/#target','#out'); 抓取'.target/#target'所有id為out的父層
// 操作父層
// jsParents('.target/#target').forEach((i) => {});

function jsChildren(element, elementCheck) {
  const elementArr = typeof element === 'string' ? document.querySelectorAll(element) : element;

  const getChildren = (item) => {
    return [...item.childNodes].filter((child) => {
      if (child.nodeName === '#text') return;
      if (elementCheck === undefined) return true;
      const letter = elementCheck.slice(1);
      switch (elementCheck[0]) {
        case '#':
          return child.id === letter;
        case '.':
          return child.classList.contains(letter);
        default:
          return child.localName === elementCheck;
      }
    });
  };
  return (elementArr.length > 0 ? [...elementArr]?.map((i) => getChildren(i)) : getChildren(element)).flat();
}

// 使用方式
// 第一個參數可使用'.target','#target',變數，第二個參數可使用'ul','.out','#out'
// let target = document.querySelector('.target');
// jsChildren(target) 變數方式
// jsChildren('.target/#target'); 抓取target所有子層
// jsChildren('.target/#target','ul'); 抓取target下一層所有tag為ul的子層
// jsChildren('.target/#target','.out'); 抓取target下一層所有class為out的子層
// jsChildren('.target/#target','#out'); 抓取target下一層所有id為out的子層
// 操作子層
// jsChildren('.target/#target').forEach((i) => {});

// 檢查元素是否可見
function isElementVisible(el) {
  let current = el;
  while (current) {
    const style = window.getComputedStyle(current);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
      return false;
    }
    current = current.parentElement;
  }
  return true;
}

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
  const newTagElem = document.createElement(newTag);
  // 複製所有屬性和內容
  newTagElem.innerHTML = oldTag.innerHTML;
  [...oldTag.attributes].forEach((attr) => {
    newTagElem.setAttribute(attr.name, attr.value);
  });

  // 替換舊標籤
  oldTag.parentNode.replaceChild(newTagElem, oldTag);
}

// 增加透明黑底
const wrapper = document.querySelector('.wrapper');
const overlay = document.createElement('div');
overlay.classList.add('overlay');
wrapper?.insertAdjacentElement('afterbegin', overlay);

// -----------------------------------------------------------------------
// -----  FontSize   -----------------------------------------------------
// -----------------------------------------------------------------------

function fontSize() {
  const fontSize = document.querySelector('.fontSize'); // 控制的對象
  if (fontSize === null) return;
  const list = fontSize.querySelectorAll('ul button');
  const body = document.querySelector('body');
  // 初始化 字體大小設定
  let cookie = readCookie('FontSize');

  list.forEach((v) => {
    v.addEventListener('click', (e) => {
      createCookie('FontSize', `${e.target.className}`, 356);
      toggleBodyClass(e.target.className);
      e.target.parentNode.classList.add('active');
      e.target.setAttribute('aria-pressed', 'true');
    });
  });

  // 移除 active 的 class 名稱
  function toggleBodyClass(targetClassName) {
    [...list].filter((item) => {
      if (item.className === targetClassName) {
        item.setAttribute('aria-pressed', 'true');
        item.parentNode.classList.add('active');
      } else {
        item.setAttribute('aria-pressed', 'false');
        item.parentNode.classList.remove('active');
      }
    });

    switch (targetClassName) {
      case 'smallSize':
        body.classList.remove('largeSize', 'mediumSize');
        body.classList.add('smallSize');
        break;
      case 'mediumSize':
        body.classList.remove('smallSize', 'largeSize');
        body.classList.add('mediumSize');
        break;
      case 'largeSize':
        body.classList.remove('smallSize', 'mediumSize');
        body.classList.add('largeSize');
        break;
    }
  }

  // 創造新的 字體大小設定
  function createCookie(name, value, days) {
    let _expires;
    const _date = new Date();
    if (days) {
      _date.setTime(_date.getTime() + days * 24 * 60 * 60 * 1000);
      _expires = '; expires=' + _date.toGMTString();
    } else {
      _expires = '';
    }
    document.cookie = name + '=' + value + _expires + '; path=/';
  }

  // 讀取瀏覽器上 字體大小設定
  function readCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  // 如果沒有cookie 則預設值為'medium'
  if (!cookie) {
    createCookie('FontSize', 'smallSize', 356);
    toggleBodyClass('smallSize');
  } else {
    toggleBodyClass(cookie);
  }
}
// fontSize();
window.addEventListener('load', fontSize);

// -----------------------------------------------------------------------
// -----  內頁fontSize   -----------------------------------------------------
// -----------------------------------------------------------------------
function fontSizeInner() {
  const fontSize = document.querySelector('.fontSizeInner'); // 控制的對象

  if (fontSize === null) return;

  const list = fontSize.querySelectorAll('ul button');
  const mainContent = document.querySelector('.mainContentBox .mainContent');
  if (mainContent === null) return;
  // 初始化 字體大小設定
  let cookie = readCookie('FontSize');

  list.forEach((v) => {
    v.addEventListener('click', (e) => {
      createCookie('FontSizeInner', `${e.target.className}`, 356);
      toggleBodyClass(e.target.className);
      e.target.parentNode.classList.add('active');
      e.target.setAttribute('aria-pressed', 'true');
    });
  });

  // 移除 active 的 class 名稱
  function toggleBodyClass(targetClassName) {
    [...list].filter((item) => {
      if (item.className === targetClassName) {
        item.setAttribute('aria-pressed', 'true');
        item.parentNode.classList.add('active');
      } else {
        item.setAttribute('aria-pressed', 'false');
        item.parentNode.classList.remove('active');
      }
    });

    switch (targetClassName) {
      case 'smallSize':
        mainContent.classList.remove('largeSize', 'mediumSize');
        mainContent.classList.add('smallSize');
        break;
      case 'mediumSize':
        mainContent.classList.remove('smallSize', 'largeSize');
        mainContent.classList.add('mediumSize');
        break;
      case 'largeSize':
        mainContent.classList.remove('smallSize', 'mediumSize');
        mainContent.classList.add('largeSize');
        break;
    }
  }

  // 創造新的 字體大小設定
  function createCookie(name, value, days) {
    let _expires;
    const _date = new Date();
    if (days) {
      _date.setTime(_date.getTime() + days * 24 * 60 * 60 * 1000);
      _expires = '; expires=' + _date.toGMTString();
    } else {
      _expires = '';
    }
    document.cookie = name + '=' + value + _expires + '; path=/';
  }

  // 讀取瀏覽器上 字體大小設定
  function readCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  // 如果沒有cookie 則預設值為'medium'
  if (!cookie) {
    createCookie('FontSize', 'smallSize', 356);
    toggleBodyClass('smallSize');
  } else {
    toggleBodyClass(cookie);
  }
}
// fontSizeInner();
window.addEventListener('load', fontSizeInner);
// -----------------------------------------------------------------------
// -----  menu   ------------------------------------------------------
// -----------------------------------------------------------------------
function mainMenu(obj) {
  const { sticky = true, needLink = false, mega = false } = obj;
  const mainMenu = document.querySelector('.mainMenu');
  const closeBtnText = mainMenu.dataset.closeBtn;

  const menu = mainMenu.querySelector('nav');

  if (menu === null) return;
  // 有下層的增加 hasChild 的 class
  const checkChild = menu.querySelectorAll('li ul');

  checkChild.forEach((item) => item.parentNode.classList.add('hasChild'));

  const hasChild = menu.querySelectorAll('.hasChild');

  function checkBorder(e) {
    if (mega) return;
    // 抓出該項目以下有多少層級
    const nextUl = e.querySelectorAll('ul');
    //確定最後一層ul的父層li共有幾個
    const hasChildLi = jsParents(nextUl[nextUl.length - 1], 'li');

    // 如果只有一層就不需要
    if (hasChildLi.length <= 1) return;

    // 確定選項的寬度 * 選項有幾層，由於第一層是直接向下不會左右展開，所以需要-1
    const checkUlWidth = hasChildLi[0].offsetWidth * hasChildLi.length - 1 || 0;

    //查詢第一層的位置
    const objectRect = hasChildLi[0].getBoundingClientRect();

    // 如果第一層左邊 + 其他層寬度超過視窗的寬度，則新增leftSlider
    if (window.innerWidth < objectRect.left + checkUlWidth) {
      hasChildLi[0].classList.add('leftSlider');
    } else {
      hasChildLi[0].classList.remove('leftSlider');
    }
  }

  if (mega) {
    menu.classList.add('megaMenu');
    menu.classList.remove('menu');
    const megaMenuChild = menu.querySelectorAll(' ul ul .hasChild > a');
    megaMenuChild.forEach((i) => {
      i.removeAttribute('aria-haspopup');
    });
  }

  const handleMouseenter = (e) => {
    if (window.innerWidth <= setRWDWidth) return;
    e.target.classList.add('active');
    e.target.querySelector('a').setAttribute('aria-expanded', 'true');
    checkBorder(e.target);
  };

  const handleMouseleave = (e) => {
    if (window.innerWidth <= setRWDWidth) return;
    e.target.classList.remove('active');
    e.target.querySelector('a').setAttribute('aria-expanded', 'false');
    e.target.querySelector('ul').style.removeProperty('top');
  };

  //無障礙操作
  const menuAllLi = menu.querySelectorAll('li');
  const menuAllA = menu.querySelectorAll('a');
  const lastA = menu.querySelectorAll('a')[menuAllLi.length - 1];
  const firstA = menu.querySelectorAll('a')[0];

  menu.addEventListener('keydown', (e) => {
    let checkTarget = [...menuAllA].map((i) => e.target === i);
    if (!checkTarget || window.innerWidth <= setRWDWidth) return;
    e.target.setAttribute('aria-expanded', 'true');

    checkBorder(e.target.parentNode);
    if (e.code === 'Tab' && !e.shiftKey) {
      e.target.parentNode.classList.add('active');
      const siblings = [...e.target.parentNode.parentNode.children].filter((child) => child !== e.target.parentNode);
      siblings.forEach((j) => j.classList.remove('active'));
      if (e.target === lastA) {
        menuAllLi.forEach((j) => j.classList.remove('active'));
      }
    } else if (e.code === 'Tab' && e.shiftKey && e.target === firstA) {
      menuAllLi.forEach((j) => j.classList.remove('active'));
    }
  });

  // 手機版設定 ------------------------------------------------------------
  // 新增手機版主選單
  const header = document.querySelector('header');
  const mobileMenu = document.createElement('nav');
  mobileMenu.setAttribute('id', 'mobileMenu');
  mobileMenu.setAttribute('aria-labelledby', 'mobileMainMenuBtn mobileMainMenuClose');

  // 新增手機版主選單容器
  const mobileMainMenuBox = document.createElement('div');
  mobileMainMenuBox.classList.add('mobileMainMenuBox');

  // 新增手機版主選單關閉按鈕
  const mobileMainMenuClose = document.createElement('button');
  mobileMainMenuClose.setAttribute('id', 'mobileMainMenuClose');
  mobileMainMenuClose.setAttribute('aria-expanded', 'true');
  mobileMainMenuClose.insertAdjacentHTML('afterbegin', closeBtnText);

  // 複製主選單
  const mainMenuClone = menu.cloneNode(true);
  mainMenuClone.classList.remove('mainMenu', 'menu');
  mainMenuClone.classList.add('mobileMainMenu');

  // 複製top選單
  const topNav = document.querySelector('.topNav');
  if (topNav !== null) {
    const topNavClone = topNav.cloneNode(true);

    topNavClone.querySelector('.fontSize')?.remove();
    topNavClone.querySelector('.topSearch')?.remove();
    topNavClone.querySelector('#aU')?.remove();
    // 將 top選單 加入到 手機版主選單
    mobileMainMenuBox.insertAdjacentElement('beforeend', topNavClone);
    changeTag(topNavClone, 'div');
  }

  // 將 關閉按鈕 加入到 手機版主選單
  mobileMainMenuBox.insertAdjacentElement('afterbegin', mainMenuClone);
  // 將 主選單 加入到 手機版主選單
  mobileMainMenuBox.insertAdjacentElement('beforeend', mobileMainMenuClose);
  // 將 手機版主選單 加入到 手機版主選單(多包一層div)
  mobileMenu.insertAdjacentElement('afterbegin', mobileMainMenuBox);
  // 將 手機版主選單 加入到 header 前
  header?.insertAdjacentElement('beforebegin', mobileMenu);
  // 轉換標籤
  changeTag(mainMenuClone, 'div');

  hasChild.forEach((i) => {
    // 無障礙設定 -- pc
    const id = `menu_${randomLetter(3)}${randomFloor(0, 999)}`;
    const childA = i.querySelector('a');
    const childUl = i.querySelector('ul');
    childA.setAttribute('aria-expanded', 'false');
    childA.setAttribute('aria-haspopup', 'true');
    childA.setAttribute('id', id);
    childA.setAttribute('aria-controls', `${id}_con`);
    childUl.setAttribute('id', `${id}_con`);
    childUl.setAttribute('aria-labelledby', id);

    // 滑鼠滑過
    i.addEventListener('mouseenter', handleMouseenter);
    i.addEventListener('mouseleave', handleMouseleave);
  });

  // 點擊選單按鈕 執行 展開側邊選單函式
  const body = document.querySelector('body');
  const mobileMainMenuBtn = document.querySelector('#mobileMainMenuBtn');

  mobileMainMenuBtn?.setAttribute('aria-controls', 'mobileMenu');
  mobileMainMenuBtn?.setAttribute('aria-expanded', 'false');
  mobileMainMenuBtn?.setAttribute('aria-pressed', 'false');
  mobileMainMenuBtn?.setAttribute('aria-haspopup', 'true');

  // 展開側邊選單函式
  function showSidebar() {
    mobileMenu.style.opacity = '1';
    mobileMenu.style.display = 'block';
    mobileMainMenuBtn?.setAttribute('aria-expanded', 'true');
    mobileMainMenuBtn?.setAttribute('aria-pressed', 'true');

    setTimeout(() => {
      mobileMenu.style.transform = `translateX(0px)`;
      mobileMenu.classList.add('open');
    }, 0);
    mobileMainMenuClose.focus();
    body.classList.add('noscroll');
    jsFadeIn(overlay);
  }
  // 隱藏側邊選單函式
  function hideSidebar() {
    jsFadeOut(overlay);
    mobileMenu.style.transform = `translateX(-100%)`;
    mobileMainMenuBtn?.setAttribute('aria-expanded', 'false');
    mobileMainMenuBtn?.setAttribute('aria-pressed', 'false');

    setTimeout(() => {
      mobileMenu.removeAttribute('style');
    }, 300);

    mobileMenu.classList.remove('open');
    body.classList.remove('noscroll');
    mobileMainMenuBtn?.focus();
  }

  mobileMainMenuBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    showSidebar();
  });

  mobileMainMenuClose.addEventListener('click', (e) => {
    hideSidebar();
    mobileMainMenuBtn?.focus();
  });

  // 手機版選單展開功能
  const mobileMenuLiHasChild = mobileMenu.querySelectorAll('li.hasChild');

  mobileMenuLiHasChild.forEach((i) => {
    let childControl;

    if (!needLink) {
      childControl = i.querySelector('a');
      childControl.setAttribute('role', 'button');
    } else {
      i.classList.add('needLink');
      const nextA = i.querySelector('a');
      const nextBtn = document.createElement('button');
      nextBtn.classList.add('nextLvl');
      nextA.insertAdjacentElement('afterend', nextBtn);
      nextBtn.setAttribute('id', nextA.getAttribute('id'));
      childControl = nextBtn;
    }

    // 無障礙設定 -- mobile
    const id = `mobileMenu_${randomLetter(3)}${randomFloor(0, 999)}`;
    const childUl = i.querySelector('ul');
    childControl.setAttribute('aria-expanded', 'false');
    childControl.setAttribute('aria-haspopup', 'true');
    childControl.setAttribute('id', id);
    childControl.setAttribute('aria-controls', `${id}_con`);
    childUl.setAttribute('id', `${id}_con`);
    childUl.setAttribute('aria-labelledby', id);

    childControl.addEventListener('click', (e) => {
      if (!childControl.parentNode.classList.contains('hasChild')) return;
      if (!needLink) {
        e.preventDefault();
      }
      toggleAccordion(childControl, 'ul');
    });
  });

  // 手機版鍵盤無障礙設定
  const allMobileMenuTarget = mobileMenu.querySelectorAll('a,button,input,select');
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      hideSidebar();
    } else if (e.code === 'Tab' && !e.shiftKey && e.target === mobileMainMenuClose) {
      e.preventDefault();
      allMobileMenuTarget[0].focus();
    } else if (e.code === 'Tab' && e.shiftKey && e.target === allMobileMenuTarget[0]) {
      e.preventDefault();
      mobileMainMenuClose.focus();
    }
  });

  // 是否選單固定
  if (sticky) {
    const header = document.querySelector('header');
    const headTop = document.querySelector('.headTop');

    const menu = document.querySelector('.mainMenu');
    const headerMargin = parseInt(window.getComputedStyle(header).marginBottom.replace('px', ''));

    window.addEventListener('scroll', function () {
      if (window.innerWidth > setRWDWidth) {
        if (headTop.clientHeight < window.scrollY) {
          menu.classList.add('sticky');
          headTop.style.marginBottom = `${headerMargin + menu.clientHeight}px`;
        } else {
          menu.classList.remove('sticky');
          headTop.style.marginBottom = `${headerMargin}px`;
        }
      } else {
        headTop.removeAttribute('style');
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth <= setRWDWidth) {
        headTop.removeAttribute('style');
      } else {
        body.classList.remove('noscroll');
        jsFadeOut(overlay);
        hideSidebar();
      }
    });
  }

  // 選單層級展開fn
  function toggleAccordion(item, con) {
    const nodeNameCheck = item.nodeName.toLowerCase();

    let content = item.parentNode.querySelector(con);
    if (window.getComputedStyle(content).display !== 'none') {
      item.setAttribute('aria-expanded', 'false');
      item.classList.remove('active');
    } else {
      item.setAttribute('aria-expanded', 'true');
      item.classList.add('active');
    }
    jsSlideToggle(content);

    const siblings = [...item.parentNode.parentNode.children].filter((child) => child !== item.parentNode);

    siblings.forEach((j) => {
      if (j.querySelector(con)) {
        let target = j.querySelector(con);
        jsSlideUp(target);
        j.querySelector(nodeNameCheck).setAttribute('aria-expanded', 'false');
      }
    });
  }
}

// -----------------------------------------------------------------------
// -----  search   ------------------------------------------------------
// -----------------------------------------------------------------------
function webSearch() {
  const webSearch = document.querySelector('.webSearch');

  if (webSearch === null) return;
  // console.warn('網站搜尋功能: webSearch 無法抓到(請檢查Html結構)，或是沒有使用到此功能');
  // return;

  const mobileSearchBtn = document.querySelector('#mobileSearchBtn');
  const webSearchBtn = document.querySelector('#topSearchBtn');
  const searchTargetSelect = document.querySelectorAll('#topSearchBtn, #mobileSearchBtn');
  const webSearchAllTarget = webSearch.querySelectorAll('a, button, input, select, textarea');
  const id = `ws_${randomLetter(3)}${randomFloor(0, 999)}`;

  // 桌機搜尋按鈕進行設定與事件綁定
  if (webSearchBtn !== null) {
    webSearchBtn.setAttribute('aria-controls', `${id}_con`);
    webSearchBtn.setAttribute('aria-expanded', 'false');
    webSearchBtn.setAttribute('aria-pressed', 'false');
    webSearchBtn.setAttribute('aria-haspopup', 'true');
    webSearchBtn.addEventListener('click', () => toggleContent(webSearchBtn));
  }

  // 行動版搜尋按鈕設定及事件綁定
  if (mobileSearchBtn) {
    mobileSearchBtn.setAttribute('aria-controls', `${id}_con`);
    mobileSearchBtn.setAttribute('aria-expanded', 'false');
    mobileSearchBtn.setAttribute('aria-pressed', 'false');
    mobileSearchBtn.setAttribute('aria-haspopup', 'true');
    mobileSearchBtn.addEventListener('click', () => toggleContent(mobileSearchBtn));
  }

  // 搜尋內容區塊設定 ARIA 標記，建立與觸發按鈕的關聯
  webSearch.setAttribute('id', `${id}_con`);
  webSearch.setAttribute('aria-labelledby', `topSearchBtn mobileSearchBtn`);

  // 6. 切換搜尋展開/關閉的函式
  function toggleContent(elem, focus = false) {
    const isExpanded = elem.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      elem.setAttribute('aria-expanded', 'false');
      elem.setAttribute('aria-pressed', 'false');
      elem.classList.remove('active');
      jsSlideUp(webSearch);
      setTimeout(() => {
        elem.focus();
      });
    } else {
      elem.setAttribute('aria-expanded', 'true');
      elem.setAttribute('aria-pressed', 'true');
      elem.classList.add('active');
      // 清空搜尋區塊內第一個可編輯項目的值（例如輸入框）
      setTimeout(() => {
        if (webSearchAllTarget[0]) webSearchAllTarget[0].value = '';
        if (webSearchAllTarget[0]) webSearchAllTarget[0].focus();
      });
      jsSlideDown(webSearch);
    }
  }

  // 共用函式：重置按鈕的 ARIA 狀態
  const resetAria = (elem) => {
    if (elem.getAttribute('aria-expanded') === 'true') {
      elem.focus();
    }
    elem.setAttribute('aria-expanded', 'false');
    elem.setAttribute('aria-pressed', 'false');
    elem.classList.remove('active');
  };

  // 鍵盤事件設定，支援 Tab、Enter、Alt+S 快捷鍵以及 Escape 關閉
  window.addEventListener('keydown', (e) => {
    const isSearchBtn = e.target === webSearchBtn || e.target === mobileSearchBtn;
    const searchBtn = window.innerWidth >= setRWDWidth ? webSearchBtn : mobileSearchBtn;
    const checkExpanded = e.target.getAttribute('aria-expanded');
    const lastTarget = webSearchAllTarget[webSearchAllTarget.length - 1];

    // Tab
    if (e.code === 'Tab') {
      if (e.target === lastTarget && !e.shiftKey && searchBtn) {
        e.preventDefault();
        searchBtn.focus();
      } else if (isSearchBtn && checkExpanded === 'true') {
        e.preventDefault();
        if (!e.shiftKey) {
          if (webSearchAllTarget[0]) webSearchAllTarget[0].focus();
        } else {
          lastTarget.focus();
        }
      }

      // Enter
    } else if (e.code === 'Enter' && isSearchBtn) {
      setTimeout(() => {
        if (webSearchAllTarget[0]) webSearchAllTarget[0].focus();
      });

      // Alt+S
    } else if (e.altKey && e.code === 'KeyS') {
      toggleContent(searchBtn, true);

      // Escape
    } else if (e.code === 'Escape') {
      const checkDisplay = window.getComputedStyle(webSearch).display;
      if (checkDisplay === 'none') return;
      if (window.innerWidth >= setRWDWidth && webSearchBtn) {
        resetAria(webSearchBtn);
        jsSlideUp(webSearch);
      } else if (window.innerWidth < setRWDWidth && mobileSearchBtn) {
        resetAria(mobileSearchBtn);
        jsSlideUp(webSearch);
      }
    }
  });

  // 點擊其他地方時關閉搜尋面板
  window.addEventListener('click', (e) => {
    const isInsideSearch = jsParents(e.target, webSearch).length !== 0;

    searchTargetSelect.forEach((item) => {
      if (item.getAttribute('aria-expanded') === 'true' && e.target !== item && !isInsideSearch && webSearchBtn !== null) {
        item.setAttribute('aria-expanded', 'false');
        item.setAttribute('aria-pressed', 'false');
        item.classList.remove('active');
        jsSlideUp(webSearch);
      }
    });
  });
}
// webSearch();
window.addEventListener('load', webSearch);

// -----------------------------------------------------------------------
// -----  Tab   ------------------------------------------------------
// -----------------------------------------------------------------------

function tabFunction(obj) {
  const { target, autoClose = true, openContent = false, modeSwitch = false, windowWidth = setRWDWidth, openIndex = 0, openSwitch = true } = obj;

  const tabSet = document.querySelector(target);
  if (tabSet === null) return;

  const tabBtnBox = tabSet.querySelector('.tabBtnBox');
  const tabItems = tabSet.querySelector('.tabItems');
  const tabBtn = tabSet.querySelectorAll('.tabBtn');
  const tabContent = tabSet.querySelectorAll('.tabContent');
  const tabContentIn = tabSet.querySelectorAll('.tabContentIn');

  //初始設定
  function tabInit(targetIndex) {
    tabItems.setAttribute('role', 'tablist');

    tabBtn.forEach((tab, i) => {
      const id = `tab_${randomLetter(3)}${randomFloor(0, 999)}`;
      const controls = `${id}_con`;

      tab.setAttribute('role', 'tab');
      tab.setAttribute('id', id);
      tab.setAttribute('aria-controls', controls);
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('aria-expanded', 'false');
      tab.setAttribute('tabindex', '-1');
      if (tabContent[i] === undefined) {
        console.error(`tab功能: ${obj.target}內容數量與按鈕數量不符`);
      } else {
        setAttributeFn(tabContent[i], 'tabpanel', controls, id);
      }

      //模式切換-新增按鈕
      if (modeSwitch) {
        const mobileTabBtn = createMobileTabBtn(id, controls, tab.textContent);
        tabContent[i].insertAdjacentElement('afterbegin', mobileTabBtn);
      }
    });

    checkTarget(targetIndex);
    tabSet.dataset.nowIndex = targetIndex;
  }

  // 創建移動版選項按鈕
  function createMobileTabBtn(id, controls, textContent) {
    const mobileTabBtn = document.createElement('button');
    mobileTabBtn.classList.add('mobileTabBtn');
    mobileTabBtn.setAttribute('id', id);
    mobileTabBtn.setAttribute('aria-controls', controls);
    mobileTabBtn.setAttribute('type', 'button');
    mobileTabBtn.setAttribute('aria-expanded', 'false');
    mobileTabBtn.insertAdjacentHTML('afterbegin', textContent);
    return mobileTabBtn;
  }

  //執行
  tabInit(openIndex);

  //切換動作
  function checkTarget(targetIndex) {
    tabSet.dataset.nowIndex = targetIndex;

    //點選的按鈕增加active
    tabBtn[targetIndex].classList.add('active');
    tabBtn[targetIndex].setAttribute('aria-selected', 'true');
    tabBtn[targetIndex].setAttribute('aria-expanded', 'true');
    tabBtn[targetIndex].setAttribute('tabindex', '0');

    //移除其他按鈕的active
    const siblingsBtn = [...tabBtn].filter((value) => value !== tabBtn[targetIndex]);
    siblingsBtn.forEach((value) => {
      value.classList.remove('active');
      value.setAttribute('aria-selected', 'false');
      value.setAttribute('aria-expanded', 'false');
      value.setAttribute('tabindex', '-1');
    });

    //內容增加active
    tabContent[targetIndex].removeAttribute('style');

    //移除其他內容的active
    const siblingsPanel = [...tabContent].filter((value) => value !== tabContent[targetIndex]);
    siblingsPanel.forEach((value) => {
      value.style.display = 'none';
    });
  }

  // 是否可開合/切換
  if (openSwitch) {
    //tab動作
    tabSet.addEventListener('click', (e) => {
      if (!e.target.classList.contains('tabBtn')) return;
      let index = [...tabBtn].indexOf(e.target) % tabBtn.length;

      checkTarget(index);
    });

    tabSet.addEventListener('keydown', (e) => {
      if (!e.target.classList.contains('tabBtn')) return;
      let index;
      //左右操作tab
      if (e.code === 'ArrowRight') {
        index = ([...tabBtn].indexOf(e.target) + 1) % tabBtn.length;
        tabBtn[index].focus();
        checkTarget(index);
      } else if (e.code === 'ArrowLeft') {
        index = ([...tabBtn].indexOf(e.target) - 1 + tabBtn.length) % tabBtn.length;
        tabBtn[index].focus();
        checkTarget(index);
      }
    });

    //模式切換-手風琴動作
    if (modeSwitch) {
      const mobileTabBtn = tabSet.querySelectorAll('.mobileTabBtn');

      tabSet.addEventListener('click', (e) => {
        if (!e.target.classList.contains('mobileTabBtn')) return;
        let index = [...mobileTabBtn].indexOf(e.target) % mobileTabBtn.length;
        mobileTabFn(mobileTabBtn[index], index, mobileTabBtn);
      });
    }
  }

  function mobileTabFn(btn, i, mobileTabBtn) {
    jsSlideToggle(tabContentIn[i]);
    tabSet.dataset.nowIndex = i;
    let check = btn.getAttribute('aria-expanded') === 'true' ? false : true;
    btn.setAttribute('aria-expanded', check);
    btn.classList.toggle('active');

    if (!autoClose) return;
    const siblingsMobileTabBtn = [...mobileTabBtn].filter((value) => value !== mobileTabBtn[i]);
    siblingsMobileTabBtn.forEach((value) => {
      value.classList.remove('active');
      value.setAttribute('aria-expanded', 'false');
    });
    const siblingsPanel = [...tabContentIn].filter((value) => value !== tabContentIn[i]);
    siblingsPanel.forEach((value) => {
      jsSlideUp(value);
    });
  }

  function removeAttributeFn(item) {
    item.removeAttribute('role');
    item.removeAttribute('aria-labelledby');
    item.removeAttribute('id');
  }
  function setAttributeFn(item, role, id, labelledby) {
    item.setAttribute('role', role);
    item.setAttribute('id', id);
    item.setAttribute('aria-labelledby', labelledby);
  }
  //模式切換-RWD
  function checkRWD() {
    const tabpanelBtn = tabSet.querySelectorAll('.tabContent .mobileTabBtn');
    const nowOpen = tabSet.dataset.nowIndex;

    // 電腦版
    tabBtn[nowOpen].classList.add('active');
    tabBtn[nowOpen].setAttribute('aria-selected', 'true');
    tabBtn[nowOpen].setAttribute('aria-expanded', 'true');
    tabBtn[nowOpen].setAttribute('tabindex', '0');
    const tabListSiblingsPanelBtn = [...tabBtn].filter((value) => value !== tabBtn[nowOpen]);
    tabListSiblingsPanelBtn.forEach((value) => {
      value.classList.remove('active');
      value.setAttribute('aria-expanded', 'false');
      value.setAttribute('aria-selected', 'false');
      value.setAttribute('tabindex', '-1');
    });

    // 手機版
    tabpanelBtn[nowOpen]?.classList.add('active');
    tabpanelBtn[nowOpen]?.setAttribute('aria-expanded', 'true');
    const tabSiblingsPanelBtn = [...tabpanelBtn].filter((value) => value !== tabpanelBtn[nowOpen]);
    tabSiblingsPanelBtn.forEach((value) => {
      value.classList.remove('active');
      value.setAttribute('aria-expanded', 'false');
    });

    if (window.innerWidth < windowWidth && modeSwitch) {
      //隱藏上方選單
      tabItems.style.display = 'none';

      tabBtn.forEach((tab, i) => {
        const id = tabpanelBtn[i].getAttribute('id');
        const controls = tabpanelBtn[i].getAttribute('aria-controls');

        //顯示所有tab內容標籤
        tabContent[i].removeAttribute('style');
        //移除tab內容標籤
        removeAttributeFn(tabContent[i]);

        //顯示手風琴標籤按鈕
        tabpanelBtn[i].removeAttribute('style');
        //新增手風琴內容標籤
        setAttributeFn(tabContentIn[i], 'region', controls, id);
        tabContentIn[i].style.display = 'none';
      });

      if (openContent) {
        tabContentIn.forEach((value, j) => {
          value.style.display = 'block';
          tabpanelBtn[j].classList.add('active');
        });
      } else {
        //隱藏其他手風琴內容
        const siblingsPanel = [...tabContentIn].filter((value) => value !== tabContentIn[nowOpen]);
        siblingsPanel.forEach((value, t) => {
          tabpanelBtn[t].classList.remove('active');
        });
        //展開目前手風琴內容
        tabpanelBtn[nowOpen].classList.add('active');
        tabpanelBtn[nowOpen].setAttribute('aria-expanded', 'true');
        tabpanelBtn[nowOpen].focus();
        tabContentIn[nowOpen].removeAttribute('style');
      }
    } else if (window.innerWidth >= windowWidth && modeSwitch) {
      //增加上方選單
      tabItems.removeAttribute('style');
      tabItems.setAttribute('role', 'tablist');

      tabBtn.forEach((tab, i) => {
        const id = tabpanelBtn[i].getAttribute('id');
        const controls = tabpanelBtn[i].getAttribute('aria-controls');

        //顯示所有Tab內容
        tabContentIn[i].removeAttribute('style');
        //移除Tab內容標籤
        removeAttributeFn(tabContentIn[i]);
        tabContentIn[i].removeAttribute('style');

        //隱藏Tab標籤按鈕
        tabpanelBtn[i].style.display = 'none';
        //新增Tab內容標籤
        setAttributeFn(tabContent[i], 'tabpanel', controls, id);
      });

      //展開目前Tab內容
      tabContent[nowOpen].removeAttribute('style');
      tabBtn[nowOpen].focus();

      //隱藏其他Tab內容
      const siblingsPanel = [...tabContent].filter((value) => value !== tabContent[nowOpen]);
      siblingsPanel.forEach((value) => {
        value.style.display = 'none';
      });
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

  const accordionSet = target === undefined ? document.querySelector(obj) : document.querySelector(target);
  if (accordionSet === null) return;
  // console.warn('手風琴功能: accordionSet 無法抓到(請檢查Html結構)，或是沒有使用到此功能');
  // return;

  const infoOpen = accordionSet.dataset.stateOpen;
  const infoClose = accordionSet.dataset.stateClose;
  const accordionBtns = accordionSet.querySelectorAll('.accordionBtn');
  const accordionCons = accordionSet.querySelectorAll('.accordionContent');

  //初始設定
  function accordionInit(targetIndex) {
    accordionSet.dataset.nowIndex = targetIndex;
    accordionBtns.forEach((accordion, i) => {
      const id = `accordion_${randomLetter(3)}${randomFloor(0, 999)}`;
      const controls = `${id}_con`;

      // 增加展開說明文字
      let accordionState;
      if (openSwitch) {
        accordionState = document.createElement('div');
        accordionState.classList.add('accordionState');
        accordionState.insertAdjacentHTML('afterbegin', infoOpen);
        accordion.insertAdjacentElement('beforeend', accordionState);
      }

      //button
      accordion.setAttribute('id', id);
      accordion.setAttribute('aria-controls', controls);
      accordion.setAttribute('aria-expanded', 'false');

      //content
      accordionCons[i].setAttribute('id', controls);
      accordionCons[i].setAttribute('aria-labelledby', id);
      accordionCons[i].setAttribute('role', 'region');

      if (openContent) {
        // 預設先展開所有內容
        accordion.classList.add('active');
        accordion.setAttribute('aria-expanded', 'true');
        if (openSwitch) accordionState.textContent = infoClose;
      } else if (!openContent) {
        accordion.setAttribute('aria-expanded', 'false');
        accordionCons[i].style.display = 'none';
      }
    });

    if (openDefault) {
      accordionBtns[openIndex].parentElement.classList.add('active');
      accordionBtns[openIndex].setAttribute('aria-expanded', 'true');
      jsSlideDown(accordionCons[openIndex]);
      if (openSwitch) accordionBtns[openIndex].querySelector('.accordionState').textContent = infoClose;
    }
  }
  accordionInit(openIndex);

  function accordionFn(btn, i) {
    const accordionState = btn.querySelector('.accordionState');
    jsSlideToggle(accordionCons[i]);
    accordionSet.dataset.nowIndex = i;
    let infoText = accordionState.textContent === infoClose ? infoOpen : infoClose;
    let expanded = btn.getAttribute('aria-expanded') === 'true' ? false : true;
    accordionState.textContent = infoText;
    btn.setAttribute('aria-expanded', expanded);
    btn.parentElement.classList.toggle('active');

    if (!autoClose) return;
    const siblingsMobileAccordionBtns = [...accordionBtns].filter((value) => value !== accordionBtns[i]);
    siblingsMobileAccordionBtns.forEach((value) => {
      value.parentElement.classList.remove('active');
      value.querySelector('.accordionState').textContent = infoOpen;
    });
    const siblingsAccordionCons = [...accordionCons].filter((value) => value !== accordionCons[i]);
    siblingsAccordionCons.forEach((value) => jsSlideUp(value));
  }

  // 是否可開合/切換
  if (openSwitch) {
    accordionBtns.forEach((btn, i) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        accordionFn(btn, i);
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
  const fatFooterBtn = document.querySelector('#fatFooterBtn');

  if (fatFooterBtn === null) return;

  const fatFooterCon = document.querySelectorAll('.fatFooter nav > ul > li > ul');

  let idArray = [];
  fatFooterCon.forEach((item, i) => {
    idArray.push(`fatFooter${i}`);
    item.setAttribute('id', `fatFooter${i}_con`);
    item.setAttribute('aria-labelledby', `fatFooterBtn`);
  });

  fatFooterBtn.setAttribute('aria-controls', idArray.join(' '));
  fatFooterBtn.setAttribute('aria-expanded', 'true');

  fatFooterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    fatFooterBtn.setAttribute('aria-expanded', fatFooterBtn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    fatFooterCon.forEach((i) => toggleFatFooter(i, 400));
  });

  function toggleFatFooter(element, time = 200) {
    let ele = window.getComputedStyle(element);

    let display = ele.display;
    let speed = time;
    element.style.display = display;
    if (display === 'none') {
      element.style.display = 'flex';
      let totalHeight = element.offsetHeight;
      element.style.overflow = 'hidden';
      element.style.height = '0px';
      element.style.transitionProperty = 'height';
      element.style.transitionDuration = `${speed}ms`;
      setTimeout(() => {
        element.style.height = `${totalHeight}px`;
      }, 0);
      setTimeout(() => {
        element.style.removeProperty('height');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-duration');
        element.style.removeProperty('transition-property');
      }, speed);
    } else {
      let totalHeight2 = element.offsetHeight;
      element.style.overflow = 'hidden';
      element.style.height = `${totalHeight2}px`;
      element.style.transitionProperty = 'height';
      element.style.transitionDuration = `${speed}ms`;
      setTimeout(() => {
        element.style.height = `0px`;
      }, 0);
      setTimeout(() => {
        element.style.display = 'none';
        element.style.removeProperty('height');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-duration');
        element.style.removeProperty('transition-property');
      }, speed);
    }
  }
}
// fatFooter();
window.addEventListener('load', fatFooter);

// -----------------------------------------------------------------------
// -----  sideNav   ------------------------------------------------------
// -----------------------------------------------------------------------
function sideNav(options) {
  const { showDefault = true, needLink = false, duration = 200 } = options;
  const mainBox = document.querySelector('.mainBox');
  const sideNav = document.querySelector('.sideNav');
  const mainContentBox = document.querySelector('.mainContentBox');

  if (sideNav === null || mainContentBox === null) return;

  const hasSideNavGap = parseInt(getComputedStyle(mainBox).gap.replace('px', ''));
  let sideNavWidth = sideNav.offsetWidth;
  mainContentBox.style.width = `calc(100% - ${hasSideNavGap + sideNavWidth}px)`;

  const sideMenu = sideNav.querySelector('nav#sideMenu');
  if (!sideMenu) return;
  const sideMenuContent = sideMenu.querySelector('.sideMenuContent');
  sideMenu.dataset.width = parseInt(getComputedStyle(sideMenuContent).width.replace('px', ''));
  const sideNavBtn = sideNav.querySelector('#sideNavBtn');
  const allTarget = sideNav.querySelectorAll('a, button, input, select');

  if (sideNavBtn) {
    // 統一設定無障礙相關屬性與過渡效果
    const setTransitionBtn = (btn, expanded, left = null, toLeft = null) => {
      btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      btn.setAttribute('aria-haspopup', 'true');
      btn.setAttribute('aria-controls', 'sideMenu');
      btn.classList.toggle('active');

      if (window.innerWidth <= setRWDWidth) {
        btn.style.transitionProperty = 'left';
        btn.style.transitionDuration = `${duration}ms`;
        btn.style.left = `${left}px`;
        setTimeout(() => {
          btn.style.left = `${toLeft}px`;
        });
        setTimeout(() => {
          btn.style.removeProperty('transition-duration');
          btn.style.removeProperty('transition-property');
        }, duration);
      }
    };
    setTransitionBtn(sideNavBtn, showDefault);

    const setTransition = (elem, width, toWidth) => {
      elem.style.overflow = 'hidden';
      elem.style.transitionProperty = 'width';
      elem.style.transitionDuration = `${duration}ms`;
      elem.style.width = `${width}px`;
      setTimeout(() => {
        elem.style.width = `${toWidth}px`;
      });
      setTimeout(() => {
        sideMenu.style.removeProperty('width');
        sideMenu.style.removeProperty('overflow');
        elem.style.removeProperty('transition-duration');
        elem.style.removeProperty('transition-property');
      }, duration);
    };

    const sideMenuWidth = sideMenu.dataset.width;
    sideNavBtn.addEventListener('click', () => {
      const menuStyle = getComputedStyle(sideMenu);
      const isClosed = menuStyle.display === 'none';

      if (isClosed) {
        // ---- 開啟選單 ----
        sideMenu.style.display = 'block';
        setTransition(sideMenu, 0, sideMenuWidth);
        setTransitionBtn(sideNavBtn, true, 0, sideMenuWidth);
        // 若為 mobile 模式，更新按鈕位置
        if (window.innerWidth > setRWDWidth) {
          mainContentBox.style.width = `calc(100% - ${hasSideNavGap + sideNavWidth}px)`;
        }
      } else {
        // ---- 關閉選單 ----
        setTransition(sideMenu, sideMenuWidth, 0);
        setTransitionBtn(sideNavBtn, false, sideMenuWidth, 0);
        setTimeout(() => {
          sideMenu.style.display = 'none';
        }, duration);
      }
    });
  }

  // 設定 sideMenu 的無障礙屬性
  sideMenu.setAttribute('aria-labelledby', 'sideNavBtn');
  sideMenu.setAttribute('role', 'navigation');

  // 為含下層選單的 li 加上 hasChild 類別
  sideMenu.querySelectorAll('li ul').forEach((item) => item.parentNode.classList.add('hasChild'));

  // 設定所有含子選單項目的無障礙與點擊處理
  sideMenu.querySelectorAll('.hasChild').forEach((item) => {
    const uid = `sn_${randomLetter(3)}${randomFloor(0, 999)}`;
    let childControl;
    if (!needLink) {
      childControl = item.querySelector('a');
      childControl.setAttribute('role', 'button');
    } else {
      item.classList.add('needLink');
      const nextBtn = document.createElement('button');
      nextBtn.classList.add('nextLvl');
      item.querySelector('a').insertAdjacentElement('afterend', nextBtn);
      childControl = nextBtn;
    }
    const childUl = item.querySelector('ul');
    childControl.setAttribute('aria-expanded', 'false');
    childControl.setAttribute('aria-haspopup', 'true');
    childControl.setAttribute('id', uid);
    childControl.setAttribute('aria-controls', `${uid}_con`);
    childUl.setAttribute('id', `${uid}_con`);
    childUl.setAttribute('aria-labelledby', uid);
    childControl.addEventListener('click', (e) => {
      e.preventDefault();
      toggleAccordion(childControl, 'ul', item);
    });
  });

  // 手風琴切換函式
  function toggleAccordion(control, selector, parent) {
    const content = control.parentNode.querySelector(selector);
    const isVisible = getComputedStyle(content).display !== 'none';
    control.setAttribute('aria-expanded', isVisible ? 'false' : 'true');
    parent.classList.toggle('active');
    jsSlideToggle(content);
    // 收合同層其他項目
    const sibling = [...control.parentNode.parentNode.children].filter((item) => item !== parent);

    sibling.forEach((item) => {
      item.querySelector(selector) !== null ? jsSlideUp(item.querySelector(selector)) : null;
      if (needLink) {
        item.querySelector('button')?.setAttribute('aria-expanded', 'false');
      } else {
        item.querySelector('a').setAttribute('aria-expanded', 'false');
      }
      item.classList.remove('active');
    });
  }

  let checkRwd = window.innerWidth < setRWDWidth;
  // 鍵盤無障礙設定（僅限 RWD 狀態下有效）
  window.addEventListener('keydown', (e) => {
    if (checkRwd && sideNavBtn.getAttribute('aria-expanded') === 'true') {
      const focusable = [...allTarget].filter((item) => item.getBoundingClientRect().height !== 0);
      const lastFocusable = focusable[focusable.length - 1];
      if (e.code === 'Tab') {
        if (e.shiftKey && e.target === allTarget[0]) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && e.target === lastFocusable) {
          e.preventDefault();
          sideNavBtn.focus();
        }
      }
    }
  });

  // 視窗載入與重置事件：調整響應式設定
  const checkRwdFn = () => {
    sideNavWidth = sideNav.offsetWidth;
    if (window.innerWidth <= setRWDWidth) {
      checkRwd = true;
      mainContentBox.removeAttribute('style');
      sideNavBtn.classList.remove('active');
      sideNavBtn.setAttribute('aria-expanded', 'false');
      sideNavBtn.style.left = '';
      sideNavBtn.style.top = `80px`;
      sideMenu.removeAttribute('style');
    } else if (window.innerWidth > setRWDWidth && checkRwd === true) {
      checkRwd = false;
      sideNavBtn.classList.add('active');
      sideNavBtn.setAttribute('aria-expanded', 'true');
      sideMenu.removeAttribute('style');
      mainContentBox.style.width = `calc(100% - ${hasSideNavGap + sideNav.offsetWidth}px)`;
    }
  };
  window.addEventListener('load', checkRwdFn);
  window.addEventListener('resize', checkRwdFn);
}

// -----------------------------------------------------------------------
// -----   tableList樣式 加上 data-title   -------------------------------
// -----------------------------------------------------------------------

function tableAddDataAttributes() {
  const el = document.querySelectorAll('.tableList');
  if (el === null) return;
  el.forEach((i) => {
    const tableItem = i.querySelectorAll('table');
    tableItem.forEach((i) => {
      setTrAttr(i);
      i.classList.add('loaded');
    });
  });
  function setTrAttr(i) {
    const thList = i.querySelectorAll('th');
    const trList = i.querySelectorAll('tr');
    trList.forEach((trItem) => {
      const tdList = trItem.querySelectorAll('td');
      tdList.forEach((i, idx) => {
        tdList[idx].dataset.tdTitle = `${thList[idx].textContent}`;
      });
    });
  }
}
// tableAddDataAttributes();
window.addEventListener('load', tableAddDataAttributes);

// -----------------------------------------------------------------------
// -----   scrollTables   ------------------------------------------------
// -----------------------------------------------------------------------

function scrollTables() {
  const el = document.querySelectorAll('.tableScroll');
  if (el === null) return;

  el.forEach((elem) => {
    const table = elem.querySelector('table');
    const caption = elem.querySelector('caption');
    const prevBtn = elem.querySelector('.scrollTablePrevBtn');
    const nextBtn = elem.querySelector('.scrollTableNextBtn');
    if (prevBtn === null || nextBtn === null) {
      console.error('表格捲動功能: prevBtn 或 nextBtn 無法抓到，請檢查Html結構');
      return;
    }

    if (caption !== null) {
      let captionMargin = parseInt(window.getComputedStyle(caption).marginBottom.replace('px', '')) || 0;

      prevBtn.style.top = `${caption.offsetHeight + captionMargin}px`;
      nextBtn.style.top = `${caption.offsetHeight + captionMargin}px`;
    }
    const tableScrollIn = document.createElement('div');
    tableScrollIn.className = 'tableScrollIn';
    tableScrollIn.insertAdjacentElement('afterbegin', table);
    elem.insertAdjacentElement('beforeend', tableScrollIn);

    let tableScrollLeft = tableScrollIn.scrollLeft;
    let tableClientWidth = tableScrollIn.clientWidth;
    let tableScrollWidth = tableScrollIn.scrollWidth;

    tableScrollIn.addEventListener('scroll', () => {
      checkScroll(tableScrollLeft, tableClientWidth, tableScrollWidth);
    });

    function checkScroll(tableScrollLeft, tableClientWidth, tableScrollWidth) {
      tableScrollLeft = tableScrollIn.scrollLeft;
      tableClientWidth = tableScrollIn.clientWidth;
      tableScrollWidth = table.scrollWidth;
      if (tableScrollLeft >= 0 && tableScrollLeft + tableClientWidth < tableScrollWidth) {
        nextBtn.style.display = 'block';
      } else {
        nextBtn.style.display = 'none';
      }
      if (tableScrollLeft > 0) {
        prevBtn.style.display = 'block';
      } else {
        prevBtn.style.display = 'none';
      }
    }

    window.addEventListener('load', () => checkScroll(tableScrollLeft, tableClientWidth, tableScrollWidth));
    window.addEventListener('resize', () => checkScroll(tableScrollLeft, tableClientWidth, tableScrollWidth));

    prevBtn.addEventListener('click', () => {
      tableScrollIn.scrollLeft -= 100;
    });
    nextBtn.addEventListener('click', () => {
      tableScrollIn.scrollLeft += 100;
    });
  });
}
// scrollTables();
window.addEventListener('load', scrollTables);

// -----------------------------------------------------------------------
// -----   swiperAutoPlay切換功能   -----------------------------------
// -----------------------------------------------------------------------
function swiperAutoPlaysFn(swiper, elem) {
  // console.log(swiper, swiper.el.offsetParent);

  const autoPlaySwitch = swiper.el.parentNode.parentNode.querySelector('.autoPlaySwitch');

  if (autoPlaySwitch === null) return;
  let nowState = swiper.autoplay.running ? true : false;
  let infoPlay = autoPlaySwitch.dataset.infoPlay;
  let infoStop = autoPlaySwitch.dataset.infoStop;
  nowState ? autoPlaySwitch.classList.add('stop') : autoPlaySwitch.classList.add('play');
  autoPlaySwitch.setAttribute('aria-label', infoStop);
  autoPlaySwitch.setAttribute('data-altlabel', infoPlay);

  autoPlaySwitch.addEventListener('click', (e) => {
    if (nowState) {
      nowState = false;
      swiper.autoplay.stop();
      autoPlaySwitch.classList.add('play');
      autoPlaySwitch.classList.remove('stop');
      autoPlaySwitch.setAttribute('aria-label', infoPlay);
      autoPlaySwitch.setAttribute('data-altlabel', infoStop);
    } else {
      nowState = true;
      swiper.autoplay.start();
      autoPlaySwitch.classList.add('stop');
      autoPlaySwitch.classList.remove('play');
      autoPlaySwitch.setAttribute('aria-label', infoStop);
      autoPlaySwitch.setAttribute('data-altlabel', infoPlay);
    }
  });
  swiper.slides.length === 1 ? autoPlaySwitch.remove() : null;
}

// -----------------------------------------------------------------------
// -----   swiper無障礙功能   -----------------------------------
// -----------------------------------------------------------------------
function swiperA11Fn(swiper) {
  let noActive = 0;
  swiper.slides.filter((elem, i) => {
    if (elem.classList.contains('swiper-slide-thumb-active')) {
      noActive = i;
    }
  });

  const swiperSlide = swiper.el.querySelectorAll('.item');
  swiperSlide.forEach((elem, idx) => {
    elem.setAttribute('role', 'button');
    elem.setAttribute('tabindex', '0');

    if (idx === noActive) {
      elem.setAttribute('aria-pressed', 'true');
    } else {
      elem.setAttribute('aria-pressed', 'false');
    }

    elem.addEventListener('click', (e) => {
      elem.setAttribute('aria-pressed', 'true');

      let sibling = [...swiperSlide].filter((item) => item !== elem);
      sibling.forEach((j) => j.setAttribute('aria-pressed', 'false'));
    });
  });
}

function swiperNavKeyDownFn(swiper, mainSwiper) {
  if (swiper === null) return;
  swiper.slides.forEach((elem, idx) => {
    elem.dataset.swiperSlideIndex = idx;
  });

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' && e.target.parentNode.dataset.swiperSlideIndex !== undefined) {
      let index = e.target.parentNode.dataset.swiperSlideIndex;
      let swiperSlide = e.target.parentNode.parentNode.querySelectorAll('.item');
      mainSwiper.slideTo(index, 1000, false);
      e.target.setAttribute('aria-pressed', 'true');

      let sibling = [...swiperSlide].filter((item) => item !== e.target);
      sibling.forEach((j) => j.setAttribute('aria-pressed', 'false'));
    }
  });
}

// -----------------------------------------------------------------------
// -----   表單密碼顯示設定   ------------------------------------------------
// -----------------------------------------------------------------------
function formEye() {
  const checkEye = document.querySelector('.formEyes');
  if (checkEye === null) return;
  const password = checkEye.parentNode.querySelector('.password');
  const showPassword = checkEye.dataset.show;
  const hidePassword = checkEye.dataset.hide;
  checkEye.setAttribute('aria-label', showPassword);
  checkEye.setAttribute('aria-pressed', 'false');

  checkEye.addEventListener('click', (e) => {
    if (checkEye.getAttribute('aria-pressed') === 'false') {
      checkEye.classList.add('active');
      password.setAttribute('type', 'text');
      checkEye.setAttribute('aria-pressed', 'true');
      checkEye.setAttribute('aria-label', hidePassword);
    } else {
      checkEye.classList.remove('active');
      password.setAttribute('type', 'password');
      checkEye.setAttribute('aria-pressed', 'false');
      checkEye.setAttribute('aria-label', showPassword);
    }
  });
}
// formEye();
window.addEventListener('load', formEye);

// -----------------------------------------------------------------------
// -----   scroll top   ------------------------------------------------
// -----------------------------------------------------------------------

function scrollTopFn() {
  const scrollTop = document.querySelector('#scrollTop');
  let scrollY = window.scrollY;
  if (scrollTop === null) return;

  function scrollFN() {
    scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
  }

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    scrollFN();
  });

  scrollTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
// scrollTopFn();
window.addEventListener('load', scrollTopFn);

// -----------------------------------------------------------------------
// -----  form notice訊息區塊關閉按鈕   -------------------------------------
// -----------------------------------------------------------------------

function noticeBoxFn() {
  const allNoticeBox = document.querySelectorAll('[class^="formNotice"]');
  // const noticeClose =

  if (allNoticeBox === null) return;

  allNoticeBox.forEach((elem) => {
    const noticeClose = elem.querySelector('.noticeClose');
    const id = `notice_${randomLetter(3)}${randomFloor(0, 999)}`;
    noticeClose.setAttribute('id', id);
    noticeClose.setAttribute('aria-controls', `${id}_con`);
    elem.setAttribute('id', `${id}_con`);
    elem.setAttribute('role', 'alert');
    elem.setAttribute('aria-labelledby', id);
  });

  window.addEventListener('click', (e) => {
    const checkCloseBtn = e.target;
    if (checkCloseBtn.classList.contains('noticeClose')) {
      checkCloseBtn.parentNode.style.display = 'none';
    }
  });
}
// noticeBoxFn();
window.addEventListener('load', noticeBoxFn);

// -----------------------------------------------------------------------
// -----  form 檔案上傳  ---------------------------------------------------
// -----------------------------------------------------------------------
function addFile() {
  const addFileName = document.querySelectorAll('.downloadFile');
  addFileName.forEach((i) => {
    i.addEventListener('change', pushFileName);
  });

  function pushFileName(e) {
    let fileLen = e.target.files.length;
    const uploadInput = e.target.parentNode.querySelector('.fileName');

    let allFileName = [];
    for (let i = 0; i < fileLen; i++) {
      allFileName.push(e.target.files[i].name);
    }
    uploadInput.textContent = allFileName.join(', ');
  }
}
addFile();
// -----------------------------------------------------------------------
// -----  無障礙快捷鍵盤組合 a11yKeyCode   ----------------------------------
// -----------------------------------------------------------------------

function a11yKeyCode() {
  window.addEventListener('keydown', (e) => {
    switch (e.altKey && e.code) {
      case true && 'KeyU':
        const aU = document.querySelector('#aU');
        aU.focus();
        break;
      case true && 'KeyC':
        const aC = document.querySelector('#aC');
        aC.focus();
        break;
      case true && 'KeyZ':
        const aZ = document.querySelector('#aZ');
        aZ.focus();
        break;
    }
  });
}
// a11yKeyCode();
window.addEventListener('load', a11yKeyCode);

// -----------------------------------------------------------------------
// -----   fancyBox新增需要綁定才有效果   -----------------------------------
// -----------------------------------------------------------------------
if (document.querySelectorAll('[data-fancybox]').length > 0) {
  Fancybox.bind('[data-fancybox]', {
    l10n: Fancybox.l10n.zh_TW,
  });
}
