using System;
using System.Linq;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using Microsoft.Exchange.WebServices.Data;

namespace ExchangeTest.Helpers
{
    public class ExcMailSender : IMailSender
    {

        #region Send Mail

        public void SendMail(MailMessage message, string[] emails)
        {


            ServicePointManager.ServerCertificateValidationCallback = CertificateValidationCallBack;

            var service = new ExchangeService(ExchangeVersion.Exchange2010)
            {
                Credentials = new WebCredentials("login", "password", "domain")
            };

            service.AutodiscoverUrl("email");

            var emailService = new EmailMessage(service);

            foreach (var email in emails)
            {
                emailService.ToRecipients.Add(email);
            }

            const string mimeContentFormat =
                 "Mime-Version: 1.0\r\n"
              + "From: email\r\n"
              + "To: emailTo\r\n"
              + "Subject: nothing\r\n"
              + "Date: Tue, 15 Feb 2011 22:06:21 -0000\r\n"
              + "Message-ID: <{0}>\r\n"
              + "X-Experimental: some value\r\n"
              + "\r\n"
              + "I have nothing further to say.\r\n";

            emailService.Subject = message.Subject;

            emailService.Body = new MessageBody(message.Body)
            {
                //BodyType = BodyType.HTML
            };
            //string mimeString = String.Format(mimeContentFormat, messageId);
            //emailService.MimeContent = new MimeContent("us-ascii", Encoding.ASCII.GetBytes(mimeContentFormat));
            //emailService.Save(WellKnownFolderName.Drafts);

            //emailService.Attachments.AddFileAttachment("456.txt", Encoding.ASCII.GetBytes(mimeContentFormat));

            emailService.Send();
        }

        #endregion

        #region Certificate Validation CallBack

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

        #endregion

    }
}