/**
  Manages actions to login or register a user
*/

$("#form-login").on("submit",function(e){
    e.preventDefault();

    $.ajax({
        type: "POST",
        url: '/login',
        data: $("#form-login").serialize(),
        success: function(data) {
			window.location.href = "/dashboard/";
        },
		error: function(jqXHR, textStatus, errorMessage) {
            var message = JSON.parse(jqXHR['responseText'])['err'];
			var str = '<div class="alert alert-warning alert-dismissible" role="alert">';
			str += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
			str += '<strong>' + message + '</strong>';
			str += '</div>';
            $('#form-login-msg').html(str);
        }
    });
});

$("#form-register").on("submit",function(e){
    e.preventDefault();

    $.ajax({
        type: "POST",
        url: '/user',
        data: $("#form-register").serialize(),
        success: function(data) {
			window.location.href = "/dashboard/";
        },
		error: function(jqXHR, textStatus, errorMessage) {
            var message = JSON.parse(jqXHR['responseText'])['reason'];
			var str = '<div class="alert alert-warning alert-dismissible" role="alert">';
			str += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
			str += '<strong> Error :( </strong>';
            str += message;
			str += '</div>';
            $('#form-register-msg').html(str);
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
