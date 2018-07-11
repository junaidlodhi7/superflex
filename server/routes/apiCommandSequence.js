module.exports = function (app , controller) {
    app.post(controller.getUrl('/api_command_sequences'), controller.requireAuthentication, controller.apiCommandSequence.create);
    app.get(controller.getUrl('/api_command_sequences'), controller.requireAuthentication , controller.apiCommandSequence.list);
    app.get(controller.getUrl('/api_command_sequences/:id'), controller.requireAuthentication, controller.apiCommandSequence.retrieve);
    app.put(controller.getUrl('/api_command_sequences/:id')  ,  controller.requireAuthentication,controller.apiCommandSequence.update);
    app.delete(controller.getUrl('/api_command_sequences/:id')  ,  controller.requireAuthentication,controller.apiCommandSequence.destroy);
};