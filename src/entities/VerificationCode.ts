import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class VerificationCode extends Model {
    public id?: string;
    public userId: string;
    public code: string;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
}

VerificationCode.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: new DataTypes.CHAR(36),
        allowNull: false
    },
    verificationCode: {
        type: new DataTypes.STRING(5),
        allowNull: false
    }
}, {
    sequelize,
    tableName: "verification_codes"
});