module.exports = function (app , controller) {
    app.post(controller.getUrl('/product_models'), controller.requireAuthentication, controller.productModel.create);
    app.get(controller.getUrl('/product_models') , controller.requireAuthentication, controller.productModel.list);
    app.get(controller.getUrl('/product_models/:id'), controller.requireAuthentication, controller.productModel.retrieve);
    app.delete(controller.getUrl('/product_models/:id'),controller.requireAuthentication, controller.productModel.destroy);
    app.put(controller.getUrl('/product_models/:id'),controller.requireAuthentication, controller.productModel.update);
};