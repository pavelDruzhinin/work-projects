<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Contacts.aspx.cs" Inherits="MediaBase.Registr" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
   <link rel="Stylesheet" type="text/css" href="common.css" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <style type="text/css">
        .auto-style1 {
            font-size: x-large;
            text-align: right;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div class ="header">Контакты</div>
        <div class ="menu" runat="server" id="Vlad">
          <a href ="Default.aspx">Главная</a>
            <a href ="view.aspx">Просмотр</a>
            <a href ="redact.aspx">Добавить товар</a>
            <a href ="Contakts.aspx">Контакты</a>
        </div><div class ="content">
            Веб-приложение является курсовой работой студента<br />
            КФУ ИВМиИТ
            <br />
            <span class="auto-style1">Горбунова Владислава Маратовича</span></div>
        <div style="text-align: left">
            <strong>Список литературы:</strong><br />
            <em>Мак-Дональд М., Фримен А., Шпушта М.</em> Microsoft ASP.NET 4 с примерами на C# 2010 для профессионалов - 2011<br />
            <em>Мальчук, Е.В.</em> М21 HTML и CSS. Самоучитель.<br />
            Сайт о программировании и IT-технологиях<strong> METANIT.COM</strong><br />
            Материалы компании Microsoft из<strong> msdn.com</strong>, блоги в <strong>habrahabr.ru</strong> и различные форумы, которые помогли решить возникшие проблемы с новыми версиями Visual Studio 2012 и MS SQL Server 2012.</div>
    </form>
    <p style="font-size: small; text-align: center">
        Казань, 2014</p>
    <p style="font-size: small; text-align: right">
        &nbsp;</p>
</body>
</html>
