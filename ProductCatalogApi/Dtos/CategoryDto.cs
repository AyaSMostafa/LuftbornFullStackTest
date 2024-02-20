using System.ComponentModel.DataAnnotations;

namespace ProductCatalogApi.Dtos
{
    public class CategoryDto
    {
        [Required]
        public string Name { get; set; }

    }
}
