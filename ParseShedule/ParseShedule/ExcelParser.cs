using System.Collections.Generic;
using System.IO;
using Excel;

namespace ParseShedule
{
    public class ExcelParser
    {
        #region Read Excel File

        public List<object> Parse(string filePath, bool notDelSep, bool isAll)
        {
            var extension = Path.GetExtension(filePath);

            IExcelDataReader excelReader = null;
            var stream = File.Open(filePath, FileMode.Open, FileAccess.Read);
            switch (extension)
            {
                case ".xls":
                    excelReader = ExcelReaderFactory.CreateBinaryReader(stream);
                    break;
                case ".xlsm":
                case ".xlsx":
                    excelReader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                    break;
            }

            if (excelReader == null)
                return null;

            var excelDoc = new List<object>();
            var index = 0;

            while (excelReader.Read() && (isAll || index < 20))
            {
                index++;

                var count = excelReader.FieldCount;
                var obj = new object[count];

                for (var i = 0; i < obj.Length; i++)
                {
                    var value = excelReader.GetString(i);

                    if (value == null)
                    {
                        obj[i] = "";
                        continue;
                    }

                    obj[i] = notDelSep ? value : value.Replace(',', ' ');
                }
                excelDoc.Add(obj);
            }

            excelReader.Close();

            return excelDoc;
        }

        #endregion 
    }
}