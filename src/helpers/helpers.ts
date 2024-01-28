export type Indexed<T = unknown> = {
    // eslint-disable-next-line no-unused-vars
    [key in string]: Indexed<T>
}

export function merge<T>(lhs: Indexed<T>, rhs: Indexed<T>): Indexed<T> {
    const result: Indexed<T> = { ...lhs }

    for (const p in rhs) {
        if (!(p in rhs)) {
            continue
        }

        try {
            if (rhs[p] !== null && typeof rhs[p] === 'object' && !Array.isArray(rhs[p])) {
                result[p] = merge(lhs[p], rhs[p])
            } else {
                result[p] = rhs[p]
            }
        } catch (e) {
            result[p] = rhs[p]
        }
    }

    return result
}

export function set<T>(object: Indexed<T>, path: string, value: T): Indexed<T> {
    if (typeof object !== 'object' || object === null) {
        return object
    }

    if (typeof path !== 'string') {
        throw new Error('path must be string')
    }

    const keys = path.split('.')

    // eslint-disable-next-line no-shadow
    const setObjectValue = (obj: Indexed<T>, keys: string[], value: Indexed<T>): Indexed<T> => {
        if (keys.length === 0) {
            return value
        }

        const key = keys[0]
        const restKeys = keys.slice(1)

        if (!(key in obj)) {
            obj[key] = {}
        }

        obj[key] = setObjectValue(obj[key], restKeys, value)

        return obj
    }

    return merge(object, setObjectValue({}, keys, value as Indexed<T>))
}
