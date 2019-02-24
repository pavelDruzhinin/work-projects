using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;
using Microsoft.Win32;

namespace DetectSerialPort
{
    public class Scanner
    {
        public IEnumerable<Port> GetPorts()
        {
            return (from port in SerialPort.GetPortNames()
                    select new Port
                    {
                        Name = port,
                        Detail = getIsUsed(port)
                    });
        }

        private DetailPort getIsUsed(string name)
        {
            var serialPort = new SerialPort(name, 19200, Parity.None, 8, StopBits.One)
            {
                Handshake = Handshake.RequestToSendXOnXOff,
                ReadTimeout = 300,
                WriteTimeout = 300,
                RtsEnable = false,
                DtrEnable = false
            };

            try
            {
                if (!serialPort.IsOpen)
                    serialPort.Open();

                serialPort.Write("1");

                return new DetailPort
                {
                    DeviceAnswer = serialPort.ReadLine()
                };
            }
            catch (Exception ex)
            {
                return new DetailPort
                {
                    IsUsed = true,
                    DeviceAnswer = ex.Message
                };
            }
        }

        public static List<Port> getPortByVPid(String VID, String PID)
        {
            var subkey = String.Format("SYSTEM\\CurrentControlSet\\Enum\\DLSUSB_{0}_{1}", VID, PID);
            var comports = new List<Port>();
            var rk1 = Registry.LocalMachine;
            var rk2 = rk1.OpenSubKey(subkey);

            if (rk2 == null)
                return comports;

            foreach (var s3 in rk2.GetSubKeyNames())
            {
                var rk3 = rk2.OpenSubKey(s3);
                if (rk3 == null)
                    continue;

                foreach (var s in rk3.GetSubKeyNames())
                {
                    var rk4 = rk3.OpenSubKey(s);
                    if (rk4 == null)
                        continue;

                    var port = new Port { Name = (string)rk4.GetValue("FriendlyName") };

                    var rk5 = rk4.OpenSubKey("Device Parameters");

                    if (rk5 != null)
                        port.Com = (string)rk5.GetValue("PortName");

                    comports.Add(port);
                }
            }

            return comports;
        }
    }
}