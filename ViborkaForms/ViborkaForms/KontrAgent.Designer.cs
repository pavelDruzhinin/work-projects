namespace ViborkaForms
{
    partial class KontrAgent
    {
        /// <summary>
        /// Требуется переменная конструктора.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Освободить все используемые ресурсы.
        /// </summary>
        /// <param name="disposing">истинно, если управляемый ресурс должен быть удален; иначе ложно.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Код, автоматически созданный конструктором форм Windows

        /// <summary>
        /// Обязательный метод для поддержки конструктора - не изменяйте
        /// содержимое данного метода при помощи редактора кода.
        /// </summary>
        private void InitializeComponent()
        {
            this.lbCustomers = new System.Windows.Forms.ListBox();
            this.lbCustomersProducts = new System.Windows.Forms.ListBox();
            this.lbProducts = new System.Windows.Forms.ListBox();
            this.btnFilter1 = new System.Windows.Forms.Button();
            this.btnFilter2 = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // lbCustomers
            // 
            this.lbCustomers.FormattingEnabled = true;
            this.lbCustomers.Location = new System.Drawing.Point(13, 13);
            this.lbCustomers.Name = "lbCustomers";
            this.lbCustomers.Size = new System.Drawing.Size(144, 251);
            this.lbCustomers.TabIndex = 0;
            // 
            // lbCustomersProducts
            // 
            this.lbCustomersProducts.FormattingEnabled = true;
            this.lbCustomersProducts.Location = new System.Drawing.Point(277, 12);
            this.lbCustomersProducts.Name = "lbCustomersProducts";
            this.lbCustomersProducts.Size = new System.Drawing.Size(144, 251);
            this.lbCustomersProducts.TabIndex = 1;
            // 
            // lbProducts
            // 
            this.lbProducts.FormattingEnabled = true;
            this.lbProducts.Location = new System.Drawing.Point(541, 12);
            this.lbProducts.Name = "lbProducts";
            this.lbProducts.Size = new System.Drawing.Size(144, 251);
            this.lbProducts.TabIndex = 2;
            // 
            // btnFilter1
            // 
            this.btnFilter1.Location = new System.Drawing.Point(163, 139);
            this.btnFilter1.Name = "btnFilter1";
            this.btnFilter1.Size = new System.Drawing.Size(108, 23);
            this.btnFilter1.TabIndex = 3;
            this.btnFilter1.Text = "GetChildRows>>";
            this.btnFilter1.UseVisualStyleBackColor = true;
            this.btnFilter1.Click += new System.EventHandler(this.btnFilter1_Click);
            // 
            // btnFilter2
            // 
            this.btnFilter2.Location = new System.Drawing.Point(427, 139);
            this.btnFilter2.Name = "btnFilter2";
            this.btnFilter2.Size = new System.Drawing.Size(108, 23);
            this.btnFilter2.TabIndex = 4;
            this.btnFilter2.Text = "GetParentRows>>";
            this.btnFilter2.UseVisualStyleBackColor = true;
            this.btnFilter2.Click += new System.EventHandler(this.btnFilter2_Click);
            // 
            // KontrAgent
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(697, 275);
            this.Controls.Add(this.btnFilter2);
            this.Controls.Add(this.btnFilter1);
            this.Controls.Add(this.lbProducts);
            this.Controls.Add(this.lbCustomersProducts);
            this.Controls.Add(this.lbCustomers);
            this.Name = "KontrAgent";
            this.Text = "Отчет по контрагентам";
            this.Load += new System.EventHandler(this.KontrAgent_Load);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.ListBox lbCustomers;
        private System.Windows.Forms.ListBox lbCustomersProducts;
        private System.Windows.Forms.ListBox lbProducts;
        private System.Windows.Forms.Button btnFilter1;
        private System.Windows.Forms.Button btnFilter2;
    }
}