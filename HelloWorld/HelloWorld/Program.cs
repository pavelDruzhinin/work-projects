using System;
using System.Threading;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            var str = "Hello, World, I'm programming!";
            Thread.Sleep(7000);
            var random = new Random();
            for (int i = 0; i < str.Length; i++)
            {
                var substring = str.Substring(0, i);

                Console.Write($"\r{substring}");
                Thread.Sleep(random.Next(70, 200));
            }
            Console.Write($"\r{str}");
            Console.ReadKey();
        }
    }
}
