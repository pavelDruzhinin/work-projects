/*using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System;

namespace MediaBase
{
    public partial class view : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string connectionstring = @"Data Source =(LocalDB)\v11.0; AttachDBFilename = |DataDirectory|\MediaBase.mdf"
+ ";Integrated Security=True;";
            SqlConnection con = new SqlConnection(connectionstring);
            SqlDataReader user;
            try
            {
                con.Open();
                SqlCommand usQuery = con.CreateCommand();
                HttpCookie mycookie = Request.Cookies["Settings"];
                adminsGrid.Visible = false;  //не видно ничего без логина
                if (mycookie != null)
                {
                    if (mycookie["admin"].Equals("no"))
                    {
                        usQuery.CommandText = "SELECT * FROM users WHERE cookie='" + mycookie["id"]
                            + "' AND id ='" + mycookie["user"] + "';";
                        user = usQuery.ExecuteReader();
                        if (user.Read())//пользователь вошёл в систему!
                        {
                            Button1.Visible = true;
                            choosed.Visible = true;
                            pleaseReg.Visible = false;
                            usersGrid.Visible = true;
                            adminsGrid.Visible = false;
                        }
                        user.Close();
                    }
                    if (mycookie["admin"].Equals("yes"))
                    {
                        usQuery.CommandText = "SELECT * FROM admins WHERE cookie='" + mycookie["id"]
                            + "' AND id ='" + mycookie["user"] + "';";
                        user = usQuery.ExecuteReader();
                        if (user.Read())//админ вошёл в систему!
                        {
                            Button1.Visible = true;
                            choosed.Visible = true;
                            pleaseReg.Visible = false;
                            adminsGrid.Visible = true;
                            usersGrid.Visible = false;

                        }
                        user.Close();
                    }
                }
            }
            catch (Exception err)
            {
                Response.Output.Write("Описание ошибки: " + err.Message);
            }
            finally
            {
                con.Close();
            }


        }

        protected void choosed_SelectedIndexChanged(object sender, EventArgs e)
        {

            switch (choosed.SelectedValue)
            {
                case "all":
                    {
                        TextBox1.Visible = false;
                        break;
                    }
                case "name":
                    {
                        TextBox1.Visible = true;
                        break;
                    }
                case "brand":
                    {
                        TextBox1.Visible = true;
                        break;
                    }
                case "category_id":
                    {
                        TextBox1.Visible = true;
                        break;
                    }
                case "price":
                    {
                        TextBox1.Visible = true;
                        break;
                    }
            }
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            string SelectedString = "";
            TextBox1.Text.ToLower();

            switch (choosed.SelectedValue)
            {
                case "all":
                    {
                        SelectedString = "SELECT * FROM [products]";
                        break;
                    }
                case "name":
                    {
                        SelectedString = @"SELECT * FROM [products] WHERE LOWER([name]) like '%" +
                            TextBox1.Text + "%')";
                        break;
                    }
                case "brand":
                    {
                        SelectedString = @"SELECT * FROM [products] WHERE LOWER([brand]) like '%" +
                            TextBox1.Text + "%'";
                        break;
                    }
                case "category_id":
                    {
                        SelectedString = @"SELECT * FROM [products] WHERE LOWER([category]) like '%" +
                           TextBox1.Text + "%'";
                        break;
                    }
                case "price":
                    {
                        SelectedString = @"SELECT * FROM [products] WHERE LOWER([price]) like '%" +
                          TextBox1.Text + "%'";
                        break;
                    }
            }

            SqlDataSource1.SelectCommand = SelectedString;
            // Response.Output.Write(SqlDataSource1.SelectCommand);
        }
    }
}


*/