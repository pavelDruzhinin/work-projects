using System;
using System.Linq;
using System.Text.RegularExpressions;

namespace Parsehone
{
    class Program
    {
        private static Regex phonePattern = new Regex(
            @"\b(([+]?7)|8)(?<Phone>\d{10})\b",
            RegexOptions.Compiled
        );

        public static string[] SplitPhone(string value)
        {
            const string pattern = @"(/)|(\\)|(\s)|(,)|(;)";
            var split = Regex.Split(value, pattern);

            return split.Where(s => !Regex.IsMatch(s, pattern) && !String.IsNullOrWhiteSpace(s)).ToArray();
        }

        public static string FindAllDigitals(string value)
        {
            const string pattern = @"[\D]";

            return Regex.Replace(value, pattern, String.Empty);
        }

        public static string ParsePhone(string value, string phoneCode = "")
        {
            var phone = FindAllDigitals(value);

            if (phone.Length == 6 && phoneCode != "")
                return phoneCode + phone;

            if (phone.Length == 10 && (phone[0] == '8' || phone[0] == '9'))
                return "7" + phone;

            if (phone.Length == 11 && (Regex.IsMatch(phone, @"89[\d]") || Regex.IsMatch(phone, @"88[\d]")))
                phone = "7" + phone.Substring(1);

            return phone.Length == 11 ? phone : "";
        }

        static bool InputPhone()
        {
            Console.WriteLine("Для выхода наберите: exit");
            Console.WriteLine("Напишите номер телефона:");
            var phone = Convert.ToString(Console.ReadLine());

            if (phone == "exit")
            {
                return false;
            }

            var phones = SplitPhone(phone);

            foreach (var p in phones)
            {
                Console.WriteLine(p);
                var match = ParsePhone(p,"78142");

                Console.WriteLine(phonePattern.IsMatch(p) ? "Совпадает" : "Не совпадает");
                Console.WriteLine();
                Console.WriteLine("Парсинг = " + match);
                Console.WriteLine();
            }
          
            return true;
        }

        static void Main()
        {
            var isWork = true;

            while (isWork)
            {
                isWork = InputPhone();
            }
        }
    }
}
