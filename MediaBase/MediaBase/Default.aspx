<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="MediaBase.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <link rel="Stylesheet" type="text/css" href="common.css" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Добро пожаловать!</title>
</head>
<body>
    <form id="form1" runat="server">
        <table class ="header">
            <tr>
              <td width ="80%">
                    <div>МедиаБаза</div>
                </td>
               <td>
                   <span id="hello" style="font-size:14pt; color:red;" runat="server" visible="false"></span>
                   <div id="Reg" style="color:red; font-size:9pt;" runat="server">
                       <p style="font-size:1.5em;">Авторизация:</p>
                       Ваш логин:<br />
                       <input id="Log" type="text" runat="server"/><br />
                       Ваш пароль:<br />
                       <input id="Pass" type="password" runat="server"/><br />
                       <input type="submit" value="Войти" /> <br />
                      <a href ="registration.aspx" style="color:red;">У Вас еще нет учетной записи?</a> 

                   </div>
                    <asp:Button ID="exit" runat="server" Text="Выйти." Visible="False" OnClick="exit_Click" />
               </td>
            </tr>
        </table>
        <div class ="menu">
             <a href ="default.aspx">Главная</a>
            <a href ="view.aspx">Просмотр</a>
            <a href ="redact.aspx">Добавить товар</a>
            <a href ="Contacts.aspx">Контакты</a>
        </div>
    <div class ="content">
        <br />
    Данный портал представляет собой базу магазина. Сайт предназначен для сотрудников магазина.
        Для выполнения действий на сайте необходимо пройти авторизацию<br />
        <br /><h2>Что Вы можете сделать на сайте?</h2><br />
        <strong>Просмотр имеющихся товаров.</strong> Нажав вкладку меню <i>Просмотр</i> Вам будет показан список имеющихся товаров на складе<br />
        <strong>Добавить товар</strong> Данная операция доступна только администраторам сайта.
        <br />
    </div>
    </form>
    <p>
        &nbsp;</p>
</body>
</html>
