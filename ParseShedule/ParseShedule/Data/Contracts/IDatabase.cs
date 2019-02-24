using System.Collections.Generic;

namespace ParseShedule.Data.Contracts
{
    public interface IDatabase
    {
        T GetOne<T>(Query query) where T : class;
        T GetValue<T>(Query query) where T : struct;
        List<T> Get<T>(Query query) where T : class;
        int Execute(Query query);
        void Execute(List<Query> queries);

        int Insert<T>(T entity) where T : class;
        void BulkInsert<T>(List<T> entities) where T : class;
    }
}