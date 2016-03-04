/**
  Displays books on query or on /all 
*/

$("#form-search").on("submit",function(e){

  e.preventDefault();
  $.ajax({
    type: "GET",
    url: '/book/search',
    data: $("#form-search").serialize(),
    error: function(jqXHR, textStatus, errorMessage) {
      console.log(jqXHR);
    },
    success: function(data)
    {
      $("#feats").addClass("hidden");
      console.log(data.books);
      displayResults(data.books);
    }
  });
});

function displayResults(books)
{
  var html = "";  
  Object.keys(books).forEach(function(key){
    var data = books[key];
    if(data.length > 0)
    {
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
    }
  })
  $("#results").html('');
  $("#results").append(html);
}




function all()
{
  $.ajax({
    type: "GET",
    url: '/book',
    data: {},
    error: function(jqXHR, textStatus, errorMessage) {
      console.log(errorMessage);
    },
    success: function(data)
    {
      $("#feats").addClass("hidden");
      console.log(data);
      displayAll(data);
    }
  });
}

function displayAll(data)
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