
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
      console.log(errorMessage);
    },
    success: function(data)
    {
      console.log(data);
      location.reload();
    }
  });
});

/**
  Tries to add a book using ISBN code
*/
$("#form-isbn").on('submit', function(e){
  e.preventDefault();
  console.log($("#form-isbn").serialize());
  $('#form-isbn').find('input, textarea, button').attr('disabled','disabled');
  $("#form-isbn-btn").html('Searching  <i class="fa fa-spinner fa-pulse"></i>');
  console.log($("#form-isbn").find('input').val());
  $.ajax({
    type: "POST",
    url: '/isbn',
    data: {isbn: $("#form-isbn").find('input').val()},
    error: function(jqXHR, textStatus, errorMessage) {
      console.log(jqXHR);
      $('#form-isbn').find('input, textarea, button').removeAttr('disabled','disabled');
      $("#form-isbn-btn").html('Search');
      
      var str = '<div class="alert alert-warning alert-dismissible" role="alert">';
      str += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
      str += '<strong>Couldnt find the book :(</strong>';
      str += ' Please, insert the book manually';
      str += '</div>';
      $("#form-isbn-error").html(str);

    },
    success: function(data)
    {
      console.log(data);
      location.reload();
    }
  });

})