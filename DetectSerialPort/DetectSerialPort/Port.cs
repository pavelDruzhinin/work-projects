namespace DetectSerialPort
{
    public class Port
    {
        public string Name { get; set; }
        public string Com { get; set; }
        public DetailPort Detail { get; set; }

        public override string ToString()
        {
            var message = "Название устройства: " + Name + ", порт:" + Com;

            if (Detail != null)
                message += " используется: " + (Detail.IsUsed ? "Да" : "Нет") + " ответ устройства: " +
                           Detail.DeviceAnswer;

            return message;
        }
    }
}