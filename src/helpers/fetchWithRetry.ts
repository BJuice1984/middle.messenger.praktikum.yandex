interface FetchOptions extends RequestInit {
    retries?: number
}

export default function fetchWithRetry(
    url: string,
    options: FetchOptions = { retries: 3 }
): Promise<Response> {
    const { retries } = options
    let attempts = 0

    const attemptFetch = (): Promise<Response> => {
        return fetch(url, options)
            .then(response => {
                return Promise.resolve(response)
            })
            .catch((error: Error) => {
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
