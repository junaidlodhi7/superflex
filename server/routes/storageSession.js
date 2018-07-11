module.exports = function (app , controller) {
    app.post(controller.getUrl('/storage_sessions'), controller.requireAuthentication, controller.storageSession.create);
    app.get(controller.getUrl('/storage_sessions'), controller.requireAuthentication , controller.storageSession.list);
    app.get(controller.getUrl('/storage_sessions/:id'), controller.requireAuthentication, controller.storageSession.retrieve);
    app.put(controller.getUrl('/storage_sessions/:id')  ,  controller.requireAuthentication,controller.storageSession.update);
    app.delete(controller.getUrl('/storage_sessions/:id')  ,  controller.requireAuthentication,controller.storageSession.destroy);
};