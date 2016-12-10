export class User {
    constructor(public email: string,
                public password: string,
                public nickName?: string,
                public firstName?: string,
                public lastName?: string,
                public points?: number,
                public roomId?:string
    ) {}
}