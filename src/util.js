module.exports = {
  compact: function(arr) {
    var compactedArr = [];

    for (var i = 0; i < arr.length; i++) {
      arr[i] && compactedArr.push(arr[i]);
    }

    return compactedArr;
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
  encode64: function(str) {
    var encodedUtf8Str = unescape(encodeURIComponent(str)),
        b64Str = btoa(encodedUtf8Str);
        urlSafeB64Str = b64Str.replace(/\+/g, '-');

    urlSafeB64Str = urlSafeB64Str.replace(/\//g, '_');
    urlSafeB64Str = urlSafeB64Str.replace(/\//g, '_');
    urlSafeB64Str = urlSafeB64Str.replace(/\=+$/, '');

    return urlSafeB64Str;
  },
  decode64: function(urlSafeB64Str) {
    var b64Str = urlSafeB64Str.replace(/-/g, '+').replace(/_/g, '/'),
        encodedUtf8Str = atob(b64Str),
        str = decodeURIComponent(escape(encodedUtf8Str));

    return str;
  }
}
