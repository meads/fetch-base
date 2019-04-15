export interface Identifyable {
    id: number;
}
export interface IFetchBase<T extends Identifyable> {
    get(): Promise<T[]>;
    put(item: T): Promise<Object>;
    post(item: T): Promise<Object>;
    delete(item: T): Promise<boolean>;
    findAll<TResult>(suffix: string): Promise<TResult[]>;
}
export interface IFetchConfig {
    ip: string;
    api: string;
    protocol: string;
}
export declare class FetchBase<T extends Identifyable> implements IFetchBase<T> {
    private config;
    protected endpoint: string;
    constructor(config: IFetchConfig);
    findAll<TResult>(suffix?: string): Promise<TResult[]>;
    single(id: number): Promise<T>;
    get(): Promise<T[]>;
    put(item: T): Promise<Object>;
    post(item: T): Promise<Object>;
    delete(item: T): Promise<boolean>;
    protected rejectErrorPromise(reason: Error): Promise<never>;
    protected jsonResponse(json: any): Promise<any>;
    protected handleFetchResponse(response: Response): Promise<any>;
    /**
     *
     * @param params A list of name=value strings comma separated as parameters. The query params
     *               will be joined with the correct ? and & symbols.
     */
    getUrl(resourceId?: number, queryParams?: any[]): string | never;
    protected getOptions(): RequestInit;
    protected postOptions(item: T): RequestInit;
    protected putOptions(item: T): RequestInit;
    protected deleteOptions(): RequestInit;
    protected getRequestInit(method: string, body?: string): RequestInit;
}
