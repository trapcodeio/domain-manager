class DataFromCache {
    constructor(dataFromCache) {
        this.dataFromCache = dataFromCache;
        return this.getDataToCacheMixin();
    };

    getDataToCacheMixin() {
        let vm, data;
        vm = this;

        data = {};

        Object.keys(this.dataFromCache).forEach(function (name) {
            data[name] = null
        });

        return {

            data: function () {
                return data
            },

            mounted: function () {
                let component = this;

                Object.keys(vm.dataFromCache).forEach(function (data) {
                    let cacheData, cacheKey;
                    cacheKey = vm.dataFromCache[data];
                    if (Array.isArray(cacheKey) && typeof cacheKey[1] === 'function') {
                        cacheData = component.getCache(cacheKey[0], null);
                        if (cacheData !== null) {
                            cacheData = cacheKey[1](cacheData);
                        }
                    } else {
                        cacheData = component.getCache(cacheKey, null);
                    }

                    Vue.set(component, data, cacheData)
                });
            }
        };
    };
}

DataFromCache.prototype.dataFromCache = {};

export default DataFromCache;