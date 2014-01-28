$ ->

  bgimg = 'url(../images/bg.jpg)'
  $("body").css
    'background': bgimg
    'background-size': 'cover'
    'background-attachment': 'fixed'
    'background-position': 'center top'


  $(".search").googleSuggest
    secure: true

  repaint = $ "li, h1, h2, p"
  $(window).resize ->
    repaint.css "z-index", 1

  $.getJSON "sites.json", (data) ->
    console.log data
    sites = []

    $.each data, (k, v) ->
      sites.push "name - #{k} url = #{v}"
      favicon = v.replace(/^(http:\/\/[^\/]+).*$/, "$1") + "/favicon.ico"
      $(".content .cards").prepend "<a href='#{v}'><li><img src='#{favicon}'><div class='title'> #{k}</div></li>"
    #console.log sites
  .fail (e) ->
    console.log "error #{JSON.stringify(e)}"
  