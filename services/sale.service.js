import SaleRepository from '../repositories/sale.repository.js'
import ProductRepository from '../repositories/product.repository.js'
import ClientRepository from '../repositories/client.repository.js'

async function createSale(sale) {
  const product = await ProductRepository.getProduct(sale.productId)
  if (!product) {
    throw new Error('Produto informado não existe')
  }
  if (!(await ClientRepository.getClient(sale.clientId))) {
    throw new Error('Cliente informado não existe')
  }
  if (product.stock <= 0) {
    throw new Error('Produto sem estoque')
  }
  sale = await SaleRepository.insertSale(sale)
  product.stock--
  await ProductRepository.updateProduct(product)
  return sale
}

async function getSales(productId, supplierId) {
  if (productId) {
    return await SaleRepository.getSalesByProductId(productId)
  }
  if (supplierId) {
    return await SaleRepository.getSalesBySupplierId(supplierId)
  }
  return await SaleRepository.getSales()
}

async function getSale(id) {
  return await SaleRepository.getSale(id)
}

async function deleteSale(id) {
  const sale = await SaleRepository.getSale(id)
  if (sale) {
    const product = await ProductRepository.getProduct(sale.productId)
    await SaleRepository.deleteSale(id)
    product.stock++
    await ProductRepository.updateProduct(product)
    return sale
  }
  throw new Error('Sale id não encontrado')
}

async function updateSale(sale) {
  if (
    (await ProductRepository.getProduct(sale.productId)) &&
    (await ClientRepository.getClient(sale.clientId))
  ) {
    return await SaleRepository.updateSale(sale)
  }
  throw new Error('Verifique o produto e cliente inseridos')
}
export default { createSale, getSales, getSale, deleteSale, updateSale }
