var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');

/**
 * @api {post} /users Create a new User
 * @apiVersion 0.3.0
 * @apiName PostUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription In this case "apiUse" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiParam {String} name Name of the User.
 * @apiParam {String} mail Mail of the User.
 * @apiParam {String} password Password of the User.
 *
 * @apiSuccess {String} _v         The new Users-ID.
 * @apiSuccess {String} name       The new Users-Name.
 * @apiSuccess {String} mail       The new Users-Mail.
 * @apiSuccess {String} password   The new Users-Password.
 *
 * @api {post} /users
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_V": "cvfdgdfg",
 *       "name": "john",
 *       "mail":"jhon@hotmail.com",
 *       "password":"asdasfsdf"
 *     }
 * 
 * @apiSampleRequest http://localhost:3000/users
 * @apiParam {String} name Name of the User.
 * @apiParam {String} mail Mail of the User.
 * @apiParam {String} password Password of the User.
 * 
 * @apiUse CreateUserError
 */
router.post('/', function (req, res) {
    User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});

/**
 * @api {get} /users Read data of a Users
 * @apiVersion 0.3.0
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiDescription Compare Verison 0.3.0 with 0.2.0 and you will see the green markers with new items in version 0.3.0 and red markers with removed items since 0.2.0.
 *
 *
 * @apiExample Example usage:
 * curl -i http://localhost:3000/users
 *
 * @apiSuccess {String} _v         The new Users-ID.
 * @apiSuccess {String} name       The new Users-Name.
 * @apiSuccess {String} mail       The new Users-Mail.
 * @apiSuccess {String} password   The new Users-Password.
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError UserNotFound   The <code>id</code> of the User was not found.
 *
 * 
 * 
 * @api {get} /users
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "_V": "cvfdgdfg",
 *       "name": "john",
 *       "mail":"jhon@hotmail.com",
 *       "password":"asdasfsdf"
 *     }]
 *
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 Not Authenticated
 *     {
 *       "error": "NoAccessRight"
 *     }
 * 
 * 
 * @apiSampleRequest http://localhost:3000/users
 * @api {get} /users
 */
 
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});


module.exports = router;