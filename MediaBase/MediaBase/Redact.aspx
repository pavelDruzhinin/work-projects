<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="redact.aspx.cs" Inherits="MediaBase.Redact" %>

<!DOCTYPE html>
 <link rel="Stylesheet" type="text/css" href="common.css" />
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Добавить</title>
</head>
<body>
    <form id="form1" runat="server">
        <div class ="header">Добавить новый продукт</div>
        <div class ="menu">
            <a href ="Default.aspx">Главная</a>
            <a href ="view.aspx">Просмотр</a>
            <a href ="redact.aspx">Добавить товар</a>
            <a href ="Contakts.aspx">Контакты</a>
        </div>
   <div id="notReg" runat="server" >Только администраторы могут выполнять данную процедуру.</div>
        <asp:ListView ID="ListView1" runat="server" DataKeyNames="id" DataSourceID="SqlDataSource1" 
         InsertItemPosition="LastItem" Visible ="False">
            <AlternatingItemTemplate>
                <tr style="background-color: #FFFFFF;color: linen;">
                    <td></td>
                    <td>
                        <asp:Label ID="idLabel" runat="server" Text='<%# Eval("id") %>' />
                    </td>
                    <td>
                        <asp:Label ID="nameLabel" runat="server" Text='<%# Eval("name") %>' />
                    </td>
                    <td>
                        <asp:Label ID="autorLabel" runat="server" Text='<%# Eval("brand") %>' />
                    </td>
                    <td>
                        <asp:Label ID="teacherLabel" runat="server" Text='<%# Eval("category") %>' />
                    </td>
                    <td>
                        <asp:Label ID="universityLabel" runat="server" Text='<%# Eval("price") %>' />
                    </td>
                    <td>
                        <asp:Label ID="cityLabel" runat="server" Text='<%# Eval("description") %>' />
                    </td>
                    <td>
                        <asp:Label ID="yearLabel" runat="server" Text='<%# Eval("year") %>' />
                    </td>
                </tr>
            </AlternatingItemTemplate>
            <EditItemTemplate>
                <tr style="background-color: #999999;">
                    <td>
                        <asp:Button ID="UpdateButton" runat="server" CommandName="Update" Text="Обновить" />
                        <asp:Button ID="CancelButton" runat="server" CommandName="Cancel" Text="Отмена" />
                    </td>
                    <td>
                        <asp:Label ID="idLabel1" runat="server" Text='<%# Eval("id") %>' />
                    </td>
                    <td>
                        <asp:TextBox ID="nameTextBox" runat="server" Text='<%# Bind("name") %>' />
                    </td>
                    <td>
                        <asp:TextBox ID="autorTextBox" runat="server" Text='<%# Bind("brand") %>' />
                    </td>
                    <td>
                        <asp:TextBox ID="teacherTextBox" runat="server" Text='<%# Bind("category") %>' />
                    </td>
                    <td>
                        <asp:TextBox ID="universityTextBox" runat="server" Text='<%# Bind("price") %>' />
                    </td>
                    <td>
                        <asp:TextBox ID="cityTextBox" runat="server" Text='<%# Bind("description") %>' />
                    </td>
                    <td>
                        <asp:TextBox ID="yearTextBox" runat="server" Text='<%# Bind("year") %>' />
                    </td>
                </tr>
            </EditItemTemplate>
            <EmptyDataTemplate>
                <table id="Table1" runat="server" style="background-color: #FFFFFF;border-collapse: collapse;border-color: #999999;border-style:none;border-width:1px;">
                    <tr>
                        <td>Нет данных.</td>
                    </tr>
                </table>
            </EmptyDataTemplate>
            <InsertItemTemplate>
                <tr style="font-size:10pt;">
                    <td>
                        <asp:Button ID="InsertButton" runat="server" CommandName="Insert" Text="Вставить" />
                        <asp:Button ID="CancelButton" runat="server" CommandName="Cancel" Text="Очистить" />
                    </td>
                    <td>
                        <asp:TextBox ID="idTextBox" runat="server" Text='<%# Bind("id") %>' />
                    </td>
                    <td>
                        <asp:TextBox ID="nameTextBox" runat="server" Text='<%# Bind("name") %>' />
                    </td>
                    <td>
                        <asp:TextBox ID="autorTextBox" runat="server" Text='<%# Bind("brand") %>' />
                    </td>
                    <td>
                        <asp:TextBox ID="teacherTextBox" runat="server" Text='<%# Bind("category") %>' />
                    </td>
                    <td>
                        <asp:TextBox ID="universityTextBox" runat="server" Text='<%# Bind("price") %>' />
                    </td>
                    <td>
                        <asp:TextBox ID="cityTextBox" runat="server" Text='<%# Bind("description") %>' />
                    </td>
                    <td>
                        <asp:TextBox ID="yearTextBox" runat="server" Text='<%# Bind("year") %>' />
                    </td>
                </tr>
            </InsertItemTemplate>
            <ItemTemplate>
                <tr style="background-color: linen;color: #333333;">
                    <td></td>
                    <td>
                        <asp:Label ID="idLabel" runat="server" Text='<%# Eval("id") %>' />
                    </td>
                    <td>
                        <asp:Label ID="nameLabel" runat="server" Text='<%# Eval("name") %>' />
                    </td>
                    <td>
                        <asp:Label ID="autorLabel" runat="server" Text='<%# Eval("brand") %>' />
                    </td>
                    <td>
                        <asp:Label ID="teacherLabel" runat="server" Text='<%# Eval("category") %>' />
                    </td>
                    <td>
                        <asp:Label ID="universityLabel" runat="server" Text='<%# Eval("price") %>' />
                    </td>
                    <td>
                        <asp:Label ID="cityLabel" runat="server" Text='<%# Eval("description") %>' />
                    </td>
                    <td>
                        <asp:Label ID="yearLabel" runat="server" Text='<%# Eval("year") %>' />
                    </td>
                </tr>
            </ItemTemplate>
            <LayoutTemplate>
                <table id="Table2" runat="server">
                    <tr id="Tr1" runat="server">
                        <td id="Td1" runat="server">
                            <table id="itemPlaceholderContainer" runat="server" border="1" style="background-color: #FFFFFF;border-collapse: collapse;border-color: #999999;border-style:none;border-width:1px;font-family: Verdana, Arial, Helvetica, sans-serif;">
                                <tr id="Tr2" runat="server" style="background-color: linen;color: #333333;">
                                    <th id="Th1" runat="server"></th>
                                    <th id="Th2" runat="server">id</th>
                                    <th id="Th3" runat="server">name</th>
                                    <th id="Th4" runat="server">brand</th>
                                    <th id="Th5" runat="server">category</th>
                                    <th id="Th6" runat="server">price</th>
                                    <th id="Th7" runat="server">description</th>
                                    <th id="Th8" runat="server">year</th>
                                </tr>
                                <tr id="itemPlaceholder" runat="server">
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr id="Tr3" runat="server">
                        <td id="Td2" runat="server" style="text-align: center;background-color: linen;font-family: Verdana, Arial, Helvetica, sans-serif;color: #FFFFFF"></td>
                    </tr>
                </table>
            </LayoutTemplate>
            <SelectedItemTemplate>
                <tr style="background-color: linen;font-weight: bold;color: #333333;">
                    <td></td>
                    <td>
                        <asp:Label ID="idLabel" runat="server" Text='<%# Eval("id") %>' />
                    </td>
                    <td>
                        <asp:Label ID="nameLabel" runat="server" Text='<%# Eval("name") %>' />
                    </td>
                    <td>
                        <asp:Label ID="autorLabel" runat="server" Text='<%# Eval("brand") %>' />
                    </td>
                    <td>
                        <asp:Label ID="teacherLabel" runat="server" Text='<%# Eval("category") %>' />
                    </td>
                    <td>
                        <asp:Label ID="universityLabel" runat="server" Text='<%# Eval("price") %>' />
                    </td>
                    <td>
                        <asp:Label ID="cityLabel" runat="server" Text='<%# Eval("description") %>' />
                    </td>
                    <td>
                        <asp:Label ID="yearLabel" runat="server" Text='<%# Eval("year") %>' />
                    </td>
                </tr>
            </SelectedItemTemplate>
        </asp:ListView>
        <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConflictDetection="CompareAllValues"
             ConnectionString="Data Source=(LocalDB)\v11.0;AttachDbFilename=|DataDirectory|\MediaBase.mdf;Integrated Security=True"
             DeleteCommand="DELETE FROM [products] WHERE [id] = @original_id AND (([name] = @original_name) OR ([name] IS NULL AND @original_name IS NULL)) AND (([brand] = @original_brand) OR ([brand] IS NULL AND @original_brand IS NULL)) AND (([category] = @original_category) OR ([category] IS NULL AND @original_category IS NULL)) AND (([price] = @original_price) OR ([price] IS NULL AND @original_price IS NULL)) AND (([description] = @original_description) OR ([description] IS NULL AND @original_description IS NULL)) AND (([year] = @original_year) OR ([year] IS NULL AND @original_year IS NULL))" 
            InsertCommand="INSERT INTO [products] ([id], [name], [brand], [category_id], [price], [description], [year]) VALUES (@id, @name, @brand, @category, @price, @description, @year)" OldValuesParameterFormatString="original_{0}" ProviderName="System.Data.SqlClient" 
            SelectCommand="" 
            UpdateCommand="UPDATE [products] SET [name] = @name, [brand] = @brand, [category] = @category, [price] = @price, [description] = @description, [year] = @year WHERE [id] = @original_id AND (([name] = @original_name) OR ([name] IS NULL AND @original_name IS NULL)) AND (([brand] = @original_brand) OR ([brand] IS NULL AND @original_brand IS NULL)) AND (([category_id] = @original_category_id) OR ([category_id] IS NULL AND @original_category_id IS NULL)) AND (([price] = @original_price) OR ([price] IS NULL AND @original_price IS NULL)) AND (([description] = @original_description) OR ([description] IS NULL AND @original_description IS NULL)) AND (([year] = @original_year) OR ([year] IS NULL AND @original_year IS NULL))">
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
   
    </form>
</body>
</html>