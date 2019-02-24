<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Registration.aspx.cs" Inherits="MediaBase.Registration" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head2" runat="server">
   <link rel="Stylesheet" type="text/css" href="common.css" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    </head>
<body>
    <div class ="header">Контакты</div>
        <div class ="menu" runat="server" id="Vlad">
          <a href ="Default.aspx">Главная</a>
            <a href ="view.aspx">Просмотр</a>
            <a href ="redact.aspx">Добавить товар</a>
            <a href ="Contakts.aspx">Контакты</a>
        </div>
    <form id="form2" runat="server">
    <div>
    
        <h1>Регистрация нового пользователия</h1>
    
    </div>
         <asp:ValidationSummary ID="ValidationSummary1" runat="server" CssClass="text-danger" />
        <p>
            Ваш логин</p>
           <asp:TextBox ID="LoginNew" runat="server" Text='<%# Bind("login") %>'  ></asp:TextBox>
       
        <br />
        E-mail<br />
        <asp:TextBox ID="MailBox" runat="server" Text='<%# Bind("email") %>' ></asp:TextBox>
       
        <br />
        <p>
            Ваш пароль</p>
        <p>
            <asp:TextBox ID="Password1" runat="server"></asp:TextBox>
         
        </p>
        <p>
            Подтвердите пароль</p>
        <asp:TextBox ID="ConfirmPassword1" runat="server" Text ='<%# Bind ("password") %> '></asp:TextBox>
         
        <p>
            <asp:Button ID="RegButton1" runat="server" commandname="RegUser" OnClick="RegButton1_Click" Text="Зарегистрироваться" />
        </p>
         <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConflictDetection="CompareAllValues"
             ConnectionString="Data Source=(LocalDB)\v11.0;AttachDbFilename=|DataDirectory|\MediaBase.mdf;Integrated Security=True"
            InsertCommand="INSERT INTO [users] ([login], [email], [password]) VALUES (@login, @email, @password,)" OldValuesParameterFormatString="original_{0}" ProviderName="System.Data.SqlClient" >
             <InsertParameters>
                <asp:Parameter Name="login" Type="String" />
                <asp:Parameter Name="email" Type="String" />
                <asp:Parameter Name="password" Type="String" />
             </InsertParameters>
               </asp:SqlDataSource>
    </form>
</body>
</html>



