class ConfigManager {
    static loadAndDecodeData(windowKey) {
        if (window.hasOwnProperty(windowKey)) {
            let config, jsConfig;
            jsConfig = window[windowKey];
            config = ConfigManager.decode(jsConfig);
            return JSON.parse(config);
        }
    }

    static encode(str) {
        if (typeof str === 'object') {
            str = JSON.stringify(str);
        }
        return btoa(str);
    }

    static decode(str) {
        return atob(str);
    }

}

export default ConfigManager;

