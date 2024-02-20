using System.ComponentModel.DataAnnotations;

namespace ProductCatalogApi.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        [Required]
        public string Name { get; set; }
        public List<Product> Products { get; set; }
    }
}
