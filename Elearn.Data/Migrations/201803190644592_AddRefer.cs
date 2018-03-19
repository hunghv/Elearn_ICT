namespace Elearn.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddRefer : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Status",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        IsDeleted = c.Boolean(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.Int(nullable: false),
                        ModifiedDate = c.DateTime(),
                        ModifiedBy = c.Int(),
                        DeletedDate = c.DateTime(),
                        DeletedBy = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.News", "PublicDate", c => c.DateTime());
            AddColumn("dbo.News", "StatusId", c => c.Int(nullable: false));
            AddColumn("dbo.News", "PostedBy", c => c.Int(nullable: false));
            AddColumn("dbo.NewsComments", "News_Id", c => c.Int());
            CreateIndex("dbo.News", "StatusId");
            CreateIndex("dbo.NewsComments", "News_Id");
            AddForeignKey("dbo.NewsComments", "News_Id", "dbo.News", "Id");
            AddForeignKey("dbo.News", "StatusId", "dbo.Status", "Id", cascadeDelete: true);
            DropColumn("dbo.News", "PostBy");
        }
        
        public override void Down()
        {
            AddColumn("dbo.News", "PostBy", c => c.String());
            DropForeignKey("dbo.News", "StatusId", "dbo.Status");
            DropForeignKey("dbo.NewsComments", "News_Id", "dbo.News");
            DropIndex("dbo.NewsComments", new[] { "News_Id" });
            DropIndex("dbo.News", new[] { "StatusId" });
            DropColumn("dbo.NewsComments", "News_Id");
            DropColumn("dbo.News", "PostedBy");
            DropColumn("dbo.News", "StatusId");
            DropColumn("dbo.News", "PublicDate");
            DropTable("dbo.Status");
        }
    }
}
