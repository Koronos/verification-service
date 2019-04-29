import { Sequelize } from "sequelize";
import { DATABASE_URL } from "./secrets";

export const sequelize = new Sequelize(DATABASE_URL);