namespace Elearn.Data.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class UpdateEntity : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Attachments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ReportId = c.Int(),
                        AttachmentFile = c.Binary(),
                        AttachmentName = c.String(),
                        AttachmentType = c.String(),
                        AttachmentLength = c.Int(nullable: false),
                        Remark = c.String(),
                        IsDeleted = c.Boolean(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.Int(nullable: false),
                        ModifiedDate = c.DateTime(),
                        ModifiedBy = c.Int(),
                        DeletedDate = c.DateTime(),
                        DeletedBy = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Attachments");
        }
    }
}
