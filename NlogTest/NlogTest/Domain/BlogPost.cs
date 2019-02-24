using System.Collections.Generic;

namespace NlogTest.Domain
{
    public class BlogPost
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int WriterId { get; set; }
        public Writer Writer { get; set; }

        public List<Reader> Readers { get; set; }

        public int ViewCount { get; set; }
    }
}