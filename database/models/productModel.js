const Product = (instance, dataType) => {
    return instance.define(
      "produk",
      {
        id: {
          type: dataType.INTEGER(11),
          primaryKey: true,
          autoIncrement: true,
        },
        kode_produk: {
          type: dataType.STRING(255),
        },
        nama_produk: {
          type: dataType.STRING(255),
        },
        qty: {
          type: dataType.INTEGER(11),
        },
        image_produk: {
          type: dataType.STRING(255),
        },
      },
      {
        tableName: "produk",
        underscored: true,
        timestamps: false,
      }
    );
  };
  
  module.exports = Product;
  