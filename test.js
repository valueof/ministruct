var ms = require("./index.js");

var struct = ms.struct;
var make   = ms.make;
var type   = ms.type;
var demo   = struct({
  nil: type.nil,
  arr: type.array,
  obj: type.object,
  num: type.number,
  str: type.string | type.nil,
  fun: type.func,
  reg: type.regexp
});

exports.test = function (test) {
  var inst = make(demo);

  inst.nil = null;
  inst.arr = [ 1, 2, 3];
  inst.obj = { name: "ministruct" };
  inst.num = 101;
  inst.str = "Hi.";
  inst.fun = function () { return "Hi." };
  inst.reg = /fun/g;

  test.ok(inst.nil === null);
  test.ok(inst.arr.length == 3 && inst.arr[2] == 3);
  test.ok(inst.obj.name == "ministruct");
  test.ok(inst.num == 101);
  test.ok(inst.str == "Hi.");
  test.ok(inst.fun() == "Hi.");
  test.ok(inst.reg.test("fun") === true);

  test.throws(function () { inst.nil = 1 }, TypeError);
  test.throws(function () { inst.arr = null }, TypeError);
  test.throws(function () { inst.obj = "" }, TypeError);
  test.throws(function () { inst.num = {} }, TypeError);
  test.throws(function () { inst.reg = 101 }, TypeError);
  test.doesNotThrow(function () { inst.str = null });

  test.equal(JSON.stringify(inst),
    '{"nil":null,"arr":[1,2,3],"obj":{"name":"ministruct"},"num":101,"str":null,"reg":{}}')

  test.done();
};