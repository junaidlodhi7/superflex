module.exports = function (app , controller) {
    app.post(controller.getUrl('/softgoods_versions'), controller.requireAuthentication, controller.softgoodsVersion.create);
    app.get(controller.getUrl('/softgoods_versions'), controller.requireAuthentication , controller.softgoodsVersion.list);
    app.get(controller.getUrl('/softgoods_versions/:id'), controller.requireAuthentication, controller.softgoodsVersion.retrieve);
    app.put(controller.getUrl('/softgoods_versions/:id')  ,  controller.requireAuthentication,controller.softgoodsVersion.update);
    app.delete(controller.getUrl('/softgoods_versions/:id')  ,  controller.requireAuthentication,controller.softgoodsVersion.destroy);
};