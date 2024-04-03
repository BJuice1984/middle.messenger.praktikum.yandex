const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
}

interface Options {
    headers?: { [key: string]: string }
    method?: string
    timeout?: number
    data?: Record<string, unknown> | FormData
}

// eslint-disable-next-line no-unused-vars
type HTTPMethod = (url: string, options?: Options) => Promise<never>

function queryStringify(data: Options['data']): string {
    if (!data) {
        return ''
    }

    const queryString = Object.entries(data)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join('&')

    return `?${queryString}`
}

export default class HTTPTransport {
    static API_URL = 'https://ya-praktikum.tech/api/v2'
    protected endpoint: string

    constructor(endpoint: string) {
        this.endpoint = `${HTTPTransport.API_URL}${endpoint}`
    }

    public get: HTTPMethod = (url, options = {}) => {
        const queryString = queryStringify(options.data)
        const fullUrl =
            queryString.length > 0
                ? `${this.endpoint}${url}${queryString}`
                : `${this.endpoint}${url}`

        return this.request(fullUrl, { ...options, method: METHODS.GET })
    }

    public put: HTTPMethod = (url, options = {}) => {
        const fullUrl = `${this.endpoint}${url}`

        return this.request(fullUrl, { ...options, method: METHODS.PUT })
    }

    public post: HTTPMethod = (url, options = {}) => {
        const fullUrl = `${this.endpoint}${url}`

        return this.request(fullUrl, { ...options, method: METHODS.POST })
    }

    public delete: HTTPMethod = (url, options = {}) => {
        const fullUrl = `${this.endpoint}${url}`

        return this.request(fullUrl, { ...options, method: METHODS.DELETE })
    }

    private request: HTTPMethod = (url, options = { method: METHODS.GET }) => {
        const { method, data } = options

        return new Promise((resolve, reject) => {
            if (method == null) {
                reject(new Error('No method specified'))

                return
            }

            const xhr = new XMLHttpRequest()

            xhr.open(method, url)

            // eslint-disable-next-line func-names
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response as PromiseLike<never>)
                } else {
                    reject(new Error(`Запрос не выполнен. Статус: ${xhr.status}`))
                }
            }

            // eslint-disable-next-line func-names
            xhr.onabort = function () {
                reject(new Error('Запрос прерван'))
            }

            // eslint-disable-next-line func-names
            xhr.onerror = function () {
                reject(new Error('Ошибка сети. Запрос не выполнен'))
            }

            // eslint-disable-next-line func-names
            xhr.ontimeout = function () {
                reject(new Error('Время ожидания запроса истекло'))
            }

            xhr.withCredentials = true
            xhr.responseType = 'json'

            if (method === METHODS.GET || !data) {
                xhr.send()
            } else if (data instanceof FormData) {
                // xhr.setRequestHeader('Content-Type', 'multipart/form-data')
                xhr.send(data)
            } else {
                xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
                xhr.send(JSON.stringify(data))
            }
        })
    }
}
