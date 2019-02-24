using System;
using System.Drawing;
using System.Net;
using NeuronTest.Extensions;

namespace NeuronTest
{
    class Program
    {
        static void Main(string[] args)
        {
            var fileName = "test.bmp";
            DownloadFile("http://www.printable-alphabets.com/wp-content/uploads/2012/10/number-solid-5.jpg", fileName);
            var image = Image.FromFile(fileName);

            var net = new ImageNeuronNetwork(10, 50, 50);
            var imgBytes = image.ToInput(50, 50);

            var answer = net.GetAnswer(imgBytes);

            Console.Write($"This is {answer}. Right? ");

            var input = Console.ReadLine();
            var number = int.Parse(input);

            if (answer == number)
            {
                Console.WriteLine("So good");
            }
            else
            {
                net.Study(imgBytes, number, 1);
                Console.WriteLine("Good, I remember it");
            }

            Console.ReadKey();
        }

        static void DownloadFile(string url, string fileName)
        {
            using (var wb = new WebClient())
            {
                wb.DownloadFile(url, $"{AppDomain.CurrentDomain.BaseDirectory}\\{fileName}");
            }
        }
    }
}
