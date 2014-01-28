$ ->
  jQuery("a[href^=\"http://\"]").filter ->
    @hostname and @hostname isnt location.hostname
  .each ->
    link = jQuery(this)
    
    #assuming it's in the root directory
    faviconURL = link.attr("href").replace(/^(http:\/\/[^\/]+).*$/, "$1") + "/favicon.ico"
    faviconIMG = jQuery("<img src=\"favicon.png\" alt=\"\" />")["prependTo"](link)
    extImg = new Image()
    extImg.src = faviconURL
    if extImg.complete
      faviconIMG.attr "src", faviconURL
    else
      extImg.onload = ->
        faviconIMG.attr "src", faviconURL