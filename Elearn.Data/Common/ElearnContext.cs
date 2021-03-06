﻿using System.Data.Entity;
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
        public DbSet<Country> Countrys { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserLoginHistory> UserLoginHistorys { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<UserRole> UserRole { get; set; }
        public DbSet<Attachment> Attachments { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Categories>().ToTable("Categories");
            modelBuilder.Entity<CoverImage>().ToTable("CoverImage");
        }
    }
}
