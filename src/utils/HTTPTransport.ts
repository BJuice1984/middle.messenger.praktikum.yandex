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
    data?: Record<string, unknown>
}

// eslint-disable-next-line no-unused-vars
type HTTPMethod = (url: string, options?: Options) => Promise<unknown>

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
    get: HTTPMethod = (url, options = {}) => {
        const queryString = queryStringify(options.data)
        const fullUrl = queryString.length > 0 ? `${url}${queryString}` : url

        console.log(fullUrl)

        return this.request(fullUrl, { ...options, method: METHODS.GET })
    }

    put: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.PUT })
    }

    post: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.POST })
    }

    delete: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.DELETE })
    }

    request: HTTPMethod = (url, options = { method: METHODS.GET }) => {
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
                    resolve(xhr.response)
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

            if (method === METHODS.GET || !data) {
                xhr.send()
            } else {
                xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
                xhr.send(JSON.stringify(data))
            }
        })
    }
}

// function fetchWithRetry(url, options = { retries: 3 }) {
//     const { retries } = options
//     let attempts = 0

//     const attemptFetch = () => {
//         return fetch(url, options)
//             .then(response => {
//                 return Promise.resolve(response)
//             })
//             .catch(error => {
//                 attempts++

//                 if (attempts === retries) {
//                     return Promise.reject(
//                         new Error(`Failed after ${attempts} attempts. Last error: ${error.message}`)
//                     )
//                 }

//                 console.log(`Attempt ${attempts} failed. Retrying...`)

//                 return attemptFetch()
//             })
//     }

//     return attemptFetch()
// }
