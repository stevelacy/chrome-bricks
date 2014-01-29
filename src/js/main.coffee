$ ->

  # Background image
  if !localStorage.getItem "bg"
    localStorage.setItem "bg", 'url(../images/bg.jpg)'

  bgimg = localStorage.getItem "bg"
    
  $("body").css
    'background': bgimg
    'background-size': 'cover'
    'background-attachment': 'fixed'
    'background-position': 'center top'

  # Google search bar
  #$(".search").googleSuggest
  #  secure: true

  # Hack to repaint css vw vh
  repaint = $ "li, h1, h2, p"
  $(window).resize ->
    repaint.css "z-index", 1




  # Get the site data from sites.json
  if !localStorage.getItem "sites"
    $.getJSON "sites.json", (data) ->
      console.log data
      localStorage.setItem 'sites', JSON.stringify data

      $.each data, (k, v) ->
        favicon = v.replace(/^(http:\/\/[^\/]+).*$/, "$1") + "/favicon.ico"
        $(".content .cards").append "<a href='#{v}'><li><img src='#{favicon}'><div class='title'> #{k}</div></li></a>"
      $(".content .cards").append $("#new-button")
  if localStorage.getItem "sites"
    data = JSON.parse localStorage.getItem "sites"
    console.log  data
    $.each data, (k, v) ->
      favicon = v.replace(/^(http:\/\/[^\/]+).*$/, "$1") + "/favicon.ico"
      $(".content .cards").append "<li><a href='#{v}'><img src='#{favicon}'><div class='title'> #{k}</div></a></li>"    
    $(".content .cards").append $("#new-button")


  # Clock
  clock = ->
    date = new Date
    hour = date.getHours()
    minute = date.getMinutes()
    if hour >= 12
      hour = hour-12
    if hour == 0
      hour = 12
    if minute < 10
      minute = "0#{minute}"
    return "#{hour}:#{minute}"

  # Set the time
  $(".clock").text clock()

  # Update the time
  setInterval ->
    $(".clock").text clock()
  , 5000


  # Click functions
  $(".settings-button").click ->
    showSettings()
  $("body .close-div").click ->
    $(this).parent().fadeOut()
  $(".new-brick").click ->
    showSettings "new"
  $("body").on "click", "#new-save", ->
    console.log $("#new-title").val()
    console.log $("#new-url").val()
    newBrick $("#new-title").val(), $("#new-url").val()


  # Functions
  showSettings = (type) ->
    return $(".settings").fadeToggle().find('.content').html $("#settings").html() unless type
    return $(".settings").fadeToggle().find('.content').html $("#new-brick").html() if type == "new"

  newBrick = (title, url) ->
    if !localStorage.getItem "sites"
      $.getJSON "sites.json", (data) ->
        console.log data
        localStorage.setItem 'sites', data

    if localStorage.getItem "sites"
      data = JSON.parse localStorage.getItem "sites"
      data["#{title}"] = url
      console.log data
      localStorage.setItem "sites", JSON.stringify data