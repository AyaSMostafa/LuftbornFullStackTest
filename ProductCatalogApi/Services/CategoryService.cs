using Microsoft.EntityFrameworkCore;
using ProductCatalogApi.Data;
using ProductCatalogApi.Dtos;
using ProductCatalogApi.Models;

namespace ProductCatalogApi.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _dbContext;

        public CategoryService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Category>> GetCategoriesAsync()
        {
            return await _dbContext.Categories.ToListAsync();
        }

        public async Task<Category> GetCategoryByIdAsync(int id)
        {
            return await _dbContext.Categories.FindAsync(id);
        }

        public async Task<Category> AddCategoryAsync(CategoryDto categoryDto)
        {
            var category = new Category
            {
                Name = categoryDto.Name
            };

            _dbContext.Categories.Add(category);
            await _dbContext.SaveChangesAsync();

            return category;
        }

        public async Task<Category> UpdateCategoryAsync(int id, CategoryDto categoryDto)
        {
            var existingCategory = await _dbContext.Categories.FindAsync(id);

            if (existingCategory == null)
            {
                return null; 
            }

            existingCategory.Name = categoryDto.Name;

            await _dbContext.SaveChangesAsync();

            return existingCategory;
        }

        public async Task<bool> DeleteCategoryAsync(int id)
        {
            var existingCategory = await _dbContext.Categories.FindAsync(id);

            if (existingCategory == null)
            {
                return false; 
            }

            _dbContext.Categories.Remove(existingCategory);
            await _dbContext.SaveChangesAsync();

            return true;
        }
    }
}
