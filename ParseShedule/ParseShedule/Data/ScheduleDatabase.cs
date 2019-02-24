using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using ParseShedule.Data.Contracts;
using ParseShedule.Data.Queries;

namespace ParseShedule.Data
{
    public class ScheduleDatabase : IDatabase
    {
        #region Connection 

        private string _connectionString = ConfigurationManager.ConnectionStrings["Schedule"].ConnectionString;

        private IDbConnection Connection() { return new SqlConnection(_connectionString); }

        #endregion

        #region Get One

        public T GetOne<T>(Query query) where T : class
        {
            using (var connection = Connection())
            {
                return connection.Query<T>(query.Sql, query.Parameters).FirstOrDefault();
            }
        }

        #endregion

        #region Get Value

        /// <summary>
        /// Для Nullable типа не пользоваться этим методом, используйте GetOne и обратитесь к полю
        /// иначе получите exception, когда поле имеет значение null
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public T GetValue<T>(Query query) where T : struct
        {
            using (var connection = Connection())
            {
                return connection.Query<T>(query.Sql, query.Parameters).FirstOrDefault();
            }
        }

        #endregion

        #region Get

        public List<T> Get<T>(Query query) where T : class
        {
            using (var connection = Connection())
            {
                return connection.Query<T>(query.Sql, query.Parameters).ToList();
            }
        }

        #endregion

        #region Execute

        public int Execute(Query query)
        {
            using (var connection = Connection())
            {
                return connection.Execute(query.Sql, query.Parameters);
            }
        }

        public void Execute(List<Query> queries)
        {
            using (var connection = Connection())
            {
                if (connection.State == ConnectionState.Closed)
                    connection.Open();

                using (var transaction = connection.BeginTransaction())
                {
                    foreach (var query in queries)
                    {
                        connection.Execute(query.Sql, query.Parameters, transaction);
                    }
                    transaction.Commit();
                }
            }
        }

        #endregion

        #region Insert

        public int Insert<T>(T entity) where T : class
        {
            var query = new InsertQuery<T>(entity);

            return GetValue<int>(query);
        }

        #endregion

        #region Bulk Insert

        public void BulkInsert<T>(List<T> entities) where T : class
        {
            var queries = entities.ConvertAll(x => new InsertQuery<T>(x));

            using (var connection = Connection())
            {
                if (connection.State == ConnectionState.Closed)
                    connection.Open();

                using (var transaction = connection.BeginTransaction())
                {
                    foreach (var query in queries)
                    {
                        connection.Execute(query.Sql, query.Parameters, transaction);
                    }
                    transaction.Commit();
                }
            }
        }

        #endregion

    }
}