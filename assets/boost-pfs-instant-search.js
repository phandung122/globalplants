/** VERSION: 1.0.0 Please do not delete this line. Thank you! **/
// Override Settings
var boostPFSInstantSearchConfig = {
  search: {
    suggestionPosition: 'left'
  },
  general: {
    breakpointMobile: '299'
  }
};

(function() {
  BoostPFS.inject(this);

  // Clear button for the Form Search
  HTMLDocument.prototype.ready = function () {
    return new Promise(function(resolve, reject) {
      if (document.readyState === 'complete') {
        resolve(document);
      } else {
        document.addEventListener('DOMContentLoaded', function() {
          resolve(document);
        });
      }
    });
  }

  document.ready().then(function(){
    var inputSearchFormSelector = jQ('.boost-pfs-search-input');
    var clearSearchFormSelector = jQ('.boost-pfs-search-form-btn-clear');

    if(!!inputSearchFormSelector.val()) {
      clearSearchFormSelector.show();
    }

    inputSearchFormSelector.on('change keydown keyup', function(){
      if(!!jQ(this).val()) {
        clearSearchFormSelector.show();
      } else {
        clearSearchFormSelector.hide();
      }
    })

    clearSearchFormSelector.on("click", function(){
      inputSearchFormSelector.val("");
      jQ(this).hide();
      inputSearchFormSelector.click();
    });

    var inputSearchClone = jQ('.c-search-box input');
    inputSearchClone.on('click', function(){
      jQ('[aria-controls="search-popover"]').trigger('click');
    });
  })// End Clear button for the Form Search


  // Customize style of Suggestion box
  SearchInput.prototype.customizeInstantSearch = function() {
    var suggestionElement = this.$uiMenuElement;
    var searchElement = this.$element;
    var searchBoxId = this.id;
  };

  // Bind Event for input search Mobile
  var bindEventsMobile = InstantSearchMobile.prototype.bindEvents;
  InstantSearchMobile.prototype.bindEvents = function() {
    bindEventsMobile.call(this);

    var self = this;
    var searchButtonMobile = '.site-nav--mobile .search-button, .js-search-desktop';
    var searchInputMobile = '.search-input-group input[type="search"], .wg-search-form .search-input';
    var searchCloseButtonMobile = '.drawer__close > button, .drawer_back a';
    jQ(searchButtonMobile).off('click').click(function(e) {
      e.preventDefault();
      //e.stopPropagation();
      jQ(searchInputMobile).focus();
      self.openSuggestionMobile();
      jQ(searchCloseButtonMobile).trigger('click');
    });
  }

  // Bind Event for input search style 3
  // var bindEvents = InstantSearchStyle3.prototype.bindEvents;
  // InstantSearchStyle3.prototype.bindEvents = function() {
  //   bindEvents.call(this);

  //   var self = this;
  //   var searchButtonDesktop = '.site-header__links .search-button';
  //   var searchInputDesktop = '#SearchContainer #search-input';
  //   var searchCloseButtonDesktop = '.drawer__close > button';
  //   jQ(searchButtonDesktop).off('click').click(function(e) {
  //     e.preventDefault();
  //     //e.stopPropagation();
  //     jQ(searchInputDesktop).focus();
  //     self.openSuggestionStyle3();
  //     jQ(searchCloseButtonDesktop).trigger('click');

  //   });
  // }

  // Fix search for the Flow theme
  // jQ('.site-header__links .search-button').on('click', function() {
  //   setTimeout(function() {
  //     boostPFS.initSearchBox();
  //     if(Utils.isCollectionPage()) jQ('.search-input-group > .boost-pfs-search-box').val('');
  //   }, 500);
  // });

  // InstantSearchResultItemProduct.prototype.setData = function (data) {
  //   if (data) {
  //     this.data = data;
  //     this.id = data.id;
  //     this.title = Utils.stripHtml(data.title);
  //     this.imageUrl = data.images_info.length > 0 ? Utils.optimizeImage(data.images_info[0].src, '200x') : boostPFSConfig.general.no_image_url;
  //     this.url = Utils.buildProductItemUrlWithVariant(data);
  //     this.sku = Utils.stripHtml(data.skus && data.skus.length > 0 ? data.skus[0] : '');
  //     this.label = Utils.stripHtml(data.label);
  //     this.vendor = Utils.stripHtml(data.vendor);
  //     this.isShow = true;
  //   } else {
  //     this.data = null;
  //     this.id = '';
  //     this.title = '';
  //     this.imageUrl = '';
  //     this.url = '';
  //     this.sku = '';
  //     this.label = '';
  //     this.vendor = '';
  //     this.isShow = false;
  //   }
  // }

  InstantSearchResultItemProduct.prototype.getTemplate = function(tempType) {
    switch (tempType) {
      case InstantSearchResultItemProduct.tempType.IMAGE:
        return `
          <div class="{{class.searchSuggestion}}-left">
            <img tabindex="-1" src="{{imageUrl}}" alt="{{escapedTitle}}">
          </div>
        `.trim();
      case InstantSearchResultItemProduct.tempType.SKU:
        return `
          <p class="{{class.searchSuggestion}}-product-sku">SKU: {{sku}}</p>
        `.trim();
      case InstantSearchResultItemProduct.tempType.VENDOR:
        return `
          <p class="{{class.searchSuggestion}}-product-vendor">{{vendor}}</p>
        `.trim();
      case InstantSearchResultItemProduct.tempType.PRICE:
        return `
          <p class="{{class.searchSuggestion}}-product-price">
            <span class="{{class.searchSuggestion}}-product-regular-price">{{regularPrice}}</span>
          </p>
        `.trim();
      case InstantSearchResultItemProduct.tempType.PRICE_SALE:
        return `
          <p class="{{class.searchSuggestion}}-product-price">
            <span class="{{class.searchSuggestion}}-product-sale-price">{{regularPrice}}</span>&nbsp;
            <s>{{compareAtPrice}}</s>
          </p>
        `.trim();
      default:
        return `
          <li class="{{class.searchSuggestionItem}} {{class.searchSuggestionItem}}-product {{class.searchUiAutocompleteItem}}" aria-label="{{escapedBlockType}}: {{escapedTitle}}" data-id="{{id}}" role="option">
            <a tabindex="-1" href="{{url}}" {{newTabAttribute}}>
              {{itemProductImage}}
              <div class="{{class.searchSuggestion}}-right">
                {{polyTag}}
                <p class="{{class.searchSuggestion}}-product-title">{{title}}</p>
                {{regionTags}}
                {{itemProductSku}}
                {{itemProductVendor}}
                {{itemProductPrice}}
              </div>
            </a>
          </li>
        `.trim();
    }
  }

  InstantSearchResultItemProduct.prototype.compileTemplate = function() {
    if (this.isShow) {
      var searchTerm = Utils.stripHtml(Globals.currentTerm);
      // Poly tag
      let polyTag = '',
          regionList = '';

      this.data.tags.forEach(tag => {
        if(tag == 'Asia' || tag == 'Europe' || tag == 'America' || tag == 'Middle East' || tag == 'Oceania' || tag == 'Africa') {
          regionList += `<span class="${tag}">${tag}</span>`;
        }

        switch (tag) {
          case 'High Poly':
            polyTag =  `<div class="product-tag tag-high">
                          <span>High Poly</span>
                        </div>`;
            break;
          case 'Low Poly':
            polyTag =  `<div class="product-tag tag-low">
                          <span>Low Poly</span>
                        </div>`;
            break;
          case '2D Images':
            polyTag =  `<div class="product-tag tag-2d">
                          <span>2D Images</span>
                        </div>`;
            break;
        }
      });

      let regionTags = `<div class="product-tags">${regionList}</div>`;

      // Product image
      var imageHTML = '';
      if (Settings.getSettingValue('search.showSuggestionProductImage') && this.imageUrl.length) {
        imageHTML = this.getTemplate(InstantSearchResultItemProduct.tempType.IMAGE);
        imageHTML = imageHTML.replace(/{{imageUrl}}/g, this.imageUrl);
      }

      // Product title
      var productTitle = this.customizeProductTitle();
      productTitle = this._highlightSuggestionResult(productTitle, searchTerm);

      // SKU
      var skuHTML = '';
      if (Settings.getSettingValue('search.showSuggestionProductSku') && this.sku.length) {
        skuHTML = this.getTemplate(InstantSearchResultItemProduct.tempType.SKU);
        skuHTML = skuHTML.replace(/{{sku}}/g, this.sku);
      }

      // Vendor
      var vendorHTML = '';
      if (Settings.getSettingValue('search.showSuggestionProductVendor') &&
      this.vendor.length) {
        vendorHTML = this.getTemplate(InstantSearchResultItemProduct.tempType.VENDOR);
        vendorHTML = vendorHTML.replace(/{{vendor}}/g, this.vendor);
      }

      // Price
      var priceHTML = this.compileSuggestionProductPrice();
      // Open the result item in new tab when selected
      var newTabAttr = Settings.getSettingValue('search.openProductNewTab') ? 'target="_blank"' : '';

      return this.getTemplate()
              .replace(/{{id}}/g, this.id)
              .replace(/{{escapedBlockType}}/g, Utils.stripHtml(this.parent.type))
              .replace(/{{url}}/g, this.url)
              .replace(/{{newTabAttribute}}/g, newTabAttr)
              .replace(/{{itemProductImage}}/g, imageHTML)
              .replace(/{{title}}/g, productTitle)
              .replace(/{{escapedTitle}}/g, Utils.stripHtml(productTitle))
              .replace(/{{polyTag}}/g, polyTag)
              .replace(/{{regionTags}}/g, regionTags)
              .replace(/{{itemProductSku}}/g, skuHTML)
              .replace(/{{itemProductVendor}}/g, vendorHTML)
              .replace(/{{itemProductPrice}}/, priceHTML)
              .replace(/{{class.searchSuggestion}}/g, Class.searchSuggestion)
              .replace(/{{class.searchSuggestionItem}}/g, Class.searchSuggestionItem)
              .replace(/{{class.searchUiAutocompleteItem}}/g, Class.searchUiAutocompleteItem);
    } else {
      return '';
    }
  }

  InstantSearchResultItemProduct.prototype.customizeProductTitle = function () {
    let plantsName = '';
    let commonNames = '';

    if (this.data.metafields) {
      this.data.metafields?.forEach((metafield) => {
        switch (metafield.key) {
          case 'plants_name':
            if(metafield.value != '') {
              plantsName = metafield.value;
            }
            break;
          case 'common_namess':
            let commonNameList = metafield.value.replace(/\[|\]/g, '').split(',');
            for (let i = 0; i < commonNameList.length; i++) {
              if(i < 3) {
                commonNames += ` <span class="common_names">• ${commonNameList[i].replace(/\"/g, '').trim()}`;
              }
            }
        }
      });
    }

    if(plantsName != '') {
      this.title = plantsName + commonNames;
    } else {
      this.title = Utils.stripHtml(this.data.title);
    }

    return this.title;
  }

  InstantSearchResultBlockEmpty.prototype.getTemplate = function() {
    return `
      <div class="{{class.searchSuggestion}}-no-result" data-group="empty" data-label="No Results: {{searchTerm}}" data-value="{{searchTerm}}" aria-label="No Results">
        <p class="empty-text">{{noResultLabel}}</p>

        <div class="boost-pfs-search-suggestion-note">
          <div class="h-stack gap-6">
            <div>
              <p class="bold">Still can't find what you are looking for?</p>
              <p>Our custom plants request will tailor to your needs</p>
            </div>

            <a href="/pages/custom-plant-models-requests" class="button">Get started</a>
          </div>
        </div>
      </div>
    `.trim();
  }

  InstantSearchResultBlockEmpty.prototype.compileTemplate = function() {
    var searchTerm = Utils.stripHtml(Globals.currentTerm);
    var noResultLabel = this.isEmptyWithSuggestion ? Labels.search.resultEmptyWithSuggestion : Labels.error.noSuggestionResult;
    noResultLabel = noResultLabel.replace(/{{ terms }}/g, '<strong>' + searchTerm + '</strong>');

    return this.getTemplate()
    .replace(/{{class.searchSuggestion}}/g, Class.searchSuggestion)
    .replace(/{{class.searchSuggestionItem}}/g, Class.searchSuggestionItem)
    .replace(/{{searchTerm}}/g, searchTerm)
    .replace(/{{noResultLabel}}/g, noResultLabel);
  }

  if (window.themeVariables.settings.pageType === "search") {
    ProductListNoSearchResult.prototype.getNoResultSearchSuggestionsTemplate = function() {
      return `
        <div class="boost-pfs-filter-search-term-suggestion-wrapper boost-pfs-search-panel-product-show">
          <div class="boost-pfs-filter-search-term-suggestion-title">{{searchTermSuggestionTitle}}</div>
          <div class="boost-pfs-filter-search-term-suggestion-content"><ul>{{searchTermSuggestionListItem}}</ul></div>
        </div>
        <div class="boost-pfs-filter-search-note">
          <div class="h-stack gap-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="57" height="56" fill="none" viewBox="0 0 57 56">
              <path fill="url(#a)" d="M53.483 49.684 37.399 33.6a18.79 18.79 0 0 1-3.299 3.3l16.084 16.083a2.322 2.322 0 0 0 1.65.684 2.333 2.333 0 0 0 1.65-3.983Z"/>
              <path fill="#000" d="M37.4 33.6a18.79 18.79 0 0 1-3.3 3.3l2.49 2.49a22.33 22.33 0 0 0 3.3-3.3L37.4 33.6Z" opacity=".15"/>
              <path fill="url(#b)" d="M22.667 40.833c10.309 0 18.666-8.357 18.666-18.666 0-10.31-8.357-18.667-18.666-18.667C12.357 3.5 4 11.857 4 22.167c0 10.309 8.357 18.666 18.667 18.666Z"/>
              <path fill="url(#c)" d="M22.667 42C11.73 42 2.833 33.103 2.833 22.167c0-10.937 8.897-19.834 19.834-19.834 10.936 0 19.833 8.897 19.833 19.834C42.5 33.103 33.603 42 22.667 42Zm0-37.333c-9.65 0-17.5 7.85-17.5 17.5s7.85 17.5 17.5 17.5 17.5-7.85 17.5-17.5-7.85-17.5-17.5-17.5Z"/>
              <defs>
                <linearGradient id="a" x1="44.133" x2="44.133" y1="33.6" y2="53.667" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#60BEF6"/>
                  <stop offset="1" stop-color="#29A0EA"/>
                </linearGradient>
                <linearGradient id="b" x1="22.667" x2="22.667" y1="3.5" y2="40.833" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#DEF2FD"/>
                  <stop offset="1" stop-color="#9ED9FA"/>
                </linearGradient>
                <linearGradient id="c" x1="22.667" x2="22.667" y1="2.333" y2="42" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#9ED9FA"/>
                  <stop offset="1" stop-color="#60BEF6"/>
                </linearGradient>
              </defs>
            </svg>

            <div>
              <p class="bold">Still can't find what you are looking for?</p>
              <p>Our custom plants request will tailor to your needs</p>
            </div>

            <a href="/pages/custom-plant-models-requests" class="button">Get started</a>
          </div>
        </div>
      `.trim();
    }
  }
})();
