using System;

namespace Service.ViewModels.Validator
{
    public class EmailViewModel
    {
        public String From { get; set; }
        public String Cc { get; set; }
        public String To { get; set; }
        public String Bcc { get; set; }
        public String Subject { get; set; }
        public String Body { get; set; }
        public String Attachments { get; set; }
    }
}
