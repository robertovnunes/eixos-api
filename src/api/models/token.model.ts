import BaseModel, {IBaseModel} from "./base.model";

export interface ITokenModel extends IBaseModel {
    token: string;
    expiresAt: Date;
}

export default class TokenModel extends BaseModel<ITokenModel> {
    constructor() {
        super('Token', {
          token: { type: String, required: true },
          expiresAt: { type: Date, required: true },
        });
    }
}