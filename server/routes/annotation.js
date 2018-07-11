module.exports = function (app , controller) {
    app.post(controller.getUrl('/annotations'), controller.requireAuthentication, controller.annotation.create);
    app.get(controller.getUrl('/annotations'), controller.requireAuthentication , controller.annotation.list);
    app.get(controller.getUrl('/annotations/:id'), controller.requireAuthentication, controller.annotation.retrieve);
    app.put(controller.getUrl('/annotations/:id')  ,  controller.requireAuthentication,controller.annotation.update);
    app.delete(controller.getUrl('/annotations/:id')  ,  controller.requireAuthentication,controller.annotation.destroy);
};