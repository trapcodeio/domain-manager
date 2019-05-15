import Vue from "vue";
import VueRouter from "vue-router";
import VueTrapPack from 'vue-trap-pack';
import vtpBuilder from 'vue-trap-pack/Builder';
import VtpEar from 'vue-trap-pack/Ear';
import ConfigManger from 'vue-trap-pack/ConfigManager';
import StorageHelper from 'vue-trap-pack/StorageHelper';

Vue.use(VueRouter);


const AppData = Object.freeze(
    ConfigManger.loadAndDecodeData('--appData')
);


window['Vue'] = Vue;
window['VueRouter'] = VueRouter;
window['vtpBuilder'] = vtpBuilder;
window['vtpEar'] = new VtpEar();
window['$store'] = StorageHelper;

$store.setData('app:data', AppData['app']);
$store.setData('app:user', AppData['user']);

Vue.use(VueTrapPack, {
    ear: vtpEar,
    framework: 'xjs',
    store: $store,

    autoload: {
        app: AppData['app'],
        user: AppData['user']
    }
});

