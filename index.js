const apikey = '';

function setRandomGif() {
  // this random char selector is to fix a bug in giphy
  // https://github.com/Giphy/GiphyAPI/issues/171
  const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  const q = possible.charAt(Math.floor(Math.random() * possible.length));

  const url = `https://api.giphy.com/v1/stickers/random?rating=g&tag=${q}&api_key=${apikey}`;

  console.log('url ' + url);

  return window.fetch(url).then(function (resp) {
    return resp.json().then(function (json) {
      const images = json.data.images;
      let image = {
        width: 0
      };
      for (let i in images) {
        if (images[i].webp && images[i].width &&
          images[i].width > image.width
        ) {
          image = images[i];
        }
      }

      if (image) {
        console.log('image', image);
        const webp = image.webp || image.url;
        document.body.style.backgroundImage = `url(${webp})`;
        return true;
      }

      return false;
    });
  });
}

function init(interval) {
  window.setTimeout(function () {
    setRandomGif().then(function (resp) {
      if (resp) {
        init(20 * 60 * 1000);
      } else {
        init(1);
      }
    });

  }, interval);
}

init(1);