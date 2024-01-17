export const loginValidator = (value: string) => {
    return /^[\w-]{3,20}$/.test(value)
}

export const nameValidator = (value: string) => {
    // eslint-disable-next-line regexp/no-obscure-range
    return /^[A-ZА-Я][a-zA-ZА-Я-]*$/.test(value)
}

export const passwordValidator = (value: string) => {
    return /^(?=.*[A-Z])(?=.*\d).{8,40}$/.test(value)
}

export const phoneValidator = (value: string) => {
    return /^\+?\d{10,15}$/.test(value)
}

export const mailValidator = (value: string) => {
    return /^\w+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
}
