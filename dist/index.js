"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("whatwg-fetch");
var FetchBase = /** @class */ (function () {
    function FetchBase(config) {
        this.config = config;
        this.endpoint = "";
    }
    FetchBase.prototype.findAll = function (suffix) {
        return fetch("" + this.getUrl() + suffix, this.getOptions())
            .then(this.handleFetchResponse)
            .then(this.jsonResponse)
            .catch(this.rejectErrorPromise);
    };
    FetchBase.prototype.single = function (id) {
        return fetch(this.getUrl(id), this.getOptions())
            .then(this.handleFetchResponse)
            .then(this.jsonResponse)
            .catch(this.rejectErrorPromise);
    };
    FetchBase.prototype.get = function () {
        return fetch(this.getUrl(), this.getOptions())
            .then(this.handleFetchResponse)
            .then(this.jsonResponse)
            .catch(this.rejectErrorPromise);
    };
    FetchBase.prototype.put = function (item) {
        return fetch(this.getUrl(item.id), this.putOptions(item))
            .then(this.handleFetchResponse)
            .then(this.jsonResponse)
            .catch(this.rejectErrorPromise);
    };
    FetchBase.prototype.post = function (item) {
        return fetch(this.getUrl(item.id), this.postOptions(item))
            .then(this.handleFetchResponse)
            .then(this.jsonResponse)
            .catch(this.rejectErrorPromise);
    };
    FetchBase.prototype.delete = function (item) {
        return fetch(this.getUrl(item.id), this.deleteOptions())
            .then(this.handleFetchResponse)
            .then(this.jsonResponse)
            .catch(this.rejectErrorPromise);
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
    /**
     *
     * @param params A list of name=value strings comma separated as parameters. The query params
     *               will be joined with the correct ? and & symbols.
     */
    FetchBase.prototype.getUrl = function (resourceId, queryParams) {
        if (resourceId === void 0) { resourceId = 0; }
        if (queryParams === void 0) { queryParams = []; }
        if (!this.config.protocol || !this.config.ip) {
            throw new Error("'protocol' and 'ip' props are required for fetch-base");
        }
        // https://some.com/some/api/v1/resource?param1=value1&param2=value2
        var url = this.config.protocol + "://" + this.config.ip;
        url += this.config.api ? "/" + this.config.api : "";
        url += this.endpoint ? "/" + this.endpoint : "";
        if (resourceId > 0) {
            url += "/" + resourceId;
        }
        if (queryParams && queryParams.length > 0) {
            url = url + "?" + queryParams.shift();
            if (queryParams.length > 0) {
                url += queryParams.map(function (p) { return "&" + p; }).join("");
            }
        }
        return url;
    };
    FetchBase.prototype.getOptions = function () {
        return this.getRequestInit("GET");
    };
    FetchBase.prototype.postOptions = function (item) {
        return this.getRequestInit("POST", JSON.stringify(item));
    };
    FetchBase.prototype.putOptions = function (item) {
        return this.getRequestInit("PUT", JSON.stringify(item));
    };
    FetchBase.prototype.deleteOptions = function () {
        return this.getRequestInit("DELETE");
    };
    FetchBase.prototype.getRequestInit = function (method, body) {
        return {
            body: body,
            method: method,
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        };
    };
    return FetchBase;
}());
exports.FetchBase = FetchBase;
//# sourceMappingURL=index.js.map