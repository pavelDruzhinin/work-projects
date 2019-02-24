using System.Linq;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using Microsoft.Exchange.WebServices.Data;

namespace ConsoleExcchange.Services
{
    public class MyExchangeService
    {
        public ExchangeService GetExchange()
        {
            ServicePointManager.ServerCertificateValidationCallback = CertificateValidationCallBack;

            var service = new ExchangeService(ExchangeVersion.Exchange2010)
            {
                Credentials = new WebCredentials("login", "password", "")
            };

            return service;
        }

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