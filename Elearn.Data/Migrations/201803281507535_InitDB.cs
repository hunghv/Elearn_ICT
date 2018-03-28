namespace Elearn.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitDB : DbMigration
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
                "dbo.Countries",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CountryName = c.String(maxLength: 150),
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
                        PublicDate = c.DateTime(),
                        Available = c.Boolean(nullable: false),
                        Description = c.String(),
                        CategoryId = c.Int(nullable: false),
                        StatusId = c.Int(nullable: false),
                        Content = c.String(),
                        PostedBy = c.Int(nullable: false),
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
                .ForeignKey("dbo.Status", t => t.StatusId, cascadeDelete: true)
                .ForeignKey("dbo.CoverImage", t => t.CoverImage_Id)
                .Index(t => t.CategoryId)
                .Index(t => t.StatusId)
                .Index(t => t.CoverImage_Id);
            
            CreateTable(
                "dbo.NewsComments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        NewsId = c.Int(nullable: false),
                        ParentCommentId = c.Int(),
                        Comment = c.String(),
                        UserProfileId = c.Int(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.Int(nullable: false),
                        ModifiedDate = c.DateTime(),
                        ModifiedBy = c.Int(),
                        DeletedDate = c.DateTime(),
                        DeletedBy = c.Int(),
                        NewsComment_Id = c.Int(),
                        News_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.NewsComments", t => t.NewsComment_Id)
                .ForeignKey("dbo.News", t => t.NewsId, cascadeDelete: true)
                .ForeignKey("dbo.News", t => t.ParentCommentId)
                .ForeignKey("dbo.UserProfiles", t => t.UserProfileId, cascadeDelete: true)
                .ForeignKey("dbo.News", t => t.News_Id)
                .Index(t => t.NewsId)
                .Index(t => t.ParentCommentId)
                .Index(t => t.UserProfileId)
                .Index(t => t.NewsComment_Id)
                .Index(t => t.News_Id);
            
            CreateTable(
                "dbo.UserProfiles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserName = c.String(maxLength: 50),
                        Password = c.String(maxLength: 50),
                        ConfirmPassword = c.String(maxLength: 50),
                        DisplayName = c.String(maxLength: 255),
                        Email = c.String(maxLength: 100),
                        NickName = c.String(maxLength: 50),
                        ThumbnailPhoto = c.Binary(),
                        Domain = c.String(),
                        ReceiveEmail = c.Boolean(),
                        Active = c.Boolean(),
                        CountryId = c.Int(),
                        TelephoneNumber = c.String(maxLength: 30),
                        IsDeleted = c.Boolean(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.Int(nullable: false),
                        ModifiedDate = c.DateTime(),
                        ModifiedBy = c.Int(),
                        DeletedDate = c.DateTime(),
                        DeletedBy = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Countries", t => t.CountryId)
                .Index(t => t.CountryId);
            
            CreateTable(
                "dbo.UserRoles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserProfileId = c.Int(nullable: false),
                        RoleId = c.Int(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.Int(nullable: false),
                        ModifiedDate = c.DateTime(),
                        ModifiedBy = c.Int(),
                        DeletedDate = c.DateTime(),
                        DeletedBy = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Roles", t => t.RoleId, cascadeDelete: true)
                .ForeignKey("dbo.UserProfiles", t => t.UserProfileId, cascadeDelete: true)
                .Index(t => t.UserProfileId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.Roles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 256),
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
                "dbo.ShareNews",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        NewsId = c.Int(nullable: false),
                        Users = c.String(),
                        IsMailSent = c.Boolean(),
                        IsDeleted = c.Boolean(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.Int(nullable: false),
                        ModifiedDate = c.DateTime(),
                        ModifiedBy = c.Int(),
                        DeletedDate = c.DateTime(),
                        DeletedBy = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.News", t => t.NewsId, cascadeDelete: true)
                .Index(t => t.NewsId);
            
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
            
            CreateTable(
                "dbo.Likes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        NewsId = c.Int(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.Int(nullable: false),
                        ModifiedDate = c.DateTime(),
                        ModifiedBy = c.Int(),
                        DeletedDate = c.DateTime(),
                        DeletedBy = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.News", t => t.NewsId, cascadeDelete: true)
                .ForeignKey("dbo.UserProfiles", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.NewsId);
            
            CreateTable(
                "dbo.UserLoginHistories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        AccessToken = c.Guid(nullable: false),
                        IsLoggedOut = c.Boolean(nullable: false),
                        IsAppToken = c.Boolean(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.Int(nullable: false),
                        ModifiedDate = c.DateTime(),
                        ModifiedBy = c.Int(),
                        DeletedDate = c.DateTime(),
                        DeletedBy = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.UserProfiles", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserLoginHistories", "UserId", "dbo.UserProfiles");
            DropForeignKey("dbo.Likes", "UserId", "dbo.UserProfiles");
            DropForeignKey("dbo.Likes", "NewsId", "dbo.News");
            DropForeignKey("dbo.News", "CoverImage_Id", "dbo.CoverImage");
            DropForeignKey("dbo.News", "StatusId", "dbo.Status");
            DropForeignKey("dbo.ShareNews", "NewsId", "dbo.News");
            DropForeignKey("dbo.NewsComments", "News_Id", "dbo.News");
            DropForeignKey("dbo.NewsComments", "UserProfileId", "dbo.UserProfiles");
            DropForeignKey("dbo.UserRoles", "UserProfileId", "dbo.UserProfiles");
            DropForeignKey("dbo.UserRoles", "RoleId", "dbo.Roles");
            DropForeignKey("dbo.UserProfiles", "CountryId", "dbo.Countries");
            DropForeignKey("dbo.NewsComments", "ParentCommentId", "dbo.News");
            DropForeignKey("dbo.NewsComments", "NewsId", "dbo.News");
            DropForeignKey("dbo.NewsComments", "NewsComment_Id", "dbo.NewsComments");
            DropForeignKey("dbo.News", "CategoryId", "dbo.Categories");
            DropIndex("dbo.UserLoginHistories", new[] { "UserId" });
            DropIndex("dbo.Likes", new[] { "NewsId" });
            DropIndex("dbo.Likes", new[] { "UserId" });
            DropIndex("dbo.ShareNews", new[] { "NewsId" });
            DropIndex("dbo.UserRoles", new[] { "RoleId" });
            DropIndex("dbo.UserRoles", new[] { "UserProfileId" });
            DropIndex("dbo.UserProfiles", new[] { "CountryId" });
            DropIndex("dbo.NewsComments", new[] { "News_Id" });
            DropIndex("dbo.NewsComments", new[] { "NewsComment_Id" });
            DropIndex("dbo.NewsComments", new[] { "UserProfileId" });
            DropIndex("dbo.NewsComments", new[] { "ParentCommentId" });
            DropIndex("dbo.NewsComments", new[] { "NewsId" });
            DropIndex("dbo.News", new[] { "CoverImage_Id" });
            DropIndex("dbo.News", new[] { "StatusId" });
            DropIndex("dbo.News", new[] { "CategoryId" });
            DropTable("dbo.UserLoginHistories");
            DropTable("dbo.Likes");
            DropTable("dbo.Status");
            DropTable("dbo.ShareNews");
            DropTable("dbo.Roles");
            DropTable("dbo.UserRoles");
            DropTable("dbo.UserProfiles");
            DropTable("dbo.NewsComments");
            DropTable("dbo.News");
            DropTable("dbo.CoverImage");
            DropTable("dbo.Countries");
            DropTable("dbo.Categories");
            DropTable("dbo.Attachments");
        }
    }
}
