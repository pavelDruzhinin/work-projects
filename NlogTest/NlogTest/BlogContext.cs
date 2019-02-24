using Microsoft.EntityFrameworkCore;
using NlogTest.Domain;
using NlogTest.Mappings;

namespace NlogTest
{
    public class BlogContext : DbContext
    {
        public DbSet<BlogPost> BlogPosts { get; set; }
        public DbSet<Writer> Writers { get; set; }
        public DbSet<Reader> Readers { get; set; }
        public DbSet<BlogPostReader> BlogPostReaders { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                @"Data Source=.\SQLEXPRESS;Initial Catalog=blog;Integrated Security=true;MultipleActiveResultSets=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.<User>().HasQueryFilter(x => !x.DeleteUtcDateTime.HasValue);

            modelBuilder.ApplyConfiguration(new BlogPostMap());
            modelBuilder.ApplyConfiguration(new WriterMap());
            modelBuilder.ApplyConfiguration(new ReaderMap());
            modelBuilder.ApplyConfiguration(new BlogPostReaderMap());

            base.OnModelCreating(modelBuilder);
        }
    }
}