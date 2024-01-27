export type Indexed<T = unknown> = {
    [key in string]: T
}

export function merge<T>(lhs: Indexed<T>, rhs: Indexed<T>): Indexed<T> {
    const result: Indexed<T> = { ...lhs }

    for (const p in rhs) {
        if (!(p in rhs)) {
            continue
        }

        try {
            if (rhs[p] !== null && typeof rhs[p] === 'object' && !Array.isArray(rhs[p])) {
                result[p] = merge(lhs[p] as Indexed<T>, rhs[p] as Indexed<T>)
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

    const setObjectValue = (obj: Indexed<T>, keys: string[], value: T): Indexed<T> => {
        if (keys.length === 0) {
            return value
        }

        const key = keys[0]
        const restKeys = keys.slice(1)

        if (!(key in obj)) {
            obj[key] = {}
        }

        obj[key] = setObjectValue(obj[key] as Indexed<T>, restKeys, value)

        return obj
    }

    return merge(object, setObjectValue({}, keys, value))
}
