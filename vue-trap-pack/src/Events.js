let ComponentEventsEngine, vueEar;

vueEar = window.vueEar;

export default ComponentEventsEngine = (function () {
    class ComponentEventsEngine {
        constructor(events) {
            this.events = events;
            return this.getEventsMixin();
        }

        getEventsMixin() {
            var vm;
            vm = this;
            return {
                created: function () {
                    var component;
                    component = this;
                    return Object.keys(vm.events).forEach(function (event) {
                        return vueEar.listenTo(event, function (data = {}) {
                            return vm.events[event](component, data);
                        });
                    });
                },
                beforeDestroy: function () {
                    return Object.keys(vm.events).forEach(function (event) {
                        return vueEar.stopListeningTo(event);
                    });
                }
            };
        }

    };

    ComponentEventsEngine.prototype.events = {};
    return ComponentEventsEngine;

}).call(this);
