using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NlogTest.Domain;

namespace NlogTest.Mappings
{
    public class BlogPostReaderMap : IEntityTypeConfiguration<BlogPostReader>
    {
        public void Configure(EntityTypeBuilder<BlogPostReader> builder)
        {
            builder.HasKey(x => new { x.BlogPostId, x.ReaderId });
            builder.HasOne(x => x.BlogPost);
            builder.HasOne(x => x.Reader);
        }
    }
}