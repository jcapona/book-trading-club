/**
  Displays books on query or on /all
*/

$("#form-search").on("submit", function(e) {
  e.preventDefault();
  search($("#form-search").serialize());
});

/**
  Performs AJAX get query to search in book db
*/
function search(query) {
  $.ajax({
    type: "GET",
    url: '/book/search',
    data: query,
    error: function(jqXHR, textStatus, errorMessage) {
      console.log(jqXHR);
    },
    success: function(data) {
      $("#feats").addClass("hidden");
      //console.log(data);
      displayResults(data);
    }
  });
}

/**
  Displays results of query
*/
function displayResults(data) {
  var html = "";
  html += "<div class='row'>";
  for (var i = 0; i < data.length; i++) {
    html += "<div class='col-xs-4 col-md-2'>";
    html += "<a href="+"/book/info?bid="+data[i.toString()]['id']+" class='text-center' target='_blank'>";
    html += "<img src="+data[i.toString()]['img']+" class='thumbnail center-block' style='max-height: 200px;'>";
    html += "</a>";
    html += "<h4 class='text-center'>"+data[i.toString()]['title'].slice(0,15);
    html += data[i.toString()]['title'].length > 15? "...":"";
    html += "</h4>";
    html += "<p class='text-center'>"+data[i.toString()]['author']+"</p>";

    if (Object.keys(usr).length > 0) {
      if(usr.id != data[i.toString()]['owner']['id']) {
        html += "<form class='form-interaction' role='form'>";
        html += "<input type='text' class='hidden' name='b_id' value='"+data[i.toString()]['id']+"'>";
        html += "<input type='text' class='hidden' name='u_id_rx' value='"+data[i.toString()]['owner']['id']+"'>";
        html += "<button class='btn btn-info btn-sm center-block' type='submit'>Message</button>";
        html += "</form>";
      } else {
        html += "<button class='btn btn-info btn-sm center-block' disabled>Your book</button>";
      }
    } else {
      html += "<p>You must login to message the owner</p>";
      html += '<a href="#" type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-login">';
      html += '<p>Log In</p></a>';
    }

    html += "</div>";
  };

  html += "</div>";

  $("#results").html('');
  $("#results").append(html);
}
