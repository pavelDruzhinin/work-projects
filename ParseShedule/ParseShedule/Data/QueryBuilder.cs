using System;
using System.Collections;
using System.Collections.Generic;

namespace ParseShedule.Data
{
    public class QueryBuilder<T> where T : class
    {
        private readonly string _tableName;

        public QueryBuilder()
        {
            _tableName = typeof(T).Name + "s";
        }

        public QueryBuilder(string tableName)
        {
            _tableName = tableName;
        }

        public string CreateSelectById()
        {
            return $"Select TOP 1 * from {_tableName} where Id = @Id";
        }

        public string CreateDeleteById()
        {
            return $"Delete from {_tableName} where Id = @Id";
        }

        public string CreateInsert(T entity)
        {
            var columns = new List<string>();
            var parameters = new List<string>();

            var properties = entity.GetType().GetProperties();
            foreach (var property in properties)
            {
                if ((property.PropertyType.IsClass && property.PropertyType != typeof(DateTime) && property.PropertyType != typeof(string)) 
                    || (typeof(IEnumerable).IsAssignableFrom(property.PropertyType) && property.PropertyType != typeof(string)) 
                    || property.PropertyType.ToString().Contains("List") 
                    || !property.CanRead 
                    || !property.CanWrite
                    || property.Name == "Id")
                    continue;

                columns.Add(property.Name);
                parameters.Add($"@{property.Name}");
            }

            return $"Insert INTO {_tableName} ([{string.Join("],[", columns)}]) VALUES ({string.Join(",", parameters)})";
        }

        public string CreateInsertWithId(T entity)
        {
            var query = CreateInsert(entity);

            return $"{query}; select cast(scope_identity() as int)";
        }

        public string CreateUpdate(T entity)
        {
            var parameters = new List<string>();

            var properties = entity.GetType().GetProperties();
            foreach (var property in properties)
            {
                if ((property.PropertyType.IsClass && property.PropertyType != typeof(DateTime) && property.PropertyType != typeof(string))
                     || (typeof(IEnumerable).IsAssignableFrom(property.PropertyType) && property.PropertyType != typeof(string))
                     || property.PropertyType.ToString().Contains("List")
                     || !property.CanRead
                     || !property.CanWrite
                     || property.Name == "Id")
                    continue;

                parameters.Add($"{property.Name}=@{property.Name}");
            }

            return $"Update {_tableName} Set {string.Join(",", parameters)} where Id = @Id";
        }

        public string CreateSelect()
        {
            return $"Select * from {_tableName}";
        }
    }
}