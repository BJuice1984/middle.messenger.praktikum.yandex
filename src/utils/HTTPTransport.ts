const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
}

function queryStringify(data) {
    const queryString = `?${Object.keys(data)
        .map(key => `${key}=${data[key]}`)
        .join('&')}`

    return queryString
}

/**
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */

class HTTPTransport {
    get = (url, options = {}) => {
        const queryString = queryStringify(options.data)
        const fullUrl = queryString ? `${url}${queryString}` : url

        console.log(fullUrl)

        return this.request(fullUrl, { ...options, method: METHODS.GET }, options.timeout)
    }

    put = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout)
    }

    post = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout)
    }

    delete = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout)
    }

    request = (url, options = { method: METHODS.GET }) => {
        const { method, data } = options

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            xhr.open(method, url)

            xhr.onload = function () {
                resolve(xhr)
            }

            xhr.onabort = reject
            xhr.onerror = reject
            xhr.ontimeout = reject

            if (method === METHODS.GET || !data) {
                xhr.send()
            } else {
                xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
                xhr.send(JSON.stringify(data))
            }
        })
    }
}

function fetchWithRetry(url, options = { retries: 3 }) {
    const { retries } = options
    let attempts = 0

    const attemptFetch = () => {
        return fetch(url, options)
            .then(response => {
                return Promise.resolve(response)
            })
            .catch(error => {
                attempts++

                if (attempts === retries) {
                    return Promise.reject(
                        new Error(`Failed after ${attempts} attempts. Last error: ${error.message}`)
                    )
                }

                console.log(`Attempt ${attempts} failed. Retrying...`)

                return attemptFetch()
            })
    }

    return attemptFetch()
}
