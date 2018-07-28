'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var Avatar = {
    CLASS_NAME: 'ad-form-header__preview',
    ALT: 'Аватар пользователя',
    WIDTH: 40,
    HEIGHT: 44,
    IMAGE_LIMIT: 1
  };

  var Photos = {
    CLASS_NAME: 'ad-form__photo',
    ALT: 'Фотография жилья',
    WIDTH: 70,
    HEIGHT: 70,
    IMAGE_LIMIT: 16
  };

  var adForm = document.querySelector('.ad-form');
  var avatarFileInput = adForm.querySelector('.ad-form-header__input');
  var avatarPreviewInitial = adForm.querySelector('.ad-form-header__preview');
  var avatarPreviewInitialParent = avatarPreviewInitial.parentNode;
  var photosFileInput = adForm.querySelector('.ad-form__photo-container .ad-form__input');
  var photosPreviewInitial = adForm.querySelector('.ad-form__photo-container .ad-form__photo');
  var photosPreviewInitialParent = photosPreviewInitial.parentNode;

  var displayPreview = function (file, limit, previewParent, previewClassName, placeBefore, previewImgAlt, previewImgWidth, previewImgHeight) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var fileReader = new FileReader();

      fileReader.addEventListener('load', function (evt) {
        var previewElementNew = document.createElement('div');
        previewElementNew.classList.add(previewClassName);
        var img = document.createElement('img');
        img.src = evt.target.result;

        if (typeof previewImgAlt !== 'undefined') {
          img.alt = previewImgAlt;
        }
        if (typeof previewImgWidth !== 'undefined') {
          img.width = previewImgWidth;
        }
        if (typeof previewImgHeight !== 'undefined') {
          img.height = previewImgHeight;
        }

        previewElementNew.appendChild(img);

        if (placeBefore) {
          previewParent.insertBefore(previewElementNew, previewParent.firstChild);
        } else {
          previewParent.appendChild(previewElementNew);
        }

        var previews = previewParent.querySelectorAll('.' + previewClassName);

        if (previews.length > limit) {
          var excess = previews.length - limit;
          for (var p = 0; p < excess; p++) {
            if (placeBefore) {
              previewParent.removeChild(previews[previews.length - 1]);
            } else {
              previewParent.removeChild(previews[p]);
            }
          }
        }

      });

      fileReader.readAsDataURL(file);
    }
  };

  avatarFileInput.addEventListener('change', function (evt) {
    var limit = Avatar.IMAGE_LIMIT;

    for (var i = 0; i < evt.target.files.length && i < limit; i++) {
      var avatarPreviewParent = adForm.querySelector('.ad-form-header__upload');
      displayPreview(evt.target.files[i], limit, avatarPreviewParent, Avatar.CLASS_NAME, true, Avatar.ALT, Avatar.WIDTH, Avatar.HEIGHT);
    }

    if (typeof avatarPreviewInitial !== 'undefined' && avatarPreviewInitial.parentNode === avatarPreviewInitialParent) {
      avatarPreviewInitialParent.removeChild(avatarPreviewInitial);
    }
  });

  photosFileInput.addEventListener('change', function (evt) {
    var limit = Photos.IMAGE_LIMIT;

    for (var i = 0; i < evt.target.files.length && i < limit; i++) {
      var photosPreviewParent = adForm.querySelector('.ad-form__photo-container');
      displayPreview(evt.target.files[i], limit, photosPreviewParent, Photos.CLASS_NAME, false, Photos.ALT, Photos.WIDTH, Photos.HEIGHT);
    }

    if (typeof photosPreviewInitial !== 'undefined' && photosPreviewInitial.parentNode === photosPreviewInitialParent) {
      photosPreviewInitialParent.removeChild(photosPreviewInitial);
    }
  });

  var restoreDefaultPreviews = function () {
    avatarPreviewInitialParent.insertBefore(avatarPreviewInitial, avatarPreviewInitialParent.firstChild);
    photosPreviewInitialParent.appendChild(photosPreviewInitial);
  };

  var removeFiles = function (previewClassName) {
    var preview = adForm.querySelector('.' + previewClassName);
    var previewParent = preview.parentNode;
    var previews = previewParent.querySelectorAll('.' + previewClassName);
    for (var p = 0; p < previews.length; p++) {
      previewParent.removeChild(previews[p]);
    }
  };

  var removeAdFormFiles = function () {
    removeFiles(Avatar.CLASS_NAME);
    removeFiles(Photos.CLASS_NAME);
    restoreDefaultPreviews();
  };

  window.file = {
    removeAdFormFiles: removeAdFormFiles
  };

})();
