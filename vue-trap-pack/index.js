import RequestHandler from './src/Requests';

const VueTrapPack = {

    install(Vue, options) {

        Vue.mixin({
            mounted() {
                console.log('Vue Trap Pack!')
            }
        });

    }

};

/**
 * Use VTP
 * @function
 *
 * @param $component
 * @param [$options]
 * @return {*}
 */
const useVTP = function ($component, $options = {}) {
    /*
    * Use $component['vtp'] as $options if exists
    *
    * Enables shorthand {vtp: {}, ....componentData}
    * */
    if ($component.hasOwnProperty('vtp')) {
        $options = $component['vtp'];
        delete $component['vtp'];
    }

    /*
    * Set mixins as Array if mixins does not exists.
     */
    if (!$component.hasOwnProperty('mixins')) {
        $component.mixins = [];
    }

    /*
    * If $options has `fetch` key, it's data will be sent
    * To the RequestHandler.
     */
    if (typeof $options['fetch'] !== "undefined") {
        $component.mixins.push(new RequestHandler($options.fetch))
    }

    return $component;
};

export {VueTrapPack, useVTP};