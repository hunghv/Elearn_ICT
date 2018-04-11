namespace Elearn.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_CommentLike : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Likes", "CommentId", c => c.Int(nullable: false));
            AddColumn("dbo.Likes", "DocumentComment_Id", c => c.Int());
            CreateIndex("dbo.Likes", "DocumentComment_Id");
            AddForeignKey("dbo.Likes", "DocumentComment_Id", "dbo.NewsComments", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Likes", "DocumentComment_Id", "dbo.NewsComments");
            DropIndex("dbo.Likes", new[] { "DocumentComment_Id" });
            DropColumn("dbo.Likes", "DocumentComment_Id");
            DropColumn("dbo.Likes", "CommentId");
        }
    }
}
