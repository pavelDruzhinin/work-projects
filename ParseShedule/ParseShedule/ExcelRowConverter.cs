using System.Collections.Generic;
using System.Linq;
using ParseShedule.Domain;
using ParseShedule.Enums;

namespace ParseShedule
{
    public class ExcelRowConverter
    {
        public List<Lesson> Convert(string groupNumber, List<object> rows)
        {
            var lessons = new List<Lesson>();

            var currentDayWeek = (int)DayOfWeek.Monday;
            var days = EnumHelper.GetList<DayOfWeek>().ToList();

            foreach (object[] row in rows)
            {
                if (!row.Any())
                    continue;

                var firstColumn = row[0].ToString().Trim();

                if (firstColumn == "Пара" || firstColumn == "Данных о расписании не найдено" || string.IsNullOrWhiteSpace(firstColumn))
                    continue;

                if (days.Any(x => x.Name == firstColumn))
                {
                    currentDayWeek = days.First(x => x.Name == firstColumn).Id;
                    continue;
                }

                var lesson = new Lesson
                {
                    GroupNumber = groupNumber,
                    DayOfWeek = currentDayWeek,
                    Number = int.Parse(firstColumn),
                    Type = row[1]?.ToString().Trim() ?? "",
                    Start = row[2].ToString().Trim(),
                    End = row[3].ToString().Trim(),
                    Subject = row[4].ToString().Trim(),
                    Lecturer = row[5].ToString().Trim(),
                    Species = row[6].ToString().Trim(),
                    Auditory = row[8].ToString().Trim(),
                    Housing = row[9].ToString().Trim(),
                    Direction = row[12].ToString().Trim()
                };

                lessons.Add(lesson);
            }

            return lessons;
        }
    }
}