(function() {
  $(function() {
    var bgimg, clock, data, newBrick, repaint, showSettings;
    if (!localStorage.getItem("bg")) {
      localStorage.setItem("bg", 'url(../images/bg.jpg)');
    }
    bgimg = localStorage.getItem("bg");
    $("body").css({
      'background': bgimg,
      'background-size': 'cover',
      'background-attachment': 'fixed',
      'background-position': 'center top'
    });
    repaint = $("li, h1, h2, p");
    $(window).resize(function() {
      return repaint.css("z-index", 1);
    });
    if (!localStorage.getItem("sites")) {
      $.getJSON("sites.json", function(data) {
        console.log(data);
        localStorage.setItem('sites', JSON.stringify(data));
        $.each(data, function(k, v) {
          var favicon;
          favicon = v.replace(/^(http:\/\/[^\/]+).*$/, "$1") + "/favicon.ico";
          return $(".content .cards").append("<a href='" + v + "'><li><img src='" + favicon + "'><div class='title'> " + k + "</div></li></a>");
        });
        return $(".content .cards").append($("#new-button"));
      });
    }
    if (localStorage.getItem("sites")) {
      data = JSON.parse(localStorage.getItem("sites"));
      console.log(data);
      $.each(data, function(k, v) {
        var favicon;
        favicon = v.replace(/^(http:\/\/[^\/]+).*$/, "$1") + "/favicon.ico";
        return $(".content .cards").append("<li><a href='" + v + "'><img src='" + favicon + "'><div class='title'> " + k + "</div></a></li>");
      });
      $(".content .cards").append($("#new-button"));
    }
    clock = function() {
      var date, hour, minute;
      date = new Date;
      hour = date.getHours();
      minute = date.getMinutes();
      if (hour >= 12) {
        hour = hour - 12;
      }
      if (hour === 0) {
        hour = 12;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      return "" + hour + ":" + minute;
    };
    $(".clock").text(clock());
    setInterval(function() {
      return $(".clock").text(clock());
    }, 5000);
    $(".settings-button").click(function() {
      return showSettings();
    });
    $("body .close-div").click(function() {
      return $(this).parent().fadeOut();
    });
    $(".new-brick").click(function() {
      return showSettings("new");
    });
    $("body").on("click", "#new-save", function() {
      console.log($("#new-title").val());
      console.log($("#new-url").val());
      return newBrick($("#new-title").val(), $("#new-url").val());
    });
    showSettings = function(type) {
      if (!type) {
        return $(".settings").fadeToggle().find('.content').html($("#settings").html());
      }
      if (type === "new") {
        return $(".settings").fadeToggle().find('.content').html($("#new-brick").html());
      }
    };
    return newBrick = function(title, url) {
      if (!localStorage.getItem("sites")) {
        $.getJSON("sites.json", function(data) {
          console.log(data);
          return localStorage.setItem('sites', data);
        });
      }
      if (localStorage.getItem("sites")) {
        data = JSON.parse(localStorage.getItem("sites"));
        data["" + title] = url;
        console.log(data);
        return localStorage.setItem("sites", JSON.stringify(data));
      }
    };
  });

}).call(this);
