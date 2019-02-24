using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NlogTest.Domain;

namespace NlogTest.Mappings
{
    public class BlogPostMap : IEntityTypeConfiguration<BlogPost>
    {
        public void Configure(EntityTypeBuilder<BlogPost> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(x => x.Writer).WithMany(x => x.BlogPosts).HasForeignKey(x => x.WriterId);
            builder.HasMany(x => x.Readers);
        }
    }
}