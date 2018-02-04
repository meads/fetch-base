import "whatwg-fetch";

export interface IIdentifyable {
    [id: string]: string | number;
}

export interface IFetchBase<T> {
    get() : Promise<T[]>;
    put(item: T) : Promise<Object>;
    post(item: T) : Promise<Object>;
    delete(item: T) : Promise<boolean>;
    findAll<TResult>(suffix: string): Promise<TResult[]>;
}

export interface IFetchConfig {
    ip: string;
    api: string;
    protocol: "http" | "https";
}

export class FetchBase<T> implements IFetchBase<T> {
    
    protected endpoint: string = "";
    
    constructor(private config: IFetchConfig){}
    
    // https://test.com/resource/id/suffix
    findAll<TResult>(suffix?: string) : Promise<TResult[]> {
        return fetch(`${this.getUrl()}${suffix}`, this.getOptions())
        .then(this.handleFetchResponse)
        .then(this.jsonResponse)
        .catch(this.rejectErrorPromise)
    }
    single(id: string|number) : Promise<T> {
        return fetch(this.getUrl(id.toString()), this.getOptions())
        .then(this.handleFetchResponse)
        .then(this.jsonResponse)
        .catch(this.rejectErrorPromise)
    }
    get() : Promise<T[]> {
        return fetch(this.getUrl(), this.getOptions())
        .then(this.handleFetchResponse)
        .then(this.jsonResponse)
        .catch(this.rejectErrorPromise)
    }
    put(item: T) : Promise<Object> {
        let id = this.isIdentifyable(item) ? `${item.id}` : "";
        return fetch(this.getUrl(id), this.putOptions(item))
        .then((response: Response) => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(this.jsonResponse)
        .catch(this.rejectErrorPromise);
    }
    post(item: T) : Promise<Object> {
        let id = this.isIdentifyable(item) ? `${item.id}` : "";        
        return fetch(this.getUrl(id), this.postOptions(item))
        .then(this.handleFetchResponse)
        .then(this.jsonResponse)
        .catch(this.rejectErrorPromise);
    }
    delete(item: T) : Promise<boolean> {
        let id = this.isIdentifyable(item) ? `${item.id}` : "";        
        return fetch(this.getUrl(id), this.deleteOptions())
        .then(this.handleFetchResponse)
        .then(this.jsonResponse)
        .catch(this.rejectErrorPromise);
    }


    protected rejectErrorPromise(reason: Error) {
        return Promise.reject(reason);
    }

    protected jsonResponse(json) {
        return Promise.resolve(json);
    }

    protected handleFetchResponse(response: Response) {
        if(!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }

    private isIdentifyable(arg: any): arg is IIdentifyable {
        return (arg as IIdentifyable).id !== undefined;
    }

 
    /**
     * 
     * @param params A list of name=value strings comma separated as parameters. The query params 
     *               will be joined with the correct ? and & symbols.
     */
    public getUrl(resourceId: string = "", queryParams: any[] = []): string {
        if(!this.config.protocol || !this.config.ip) {
            throw new Error("\"protocol\" and \"ip\" props are required for fetch-base");
        }

        // https://some.com/some/api/v1/resource?param1=value1&param2=value2
        let url = `${this.config.protocol}://${this.config.ip}`;
        url += this.config.api ? `/${this.config.api}` : "";
        url += this.endpoint ? `/${this.endpoint}` : "";
        url += resourceId ? `/${resourceId}` : "";
        if(queryParams && queryParams.length > 0) {
            url = `${url}?${queryParams.shift()}`;
            if(queryParams.length > 0) {
                url += queryParams.map(p => `&${p}`).join(""); 
            }
        }
        return url;
    }
    protected getOptions(): RequestInit {
        return { method: "GET" }
    }
    protected putOptions(item: T): RequestInit {
        return { method: "PUT", body: JSON.stringify(item) }
    }
    protected postOptions(item: T): RequestInit {
        return { method: "POST", body: JSON.stringify(item) }
    }
    protected deleteOptions(): RequestInit {
        return { method: "DELETE" }
    }

}
