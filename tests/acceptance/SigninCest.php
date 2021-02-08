<?php 

class SigninCest
{
    public function _before(AcceptanceTester $I)
    {
    }

    public function _after(AcceptanceTester $I)
    {        
    }

    // tests
    public function tryToTest(AcceptanceTester $I)
    {
        $I->amOnPage('/');
        $I->click('Sign Up');
        $I->submitForm('#signup', [
          'username' => 'MilesDavis', 
          'email' => 'miles@davis.com'
        ]);
        $I->see('Thank you for Signing Up!');
    }
}
