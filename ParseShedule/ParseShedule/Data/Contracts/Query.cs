namespace ParseShedule.Data.Contracts
{
    public abstract class Query
    {
        public object Parameters { get; set; }
        public string Sql { get; set; }
    }
}