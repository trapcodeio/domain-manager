import Vue from "vue";
import VueTrapPack from 'vue-trap-pack';
import vtpBuilder from 'vue-trap-pack/Builder';
import VtpEar from 'vue-trap-pack/Ear';
import ConfigManger from 'vue-trap-pack/ConfigManager';
import StorageHelper from 'vue-trap-pack/StorageHelper';

const AppData = Object.freeze(
    ConfigManger.loadAndDecodeData('--appData')
);

StorageHelper.setData('appData', AppData);

window['Vue'] = Vue;
window['vtpBuilder'] = vtpBuilder;
window['vtpEar'] = new VtpEar();
window['storageHelper'] = StorageHelper;


Vue.use(VueTrapPack, {
    dataStore: storageHelper,
    ear: vtpEar,
});

