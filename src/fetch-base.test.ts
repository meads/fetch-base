import { FetchBase, IFetchConfig, IFetchBase } from "./index";

class Cat {
    meow: "quite" | "medium" | "loud" | "disgruntled";
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


