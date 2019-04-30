import { UserInterface } from "./UserInterface";

export default class FakeUser implements UserInterface {
    constructor(id: string) {
        this._id = id;
    }

    private _id: string;

    get id(): string {
        return this._id;
    }
}