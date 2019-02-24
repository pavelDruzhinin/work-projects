using ParseShedule.Data.Contracts;

namespace ParseShedule.Data.Queries
{
    public class InsertQuery<T> : Query where T : class
    {
        public InsertQuery(T entity)
        {
            var queryBuilder = new QueryBuilder<T>();

            Sql = queryBuilder.CreateInsertWithId(entity);
            Parameters = entity;
        }
    }
}