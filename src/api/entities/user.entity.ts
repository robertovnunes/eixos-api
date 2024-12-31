import { ObjectId } from "mongoose";
import BaseEntity from "./base.entity";


interface ProfileSettings {
    theme: string;
    defaultTimer: ObjectId;
}

interface Phone {
    ddi: string;
    ddd: string;
    number: string;
}


export default class UserEntity extends BaseEntity {
    public name: string;
    public email: string;
    public password: string;
    public phone?: Phone | {};
    public defaultTimer?: ObjectId;
    public theme?: string;
    public refreshToken?: string;

    constructor(data: Partial<UserEntity>) {
        super(data);
        this.name = data.name || "";
        this.email = data.email || "";
        this.password = data.password || "";
        this.phone = data.phone || {};
        this.defaultTimer = data.defaultTimer || undefined;
        this.theme = data.theme || "";
        this.refreshToken = data.refreshToken || "";
    }
}