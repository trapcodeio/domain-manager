let StorageHelperData = {};

let StorageHelper = {
    getAllData() {
        return StorageHelperData;
    },

    getStorageKey(name) {
        return 'app-store:' + name;
    },

    hasStoredData(key) {
        return localStorage.getItem(this.getStorageKey(key)) !== null;
    },

    storeData(name, value) {
        if (typeof value === 'object') value = JSON.stringify(value);

        if (localStorage) {
            localStorage.setItem(this.getStorageKey(name), value);
        }
    },


    getStoredData(key, $default = null, json = false) {
        if (!this.hasStoredData(key)) {
            return $default;
        }

        let value = localStorage.getItem(this.getStorageKey(key));
        if (json) {
            return JSON.parse(value)
        } else {
            if (value === 'true') return true;
            if (value === 'false') return false;
        }

        return value;
    },

    getStoredJsonData(key, $default = null) {
        return this.getStoredData(key, $default, true);
    },

    delStoredData(key) {
        localStorage.removeItem(this.getStorageKey(key));
    },

    getTempStorageKey(name) {
        return 'app-temp-store:' + name;
    },

    delTempStoredData(key) {
        if (!sessionStorage) {
            return;
        }
        sessionStorage.removeItem(this.getTempStorageKey(key));
    },

    hasTempStoredData(key) {
        if (!sessionStorage) {
            return;
        }

        return sessionStorage.getItem(this.getTempStorageKey(key)) !== null;
    },

    storeTempData(name, value) {
        if (!sessionStorage) {
            return;
        }

        sessionStorage.setItem(this.getTempStorageKey(name), value);
    },


    getTempStoredData(key, $default = null) {
        if (!sessionStorage) {
            return;
        }

        if (!this.hasStoredData(key)) {
            return $default;
        }

        let value = sessionStorage.getItem(this.getTempStorageKey(key));
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    },

    setData(name, value, store = false) {
        StorageHelperData[name] = value;

        if (store) {
            this.storeData(name, value);
        }

        return StorageHelperData[name];
    },

    getData(name, value = void 0) {
        if (this.hasData(name)) {
            return StorageHelperData[name];
        } else {
            return value;
        }
    },

    hasData(name, value = null) {
        if (value === null) {
            return StorageHelperData.hasOwnProperty(name);
        } else {
            if (StorageHelperData.hasOwnProperty(name) && StorageHelperData[name] === value) {
                return true;
            }
        }
        return false;
    },

    delData(name) {
        if (this.hasData(name)) {
            return delete StorageHelperData[name];
        }
    },

    prevData(refresh = false) {
        let id;
        if (refresh) {
            id = this.setData('prevData_id', ng.randomStr());
        } else {
            id = this.getData('prevData_id');
        }
        return id;
    },

    getComponentCache(key, $default = {}) {
        let cacheKey;
        if (typeof key === 'string') {
            cacheKey = 'componentCache:' + key.trim();
            if (this.hasData(cacheKey)) {
                return this.getData(cacheKey);
            }
        }
        return $default;
    },

    setComponentCache(key, value) {
        let cacheKey;
        if (typeof key === 'string') {
            cacheKey = 'componentCache:' + key.trim();
            return this.setData(cacheKey, value);
        }

        return value;
    },

    hasComponentCache(key) {
        let cacheKey = 'componentCache:' + key.trim();
        return this.hasData(cacheKey);
    }

};

export default StorageHelper;