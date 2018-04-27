var Api = {
  apikey: "WCbj3CTkt4FIUtcdzFkp4vA3ENugMOHl",
  getRamdonGif: function(format, tag) {
    format = format || "url";

    var possible =
      "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*-_[]|/;:~,.<>{}";
    tag = tag || possible.charAt(Math.floor(Math.random() * possible.length));

    console.log("tag", tag);

    var requestUrl =
      "https://api.giphy.com/v1/stickers/random?rating=g&tag=" +
      tag +
      "&api_key=" +
      this.apikey;

    console.log("requestUrl", requestUrl);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var json = JSON.parse(this.responseText);
        var images = json.data.images;
        var image = {
          width: 0
        };
        for (var i in images) {
          if (
            images[i][format] &&
            images[i].width &&
            images[i].width > image.width
          ) {
            image = images[i];
          }
        }

        if (image) {
          var imageUrl = image[format] || image.url;
          console.log("gif", imageUrl);
          document.body.style.backgroundImage = "url(" + imageUrl + ")";
        }
      }
    };

    xhttp.open("GET", requestUrl, true);
    xhttp.send();
  }
};

function init(interval, format, tag) {
  window.setTimeout(function() {
    Api.getRamdonGif(format, tag);
    init(20 * 60 * 1000);
  }, interval);
}
