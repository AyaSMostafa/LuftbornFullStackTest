using System.ComponentModel.DataAnnotations;

namespace ProductCatalogApi.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        [Required]
        public string Name { get; set; }
        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
