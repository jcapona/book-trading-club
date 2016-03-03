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