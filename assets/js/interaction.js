/**
	Sets form values on #modal-inter when user clicks on book, and displays the modal
*/
$(document.body).on('submit', '.form-interaction', function(e){
	e.preventDefault();
	var obj = $(this).serializeArray();

	var html = "";
	html += "<input type='text' name='"+obj[0].name+"' class='hidden' value='"+ obj[0].value +"'>";
	html += "<input type='text' name='"+obj[1].name+"' class='hidden' value='"+ obj[1].value +"'>";
	$("#form-inter-span").html('');
	$("#form-inter-span").append(html);
	$('#modal-inter').modal('show');
});

/**
	Manages form on #modal-inter, sends msg to owner of book of interest
*/
$(document.body).on('submit', '#form-inter', function(e) {
	e.preventDefault();
	console.log($("#form-inter").serialize());
	$.ajax({
		type: "POST",
		url: '/interact',
		data: $("#form-inter").serialize(),
		error: function(jqXHR, textStatus, errorMessage) {
			var message = JSON.parse(jqXHR['responseText'])['err'];
			var str = '<div class="alert alert-warning alert-dismissible" role="alert">';
			str += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
			str += '<strong>' + message + '</strong>';
			str += '</div>';
			$('#form-inter-msg').html(str);
		},
		success: function(data) {
			window.location.href = "/msg/";
		}
	});

});
