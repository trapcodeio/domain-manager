import defaultDataEngine from "./DefaultData";
import ComponentEventsEngine from "./Events";
import RequiresServerEngine from "./Requests";
import DataFromCache from "./DataFromCache";

class Builder {
    constructor(component = {}) {
        this.setComponent(component);
        return this;
    }

    static from(component) {
        return new Builder(component);
    }

    setComponent(component = {}) {
        this.component = component;
        return this;
    }

    setEvents(events = {}) {
        this.events = events;
        return this;
    }

    withEvents(events = {}) {
        return this.setEvents(events);
    }

    setRequests(getFrom) {
        return this.requiresResultFromServer(getFrom);
    }

    setDataFromCache(dataFromCache = {}) {
        this.dataFromCache = dataFromCache;
        return this;
    }

    requiresResultFromServer(getFrom) {
        this.requiresResultFromServer = getFrom;
        return this;
    }

    usingFormValidator(val = true) {
        this.isUsingFormValidator = val;
        return this;
    }

    processComponent() {
        let getFrom;

        // Extend Mixins
        if (!this.component.hasOwnProperty('mixins')) {
            this.component.mixins = [];
        }

        // Set Default Data Engine
        this.component.mixins.push(defaultDataEngine);

        // Set DataFormCache
        if (this.dataFromCache !== null) {
            this.component.mixins.push(new DataFromCache(this.dataFromCache));
        }

        // Register Events
        if (Object.keys(this.events).length) {
            this.component.mixins.push(new ComponentEventsEngine(this.events));
        }

        // Require data form server.
        if (this.requiresResultFromServer !== null) {
            getFrom = this.requiresResultFromServer;
            this.component.mixins.push(new RequiresServerEngine(getFrom));
        }
    }

    render($el = null) {
        let processedComponent = this.processComponent();
        if ($el !== null) {
            return new Vue(processedComponent).$mount($el);
        }
        return processedComponent;
    }

}

Builder.prototype.component = {};
Builder.prototype.events = {};
Builder.prototype.dataFromCache = null;
Builder.prototype.requiresResultFromServer = null;


let BuildComponent = function (component = null, options = {}) {
    if (component === null) {
        return Builder;
    }

    return Builder.from(component);
};


window.BuildComponent = BuildComponent;

export {Builder, BuildComponent};
