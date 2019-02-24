var animal = {
    eats: true,
    comment: ko.observable(),
    getComment: function() {
        return this.comment();
    }
};

function Rabbit(name) {
    this.name = name;
}

Rabbit.prototype = animal;

var rabbit = new Rabbit('John');

//document.write(rabbit.name);

ko.applyBindings(rabbit, document.getElementById("prototype"));