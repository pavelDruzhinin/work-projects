
declare var $;

class TotalRow
{
    Name: string;
    TotalQuantity: number;
    Total: number;

    constructor(name: string)
    {
        this.Name = name;
        this.Total = 0;
        this.TotalQuantity = 0;
    }
}

class Product
{
    Id: number;
    Name: string;
    Price: number;
    Quantity: number;
    Total: number;
}


// Interface
interface IProductViewModel
{
    showProductsInPage();
    putProducts(Products: Product[]);
}

class ProductViewModel implements IProductViewModel
{
    private products: Product[];


    constructor()
    {
        this.products = [];
    }

    putProducts(Products: Product[])
    {
        Products.forEach(function (p)
        {
            p.Total = p.Quantity * p.Price;
            this.products.push(p);
        }, this);
    }

    getTd(data: any)
    {
        return '<td class="center">' + data + '</td>';
    }

    showProductsInPage()
    {
        var productTbody = <HTMLTableSectionElement>document.getElementById("products");
        var total: TotalRow = new TotalRow("Total");

        this.products.forEach(function (p)
        {
            var productRow = <HTMLTableRowElement>document.createElement("tr");
            productRow.innerHTML = '<td class="center">' + p.Name + '</td>'
            + '<td class="center">' + p.Price + '</td>'
            + '<td class="center"><input class="grey" type="button" value="+" /><span>'
            + p.Quantity + '</span><input class="grey" type="button" value="-" /></td>'
            + '<td class="center">' + p.Total + '</td>';

            productTbody.appendChild(productRow);

            total.Total += +p.Total;
            total.TotalQuantity += +p.Quantity;
        });

        var footerTable = document.getElementById("productFooter"); 
        var totalRow = <HTMLTableRowElement>document.createElement("tr");
        totalRow.innerHTML = this.getTd("") + this.getTd(total.Name) + this.getTd(total.TotalQuantity) + this.getTd(total.Total);
        footerTable.appendChild(totalRow);
    }
}

var productView: IProductViewModel = new ProductViewModel();

$.get("/TypeScript/GetProducts/", function (data)
{
    productView.putProducts(data);
    productView.showProductsInPage();
});