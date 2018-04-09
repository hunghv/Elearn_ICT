namespace Elearn.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateNews : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.News", "CoverImage_Id", "dbo.CoverImage");
            DropIndex("dbo.News", new[] { "CoverImage_Id" });
            RenameColumn(table: "dbo.News", name: "CoverImage_Id", newName: "ImageId");
            AlterColumn("dbo.News", "ImageId", c => c.Int(nullable: false));
            CreateIndex("dbo.News", "ImageId");
            AddForeignKey("dbo.News", "ImageId", "dbo.CoverImage", "Id", cascadeDelete: true);
            DropColumn("dbo.News", "Image");
        }
        
        public override void Down()
        {
            AddColumn("dbo.News", "Image", c => c.String());
            DropForeignKey("dbo.News", "ImageId", "dbo.CoverImage");
            DropIndex("dbo.News", new[] { "ImageId" });
            AlterColumn("dbo.News", "ImageId", c => c.Int());
            RenameColumn(table: "dbo.News", name: "ImageId", newName: "CoverImage_Id");
            CreateIndex("dbo.News", "CoverImage_Id");
            AddForeignKey("dbo.News", "CoverImage_Id", "dbo.CoverImage", "Id");
        }
    }
}
