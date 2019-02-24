using System.Collections.Generic;

namespace NlogTest.Domain
{
    public class Writer : User
    {
        public int Id { get; set; }
        public List<BlogPost> BlogPosts { get; set; }
    }
}