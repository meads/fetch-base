# fetch-base
A base class for fetch requests.

```ts
// include the library module classes and interfaces
import { FetchBase, IFetchConfig, IFetchBase } from "fetch-base";

// declare your data that the service knows to work with
class Cat {
    meow: "quiet" | "medium" | "loud" | "disgruntled";
    age: number;
    name: string;
    agility: number;
}

// extend the generic interface supplying your data class
interface IFetchBaseTestDouble<Cat> extends IFetchBase<Cat> {}

// extend and implement the generic class and interface respectively
class FetchBaseTestDouble extends FetchBase<Cat> implements IFetchBaseTestDouble<Cat> {
    constructor(config: IFetchConfig) {
        super(config);
        this.endpoint = "resource"; // declare the endpoint for this resource "cat"
    }
    // override the super class with your own implementation of FetchBase methods here...
    // ...
}

// declare a config object used during fetch requests
let config = <IFetchConfig>{
    ip: "some.com",
    protocol: "https",
    api: "some/api/v1"    
};

// invoke the get request directly and get JavaScript Object results.
new FetchBaseTestDouble(config).get().then(result => {
    // result is already JSON.parsed for you too.
});

```