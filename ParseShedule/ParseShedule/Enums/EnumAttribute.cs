using System;

namespace ParseShedule.Enums
{
    public class DisplayAttribute : Attribute
    {
        /// <summary>
        /// Получает или задает значение, которое используется для отображения в элементе пользовательского интерфейса
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Получает или задает значение, которое используется для упорядочивания списка из элементов перечисления
        /// </summary>
        public byte SortPosition { get; set; }
    }

    public static class AttributeHelpers
    {
        /// <summary>
        /// Получает значение, которое используется для отображения в элементе пользовательского интерфейса
        /// </summary>
        public static string DisplayName(this Enum value)
        {
            var attribs = GetAttributes<DisplayAttribute>(value);

            return attribs?[0].Name;
        }

        /// <summary>
        /// Получает значение, которое используется для упорядочивания списка из элементов перечисления
        /// </summary>
        public static byte SortPosition(this Enum value)
        {
            var attribs = GetAttributes<DisplayAttribute>(value);

            return attribs?[0].SortPosition ?? 0;
        }

        private static T[] GetAttributes<T>(this Enum value)
        {
            var type = value.GetType();
            var fieldInfo = type.GetField(value.ToString());
            var attribs = fieldInfo.GetCustomAttributes(typeof(T), false) as T[];

            if (attribs == null || attribs.Length <= 0)
                return null;

            return attribs;
        }
    }
}
