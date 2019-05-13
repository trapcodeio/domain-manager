import ConfigManager from "../Helpers/ConfigManager";
export default ($key = '--routes') => {
    const jsRoutes = ConfigManager.loadAndDecodeData($key);

    return (route, $keys = []) => {
        if (Array.isArray(route)) {
            $keys = route[1];
            route = route[0];
        }

        if (typeof $keys === 'string') {
            $keys = [$keys];
        }

        if (typeof jsRoutes[route] !== "undefined") {
            let routeUrl = jsRoutes[route];

            if (routeUrl.substr(-1) === '*' && !$keys.length) {
                return routeUrl.substr(0, routeUrl.length - 1)
            }

            let hasParamsRule = new RegExp("[*]|(_[?][?]_)", 'g');
            let hasParam = routeUrl.match(hasParamsRule);

            if (Array.isArray(hasParam) && hasParam.length) {
                let counter = 0;
                let replacer = () => {
                    let key = $keys[counter] || '?';
                    counter++;
                    return key;
                };

                routeUrl = routeUrl.replace(hasParamsRule, replacer);
                return routeUrl;
            }

            return routeUrl;
        }

        return route;
    };
}