module.exports = function (app , controller) {
    app.post(controller.getUrl('/hardware_components'),controller.requireAuthentication, controller.hardwareComponent.create);
    app.get(controller.getUrl('/hardware_components') ,controller.requireAuthentication, controller.hardwareComponent.list);
    app.get(controller.getUrl('/hardware_components/:id'), controller.requireAuthentication,controller.hardwareComponent.retrieve);
    app.put(controller.getUrl('/hardware_components/:id'),controller.requireAuthentication, controller.hardwareComponent.update);
    app.delete(controller.getUrl('/hardware_components/:id'),controller.requireAuthentication, controller.hardwareComponent.destroy);
};