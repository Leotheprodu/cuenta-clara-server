import {
  type Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize';

export interface Users_businessAttributes
  extends Model<
    InferAttributes<Users_businessAttributes>,
    InferCreationAttributes<Users_businessAttributes>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<number>;
  name: string;
  default: boolean;
  active: boolean;
}

export interface userBusinessData
  extends InferAttributes<Users_businessAttributes> {
  user_id: number;
}
