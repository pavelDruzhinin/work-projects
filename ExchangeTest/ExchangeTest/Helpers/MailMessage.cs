namespace ExchangeTest.Helpers
{
    public class MailMessage
    {
        public string Subject { get; set; }
        public string Body { get; set; }

        public MailMessage()
        {
            
        }

        public MailMessage(string subject, string body)
        {
            Subject = subject;
            Body = body;
        }
    }
}