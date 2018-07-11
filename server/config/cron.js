require('dotenv').config();
const cron     = require('node-cron');
const db       = require('../config/db');
const Pusher   = require('pusher');

const minute = 60000;

var pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: 'us2',
    encrypted: true
});

cron.schedule('* * * * *', function(){
    console.log('You will see this message every minute.');
    var params = {tableName: 'Test'};
    params.body = { where: {end_time: {$gt: Date.now() + 4 * minute  , $lte: Date.now() + 5 * minute}} , attributes: ['id' , 'start_time' , 'end_time' , 'label' , 'created_by_id']};
    db.models[params.tableName].findAll(params.body).then(function (data) {
        data.forEach(function (test) {
            pusher.trigger('channel-'+ test.created_by_id, 'test-extend', {
                "test_id": test.id,
                "start_time": test.start_time,
                "end_time": test.end_time,
                "label": test.label
                // "first_name": user.first_name,
                // "last_name": user.last_name
            });
            // test.users.forEach(function (user) {
            //
            // });
        });
    });
});
