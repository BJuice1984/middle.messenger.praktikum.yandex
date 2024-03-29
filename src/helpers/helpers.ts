export type Indexed<T = unknown> = {
    // eslint-disable-next-line no-unused-vars
    [key in string]: Indexed<T>
}

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const p in rhs) {
        // eslint-disable-next-line no-prototype-builtins
        if (!rhs.hasOwnProperty(p)) {
            continue
        }

        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p], rhs[p])
            } else {
                lhs[p] = rhs[p]
            }
        } catch (e) {
            lhs[p] = rhs[p]
        }
    }

    return lhs
}

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object
    }

    if (typeof path !== 'string') {
        throw new Error('path must be string')
    }

    const result = path.split('.').reduceRight<Indexed>(
        (acc, key) => ({
            [key]: acc,
        }),
        value as Indexed<unknown>
    )

    return merge(object as Indexed, result)
}
