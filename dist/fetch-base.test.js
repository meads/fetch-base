"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var Cat = /** @class */ (function () {
    function Cat() {
    }
    return Cat;
}());
var FetchBaseTestDouble = /** @class */ (function (_super) {
    __extends(FetchBaseTestDouble, _super);
    function FetchBaseTestDouble(config) {
        var _this = _super.call(this, config) || this;
        _this.endpoint = "resource";
        return _this;
    }
    return FetchBaseTestDouble;
}(index_1.FetchBase));
var FetchBaseTestDoubleNoEndpoint = /** @class */ (function (_super) {
    __extends(FetchBaseTestDoubleNoEndpoint, _super);
    function FetchBaseTestDoubleNoEndpoint(config) {
        return _super.call(this, config) || this;
    }
    return FetchBaseTestDoubleNoEndpoint;
}(index_1.FetchBase));
var defaultHeaders = { "Content-type": "application/json" };
var mockResponse = function (status, statusText, body, headers) {
    if (headers === void 0) { headers = defaultHeaders; }
    return Promise.resolve({
        status: status,
        ok: status >= 200 && status <= 299,
        statusText: statusText,
        headers: headers,
        body: JSON.stringify(body),
        json: function () { return Promise.resolve(body); }
    });
};
// HEAD
test("HEAD should return a map of headers", function () {
    // arrange
    var cat = new Cat();
    cat.id = 42;
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    var headers = {
        "cat-id": "42",
        "cat-last-updated": "1/1/2019",
        "cat-is-active": "1"
    };
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(200, null, null, headers);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config).head(cat).then(function (result) {
        // assert
        expect(result).toEqual(headers);
    });
});
test("HEAD should error with appropriate statusText when http statusCode 404", function () {
    // arrange
    var cat = new Cat();
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(404, "not found", null);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config).head(cat).catch(function (err) {
        // assert
        expect(err).toEqual(new Error("not found"));
    });
});
test("HEAD should error with appropriate statusText when http statusCode 500", function () {
    // arrange
    var cat = new Cat();
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(500, "internal server error", null);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config).head(cat).catch(function (err) {
        // assert
        expect(err).toEqual(new Error("internal server error"));
    });
});
// GET
test("FetchBase get should return a list of T given a 200 response and data was returned", function () {
    // arrange
    var cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    var dataResult = [cat];
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(200, null, dataResult);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config).get().then(function (result) {
        // assert
        expect(result).toEqual(dataResult);
    });
});
test("FetchBase get should return error if the Response.ok is false on 404 response code", function () {
    // arrange
    var result = "Resource not found :/";
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(404, result, null);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config).get().catch(function (reason) {
        // assert
        expect(reason.message).toEqual(result);
    });
});
test("FetchBase get should return error if the Response.ok is false on 500 response code", function () {
    // arrange
    var result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(500, result, null);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config).get().catch(function (reason) {
        // assert
        expect(reason.message).toEqual(result);
    });
});
test("FetchBase get should return Error instance if the Response.ok is false", function () {
    // arrange
    var result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(500, result, null);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config).get().catch(function (reason) {
        // assert
        expect(reason instanceof Error).toEqual(true);
    });
});
test("FetchBase single should return a list of T given a 200 response and data was returned", function () {
    // arrange
    var cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    var dataResult = [cat];
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(200, null, dataResult);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config).find(1).then(function (result) {
        // assert
        expect(result).toEqual(dataResult);
    });
});
test("FetchBase single should return error if the Response.ok is false on 404 response code", function () {
    // arrange
    var result = "Resource not found :/";
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(404, result, null);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config).find(1).catch(function (reason) {
        // assert
        expect(reason.message).toEqual(result);
    });
});
test("FetchBase single should return error if the Response.ok is false on 500 response code", function () {
    // arrange
    var result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(500, result, null);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config).find(1).catch(function (reason) {
        // assert
        expect(reason.message).toEqual(result);
    });
});
test("FetchBase single should return Error instance if the Response.ok is false", function () {
    // arrange
    var result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(500, result, null);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config).find(1).catch(function (reason) {
        // assert
        expect(reason instanceof Error).toEqual(true);
    });
});
test("FetchBase findAll should return a list of T given a 200 response and data was returned", function () {
    // arrange
    var cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    var dataResult = [cat];
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(200, null, dataResult);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config)
        .findAll("/subroute")
        .then(function (result) {
        // assert
        expect(result).toEqual(dataResult);
    });
});
test("FetchBase findAll should return error if the Response.ok is false on 404 response code", function () {
    // arrange
    var result = "Resource not found :/";
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(404, result, null);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config)
        .findAll("/subroute")
        .catch(function (reason) {
        // assert
        expect(reason.message).toEqual(result);
    });
});
test("FetchBase findAll should return error if the Response.ok is false on 500 response code", function () {
    // arrange
    var result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(500, result, null);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config)
        .findAll("/subroute")
        .catch(function (reason) {
        // assert
        expect(reason.message).toEqual(result);
    });
});
test("FetchBase findAll should return Error instance if the Response.ok is false", function () {
    // arrange
    var result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(500, result, null);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config)
        .findAll("/subroute")
        .catch(function (reason) {
        // assert
        expect(reason instanceof Error).toEqual(true);
    });
});
// PUT
test("FetchBase put should return an Object if there was a response body given a 200 response and data was returned", function () {
    // arrange
    var cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    // the response body will be in JSON before the response handling code unwraps it.
    var dataResult = JSON.stringify({ id: 1, created: Date.now() });
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(200, null, dataResult);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config).put(cat).then(function (result) {
        // assert
        expect(result).toEqual(dataResult);
    });
});
test("FetchBase put should return error if the Response.ok is false on 404 response code", function () {
    // arrange
    var cat = new Cat();
    cat.age = 0;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    // the response body will be in JSON before the response handling code unwraps it.
    var result = "Resource not found :/";
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(404, result, null);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config).put(cat).catch(function (reason) {
        // assert
        expect(reason.message).toEqual(result);
    });
});
test("FetchBase put should return error if the Response.ok is false on 500 response code", function () {
    // arrange
    var cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    var result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(500, result, null);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config).put(cat).catch(function (reason) {
        // assert
        expect(reason.message).toEqual(result);
    });
});
test("FetchBase put should return Error instance if the Response.ok is false", function () {
    // arrange
    var cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    var result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(500, result, null);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config).put(cat).catch(function (reason) {
        // assert
        expect(reason instanceof Error).toEqual(true);
    });
});
// POST
test("FetchBase post should return an Object if there was a response body given a 200 response and data was returned", function () {
    // arrange
    var cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    // the response body will be in JSON before the response handling code unwraps it.
    var dataResult = JSON.stringify({ id: 1, created: Date.now() });
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(200, null, dataResult);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config).post(cat).then(function (result) {
        // assert
        expect(result).toEqual(dataResult);
    });
});
test("FetchBase post should return error if the Response.ok is false on 404 response code", function () {
    // arrange
    var cat = new Cat();
    cat.age = 0;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    // the response body will be in JSON before the response handling code unwraps it.
    var result = "Resource not found :/";
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(404, result, null);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config).post(cat).catch(function (reason) {
        // assert
        expect(reason.message).toEqual(result);
    });
});
test("FetchBase post should return error if the Response.ok is false on 500 response code", function () {
    // arrange
    var cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    var result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(500, result, null);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config).post(cat).catch(function (reason) {
        // assert
        expect(reason.message).toEqual(result);
    });
});
test("FetchBase post should return Error instance if the Response.ok is false", function () {
    // arrange
    var cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    var result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(500, result, null);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config).post(cat).catch(function (reason) {
        // assert
        expect(reason instanceof Error).toEqual(true);
    });
});
// DELETE
test("FetchBase delete should return true if there was a response body given a 200 response and data was returned", function () {
    // arrange
    var cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    // the response body will be in JSON before the response handling code unwraps it.
    var dataResult = JSON.stringify(true);
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(200, null, dataResult);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config).delete(cat).then(function (result) {
        // assert
        expect(result).toEqual(dataResult);
    });
});
test("FetchBase delete should return error if the Response.ok is false on 404 response code", function () {
    // arrange
    var cat = new Cat();
    cat.age = 0;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    // the response body will be in JSON before the response handling code unwraps it.
    var result = "Resource not found :/";
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(404, result, null);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config).delete(cat).catch(function (reason) {
        // assert
        expect(reason.message).toEqual(result);
    });
});
test("FetchBase delete should return error if the Response.ok is false on 500 response code", function () {
    // arrange
    var cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    var result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(500, result, null);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config).delete(cat).catch(function (reason) {
        // assert
        expect(reason.message).toEqual(result);
    });
});
test("FetchBase delete should return Error instance if the Response.ok is false", function () {
    // arrange
    var cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    var result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(function () {
        return mockResponse(500, result, null);
    });
    var config = {
        api: "some/api/v1"
    };
    // act
    return new FetchBaseTestDouble(config).delete(cat).catch(function (reason) {
        // assert
        expect(reason instanceof Error).toEqual(true);
    });
});
// getUrl
test("FetchBase getUrl should return a formatted resource url given a config with protocol, ip, api, resource id and params", function () {
    var expected = "http://localhost/some/api/v1/resource/42?param1=value1&param2=value2";
    var config = {
        api: "some/api/v1"
    };
    var c = new Cat();
    c.id = 42;
    var catService = new FetchBaseTestDouble(config);
    expect(catService.getUrl(c, "?param1=value1&param2=value2")).toBe(expected);
});
test("FetchBase getUrl should return a formatted resource url given a config with protocol, ip, api, resource id and one param", function () {
    var expected = "http://localhost/some/api/v1/resource/42?param=value";
    var config = {
        api: "some/api/v1"
    };
    var c = new Cat();
    c.id = 42;
    var catService = new FetchBaseTestDouble(config);
    expect(catService.getUrl(c, "?param=value")).toBe(expected);
});
test("FetchBase getUrl should return a formatted resource url given a config with protocol, ip, api, resource id and no params", function () {
    var expected = "http://localhost/some/api/v1/resource/42";
    var config = {
        api: "some/api/v1"
    };
    var c = new Cat();
    c.id = 42;
    var catService = new FetchBaseTestDouble(config);
    expect(catService.getUrl(c)).toBe(expected);
});
test("FetchBase getUrl should return a formatted resource url given a config with ip, protocol, api, no resource id and params", function () {
    var expected = "http://localhost/some/api/v1/resource?param=value&param2=value2";
    var config = {
        api: "some/api/v1"
    };
    var c = new Cat();
    var catService = new FetchBaseTestDouble(config);
    expect(catService.getUrl(c, "?param=value&param2=value2")).toBe(expected);
});
test("FetchBase getUrl should return a formatted resource url given a config with ip, protocol, api, resource id = 0 and one param", function () {
    var expected = "http://localhost/some/api/v1/resource?param=value";
    var config = {
        api: "some/api/v1"
    };
    var c = new Cat();
    c.id = 0;
    var catService = new FetchBaseTestDouble(config);
    expect(catService.getUrl(c, "?param=value")).toBe(expected);
});
test("FetchBase getUrl should return a formatted resource url given a config with ip, protocol, api, no resource id and no params", function () {
    var expected = "http://localhost/some/api/v1/resource";
    var config = {
        api: "some/api/v1"
    };
    var catService = new FetchBaseTestDouble(config);
    expect(catService.getUrl()).toBe(expected);
});
test("FetchBase getUrl should return a formatted resource url given a config with ip, protocol, no api, no resource id and no params", function () {
    var expected = "http://localhost/resource";
    var config = { api: "" };
    var catService = new FetchBaseTestDouble(config);
    expect(catService.getUrl()).toBe(expected);
});
// endpoint
test("FetchBase getUrl should return a formatted resource url given a config with ip, protocol, no [endpoint, api, id, params]", function () {
    var expected = "http://localhost";
    var config = {
        api: ""
    };
    var catService = new FetchBaseTestDoubleNoEndpoint(config);
    expect(catService.getUrl()).toBe(expected);
});
test("FetchBase getUrl should return url with a port given it exists in the config.", function () {
    var config = {
        protocol: "https",
        port: 3000,
        api: "api/v1"
    };
    var PlantService = /** @class */ (function (_super) {
        __extends(PlantService, _super);
        function PlantService(config) {
            var _this = _super.call(this, config) || this;
            _this.endpoint = "plant";
            return _this;
        }
        return PlantService;
    }(index_1.FetchBase));
    var plantService = new PlantService(config);
    expect(plantService.getUrl()).toBe("https://localhost:3000/api/v1/plant");
});
//# sourceMappingURL=fetch-base.test.js.map