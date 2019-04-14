import "whatwg-fetch"

export interface Identifyable {
    id: number
}

export interface IFetchBase<T extends Identifyable> {
    get(): Promise<T[]>
    put(item: T): Promise<Object>
    post(item: T): Promise<Object>
    delete(item: T): Promise<boolean>
    findAll<TResult>(suffix: string): Promise<TResult[]>
}

export interface IFetchConfig {
    ip: string
    api: string
    protocol: "http" | "https"
}

export class FetchBase<T extends Identifyable> implements IFetchBase<T> {
    protected endpoint: string = ""

    constructor(private config: IFetchConfig) {}

    findAll<TResult>(suffix?: string): Promise<TResult[]> {
        return fetch(`${this.getUrl()}${suffix}`, this.getOptions())
            .then(this.handleFetchResponse)
            .then(this.jsonResponse)
            .catch(this.rejectErrorPromise)
    }
    single(id: number): Promise<T> {
        return fetch(this.getUrl(id), this.getOptions())
            .then(this.handleFetchResponse)
            .then(this.jsonResponse)
            .catch(this.rejectErrorPromise)
    }
    get(): Promise<T[]> {
        return fetch(this.getUrl(), this.getOptions())
            .then(this.handleFetchResponse)
            .then(this.jsonResponse)
            .catch(this.rejectErrorPromise)
    }
    put(item: T): Promise<Object> {
        return fetch(this.getUrl(item.id), this.putOptions(item))
            .then(this.handleFetchResponse)
            .then(this.jsonResponse)
            .catch(this.rejectErrorPromise)
    }
    post(item: T): Promise<Object> {
        return fetch(this.getUrl(item.id), this.postOptions(item))
            .then(this.handleFetchResponse)
            .then(this.jsonResponse)
            .catch(this.rejectErrorPromise)
    }
    delete(item: T): Promise<boolean> {
        return fetch(this.getUrl(item.id), this.deleteOptions())
            .then(this.handleFetchResponse)
            .then(this.jsonResponse)
            .catch(this.rejectErrorPromise)
    }

    protected rejectErrorPromise(reason: Error) {
        return Promise.reject(reason)
    }

    protected jsonResponse(json) {
        return Promise.resolve(json)
    }

    protected handleFetchResponse(response: Response) {
        if (!response.ok) {
            return Promise.reject(new Error(response.statusText))
        }
        return response.json()
    }

    /**
     *
     * @param params A list of name=value strings comma separated as parameters. The query params
     *               will be joined with the correct ? and & symbols.
     */
    public getUrl(
        resourceId: number = 0,
        queryParams: any[] = []
    ): string | never {
        if (!this.config.protocol || !this.config.ip) {
            throw new Error(
                "'protocol' and 'ip' props are required for fetch-base"
            )
        }

        // https://some.com/some/api/v1/resource?param1=value1&param2=value2
        let url = `${this.config.protocol}://${this.config.ip}`

        url += this.config.api ? `/${this.config.api}` : ""
        url += this.endpoint ? `/${this.endpoint}` : ""
        if (resourceId > 0) {
            url += `/${resourceId}`
        }

        if (queryParams && queryParams.length > 0) {
            url = `${url}?${queryParams.shift()}`
            if (queryParams.length > 0) {
                url += queryParams.map(p => `&${p}`).join("")
            }
        }
        return url
    }

    protected getOptions(): RequestInit {
        return this.getRequestInit("GET")
    }
    protected postOptions(item: T): RequestInit {
        return this.getRequestInit("POST", JSON.stringify(item))
    }
    protected putOptions(item: T): RequestInit {
        return this.getRequestInit("PUT", JSON.stringify(item))
    }
    protected deleteOptions(): RequestInit {
        return this.getRequestInit("DELETE")
    }
    protected getRequestInit(method: string, body?: string): RequestInit {
        return {
            body,
            method,
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        }
    }
}
