namespace ParseShedule.Domain
{
    public class Lesson
    {
        public int Id { get; set; }
        public string GroupNumber { get; set; }
        public int DayOfWeek { get; set; }
        public int Number { get; set; }
        public string Type { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public string Lecturer { get; set; }
        public string Subject { get; set; }
        public string Species { get; set; }
        public string Auditory { get; set; }
        public string Housing { get; set; }
        public string Direction { get; set; }
    }
}