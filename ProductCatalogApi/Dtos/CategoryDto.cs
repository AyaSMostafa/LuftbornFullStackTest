using System.ComponentModel.DataAnnotations;

namespace ProductCatalogApi.Dtos
{
    public class CategoryDto
    {
        [Required(ErrorMessage = "Category name is required.")]

        public string Name { get; set; }

    }
}
