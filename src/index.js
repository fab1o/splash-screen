const Api = {
  apikey: 'WCbj3CTkt4FIUtcdzFkp4vA3ENugMOHl',
  getRamdonGif(format) {
    const possible = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*-_[]|/;:~,.<>{}";
    const q = possible.charAt(Math.floor(Math.random() * possible.length));
  
    console.log('q ' + q);
    
    const requestUrl = `https://api.giphy.com/v1/stickers/random?rating=g&tag=${q}&api_key=${this.apikey}`;
  
    console.log('requestUrl ' + requestUrl);

    return window.fetch(requestUrl).then(function (resp) {
      return resp.json().then(function (json) {
        console.log('images', json.data.images);
        const images = json.data.images;
        let image = {
          width: 0
        };
        for (let i in images) {
          if (images[i][format] && images[i].width &&
            images[i].width > image.width
          ) {
            image = images[i];
          }
        }
  
        if (image) {
          console.log('image', image);
          const url = image[format] || image.url;
          return url;
        }
  
        return null;
      });
    });
  }

};

function init(interval, format) {
  window.setTimeout(function () {
    Api.getRamdonGif(format).then(function (url) {
      if (url) {
        document.body.style.backgroundImage = `url(${url})`;
        init(20 * 60 * 1000, 'webp');
      }
      else {
        init(1, 'gif');
      }
    });

  }, interval);
}

init(1, 'webp');
