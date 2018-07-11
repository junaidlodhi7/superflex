module.exports = function (app , controller) {
    app.post(controller.getUrl('/hardware_versions'), controller.requireAuthentication,controller.hardwareVersion.create);
    app.get(controller.getUrl('/hardware_versions') ,controller.requireAuthentication, controller.hardwareVersion.list);
    app.get(controller.getUrl('/hardware_versions/:id'),controller.requireAuthentication, controller.hardwareVersion.retrieve);
    app.put(controller.getUrl('/hardware_versions/:id'),controller.requireAuthentication, controller.hardwareVersion.update);
    app.delete(controller.getUrl('/hardware_versions/:id'),controller.requireAuthentication, controller.hardwareVersion.destroy);

};