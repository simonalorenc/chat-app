import { uuid } from "./util/uuid";
import { Message } from "./message.model";

export class Thread {
    id: string;
    lastMessage!: Message;
    name: string | undefined;
    avatarSrc: string | undefined

    constructor(id?: string, name?: string, avatarSrc?: string) {
        this.id = id || uuid()
        this.name = name
        this.avatarSrc = avatarSrc
    }
}