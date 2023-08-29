/// <reference types="Cypress" />

describe('registration test case', () => {
  it('registers a user to the unibet platform', () => {

    cy.visit('https://www.unibet.co.uk/registration')
    cy.wait(3000)
    
    // 1. a) Page title is equal to “Join the club”
    cy.get('h3[data-test-name="header-title"]').invoke('text').should('contain', 'Join the club');        
  
    // 1. b) At least one promotion is available
    cy.get('div[data-dn="bonus-offer"]').should('exist');

    // 1. c) First promotion is selected (contains Selected label)
    cy.get('div[data-dn="bonus-offer"]').first().find('[data-test-name="wbo-selected-offer"]').should('exist');

    // 1. d) Verify the button exists and has correct color
    cy.get('button[data-dn="Button"][data-variant="hero"][data-test-name="submit-button"]').should('exist');
    cy.get('button[data-dn="Button"][data-variant="hero"][data-test-name="submit-button"]').should('have.css', 'background-color', 'rgb(255, 231, 31)');

    // 2. Click skip button
    cy.get('a[data-dn="TextLink"][data-test-name="skip-welcome-bonus-offer-link"]').click();

    // 3. a) Verify that registration form is visible
    cy.get('form').should('exist');

    // 3. b) Verify that Step 1 is marked in Green (progress visualisation)
    cy.get('[data-test-name="progress-bar-bubble"]').should('have.css', 'background-color', 'rgb(0, 83, 29)');

    // 3. c) All input fields and drop-down selections are visible
    cy.get('input[data-dn="TextInput"]').each(($inputField) => {
      cy.wrap($inputField).should('be.visible');
    });
    
    cy.get('select').each(($selectElement) => {
      cy.wrap($selectElement).should('be.visible');
    });

    // 3. d) Continue Button is greyed out and not clickable while fields are not filled
    cy.get('button[data-dn="Button"][data-variant="hero"][data-test-name="submit-button"]').should('be.disabled'); 


    // 4. Write different validations for Email field (using fixtures)
    cy.fixture('emails').then((emails) => {

      // Verify that an invalid email format shows an error
      cy.get('[data-test-name="email-input-field"]').clear().type(emails.invalidEmail1).blur();
      cy.get('[data-test-name="email-error-message"]').should('be.visible').and('contain', 'Please enter a valid email address.');

      // Verify that an empty email field shows an error
      cy.get('[data-test-name="email-input-field"]').clear()
      cy.get('[data-test-name="email-error-message"]').should('be.visible').and('contain', 'Email address cannot be empty');

      // Verify that a valid email has been entered
      cy.get('[data-test-name="email-input-field"]').type(emails.validEmail);
      cy.get('[data-test-name="email-success-icon"]').should('be.visible');
    });

    // 5. Fill all the fields with valid data and click Continue button
    cy.get('[data-test-name="firstName-input-field"]').type('bob')
    cy.get('[data-test-name="lastName-input-field"]').type('odenkirk')
    cy.get('[data-test-name="password-input-field"]').type('somePassword33')

    cy.get('select[name="dateVal"]').select('15').should('have.value', '15');
    cy.get('select[name="monthVal"]').select('12').should('have.value', '12'); 
    cy.get('select[name="yearVal"]').select('1992').should('have.value', '1992'); 
    cy.get('select[name="gender"]').select('I prefer not to say');

    cy.get('.css-1stnc37').click();

    // 6. a) Verify that page 2 of the registration form is visible.
    cy.get('form').should('exist');

    cy.wait(2000)

    // 6. b) Verify that step 1 is ticked and step 2 is marked in Green (progress visualisation)
    cy.get('[data-test-name="progress-bar-bubble"]').eq(0).find('svg[data-test-name="progress-bar-bubble-success"]').should('exist');
    cy.get('[data-test-name="progress-bar-bubble"]').eq(1).should('have.css', 'background-color', 'rgb(0, 83, 29)');


    // 6. c) Join Button is greyed out and not clickable while fields are not filled
    cy.get('button[data-dn="Button"][data-variant="hero"][data-test-name="submit-button"]').should('be.disabled');

    

  })
  
})