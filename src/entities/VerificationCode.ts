import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class VerificationCode extends Model {
    public userId: string;
    public code: string;
    public phoneNumber: string;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
}

VerificationCode.init({
    userId: {
        type: new DataTypes.CHAR(36),
        allowNull: false
    },
    code: {
        type: new DataTypes.STRING(4),
        allowNull: false
    },
    phoneNumber: {
        type: new DataTypes.STRING(15),
        allowNull: false
    }
}, {
    sequelize,
    tableName: "verification_codes"
});

VerificationCode.sync();