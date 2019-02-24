using System;
using System.Data;
using System.Windows.Forms;

namespace ViborkaForms
{
    public partial class KontrAgent : Form
    {
        readonly DataSet _customers;
        public KontrAgent()
        {
            InitializeComponent();
            _customers = CustProdDataSet.CreateDataset();
        }

        private void KontrAgent_Load(object sender, EventArgs e)
        {
            foreach (DataRow dr in _customers.Tables["Customers"].Rows)
            {
                lbCustomers.Items.Add(dr["CustomerID"] + ":" + dr["FirstName"] + " " + dr["LastName"]);
            }
        }

        private void btnFilter1_Click(object sender, EventArgs e)
        {
            if (lbCustomers.SelectedIndex < 0)
            {
                lbCustomersProducts.Items.Add("Не выбрана строка"); ;
            }
            else
            {
                var selectedRow = _customers.Tables["Customers"].Rows[lbCustomers.SelectedIndex];
                var ChildRows = selectedRow.GetChildRows(_customers.Relations["CustomerRef"]);
                lbCustomersProducts.Items.Clear();
                foreach (DataRow dr in ChildRows)
                {
                    lbCustomersProducts.Items.Add(dr["CustomerProductID"]);
                }
            }
        }
        private void btnFilter2_Click(object sender, EventArgs e)
        {
            var custProdTable = _customers.Tables["CustomerProducts"];
            lbProducts.Items.Clear();
            foreach (var item in lbCustomersProducts.Items)
            {
                try
                {
                    var custProdId = Convert.ToInt32(item);
                    var custProdRow = custProdTable.Rows.Find(custProdId);
                    var prodRow = custProdRow.GetParentRow(_customers.Relations["ProductRef"]);
                    lbProducts.Items.Add(prodRow["ProductName"]);
                }
                catch (FormatException)
                {
                    lbProducts.Items.Add("Не выбрана строка"); 
                }
            }
        }
    }
}
