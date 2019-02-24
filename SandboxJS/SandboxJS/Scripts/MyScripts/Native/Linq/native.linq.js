
var listObjects = '"[["\"https://focus.kontur.ru/entity?query=1026303065304\"","\"6325028472\"","\"632501001\"","\"1026303065304\"","\"Муниципальное унитарное предприятие \"Жилищно-эксплуатационная служба\" городского округа Сызрань\"","\"МУП \"ЖЭС\"\"","\"Самарская обл, Сызрань г, Свердлова ул, 35\"","\"\"","\"+78464980396\"","\"+78464338761\"","\"yuorist_jes@mail.ru\"","\"mupjes.narod.ru\"","\"63\"","\"Производство пара и горячей воды (тепловой энергии) котельными\"","\"Шилин Андрей Александрович\"","\"\"","\"+78464338761\"","\"szr_jes@mail.ru\"","\"\"","\"\"","\"\"","\"+78464338761\"",""],["\"https://focus.kontur.ru/entity?query=1046301251150\"","\"6325033916\"","\"632501001\"","\"1046301251150\"","\"ООО \"Энергетик\"\"","\"ООО \"Энергетик\"\"","\"Самарская обл, Сызрань г, Дизельная ул, 12\"","\"\"","\"+78464373904\"","\"+78464373904\"","\"\"","\"\"","\"63\"","\"Распределение электроэнергии\"","\"\"","\"\"","\"\"","\"\"","\"\"","\"\"","\"\"","\"\"",""]]"';

var massiv = [1, 2, 3, 4, 5, 6, 1, 1];
var select = document.createElement("select");
var companyArray = [{ CompanyId: 0, CompanyName: "" }, { CompanyId: 1, CompanyName: 'ООО "Петрокрипт"' },
{ CompanyId: 2, CompanyName: 'OOO "МП-Сервис"' }, { CompanyId: 1, CompanyName: 'ООО "Петрокрипт"' }];

var names = ["Не назначено", "Павел Дружинин", "Анна Майорова"];

var responsibleArray = [
    {
        CompanyId: 0,
        CompanyName: "",
        UserList: [{ FullName: "Не назначено", UserId: 37 }]
    },
     {
         CompanyId: 1,
         CompanyName: 'ООО "Петрокрипт"',
         UserList: [
             { FullName: "Павел Дружинин", UserId: 6 },
             { FullName: "Анна Майорова", UserId: 31 }
         ]
     },
    {
        CompanyId: 2,
        CompanyName: 'OOO "МП-Сервис"',
        UserList: [
            { FullName: "Павел Дружинин", UserId: 6 }
        ]
    },
	{
	    CompanyId: 1,
	    CompanyName: 'ООО "Петрокрипт"',
	    UserList: [
            { FullName: "Павел Дружинин", UserId: 6 },
            { FullName: "Анна Майорова", UserId: 31 }
	    ]
	},
	 {
	     CompanyId: 1,
	     CompanyName: 'ООО "Петрокрипт"',
	     UserList: [
             { FullName: "Павел Дружинин", UserId: 6 }
	     ]
	 }
];

var products = [{ Id: 1, Name: 'Диадок' }, { Id: 2, Name: 'Контур-Экстерн' }, { Id: 3, Name: 'Контур-Фокус' }, { Id: 4, Name: 'KоПФ' }, { Id: 5, Name: 'Контур 365' }];
var companyProducts = [{ ProductId: 3, CompanyId: 1 }, { ProductId: 5, CompanyId: 3 }];
var selectProducts = [{ ProductId: 2, IsNewSale: false }, { ProductId: 3, IsNewSale: true }, { ProductId: 4, IsNewSale: true }];

var tasksWithNull = [{ ProductId: null, CompanyId: 1 }, { ProductId: null, CompanyId: 1 }, { ProductId: 2, CompanyId: 1 }];

function showMas() {
    console.log("products");
    console.log(products);
    console.log("companyProducts");
    console.log(companyProducts);
    console.log("selectProducts");
    console.log(selectProducts);
    console.log("names");
    console.log(names);
    console.log("companyArray");
    console.log(companyArray);
    console.log("massiv");
    console.log(massiv);
}

function Product(data1, data2) {
    this.ProductId = data1.Id;
    this.Name = data1.Name;
    this.IsNewSale = !data2.IsNewSale ? false : data2.IsNewSale;
}

function IsObject(object) {
    var toClass = {}.toString;

    return toClass.call(object) == '[object Object]';
}

function checkIterator() {
    var sales = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    var responsibles = [1, 2, 3];
    var count = responsibles.length;
    for (var i = 0; i < sales.length; i++) {
        console.log(i % count + " элемент = " + responsibles[i % count]);
    }
}

function selectCheckbox() {
    var checkedList = linq($('input:checkbox')).where("x=>x.checked").select('x=>x.id').foreach(foo).toArray();
    console.log(checkedList);
}

function foo(data) {
    return data.split('_')[1];
}

function isElement(obj) {
    try {
        //Using W3 DOM2 (works for FF, Opera and Chrom)
        return obj instanceof HTMLElement;
    }
    catch (e) {
        //Browsers not supporting W3 DOM2 don't have HTMLElement and
        //an exception is thrown and we end up here. Testing some
        //properties that all elements have. (works on IE7)
        return (typeof obj === "object") &&
            (obj.nodeType === 1) && (typeof obj.style === "object") &&
            (typeof obj.ownerDocument === "object");
    }
}

//TODO:made Prototype like in JQuery
function linq(massiv) {

    var linqArray = massiv === undefined ? [] : convertToArray(massiv);

    if (!isArray(linqArray) && !isElement(linqArray[0])) {
        showError(2, "self linq");
        return 0;
    }

    linqArray.settings = {
        writeInConsole: true,
        showError: true
    };

    //propIfRangeSelf if range = [1,2,3,4] or other simple array
    linqArray.addRange = function (range, newObject, propIfRangeSimple) {
        if (!isArray(this) || !isArray(range)) {
            showError(2, "addRange");
            return this;
        }

        if (range.length == 0)
            return linq(this);

        var context = this;

        for (var i = 0; i < range.length; i++) {
            if (newObject === undefined || !isObject(newObject) && !isFunction(newObject)) {
                context.push(range[i]);
                continue;
            }

            if (isFunction(newObject)) {
                context.push(new newObject(range[i]));
                continue;
            }

            var obj = {};
            for (var key in newObject) {
                if (propIfRangeSimple !== undefined && propIfRangeSimple == key) {
                    obj[key] = convertFunction(range[i]);
                    continue;
                }

                obj[key] = hasProperty(range[i], key) ? convertFunction(range[i][key]) : newObject[key];
            }
            context.push(obj);
        }

        return linq(context);
    };

    linqArray.insertAfter = function (count, object) {
        var context = this;

        if (count === undefined || count <= 0)
            return context;

        var temp = context.take(count);

        temp.push(object);

        var temp2 = context.skip(count + 1);

        return linq(temp).addRange(temp2);
    };

    //TODO: made new method addRangeType which will take into consideration type linqArray
    //TODO: made new method inverse that change order by(get started with order by and order by descending):)
    //TODO: made new method find that search object in array
    //TODO: made new methods join(right) that join arrays by property

    linqArray.union = function (unionArray, predicate) {
        if (!isArray(this) || !isArray(unionArray)) {
            showError(2, "join");
            return this;
        }

        var context = this;
        if (predicate === undefined) {
            for (var i = 0; i < unionArray.length; i++) {
                var c = unionArray[i];
                if (context.indexOf(c) == -1)
                    context.push(c);
            }

            return linq(context);
        }

        var p = convertPredicate(predicate);

        if (p.keys.length == 0)
            return context;

        var key1 = p.keys[0];
        if (p.keys.length == 1) {

            for (var i = 0; i < unionArray.length; i++) {
                var c = convertFunction(unionArray[i][key1]);
                if (!linq(context).any("x=>x." + key1 + "==" + c))
                    context.push(unionArray[i]);
            }

            return linq(context);
        }
    };

    linqArray.join = function (joinArray, predicate, fun) {
        if (!isArray(this) || !isArray(joinArray)) {
            showError(2, "join");
            return this;
        }

        var context = this;
        var temp = [];

        if (predicate === undefined) {
            for (var i = 0; i < joinArray.length; i++) {
                var c = joinArray[i];
                if (context.indexOf(c) != -1)
                    temp.push(c);
            }

            return linq(temp);
        }

        var p = convertPredicate(predicate);

        if (p.keys.length == 0)
            return context;

        var key1 = p.keys[0];
        if (p.keys.length == 1) {
            for (var i = 0; i < context.length; i++) {
                var c = hasProperty(context[i], key1) ? convertFunction(context[i][key1]) : convertFunction(context[i]);
                var pred = p.noSign ? "x=>x." + key1 + "==" + c : "x=>x." + p.value + "==" + c;

                var j = linq(joinArray).first(pred);

                if (j != null) {
                    var con = convertFunction(context[i]);
                    var obj = unionObjects(con, j, fun);
                    temp.push(obj);
                    continue;
                }
            }

            return linq(temp);
        }
    };

    linqArray.left = function (joinArray, predicate, fun) {
        if (!isArray(this) || !isArray(joinArray)) {
            showError(2, "left");
            return this;
        }

        var context = this;

        if (predicate === undefined)
            return linq(context);

        var temp = [];
        var p = convertPredicate(predicate);

        if (p.keys.length == 0)
            return context;

        var key1 = p.keys[0];
        if (p.keys.length == 1) {

            for (var i = 0; i < context.length; i++) {
                var c = hasProperty(context[i], key1) ? convertFunction(context[i][key1]) : convertFunction(context[i]);

                var pred = p.noSign ? "x=>x." + key1 + "==" + c : "x=>x." + p.value + "==" + c;

                var j = linq(joinArray).first(pred);
                var con = convertFunction(context[i]);

                if (j != null) {
                    var obj = unionObjects(con, j, fun);
                    temp.push(obj);
                    continue;
                }

                temp.push(new fun(con));
            }

            return linq(temp);
        }
    };

    //need Fix: don't work when massiv with func's 
    linqArray.distinct = function () {
        if (!isArray(this)) {
            showError(2, "distinct");
            return null;
        }

        var context = this;

        if (context.length <= 0)
            return context;

        var temp = [];
        var tempObject = [];

        for (var i = 0; i < context.length; i++) {
            var c = convertFunction(context[i]);
            if (temp.indexOf(c) == -1 && !isObject(c)) {
                temp.push(c);
                continue;
            }

            if (isObject(c)) {
                var str = convertToString(c);
                if (tempObject.indexOf(str) == -1) {
                    tempObject.push(str);
                    temp.push(c);
                }
                continue;
            }
        }

        return linq(temp);
    };

    linqArray.count = function (predicate) {
        var context = convertFunction(this);

        if (!isArray(context)) {
            showError(2, "count");
            return 0;
        }

        if (predicate === undefined)
            return context.length;

        return linq(context).where(predicate).length;
    };

    linqArray.where = function (predicate) {
        if (!isArray(this)) {
            showError(2, "where");
            return 0;
        }

        var p = convertPredicate(predicate);

        if (!p)
            return this;

        var context = this;

        var temp = [];

        if (p.isSelf) {
            for (var i = 0; i < context.length; i++) {

                var c = convertFunction(context[i]);
                var bool = convertBool(c, p.value, p.sign);

                if (bool) {
                    temp.push(c);
                }
            }

            return linq(temp);
        }

        if (p.keys.length == 1) {

            for (var i = 0; i < context.length; i++) {
                var key1 = p.keys[0];
                var bool = convertFunction(context[i][key1]);
                if (!p.noSign)
                    bool = convertBool(bool, p.value, p.sign);

                if (bool) {
                    temp.push(context[i]);
                }
            }

            return linq(temp);
        }

        if (p.keys.length == 2) {
            for (var i = 0; i < context.length; i++) {
                var key1 = p.keys[0];

                var c = convertFunction(context[i][key1]);

                if (!isArray(c)) {
                    writeInConsole("Ошибка where: второй объект в условии не является массивом.");
                    return context;
                }

                var newPred = "x=>x." + p.keys[1] + (p.noSign ? '' : p.sign + p.value);

                //if c is bool || operation "==" || other 
                if (p.noSign && linq(c).any(newPred) || p.sign == '==' && linq(c).any(newPred) || linq(c).all(newPred)) {
                    temp.push(context[i]);
                    continue;
                }
            }

            return linq(temp);
        }

        if (p.keys.length > 2)
            showError(1, "where");

        return context;
    };

    linqArray.select = function (predicate) {
        if (!isArray(this)) {
            showError(2, "select");
            return 0;
        }

        var p = convertPredicate(predicate);

        if (!p || p.keys.length <= 0)
            return this;

        var context = this;

        var temp = [];
        var key1 = p.keys[0];

        if (p.keys.length == 1) {
            for (var i = 0; i < context.length; i++) {
                var c = convertFunction(context[i][key1]);

                if (isArray(c)) {
                    for (var j = 0; j < c.length; j++) {
                        temp.push(c[j]);
                    }

                    continue;
                }

                temp.push(c);
            }

            return linq(temp);
        }

        if (p.keys.length == 2) {
            for (var i = 0; i < context.length; i++) {
                var c = convertFunction(context[i][key1]);
                var key2 = p.keys[1];
                for (var j = 0; j < c.length; j++) {
                    temp.push(convertFunction(c[j][key2]));
                }
            }

            return linq(temp);
        }

        if (p.keys.length > 2)
            showError(1, "select");

        return context;
    };

    linqArray.take = function (count) {
        if (count === undefined || count == 0)
            return this;

        var context = this;

        var temp = [];

        if (count > context.length)
            count = context.length;

        for (var i = 0; i < count; i++) {
            temp.push(context[i]);
        }

        return linq(temp);
    };

    linqArray.skip = function (count) {
        var context = this;

        if (count == 0)
            return this;

        var temp = [];

        for (var i = count; i < context.length; i++) {
            temp.push(context[i]);
        }

        return linq(temp);
    };

    //may be full replace join
    linqArray.selectRange = function (rangeArray, predicate, notContains) {
        if (!isArray(this) || !isArray(rangeArray)) {
            showError(2, "selectRange");
            return 0;
        }

        if (rangeArray.length <= 0)
            return this;

        var context = this;

        var temp = [];

        if (predicate === undefined) {
            for (var i = 0; i < context.length; i++) {
                var c = convertFunction(context[i]);
                if (rangeArray.indexOf(c) != -1) {
                    temp.push(c);
                }
            }
            return linq(temp);
        }

        var p = convertPredicate(predicate);

        if (!p)
            return this;

        var key1 = p.keys[0];
        var sign = notContains === undefined || notContains === false ? "!=" : "==";
        if (p.keys.length == 1) {
            for (var i = 0; i < context.length; i++) {
                var c = hasProperty(context[i], key1) ? convertFunction(context[i][key1]) : convertFunction(context[i]);

                //need think about 
                if (hasProperty(rangeArray[0], key1)) {
                    var newPred = "x=>x." + p.value + (notContains === undefined ? '==' : '!=') + c;

                    var bool = notContains === undefined ? linq(rangeArray).any(newPred) : linq(rangeArray).all(newPred);

                    writeInConsole(c);

                    if (bool)
                        temp.push(context[i]);

                    continue;
                }

                if (convertBool(rangeArray.indexOf(c), -1, sign)) {
                    temp.push(context[i]);
                }
            }

            return linq(temp);
        }

        return context;
    };

    linqArray.first = function (predicate) {
        if (!isArray(this)) {
            showError(2, "first");
            return null;
        }

        var context = this;
        var p = convertPredicate(predicate);

        if (!p)
            return context.length > 0 ? context[0] : {};

        var temp = null;

        var key1 = p.keys[0];

        if (p.keys.length < 2) {
            for (var i = 0; i < context.length; i++) {
                var bool = p.keys.length != 0 ? convertFunction(context[i][key1]) : convertFunction(context[i]);

                if (!p.noSign)
                    bool = convertBool(bool, p.value, p.sign);

                if (bool) {
                    temp = context[i];
                    break;
                }
            }

            return temp;
        }

        if (p.keys.length == 2) {
            for (var i = 0; i < context.length; i++) {
                var c = convertFunction(context[i][key1]);

                if (!isArray(c)) {
                    writeInConsole("Ошибка: второй объект в условии не является массивом.");
                    return context;
                }

                var key2 = p.keys[1];

                for (var j = 0; j < c.length; j++) {
                    var bool = convertFunction(c[j][key2]);

                    if (!p.noSign)
                        bool = convertBool(bool, p.value, p.sign);

                    if (bool) {
                        temp = context[i];
                        break;
                    }
                }

                if (temp != null)
                    break;
            }

            return temp;
        }

        if (p.keys.length > 2)
            showError(1, "first");

        return context.length > 0 ? context[0] : null;
    };

    linqArray.last = function (predicate) {
        var context = this;

        if (predicate !== undefined) {
            var temp = context.where(predicate);

            return temp[temp.length - 1];
        }

        var lastIndex = context.length - 1;

        return context[lastIndex];
    };

    linqArray.all = function (predicate) {
        if (!isArray(this)) {
            showError(2, "all");
            return false;
        }

        var context = this;

        if (context.length == 0 || predicate === undefined)
            return true;

        return linq(context).count(predicate) == context.length;
    };

    linqArray.any = function (predicate) {
        if (!isArray(this)) {
            showError(2, "any");
            return false;
        }

        var context = this;

        if (predicate === undefined || context.length == 0)
            return context.length > 0;

        return context.first(predicate) != null;
    };

    linqArray.sum = function (predicate) {
        if (!isArray(this)) {
            showError(2, "sum");
            return 0;
        }

        var context = this;

        if (context.length == 0)
            return 0;

        var sum = 0;
        if (predicate === undefined) {

            if (!isFinite(parseInt(context[0])))
                return 0;

            for (var i = 0; i < context.length; i++) {
                sum += parseInt(convertFunction(context[0]));
            }
            return sum;
        }

        var p = convertPredicate(predicate);

        if (!p)
            return 0;

        var key1 = p.keys[0];
        if (p.keys.length == 1) {
            for (var i = 0; i < context.length; i++) {
                var c = convertFunction(context[i][key1]);

                if (!isFinite(parseInt(c)))
                    return 0;

                sum += parseInt(c);
            }

            return sum;
        }

        if (p.keys.length == 2) {
            for (var i = 0; i < context.length; i++) {
                var c = convertFunction(context[i][key1]);

                if (!isArray(c)) {
                    writeInConsole("Ошибка: второй объект в условии не является массивом.");
                    return context;
                }

                var key2 = p.keys[1];

                for (var j = 0; j < c.length; j++) {
                    var s = convertFunction(c[j][key2]);

                    if (!isFinite(parseInt(s)))
                        return 0;

                    sum += parseInt(s);
                }
            }

            return sum;
        }

        if (p.keys.length > 2)
            showError(1, "first");

        return 0;

    };

    linqArray.toArray = function (object) {
        if (!isArray(this) && !isString(this)) {
            showError(2, "toArray");
            return 0;
        }

        if (isString(this))
            return convertStringToArray(this);

        var context = this;

        var temp = [];

        for (var i = 0; i < context.length; i++) {
            if (isFunction(object)) {
                temp.push(new object(context[i]));
                continue;
            }

            temp.push(copyObject(context[i]));
        }

        return temp;
    };

    linqArray.clearLinq = function () {
        if (!isArray(this)) {
            showError(2, "toArray");
            return 0;
        }

        var context = this;
        for (var key in linq([])) {
            if (hasProperty([], key)) {
                context[key] = [][key];
                continue;
            }

            if (hasProperty(context, key))
                delete context[key];
        }
    };

    linqArray.equal = function (equalArray) {
        if (!isArray(this) || !isArray(equalArray)) {
            showError(2, "toArray");
            return false;
        }

        var context = this;

        if (context.length == 0 && equalArray.length != 0 || context.length != 0 && equalArray.length == 0
            || context.length != equalArray.length)
            return false;

        var bool = true;

        for (var i = 0; i < context.length; i++) {
            if (isObject(context[i])) {
                if (!equallyObjects(context[i], equalArray[i])) {
                    bool = false;
                    break;
                }
                continue;
            }


            if (context[i] !== equalArray[i]) {
                bool = false;
                break;
            }
        }

        return bool;
    };

    linqArray.toString = function (separator) {
        var context = this;

        if (!context.any())
            return '';

        var sep = separator === undefined ? '' : separator + ' ';

        var temp = '';
        for (var i = 0; i < context.length; i++) {
            if (!isObject(context[i]))
                temp += i == context.length - 1 ? context[i] : context[i] + sep;
        }

        return temp;
    };

    linqArray.foreach = function (fun) {
        var context = this;

        if (!isFunction(fun) || !context.any())
            return context;

        for (var i = 0; i < context.length; i++) {
            if (isObject(context[i]))
                fun(context[i], i);
            else
                context[i] = fun(context[i], i);
        }

        return context;
    };

    linqArray.index = function (predicate) {
        var context = this;

        if (predicate === undefined)
            return context[0];

        var obj = context.first(predicate);

        return context.indexOf(obj);
    };

    linqArray.indexFirst = function (obj) {
        var context = this;

        if (!isObject(obj))
            return context.indexOf(obj);

        var index = -1;
        for (var i = 0; i < context.length; i++) {
            if (equallyObjects(context[i], obj)) {
                index = i;
                break;
            }
        }

        return index;
    };

    linqArray.removeByIndex = function (index) {
        var context = this;

        delete context[index];

        for (var i = index; i < context.length; i++) {
            context[i] = context[i + 1];
        }

        context.pop();

        return context;
    };

    linqArray.remove = function (obj) {

        var context = this;

        var indexRemove = context.indexFirst(obj);

        if (indexRemove != -1)
            context = context.removeByIndex(indexRemove);

        return context;
    };

    linqArray.columns = function (index) {
        var context = this;

        if (!isObject(context[0]))
            return [];

        context.sort(compareObject);

        var temp = [];
        var i = 0;
        for (var j = 0; j < context.length; j++) {

            for (var key in context[j]) {
                if (linq(temp).any("x=>x.name == " + key))
                    continue;

                var type = trimToString(checkType(context[j][key]), '[', ']').split(' ')[1];
                var c = new column(i, key, type, context.all("x=>x." + key + '==""'), context.all("x=>x." + key + '== null'));
                temp.push(c);
                i++;
            }
        }

        if (index != undefined)
            return temp[index];

        return temp;
    };

    function column(index, name, type, allIsEmpty, allIsNull) {
        this.index = index;
        this.name = name;
        this.type = type;
        this.allIsEmpty = allIsEmpty;
        this.allIsNull = allIsNull;
    }

    function lengthObject(obj) {
        var i = 0;
        for (var key in obj) {
            i++;
        }
        return i;
    }

    function compareObject(obj1, obj2) {
        if (lengthObject(obj1) < lengthObject(obj2)) return 1;
        if (lengthObject(obj1) > lengthObject(obj2)) return -1;

    }

    function getColumnName(array, index) {
        var i = 0;
        var name = null;
        for (var key in array[0]) {
            if (i == index) {
                name = key;
                break;
            }

            i++;
        }

        return name;
    }

    function convertToArray(obj, fun) {
        if (!isArray(obj) && !isString(obj) && !isElement(obj[0])) {
            showError(2, "toArray");
            return 0;
        }

        if (isString(obj))
            return convertStringToArray(obj);

        var context = obj;

        var temp = [];

        for (var i = 0; i < context.length; i++) {
            if (isFunction(fun)) {
                temp.push(new object(context[i]));
                continue;
            }

            temp.push(context[i]);
        }

        return temp;
    }

    function isJQueryElement(object) {
        return object.jquery != undefined;
    }

    function convertBool(value1, value2, sign) {
        if (isString(value1)) {
            value1 = value1.replace(/\s/g, '');
        }

        writeInConsole('"' + value1 + '"' + sign + '"' + value2 + '"');
        //debugger;

        //contains
        if (value2 != "" && value2.length != 0)
            if (isString(value2) && value2.search(/\^/) == value2.length - 1) {
                if (sign == "==") {
                    return value1.indexOf(value2.replace(/\^/, "")) >= 0;
                }
                else {
                    return value1.indexOf(value2.replace(/\^/, "")) == -1;
                }
            }
        
        if (isNullOrUndefined(value1)) {
            value2 = value2 == 'null' || value2 == "undefined" || value2 == '' ? null : value2;
        }

        switch (sign) {
            case "==":
                return value1 == value2;
            case "<=":
                return value1 <= value2;
            case ">=":
                return value1 >= value2;
            case "!=":
                return value1 != value2;
            case ">":
                return value1 > value2;
            case "<":
                return value1 < value2;
            default:
                return false;
        }
    }

    function isNumeric(number) {
        return isFinite(parseInt(number));
    }

    function isArray(array) {
        return checkType(array) == '[object Array]';
    }

    function isObject(object) {
        return checkType(object) == '[object Object]';
    }

    function isString(str) {
        if (isNumeric(str))
            return false;

        return checkType(str) == '[object String]';
    }

    function isFunction(fun) {
        return checkType(fun) == '[object Function]';
    }

    function isNullOrUndefined(object) {
        return checkType(object) == '[object Null]' || checkType(object) == '[object Undefined]';
    }

    function convertFunction(fun) {
        return isFunction(fun) ? fun() : fun;
    }

    function checkType(object) {
        if (object === undefined)
            return '';

        return {}.toString.call(object);
    }

    function clearString(str) {
        if (str[0].search(/\"/) != -1)
            str = str.substring(1);

        var last = str.length - 1;
        if (str[last].search(/\"/) != -1)
            str = str.substring(0, last);

        return str;
    }

    function hasProperty(object, prop) {
        if (isObject(object))
            return object[prop] !== undefined || prop in object;

        return object[prop] !== undefined;
    }

    function convertPredicate(predicate) {
        if (predicate === undefined)
            return null;

        //for information
        //var p = {
        //    keyArray: [], // array properties layer [key 1 layer, key 2 layer, ...]
        //    sign: '',     // comparison operators: <, >, ==, !=
        //    value: 0,     //value for comparison operators
        //    noSign: false, //if not exist sign
        //    isSelf: false //if self value array
        //};

        //find keys
        var pred = convertKeys(predicate);

        if (pred.keys.length > 0 || (pred.isSelf && !pred.noSign))
            return pred;

        return null;
    }

    //convert predicate: "x => x.UserList.UserId >= 0"

    function convertKeys(predicate) {

        //delete spaces 
        predicate = predicate.replace(/\s/g, '');

        var p;

        var firstSeparator = predicate.indexOf('.') + 1;
        var lastSeparator = -1;
        var firstDigital = -1;

        if (firstSeparator == 0) {
            firstSeparator = predicate.lastIndexOf("x");
            var str = predicate.substring(firstSeparator + 1);
            lastSeparator = str.search(/[<,>,=,!]/);
            firstDigital = str.search(/[A-Za-zА-Яа-яё0-9"-]/);

            p = {
                keys: [],
                isSelf: true,
                sign: str.substring(lastSeparator, firstDigital),
                value: str.substring(firstDigital)
            };

            if (isString(p.value)) {
                p.value = clearString(p.value);
                p.sign = clearString(p.sign);
            }

            writeInConsole({ firstSeparator: firstSeparator, stringKeys: "x", lastSeparator: lastSeparator, firstDigital: firstDigital });
            writeInConsole(p);
            return p;
        }

        var stringKeys = predicate.substring(firstSeparator);

        lastSeparator = stringKeys.search(/[<,>,=,!]/);
        firstDigital = stringKeys.substring(lastSeparator).search(/[A-Za-zА-Яа-яё0-9\"]/);

        //if predicate have sign and value(x.CompanyId == 1)
        if (lastSeparator != -1) {

            p = {
                sign: stringKeys.substring(lastSeparator, lastSeparator + firstDigital),
                value: stringKeys.substring(lastSeparator + firstDigital),
                noSign: false
            };

            if (isString(p.value) && p.value.length > 0) {
                writeInConsole(p.value);
                if (p.value[0].search(/\"/) != -1)
                    p.value = p.value.substring(1);

                var last = p.value.length - 1;

                if (p.value[last].search(/\"/) != -1)
                    p.value = p.value.substring(0, last);
            }

            stringKeys = stringKeys.substring(0, lastSeparator);

            p.keys = stringKeys.split('.');
            writeInConsole({ firstSeparator: firstSeparator, stringKeys: stringKeys, lastSeparator: lastSeparator });
            writeInConsole(p);
            return p;
        }

        p = {
            keys: stringKeys.split('.'),
            noSign: true
        };

        //negative bool 
        if (predicate.search('x=>!x') != -1) {
            p.value = false;
            p.sign = "==";
            p.noSign = false;
        }

        writeInConsole({ firstSeparator: firstSeparator, stringKeys: stringKeys, lastSeparator: lastSeparator });
        writeInConsole(p);
        return p;
    }

    function showError(type, from) {
        if (!linqArray.settings.showError)
            return;

        switch (type) {
            case 1:
                console.log("Ошибка " + from + ": В данный момент linq не обрабатывает больше двух вложенных объектов.");
                break;
            case 2:
                console.log('Ошибка ' + from + ': объект не является массивом.');
                break;
        }
    }

    function convertToString(object) {
        if (object === undefined || !isObject(object))
            return '';

        var str = '';

        for (var key in object) {
            if (isArray(object[key])) {
                var array = object[key];
                for (var i = 0; i < array.length; i++)
                    str += convertToString(array[i]);

                continue;
            }

            str += object[key];
        }

        return str;
    }

    function convertStringToArray(str) {
        if (!isString(str))
            return str;

        var context = trimToString(str, '"', '"');

        if (findToString(context, '[', ']')) {
            context = trimToString(str, '[', ']');
            var isarr = findToString(context, '[', ']');
            context = searchArrayOrObject(context);

            if (isArray(context)) {
                var temp = [];
                for (var i = 0; i < context.length; i++) {
                    temp.push(convertStringToObject(context[i], isarr));
                }

                return temp;
            }

            return context.split(',');
        }

        if (findToString(context, '{', '}') && str.indexOf(':') != -1) {
            var context = trimToString(str, '{', '}');
            return [convertStringToObject(context)];
        }

        return context.split(',');
    }

    function searchArrayOrObject(str) {
        if (findToString(str, '[', ']'))
            return trimToString(str, '[', ']').split('],[');

        if (findToString(str, '{', '}'))
            return trimToString(str, '{', '}').split('},{');

        return str;

    }

    function convertStringToObject(str, isarr) {

        var mas = str.split(',');

        var obj = {};

        for (var i = 0; i < mas.length; i++) {
            var keyValue = mas[i].split(':');

            if (isarr || keyValue.length == 1) {
                obj[i] = mas[i];
                continue;
            }

            obj[keyValue[0]] = keyValue[1];
        }

        return obj;
    }

    function findToString(str, first, last) {
        if (str[0] == first && str[str.length - 1] == last)
            return true;

        return false;
    }

    function trimToString(str, first, last) {
        if (!findToString(str, first, last))
            return str;

        return str.substring(1, str.length - 1);
    }

    function copyObject(obj) {
        if (!isObject(obj))
            return obj;

        var newObj = {};
        for (var key in obj) {
            newObj[key] = obj[key];
        }

        return newObj;
    }

    function unionObjects(object1, object2, fun) {

        if (isFunction(fun))
            return new fun(object1, object2);

        var obj = {};

        for (var key in object1) {
            obj[key] = object1[key];
        }

        for (var key in object2) {
            if (!hasProperty(obj, key))
                obj[key] = object2[key];
        }

        return obj;
    }

    function equallyObjects(obj1, obj2) {
        var o1 = convertFunction(obj1);
        var o2 = convertFunction(obj2);

        for (var key in o1) {
            if (convertFunction(o1[key]) != convertFunction(o2[key]))
                return false;
        }

        return true;
    }

    function writeInConsole(message) {
        if (linqArray.settings.writeInConsole)
            console.log(message);
    }

    return linqArray;
};

