var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

var body = document.body;
var addTextBoxButton = document.getElementById("addTextBox");

function add() {
    var input = document.createElement("input");
    body.appendChild(input);
}

addTextBoxButton.onclick = add;

var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.type === 'childList') {
            var list_values = [].slice.call(body.children)
                .map(function (node) { return node.innerHTML; });
            console.log(list_values);
        }

        console.log(mutation.type);
    });
});

observer.observe(body, {
    attributes: true,
    childList: true,
    characterData: true
});

