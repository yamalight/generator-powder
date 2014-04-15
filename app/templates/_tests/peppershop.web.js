var should = require('should'),
    Browser = require('zombie'),
    browser = new Browser({ site: 'http://localhost' });

describe('Peppershop Web Site', function(){
    /*
     * Non-authed part
     */
    it('Index page without cookies', function(done){
        // visit
        browser.visit('/', function () {
            browser.success.should.be.ok;
            browser.text('title').should.be.equal('Steam Game Crates');
            browser.body.innerHTML.indexOf("В данный момент мы пускаем только по приглашения. Есть приглашение? Уже зарегистрированы? Добро пожаловать! :3").should.be.above(0);
            browser.queryAll('.openTrade').length.should.be.equal(0);

            // set auth cookies
            browser.setCookie({name: 'connect.sid', domain: 'localhost', value: 's%3AWvitrVFhbJ7jO0_TGeG8Oepn.VAQU4Tr4rANIkVXg5PaAKNQmGXPrNvuDRWhItZ84o3vHr0ATKMbKA0oP%2BPOCgHV0UmubkC82y6gi%2F011kdzWNw'});

            done();
        });
    });

    /*
     * User part
     */
    it('Index page with cookies', function(done){
        browser.visit('/', function(){
            browser.success.should.be.ok;
            browser.text('title').should.be.equal('Steam Game Crates');
            browser.queryAll('button.openTrade').length.should.be.above(0);
            done();
        });
    });

    it('Profile page', function(done){
        browser.visit('/myprofile', function(){
            browser.success.should.be.ok;
            browser.text('title').should.be.equal('Steam Game Crates - Мой профиль');
            browser.text('span#karma').length.should.be.above(0);
            done();
        });
    });

    it('FAQ page', function(done){
        browser.visit('/faq', function(){
            browser.success.should.be.ok;
            browser.text('title').should.be.equal('Steam Game Crates - FAQ');
            browser.text('div#faqAccordion').length.should.be.above(0);
            done();
        });
    });

    /*
     * Admin part
     */
    it('Users admin page', function(done){
        this.timeout(5000);

        browser.visit('/admin', function(){
            browser.success.should.be.ok;
            browser.text('title').should.be.equal('Steam Game Crates - Управление пользователями');
            browser.queryAll('input.allowTrade').length.should.be.above(0);
            var checkboxes = browser.queryAll('input.allowTrade').length === browser.queryAll('input.admin').length;
            checkboxes.should.be.true;
            done();
        });
    });

    it('Ongoing admin page', function(done){
        browser.visit('/admin/ongoing', function(){
            browser.success.should.be.ok;
            browser.text('title').should.be.equal('Steam Game Crates - Открытые трейды');
            browser.check('#showCompleted');
            browser.queryAll('a.editTradeBtn').length.should.be.above(0);
            done();
        });
    });

    it('Invites admin page', function(done){
        browser.visit('/admin/invites', function(){
            browser.success.should.be.ok;
            browser.text('title').should.be.equal('Steam Game Crates - Управление инвайтами');
            browser.queryAll('a.editInviteBtn').length.should.be.above(0);
            done();
        });
    });

    it('Income admin page', function(done){
        browser.visit('/admin/income', function(){
            browser.success.should.be.ok;
            browser.text('title').should.be.equal('Steam Game Crates - Доходы');
            browser.queryAll('a.editPayoutBtn').length.should.be.above(0);
            parseInt(browser.text('#packsSold'), 10).should.be.above(0);
            parseFloat(browser.text('#packsIncome')).should.be.above(0);
            parseFloat(browser.text('#packsExpense')).should.be.above(0);
            parseFloat(browser.text('#packsBalance')).should.be.above(0);
            done();
        });
    });

    it('Bot admin page', function(done){
        browser.visit('/admin/bot', function(){
            browser.success.should.be.ok;
            browser.text('title').should.be.equal('Steam Game Crates - Управление ботом');
            browser.queryAll('#restartBot').length.should.be.equal(1);
            done();
        });
    });

    it('Snippets admin page', function(done){
        browser.visit('/admin/snippets', function(){
            browser.success.should.be.ok;
            browser.text('title').should.be.equal('Steam Game Crates - Скрипты');
            browser.queryAll('pre').length.should.be.above(0);
            done();
        });
    });
});