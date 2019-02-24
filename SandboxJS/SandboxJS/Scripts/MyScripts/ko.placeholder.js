currentUserModel = {
	name: ko.observable(''),
	name2: ko.observable('Найти счет'),
	name3: ko.observable('Найти'),
	isSelected: ko.observable('false'),
	onBlur: function () {
		if (this.name() == "Найти счет" && 'nameForDisplay' in this) {
			this.name("");
		}
	}
};

currentUserModel.nameForDisplay = ko.computed({
	read: function () {
		var theName = this.name();
		if (theName == "Найти счет") { return ''; }
		return theName ? theName : 'Найти счет';
	},
	write: function (value) {
		if (value == '') {
			this.name('Найти счет');
			this.name('');
		}
		else this.name(value);

	}
}, currentUserModel);

currentUserModel.focusInput = function () {
	var model = this;
	if (model.nameForDisplay() == "Найти счет") {
		model.name('Найти счет');
	}
}

$(function () {
	ko.applyBindings(currentUserModel);
});

ko.bindingHandlers.hasFocus = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();
        var placeholder = $(element).attr('placeholder');
        $(element).focus(function () {
            if (placeholder !== undefined && placeholder !== false && $(this).is('input[type=text][placeholder]')) {
                if ($(this).val() == placeholder) value('');
            }
        });
        $(element).blur(function () {
            if (placeholder !== undefined && placeholder !== false && $(this).is('input[type=text][placeholder]')) {
                if ($(this).val() == '') value(placeholder);
            }
        });
    }
};