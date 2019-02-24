namespace ParseShedule.Enums
{
    public class BaseItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int SortPosition { get; set; }

        public BaseItem(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public BaseItem() { }
    }
}