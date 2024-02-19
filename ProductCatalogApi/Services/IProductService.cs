using ProductCatalogApi.Data;
using ProductCatalogApi.Dtos;
using ProductCatalogApi.Models;

namespace ProductCatalogApi.Services
{
    public interface IProductService
    {
        Task<List<Product>> GetProductsAsync();
        Task<Product> GetProductByIdAsync(int id);
        Task<Product> AddProductAsync(ProductDto productDto);
        Task<Product> UpdateProductAsync(int id, ProductDto productDto);
        Task<bool> DeleteProductAsync(int id);
    }
}
