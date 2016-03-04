/**
  Manages actions to login or register a user
*/

$("#form-login").on("submit",function(e){
	e.preventDefault();

  $.ajax({
    type: "POST",
    url: '/login',
    data: $("#form-login").serialize(),
    error: function(jqXHR, textStatus, errorMessage) {
      console.log(errorMessage);
    },
    success: function(data)
    {
      console.log(data);
      location.reload();
    }
  });
});

$("#form-register").on("submit",function(e){
  e.preventDefault();

  $.ajax({
    type: "POST",
    url: '/user',
    data: $("#form-register").serialize(),
    error: function(jqXHR, textStatus, errorMessage) {
      console.log(errorMessage);
    },
    success: function(data)
    {
      console.log(data);
      location.reload();
    }
  });
});

$("#register-btn").on("click",function(){
  $("#register-btn").addClass("active");
  $("#login-btn").removeClass("active");
  $("#login-form").addClass("hidden");
  $("#reg-form").removeClass("hidden");
  $("#reg-form").addClass("show");
});

$("#login-btn").on("click",function(){
  $("#login-btn").addClass("active");
  $("#register-btn").removeClass("active");
  $("#reg-form").addClass("hidden");
  $("#login-form").removeClass("hidden");
  $("#login-form").addClass("show");
});