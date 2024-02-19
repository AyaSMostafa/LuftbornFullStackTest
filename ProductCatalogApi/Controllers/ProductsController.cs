using Microsoft.AspNetCore.Mvc;
using ProductCatalogApi.Dtos;
using ProductCatalogApi.Models;
using ProductCatalogApi.Services;

namespace ProductCatalogApi.Controllers
{
    // Controllers/ProductsController.cs
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _productService.GetProductsAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> AddProduct([FromBody] ProductDto productDto)
        {
            var product = await _productService.AddProductAsync(productDto);
            return Ok(product);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> UpdateProduct(int id, [FromBody] ProductDto productDto)
        {
            var updatedProduct = await _productService.UpdateProductAsync(id, productDto);

            if (updatedProduct == null)
            {
                return NotFound();
            }

            return Ok(updatedProduct);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var result = await _productService.DeleteProductAsync(id);

            if (!result)
            {
                return NotFound();
            }

            return Ok();
        }
    }

}
