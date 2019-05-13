import StorageHelper from '../Helpers/StorageHelper'
import HttpHelper from '../Helpers/HttpRequest';
import Lodash from '../lodash';
import XjsRouteHandler from '../utils/XjsRouteToUrl';

const api = new HttpHelper();
api.routeHandler = XjsRouteHandler();


class HttpRequestMixin {
    getFrom() {
        return {
            route: '',
            data: {},
            jobs: {}
        };
    }

    constructor(getFrom) {
        if (typeof getFrom === 'function') {
            this.getFrom = getFrom;
        } else {
            this.getFrom = function () {
                return getFrom;
            };
        }
        return this.getMixin();
    }

    getMixin() {
        let vm = this;

        return {
            data: function () {
                return {
                    vtpRequest: {
                        data: null,
                        count: 0,
                        completed: 0,
                        countBeforeClear: 0,
                        dataBeforeClear: null
                    },
                };
            },
            mounted: function () {
                let getFrom = vm.getFrom(this);
                let length = -1;

                if (getFrom !== null) {
                    if (Array.isArray(getFrom)) {
                        length = getFrom.length
                    } else if (typeof getFrom == 'object') {
                        length = 1
                    }
                }

                this.vtpRequest.count = length;

                return this.fetchData();
            },

            computed: {
                hasServerData() {
                    return this.vtpRequest.count === this.vtpRequest.completed;
                }
            },

            methods: {
                clearFetchedData() {
                    this.vtpRequest.countBeforeClear = this.vtpRequest.count;
                    this.vtpRequest.completed = 0;

                    this.$forceUpdate();
                },

                restoreFetchedData() {
                    this.vtpRequest.completed = this.vtpRequest.countBeforeClear;
                    this.$forceUpdate();
                },

                reloadFetchedData(fromServer = null) {
                    this.fetchData(true, fromServer);
                },

                fetchData(clear = false, getFrom = null) {
                    let r, requests;
                    let component = this;

                    if (clear) {
                        this.clearFetchedData();
                    }

                    if (getFrom === null) {
                        r = vm.getFrom(component);
                    } else {
                        if (typeof getFrom === 'function') {
                            r = getFrom(component);
                        } else {
                            r = getFrom;
                        }
                    }

                    if (Array.isArray(r) && r.length) {
                        requests = r;
                        requests.forEach(function (request) {
                            const job = {
                                yes: function (data) {
                                    component.vtpRequest.completed++;
                                    if (typeof component['mountFromServer'] === 'function') {
                                        component.mountFromServer(data, request);
                                    }
                                }
                            };
                            if (!request.hasOwnProperty('jobs')) {
                                request.jobs = {};
                            }
                            if (!request.hasOwnProperty('data')) {
                                request.data = {};
                            }

                            vm.doServerGet(request, job);
                        });
                    } else {
                        let jobs = {
                            yes: function (data) {
                                component.vtpRequest.completed++;
                                if (typeof component['mountFromServer'] === 'function') {
                                    component.mountFromServer(data, r);
                                }
                            }
                        };

                        if (typeof r === 'object' && Object.keys(r).length) {
                            jobs = Lodash.extend(jobs, r.jobs);
                            if (!r.hasOwnProperty('data')) {
                                r.data = {};
                            }
                            vm.doServerGet(r, jobs);
                        }
                    }
                }
            }
        };
    }

    doServerGet(request, jobs) {
        let cacheKey, data, newJob, thisCacheGetter, thisCacheKey;
        cacheKey = 'componentCache:';
        if (request.hasOwnProperty('cache')) {
            if (Array.isArray(request.cache)) {
                thisCacheKey = request.cache[0];
                thisCacheGetter = request.cache[1];
            } else {
                thisCacheKey = request.cache;
                thisCacheGetter = null;
            }
            cacheKey = cacheKey + thisCacheKey;
            if (StorageHelper.hasData(cacheKey)) {
                data = StorageHelper.getData(cacheKey);
                return jobs.yes(data);
            } else {
                newJob = {
                    yes: function (data) {
                        if (thisCacheGetter !== null) {
                            data = thisCacheGetter(data);
                        }
                        StorageHelper.setData(cacheKey, data);
                        // vueEar.talkTo(cacheKey, data);
                        return jobs.yes(data);
                    }
                };
                return api.getFromRoute(request.route, request.data, newJob);
            }
        } else {
            return api.getFromRoute(request.route, request.data, jobs);
        }
    }

}

HttpRequestMixin.prototype.route = '#';
HttpRequestMixin.prototype.data = {};
HttpRequestMixin.prototype.jobs = {};

export default HttpRequestMixin;
