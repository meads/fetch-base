require('es6-promise').polyfill();
require('isomorphic-fetch');

export interface Identifyable {
    id: any;
}

export interface IFetchConfig {
    protocol: string;
    ip: string;
    port?: number;
    api?: string;
}

export interface IFetchBase<T extends Identifyable> {
    delete(item: T): Promise<any>;
    find(id: any): Promise<T>;
    findAll<TResult>(suffix?: string): Promise<TResult[]>;
    get(queryParams?: string): Promise<T[]>;
    head(item: T): Promise<any>;
    post(item: T): Promise<any>;
    put(item: T): Promise<any>;
}

export abstract class FetchBase<T extends Identifyable>
    implements IFetchBase<T> {
    protected endpoint: string = '';
    protected requestMode: RequestMode = 'cors';

    constructor(private config: IFetchConfig) {}

    head(item: T): Promise<any> {
        return fetch(this.getUrl(item), this.headOptions())
            .then(this.handleHeadFetchResponse)
            .catch(this.rejectErrorPromise);
    }
    findAll<TResult>(suffix?: string): Promise<TResult[]> {
        return fetch(`${this.getUrl()}${suffix}`, this.getOptions())
            .then(this.handleFetchResponse)
            .then((json: any) => this.jsonResponse<TResult[]>(json))
            .catch(this.rejectErrorPromise);
    }
    find(id: any): Promise<T> {
        return fetch(this.getUrl(<T>{ id }), this.getOptions())
            .then(this.handleFetchResponse)
            .then((json: any) => this.jsonResponse<T>(json))
            .catch(this.rejectErrorPromise);
    }
    get(queryParams?: string): Promise<T[]> {
        return fetch(this.getUrl(void 0, queryParams), this.getOptions())
            .then(this.handleFetchResponse)
            .then((json: any) => this.jsonResponse<T[]>(json))
            .catch(this.rejectErrorPromise);
    }
    put(item: T): Promise<any> {
        return fetch(this.getUrl(item), this.putOptions(item))
            .then(this.handleFetchResponse)
            .then((json: any) => this.jsonResponse<any>(json))
            .catch(this.rejectErrorPromise);
    }
    post(item: T): Promise<any> {
        return fetch(this.getUrl(item), this.postOptions(item))
            .then(this.handleFetchResponse)
            .then((json: any) => this.jsonResponse<any>(json))
            .catch(this.rejectErrorPromise);
    }
    delete(item: T): Promise<any> {
        return fetch(this.getUrl(item), this.deleteOptions())
            .then(this.handleFetchResponse)
            .then((json: any) => this.jsonResponse<any>(json))
            .catch(this.rejectErrorPromise);
    }
    getUrl(resource?: T, queryParams?: string): string {
        let { protocol, ip, port } = this.config;
        if (!protocol) {
            protocol = 'http';
        }
        if (!ip) {
            ip = 'localhost';
        }
        let portString = '';

        if (port != null && port > 0) {
            portString += `:${port}`;
        }

        let url = `${protocol}://${ip}${portString}`;
        url += this.config.api ? `/${this.config.api}` : '';
        url += this.endpoint ? `/${this.endpoint}` : '';

        let resourceId = '';
        if (resource != null && resource.id != null) {
            resourceId = resource.id.toString();
        }
        if (resourceId.length > 0 && resourceId != '0') {
            url += `/${resourceId}`;
        }

        if (queryParams != null && queryParams.length > 0) {
            url += queryParams;
        }

        return url;
    }

    protected rejectErrorPromise(reason: Error) {
        return Promise.reject(reason);
    }
    protected jsonResponse<TResult>(json) {
        return Promise.resolve<TResult>(json);
    }
    protected handleFetchResponse(response: Response) {
        if (!response.ok) {
            return Promise.reject(new Error(response.statusText));
        }
        return response.json();
    }
    protected handleHeadFetchResponse(response: Response) {
        if (!response.ok) {
            return Promise.reject(new Error(response.statusText));
        }
        return Promise.resolve(response.headers);
    }

    protected headOptions(): RequestInit {
        return this.getRequestInit('HEAD');
    }
    protected getOptions(): RequestInit {
        return this.getRequestInit('GET');
    }
    protected postOptions(item: T): RequestInit {
        return this.getRequestInit('POST', JSON.stringify(item));
    }
    protected putOptions(item: T): RequestInit {
        return this.getRequestInit('PUT', JSON.stringify(item));
    }
    protected deleteOptions(): RequestInit {
        return this.getRequestInit('DELETE');
    }
    protected getRequestInit(method: string, body?: string): RequestInit {
        return {
            body,
            method,
            mode: this.requestMode,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
}
