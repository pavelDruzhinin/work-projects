using ExchangeTest.Helpers;

namespace ExchangeTest
{
    class Program
    {
        private static readonly IMailSender sender = new ExcMailSender();

        static void Main()
        {
            var responsibles = "";

            for (int i = 0; i < 50; i++)
            {
                responsibles += "<tr>" +
                                "<td><span>Abra kadabra<span></span></span></td>" +
                                "<td><span>800</span></td>" +
                                "<td><span>348</span></td>" +
                                "<td><span>713</span></td>" +
                                "<td><span>3</span></td>" +
                                "<td><span>648</span></td>" +
                                "<td><span>0</span></td>" +
                                "<td><span>2</span></td>" +
                                "<td><span>205</span></td>" +
                                "</tr>";
            }

            var message = new MailMessage("123", "<style>.red{background:red;} " +
                                                 "table{border-spacing: 0px; border-top: 1px solid black;border-right: 1px solid black;font-size:14px;margin:5px;padding:5px;}" +
                                                 "table th, table td{border-left: 1px solid black;border-bottom: 1px solid black;text-align: center;}</style>" +
                "<table><thead>" +
                    "<tr>" +
                        "<th rowspan=\"2\" colspan=\"1\"><span>Ответственный</span></th>" +
                        "<th rowspan=\"2\" colspan=\"1\"><span>План месяца</span></th>" +
                        "<th rowspan=\"2\" colspan=\"1\"><span>План</span></th>" +
                        "<th colspan=\"5\" rowspan=\"1\"><span>Факт</span></th>" +
                        "<th rowspan=\"2\" colspan=\"1\"><span>% прогноз выполнения плана</span></th>" +
                    "</tr>" +
                    "<tr>" +
                        "<th rowspan=\"1\" colspan=\"1\"><span>Итого баллов</span></th>" +
                        "<th rowspan=\"1\" colspan=\"1\"><span>Встреча</span></th>" +
                        "<th rowspan=\"1\" colspan=\"1\"><span>Звонок</span></th>" +
                        "<th rowspan=\"1\" colspan=\"1\"><span>Семинар</span></th>" +
                        "<th rowspan=\"1\" colspan=\"1\"><span>Дистанционная встреча</span></th>" +
                    "</tr>" +
                "</thead>" +
                "<tbody>" +
                    responsibles +
                "</tbody></table>");


            sender.SendMail(message, new[] { "email" });
        }
    }
}
