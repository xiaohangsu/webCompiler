const Router    = require('koa-router');
const customer  = require('./../data/customer');
const Sequelize = require('sequelize');
let router = new Router();

router.post('/login', async (ctx, next)=> {
    console.log('/login Request', JSON.stringify(ctx.request.body));
    ctx.body = await customer.findUser(ctx.request.body).then((instance)=> {
        console.log('/login POST | Success: ', ctx.request.body.cuspassword, instance[0][0].cuspassword)
        if (ctx.request.body.cuspassword == instance[0][0].cuspassword) {
            return {
                status: 200,
                message: 'Success'
            }
        } else {
            return {
                status: 201,
                message: 'Failed'
            }
        }
    }).catch((err)=> {
        console.log('/login POST | ERROR', err.message);
        return {
            status: 400,
            error: err.message
        }
    });
});

router.post('/register', async (ctx, next)=> {
    console.log('/loregister gin Request', JSON.stringify(ctx.request.body));
    ctx.body = await customer.addUser(ctx.request.body).then((instance, meta)=> {
        console.log('/register POST | Success: ', JSON.stringify(instance[0]));
        return {
            status: 200,
            message: 'success'
        };
    }).catch((err) => {
        console.log('/register POST | Error: ', JSON.stringify(err));
        return {
            status: 400,
            error: err
        };
    });
});

router.post('/db/addCustomer', async (ctx, next)=> {
    ctx.body = await customer.addUser(ctx.request.body).then((instance, meta)=> {
        console.log('/db/addCustomer POST | Success: ', JSON.stringify(instance[0]));
        return {
            status: 200,
            message: 'Success'
        };
    }).catch((err) => {
        console.log('/db/addCustomer POST | Error: ', JSON.stringify(err));
        return {
            status: 400,
            error: err
        };
    });
});

router.post('/db/updateCustomerPassword', async (ctx, next)=> {
    ctx.body = await customer.updateUserPassword(ctx.request.body).then((instance)=> {
        console.log('/db/updateCustomerPassword POST | Success: ', JSON.stringify(instance[0]));
        if (instance[0].affectedRows != 0 && instance[0].changedRows != 0) {
            return {
                status: 200,
                message: 'Success'
            };

        } else {
            return {
                status: 205,
                message: 'Unmatched Or same Password'
            }
        }
    }).catch((err)=> {
        console.log('/db/updateCustomerPassword POST | Error: ', JSON.stringify(err));
        return {
            status: 400,
            error: err
        }
    });
});

router.post('/db/deleteCustomer', async (ctx, next)=> {
    ctx.body = await customer.deleteUser(ctx.request.body).then((instance)=> {
        console.log('/db/deleteCustomer POST | Success: ', JSON.stringify(instance[0]));
        if (instance[0].affectedRows != 0) {
            return {
                status: 200,
                message: 'Success'
            };
        } else {
            return {
                status: 205,
                message: 'Unmatched'
            }
        }

    }).catch((err)=> {
        console.log('/db/deleteCustomer POST | Error: ', JSON.stringify(err));
        return {
            status: 400,
            message: err
        }
    });
});

router.post('/db/updateCustomerPortraitUrl', async (ctx, next)=> {
    ctx.body = await customer.updateUserPortraitUrl(ctx.request.body).then((instance)=> {
        console.log('/db/updateCustomerPortraitUrl POST | Success: ', JSON.stringify(instance[0]));
        if (instance[0].affectedRows != 0 && instance[0].changedRows != 0) {
            return {
                status: 200,
                message: 'Success'
            };

        } else {
            return {
                status: 205,
                message: 'Unmatched Or same Url'
            }
        }
    }).catch((err)=> {
        console.log('/db/updateCustomerPortraitUrl POST | Error: ', JSON.stringify(err));
        return {
            status: 400,
            error: err
        }
    });
});

module.exports = router;