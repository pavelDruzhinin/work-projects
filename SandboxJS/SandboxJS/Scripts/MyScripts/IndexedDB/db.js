var DB = (function () {
    var _keyBound = window.IDBKeyRange.bound;
    var _keyUpper = window.IDBKeyRange.upperBound;
    var _keyLower = window.IDBKeyRange.lowerBound;

    function db(dbName) {
        this._READWRITE = "readwrite";
        this._READONLY = "readonly";
        this._dbName = !dbName ? "local" : dbName;

        this.storage = window.webkitIndexedDB || window.indexedDB;
        this.keyRange = window.IDBKeyRange;
        this.transaction = window.IDBTransaction;

    }

    db.prototype.createTable = function (tableName, indexObject) {
        var self = this;
        self.openRequest = self.storage.open(self._dbName, 1);

        self.openRequest.onupgradeneeded = function (e) {
            var thisDB = e.target.result;

            if (!thisDB.objectStoreNames.contains(tableName)) {
                var os = thisDB.createObjectStore(tableName, { autoIncrement: true });
                //indexObject{ name:"created" , keyPath:"created", parameters:{ unique:false } }
                os.createIndex(indexObject.name, indexObject.keyPath, indexObject.parameters);
            }
        };

        self.openRequest.onsuccess = function (e) {
            App.writeLog("Подключение к базе данных прошло успешно");

            self.db = e.target.result;
        }

        self.openRequest.onerror = function (e) {
            App.writeLog("Произошла ошибка", [e]);
        }

    };

    db.prototype.addObject = function (object) {
        var dbName = this._dbName;

        this.db.transaction([dbName], this._READWRITE).objectStore(dbName).add(object);
    }

    db.prototype.getObjects = function (indexName, range) {
        var dbName = this._dbName;
        var keyRange = KeyRange(range.from, range.to);

        if (!keyRange)
            return null;

        var transaction = this.db.transaction([dbName], this._READONLY);
        var store = transaction.objectStore(dbName);
        var index = store.index(indexName);

        var objects = [];

        index.openCursor(keyRange).onsuccess = function (e) {
            var cursor = e.target.result;

            if (cursor) {
                objects.push(cursor.value);

                cursor.continue();
            }

            return objects;
        }

    }

    function KeyRange(from, to) {
        if (!from && !to)
            return null;

        if (from && to)
            return _keyBound(from, to);

        if (!from && to)
            return _keyUpper(to);

        return _keyLower(from);
    }


    return db;
})();