using System;
using System.Net;
using System.Net.Mail;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;

namespace MailSender
{
    class Program
    {
        static void Main()
        {
            
            const string toAddress = "email";
            const string fromAddress = "email";

            var to = new MailAddress(toAddress);
            var from = new MailAddress(fromAddress);

            var mail = new MailMessage(from, to);
            Console.WriteLine("Subject");
            mail.Subject = Convert.ToString(Console.ReadLine());

            Console.WriteLine("Your Message");
            mail.Body = Convert.ToString(Console.ReadLine());
            

            var smtp = new SmtpClient
            {
                Credentials = new NetworkCredential("email", "password"),
                Host = "host",
                Port = 25,
                EnableSsl = true
            };

            //smtp.Host = "smtp.gmail.com";
            //smtp.Port = 587;

            Console.WriteLine("Sending email...");
            ServicePointManager.ServerCertificateValidationCallback = delegate(object s, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors) { return true; };
            smtp.Send(mail);
        }
    }
}
