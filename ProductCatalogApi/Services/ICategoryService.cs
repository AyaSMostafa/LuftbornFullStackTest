using ProductCatalogApi.Dtos;
using ProductCatalogApi.Models;

namespace ProductCatalogApi.Services
{
    public interface ICategoryService
    {
        Task<List<Category>> GetCategoriesAsync();
        Task<Category> GetCategoryByIdAsync(int id);
        Task<Category> AddCategoryAsync(CategoryDto categoryDto);
        Task<Category> UpdateCategoryAsync(int id, CategoryDto categoryDto);
        Task<bool> DeleteCategoryAsync(int id);
    }
}
