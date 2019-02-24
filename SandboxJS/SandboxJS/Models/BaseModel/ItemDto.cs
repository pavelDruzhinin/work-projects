using System;

namespace SandboxJS.Models.BaseModel
{
    public class ItemDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string Answerer { get; set; }
        public string Author { get; set; }
        public DateTime Created { get; set; }
        public string Answered { get; set; }
        public bool Shown { get; set; }

    }
}