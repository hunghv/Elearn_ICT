namespace Elearn.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update194news : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.News", "PostedById", c => c.Int(nullable: false));
            DropColumn("dbo.News", "PostedBy");
        }
        
        public override void Down()
        {
            AddColumn("dbo.News", "PostedBy", c => c.Int(nullable: false));
            DropColumn("dbo.News", "PostedById");
        }
    }
}
