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
export declare abstract class FetchBase<T extends Identifyable> implements IFetchBase<T> {
    private config;
    protected endpoint: string;
    protected requestMode: RequestMode;
    constructor(config: IFetchConfig);
    head(item: T): Promise<any>;
    findAll<TResult>(suffix?: string): Promise<TResult[]>;
    find(id: any): Promise<T>;
    get(queryParams?: string): Promise<T[]>;
    put(item: T): Promise<any>;
    post(item: T): Promise<any>;
    delete(item: T): Promise<any>;
    getUrl(resource?: T, queryParams?: string): string;
    protected rejectErrorPromise(reason: Error): Promise<never>;
    protected jsonResponse<TResult>(json: any): Promise<TResult>;
    protected handleFetchResponse(response: Response): Promise<any>;
    protected handleHeadFetchResponse(response: Response): Promise<Headers>;
    protected headOptions(): RequestInit;
    protected getOptions(): RequestInit;
    protected postOptions(item: T): RequestInit;
    protected putOptions(item: T): RequestInit;
    protected deleteOptions(): RequestInit;
    protected getRequestInit(method: string, body?: string): RequestInit;
}
