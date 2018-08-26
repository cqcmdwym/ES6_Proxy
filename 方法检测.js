let obj = {
    pickyMethodOne: function(obj, str, num) { /* ... */ },
    pickyMethodTwo: function(num, obj) { /*... */ }
  };
  const argTypes = {
    pickyMethodOne: ["object", "string", "number"],
    pickyMethodTwo: ["number", "object"]
  };
  obj = new Proxy(obj, {
    get: function(target, key, proxy) {
      var value = target[key];
      return function(...args) {
          //console.log(args)
        var checkArgs = argChecker(key, args, argTypes[key]);
        return Reflect.apply(value, target, args);
      };
    }
  });
  
  function argChecker(name, args, checkers) {
    for (var idx = 0; idx < args.length; idx++) {
      var arg = args[idx];
      var type = checkers[idx];
      if (!arg || typeof arg !== type) {
        console.warn(`You are incorrectly implementing the signature of ${name}. Check param ${idx + 1}`);
      }
    }
  }
  obj.pickyMethodOne();
  obj.pickyMethodTwo("wopdopadoo", {});
  