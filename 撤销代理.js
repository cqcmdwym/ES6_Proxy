var revocable = Proxy.revocable({}, {
    get(target, name) {
        return "[[" + name + "]]";
    }
});
var proxy = revocable.proxy;
console.log(proxy.foo); // "[[foo]]"

revocable.revoke(); // 执行撤销方法

proxy.foo; // TypeError
proxy.foo = 1 // 同样 TypeError
delete proxy.foo; // 还是 TypeError
typeof proxy // "object"，因为 typeof 不属于可代理操作