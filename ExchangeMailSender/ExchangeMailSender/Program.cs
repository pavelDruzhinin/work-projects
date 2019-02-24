using System;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using Microsoft.Exchange.WebServices.Data;

namespace ExchangeMailSender
{
    class Program
    {
        static void Main()
        {
            const string statusMsg = "email sent!";
            const string _email = "email";

            ServicePointManager.ServerCertificateValidationCallback = CertificateValidationCallBack;

            var service = new ExchangeService(ExchangeVersion.Exchange2010)
            {
                Credentials = new WebCredentials("login", "password", "domain")
            };

            service.AutodiscoverUrl(_email);

            var email = new EmailMessage(service);
            email.ToRecipients.Add(_email);
            email.ToRecipients.Add("email");
            email.Subject = "Test Message";
            email.Body = new MessageBody("Sample message sent via EWS Managed API");
            email.Send();

            Console.WriteLine(statusMsg);
        }

        private static bool CertificateValidationCallBack(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
        {
            if ((sslPolicyErrors & SslPolicyErrors.RemoteCertificateChainErrors) != 0)
            {
                if (chain != null)
                {
                    foreach (X509ChainStatus status in chain.ChainStatus)
                    {
                        if ((certificate.Subject == certificate.Issuer) && (status.Status == X509ChainStatusFlags.UntrustedRoot))
                        {
                            continue;
                        }

                        if (status.Status != X509ChainStatusFlags.NoError)
                        {
                            return false;
                        }
                    }
                }

                return true;
            }

            return sslPolicyErrors == SslPolicyErrors.None;
        }
    }
}
