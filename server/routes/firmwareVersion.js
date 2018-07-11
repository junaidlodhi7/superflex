module.exports = function (app, controller) {
    // app.post(controller.getUrl('/firmware_versions'), controller.requireAuthentication,controller.firmwareVersion.create);
    app.get(controller.getUrl('/firmware_versions') ,controller.requireAuthentication, controller.firmwareVersion.list);
    // app.get(controller.getUrl('/firmware_versions/:id'), controller.requireAuthentication,controller.firmwareVersion.retrieve);
    // app.put(controller.getUrl('/firmware_versions/:id')  ,  controller.requireAuthentication,controller.firmwareVersion.update);
    // app.delete(controller.getUrl('/firmware_versions/:id')  ,  controller.requireAuthentication,controller.firmwareVersion.destroy);
};