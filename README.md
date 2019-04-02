# fetch-base
A base class for [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) requests.

npm package source code (but really just import the npm package or submit a pull request for change in the repo!)
https://github.com/meads/fetch-base

fetch-base-test repo with implementation example
https://github.com/meads/fetch-base-test


[![Build Status](https://travis-ci.com/meads/fetch-base.svg?branch=master)](https://travis-ci.com/meads/fetch-base)
[![codecov](https://codecov.io/gh/meads/fetch-base/branch/master/graph/badge.svg?sanitize=true)](https://codecov.io/gh/meads/fetch-base)
[![npm version](https://badge.fury.io/js/fetch-base.svg)](https://badge.fury.io/js/fetch-base)
[![npm dependencies](https://david-dm.org/meads/fetch-base.svg)](https://david-dm.org/meads/fetch-base)

# Buy me a :beer: or something :sunglasses:
https://mikeads.com/ 


```ts
import { FetchBase }  from "fetch-base"

export class Plant {
    constructor(
        public id: number = 0,
        public commonName: string = "",
        public genus: string = "",
        public species: string = "",
    ){}
}

export class PlantService extends FetchBase<Plant> {
    constructor() {
        super({
            ip: "localhost:8080",
            api: "api",
            protocol: "http",
        })
    }
}

let plantService = new PlantService()

plantService.get().then((plants: Plant[]) => {
    console.log(plants)
    alert("view the console for results!")
}).catch(reason => alert(reason))

```