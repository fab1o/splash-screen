window.resizeTo(1080, 720);

const apikey = '';

function setRandomGif() {
  // this random char selector is to fix a bug in giphy
  // https://github.com/Giphy/GiphyAPI/issues/171
  const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  const q = possible.charAt(Math.floor(Math.random() * possible.length));

  var url = `https://api.giphy.com/v1/stickers/random?rating=g&q=${q}&api_key=${apikey}`;

  window.fetch(url).then(function (resp) {
    resp.json().then(function (json) {
      const gif = json.data.images.fixed_height.webp;

      document.body.style.backgroundImage = `url(${gif})`;
    });
  });
}

window.setInterval(setRandomGif, 30 * 60 * 1000);

setRandomGif();