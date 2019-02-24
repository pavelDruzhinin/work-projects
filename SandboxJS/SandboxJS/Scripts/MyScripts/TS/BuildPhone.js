var OptionModel = (function () {
    function OptionModel() {
    }
    return OptionModel;
})();

var Phone = (function () {
    function Phone() {
    }
    return Phone;
})();

var City = (function () {
    function City(Id, PhoneCode, Name) {
        this.Id = Id;
        this.PhoneCode = PhoneCode;
        this.Name = Name;
    }
    return City;
})();

var Address = (function () {
    function Address(PostalCode, CityName, StateCode, BillingTo) {
        this.PostalCode = PostalCode;
        this.CityName = CityName;
        this.StateCode = StateCode;
    }
    return Address;
})();

var Cities = (function () {
    function Cities() {
        this.cities = [
            new City(0, "78142", "Petrozavodsk"),
            new City(1, "78112", "Pskov"),
            new City(2, "78152", "Murmansk")
        ];
    }
    Cities.prototype.getCityByName = function (name) {
        for (var i = 0; i < this.cities.length; i++) {
            if (this.cities[i].Name == name)
                return this.cities[i];
        }

        return new City(4, "", "");
    };

    Cities.prototype.getCityById = function (id) {
        for (var i = 0; i < this.cities.length; i++) {
            if (this.cities[i].Id == id)
                return this.cities[i];
        }

        return new City(4, "", "");
    };

    Cities.prototype.getAll = function () {
        return this.cities;
    };
    return Cities;
})();

// Module
var Phones;
(function (Phones) {
    // Class
    var PhoneBuild = (function () {
        // Constructor
        function PhoneBuild(num, cityName) {
            this.num = num;
            this.cityName = cityName;
            this.cities = new Cities();
            this.errorMessages = ["Don't have errors", "Phone must consist of 6 or 11 digits."];
            var code = this.cities.getCityByName(cityName).PhoneCode;
            this.phone = this.buildPhone(num, code);
        }
        //Private Methods
        PhoneBuild.prototype.clearPhone = function (reg) {
            var re = /\W|\D/g;
            return reg.replace(re, "");
        };

        PhoneBuild.prototype.buildPhone = function (num, code) {
            num = this.clearPhone(num);

            var p = { Code: "", Number: num, Fax: false };

            if (num.length == 6 && code != "") {
                p = { Code: code.substring(0, 4), Fax: false, Number: (code + num).substring(4) };
            }

            if (num.length == 10 && num[0] == '8') {
                p = { Code: '7' + num.substring(0, 3), Fax: false, Number: num.substring(3) };
            }

            if (num.length == 11) {
                p = { Code: this.clearCode(num), Fax: false, Number: num.substring(4) };
            }

            return p;
        };

        PhoneBuild.prototype.clearCode = function (num) {
            if (num[0] != '7')
                num = '7' + num.substring(1);

            return num.substring(0, 4);
        };

        // Instance member
        PhoneBuild.prototype.showPhone = function () {
            return this.phone.Code + this.phone.Number;
        };

        PhoneBuild.prototype.checkPhone = function () {
            return this.phone.Number.length == 7 && this.phone.Code.length > 0;
        };

        PhoneBuild.prototype.showError = function () {
            if (!this.checkPhone())
                return this.errorMessages[1];

            return this.errorMessages[0];
        };
        return PhoneBuild;
    })();
    Phones.PhoneBuild = PhoneBuild;
})(Phones || (Phones = {}));

var CheckPhoneViewModel = (function () {
    function CheckPhoneViewModel() {
        this.cities = new Cities().getAll();
        this.selectCity = document.getElementById("citySelect");
        this.inputPhoneTextBox = document.getElementById("inputPhone");
        this.outputPhoneTextBox = document.getElementById("outputPhone");
        this.validSpanTextField = document.getElementById("validSpan");

        this.initViewModel();
    }
    CheckPhoneViewModel.prototype.checkPhone = function () {
        var input = this.inputPhoneTextBox.value;
        var cityId = this.selectCity.value;

        var cityName = this.cities[cityId].Name;

        var phone = new Phones.PhoneBuild(input, cityName);

        this.outputPhoneTextBox.value = phone.showPhone();

        if (phone.checkPhone())
            this.showValidSpan('none', '');
else
            this.showValidSpan('block', phone.showError());
    };

    CheckPhoneViewModel.prototype.showValidSpan = function (displaySetting, text) {
        this.validSpanTextField.style.display = displaySetting;
        this.validSpanTextField.innerText = text;
    };

    CheckPhoneViewModel.prototype.initViewModel = function () {
        for (var i = 0; i < this.cities.length; i++) {
            var option = this.generateOption({ Value: i.toString(), Text: this.cities[i].Name });
            this.selectCity.appendChild(option);
        }
    };

    CheckPhoneViewModel.prototype.generateOption = function (city) {
        var option = document.createElement("option");
        option.value = city.Value;
        option.text = city.Text;

        return option;
    };
    return CheckPhoneViewModel;
})();

// Local variable
var checkPhoneViewModel = new CheckPhoneViewModel();
var checkPhoneButton = document.getElementById("checkPhone");
var inputPhoneTextBox = document.getElementById("inputPhone");
var citySelect = document.getElementById("citySelect");

citySelect.onchange = function () {
    checkPhoneViewModel.checkPhone();
};

inputPhoneTextBox.onchange = function () {
    checkPhoneViewModel.checkPhone();
};

checkPhoneButton.onclick = function () {
    checkPhoneViewModel.checkPhone();
};
