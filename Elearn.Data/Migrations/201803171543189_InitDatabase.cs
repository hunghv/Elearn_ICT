namespace Elearn.Data.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class InitDatabase : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Categories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        IsDeleted = c.Boolean(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.Int(nullable: false),
                        ModifiedDate = c.DateTime(),
                        ModifiedBy = c.Int(),
                        DeletedDate = c.DateTime(),
                        DeletedBy = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.CoverImage",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FileName = c.String(maxLength: 100),
                        Extension = c.String(maxLength: 50),
                        Mime = c.String(maxLength: 50),
                        Attachment = c.Binary(),
                        IsDeleted = c.Boolean(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.Int(nullable: false),
                        ModifiedDate = c.DateTime(),
                        ModifiedBy = c.Int(),
                        DeletedDate = c.DateTime(),
                        DeletedBy = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.News",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Image = c.String(),
                        PostedDate = c.DateTime(nullable: false),
                        Available = c.Boolean(nullable: false),
                        Description = c.String(),
                        CategoryId = c.Int(nullable: false),
                        Content = c.String(),
                        PostBy = c.String(),
                        IsDeleted = c.Boolean(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.Int(nullable: false),
                        ModifiedDate = c.DateTime(),
                        ModifiedBy = c.Int(),
                        DeletedDate = c.DateTime(),
                        DeletedBy = c.Int(),
                        CoverImage_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Categories", t => t.CategoryId, cascadeDelete: true)
                .ForeignKey("dbo.CoverImage", t => t.CoverImage_Id)
                .Index(t => t.CategoryId)
                .Index(t => t.CoverImage_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.News", "CoverImage_Id", "dbo.CoverImage");
            DropForeignKey("dbo.News", "CategoryId", "dbo.Categories");
            DropIndex("dbo.News", new[] { "CoverImage_Id" });
            DropIndex("dbo.News", new[] { "CategoryId" });
            DropTable("dbo.News");
            DropTable("dbo.CoverImage");
            DropTable("dbo.Categories");
        }
    }
}
