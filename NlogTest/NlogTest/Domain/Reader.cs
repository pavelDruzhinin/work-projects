using System.Collections.Generic;

namespace NlogTest.Domain
{
    public class Reader : User
    {
        public int Id { get; set; }
        public List<BlogPost> BlogPosts { get; set; }

    }
}