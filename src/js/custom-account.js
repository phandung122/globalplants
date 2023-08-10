$( document ).ready(function() {

  //ORDER DETAIL SECTION
  var billingAddress = $('.customer-billing-address').prop('outerHTML');
  $('.chContent-BPCW-Order--Details-Ship .chos1:first-child p').html(billingAddress);
  var shippingAddress = $('.customer-shipping-address').prop('outerHTML');
  $('.chContent-BPCW-Order--Details-Ship .chos1:last-child p').html(billingAddress);
  $('.chContent-BPCW-Order--Details').prepend('<div class="back-to-orders-wrappers"><a href="/account?a=orders" class="back-to-orders">Back to Order history</a></div>');
  $('.chContent-BPCW-Order--Details-Price-Items .chContent-BPCW-Order--Details-Price-Value .cart-discount').siblings('span').addClass('discount');
  $('.order-summary__body > tr').each(function(){
    var title = $(this).find('.line-item-product-title').text();
    var id = $(this).find('.line-item-product-title').data('productid');
    $('.chContent-BPCW-Order--Details-Product-Id-'+id).find('.chPDL .chProductLink > i:first-child').html(title);
  });
  
  //DASHBOARD SECTION
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const a = urlParams.get('a');
  if ( window.location.pathname == '/account' && a != 'orders' ) {
    $('#ChRecentOrders').addClass('is-dashboard-page');
    //show first 5 orders.
    $('.chContent-Body-Page-RecentOrders-Wrapper').children('.chContent-Body-Page-RecentOrders-Wrapper-Item').css('display', 'none');
    $('.chContent-Body-Page-RecentOrders-Wrapper').children('.chContent-Body-Page-RecentOrders-Wrapper-Item').slice(0, 5).css('display', 'flex');
    //remove pagination and add view orders
    $('#ChRecentOrders').find('#page_navigation').remove();
    if ( $('.chContent-Body-Page-RecentOrders-Wrapper').children('.chContent-Body-Page-RecentOrders-Wrapper-Item').length ) {
      $('#ChRecentOrders').append('<div class="manage-order-wrappers"><a href="/account?a=orders" class="button">View & manage all orders</a></div>')
    }
  }
  var upsellProducts = $('.acount-upsell-container').html();
  $('#chShowPopular-Block .chContent-BPCBI-Content').html($('.acount-upsell-container'));


  //ORDERS SECTION
  $('.os4').each(function(){
    var link = $(this).closest('.chContent-Body-Page-RecentOrders-Wrapper-Item').find('.chCBPROWID-Actions .chButton-VO').attr('href');
    var name = $(this).html();
    $(this).html('<a href="'+link+'">'+name+'</a>');
  });
  $('.os5').each(function(){
    var html = $(this).html();
    if ( html.indexOf('1 items') != -1 ) {
      html = html.replace('1 items','1 item');
      $(this).html(html);
    }
  });
  $( ".chCBPROWID-Actions-OrderNo" ).each(function( index, element ) {
    const valueId = $(this).text();
    const valueDownload = $(valueId).attr('data-download');
    const htmlActionDownload = '<a alt="download link" class="chButton download" target="_blank" href="'+ valueDownload +'"><span>Download Models</span></a>';
    $(this).parents('.chCBPROWID-Actions').find('.cho-pu').prepend(htmlActionDownload);
  });

  //ORDER SUMMARY
  if($('.container.order').length > 0) {
    const valueDownload = $('.container.order').attr('data-download');
    const htmlActionDownload = '<a alt="download link" class="chButton download" target="_blank" href="'+ valueDownload +'"><span>Download Models</span></a>';
    $('.chContent-BPCW-Order--Details-OtherActions').prepend(htmlActionDownload);
    $('.chContent-BPCW-Order--Details-Table-Headings').append('<span class="format">Format</span>')
    $('a.chProductLink').each(function( index, element ) {
      const allIElements = $(this).find('i');
      var secondIElement = allIElements.eq(1);
      var textContent = secondIElement.text();
      // Convert the text to lowercase and replace whitespace with hyphen
      var modifiedText = textContent.toLowerCase().replace(/[0-9]/g, '').replace(/\s+/g, '-').replaceAll(',', '').replaceAll('(', '').replaceAll(')', '').replaceAll('+','').replaceAll('&','');
      secondIElement.addClass('format-element');
      $(this).parents('.chContent-BPCW-Order--Details-Product').append('<div class="chProductFormat"><span class="'+ modifiedText +'"><span class="text">'+ textContent +'</span></span></div>')
    });

    $('.order-summary__body tr').each(function( index, element ) {
      const targetSku = $(this).attr('data-sku');
      // Filter the div elements to find the one containing the SKUs
      const tagValue = $(this).attr('data-poly').toLowerCase().split('poly')[0].trim();
      var productDetailsDiv = $('.chProductSku').filter(function() {
        return $(this).text().trim() === targetSku;
      }).closest('.chContent-BPCW-Order--Details-Product');
      productDetailsDiv.find('.chProductDetails .chPDL').prepend('<div class="product-tag tag-'+ tagValue +'"><span>'+ $(this).attr('data-poly') +'</span></div>');
    });

    /*
    let billing = window.billingAddress; 
    let customer = window.customerInfo;
    const billingAddressDiv = document.querySelector('.chos1 p');
    const { first_name, address1, phone } = JSON.parse(billing);
    const { email, vatNumber } = customer;
    console.log(customer);
    const html = `
        <b>${first_name}</b>
        <span class="icon"><i class="fas fa-address-card"></i>${address1}</span>
        <span class="icon"><i class="fas fa-envelope"></i>${email}</span>
        <span class="icon"><i class="fas fa-phone"></i>${phone}</span>
        <span class="icon"><i class="fas fa-vat"></i>${vatNumber}</span>
      `;
    billingAddressDiv.innerHTML = html;
    */
    const chflElements = document.querySelectorAll('.chContent-BPCW-Order--Details-Status i');
    // Loop through each element and capitalize the text within the <i> tag
    chflElements.forEach((chflElement) => {
      const capitalizedText = chflElement.textContent.toLowerCase();
        chflElement.textContent = capitalizedText;
    });
    const statusElements = document.querySelectorAll('.chContent-BPCW-Order--Details-Status-Info');
    // Loop through each element and capitalize the text within the <i> tag
    statusElements.forEach((statusElements) => {
      const iTagText = statusElements.querySelector('i').textContent.trim();
      const contentText = statusElements.textContent.replace(iTagText, '').trim();

      const newDiv = document.createElement('div');
      newDiv.textContent = contentText;
      statusElements.innerHTML = `<i>${iTagText}</i>${newDiv.outerHTML}`;
    });
  }

  //ACCOUNT PROFILE FLOW
  $('#chMfHolder_vat label').html('VAT Number');
  $('#chPersonalInfoForm').find('button[type="submit"]').attr('disabled','');
  $('#chPersonalInfoForm').find('input[type="email"]').attr('disabled','');
  $('#chPersonalInfoForm').find('input[type="email"]').closest('.chContent-BPG-group-Value').addClass('disabled');
  var cloneEmail = $('#chPersonalInfoForm').find('input[type="email"]').clone().attr('name','email1');
  $('#chPersonalInfoForm').find('input[type="email"]').closest('.chContent-BPG-group-Value').append(cloneEmail);
  $('#chPersonalInfoForm').find('input[name="email"]').removeAttr('disabled').hide();
  $('#chPasswordForm').find('button[type="button"]').attr('disabled','');
  $('#chPersonalInfoForm').find('input').on('change keydown keyup',function(event){
    $('#chPersonalInfoForm').find('button[type="submit"]').removeAttr('disabled');
  });
  $('#chPasswordForm').find('input').on('change keydown keyup',function(event){
    $('#chPasswordForm').find('button[type="button"]').removeAttr('disabled');
  });

  $('.chEditAddress').each(function(){
    var id = '';
    $(this).find('button').append('<span class="icon"></span>')
    if ( $(this).find('button[id^="EditFormButton_"]').attr('id') != null ) {
      id = $(this).find('button[id^="EditFormButton_"]').attr('id').replace('EditFormButton_','');
    }
    //console.log(id);
    if ( id != '' ) {
      var addressContent = $('.customer-address-'+id).prop('outerHTML')
      $('#chEditAddress_'+id).prepend(addressContent);
      $(this).find('.chEditAddress-Holder').prepend(addressContent);
      $(this).find('.chEditAddress-Holder .chAddressItem').hide();;
    }
  });
  $('.chEditAddressForm form[id^="address_form_"] input').each(function(){
    var name = $(this).attr('name');
    $(this).parents('.chField').attr('name',name);
  });
  $('.chEditAddressForm form[id^="address_form_"] select').each(function(){
    var name = $(this).attr('name');
    $(this).parents('.chField').attr('name',name);
  });
  $('.chAddAddress form[id^="address_form_new"] input').each(function(){
    var name = $(this).attr('name');
    $(this).parents('.chField').attr('name',name);
  });
  $('.chAddAddress form[id^="address_form_new"] select').each(function(){
    var name = $(this).attr('name');
    $(this).parents('.chField').attr('name',name);
  });

  //EDIT ADDRESS FLOW
  $('.chContent-Body-Page-Profile .chaEa').prepend('<a href="#" class="back-to-profile">Back to Personal settings</a>');
  $('.chContent-Body-Page-Profile .chNA').prepend('<a href="#" class="back-to-profile">Back to Personal settings</a>');

  $('.chContent-Body-Page-Profile .chaEa').on('click','.back-to-profile, button[onclick="chSHA()"]',function(event){
    event.preventDefault();
    chSHA();
    $('#chShowProfile-Block, #chShowPassword-Block').fadeIn();
    $('#chShowAddresses-Block .chContent-Body-Page-Content-Wrapper:first-child').fadeIn();
    $('.back-to-profile').fadeOut();
    $("html, body").animate({ scrollTop: 0 }, "fast");
  });

  $('.chContent-Body-Page-Profile .chNA').on('click','.back-to-profile, button[onclick="document.querySelector(\'.chNA\').classList.remove(\'chAddNew\');"]',function(event){
    event.preventDefault();
    document.querySelector('.chNA').classList.remove('chAddNew');
    $('#chShowProfile-Block, #chShowPassword-Block').fadeIn();
    $('#chShowAddresses-Block .chContent-Body-Page-Content-Wrapper:first-child').fadeIn();
    $('.back-to-profile').fadeOut();
    $("html, body").animate({ scrollTop: 0 }, "fast");
  });

  $('.chEditAddress').on('click','button[id^="EditFormButton_"]',function(event){
    $('#chShowProfile-Block, #chShowPassword-Block').fadeOut();
    $('#chShowAddresses-Block .chContent-Body-Page-Content-Wrapper:first-child').fadeOut();
    setTimeout(function(){ $('.back-to-profile').fadeIn(); },200);
    $("html, body").animate({ scrollTop: 0 }, "fast");
  });

  $('.chEditAddress').on('click','[onclick="chPNA();"]',function(event){
    $('#chShowProfile-Block, #chShowPassword-Block').fadeOut();
    $('#chShowAddresses-Block .chContent-Body-Page-Content-Wrapper:first-child').fadeOut();
    setTimeout(function(){ $('.back-to-profile').fadeIn(); },200);
    $("html, body").animate({ scrollTop: 0 }, "fast");
  });

});


function isHidden(el) {
    var style = window.getComputedStyle(el);
    return (style.display === 'none')
}