var errorIcon = '<svg class="error-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><g clip-path="url(#clip0_5571_77)"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.5 10C18.5 14.6944 14.6944 18.5 10 18.5C5.30558 18.5 1.5 14.6944 1.5 10C1.5 5.30558 5.30558 1.5 10 1.5C14.6944 1.5 18.5 5.30558 18.5 10ZM20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM10.75 11C10.75 11.4142 10.4142 11.75 10 11.75C9.58579 11.75 9.25 11.4142 9.25 11V5C9.25 4.58579 9.58579 4.25 10 4.25C10.4142 4.25 10.75 4.58579 10.75 5V11ZM10 14C10.5523 14 11 14.4477 11 15C11 15.5523 10.5523 16 10 16C9.44771 16 9 15.5523 9 15C9 14.4477 9.44771 14 10 14Z" fill="#EB5757"/></g><defs><clipPath id="clip0_5571_77"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>';
var checkIcon = '<svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none"><path d="M6.66675 36.6667L13.3334 30L30.0001 43.3333L66.6667 15L73.3334 20L30.0001 63.3333L6.66675 36.6667Z" fill="#72C472"/></svg>';
/*
* Log the customer in with their email and password.
*/
function login(email, password) {  
  var data = {
    'customer[email]': email,
    'customer[password]': password,
    form_type: 'customer_login',
    utf8: '✓'
  };

  var promise = $.ajax({
    url: '/account/login',
    method: 'post',
    data: data,
    dataType: 'html',
    async: true,
    success: function (response) {
      //console.log(response);
      var form = $('.account-form#LoginForm');
      if (response.indexOf('Incorrect email or password.') !== -1 ) {
        //console.log('Incorrect email or password.');
        form.find('input[name="customer[email]"]').closest('.form-control').addClass('error');
        form.find('input[name="customer[email]"]').siblings('.form-control-error-status').html('Incorrect email or password.');
      } else {
        //console.log('success!');
        window.location.href = "/account";
      }
    }
  });

  return promise;
}

/*
* Send customer recover password
*/
function recoverPassword(email) {  
  var data = {
    'email': email,
    form_type: 'customer_recover',
    utf8: '✓'
  };

  var promise = $.ajax({
    url: '/account/recover',
    method: 'post',
    data: data,
    dataType: 'html',
    async: true,
    success: function (response) {
      //console.log(response);
      var form = $('.recover-form');
      if (response.indexOf('No account found') !== -1 ) {
        //console.log('No account found');
        form.find('input[name="email"]').closest('.form-control').addClass('error');
        form.find('input[name="email"]').siblings('.form-control-error-status').html('We could not find this email in our system');
        form.find('.recover-signup-wrapper').show();
      } else {
        //console.log('success!');
        form.find('input[name="email"]').siblings('.form-control-error-status').html('');
        $('#recover .recover-icon-check').show();
        $('#recover .recover-titlte').html('Password Reset Requested');
        $('#recover .recover-subtitlte').html('We\'ve sent a reset link to your email. Click it to set a new password. Can\'t find it? Please check your spam/junk folder.');
        form.hide();        
        $('#recover').append('<a href="/" class="button button--xl w-full back-home">Back to Homepage</a>');
      }
      return response;
    },
    error: function (request, status, error) {
        //console.log(request.status);
        if ( request.status == 429 ) {
          var form = $('.recover-form');
          form.find('input[name="email"]').closest('.form-control').addClass('error');
          form.find('input[name="email"]').siblings('.form-control-error-status').html('Too many attempts: Please try again later.');
        }

    }
  });

  //return promise;
}

/*
* Log the customer in with their email and password.
*/
function register(email, password, firstName, lastName) {  
  var data = {
    'customer[email]': email,
    'customer[password]': password,
    'customer[first_name]': firstName,
    'customer[last_name]': lastName,
    form_type: 'create_customer',
    utf8: '✓'
  };

  var promise = $.ajax({
    url: '/account',
    method: 'post',
    data: data,
    dataType: 'html',
    async: true,
    success: function (response) {
      //console.log(response);
      var form = $('.account-form#RegisterForm');
      if (response.indexOf('This email address is already associated with an account.') !== -1 ) {
        //console.log('This email address is already associated with an account.');
        form.find('input[name="customer[email]"]').closest('.form-control').addClass('error');
        form.find('input[name="customer[email]"]').siblings('.form-control-error-status').html('This email already exists in our system. <a class="link" href="#" onclick="document.getElementsByClassName(\'login-btn\')[0].click();">Sign in here!</a>');
      } else {
        var VAT = form.find('input[name="customer[customer_hub][vat]"]').val();
        var email = form.find('input[name="customer[email]"]').val();
        if ( email != '' && VAT != '' ) {
          let key = window.btoa(email + '_vat_number_register')
          let value = window.btoa(VAT);
          localStorage.setItem(key, value);
        }
        //console.log('success!');
        window.location.href = "/account";
      }
    }
  });

  return promise;
}

/*
* Get the `checkout_url` from the URL query parameter, if it exists.
* (It only ever exists on the /account/login page)
*/
function getCheckoutUrl() {  
  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  return getParameterByName('checkout_url');
}



$( document ).ready(function() {
  $('.recover-form .form-control, .account-form .form-control, .register-form .form-control').append(errorIcon);
  $('#login .signup-btn,#login .login-btn').click(function(event){
    $('#login input').val('');
    $('#login .form-control').removeClass('error');
    $('#login .form-control .form-control-error-status').html('');
  })

  $('.recover-form .button[type="submit"]').on('click', function(event){
    event.preventDefault();
    //console.log('recover-form click');
    var form = $('.recover-form');
    var email = form.find('input[name="email"]').val();
    form.find('input[name="email"]').closest('.form-control').removeClass('error');
    form.find('input[name="email"]').siblings('.form-control-error-status').html('');
    if ( email != '' ) {
      if ( email.indexOf('@') === -1 ) {
        form.find('input[name="email"]').closest('.form-control').addClass('error');
        form.find('input[name="email"]').siblings('.form-control-error-status').html('Please check your email.');
      } else {
        recoverPassword(email);
      }
    } else {
      form.find('input[name="email"]').closest('.form-control').addClass('error');
      form.find('input[name="email"]').siblings('.form-control-error-status').html('Please input your email.');
    }
  });
  $('.recover-form').submit(function(event) {
    event.preventDefault();
    //console.log('recover-form');
    return 0;
  });
  $('.recover-signup-wrapper .link').click(function(event){
    $('#login .signup-btn').click();
  })



  $('.account-form#LoginForm .button[type="submit"]').on('click', function(event){
    event.preventDefault();
    //console.log('account-form click');
    var form = $('.account-form#LoginForm');
    var email = form.find('input[name="customer[email]"]').val();
    var password =  form.find('input[name="customer[password]"]').val();
    //console.log(email);
    //console.log(password);
    form.find('input[name="customer[email]"]').closest('.form-control').removeClass('error');
    form.find('input[name="customer[email]"]').siblings('.form-control-error-status').html('');
    form.find('input[name="customer[password]"]').closest('.form-control').removeClass('error');
    form.find('input[name="customer[password]"]').siblings('.form-control-error-status').html('');
    if ( email != '' ) {
      if ( email.indexOf('@') === -1 ) {
        form.find('input[name="customer[email]"]').closest('.form-control').addClass('error');
        form.find('input[name="customer[email]"]').siblings('.form-control-error-status').html('Please enter a valid email');
      } else {
      }
    } else {
      form.find('input[name="customer[email]"]').closest('.form-control').addClass('error');
      form.find('input[name="customer[email]"]').siblings('.form-control-error-status').html('Please enter a valid email');
    }
    if ( password == '' ) {
      form.find('input[name="customer[password]"]').closest('.form-control').addClass('error');
      form.find('input[name="customer[password]"]').siblings('.form-control-error-status').html('Please check your password.');
    }
    if ( email.indexOf('@') !== -1 && email != '' && password != '' ) {
      login(email,password);
    }
  });



  $('.password-recover-form .button[type="submit"]').on('click', function(event){
    event.preventDefault();
    //console.log('password-recover-form click');
    var form = $('.password-recover-form');
    var password =  form.find('input[name="customer[password]"]').val();
    var retypePassword =  form.find('input[name="customer[password_confirmation]').val();
    form.find('input[name="customer[password]"]').closest('.form-control').removeClass('error');
    form.find('input[name="customer[password]"]').siblings('.form-control-error-status').html('');
    form.find('input[name="customer[password_confirmation]"]').closest('.form-control').removeClass('error');
    form.find('input[name="customer[password_confirmation]"]').siblings('.form-control-error-status').html('');

    if ( password == '' ) {
      form.find('input[name="customer[password]"]').closest('.form-control').addClass('error');
      form.find('input[name="customer[password]"]').siblings('.form-control-error-status').html('Please check your password.');
    }
    if ( password.length < 5 ) {
      form.find('input[name="customer[password]"]').closest('.form-control').addClass('error');
      form.find('input[name="customer[password]"]').siblings('.form-control-error-status').html('Password needs at least 5 characters.');
    }
    if ( retypePassword == '' ) {
      form.find('input[name="customer[password_confirmation]"]').closest('.form-control').addClass('error');
      form.find('input[name="customer[password_confirmation]"]').siblings('.form-control-error-status').html('Please check your confirm password.');
    }
    if ( password != retypePassword && retypePassword != '' ) {
      form.find('input[name="customer[password_confirmation]').closest('.form-control').addClass('error');
      form.find('input[name="customer[password_confirmation]').siblings('.form-control-error-status').html('Password & Confirm Password do not match.');
    }

    if ( password != '' && password == retypePassword && password.length > 4 ) {
      form.submit();
    }
  });

  $('.register-form .button[type="submit"]').on('click', function(event){
    event.preventDefault();
    //console.log('register-form click');
    var form = $('.register-form');
    var firstName = form.find('input[name="customer[first_name]"]').val();
    var lastName = form.find('input[name="customer[last_name]"]').val();
    var VAT = form.find('input[name="customer[customer_hub][vat]"]').val();
    var email = form.find('input[name="customer[email]"]').val();
    var password =  form.find('input[name="customer[password]"]').val();
    var retypePassword =  form.find('input[name="customer[note][confirm-password]').val();
    form.find('input[name="customer[email]"]').closest('.form-control').removeClass('error');
    form.find('input[name="customer[email]"]').siblings('.form-control-error-status').html('');
    form.find('input[name="customer[password]"]').closest('.form-control').removeClass('error');
    form.find('input[name="customer[password]"]').siblings('.form-control-error-status').html('');
    form.find('input[name="customer[note][confirm-password]"]').closest('.form-control').removeClass('error');
    form.find('input[name="customer[note][confirm-password]"]').siblings('.form-control-error-status').html('');
    if ( email != '' ) {
      if ( email.indexOf('@') === -1 ) {
        form.find('input[name="customer[email]"]').closest('.form-control').addClass('error');
        form.find('input[name="customer[email]"]').siblings('.form-control-error-status').html('Please check your email.');
      } else {
      }
    } else {
      form.find('input[name="customer[email]"]').closest('.form-control').addClass('error');
      form.find('input[name="customer[email]"]').siblings('.form-control-error-status').html('Please check your email.');
    }
    if ( password == '' ) {
      form.find('input[name="customer[password]"]').closest('.form-control').addClass('error');
      form.find('input[name="customer[password]"]').siblings('.form-control-error-status').html('Please check your password.');
    }
    if ( password.length < 5 ) {
      form.find('input[name="customer[password]"]').closest('.form-control').addClass('error');
      form.find('input[name="customer[password]"]').siblings('.form-control-error-status').html('Password needs at least 5 characters.');
    }
    if ( retypePassword == '' ) {
      form.find('input[name="customer[note][confirm-password]"]').closest('.form-control').addClass('error');
      form.find('input[name="customer[note][confirm-password]"]').siblings('.form-control-error-status').html('Please check your confirm password.');
    }
    if ( password != retypePassword && retypePassword != '' ) {
      form.find('input[name="customer[note][confirm-password]').closest('.form-control').addClass('error');
      form.find('input[name="customer[note][confirm-password]').siblings('.form-control-error-status').html('Password & Confirm Password do not match.');
    }
    
    if ( email != '' && password != '' && password == retypePassword && password.length > 4 ) {
      register(email, password, firstName, lastName);
      //form.submit();
    }
  });

  $('.form-control input').on('change focus', function(event) {
    $(this).closest('.form-control').removeClass('error');
    $(this).siblings('.form-control-error-status').html('');
  });
});



