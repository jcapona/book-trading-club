/**
  Displays books on query or on /all 
*/

$("#form-search").on("submit",function(e){

  e.preventDefault();
  search($("#form-search").serialize());
});

/** 
  Performs AJAX get query to search in book db
*/
function search(query)
{
  $.ajax({
    type: "GET",
    url: '/book/search',
    data: query,
    error: function(jqXHR, textStatus, errorMessage) {
      console.log(jqXHR);
    },
    success: function(data)
    {
      $("#feats").addClass("hidden");
      console.log(data);
      displayResults(data);
    }
  });
}

/**
  Displays results of query
*/
function displayResults(data)
{
  var html = "";
    html += "<div class='row'>";
    for(var i=0; i < data.length; i++)
      {
      html += "<div class='col-xs-4 col-md-2'>";
      html += "<a href="+data[i.toString()]['link']+" class='text-center' target='_blank'>";
      html += "<img src="+data[i.toString()]['img']+" class='thumbnail center-block' style='max-height: 200px;'>";
      html += "</a>";
      html += "<h4 class='text-center'>"+data[i.toString()]['title'].slice(0,15);
      html += data[i.toString()]['title'].length > 15? "...":"";
      html += "</h4>";
      html += "<p class='text-center'>"+data[i.toString()]['author']+"</p>";
      html += "</div>";
    };

    html += "</div>";

    $("#results").html('');
    $("#results").append(html);
}