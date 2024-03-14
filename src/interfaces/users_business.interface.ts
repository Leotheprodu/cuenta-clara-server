import {
  type Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize';

export interface Users_businessModelAttributes
  extends Model<
    InferAttributes<Users_businessModelAttributes>,
    InferCreationAttributes<Users_businessModelAttributes>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<number>;
  name: string;
  default: boolean;
  active: boolean;
}

export interface UserBusinessResponseAttributes
  extends InferAttributes<Users_businessModelAttributes> {
  user_id: number;
}
