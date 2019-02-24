// Interface
interface IPhoneBuild
{
    showPhone(): string;
    checkPhone(): boolean;
    showError(): string;
}

class OptionModel
{
    Value: string;
    Text: string;
}


class Phone
{
    Code: string;
    Number: string;
    Fax: boolean;
}

class City
{
    constructor(public Id: number, public PhoneCode: string, public Name: string) { }
}

class Address
{
    constructor(public PostalCode: string, public CityName: string, public StateCode: string, BillingTo: string) { }
}

class Cities
{
    private cities: City[] = [
        new City(0, "78142", "Petrozavodsk"),
        new City(1, "78112", "Pskov"),
        new City(2, "78152", "Murmansk")
    ];

    public getCityByName(name: string)
    {
        for (var i = 0; i < this.cities.length; i++)
        {
            if (this.cities[i].Name == name)
                return this.cities[i];
        }

        return new City(4, "", "");
    }

    public getCityById(id: number)
    {
        for (var i = 0; i < this.cities.length; i++)
        {
            if (this.cities[i].Id == id)
                return this.cities[i];
        }

        return new City(4, "", "");
    }

    public getAll()
    {
        return this.cities;
    }
}


// Module
module Phones
{
    // Class
    export class PhoneBuild implements IPhoneBuild
    {
        private phone: Phone;
        private cities: Cities = new Cities();
        private errorMessages: string[] = ["Don't have errors", "Phone must consist of 6 or 11 digits."];

        // Constructor
        constructor(public num: string, public cityName: string)
        {
            var code = this.cities.getCityByName(cityName).PhoneCode;
            this.phone = this.buildPhone(num, code);
        }

        //Private Methods
        private clearPhone(reg: string)
        {
            var re = /\W|\D/g;
            return reg.replace(re, "");
        }

        private buildPhone(num: string, code: string)
        {
            num = this.clearPhone(num);

            var p: Phone = { Code: "", Number: num, Fax: false };

            if (num.length == 6 && code != "")
            {
                p = { Code: code.substring(0, 4), Fax: false, Number: (code + num).substring(4) };
            }

            if (num.length == 10 && num[0] == '8')
            {
                p = { Code: '7' + num.substring(0, 3), Fax: false, Number: num.substring(3) };
            }

            if (num.length == 11)
            {
                p = { Code: this.clearCode(num), Fax: false, Number: num.substring(4) };
            }

            return p;
        }

        private clearCode(num: string)
        {
            if (num[0] != '7')
                num = '7' + num.substring(1);

            return num.substring(0, 4);
        }
        // Instance member
        public showPhone()
        {
            return this.phone.Code + this.phone.Number;
        }

        public checkPhone()
        {
            return this.phone.Number.length == 7 && this.phone.Code.length > 0;
        }

        public showError()
        {
            if (!this.checkPhone())
                return this.errorMessages[1];

            return this.errorMessages[0];
        }
    }
}

class CheckPhoneViewModel
{
    private selectCity: HTMLSelectElement;
    private inputPhoneTextBox: HTMLInputElement;
    private outputPhoneTextBox: HTMLInputElement;
    private cities: City[] = new Cities().getAll();
    private validSpanTextField: HTMLSpanElement;

    constructor()
    {
        this.selectCity = <HTMLSelectElement>document.getElementById("citySelect");
        this.inputPhoneTextBox = <HTMLInputElement>document.getElementById("inputPhone");
        this.outputPhoneTextBox = <HTMLInputElement>document.getElementById("outputPhone");
        this.validSpanTextField = <HTMLSpanElement>document.getElementById("validSpan");

        this.initViewModel();
    }

    checkPhone()
    {
        var input = this.inputPhoneTextBox.value;
        var cityId = this.selectCity.value;

        var cityName: string = this.cities[cityId].Name;

        var phone: IPhoneBuild = new Phones.PhoneBuild(input, cityName);

        this.outputPhoneTextBox.value = phone.showPhone();

        if (phone.checkPhone())
            this.showValidSpan('none', '');
        else
            this.showValidSpan('block', phone.showError());
    }

    showValidSpan(displaySetting: string, text: string)
    {
        this.validSpanTextField.style.display = displaySetting;
        this.validSpanTextField.innerText = text;
    }

    initViewModel()
    {
        for (var i = 0; i < this.cities.length; i++)
        {
            var option = this.generateOption({ Value: i.toString(), Text: this.cities[i].Name });
            this.selectCity.appendChild(option);
        }
    }

    generateOption(city: OptionModel)
    {
        var option: HTMLOptionElement = document.createElement("option");
        option.value = city.Value;
        option.text = city.Text;

        return option;
    }
}

// Local variable
var checkPhoneViewModel = new CheckPhoneViewModel();
var checkPhoneButton = <HTMLButtonElement>document.getElementById("checkPhone");
var inputPhoneTextBox = <HTMLInputElement>document.getElementById("inputPhone");
var citySelect = <HTMLSelectElement>document.getElementById("citySelect");

citySelect.onchange = function ()
{
    checkPhoneViewModel.checkPhone();
};

inputPhoneTextBox.onchange = function ()
{
    checkPhoneViewModel.checkPhone();
};

checkPhoneButton.onclick = function ()
{
    checkPhoneViewModel.checkPhone();
};
