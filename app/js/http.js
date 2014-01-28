(function() {
  $(function() {
    return jQuery("a[href^=\"http://\"]").filter(function() {
      return this.hostname && this.hostname !== location.hostname;
    }).each(function() {
      var extImg, faviconIMG, faviconURL, link;
      link = jQuery(this);
      faviconURL = link.attr("href").replace(/^(http:\/\/[^\/]+).*$/, "$1") + "/favicon.ico";
      faviconIMG = jQuery("<img src=\"favicon.png\" alt=\"\" />")["prependTo"](link);
      extImg = new Image();
      extImg.src = faviconURL;
      if (extImg.complete) {
        return faviconIMG.attr("src", faviconURL);
      } else {
        return extImg.onload = function() {
          return faviconIMG.attr("src", faviconURL);
        };
      }
    });
  });

}).call(this);
