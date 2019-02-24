using ConsoleExcchange.Services;

namespace ConsoleExcchange
{
    class Program
    {
        private static readonly MyExchangeService service = new MyExchangeService();

        static void Main()
        {
            var exc = service.GetExchange();
        }
    }
}
