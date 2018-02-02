import * as fetch from "whatwg-fetch";

export interface IFetchBase<T> {
    get() : Promise<T[]>;
    put(item: T) : Promise<Object>;
    post(item: T) : Promise<Object>;
    delete(item: T) : Promise<boolean>;
}

export class FetchConfig {
    constructor(
        public ip: string,
        public api: string,
        public version: string,
        public protocol: "http" | "https",
    ){}
    getUrl(): string {
        return `${this.protocol}://${this.api}/${this.version}/`;
    }
}

export class FetchBase<T> implements IFetchBase<T> {
    protected endpoint: string = "";
    protected cors: "cors" | "no-cors";
    private requestUri: string = "";

    constructor(private config: FetchConfig){}

    get() : Promise<T[]> {
        this.requestUri = `${this.config.getUrl()}${this.endpoint}`;
        return fetch(this.requestUri, { 
            cors: this.cors,
            method: "GET" 
        }).then((response: Response) => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then((json: JSON) => { return json })
        .catch((reason: Error) => {
            return Promise.reject(reason);
        })
    }
    put(item: T) : Promise<Object> {
        this.requestUri = `${this.config.getUrl()}${this.endpoint}/${item["id"]}`;
        return fetch(this.requestUri, {
            cors: this.cors,
            method: "PUT"
        })
        .then((response: Response) => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then((json: JSON) => {
            return json;
        })
        .catch((reason: Error) => {
            return Promise.reject(reason);
        });
    }
    post(item: T) : Promise<Object> {
        this.requestUri = `${this.config.getUrl()}${this.endpoint}/0`;
        return fetch(this.requestUri, {
            cors: this.cors,
            method: "POST",
            body: JSON.stringify(item)
        })
        .then((response: Response) => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then((json: JSON) => {
            return json;
        })
        .catch((reason: Error) => {
            return Promise.reject(reason);
        });
    }
    delete(item: T) : Promise<boolean> {
        this.requestUri = `${this.config.getUrl()}${this.endpoint}/${item["id"]}`;
        return fetch(this.requestUri, {
            cors: this.cors,
            method: "DELETE"
        })
        .then((response: Response) => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then((json: JSON) => {
            return json;
        })
        .catch((reason: Error) => {
            return Promise.reject(reason);
        });
    }
}