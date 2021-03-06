import { FetchBase, IFetchConfig } from "./index"

class Cat {
    id: number
    meow: "quiet" | "medium" | "loud" | "disgruntled"
    age: number
    name: string
    agility: number
}

class FetchBaseTestDouble extends FetchBase<Cat> {
    constructor(config: IFetchConfig) {
        super(config)
        this.endpoint = "resource"
    }
}

class FetchBaseTestDoubleNoEndpoint extends FetchBase<Cat> {
    constructor(config: IFetchConfig) {
        super(config)
    }
}

const defaultHeaders: HeadersInit = { "Content-type": "application/json" }
const mockResponse = (status, statusText, body, headers = defaultHeaders) => {
    return Promise.resolve({
        status: status,
        ok: status >= 200 && status <= 299,
        statusText: statusText,
        headers,
        body: JSON.stringify(body),
        json: () => Promise.resolve(body)
    })
}

// HEAD

test("HEAD should return a map of headers", () => {
    // arrange
    let cat = new Cat()
    cat.id = 42
    cat.age = 2
    cat.agility = 42
    cat.meow = "quiet"
    cat.name = "jinx"
    let headers = <any>{
        "cat-id": "42",
        "cat-last-updated": "1/1/2019",
        "cat-is-active": "1"
    }

    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(200, null, null, headers)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }

    // act
    return new FetchBaseTestDouble(config).head(cat).then(result => {
        // assert
        expect(result).toEqual(headers)
    })
})

test("HEAD should error with appropriate statusText when http statusCode 404", () => {
    // arrange
    let cat = new Cat()
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(404, "not found", null)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }

    // act
    return new FetchBaseTestDouble(config).head(cat).catch(err => {
        // assert
        expect(err).toEqual(new Error("not found"))
    })
})

test("HEAD should error with appropriate statusText when http statusCode 500", () => {
    // arrange
    let cat = new Cat()
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, "internal server error", null)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }

    // act
    return new FetchBaseTestDouble(config).head(cat).catch(err => {
        // assert
        expect(err).toEqual(new Error("internal server error"))
    })
})

// GET

test("FetchBase get should return a list of T given a 200 response and data was returned", () => {
    // arrange
    let cat = new Cat()
    cat.age = 2
    cat.agility = 42
    cat.meow = "quiet"
    cat.name = "jinx"
    let dataResult = [cat]

    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(200, null, dataResult)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }

    // act
    return new FetchBaseTestDouble(config).get().then(result => {
        // assert
        expect(result).toEqual(dataResult)
    })
})

test("FetchBase get should return error if the Response.ok is false on 404 response code", () => {
    // arrange
    let result = "Resource not found :/"
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(404, result, null)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }

    // act
    return new FetchBaseTestDouble(config).get().catch(reason => {
        // assert
        expect(reason.message).toEqual(result)
    })
})

test("FetchBase get should return error if the Response.ok is false on 500 response code", () => {
    // arrange
    let result = "Internal Server Error"
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }
    // act
    return new FetchBaseTestDouble(config).get().catch(reason => {
        // assert
        expect(reason.message).toEqual(result)
    })
})

test("FetchBase get should return Error instance if the Response.ok is false", () => {
    // arrange
    let result = "Internal Server Error"
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }
    // act
    return new FetchBaseTestDouble(config).get().catch(reason => {
        // assert
        expect(reason instanceof Error).toEqual(true)
    })
})

test("FetchBase single should return a list of T given a 200 response and data was returned", () => {
    // arrange
    let cat = new Cat()
    cat.age = 2
    cat.agility = 42
    cat.meow = "quiet"
    cat.name = "jinx"
    let dataResult = [cat]

    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(200, null, dataResult)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }

    // act
    return new FetchBaseTestDouble(config).find(1).then(result => {
        // assert
        expect(result).toEqual(dataResult)
    })
})

test("FetchBase single should return error if the Response.ok is false on 404 response code", () => {
    // arrange
    let result = "Resource not found :/"
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(404, result, null)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }

    // act
    return new FetchBaseTestDouble(config).find(1).catch(reason => {
        // assert
        expect(reason.message).toEqual(result)
    })
})

test("FetchBase single should return error if the Response.ok is false on 500 response code", () => {
    // arrange
    let result = "Internal Server Error"
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }
    // act
    return new FetchBaseTestDouble(config).find(1).catch(reason => {
        // assert
        expect(reason.message).toEqual(result)
    })
})

test("FetchBase single should return Error instance if the Response.ok is false", () => {
    // arrange
    let result = "Internal Server Error"
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }
    // act
    return new FetchBaseTestDouble(config).find(1).catch(reason => {
        // assert
        expect(reason instanceof Error).toEqual(true)
    })
})

test("FetchBase findAll should return a list of T given a 200 response and data was returned", () => {
    // arrange
    let cat = new Cat()
    cat.age = 2
    cat.agility = 42
    cat.meow = "quiet"
    cat.name = "jinx"
    let dataResult = [cat]

    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(200, null, dataResult)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }

    // act
    return new FetchBaseTestDouble(config)
        .findAll<{}>("/subroute")
        .then(result => {
            // assert
            expect(result).toEqual(dataResult)
        })
})

test("FetchBase findAll should return error if the Response.ok is false on 404 response code", () => {
    // arrange
    let result = "Resource not found :/"
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(404, result, null)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }

    // act
    return new FetchBaseTestDouble(config)
        .findAll("/subroute")
        .catch(reason => {
            // assert
            expect(reason.message).toEqual(result)
        })
})

test("FetchBase findAll should return error if the Response.ok is false on 500 response code", () => {
    // arrange
    let result = "Internal Server Error"
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }
    // act
    return new FetchBaseTestDouble(config)
        .findAll("/subroute")
        .catch(reason => {
            // assert
            expect(reason.message).toEqual(result)
        })
})

test("FetchBase findAll should return Error instance if the Response.ok is false", () => {
    // arrange
    let result = "Internal Server Error"
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }
    // act
    return new FetchBaseTestDouble(config)
        .findAll("/subroute")
        .catch(reason => {
            // assert
            expect(reason instanceof Error).toEqual(true)
        })
})

// PUT

test("FetchBase put should return an Object if there was a response body given a 200 response and data was returned", () => {
    // arrange
    let cat = new Cat()
    cat.age = 2
    cat.agility = 42
    cat.meow = "quiet"
    cat.name = "jinx"

    // the response body will be in JSON before the response handling code unwraps it.
    let dataResult = JSON.stringify({ id: 1, created: Date.now() })

    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(200, null, dataResult)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }

    // act
    return new FetchBaseTestDouble(config).put(cat).then(result => {
        // assert
        expect(result).toEqual(dataResult)
    })
})

test("FetchBase put should return error if the Response.ok is false on 404 response code", () => {
    // arrange
    let cat = new Cat()
    cat.age = 0
    cat.agility = 42
    cat.meow = "quiet"
    cat.name = "jinx"

    // the response body will be in JSON before the response handling code unwraps it.
    let result = "Resource not found :/"
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(404, result, null)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }

    // act
    return new FetchBaseTestDouble(config).put(cat).catch(reason => {
        // assert
        expect(reason.message).toEqual(result)
    })
})

test("FetchBase put should return error if the Response.ok is false on 500 response code", () => {
    // arrange
    let cat = new Cat()
    cat.age = 2
    cat.agility = 42
    cat.meow = "quiet"
    cat.name = "jinx"

    let result = "Internal Server Error"
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }
    // act
    return new FetchBaseTestDouble(config).put(cat).catch(reason => {
        // assert
        expect(reason.message).toEqual(result)
    })
})

test("FetchBase put should return Error instance if the Response.ok is false", () => {
    // arrange
    let cat = new Cat()
    cat.age = 2
    cat.agility = 42
    cat.meow = "quiet"
    cat.name = "jinx"

    let result = "Internal Server Error"
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }
    // act
    return new FetchBaseTestDouble(config).put(cat).catch(reason => {
        // assert
        expect(reason instanceof Error).toEqual(true)
    })
})

// POST

test("FetchBase post should return an Object if there was a response body given a 200 response and data was returned", () => {
    // arrange
    let cat = new Cat()
    cat.age = 2
    cat.agility = 42
    cat.meow = "quiet"
    cat.name = "jinx"

    // the response body will be in JSON before the response handling code unwraps it.
    let dataResult = JSON.stringify({ id: 1, created: Date.now() })

    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(200, null, dataResult)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }

    // act
    return new FetchBaseTestDouble(config).post(cat).then(result => {
        // assert
        expect(result).toEqual(dataResult)
    })
})

test("FetchBase post should return error if the Response.ok is false on 404 response code", () => {
    // arrange
    let cat = new Cat()
    cat.age = 0
    cat.agility = 42
    cat.meow = "quiet"
    cat.name = "jinx"

    // the response body will be in JSON before the response handling code unwraps it.
    let result = "Resource not found :/"
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(404, result, null)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }

    // act
    return new FetchBaseTestDouble(config).post(cat).catch(reason => {
        // assert
        expect(reason.message).toEqual(result)
    })
})

test("FetchBase post should return error if the Response.ok is false on 500 response code", () => {
    // arrange
    let cat = new Cat()
    cat.age = 2
    cat.agility = 42
    cat.meow = "quiet"
    cat.name = "jinx"

    let result = "Internal Server Error"
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }
    // act
    return new FetchBaseTestDouble(config).post(cat).catch(reason => {
        // assert
        expect(reason.message).toEqual(result)
    })
})

test("FetchBase post should return Error instance if the Response.ok is false", () => {
    // arrange
    let cat = new Cat()
    cat.age = 2
    cat.agility = 42
    cat.meow = "quiet"
    cat.name = "jinx"

    let result = "Internal Server Error"
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }
    // act
    return new FetchBaseTestDouble(config).post(cat).catch(reason => {
        // assert
        expect(reason instanceof Error).toEqual(true)
    })
})

// DELETE

test("FetchBase delete should return true if there was a response body given a 200 response and data was returned", () => {
    // arrange
    let cat = new Cat()
    cat.age = 2
    cat.agility = 42
    cat.meow = "quiet"
    cat.name = "jinx"

    // the response body will be in JSON before the response handling code unwraps it.
    let dataResult = JSON.stringify(true)

    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(200, null, dataResult)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }

    // act
    return new FetchBaseTestDouble(config).delete(cat).then(result => {
        // assert
        expect(result).toEqual(dataResult)
    })
})

test("FetchBase delete should return error if the Response.ok is false on 404 response code", () => {
    // arrange
    let cat = new Cat()
    cat.age = 0
    cat.agility = 42
    cat.meow = "quiet"
    cat.name = "jinx"

    // the response body will be in JSON before the response handling code unwraps it.
    let result = "Resource not found :/"
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(404, result, null)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }

    // act
    return new FetchBaseTestDouble(config).delete(cat).catch(reason => {
        // assert
        expect(reason.message).toEqual(result)
    })
})

test("FetchBase delete should return error if the Response.ok is false on 500 response code", () => {
    // arrange
    let cat = new Cat()
    cat.age = 2
    cat.agility = 42
    cat.meow = "quiet"
    cat.name = "jinx"

    let result = "Internal Server Error"
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }
    // act
    return new FetchBaseTestDouble(config).delete(cat).catch(reason => {
        // assert
        expect(reason.message).toEqual(result)
    })
})

test("FetchBase delete should return Error instance if the Response.ok is false", () => {
    // arrange
    let cat = new Cat()
    cat.age = 2
    cat.agility = 42
    cat.meow = "quiet"
    cat.name = "jinx"

    let result = "Internal Server Error"
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null)
    })
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }
    // act
    return new FetchBaseTestDouble(config).delete(cat).catch(reason => {
        // assert
        expect(reason instanceof Error).toEqual(true)
    })
})

// getUrl

test("FetchBase getUrl should return a formatted resource url given a config with protocol, ip, api, resource id and params", () => {
    const expected =
        "http://localhost/some/api/v1/resource/42?param1=value1&param2=value2"
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }
    let c = new Cat()
    c.id = 42
    const catService = new FetchBaseTestDouble(config)
    expect(catService.getUrl(c, "?param1=value1&param2=value2")).toBe(expected)
})

test("FetchBase getUrl should return a formatted resource url given a config with protocol, ip, api, resource id and one param", () => {
    const expected = "http://localhost/some/api/v1/resource/42?param=value"
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }
    let c = new Cat()
    c.id = 42
    const catService = new FetchBaseTestDouble(config)
    expect(catService.getUrl(c, "?param=value")).toBe(expected)
})

test("FetchBase getUrl should return a formatted resource url given a config with protocol, ip, api, resource id and no params", () => {
    const expected = "http://localhost/some/api/v1/resource/42"
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }
    let c = new Cat()
    c.id = 42
    const catService = new FetchBaseTestDouble(config)
    expect(catService.getUrl(c)).toBe(expected)
})

test("FetchBase getUrl should return a formatted resource url given a config with ip, protocol, api, no resource id and params", () => {
    const expected =
        "http://localhost/some/api/v1/resource?param=value&param2=value2"
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }
    let c = new Cat()
    const catService = new FetchBaseTestDouble(config)
    expect(catService.getUrl(c, "?param=value&param2=value2")).toBe(expected)
})

test("FetchBase getUrl should return a formatted resource url given a config with ip, protocol, api, resource id = 0 and one param", () => {
    const expected = "http://localhost/some/api/v1/resource?param=value"
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }
    let c = new Cat()
    c.id = 0
    const catService = new FetchBaseTestDouble(config)
    expect(catService.getUrl(c, "?param=value")).toBe(expected)
})

test("FetchBase getUrl should return a formatted resource url given a config with ip, protocol, api, no resource id and no params", () => {
    const expected = "http://localhost/some/api/v1/resource"
    let config = <IFetchConfig>{
        api: "some/api/v1"
    }
    const catService = new FetchBaseTestDouble(config)
    expect(catService.getUrl()).toBe(expected)
})

test("FetchBase getUrl should return a formatted resource url given a config with ip, protocol, no api, no resource id and no params", () => {
    const expected = "http://localhost/resource"
    let config = <IFetchConfig>{ api: "" }
    const catService = new FetchBaseTestDouble(config)
    expect(catService.getUrl()).toBe(expected)
})

// endpoint
test("FetchBase getUrl should return a formatted resource url given a config with ip, protocol, no [endpoint, api, id, params]", () => {
    const expected = "http://localhost"
    let config = <IFetchConfig>{
        api: ""
    }
    let catService = new FetchBaseTestDoubleNoEndpoint(config)

    expect(catService.getUrl()).toBe(expected)
})

test("FetchBase getUrl should return url with a port given it exists in the config.", () => {
    let config = <IFetchConfig>{
        protocol: "https",
        port: 3000,
        api: "api/v1"
    }
    class PlantService extends FetchBase<any> {
        constructor(config: IFetchConfig) {
            super(config)
            this.endpoint = "plant"
        }
    }
    const plantService = new PlantService(config)
    expect(plantService.getUrl()).toBe("https://localhost:3000/api/v1/plant")
})
