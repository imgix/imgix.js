'use strict';

if (typeof window !== 'undefined') {
  /**
   * Cross-browser DOM ready helper
   * Dustin Diaz <dustindiaz.com> (MIT License)
   * https://github.com/ded/domready/tree/v0.3.0
   */

  /**
   * Runs a function when the DOM is ready (similar to jQuery.ready)
   * @memberof imgix
   * @static
   * @param {function} ready the function to run when the DOM is ready.
   */
  imgix.onready = (function () {
      var ready,
          listener,
          callbacks = [],
          ieHack = document.documentElement.doScroll,
          loadedRgx = ieHack ? /^loaded|^c/ : /^loaded|c/,
          loaded = loadedRgx.test(document.readyState);

      function flush() {
        var callback;

        loaded = true;
        while (callback = callbacks.shift()) {
          callback();
        }
      }

      if (document.addEventListener) {
        listener = function () {
          document.removeEventListener('DOMContentLoaded', listener, false);
          flush();
        }

        document.addEventListener('DOMContentLoaded', listener, false);
      } else if (document.attachEvent) {
        listener = function () {
          if (/^c/.test(document.readyState)) {
            document.detachEvent('onreadystatechange', listener);
            flush();
          }
        }

        document.attachEvent('onreadystatechange', listener);
      }

      if (!!ieHack) {
        ready = function (callback) {
          if (window.self != window.top) {
            // We're in an iframe here
            if (loaded) {
              callback();
            } else {
              callbacks.push(callback);
            }
          } else {
            // In a top-level window
            (function () {
              try {
                document.documentElement.doScroll('left');
              } catch (e) {
                return setTimeout(function () {
                  ready(callback);
                }, 50);
              }
              callback();
            })();
          }
        };

      } else {
        ready = function (callback) {
          if (loaded) {
            callback();
          } else {
            callbacks.push(callback);
          }
        };
      }

      return ready;
    })();
}
