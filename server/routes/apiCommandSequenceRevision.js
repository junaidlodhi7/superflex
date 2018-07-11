module.exports = function (app , controller) {
    app.post(controller.getUrl('/api_command_sequence_revisions'), controller.requireAuthentication, controller.apiCommandSequenceRevision.create);
    app.get(controller.getUrl('/api_command_sequences/:api_command_sequence_id/api_command_sequence_revisions'), controller.requireAuthentication , controller.apiCommandSequenceRevision.list);
    app.get(controller.getUrl('/api_command_sequence_revisions'), controller.requireAuthentication , controller.apiCommandSequenceRevision.list);
    app.get(controller.getUrl('/api_command_sequence_revisions/:id'), controller.requireAuthentication, controller.apiCommandSequenceRevision.retrieve);
    app.put(controller.getUrl('/api_command_sequence_revisions/:id')  ,  controller.requireAuthentication,controller.apiCommandSequenceRevision.update);
    app.delete(controller.getUrl('/api_command_sequence_revisions/:id')  ,  controller.requireAuthentication,controller.apiCommandSequenceRevision.destroy);
};