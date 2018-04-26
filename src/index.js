const Api = {
  apikey: 'WCbj3CTkt4FIUtcdzFkp4vA3ENugMOHl',
  getSize(tag) {
    // const sizes = {
    //   '5': 'cover'
    // };
    // return sizes[tag] || 'contain';
    return null;
  },
  getRamdonGif(format, tag) {
    const possible = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*-_[]|/;:~,.<>{}";
    tag = tag || possible.charAt(Math.floor(Math.random() * possible.length));
  
    console.log('tag', tag);
    
    const requestUrl = `https://api.giphy.com/v1/stickers/random?rating=g&tag=${tag}&api_key=${this.apikey}`;
  
    console.log('requestUrl', requestUrl);

    return window.fetch(requestUrl).then(function (resp) {
      return resp.json().then(function (json) {
        // console.log('images', json.data.images);
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
          const url = image[format] || image.url;
          console.log('gif', url);
          const size = Api.getSize(tag);

          return {
            url,
            size
          };
        }
  
        return null;
      });
    });
  }

};

function init(interval, format, tag) {
  window.setTimeout(function () {
    Api.getRamdonGif(format, tag).then(function (resp) {
      if (resp) {
        document.body.style.backgroundImage = `url(${resp.url})`;
        if (resp.size) {
          document.body.style.backgroundSize = resp.size;
        }  
        init(20 * 60 * 1000, 'webp');
      }
      else {
        init(1, 'gif');
      }
    });

  }, interval);
}

init(1, 'webp');
