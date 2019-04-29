import {Sequelize} from "sequelize";
import {DATABASE_URL} from "./secrets";

export const sequelize = new Sequelize(DATABASE_URL, {
    logging: !!process.env.SEQUELIZE_LOGIN
})
;