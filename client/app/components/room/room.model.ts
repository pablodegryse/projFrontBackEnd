import {User} from "../auth/user.model";
export class Room {
    constructor(
        public name: string,
        public users?: User[],
        public roomId?: string
    ) {}
}