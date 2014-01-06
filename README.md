ministruct
==========

[![build status](https://secure.travis-ci.org/antonkovalyov/ministruct.png)](http://travis-ci.org/antonkovalyov/ministruct)

Small library to define strictly typed objects. Example:

```javascript
var { struct, make, type } = require("ministruct");

var person = struct({
  name:  type.string,
  age:   type.number | type.nil,
  nicks: type.array
});

var bob = make(person);
bob.name = "Bob";
bob.age = 26;
bob.nicks = [ "bob1986", "sexybob" ];

console.log(bob.name); // Bob

bob.age = null;   // OK
bob.nicks = null; // TypeError
```

**Supported types**: nil, array, object, number, string, func, regexp.
