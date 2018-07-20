'use strict';

(function () {

  var TIMEOUT = 2800;

  var displayError = function (errorMessage, errorClass, parentHtmlElement) {
    var errorHtmlElement = document.createElement('div');
    errorHtmlElement.classList.add(errorClass);
    errorHtmlElement.textContent = errorMessage;

    parentHtmlElement.appendChild(errorHtmlElement);

    setTimeout(function () {
      if (errorHtmlElement.parentNode) {
        errorHtmlElement.parentNode.removeChild(errorHtmlElement);
      }
    }, TIMEOUT);
  };

  var displaySuccess = function (successMessage, successClass, parentHtmlElement) {
    var successHtmlElement = document.createElement('div');
    successHtmlElement.classList.add(successClass);
    successHtmlElement.textContent = successMessage;

    parentHtmlElement.appendChild(successHtmlElement);

    setTimeout(function () {
      if (successHtmlElement.parentNode) {
        successHtmlElement.parentNode.removeChild(successHtmlElement);
      }
    }, TIMEOUT);
  };

  window.message = {
    displayError: displayError,
    displaySuccess: displaySuccess
  };

})();
