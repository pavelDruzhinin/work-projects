using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NlogTest.Domain;

namespace NlogTest.Mappings
{
    public class ReaderMap : IEntityTypeConfiguration<Reader>
    {
        public void Configure(EntityTypeBuilder<Reader> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasMany(x => x.BlogPosts);
        }
    }
}