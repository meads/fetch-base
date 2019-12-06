"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('es6-promise').polyfill();
require('isomorphic-fetch');
var FetchBase = /** @class */ (function () {
    function FetchBase(config) {
        this.config = config;
        this.endpoint = '';
        this.requestMode = 'cors';
    }
    FetchBase.prototype.head = function (item) {
        return fetch(this.getUrl(item), this.headOptions())
            .then(this.handleHeadFetchResponse)
            .catch(this.rejectErrorPromise);
    };
    FetchBase.prototype.findAll = function (suffix) {
        var _this = this;
        return fetch("" + this.getUrl() + suffix, this.getOptions())
            .then(this.handleFetchResponse)
            .then(function (json) { return _this.jsonResponse(json); })
            .catch(this.rejectErrorPromise);
    };
    FetchBase.prototype.find = function (id) {
        var _this = this;
        return fetch(this.getUrl({ id: id }), this.getOptions())
            .then(this.handleFetchResponse)
            .then(function (json) { return _this.jsonResponse(json); })
            .catch(this.rejectErrorPromise);
    };
    FetchBase.prototype.get = function (queryParams) {
        var _this = this;
        return fetch(this.getUrl(void 0, queryParams), this.getOptions())
            .then(this.handleFetchResponse)
            .then(function (json) { return _this.jsonResponse(json); })
            .catch(this.rejectErrorPromise);
    };
    FetchBase.prototype.put = function (item) {
        var _this = this;
        return fetch(this.getUrl(item), this.putOptions(item))
            .then(this.handleFetchResponse)
            .then(function (json) { return _this.jsonResponse(json); })
            .catch(this.rejectErrorPromise);
    };
    FetchBase.prototype.post = function (item) {
        var _this = this;
        return fetch(this.getUrl(item), this.postOptions(item))
            .then(this.handleFetchResponse)
            .then(function (json) { return _this.jsonResponse(json); })
            .catch(this.rejectErrorPromise);
    };
    FetchBase.prototype.delete = function (item) {
        var _this = this;
        return fetch(this.getUrl(item), this.deleteOptions())
            .then(this.handleFetchResponse)
            .then(function (json) { return _this.jsonResponse(json); })
            .catch(this.rejectErrorPromise);
    };
    FetchBase.prototype.getUrl = function (resource, queryParams) {
        var _a = this.config, protocol = _a.protocol, ip = _a.ip, port = _a.port;
        if (!protocol) {
            protocol = 'http';
        }
        if (!ip) {
            ip = 'localhost';
        }
        var portString = '';
        if (port != null && port > 0) {
            portString += ":" + port;
        }
        var url = protocol + "://" + ip + portString;
        url += this.config.api ? "/" + this.config.api : '';
        url += this.endpoint ? "/" + this.endpoint : '';
        var resourceId = '';
        if (resource != null && resource.id != null) {
            resourceId = resource.id.toString();
        }
        if (resourceId.length > 0 && resourceId != '0') {
            url += "/" + resourceId;
        }
        if (queryParams != null && queryParams.length > 0) {
            url += queryParams;
        }
        return url;
    };
    FetchBase.prototype.rejectErrorPromise = function (reason) {
        return Promise.reject(reason);
    };
    FetchBase.prototype.jsonResponse = function (json) {
        return Promise.resolve(json);
    };
    FetchBase.prototype.handleFetchResponse = function (response) {
        if (!response.ok) {
            return Promise.reject(new Error(response.statusText));
        }
        return response.json();
    };
    FetchBase.prototype.handleHeadFetchResponse = function (response) {
        if (!response.ok) {
            return Promise.reject(new Error(response.statusText));
        }
        return Promise.resolve(response.headers);
    };
    FetchBase.prototype.headOptions = function () {
        return this.getRequestInit('HEAD');
    };
    FetchBase.prototype.getOptions = function () {
        return this.getRequestInit('GET');
    };
    FetchBase.prototype.postOptions = function (item) {
        return this.getRequestInit('POST', JSON.stringify(item));
    };
    FetchBase.prototype.putOptions = function (item) {
        return this.getRequestInit('PUT', JSON.stringify(item));
    };
    FetchBase.prototype.deleteOptions = function () {
        return this.getRequestInit('DELETE');
    };
    FetchBase.prototype.getRequestInit = function (method, body) {
        return {
            body: body,
            method: method,
            mode: this.requestMode,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    };
    return FetchBase;
}());
exports.FetchBase = FetchBase;
//# sourceMappingURL=index.js.map