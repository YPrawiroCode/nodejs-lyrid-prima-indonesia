const User = (instance, DataType) => {
  return instance.define(
    "user",
    {
      id: {
        type: dataType.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: dataType.STRING(255),
      },
      first_name: {
        type: dataType.STRING(255),
      },
      last_name: {
        type: dataType.STRING(255),
      },
      password: {
        type: dataType.STRING(255),
      },
    },
    {
      tableName: "user",
      underscored: true,
      timestamps: false,
    }
  );
};

module.exports = User;
