document.addEventListener("DOMContentLoaded", () => {
  //console.log('hello Format');
});

//hide menu item content
const menuElements = document.querySelectorAll('.main-format-guide-body-menu-item:not(.active) .main-format-guide-body-menu-content');
menuElements.forEach((element) => {
  element.classList.add('collapse');
});
//hide tab content
const tabElements = document.querySelectorAll('.main-format-guide-body-tab:not(.active)');
tabElements.forEach((element) => {
  element.classList.add('collapse');
});
//mobile menu content 
document.querySelector('.main-format-guide-body-menu-mobile-content').innerHTML = document.querySelector('.main-format-guide-body-menu-item.active .main-format-guide-body-menu-content-inner').innerHTML;
const formatMenuItems = document.querySelectorAll('.main-format-guide-body-menu-item-title');
formatMenuItems.forEach((formatMenuItem) => {
  formatMenuItem.addEventListener('click', showFormatTab, false);
});
function showFormatTab() {
  var item = this.parentElement;
  var target = item.getAttribute('model-type');
  var formatMenuContent = this.nextElementSibling;
  if ( item.classList.contains('active') ) {
    //item.classList.remove('active');
    //formatMenuContent.style.height = 0+'px';
  } else {
    //deactive others menu
    var menuItems = document.querySelectorAll('.main-format-guide-body-menu-item');
    menuItems.forEach((element) => {
      element.classList.remove('active');
      element.querySelector('.main-format-guide-body-menu-content').style.height = 0+'px';
    });
    //deactive others tab
    var tabItems = document.querySelectorAll('.main-format-guide-body-tab');
    tabItems.forEach((element) => {
      element.classList.remove('active');
      element.style.height = 0+'px';
    });
    //active new menu
    item.classList.add('active');
    var height = formatMenuContent.querySelector('.main-format-guide-body-menu-content-inner').scrollHeight;
    formatMenuContent.style.height = height+'px';
    //active new tab
    var activeTab = document.querySelector('.main-format-guide-body-tab[model-type="'+target+'"]');
    activeTab.classList.remove('active');
    var tabHeight = activeTab.querySelector('.main-format-guide-body-tab-inner').scrollHeight;
    activeTab.style.height = tabHeight+'px';
    //mobile menu content 
    document.querySelector('.main-format-guide-body-menu-mobile-content').innerHTML = item.querySelector('.main-format-guide-body-menu-content-inner').innerHTML;
  }
};

//hide all file content
const elements = document.querySelectorAll('.format__file-content');
elements.forEach((element) => {
  element.classList.add('collapse');
});
const formatFileLabels = document.querySelectorAll('.format__file-label');
formatFileLabels.forEach((formatFileLabel) => {
  formatFileLabel.addEventListener('click', showFormatFile, false);
});
function showFormatFile() {
  //toggle item state
  var item = this.parentElement;
  var formatFileContent = this.nextElementSibling;
  if ( item.classList.contains('active') ) {
    item.classList.remove('active');
    formatFileContent.style.height = 0+'px';
  } else {
    item.classList.add('active');
    var height = formatFileContent.querySelector('.format__file-content-inner').scrollHeight;
    formatFileContent.style.height = height+'px';
  }
};