// Estos tipos tienen la finalidad de estandarizar las respuestas de los servicios

export type ApiAuthResponse = {
    status: boolean,
    message?: string,
    token: string
}

export type ApiSuccessResponse = {
    status: boolean,
    message?: string,
    data: any,
}

export type ApiErrorResponse = {
    status: boolean,
    message: string,
}