using Microsoft.EntityFrameworkCore;
using ProductCatalogApi.Data;
using ProductCatalogApi.Dtos;
using ProductCatalogApi.Models;

namespace ProductCatalogApi.Services
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _dbContext;

        public ProductService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Product>> GetProductsAsync()
        {
            return await _dbContext.Products.Include(p => p.Category).ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _dbContext.Products.FindAsync(id);
        }

        public async Task<Product> AddProductAsync(ProductDto productDto)
        {
            var product = new Product
            {
                Name = productDto.Name,
                Price = productDto.Price,
                CategoryId = productDto.CategoryId
                // Set other properties as needed
            };

            _dbContext.Products.Add(product);
            await _dbContext.SaveChangesAsync();

            return product;
        }

        public async Task<Product> UpdateProductAsync(int id, ProductDto productDto)
        {
            var existingProduct = await _dbContext.Products.FindAsync(id);

            if (existingProduct == null)
            {
                return null;
            }

            existingProduct.Name = productDto.Name;
            existingProduct.Price = productDto.Price;
            existingProduct.CategoryId = productDto.CategoryId;

            await _dbContext.SaveChangesAsync();

            return existingProduct;
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            var existingProduct = await _dbContext.Products.FindAsync(id);

            if (existingProduct == null)
            {
                return false;
            }

            _dbContext.Products.Remove(existingProduct);
            await _dbContext.SaveChangesAsync();

            return true;
        }
    }

}
