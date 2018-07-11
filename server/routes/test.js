module.exports = function (app, controller) {
    app.get(controller.getUrl('/motor_intervals') , controller.requireAuthentication , controller.test.motor_intervals);
};