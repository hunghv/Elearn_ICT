using System;
using System.Configuration;
using System.Net;
using System.Net.Mail;
using Service.ViewModels.Validator;

namespace Service.Common
{
    public class XMail
    {
        public static void Send(EmailViewModel email)
        {
            if (email == null) throw new ArgumentNullException(nameof(email));
            try
            {
                var message = new MailMessage();
                message.IsBodyHtml = true;
                message.From = new MailAddress(email.From);
                message.To.Add(new MailAddress(email.To));
                message.Subject = email.Subject;
                message.Body = email.Body;
                message.ReplyToList.Add(email.From);
                if (email.Cc.Length > 0)
                {
                    message.CC.Add(email.Cc);
                }
                if (email.Bcc.Length > 0)
                {
                    message.Bcc.Add(email.Bcc);
                }
                if (email.Attachments.Length > 0)
                {
                    String[] fileNames = email.Attachments.Split(';', ',');
                    foreach (var fileName in fileNames)
                    {
                        message.Attachments.Add(new Attachment(fileName));
                    }
                }
                var client = new SmtpClient(ConfigurationManager.AppSettings[ConfigurationMail.SmtPgmail], int.Parse(ConfigurationManager.AppSettings[ConfigurationMail.SmtpPort]))
                {
                    Credentials = new NetworkCredential(ConfigurationManager.AppSettings[ConfigurationMail.SmtpUser], ConfigurationManager.AppSettings[ConfigurationMail.SmtpPassword]),
                    EnableSsl = true
                };
                client.Send(message);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}