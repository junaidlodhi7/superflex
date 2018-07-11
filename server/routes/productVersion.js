module.exports = function (app , controller) {
    // app.post(controller.getUrl('/product_versions'), controller.requireAuthentication, controller.productVersion.create);
    app.get(controller.getUrl('/product_versions'), controller.requireAuthentication , controller.productVersion.list);
    // app.get(controller.getUrl('/product_versions/:id'), controller.requireAuthentication, controller.productVersion.retrieve);
    // app.put(controller.getUrl('/product_versions/:id')  ,  controller.requireAuthentication,controller.productVersion.update);
    // app.delete(controller.getUrl('/product_versions/:id')  ,  controller.requireAuthentication,controller.productVersion.destroy);
};