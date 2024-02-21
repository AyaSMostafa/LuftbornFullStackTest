using System.ComponentModel.DataAnnotations;

namespace ProductCatalogApi.Dtos
{
    public class ProductDto
    {
        [Required(ErrorMessage = "Product name is required.")]
        public string Name { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than zero.")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "Category ID is required.")]
        public int CategoryId { get; set; }
    }
}
