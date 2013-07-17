var type = {
  nil:    1,
  array:  2,
  object: 4,
  number: 8,
  string: 16,
  func:   32,
  regexp: 64
};

function error(key, t) {
  return new TypeError("invalid value for property '" + key + "'");
}

function is(obj, name) {
  return Object.prototype.toString.call(obj) == '[object ' + name + ']';
}

function check(val, t) {
  if ((t & type.nil) && val === null)
    return true;

  if ((t & type.array) && Array.isArray(val))
    return true;

  if ((t & type.object) && (val === Object(val)))
    return true;

  if ((t & type.number) && is(val, "Number"))
    return true;

  if ((t & type.string) && is(val, "String"))
    return true;

  if ((t & type.func) && is(val, "Function"))
    return true;

  if ((t && type.regexp) && is(val, "RegExp"))
    return true;
  
  return false;
}

function struct(obj) {
  return obj;
}

function make(stc) {
  var inst = {};
  var vals = {};

  Object.keys(stc).forEach(function (key) {
    Object.defineProperty(inst, key, {
      get: function () {
        return vals[key];
      },

      set: function (val) {
        if (!check(val, stc[key])) throw error(key);
        return vals[key] = val;
      }
    });
  });

  Object.defineProperty(inst, "toJSON", {
    value: function () {
      return vals;
    }
  });

  return inst;
}

module.exports = {
  struct: struct,
  make:   make,
  type:   type
};