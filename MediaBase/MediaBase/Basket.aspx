<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="view.aspx.cs" Inherits="МедиаБаза.view" %>

<!DOCTYPE html>
<link rel="Stylesheet" type="text/css" href="common.css" />
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>МедиаБаза</title>
</head>
<body>
    <form id="form1" runat="server">
    <div class ="header">Просмотр товаров</div>
        <div class ="menu">
            <a href="Default.aspx">Главная</a>
            <a href="view.aspx">Просмотр</a>
            <a href ="redact.aspx">Добавить товар</a>
            <a href="Contakts.aspx">Контакты</a>
        </div>
        <div id ="pleaseReg" runat ="server">Пожалуйста, пройдите авторизайию!</div>
      
        
 
      
        <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" DataKeyNames="order_detail_id" DataSourceID="SqlDataSource1">
            <Columns>
                <asp:BoundField DataField="order_detail_id" HeaderText="order_detail_id" InsertVisible="False" ReadOnly="True" SortExpression="order_detail_id" />
                <asp:BoundField DataField="order_id" HeaderText="order_id" SortExpression="order_id" />
                <asp:BoundField DataField="username" HeaderText="username" SortExpression="username" />
                <asp:BoundField DataField="product_id" HeaderText="product_id" SortExpression="product_id" />
                <asp:BoundField DataField="quantity" HeaderText="quantity" SortExpression="quantity" />
                <asp:BoundField DataField="unit_price" HeaderText="unit_price" SortExpression="unit_price" />
            </Columns>
        </asp:GridView>
      
        
 
      
    </form>
</body>
</html>
