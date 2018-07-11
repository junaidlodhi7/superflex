module.exports = function (app , controller) {
    app.post(controller.getUrl('/product_configs'), controller.requireAuthentication, controller.productConfig.create);
    app.get(controller.getUrl('/product_configs') , controller.requireAuthentication, controller.productConfig.list);
    app.get(controller.getUrl('/product_configs/:id'), controller.requireAuthentication, controller.productConfig.retrieve);
    app.put(controller.getUrl('/product_configs/:id')  ,  controller.requireAuthentication,controller.productConfig.update);
    app.delete(controller.getUrl('/product_configs/:id')  ,  controller.requireAuthentication,controller.productConfig.destroy);
};