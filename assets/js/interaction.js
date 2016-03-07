/**
  Sets form values on #modal-inter when user clicks on book, and displays the modal
*/
$(document.body).on('submit', '.form-interaction' ,function(e){
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
$(document.body).on('submit', '#form-inter' ,function(e){
	e.preventDefault();
  console.log($("#form-inter").serialize());
  $.ajax({
    type: "POST",
    url: '/interact',
    data: $("#form-inter").serialize(),
    error: function(jqXHR, textStatus, errorMessage) {
      console.log(jqXHR);
    },
    success: function(data)
    {
      console.log(data);
      //location.reload();
    }
  });

});