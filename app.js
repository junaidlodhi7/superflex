const express        = require('express');
const logger         = require('morgan');
const bodyParser     = require('body-parser');
var expressValidator = require('express-validator');

const cors           = require('cors');
const methodOverride = require('method-override');
const compression    = require("compression");
const authHelper     = require("./server/helpers/authhelper");
const controllers    = require('./server/controllers');
const yamlLint = require('yaml-lint');

const app = express();
app.use(express.static(__dirname + '/client/dist'));
app.use(compression());
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(authHelper.verifyJwtToken);

app.use(expressValidator({
    customValidators: {
        isValidDate: function isValidDate(value) {
            if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;
            const date = new Date(value);
            if (!date.getTime()) return false;
            return date.toISOString().slice(0, 10) === value;
        },
        isYaml: function isYaml(value){
            yamlLint.lint(value).then(function () {
                return true;
            }).catch(function (error) {
                return false;
            });

        }
    }
}));


// Require our routes into the application.
require('./server/routes')(app , controllers);

module.exports = app;