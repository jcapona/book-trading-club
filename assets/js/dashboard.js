/**
	Deletes a book from personal library
*/
$(".delete").on('click', function(e){
	e.preventDefault();
	$.ajax({
        type: "DELETE",
        url: '/book',
        data: {id: $(this).attr('value')},
        error: function(jqXHR, textStatus, errorMessage) {
        },
        success: function(data) {
            window.location.href = "/dashboard/";
        }
	});
});

/**
	Tries to add a book using ISBN code
*/
$("#form-isbn").on('submit', function(e) {
	e.preventDefault();
	$('#form-isbn').find('input, textarea, button').attr('disabled','disabled');
	$("#form-isbn-btn").html('Searching <i class="fa fa-spinner fa-pulse"></i>');
	$.ajax({
		type: "POST",
		url: '/isbn',
		data: {isbn: $("#form-isbn").find('input').val()},
		error: function(jqXHR, textStatus, errorMessage) {
			$('#form-isbn').find('input, textarea, button').removeAttr('disabled','disabled');
			$("#form-isbn-btn").html('Search');

			var str = '<div class="alert alert-warning alert-dismissible" role="alert">';
			str += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
			str += '<strong>Couldnt find the book :(</strong>';
			str += ' Please, insert the book manually';
			str += '</div>';
			$("#form-isbn-error").html(str);
		},
		success: function(data) {
			window.location.href = "/dashboard/";
		}
	});

});

$("#form-update").on("submit", function(e) {
	e.preventDefault();
	$.ajax({
		type: "PUT",
		url: '/user/',
		data: $("#form-update").serialize(),
		error: function(jqXHR, textStatus, errorMessage) {
		},
		success: function(data) {
			window.location.href = "/dashboard/";
		}
	});
});

$('#new-book-form').on("submit", function(e) {
	e.preventDefault();
	$.ajax({
		type: "POST",
		url: "/book/",
		data: $("#new-book-form").serialize(),
		success: function(data) {
			window.location.href = "/dashboard/";
		},
		error: function(jqXHR, textStatus, errorMessage) {
            var message = JSON.parse(jqXHR['responseText'])['err'];
			var str = '<div class="alert alert-warning alert-dismissible" role="alert">';
			str += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
			str += '<strong>Error :( </strong>';
			str += message;
			str += '</div>';
            $('#new-book-msg').html(str);
		},
	});
});
