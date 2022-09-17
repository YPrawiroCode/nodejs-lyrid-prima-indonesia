const Sequelize = require("sequelize");
const op = Sequelize.Op;

require("dotenv").config();

const { productModel } = require("../database/config");

const method = {};

method.readProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        let getProductDetail = await productModel.findOne({
            where: { id: productId },
        });
        res.send({
            status: 200,
            data:getProductDetail
        });
      } catch (error) {
        console.log(error);
        res.send({
          statusCode: 500,
          statusText: "fail",
          statusMessage: error,
        });
      }
    };

method.getAllProduct = async (req, res) => {
  try {
    const result = {}

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const productDetails = await productModel.findAll({
        
    });
    if (endIndex < productDetails.length ){
        result.next = {
            page: page + 1,
            limit:limit,
        }
    }
    if (startIndex > 0) {
        result.previous = {
            page:page -1,
            limit:limit,
        }
    }
    result.results = productDetails.slice(startIndex, endIndex)
    res.status(200).send(result);
} catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      statusText: "fail",
      statusMessage: error,
    });
  }
};

method.createProduct = async (req, res) => {
  try {
    const productDetails = await productModel.create(req.body);
    res.send({
      status: 200,
      data: {
        product: productDetails.dataValues,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

method.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    let getProductDetail = await productModel.findOne({
      where: { id: productId },
    });

    if (!getProductDetail) {
      res.status(400).send({ message: "Produk Tidak Terdaftar" });
    } else {
      getProductDetail = getProductDetail.dataValues;

      getProductDetail.kode_produk = req.body.kode_produk;
      getProductDetail.nama_produk = req.body.nama_produk;
      getProductDetail.qty = req.body.qty;
      getProductDetail.image_produk = req.body.image_produk;
      getProductDetail.updated_at = new Date();

      const getProductDetails = await productModel.update(getProductDetail, {
        where: { id: productId },
      });

      res.status(200).send({
        status: 200,
        message: "Data Berhasil Di Update",
        data: {
          product: getProductDetail,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

method.deleteProduct = async (req, res) => {
  try {
    let productId = req.params.id;
    const productDetails = await productModel.destroy({
      where: {
        id: productId,
      },
    });
    res.send({
      status: 200,
      message: "Data Berhasil di Hapus",
      data: {
        product: productDetails.dataValues,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = method;