const User = (instance, DataType) => {
  return instance.define(
    "customer",
    {
      id: {
        type: dataType.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
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
