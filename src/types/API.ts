export type exportResponse = {
    userid: string,
    userNameSession: string
}

export type Task = {
    id: string,
    taskname: string,
    description: string,
    status: boolean
    date_limit: Date | string | null,
    created_at: string,
}

export type authResponse = {
    authenticated: boolean,
    message: string
}

export type Delete = {
    title: string | null,
    status: boolean,
    description?: string | null
}