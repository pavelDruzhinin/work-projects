using System;
using System.Data;
using System.Windows.Forms;

namespace ViborkaForms
{
    public partial class Form1 : Form
    {
        readonly DataSet _products;
        readonly DataTable _productsTable;
        readonly DataTable _custTable;
        readonly DataTable _custProdTable;
        public Form1()
        {
            InitializeComponent();
            _products = CustProdDataSet.CreateDataset();
            _productsTable = _products.Tables["Products"];
            _custTable = _products.Tables["Customers"];
            _custProdTable = _products.Tables["CustomerProducts"];
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            ProdGridView.DataSource = _productsTable;
            CustGridView.DataSource = _custTable;
            ProdCustGridView.DataSource = _custProdTable;
        }

        private void Save_Click(object sender, EventArgs e)
        {
            _products.WriteXmlSchema("ProdDataSet2.xsd");
            _products.WriteXml("prodscusts2.xml");
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            var result = MessageBox.Show("Сохранить изменения?", "Вопрос", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
            if (result == DialogResult.Yes)
            {
                _products.WriteXml("prodscusts2.xml");
            }
        }

        private void Sumbtn_Click(object sender, EventArgs e)
        {
            var total = _productsTable.Compute("Sum(SumTotal)", "").ToString();
            SumBox.Text = total;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            var kr = new KontrAgent();
            kr.Show();
        }
    }
}
