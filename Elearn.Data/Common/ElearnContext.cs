using System.Data.Entity;
using Elearn.Data.Entities;

namespace Elearn.Data.Common
{
    public class ElearnContext : DbContext
    {
        public ElearnContext() : base("ElearnContext")
        {
        }

        public DbSet<Categories> Categories { get; set; }
        public DbSet<CoverImage> CoverImages { get; set; }
        public DbSet<News> News { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Categories>().ToTable("Categories");
            modelBuilder.Entity<CoverImage>().ToTable("CoverImage");
            modelBuilder.Entity<News>().ToTable("News");
        }
    }
}
