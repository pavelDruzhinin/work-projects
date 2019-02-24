namespace NlogTest.Domain
{
    public class BlogPostReader
    {
        public int ReaderId { get; set; }
        public Reader Reader { get; set; }

        public int BlogPostId { get; set; }
        public BlogPost BlogPost { get; set; }

    }
}