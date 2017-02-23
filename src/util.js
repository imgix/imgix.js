module.exports = {
  compact: function(arr) {
    var compactedArr = [];

    for (var i = 0; i < arr.length; i++) {
      arr[i] && compactedArr.push(arr[i]);
    }

    return compactedArr;
  },
  shallowClone: function(obj) {
    var clone = {};

    for (var key in obj) {
      clone[key] = obj[key];
    }

    return clone;
  },
  extend: function(dest, source) {
    for (var key in source) {
      dest[key] = source[key];
    }

    return dest;
  },
  uniq: function(arr) {
    var n = {},
        r = [],
        i;

    for (i = 0; i < arr.length; i++) {
      if (!n[arr[i]]) {
        n[arr[i]] = true;
        r.push(arr[i]);
      }
    }

    return r;
  },
  objectEach: function(obj, iterator) {
    for (var key in obj) {
      if(obj.hasOwnProperty(key)) {
        iterator(obj[key], key);
      }
    }
  },
  encode64: function(str) {
    var encodedUtf8Str = unescape(encodeURIComponent(str)),
        b64Str = btoa(encodedUtf8Str),
        urlSafeB64Str = b64Str.replace(/\+/g, '-');

    urlSafeB64Str = urlSafeB64Str.replace(/\//g, '_')
      .replace(/\//g, '_').replace(/\=+$/, '');

    return urlSafeB64Str;
  },
  decode64: function(urlSafeB64Str) {
    var b64Str = urlSafeB64Str.replace(/-/g, '+').replace(/_/g, '/'),
        encodedUtf8Str = atob(b64Str),
        str = decodeURIComponent(escape(encodedUtf8Str));

    return str;
  },
  domReady: function(cb) {
    if (document.readyState === 'complete') {
      setTimeout(cb, 0);
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', cb, false);
    } else {
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState === 'complete') {
          cb();
        }
      });
    }
  }
}
