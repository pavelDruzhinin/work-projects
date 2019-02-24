using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;

namespace MediaBase
{
    public partial class Default : System.Web.UI.Page
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
                if (mycookie == null && (Log.Value != "" && Pass.Value != ""))
                {
                    string userid = "", username = "";
                    usQuery.CommandText = @"SELECT * FROM users WHERE login ='"
                        + Log.Value + @"'AND password='" + Pass.Value + "';";

                    user = usQuery.ExecuteReader();

                    if (user.Read())
                    {
                        userid = "" + Convert.ToString(user["id"]);
                        username = "" + Convert.ToString(user["name"]);
                        user.Close();
                        Random rnd = new Random();
                        string cookiestring = "";
                        for (int i = 0; i < 10; i++)
                            cookiestring += Convert.ToChar('a' + rnd.Next(25));
                        usQuery.CommandText = "UPDATE users SET cookie='" +
                            cookiestring + "' WHERE id=" + userid + ";";
                        usQuery.ExecuteNonQuery();
                        mycookie = new HttpCookie("Settings");
                        mycookie["user"] = userid;
                        mycookie["id"] = cookiestring;
                        mycookie["admin"] = "no";
                        Response.Cookies.Add(mycookie);
                        hello.InnerHtml = "<h2>Hello," + '\r' + user["name"] +
                            "</h2>" + '\r';
                        hello.Visible = exit.Visible = true;
                        Reg.Visible = false;
                    }
                    usQuery.CommandText = @"SELECT * FROM admins WHERE login ='"
                        + Log.Value + @"'AND password='" + Pass.Value + "';";
                    user.Close();
                    user = usQuery.ExecuteReader();

                    if (user.Read())
                    {
                        userid = "" + Convert.ToString(user["id"]);
                        username = "" + Convert.ToString(user["name"]);
                        user.Close();
                        Random rnd = new Random();
                        string cookiestring = "";
                        for (int i = 0; i < 10; i++)
                            cookiestring += Convert.ToChar('a' + rnd.Next(25));
                        usQuery.CommandText = "UPDATE admins SET cookie='" +
                            cookiestring + "' WHERE id=" + userid + ";";
                        usQuery.ExecuteNonQuery();
                        mycookie = new HttpCookie("Settings");
                        mycookie["user"] = userid;
                        mycookie["id"] = cookiestring;
                        mycookie["admin"] = "yes";
                        Response.Cookies.Add(mycookie);
                        hello.InnerHtml = "<h2>Hello," + '\r' + user["login"] +
                            "</h2>" + '\r';
                        hello.Visible = exit.Visible = true;
                        Reg.Visible = false;

                    }

                }
                else if (mycookie != null)
                {
                    if (mycookie["admin"].Equals("no"))
                    {
                        usQuery.CommandText = "SELECT * FROM users WHERE cookie='" + mycookie["id"]
                            + "' AND id ='" + mycookie["user"] + "';";
                        user = usQuery.ExecuteReader();
                        if (user.Read())
                            hello.InnerHtml = "<h2>Hello," + '\r' + user["name"] +
                                "</h2>" + '\r';
                        user.Close();
                    }
                    if (mycookie["admin"].Equals("yes"))
                    {
                        usQuery.CommandText = "SELECT * FROM admins WHERE cookie='" + mycookie["id"]
                            + "' AND id ='" + mycookie["user"] + "';";
                        user = usQuery.ExecuteReader();
                        if (user.Read())
                            hello.InnerHtml = "<h2>Hello," + '\r' + user["login"] +
                                "</h2>" + '\r';
                        user.Close();
                    }
                    exit.Visible = hello.Visible = true;
                    Reg.Visible = false;
                }

            }
            catch (Exception err)
            {
                Response.Output.Write("Описание ошибки: " + err.Message + err.Source);
            }
            finally
            {
                con.Close();

            }

        }

        protected void exit_Click(object sender, EventArgs e)
        {
            string connectionstring = @"Data Source =(LocalDB)\v11.0; AttachDBFilename = |DataDirectory|\MediaBase.mdf"
+ ";Integrated Security=True;";
            SqlConnection con = new SqlConnection(connectionstring);
            try
            {
                con.Open();
                SqlCommand query = con.CreateCommand();
                HttpCookie mycookie = Request.Cookies["Settings"];
                query.CommandText = "UPDATE users SET cookie=NULL WHERE cookie='" +
                mycookie["id"] + "' And id='" +
                mycookie["user"] + "';";
                query.ExecuteNonQuery();
                mycookie.Expires = DateTime.Now.AddDays(-1);
                Response.Cookies.Add(mycookie);
                con.Close();
                exit.Visible = hello.Visible = false;
                Reg.Visible = true;
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