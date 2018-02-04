import { FetchBase, IFetchConfig, IFetchBase } from "./index";

class Cat {
    meow: "quiet" | "medium" | "loud" | "disgruntled";
    age: number;
    name: string;
    agility: number;
}

interface IFetchBaseTestDouble<Cat> extends IFetchBase<Cat> {}

class FetchBaseTestDouble extends FetchBase<Cat> implements IFetchBaseTestDouble<Cat> {
    constructor(config: IFetchConfig) {
        super(config);
        this.endpoint = "resource";
    }
}


const mockResponse = (status, statusText, body) => {
    return Promise.resolve({
        status: status,
        ok: status >= 200 && status <= 299,
        statusText: statusText,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body),
        json: () => Promise.resolve(body)
    });
};


// GET

test('FetchBase get should return a list of T given a 200 response and data was returned', () => {
    // arrange
    let cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    let dataResult = [cat];

    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(200, null, dataResult);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };

    // act
    return new FetchBaseTestDouble(config).get().then(result => {
        
        // assert
        expect(result).toEqual(dataResult);
    });
})

test('FetchBase get should return error if the Response.ok is false on 404 response code', () => {
    // arrange
    let result = "Resource not found :/";
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(404, result, null);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };

    // act
    return new FetchBaseTestDouble(config).get().catch(reason => {
        
        // assert
        expect(reason.message).toEqual(result);
    });
});

test('FetchBase get should return error if the Response.ok is false on 500 response code', () => {
    // arrange
    let result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };
    // act
    return new FetchBaseTestDouble(config).get().catch(reason => {
        
        // assert
        expect(reason.message).toEqual(result);
    });
});

test('FetchBase get should return Error instance if the Response.ok is false', () => {
    // arrange
    let result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };
    // act
    return new FetchBaseTestDouble(config).get().catch(reason => {
        
        // assert
        expect(reason instanceof Error).toEqual(true);
    });
});

test('FetchBase single should return a list of T given a 200 response and data was returned', () => {
    // arrange
    let cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    let dataResult = [cat];

    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(200, null, dataResult);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };

    // act
    return new FetchBaseTestDouble(config).single(1).then(result => {
        
        // assert
        expect(result).toEqual(dataResult);
    });
})

test('FetchBase single should return error if the Response.ok is false on 404 response code', () => {
    // arrange
    let result = "Resource not found :/";
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(404, result, null);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };

    // act
    return new FetchBaseTestDouble(config).single(1).catch(reason => {
        
        // assert
        expect(reason.message).toEqual(result);
    });
});

test('FetchBase single should return error if the Response.ok is false on 500 response code', () => {
    // arrange
    let result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };
    // act
    return new FetchBaseTestDouble(config).single(1).catch(reason => {
        
        // assert
        expect(reason.message).toEqual(result);
    });
});

test('FetchBase single should return Error instance if the Response.ok is false', () => {
    // arrange
    let result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };
    // act
    return new FetchBaseTestDouble(config).single(1).catch(reason => {
        
        // assert
        expect(reason instanceof Error).toEqual(true);
    });
});

test('FetchBase findAll should return a list of T given a 200 response and data was returned', () => {
    // arrange
    let cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    let dataResult = [cat];

    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(200, null, dataResult);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };

    // act
    return new FetchBaseTestDouble(config).findAll<{}>("/subroute").then(result => {
        
        // assert
        expect(result).toEqual(dataResult);
    });
})

test('FetchBase findAll should return error if the Response.ok is false on 404 response code', () => {
    // arrange
    let result = "Resource not found :/";
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(404, result, null);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };

    // act
    return new FetchBaseTestDouble(config).findAll("/subroute").catch(reason => {
        
        // assert
        expect(reason.message).toEqual(result);
    });
});

test('FetchBase findAll should return error if the Response.ok is false on 500 response code', () => {
    // arrange
    let result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };
    // act
    return new FetchBaseTestDouble(config).findAll("/subroute").catch(reason => {
        
        // assert
        expect(reason.message).toEqual(result);
    });
});

test('FetchBase findAll should return Error instance if the Response.ok is false', () => {
    // arrange
    let result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };
    // act
    return new FetchBaseTestDouble(config).findAll("/subroute").catch(reason => {
        
        // assert
        expect(reason instanceof Error).toEqual(true);
    });
});


// PUT

test('FetchBase put should return an Object if there was a response body given a 200 response and data was returned', () => {
    // arrange
    let cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    
    // the response body will be in JSON before the response handling code unwraps it.
    let dataResult = JSON.stringify({ id: 1, created: Date.now() });

    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(200, null, dataResult);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };

    // act
    return new FetchBaseTestDouble(config).put(cat).then(result => {
        
        // assert
        expect(result).toEqual(dataResult);
    });
})

test('FetchBase put should return error if the Response.ok is false on 404 response code', () => {
    // arrange
    let cat = new Cat();
    cat.age = 0;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    
    // the response body will be in JSON before the response handling code unwraps it.
    let result = "Resource not found :/";
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(404, result, null);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };

    // act
    return new FetchBaseTestDouble(config).put(cat).catch(reason => {
        
        // assert
        expect(reason.message).toEqual(result);
    });
});

test('FetchBase put should return error if the Response.ok is false on 500 response code', () => {
    // arrange
    let cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";

    let result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };
    // act
    return new FetchBaseTestDouble(config).put(cat).catch(reason => {
        
        // assert
        expect(reason.message).toEqual(result);
    });
});

test('FetchBase put should return Error instance if the Response.ok is false', () => {
    // arrange
    let cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    
    let result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };
    // act
    return new FetchBaseTestDouble(config).put(cat).catch(reason => {
        
        // assert
        expect(reason instanceof Error).toEqual(true);
    });
});


// POST

test('FetchBase post should return an Object if there was a response body given a 200 response and data was returned', () => {
    // arrange
    let cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    
    // the response body will be in JSON before the response handling code unwraps it.
    let dataResult = JSON.stringify({ id: 1, created: Date.now() });

    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(200, null, dataResult);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };

    // act
    return new FetchBaseTestDouble(config).post(cat).then(result => {
        
        // assert
        expect(result).toEqual(dataResult);
    });
})

test('FetchBase post should return error if the Response.ok is false on 404 response code', () => {
    // arrange
    let cat = new Cat();
    cat.age = 0;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    
    // the response body will be in JSON before the response handling code unwraps it.
    let result = "Resource not found :/";
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(404, result, null);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };

    // act
    return new FetchBaseTestDouble(config).post(cat).catch(reason => {
        
        // assert
        expect(reason.message).toEqual(result);
    });
});

test('FetchBase post should return error if the Response.ok is false on 500 response code', () => {
    // arrange
    let cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";

    let result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };
    // act
    return new FetchBaseTestDouble(config).post(cat).catch(reason => {
        
        // assert
        expect(reason.message).toEqual(result);
    });
});

test('FetchBase post should return Error instance if the Response.ok is false', () => {
    // arrange
    let cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    
    let result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };
    // act
    return new FetchBaseTestDouble(config).post(cat).catch(reason => {
        
        // assert
        expect(reason instanceof Error).toEqual(true);
    });
});


// DELETE 

test('FetchBase delete should return true if there was a response body given a 200 response and data was returned', () => {
    // arrange
    let cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    
    // the response body will be in JSON before the response handling code unwraps it.
    let dataResult = JSON.stringify(true);

    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(200, null, dataResult);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };

    // act
    return new FetchBaseTestDouble(config).delete(cat).then(result => {
        
        // assert
        expect(result).toEqual(dataResult);
    });
})

test('FetchBase delete should return error if the Response.ok is false on 404 response code', () => {
    // arrange
    let cat = new Cat();
    cat.age = 0;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    
    // the response body will be in JSON before the response handling code unwraps it.
    let result = "Resource not found :/";
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(404, result, null);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };

    // act
    return new FetchBaseTestDouble(config).delete(cat).catch(reason => {
        
        // assert
        expect(reason.message).toEqual(result);
    });
});

test('FetchBase delete should return error if the Response.ok is false on 500 response code', () => {
    // arrange
    let cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";

    let result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };
    // act
    return new FetchBaseTestDouble(config).delete(cat).catch(reason => {
        
        // assert
        expect(reason.message).toEqual(result);
    });
});

test('FetchBase delete should return Error instance if the Response.ok is false', () => {
    // arrange
    let cat = new Cat();
    cat.age = 2;
    cat.agility = 42;
    cat.meow = "quiet";
    cat.name = "jinx";
    
    let result = "Internal Server Error";
    window.fetch = jest.fn().mockImplementation(() => {
        return mockResponse(500, result, null);
    });
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };
    // act
    return new FetchBaseTestDouble(config).delete(cat).catch(reason => {
        
        // assert
        expect(reason instanceof Error).toEqual(true);
    });
});


// getUrl

test('FetchBase getUrl should return a formatted resource url given a config with protocol, ip, api, resource id and params', () => {
    const expected = "https://some.com/some/api/v1/resource/42?param1=value1&param2=value2";
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };
    const catService = new FetchBaseTestDouble(config);
    expect(catService.getUrl("42", ["param1=value1", "param2=value2"])).toBe(expected);
});

test('FetchBase getUrl should return a formatted resource url given a config with protocol, ip, api, resource id and one param', () => {
    const expected = "https://some.com/some/api/v1/resource/42?param=value";
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };
    const catService = new FetchBaseTestDouble(config);
    expect(catService.getUrl("42", ["param=value"])).toBe(expected);
});

test('FetchBase getUrl should return a formatted resource url given a config with protocol, ip, api, resource id and no params', () => {
    const expected = "https://some.com/some/api/v1/resource/42";
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };
    const catService = new FetchBaseTestDouble(config);
    expect(catService.getUrl("42")).toBe(expected);
});

test('FetchBase getUrl should return a formatted resource url given a config with ip, protocol, api, no resource id and params', () => {
    const expected = "https://some.com/some/api/v1/resource?param=value&param2=value2";
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };
    const catService = new FetchBaseTestDouble(config);
    expect(catService.getUrl("", ["param=value", "param2=value2"])).toBe(expected);
});

test('FetchBase getUrl should return a formatted resource url given a config with ip, protocol, api, no resource id and one param', () => {
    const expected = "https://some.com/some/api/v1/resource?param=value";
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };
    const catService = new FetchBaseTestDouble(config);
    expect(catService.getUrl("", ["param=value"])).toBe(expected);
});

test('FetchBase getUrl should return a formatted resource url given a config with ip, protocol, api, no resource id and no params', () => {
    const expected = "https://some.com/some/api/v1/resource";
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: "some/api/v1"    
    };
    const catService = new FetchBaseTestDouble(config);
    expect(catService.getUrl("", [])).toBe(expected);
});

test('FetchBase getUrl should return a formatted resource url given a config with ip, protocol, no api, no resource id and no params', () => {
    const expected = "https://some.com/resource";
    let config = <IFetchConfig>{
        ip: "some.com",
        protocol: "https",
        api: ""
    };
    const catService = new FetchBaseTestDouble(config);
    expect(catService.getUrl("", [])).toBe(expected);
});

test('FetchBase getUrl should return throw an Exception given a config with no ip or no protocol', () => {
    let config = <IFetchConfig>{};
    const catService = new FetchBaseTestDouble(config);
    expect(catService.getUrl).toThrow();
});


