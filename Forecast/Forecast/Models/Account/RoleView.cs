using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forecast.Models.System
{
    public class RoleView
    {
        #region Объекты для операций
        UsersContext context = new UsersContext();
        private List<Roles> _roles;
        public List<Roles> Roles
        {
            get { return _roles = null ?? (_roles = new List<Roles>()); }
            set { _roles = value; }
        }
        #endregion
        #region Загрузка данных
        public void LoadData()
        {
            _roles = context.Roles.ToList();
        }
        #endregion

        #region Добавление роли
        public int AddRole(Roles role)
        {
            try
            {
                context.Roles.Add(role);
                context.SaveChanges();
                return 1;
            }
            catch
            {
                return 0;
            }
        }
        #endregion

        #region Удаление роли
        public int DeleteRole(int id)
        {
            try
            {
                var entity = context.Roles.First(x => x.RoleId == id);
                context.Roles.Remove(entity);
                context.SaveChanges();
                return 1;
            }
            catch
            {
                return 0;
            }
        }
        #endregion
    }
}