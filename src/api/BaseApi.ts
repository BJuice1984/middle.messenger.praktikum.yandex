import HTTPTransport from '../utils/HTTPTransport.ts'

export default abstract class BaseAPI {
    protected http: HTTPTransport

    protected constructor(endpoint: string) {
        this.http = new HTTPTransport(endpoint)
    }

    // eslint-disable-next-line no-unused-vars
    public abstract create?(data: unknown): Promise<unknown>

    // eslint-disable-next-line no-unused-vars
    public abstract read?(identifier?: string): Promise<unknown>

    // eslint-disable-next-line no-unused-vars
    public abstract update?(identifier: string, data: unknown): Promise<unknown>

    // eslint-disable-next-line no-unused-vars
    public abstract delete?(data: unknown): Promise<unknown>
}
