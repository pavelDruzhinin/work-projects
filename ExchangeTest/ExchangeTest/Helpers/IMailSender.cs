namespace ExchangeTest.Helpers
{
    public interface IMailSender
    {
        void SendMail(MailMessage message, string[] emails);
    }
}