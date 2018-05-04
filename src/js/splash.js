(function() {
    var API_KEY = 'WCbj3CTkt4FIUtcdzFkp4vA3ENugMOHl';
    var images = {};

    window.Giphy = {};
    window.Splash = {};

    /**
     * Gets the largest image based on a format and a tag
     * @param {String} format Could be 'gif' or 'webp'
     * @param {String} tag check Giphy API for more information
     * @returns {Promise<Object>} image
     */
    Giphy.getLargestImageUrlByWidth = function(format, tag) {
        format = format || 'url';
        tag = tag || '';

        format = format.toLowerCase();

        if (format === 'gif') {
            format = 'url';
        }

        return Giphy.getImagesByTag(tag)
            .then(function(images) {
                var image = null;
                for (var img in images) {
                    if (image === null) {
                        image = images[img];
                    }
                    image.width = image.width || 0;
                    if (images[img][format] && images[img].width && images[img].width > image.width) {
                        image = images[img];
                    }
                }

                if (image) {
                    if (image[format]) {
                        return image[format];
                    } else {
                        return image['url'];
                    }
                }

                return null;
            })
            .catch(function() {
                return null;
            });
    };

    /**
     * Gets a ramdomily generated tag alphanumeric character
     * @returns {String} tag
     */
    Giphy.generateRandomTag = function() {
        var possible = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*-_[]|/;:~,.<>{}';
        var tag = possible.charAt(Math.floor(Math.random() * possible.length));
        return tag;
    };

    /**
     * Gets images by a specific Tag
     * @param {String} tag check Giphy API for more information
     * @returns {Promise<Object>} images
     */
    Giphy.getImagesByTag = function(tag) {
        tag = tag || '';

        return new Promise(function(resolve, reject) {
            if (images[tag]) {
                resolve(images[tag]);
                return;
            }

            var requestUrl =
                'https://api.giphy.com/v1/stickers/random?rating=g&tag=' + tag + '&api_key=' + API_KEY;

            console.log('requestUrl', requestUrl);

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        var json = JSON.parse(this.responseText);
                        images[tag] = json.data.images;
                        resolve(images[tag]);
                    } else {
                        reject();
                    }
                }
            };

            xhttp.open('GET', requestUrl, true);
            xhttp.send();
        });
    };

    /**
     * Changes the image background
     * @param {tring} format override format with 'webp' or 'gif' or 'mp4' (mp4 not yet supported)
     * @returns {Promise<String>} image url
     */
    Splash.getRandomImageUrl = function(format) {
        var fmt = '';

        if (
            window.chrome !== null &&
            window.chrome !== undefined &&
            window.navigator.vendor === 'Google Inc.'
        ) {
            fmt = 'webp';
        } else {
            fmt = 'gif';
        }

        if (format) {
            fmt = format;
        }

        var tag = Giphy.generateRandomTag();

        return Giphy.getLargestImageUrlByWidth(fmt, tag).then(function(imageUrl) {
            return imageUrl;
        });
    };
})();
