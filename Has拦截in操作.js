var api = {
    _apiKey: '123abc456def',
    getUsers: function () {},
    getUser: function (userId) {},
    setUser: function (userId, config) {}
};
const RESTRICTED = ['_apiKey'];
api = new Proxy(api, {
    has(target, key) {
        return (RESTRICTED.indexOf(key) > -1) ? false : Reflect.has(target, key);
    }
});
// these log false, and `for in` iterators will ignore _apiKey 
console.log("_apiKey" in api);
for (var key in api) {
    if (api.hasOwnProperty(key) && key === "_apiKey") {
        console.log("This will never be logged because the proxy obscures _apiKey...")
    }
}