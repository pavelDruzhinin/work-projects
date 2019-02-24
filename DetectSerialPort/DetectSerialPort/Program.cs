using System;

namespace DetectSerialPort
{
    class Program
    {
        static void Main()
        {
            //var scanner = new Scanner();

            //var ports = scanner.GetPorts().ToList();

            //ports.ForEach(Console.WriteLine);

            //var hosts = USB.GetHostControllers().ToList();

            //USB.GetDescriptionByKeyName(hosts[0].DriverKeyName);

            var devices = Scanner.getPortByVPid("05F9", "4204");

            devices.ForEach(Console.WriteLine);

            Console.ReadLine();
        }
    }
}
