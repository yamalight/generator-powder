var should = require('should'),
    request = require('request'),
    baseUrl = 'http://localhost',
    setCookies = function() {
        var j = request.jar(),
            cookie;

        // set auth cookies
        // one
        cookie = request.cookie('connect.sid=s%3AWvitrVFhbJ7jO0_TGeG8Oepn.VAQU4Tr4rANIkVXg5PaAKNQmGXPrNvuDRWhItZ84o3vHr0ATKMbKA0oP%2BPOCgHV0UmubkC82y6gi%2F011kdzWNw');
        j.add(cookie);

        // redefine request
        request = request.defaults({jar:j, json: true});
    };

// set cookies
setCookies();

// tests
describe('Peppershop Api', function(){
    /*
     * API index, to know it's alive
     */
    it('#Index', function(done){
        request.get(baseUrl + '/api/', function (error, response, res) {
            should.not.exist(error);
            response.statusCode.should.equal(200);
            res.API.should.be.equal('OK');
            done();
        });
    });

    /*
     * AJAX proxy
     */
    it('#Ajax proxy', function(done){
        request.get(baseUrl + '/api/ajax?url='+encodeURIComponent('http://google.com'), function(error, response, res){
            should.not.exist(error);
            response.statusCode.should.equal(200);
            res.should.not.be.null;
            done();
        });
    });

    /*
     * Income API
     */
    describe('.Income (admin)', function(){
        it('#Get all income', function(done){
            // get all income
            request.get(baseUrl + '/admin/allIncome',  function (error, response, res) {
                should.not.exist(error);
                response.statusCode.should.equal(200);

                // status should be OK
                res.status.should.equal('OK');

                // check data
                res.should.have.property('income');
                res.income.length.should.be.above(0);

                // check individual entries
                // check entries
                var i, trade, date, pi;
                for(i = 0; i < res.income.length; i++){
                    trade = res.income[i];
                    // copies should exist and be number
                    trade.should.have.property('copies');
                    trade.copies.should.be.a('number');
                    // date should exist and be string
                    trade.should.have.property('date');
                    trade.date.should.be.a('string');
                    // check for proper date format
                    date = new Date(trade.date);
                    should.exist(date);
                    // game should exist and be string
                    trade.should.have.property('game');
                    trade.game.should.be.a('string');
                    // keys should exist and be string
                    trade.should.have.property('keys');
                    trade.keys.should.be.a('string');
                    // packIncome should exist and be string
                    trade.should.have.property('packIncome');
                    trade.packIncome.should.be.a('string');
                    // and should be proper float
                    pi = parseFloat(trade.packIncome);
                    should.exist(pi);
                    // steamid should exist and be string
                    trade.should.have.property('steamid');
                    trade.steamid.should.be.a('string');
                }

                done();
            });
        });

        it('#Create payout', function(done){
            // get all payouts
            request.get(baseUrl + '/admin/payouts',  function (error, response, res) {
                should.not.exist(error);
                response.statusCode.should.equal(200);

                // status should be OK
                res.status.should.equal('OK');

                var initCount = res.payouts.length,
                    data = {
                        set: {
                            user: 'fff',
                            size: '1'
                        }
                    };

                // create ongoing
                request.post(baseUrl + '/admin/payouts', {form: data}, function (error, response, res) {
                    should.not.exist(error);
                    response.statusCode.should.equal(200);

                    // status should be OK
                    res.status.should.equal('OK');

                    // get new count
                    request.get(baseUrl + '/admin/payouts',  function (error, response, res) {
                        should.not.exist(error);
                        response.statusCode.should.equal(200);

                        // status should be OK
                        res.status.should.equal('OK');

                        var newCount = res.payouts.length,
                            diff = newCount - initCount;

                        // 1 new entry
                        diff.should.equal(1);

                        done();
                    });
                });
            });
        });

        it('#Get all payouts', function(done){
            // get all payouts
            request.get(baseUrl + '/admin/payouts',  function (error, response, res) {
                should.not.exist(error);
                response.statusCode.should.equal(200);

                // status should be OK
                res.status.should.equal('OK');

                // check data
                res.should.have.property('payouts');
                res.payouts.length.should.be.above(0);

                // check individual entries
                var i, payout, pi;
                for(i = 0; i < res.payouts.length; i++){
                    payout = res.payouts[i];
                    // size should exist and be string
                    payout.should.have.property('size');
                    payout.size.should.be.a('string');
                    // should be proper int
                    pi = parseInt(payout.size, 10);
                    should.exist(pi);
                    // user should exist and be string
                    payout.should.have.property('user');
                    payout.user.should.be.a('string');
                }

                done();
            });
        });

        it('#Delete payout', function(done){
            // get all payouts
            request.get(baseUrl + '/admin/payouts',  function (error, response, res) {
                should.not.exist(error);
                response.statusCode.should.equal(200);

                // status should be OK
                res.status.should.equal('OK');

                var initCount = res.payouts.length,
                    lastEntry = res.payouts[initCount-1];

                // create ongoing
                request.del(baseUrl + '/admin/payout/'+lastEntry._id, function (error, response, res) {
                    should.not.exist(error);
                    response.statusCode.should.equal(200);

                    // status should be OK
                    res.status.should.equal('OK');

                    // get new count
                    request.get(baseUrl + '/admin/payouts',  function (error, response, res) {
                        should.not.exist(error);
                        response.statusCode.should.equal(200);

                        // status should be OK
                        res.status.should.equal('OK');

                        var newCount = res.payouts.length,
                            diff = initCount - newCount;

                        // 1 new entry
                        diff.should.equal(1);

                        done();
                    });
                });
            });
        });
    });

    /*
     * Ongoing deals API
     */
    describe('.Ongoings', function(){
        it('#Create ongoing (admin)', function(done){
            // get ongoings
            request.get(baseUrl + '/admin/ongoings',  function (error, response, res) {
                should.not.exist(error);
                response.statusCode.should.equal(200);

                // status should be OK
                res.status.should.equal('OK');

                var initCount = res.ongoing.length,
                    lastEntry = res.ongoing[initCount-1],
                    randomCopies = Math.floor(100 * Math.random()),
                    // prepare data
                    data = {
                        set: {
                            game: lastEntry.game,
                            keys: lastEntry.keys,
                            copies: randomCopies,
                            steamid: lastEntry.steamid
                        },
                        uid: lastEntry._id
                    };

                // create ongoing
                request.post(baseUrl + '/admin/ongoings', {form: data}, function (error, response, res) {
                    should.not.exist(error);
                    response.statusCode.should.equal(200);

                    // status should be OK
                    res.status.should.equal('OK');

                    // get new count
                    request.get(baseUrl + '/admin/ongoings',  function (error, response, res) {
                        should.not.exist(error);
                        response.statusCode.should.equal(200);

                        // status should be OK
                        res.status.should.equal('OK');

                        var newCount = res.ongoing.length,
                            lastEntry = res.ongoing[newCount-1];

                        newCount.should.equal(initCount);
                        lastEntry.copies.should.equal(randomCopies);

                        done();
                    });
                });
            });
        });

        it('#Get all ongoings (admin)', function(done){
            // get ongoings
            request.get(baseUrl + '/admin/ongoings',  function (error, response, res) {
                should.not.exist(error);
                response.statusCode.should.equal(200);

                // status should be OK
                res.status.should.equal('OK');
                // check data
                res.should.have.property('ongoing');
                res.ongoing.length.should.be.above(0);

                // check entries
                var i, trade, date;
                for(i = 0; i < res.ongoing.length; i++){
                    trade = res.ongoing[i];
                    // copies should exist and be number
                    trade.should.have.property('copies');
                    trade.copies.should.be.a('number');
                    // date should exist and be string
                    trade.should.have.property('date');
                    trade.date.should.be.a('string');
                    // check for proper date format
                    date = new Date(trade.date);
                    should.exist(date);
                    // game should exist and be string
                    trade.should.have.property('game');
                    trade.game.should.be.a('string');
                    // invite should exist and be string
                    trade.should.have.property('invite');
                    trade.invite.should.be.a('string');
                    // keys should exist and be string
                    trade.should.have.property('keys');
                    trade.keys.should.be.a('string');
                    // steamid should exist and be string
                    trade.should.have.property('steamid');
                    trade.steamid.should.be.a('string');
                    // user should exist and be string
                    trade.should.have.property('user');
                    trade.user.should.be.a('string');
                }

                done();
            });
        });

        it('#Delete ongoing (admin)', function(done){
            /*
             DELETE /admin/ongoings/:id -> adminTradeDelete
             */
            // get ongoings
            request.get(baseUrl + '/admin/ongoings',  function (error, response, res) {
                should.not.exist(error);
                response.statusCode.should.equal(200);

                // status should be OK
                res.status.should.equal('OK');

                var initCount = res.ongoing.length,
                    lastEntry = res.ongoing[initCount-1];

                // delete ongoing
                request.del(baseUrl + '/admin/ongoing/'+lastEntry._id, function (error, response, res) {
                    should.not.exist(error);
                    response.statusCode.should.equal(200);

                    // status should be OK
                    res.status.should.equal('OK');

                    // get new count
                    request.get(baseUrl + '/admin/ongoings',  function (error, response, res) {
                        should.not.exist(error);
                        response.statusCode.should.equal(200);

                        // status should be OK
                        res.status.should.equal('OK');

                        var newCount = res.ongoing.length,
                            newLastEntry = res.ongoing[newCount-1],
                            diff = initCount - newCount;

                        diff.should.be.equal(1);
                        lastEntry.should.not.be.equal(newLastEntry);

                        done();
                    });
                });
            });
        });

        it('#Get user ongoings', function(done){
            // get ongoings
            request.get(baseUrl + '/api/ongoing/my',  function (error, response, res) {
                should.not.exist(error);
                response.statusCode.should.equal(200);

                // status should be OK
                res.status.should.equal('OK');
                // check data
                res.should.have.property('ongoing');

                // check entries
                var i, trade, date;
                for(i = 0; i < res.ongoing.length; i++){
                    trade = res.ongoing[i];
                    // copies should exist and be number
                    trade.should.have.property('copies');
                    trade.copies.should.be.a('number');
                    // date should exist and be string
                    trade.should.have.property('date');
                    trade.date.should.be.a('string');
                    // check for proper date format
                    date = new Date(trade.date);
                    should.exist(date);
                    // game should exist and be string
                    trade.should.have.property('game');
                    trade.game.should.be.a('string');
                    // invite should exist and be string
                    trade.should.have.property('invite');
                    trade.invite.should.be.a('string');
                    // keys should exist and be string
                    trade.should.have.property('keys');
                    trade.keys.should.be.a('string');
                    // steamid should exist and be string
                    trade.should.have.property('steamid');
                    trade.steamid.should.be.a('string');
                    // user should exist and be string
                    trade.should.have.property('user');
                    trade.user.should.be.a('string');
                }

                done();
            });
        });
    });

    /*
     * Trade API
     */
    describe('.Trades', function(){
        it('#Create trade (admin)', function(done){
            var data = {
                set: {
                    url: 'http://store.steampowered.com/app/220700/?snr=1_5_9__400',
                    game: 'RPG Maker VX Ace',
                    price: '120',
                    keys: '15',
                    classid: '138174229',
                    limit: '0',
                    packSize: '4',
                    packIncome: '3',
                    description: '',
                    endTime: ''
                }
            };

            request.get(baseUrl + '/api/trades',  function (error, response, res) {
                should.not.exist(error);
                response.statusCode.should.equal(200);

                // status should be OK
                res.status.should.equal('OK');

                var initCount = res.trades.length;

                // create trade
                request.post(baseUrl + '/api/trade', {form: data}, function (error, response, res) {
                    should.not.exist(error);
                    response.statusCode.should.equal(200);

                    // status should be OK
                    res.status.should.equal('OK');

                    // get new count
                    request.get(baseUrl + '/api/trades',  function (error, response, res) {
                        should.not.exist(error);
                        response.statusCode.should.equal(200);

                        // status should be OK
                        res.status.should.equal('OK');

                        var newCount = res.trades.length,
                            diff = newCount - initCount;

                        // 1 new entry
                        diff.should.equal(1);

                        done();
                    });
                });
            });
        });

        it('#Get trades', function(done){
            request.get(baseUrl + '/api/trades',  function (error, response, res) {
                should.not.exist(error);
                response.statusCode.should.equal(200);

                // status should be OK
                res.status.should.equal('OK');

                // should have trades
                res.should.have.property('trades');
                res.trades.length.should.be.above(0);

                var i, trade, date;
                for(i = 0; i < res.trades.length; i++){
                    trade = res.trades[i];
                    // url should exist and be string
                    trade.should.have.property('url');
                    trade.url.should.be.a('string');
                    // game should exist and be string
                    trade.should.have.property('game');
                    trade.game.should.be.a('string');
                    // price should exist and be string
                    trade.should.have.property('price');
                    trade.price.should.be.a('string');
                    // keys should exist and be string
                    trade.should.have.property('keys');
                    trade.keys.should.be.a('string');
                    // classid should exist and be string
                    trade.should.have.property('classid');
                    trade.classid.should.be.a('string');
                    // limit should exist and be string
                    trade.should.have.property('limit');
                    trade.limit.should.be.a('string');
                    // packSize should exist and be string
                    trade.should.have.property('packSize');
                    trade.packSize.should.be.a('string');
                    // packIncome should exist and be string
                    trade.should.have.property('packIncome');
                    trade.packIncome.should.be.a('string');
                    // description should exist and be string
                    trade.should.have.property('description');
                    trade.description.should.be.a('string');
                    // endTim should exist and be string
                    trade.should.have.property('endTime');
                    trade.endTime.should.be.a('string');
                    if(trade.endTime.length > 0){
                        date = new Date(trade.endTime);
                        should.exist(date);
                    }
                }

                done();
            });
        });

        it('#Delete trade (admin)', function(done){
            request.get(baseUrl + '/api/trades',  function (error, response, res) {
                should.not.exist(error);
                response.statusCode.should.equal(200);

                // status should be OK
                res.status.should.equal('OK');

                var initCount = res.trades.length,
                    lastTrade = res.trades[initCount-1];

                // create trade
                request.del(baseUrl + '/api/trade/'+lastTrade._id, function (error, response, res) {
                    should.not.exist(error);
                    response.statusCode.should.equal(200);

                    // status should be OK
                    res.status.should.equal('OK');

                    // get new count
                    request.get(baseUrl + '/api/trades',  function (error, response, res) {
                        should.not.exist(error);
                        response.statusCode.should.equal(200);

                        // status should be OK
                        res.status.should.equal('OK');

                        var newCount = res.trades.length,
                            diff = initCount - newCount;

                        // 1 new entry
                        diff.should.equal(1);

                        done();
                    });
                });
            });
        });

        it('#Open trade', function(done){
            request.get(baseUrl + '/api/trades',  function (error, response, res) {
                should.not.exist(error);
                response.statusCode.should.equal(200);

                // status should be OK
                res.status.should.equal('OK');

                var initCount = res.trades.length,
                    lastTrade = res.trades[initCount-1];

                // create trade
                request.post(baseUrl + '/api/trade/'+lastTrade._id+'/open', function (error, response, res) {
                    should.not.exist(error);
                    response.statusCode.should.equal(200);

                    // if error
                    if (res.status === 'ERROR') {
                        // check for allowed errors
                        if (res.message !== 'Limit reached!' && res.message !== 'Not enough keys!' && res.message !== 'Not enough karma!') {
                            // fail if not them
                            should.fail('DB error!');
                        }
                    } else if (res.status === 'OK') {
                        // all is OK
                    } else {
                        // fail for other reason, wtf
                        should.fail('Strange status error! WTF?');
                    }

                    done();
                });
            });
        });
    });

    /*
     * Users API
     */
    describe('.Users', function(){
        it('#Update user (admin)', function(done){
            var updateUser = {'uid': '51fbfb3c8556457a5f000001', 'set': {'karma': 133.7}};

            // update user karma first, so that we always have currency to spend
            request.post(baseUrl + '/admin/users', {form: updateUser}, function(error, response, res) {
                // no error
                should.not.exist(error);
                response.statusCode.should.equal(200);
                // response ok
                res.status.should.equal('OK');

                request.get(baseUrl + '/admin/allUsers',  function (error, response, res) {
                    should.not.exist(error);
                    response.statusCode.should.equal(200);

                    // status should be OK
                    res.status.should.equal('OK');

                    // check if there are entries
                    res.should.have.property('users');
                    res.users.length.should.be.above(0);

                    // check entries format
                    var i, user, found = false;
                    for(i = 0; i < res.users.length; i++){
                        user = res.users[i];
                        if(user._id === updateUser.uid){
                            found = true;
                            break;
                        }
                    }

                    found.should.be.true;
                    user.karma.should.equal(133.7);

                    done();
                });
            });
        });

        it('#Get all users (admin)', function(done){
            request.get(baseUrl + '/admin/allUsers',  function (error, response, res) {
                should.not.exist(error);
                response.statusCode.should.equal(200);

                // status should be OK
                res.status.should.equal('OK');

                // check if there are entries
                res.should.have.property('users');
                res.users.length.should.be.above(0);

                // check entries format
                var i, user, date;
                for(i = 0; i < res.users.length; i++){
                    user = res.users[i];
                    // regged should exist and be bool
                    user.should.have.property('regged');
                    user.regged.should.be.a('boolean');
                    // if user is not regged, skip
                    if(!user.regged){
                        continue;
                    }
                    // admin should be a string
                    if(user.hasOwnProperty('admin')){
                        user.admin.should.be.a('string');
                    }
                    // allowTrade should exist and be a string
                    user.should.have.property('allowTrade');
                    user.allowTrade.should.be.a('string');
                    // date should exist and be string
                    user.should.have.property('date');
                    user.date.should.be.a('string');
                    // date should be proper format
                    date = new Date(user.date);
                    should.exist(date);
                    // games should exist
                    user.should.have.property('games');
                    // invite should exist and be string
                    user.should.have.property('invite');
                    user.invite.should.be.a('string');
                    // karma should exist and be num
                    user.should.have.property('karma');
                    user.karma.should.be.a('number');
                    // steam should exist and be string
                    user.should.have.property('steam');
                    user.steam.should.be.a('string');
                    // user should exist and be string
                    user.should.have.property('user');
                    user.user.should.be.a('string');
                    // parent should exist and be string
                    user.should.have.property('parent');
                    user.parent.should.be.a('string');
                    // userInvited should exist and be string
                    user.should.have.property('userInvited');
                    user.userInvited.should.be.a('string');
                }

                done();
            });
        });
    });

    /*
     * Invite API
     */
    describe('.Invites', function(){
        it('#Create invite (admin)', function(done){
            request.get(baseUrl + '/admin/allInvites', function (error, response, res) {
                should.not.exist(error);
                response.statusCode.should.equal(200);

                // status should be OK
                res.status.should.equal('OK');

                var initialCount = res.invites.length,
                    data = {
                        set: {
                            code: 'test_invite',
                            count: '10',
                            owner: '0'
                        }
                    };

                // create invite
                request.post(baseUrl + '/admin/invites', {form: data}, function (error, response, res) {
                    // no error
                    should.not.exist(error);
                    response.statusCode.should.equal(200);
                    // response ok
                    res.status.should.equal('OK');

                    // re-get invites
                    request.get(baseUrl + '/admin/allInvites', function (error, response, res) {
                        // no error
                        should.not.exist(error);
                        response.statusCode.should.equal(200);

                        var newCount = res.invites.length,
                            diff = newCount - initialCount;

                        // check if invite added
                        diff.should.be.equal(1);

                        // done
                        done();
                    });
                });
            });
        });

        it('#Get all invites (admin)', function(done){
            request.get(baseUrl + '/admin/allInvites', function (error, response, res) {
                should.not.exist(error);
                response.statusCode.should.equal(200);

                // vars
                var invite, i;

                // status should be OK
                res.status.should.equal('OK');

                // check if there are entries
                res.should.have.property('invites');
                res.invites.length.should.be.above(0);

                // check entries format
                for(i = 0; i < res.invites.length; i++){
                    invite = res.invites[i];
                    // code should exist and be a string
                    invite.should.have.property('code');
                    invite.code.should.be.a('string');
                    // count should exist and be int
                    invite.should.have.property('count');
                    invite.count.should.be.a('number');
                    // owner should exist and be string
                    invite.should.have.property('owner');
                    invite.owner.should.be.a('string');
                    // user may exist and should be a string
                    if(invite.hasOwnProperty('user')){
                        invite.user.should.be.a('string');
                    }
                }
                done();
            });
        });

        it('#Apply invite', function(done) {
            request.post(baseUrl + '/api/invite', {form: {steam: '76561198015539882', invite: 'test_invite'}}, function (error, response, res) {
                should.not.exist(error);
                response.statusCode.should.equal(200);

                // status should be OK
                res.status.should.equal('OK');

                done();
            });
        });

        it('#Delete invite (admin)', function(done) {
            request.get(baseUrl + '/admin/allInvites', function (error, response, res) {
                should.not.exist(error);
                response.statusCode.should.equal(200);

                // status should be OK
                res.status.should.equal('OK');

                var initialCount = res.invites.length,
                    lastInvite = res.invites[initialCount-1];

                // create invite
                request.del(baseUrl + '/admin/invite/'+lastInvite._id, function (error, response, res) {
                    // no error
                    should.not.exist(error);
                    response.statusCode.should.equal(200);
                    // response ok
                    res.status.should.equal('OK');

                    // re-get invites
                    request.get(baseUrl + '/admin/allInvites', function (error, response, res) {
                        // no error
                        should.not.exist(error);
                        response.statusCode.should.equal(200);

                        var newCount = res.invites.length,
                            diff = initialCount - newCount;

                        // check if invite added
                        diff.should.be.equal(1);

                        // done
                        done();
                    });
                });
            });
        });

        it('#Create user invite', function (done) {
            var updateUser = {'uid': '51fbfb3c8556457a5f000001', 'set': {'karma': 100}};

            // update user karma first, so that we always have currency to spend
            request.post(baseUrl + '/admin/users', {form: updateUser}, function(error, response, res) {
                // no error
                should.not.exist(error);
                response.statusCode.should.equal(200);
                // response ok
                res.status.should.equal('OK');

                // get current invite count
                request.get(baseUrl + '/api/invites/my', function (error, response, res) {
                    // no error
                    should.not.exist(error);
                    response.statusCode.should.equal(200);
                    // response ok
                    res.status.should.equal('OK');
                    // has invites field
                    res.should.have.property('invites');

                    var initialCount = res.invites.length;

                    // create invite
                    request.post(baseUrl + '/api/invites/create', function (error, response, res) {
                        // no error
                        should.not.exist(error);
                        response.statusCode.should.equal(200);
                        // response ok
                        res.status.should.equal('OK');

                        // get new invite count
                        // get current invite count
                        request.get(baseUrl + '/api/invites/my', function (error, response, res) {
                            // no error
                            should.not.exist(error);
                            response.statusCode.should.equal(200);
                            // response ok
                            res.status.should.equal('OK');
                            // has invites field
                            res.should.have.property('invites');

                            var newCount = res.invites.length,
                                diff = newCount - initialCount;

                            // check if invite added
                            diff.should.be.equal(1);

                            done();
                        });
                    });
                });
            });
        });

        it('#Get user invites', function (done) {
            request.get(baseUrl + '/api/invites/my', function (error, response, res) {
                // no error
                should.not.exist(error);
                response.statusCode.should.equal(200);
                // response ok
                res.status.should.equal('OK');
                // has invites field
                res.should.have.property('invites');

                var i, invite;

                // check entries format
                for(i = 0; i < res.invites.length; i++){
                    invite = res.invites[i];
                    // code should exist and be a string
                    invite.should.have.property('code');
                    invite.code.should.be.a('string');
                    // count should exist and be int
                    invite.should.have.property('count');
                    invite.count.should.be.a('number');
                    // owner should exist and be string
                    invite.should.have.property('owner');
                    invite.owner.should.be.a('string');
                }

                done();
            });
        });
    });
});