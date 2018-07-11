module.exports = function (app , controller) {
    // app.post(controller.getUrl('/product_config_revisions'), controller.requireAuthentication, controller.productConfigRevision.create);
    app.get(controller.getUrl('/product_config_revisions') , controller.requireAuthentication, controller.productConfigRevision.list);
    // app.get(controller.getUrl('/product_config_revisions/:id'), controller.requireAuthentication, controller.productConfigRevision.retrieve);
    // app.put(controller.getUrl('/product_config_revisions/:id')  ,  controller.requireAuthentication,controller.productConfigRevision.update);
    // app.delete(controller.getUrl('/product_config_revisions/:id')  ,  controller.requireAuthentication,controller.productConfigRevision.destroy);
};