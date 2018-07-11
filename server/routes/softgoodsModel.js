module.exports = function (app , controller) {
    app.post(controller.getUrl('/softgoods_models'), controller.requireAuthentication, controller.softgoodsModel.create);
    app.get(controller.getUrl('/softgoods_models'), controller.requireAuthentication , controller.softgoodsModel.list);
    app.get(controller.getUrl('/softgoods_models/:id'), controller.requireAuthentication, controller.softgoodsModel.retrieve);
    app.put(controller.getUrl('/softgoods_models/:id'),controller.requireAuthentication, controller.softgoodsModel.update);
    app.delete(controller.getUrl('/softgoods_models/:id'),controller.requireAuthentication, controller.softgoodsModel.destroy);
};