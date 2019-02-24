/*using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;

namespace MediaBase
{
    public partial class redact : System.Web.UI.Page
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
                if (mycookie != null)
                {
                    if (mycookie["admin"].Equals("yes"))
                    {
                        usQuery.CommandText = "SELECT * FROM admins WHERE cookie='" + mycookie["id"]
                            + "' AND id ='" + mycookie["user"] + "';";
                        user = usQuery.ExecuteReader();
                        if (user.Read())//админ вошёл в систему
                        {
                            ListView1.Visible = true;
                            notReg.Visible = false;
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
    }
}

*/