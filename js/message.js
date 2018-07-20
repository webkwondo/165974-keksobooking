'use strict';

(function () {

  var MessageBlock = {
    WIDTH: 100,
    HEIGHT: 150,
    ERROR_BACKGROUND: '#f56949',
    SUCCESS_BACKGROUND: '#8bb91c',
    FONT_SIZE: 23,
    COLOR: '#ffffff',
    FONT_VARIANT: 'small-caps',
    TEXT_ALIGN: 'center',
    PADDING_TOP: 60,
    Z_INDEX: 100,
    TIMEOUT: 2800
  };

  var displayError = function (errorMessage, position, positionTop, parentHtmlElement) {
    var errorHtmlElement = document.createElement('div');
    errorHtmlElement.style.position = position;
    errorHtmlElement.style.top = positionTop;
    errorHtmlElement.style.width = MessageBlock.WIDTH + '%';
    errorHtmlElement.style.height = MessageBlock.HEIGHT + 'px';
    errorHtmlElement.style.backgroundColor = MessageBlock.ERROR_BACKGROUND;
    errorHtmlElement.style.fontSize = MessageBlock.FONT_SIZE + 'px';
    errorHtmlElement.style.color = MessageBlock.COLOR;
    errorHtmlElement.style.fontVariant = MessageBlock.FONT_VARIANT;
    errorHtmlElement.style.textAlign = MessageBlock.TEXT_ALIGN;
    errorHtmlElement.style.paddingTop = MessageBlock.PADDING_TOP + 'px';
    errorHtmlElement.style.zIndex = MessageBlock.Z_INDEX;
    errorHtmlElement.textContent = errorMessage;

    parentHtmlElement.appendChild(errorHtmlElement);

    setTimeout(function () {
      if (errorHtmlElement.parentNode) {
        errorHtmlElement.parentNode.removeChild(errorHtmlElement);
      }
    }, MessageBlock.TIMEOUT);
  };

  var displaySuccess = function (successMessage, position, positionTop, parentHtmlElement) {
    var successHtmlElement = document.createElement('div');
    successHtmlElement.style.position = position;
    successHtmlElement.style.top = positionTop;
    successHtmlElement.style.width = MessageBlock.WIDTH + '%';
    successHtmlElement.style.height = MessageBlock.HEIGHT + 'px';
    successHtmlElement.style.backgroundColor = MessageBlock.SUCCESS_BACKGROUND;
    successHtmlElement.style.fontSize = MessageBlock.FONT_SIZE + 'px';
    successHtmlElement.style.color = MessageBlock.COLOR;
    successHtmlElement.style.fontVariant = MessageBlock.FONT_VARIANT;
    successHtmlElement.style.textAlign = MessageBlock.TEXT_ALIGN;
    successHtmlElement.style.paddingTop = MessageBlock.PADDING_TOP + 'px';
    successHtmlElement.style.zIndex = MessageBlock.Z_INDEX;
    successHtmlElement.textContent = successMessage;

    parentHtmlElement.appendChild(successHtmlElement);

    setTimeout(function () {
      if (successHtmlElement.parentNode) {
        successHtmlElement.parentNode.removeChild(successHtmlElement);
      }
    }, MessageBlock.TIMEOUT);
  };

  window.message = {
    displayError: displayError,
    displaySuccess: displaySuccess
  };

})();
