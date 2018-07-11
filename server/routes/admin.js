module.exports = function (app , controller) {
    app.post(controller.getUrl('/admins'),controller.requireAuthentication, controller.admins.create);
    app.get(controller.getUrl('/admins') ,controller.requireAuthentication, controller.admins.list);
    app.get(controller.getUrl('/admins/:id'), controller.requireAuthentication,controller.admins.retrieve);
    app.put(controller.getUrl('/admins/:id'), controller.requireAuthentication ,controller.admins.update);
    app.delete(controller.getUrl('/admins/:id'), controller.requireAuthentication , controller.admins.destroy);
    app.put(controller.getUrl('/profile'), controller.requireAuthentication  ,  controller.admins.profile);
};