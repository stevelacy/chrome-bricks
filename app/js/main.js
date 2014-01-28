(function() {
  $(function() {
    var bgimg, repaint;
    bgimg = 'url(../images/bg.jpg)';
    $("body").css({
      'background': bgimg,
      'background-size': 'cover',
      'background-attachment': 'fixed',
      'background-position': 'center top'
    });
    $(".search").googleSuggest({
      secure: true
    });
    repaint = $("li, h1, h2, p");
    $(window).resize(function() {
      return repaint.css("z-index", 1);
    });
    return $.getJSON("sites.json", function(data) {
      var sites;
      console.log(data);
      sites = [];
      return $.each(data, function(k, v) {
        var favicon;
        sites.push("name - " + k + " url = " + v);
        favicon = v.replace(/^(http:\/\/[^\/]+).*$/, "$1") + "/favicon.ico";
        return $(".content .cards").prepend("<a href='" + v + "'><li><img src='" + favicon + "'><div class='title'> " + k + "</div></li>");
      });
    }).fail(function(e) {
      return console.log("error " + (JSON.stringify(e)));
    });
  });

}).call(this);
