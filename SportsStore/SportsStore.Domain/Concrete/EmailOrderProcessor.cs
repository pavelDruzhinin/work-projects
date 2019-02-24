using SportsStore.Domain.Abstract;
using SportsStore.Domain.Entities;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace SportsStore.Domain.Concrete
{
    public class EmailSettings
    {
        public string MailToAddress = "orders@example.com";
        public string MailFromAddress = "sportsstore@example.com";
        public bool UseSsl = true;
        public string UserName = "MySmtpUsername";
        public string Password = "MySmtpPassword";
        public int ServerPort = 587;
        public bool WriteAsFile = true;
        public string FileLocation = @"D:\sports";

        public string ServerName = "smtp.example.com";
    }

    public class EmailOrderProcessor : IOrderProcessor
    {
        private readonly EmailSettings emailsettings;
        public EmailOrderProcessor(EmailSettings settings)
        {
            emailsettings = settings;
        }

        public void ProcessOrder(Cart cart, ShippingDetails shippinginfo)
        {
            using (var smtpClient = new SmtpClient())
            {
                smtpClient.EnableSsl = emailsettings.UseSsl;
                smtpClient.Host = emailsettings.ServerName;
                smtpClient.Port = emailsettings.ServerPort;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential(emailsettings.UserName, emailsettings.Password);
                if (emailsettings.WriteAsFile)
                {
                    smtpClient.DeliveryMethod = SmtpDeliveryMethod.PickupDirectoryFromIis;
                    smtpClient.PickupDirectoryLocation = emailsettings.FileLocation;
                    smtpClient.EnableSsl = false;
                }

                StringBuilder body = new StringBuilder().AppendLine("A new order has been submitted").AppendLine("---").AppendLine("Items: ");
                foreach (var line in cart.Lines)
                {
                    var subtotal = line.Product.Price * line.Quantity;
                    body.AppendFormat("{0} {1} (subtotal: {2:c}", line.Quantity, line.Product.Name, subtotal);
                }
                body.AppendFormat("Total order value {0:c}", cart.ComputeTotalValue()).
                    AppendLine("---").
                    AppendLine("Ship to:").
                    AppendLine(shippinginfo.Name).
                    AppendLine(shippinginfo.Line1).
                    AppendLine(shippinginfo.Line2 ?? "").
                    AppendLine(shippinginfo.Line3 ?? "").
                    AppendLine(shippinginfo.City).
                    AppendLine(shippinginfo.State ?? "").
                    AppendLine(shippinginfo.Country).
                    AppendLine(shippinginfo.Zip).
                    AppendLine("----").
                    AppendFormat("Gift wrap: {0}", shippinginfo.GiftWrap ? "Yes" : "No");

                var mailmessage = new MailMessage(emailsettings.MailFromAddress,
                    emailsettings.MailToAddress,
                    "New order submitted",
                    body.ToString());
                smtpClient.Send(mailmessage);
            }
        }
    }

}
