var TotalRow = (function () {
    function TotalRow(name) {
        this.Name = name;
        this.Total = 0;
        this.TotalQuantity = 0;
    }
    return TotalRow;
})();

var Product = (function () {
    function Product() {
    }
    return Product;
})();

var ProductViewModel = (function () {
    function ProductViewModel() {
        this.products = [];
    }
    ProductViewModel.prototype.putProducts = function (Products) {
        Products.forEach(function (p) {
            p.Total = p.Quantity * p.Price;
            this.products.push(p);
        }, this);
    };

    ProductViewModel.prototype.getTd = function (data) {
        return '<td class="center">' + data + '</td>';
    };

    ProductViewModel.prototype.showProductsInPage = function () {
        var productTbody = document.getElementById("products");
        var total = new TotalRow("Total");

        this.products.forEach(function (p) {
            var productRow = document.createElement("tr");
            productRow.innerHTML = '<td class="center">' + p.Name + '</td>' + '<td class="center">' + p.Price + '</td>' + '<td class="center"><input class="grey" type="button" value="+" /><span>' + p.Quantity + '</span><input class="grey" type="button" value="-" /></td>' + '<td class="center">' + p.Total + '</td>';

            productTbody.appendChild(productRow);

            total.Total += +p.Total;
            total.TotalQuantity += +p.Quantity;
        });

        var footerTable = document.getElementById("productFooter");
        var totalRow = document.createElement("tr");
        totalRow.innerHTML = this.getTd("") + this.getTd(total.Name) + this.getTd(total.TotalQuantity) + this.getTd(total.Total);
        footerTable.appendChild(totalRow);
    };
    return ProductViewModel;
})();

var productView = new ProductViewModel();

$.get("/TypeScript/GetProducts/", function (data) {
    productView.putProducts(data);
    productView.showProductsInPage();
});
