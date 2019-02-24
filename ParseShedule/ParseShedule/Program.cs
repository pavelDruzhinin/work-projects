using System.IO;
using ParseShedule.Data;

namespace ParseShedule
{
    class Program
    {
        static void Main(string[] args)
        {

            var excelParser = new ExcelParser();
            var excelRowConverter = new ExcelRowConverter();
            var db = new ScheduleDatabase();

            var path = @"C:\Users\Pavel\courses\Расписание";
            var fileNames = Directory.GetFiles(path);

            foreach (var fileName in fileNames)
            {
                var rows = excelParser.Parse(fileName, true, true);

                var groupNumber = Path.GetFileNameWithoutExtension(fileName);

                var lessons = excelRowConverter.Convert(groupNumber, rows);

                db.BulkInsert(lessons);
            }
        }
    }
}
