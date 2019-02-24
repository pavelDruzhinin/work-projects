<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="View.aspx.cs" Inherits="MediaBase.View" %>

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
<asp:DropDownList ID="choosed" runat="server" Height="26px" Width="484px" Visible ="false" OnSelectedIndexChanged="choosed_SelectedIndexChanged">
<asp:ListItem Value="all">Искать все</asp:ListItem>
<asp:ListItem Value="brand">Искать по бренду</asp:ListItem>
<asp:ListItem Value="name">Искать по названию</asp:ListItem>
<asp:ListItem Value="price">Искать по цене</asp:ListItem>
<asp:ListItem Value="category">искать по категориям</asp:ListItem>
</asp:DropDownList>
<asp:TextBox ID="TextBox1" runat="server" Width="204px" Visible ="false" Height="16px"/>
<asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Найти" Visible="False" />
<asp:GridView ID="adminsGrid" runat="server" AutoGenerateColumns="False" DataKeyNames="id" 
DataSourceID="SqlDataSource1" Height="170px" Width="1200px" BackColor="Linen" BorderColor="Linen" BorderWidth="5px" CellPadding="1" ForeColor="Black" AllowCustomPaging="True" AllowPaging="True" Font-Bold="False" Font-Italic="False" Font-Overline="False" Font-Strikeout="False" Font-Underline="False" HorizontalAlign="Left" PageIndex="3" CellSpacing="4">
<AlternatingRowStyle BackColor="White" />
<Columns>
<asp:CommandField ShowDeleteButton="True" ShowEditButton="True" />
<asp:BoundField DataField="id" HeaderText="id" ReadOnly="True" SortExpression="id" />
<asp:BoundField DataField="name" HeaderText="name" SortExpression="name" />
<asp:BoundField DataField="brand" HeaderText="brand" SortExpression="brand" />
<asp:BoundField DataField="category_id" HeaderText="category_id" SortExpression="category_id" />
<asp:BoundField DataField="price" HeaderText="price" SortExpression="price" />
<asp:BoundField DataField="description" HeaderText="description" SortExpression="description" />
<asp:BoundField DataField="year" HeaderText="year" SortExpression="year" />
</Columns>
<FooterStyle BackColor="#FF6600" />
<HeaderStyle BackColor="Linen" Font-Bold="True" />
<PagerStyle BackColor="White" ForeColor="DarkSlateBlue" HorizontalAlign="Center" />
<SelectedRowStyle BackColor="Red" ForeColor="GhostWhite" />
<SortedAscendingCellStyle BackColor="#FAFAE7" />
<SortedAscendingHeaderStyle BackColor="#DAC09E" />
<SortedDescendingCellStyle BackColor="Red" />
<SortedDescendingHeaderStyle BackColor="#C2A47B" />
</asp:GridView>
<asp:SqlDataSource ID="SqlDataSource1" runat="server" ConflictDetection="CompareAllValues" ConnectionString="Data Source=(LocalDB)\v11.0;AttachDbFilename=|DataDirectory|\MediaBase.mdf;Integrated Security=True"
DeleteCommand="DELETE FROM [products] WHERE [id] = @original_id AND (([name] = @original_name) OR ([name] IS NULL AND @original_name IS NULL)) AND (([brand] = @original_brand) OR ([brand] IS NULL AND @original_brand IS NULL)) AND (([category_id] = @original_category_id) OR ([category_id] IS NULL AND @original_category_id IS NULL)) AND (([price] = @original_price) OR ([price] IS NULL AND @original_price IS NULL)) AND (([description = @original_description) OR ([description] IS NULL AND @original_stock IS NULL)) AND (([year] = @original_year) OR ([year] IS NULL AND @original_year IS NULL))"
InsertCommand="INSERT INTO [products] ([id], [name], [brand], [category_id], [price], [description], [year]) VALUES (@id, @name, @brand, @category_id, @price, @description,
22:57:39	
@year)"
OldValuesParameterFormatString="original_{0}" ProviderName="System.Data.SqlClient" 
SelectCommand="SELECT * FROM [products]"
UpdateCommand="UPDATE [products] SET [name] = @name, [brand] = @brand, [category_id] = @category_id, [price] = @price, [description] = @description, [year] = @year WHERE [id] = @original_id AND (([name] = @original_name) OR ([name] IS NULL AND @original_name IS NULL)) AND (([brand] = @original_brand) OR ([brand] IS NULL AND @original_brand IS NULL)) AND (([category] = @original_category) OR ([category] IS NULL AND @original_category IS NULL)) AND (([price] = @original_price) OR ([price] IS NULL AND @original_price IS NULL)) AND (([description] = @original_description) OR ([description] IS NULL AND @original_description IS NULL)) AND (([year] = @original_year) OR ([year] IS NULL AND @original_year IS NULL))">
<DeleteParameters>
<asp:Parameter Name="original_id" Type="Int32" />
<asp:Parameter Name="original_name" Type="String" />
<asp:Parameter Name="original_brand" Type="String" />
<asp:Parameter Name="original_category_id" Type="String" />
<asp:Parameter Name="original_price" Type="String" />
<asp:Parameter Name="original_description" Type="String" />
<asp:Parameter Name="original_year" Type="String" />
</DeleteParameters>
<InsertParameters>
<asp:Parameter Name="id" Type="Int32" />
<asp:Parameter Name="name" Type="String" />
<asp:Parameter Name="brand" Type="String" />
<asp:Parameter Name="category_id" Type="String" />
<asp:Parameter Name="price" Type="String" />
<asp:Parameter Name="description" Type="String" />
<asp:Parameter Name="year" Type="String" />
</InsertParameters>
<UpdateParameters>
<asp:Parameter Name="name" Type="String" />
<asp:Parameter Name="brand" Type="String" />
<asp:Parameter Name="category_id" Type="String" />
<asp:Parameter Name="price" Type="String" />
<asp:Parameter Name="description" Type="String" />
<asp:Parameter Name="year" Type="String" />
<asp:Parameter Name="original_id" Type="Int32" />
<asp:Parameter Name="original_name" Type="String" />
<asp:Parameter Name="original_brand" Type="String" />
<asp:Parameter Name="original_category_id" Type="String" />
<asp:Parameter Name="original_price" Type="String" />
<asp:Parameter Name="original_description" Type="String" />
<asp:Parameter Name="original_year" Type="String" />
</UpdateParameters>
</asp:SqlDataSource>
<asp:GridView ID="usersGrid" runat="server" AutoGenerateColumns="False" BackColor="White"
BorderColor="#999999" BorderStyle="None" BorderWidth="1px" CellPadding="3" DataKeyNames="id" 
DataSourceID="SqlDataSource1" GridLines="Vertical" Visible="false">
<AlternatingRowStyle BackColor="#DCDCDC" />
<Columns>
<asp:BoundField DataField="id" HeaderText="id" ReadOnly="True" SortExpression="id" />
<asp:BoundField DataField="name" HeaderText="name" SortExpression="name" />
<asp:BoundField DataField="brand" HeaderText="brand" SortExpression="brand" />
<asp:BoundField DataField="category_id" HeaderText="category_id" SortExpression="category_id" />
<asp:BoundField DataField="price" HeaderText="price" SortExpression="price" />
<asp:BoundField DataField="description" HeaderText="description" SortExpression="description" />
<asp:BoundField DataField="year" HeaderText="year" SortExpression="year" />
</Columns>
<FooterStyle BackColor="#CCCCCC" ForeColor="Black" />
<HeaderStyle BackColor="#000084" Font-Bold="True" ForeColor="White" />
<PagerStyle BackColor="#999999" ForeColor="Black" HorizontalAlign="Center" />
<RowStyle BackColor="#EEEEEE" ForeColor="Black" />
<SelectedRowStyle BackColor="#008A8C" Font-Bold="True" ForeColor="White" />
<SortedAscendingCellStyle BackColor="#F1F1F1" />
<SortedAscendingHeaderStyle BackColor="#0000A9" />
<SortedDescendingCellStyle BackColor="#CAC9C9" />
<SortedDescendingHeaderStyle BackColor="#000065" />
</asp:GridView>
</form>
</body>
</html>