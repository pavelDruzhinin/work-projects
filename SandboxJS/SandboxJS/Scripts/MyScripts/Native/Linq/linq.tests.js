var massiv = [1, 2, 3, 4, 5, 6, 6];

var strings = ["Roy", "Parker", "Loq", "", "", "Hoi", "Link"];

var userProfiles = [
    { UserId: 1, FirstName: "Pavel", LastName: "Kroy", FullName: "", IsLock: true },
    { UserId: 2, FirstName: "Roman", LastName: "Roland", FullName: "", IsLock: false },
    { UserId: 3, FirstName: "Dmitriy", LastName: "Loq", FullName: "", IsLock: false },
    { UserId: 4, FirstName: "Lena", LastName: "", FullName: "Lena Fedorova", IsLock: false }
];

var tasks = [
    {
        TaskId: 1, Task: "Make cookies", ResponsibleList:
            [{ UserId: 1, FullName: "David Coopers", IsMain: true }, { UserId: 2, FullName: "Roman Shirokov", IsMain: false }]
    },
    {
        TaskId: 2, Task: "Make jujubes", ResponsibleList:
           [{ UserId: 1, FullName: "David Coopers", IsMain: true }, { UserId: 3, FullName: "Igor Akinfeev", IsMain: true }]
    },
    {
        TaskId: 3, Task: "Make cakes", ResponsibleList:
           [{ UserId: 1, FullName: "David Coopers", IsMain: true }]
    },
    {
        TaskId: 4, Task: "Make chocolate", ResponsibleList:
           [{ UserId: 2, FullName: "Roman Shirokov", IsMain: false }, { UserId: 4, FullName: "John Parker", IsMain: false }]
    }
];

var products = [{ Id: 1, Name: 'Диадок' }, { Id: 2, Name: 'Контур-Экстерн' }, { Id: 3, Name: 'Контур-Фокус' }, { Id: 4, Name: 'KоПФ' }, { Id: 5, Name: 'Контур 365' }];
var companyProducts = [{ ProductId: 3 }, { ProductId: 5 }];
var selectProducts = [{ ProductId: 2 }, { ProductId: 3 }];
var companySales = [
    { CompanyId: 1, ProductId: 7 },
    { CompanyId: 1, ProductId: 2 },
    { CompanyId: 1, ProductId: 3 },
    { CompanyId: 3, ProductId: 4 },
    { CompanyId: 2, ProductId: 23 },
    { CompanyId: 2, ProductId: 2 },
    { CompanyId: 2, ProductId: 6 },
    { CompanyId: 2, ProductId: 8 },
    { CompanyId: 2, ProductId: 12 },
    { CompanyId: 3, ProductId: 13 },
    { CompanyId: 4, ProductId: 4 }
];

var companySales2 = [
    { CompanyId: 1, ProductId: 1 },
    { CompanyId: 1, ProductId: 1 },
    { CompanyId: 1, ProductId: 1 },
    { CompanyId: 1, ProductId: 1 },
    { CompanyId: 1, ProductId: 1 },
    { CompanyId: 1, ProductId: 1 }
];

module("linq");
test("linq.count", function () {

    //simple integer massiv
    equal(linq(massiv).count(), 7, "simple integer mas:[1, 2, 3, 4, 5, 6, 6].count()");
    equal(linq(massiv).count("x=>x == 7"), 0, 'simple integer mas:[1, 2, 3, 4, 5, 6, 6].count("x=>x == 7")');
    equal(linq(massiv).count("x=>x != 7"), 7, 'simple integer mas:[1, 2, 3, 4, 5, 6, 6].count("x=>x != 7")');
    equal(linq(massiv).count("x=>x == 6"), 2, 'simple integer mas:[1, 2, 3, 4, 5, 6, 6].count("x=>x == 6")');
    equal(linq(massiv).count("x=>x != 6"), 5, 'simple integer mas:[1, 2, 3, 4, 5, 6, 6].count("x=>x != 6")');

    //simple string massiv
    equal(linq(strings).count('x=>x == ""'), 2, 'simple string mas:["Roy", "Parker", "Loq", "", "", "Hoi", "Link"].count(x=>x == "")');
    equal(linq(strings).count('x=>x == "L^"'), 2, 'simple string mas:["Roy", "Parker", "Loq", "", "", "Hoi", "Link"].count(x=>x == "L^")');
    equal(linq(strings).count('x=>x == "Roy"'), 1, 'simple string mas:["Roy", "Parker", "Loq", "", "", "Hoi", "Link"].count(x=>x == "Roy")');

    //object mas
    equal(linq(userProfiles).count('x=>x.UserId == 1'), 1, 'object mas: userProfiles.count(x=>x.UserId == 1)');
    equal(linq(userProfiles).count('x=>x.UserId != 1'), 3, 'object mas: userProfiles.count(x=>x.UserId != 1)');
    equal(linq(userProfiles).count('x=>x.FullName == ""'), 3, 'object mas: userProfiles.count(x=>x.FullName == "")');
    equal(linq(userProfiles).count('x=>x.LastName != ""'), 3, 'object mas: userProfiles.count(x=>x.LastName != "")');
    equal(linq(userProfiles).count('x=>x.IsLock'), 1, 'object mas: userProfiles.count(x=>x.IsLock)');
    equal(linq(userProfiles).count('x=>!x.IsLock'), 3, 'object mas: userProfiles.count(x=>!x.IsLock)');
    
    //nested object mas
    equal(linq(tasks).count('x=>x.ResponsibleList.FullName == "David Coopers"'), 3, 'nested object mas: tasks.count(x=>x.ResponsibleList.FullName == "David Coopers")');
    equal(linq(tasks).count('x=>x.ResponsibleList.FullName != "Roman Shirokov"'), 2, 'nested object mas: tasks.count(x=>x.ResponsibleList.FullName != "Roman Shirokov")');
    equal(linq(tasks).count('x=>x.ResponsibleList.UserId == 4'), 1, 'nested object mas: tasks.count(x=>x.ResponsibleList.UserId == 4)');
    equal(linq(tasks).count('x=>x.ResponsibleList.UserId != 4'), 3, 'nested object mas: tasks.count(x=>x.ResponsibleList.UserId != 4)');
    equal(linq(tasks).count('x=>x.ResponsibleList.IsMain'), 3, 'nested object mas: tasks.count(x=>x.ResponsibleList.IsMain")');
});

test("linq.where", function () {

    //==
    var testMas1 = linq(massiv).where("x => x == 6");
    ok(linq(testMas1).equal([6, 6]), "simple mas:linq(massiv).where(x => x == 6)");

    //!=
    var testMas2 = linq(massiv).where("x => x != 6");
    ok(linq(testMas2).equal([1, 2, 3, 4, 5]), "simple mas:linq(massiv).where(x => x != 6)");

    //>
    var testMas3 = linq(massiv).where("x => x > 4");
    ok(linq(testMas3).equal([5, 6, 6]), "simple mas:linq(massiv).where(x => x > 4)");

    //<
    var testMas4 = linq(massiv).where("x => x < 4");
    ok(linq(testMas4).equal([1, 2, 3]), "simple mas: linq(massiv).where(x => x < 4)");

    //object mas
    //

});

test("linq.equal", function () {
    ok(linq([1, 2, 3]).equal([1, 2, 3]), "simple mas:[1, 2, 3] == [1, 2, 3]");
    equal(linq([1, 2, 3]).equal([3, 2, 1]), false, "simple mas:[1, 2, 3] != [3, 2, 1]");
    equal(linq([1, 2, 3]).equal([1]), false, "simple mas:[1, 2, 3] != [1]");
    equal(linq([1, 2, 3]).equal([1, 5, 6]), false, "simple mas:[1, 2, 3] != [1, 5, 6]");
    ok(linq([{ CompanyId: 1, ProductId: 1 }]).equal([{ CompanyId: 1, ProductId: 1 }]), "object mas: [{ CompanyId: 1, ProductId: 1 }] == [{ CompanyId: 1, ProductId: 1 }]");
    equal(linq([{ CompanyId: 1, ProductId: 1 }]).equal([{ CompanyId: 1, ProductId: 2 }]), false, "object mas: [{ CompanyId: 1, ProductId: 1 }] != [{ CompanyId: 1, ProductId: 2 }]");
});

test("linq.distinct", function () {
    var testMas1 = linq(massiv).distinct();
    ok(linq(testMas1).equal([1, 2, 3, 4, 5, 6]), "simple mas: [1, 2, 3, 4, 5, 6, 6].distinct()");

    var testMas2 = linq(companySales).select("x=>x.CompanyId").distinct().sort();
    ok(linq(testMas2).equal([1, 2, 3, 4]), "object mas: companySales.select(x=>x.CompanyId).distinct().sort()");

    var testMas3 = linq(companySales2).distinct();
    ok(linq(testMas3).equal([{ CompanyId: 1, ProductId: 1 }]), 'object mas:companySales2.distinct()');
});

test("linq.select", function () {
    ok(true, "true successed");
});

test("linq.first", function () {

    //simple mas
    equal(linq(massiv).first(), 1, "simple mas:[1, 2, 3, 4, 5, 6, 6].first()");
    equal(linq(massiv).first("x=>x == 6"), 6, "simple mas:[1, 2, 3, 4, 5, 6, 6].first(x=>x == 6)");
    equal(linq(massiv).first("x=>x > 4"), 5, "simple mas:[1, 2, 3, 4, 5, 6, 6].first(x=>x > 4)");
    equal(linq(massiv).first("x=>x < 4"), 1, "simple mas:[1, 2, 3, 4, 5, 6, 6].first(x=>x < 4)");
    equal(linq(massiv).first("x=>x > 1"), 2, "simple mas:[1, 2, 3, 4, 5, 6, 6].first(x=>x > 1)");
    equal(linq(massiv).first("x=>x != 1"), 2, "simple mas:[1, 2, 3, 4, 5, 6, 6].first(x=>x != 1)");

    //object mas
    equal(linq(userProfiles).first("x=>x.UserId == 1").FirstName, "Pavel", "object mas:userprofiles.first(x=>x.UserId == 1).FirstName");
    equal(linq(userProfiles).first("x=>x.UserId > 1").LastName, "Roland", "object mas:userprofiles.first(x=>x.UserId > 1).LastName");
    equal(linq(userProfiles).first("x=>x.UserId != 1").FirstName, "Roman", "object mas:userprofiles.first(x=>x.UserId != 1).FirstName");
    equal(linq(userProfiles).first('x=>x.LastName == "Loq"').FirstName, "Dmitriy", 'object mas:userprofiles.first(x=>x.LastName == "Loq").FirstName');
});