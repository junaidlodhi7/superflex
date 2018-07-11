module.exports = function (app , controller) {
    app.post(controller.getUrl('/storage_sessions/:storage_session_id/graph'), controller.requireAuthentication, controller.productData.graph);
    app.get(controller.getUrl('/storage_sessions/:storage_session_id/product_data/:id'), controller.requireAuthentication, controller.productData.reterive);
    app.get(controller.getUrl('/product_data/groups'), controller.requireAuthentication, controller.productData.group);
    app.get(controller.getUrl('/product_data/boards'), controller.requireAuthentication, controller.productData.board);
    app.get(controller.getUrl('/product_data/streams'), controller.requireAuthentication, controller.productData.streams);
};