
export interface UserRequired {
    email: string
    national_id: string
    username: string
    password: string
    organizations: {
        nid: string
    }[]
}