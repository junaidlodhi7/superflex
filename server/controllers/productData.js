// var _ = require('lodash');
// function getQuery(req){
//     var q = "select CAST((ts ) AS DOUBLE PRECISION) AS x, data , labels from product_data where storage_session_id = " + req.params.storage_session_id;
//     var temp = q +" AND (";
//     _.forEach(req.body, function(node){
//         temp += ' (category = ' + node.category+' and "group" = ' + node.group +' and labels = ' + node.labels + ') OR'
//     });
//     temp = temp.substr(0, temp.length - 2);
//     temp += ")";
//     return temp;
// }


function graph (req,res) {
    var data = {};
    var node = req.body;
    var query =  "select CAST((ts) AS DOUBLE PRECISION) AS x, split_part(data, ',' , "+node.stream.index+") as y from product_data where storage_session_id = " + req.params.storage_session_id+ " and category = '" + node.category+"' and \"group\" = '" + node.group +"' and labels = '" + node.stream.labels + "' order by x asc;";
    req.db.models.sequelize.query(query)
        .then(function(result) {
            data['key'] = node.stream.key;
            data['color'] = node.color;
            data['result'] = result[0];
            return res.status(200).send({success: true, data: data});
        }).catch(function (err) {
            return req.db.sendError(err,res);
    });
}

function reterive(req,res) {
    var q = "select * from product_data where id = " + req.params.id + " and storage_session_id = " + req.params.storage_session_id;
    req.db.models.sequelize.query(q)
        .then(function(result) {
            productDataLambda.updateProductData(result[0][0]);
            return res.status(200).send({success: true, data: result[0][0]});
        }).catch(function (err) {
        return req.db.sendError(err,res);
    });
}

function group(req,res) {
    console.log(req.query.category );
    var q = "select \"group\" from product_data where category = '" +  req.query.category +"' group by \"group\"";
    console.log(q);

    req.db.models.sequelize.query(q)
        .then(function(result) {
            return res.status(200).send({success: true, data: result[0]});
        }).catch(function (err) {
        return req.db.sendError(err,res);
    });
}

function board(req,res) {
    var q = 'select category from product_data group by category ';
    req.db.models.sequelize.query(q)
        .then(function(result) {
            return res.status(200).send({success: true, data: result[0]});
        }).catch(function (err) {
        return req.db.sendError(err,res);
    });
}

function streams(req,res) {
    var q = "select labels from product_data where category = '" +  req.query.category +"' and \"group\" = '"+ req.query.group+"' group by labels ";
    req.db.models.sequelize.query(q)
        .then(function(result) {
            return res.status(200).send({success: true, data: result[0]});
        }).catch(function (err) {
        return req.db.sendError(err,res);
    });
}


module.exports = {
    graph: graph,
    reterive: reterive,
    group: group,
    board: board,
    streams: streams
};