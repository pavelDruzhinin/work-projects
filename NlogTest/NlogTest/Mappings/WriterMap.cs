using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NlogTest.Domain;

namespace NlogTest.Mappings
{
    public class WriterMap : IEntityTypeConfiguration<Writer>
    {
        public void Configure(EntityTypeBuilder<Writer> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasMany(x => x.BlogPosts);
        }
    }
}