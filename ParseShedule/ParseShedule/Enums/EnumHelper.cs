using System;
using System.Collections.Generic;
using System.Linq;

namespace ParseShedule.Enums
{
    public class EnumHelper
    {
        public static IEnumerable<BaseItem> GetList<T>() where T : struct, IComparable, IConvertible, IFormattable
        {
            return from Enum en in Enum.GetValues(typeof(T))
                   select new BaseItem
            {
                Id = Convert.ToInt32(en),
                Name = en.DisplayName()
            };
        }

        public static IEnumerable<BaseItem> GetSortList<T>() where T : struct, IComparable, IConvertible, IFormattable
        {
            return from Enum en in Enum.GetValues(typeof(T))
                   select new BaseItem
                   {
                       Id = Convert.ToInt32(en),
                       Name = en.DisplayName(),
                       SortPosition = en.SortPosition()
                   };
        }
    }
}