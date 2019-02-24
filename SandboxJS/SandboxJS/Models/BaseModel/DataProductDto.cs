using System.Collections.Generic;

namespace SandboxJS.Models.BaseModel
{
    public class DataProductDto
    {
        public IEnumerable<ProductDto> Items { get; set; }
        public int Total { get; set; }
    }
}