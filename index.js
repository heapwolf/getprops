module.exports = function() {

  var addsDescriptor;
  var addsNames;
  var getPropertyDescriptor = 'getPropertyDescriptor';
  var getPropertyNames = 'getPropertyNames';

  if (!(getPropertyDescriptor in Object)) {

    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

    Object[getPropertyDescriptor] = function getPropertyDescriptor(o, name) {

      var proto = o, descriptor;
      while (proto && !(
        descriptor = getOwnPropertyDescriptor(proto, name))
      ) proto = proto.__proto__;
      return descriptor;
    };

    addsDescriptor = true;
  }

  if (!(getPropertyNames in Object)) {

    var getOwnPropertyNames = Object.getOwnPropertyNames;
    var ObjectProto = Object.prototype;
    var keys = Object.keys;

    Object[getPropertyNames] = function getPropertyNames(o) {

      var proto = o;
      var unique = {};
      var names;
      var i;

      while (proto != ObjectProto) {
        for (names = getOwnPropertyNames(proto), i = 0; i < names.length; i++) {
          unique[names[i]] = true;
        }
        proto = proto.__proto__;
      }
      return keys(unique);
    };

    addsNames = true;
  }

  return addsDescriptor && addsNames;
}

