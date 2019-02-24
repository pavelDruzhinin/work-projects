using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;

namespace ViborkaForms
{
    class CustProdDataSet
    {
        static public DataSet CreateDataset()
        {
            DataSet ds = new DataSet();
            ds.ReadXmlSchema("ProdDataSet2.xsd");
            ds.ReadXml("prodscusts2.xml");
            return ds;
        }
    }
}
