import ProductRepository from '../repositories/product.repository.js'
import SupplierRepository from '../repositories/supplier.repository.js'
import SaleRepository from '../repositories/sale.repository.js'
import ProductInfoRepository from '../repositories/productInfo.repository.js'

async function createProduct(product) {
  if (await SupplierRepository.getSupplier(product.supplierId)) {
    return await ProductRepository.insertProduct(product)
  }
  throw new Error('Fornecedor não encontrado')
}
async function getProducts() {
  return await ProductRepository.getProducts()
}

async function getProduct(id) {
  const product = await ProductRepository.getProduct(id)
  product.info = await ProductInfoRepository.getProductInfo(parseInt(id))
  return product
}

async function deleteProduct(id) {
  const sales = await SaleRepository.getSalesByProductId(id)
  if (sales.length > 0) {
    throw new Error('Existem vendas para esse produto')
  }
  return await ProductRepository.deleteProduct(id)
}

async function updateProduct(product) {
  if (await SupplierRepository.getSupplier(product.supplierId)) {
    return await ProductRepository.updateProduct(product)
  }
  throw new Error('Fornecedor não encontrado')
}
async function createProductInfo(productInfo) {
  return await ProductInfoRepository.createProductInfo(productInfo)
}

async function updateProductInfo(productInfo) {
  return await ProductInfoRepository.updateProductInfo(productInfo)
}

async function createReview(review, productId) {
  await ProductInfoRepository.createReview(review, productId)
}

async function deleteReview(productId, index) {
  await ProductInfoRepository.deleteReview(parseInt(productId), parseInt(index))
}

async function getProductsInfo() {
  return await ProductInfoRepository.getProductsInfo()
}

async function deleteProductInfo(id) {
  await ProductInfoRepository.deleteProductInfo(parseInt(id))
}

export default {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  createProductInfo,
  updateProductInfo,
  createReview,
  deleteReview,
  getProductsInfo,
  deleteProductInfo
}
