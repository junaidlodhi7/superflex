module.exports = function (app , controller) {
    // app.post(controller.getUrl('/products'), controller.requireAuthentication, controller.product.create);
    app.get(controller.getUrl('/products'), controller.requireAuthentication , controller.product.list);
    // app.get(controller.getUrl('/products/:id'), controller.requireAuthentication, controller.product.retrieve);
    // app.put(controller.getUrl('/products/:id')  ,  controller.requireAuthentication,controller.product.update);
    // app.delete(controller.getUrl('/products/:id')  ,  controller.requireAuthentication,controller.product.destroy);
};