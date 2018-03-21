using System;
using System.Collections.Specialized;
using System.IO;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace Service.Common
{
    public static class FileHelper
    {
        public static decimal GetMegabyte(long length)
        {
            return (length / 1024) / 1024;
        }

        public static decimal GetKylobyte(long length)
        {
            return Math.Round((decimal)length / 1024, 1);
        }

        public static Func<HttpPostedFileBase, bool> IsValidSizeFiles = c => (c.ContentLength / 1024 * 1024) > 10;

        public static byte[] ReadByteFromStream(Stream input)
        {
            byte[] buffer = new byte[input.Length];
            using (MemoryStream ms = new MemoryStream())
            {
                int read;
                while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                return ms.ToArray();
            }
        }

        public static async Task<byte[]> ReadByteFromStreamAsync(Stream input)
        {
            byte[] buffer = new byte[input.Length];
            using (MemoryStream ms = new MemoryStream())
            {
                int read;
                while ((read = await input.ReadAsync(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                return ms.ToArray();
            }
        }

        public static Task<NameValueCollection> ReadAsFormDataAsync(this HttpContent content)
        {
            return ReadAsFormDataAsync(content, CancellationToken.None);
        }

        public static Task<NameValueCollection> ReadAsFormDataAsync(this HttpContent content, CancellationToken cancellationToken)
        {
            if (content == null)
            {
                return null;
            }

            MediaTypeFormatter[] formatters = new MediaTypeFormatter[1] { new FormUrlEncodedMediaTypeFormatter() };
            return ReadAsAsyncCore(content, formatters, cancellationToken);
        }

        private static async Task<NameValueCollection> ReadAsAsyncCore(HttpContent content, MediaTypeFormatter[] formatters,
            CancellationToken cancellationToken)
        {
            FormDataCollection formData = await content.ReadAsAsync<FormDataCollection>(formatters, cancellationToken);
            return formData == null ? null : formData.ReadAsNameValueCollection();
        }
    }
}
