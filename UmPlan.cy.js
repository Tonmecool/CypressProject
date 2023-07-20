let testCases = [
  {
    operationType: 0,
    paymentstatus: 2,
    description: "ATest_1",
    status1: 0,
    status2: 1,
    plansumm: "1000",
    correction: "Леша",
    itemOfExpenditure: "АО 123",
    legalEntity: "АО 123",
    counterparty: "Леша",
  },
  {
    operationType: 0,
    paymentstatus: 3,
    description: "ATest_2",
    status1: 0,
    status2: 1,
    plansumm: "200",
    factsumm: "200",
    correction: "Леша",
    itemOfExpenditure: "АО 123 стандартная",
    legalEntity: "АО 123",
    counterparty: "Леша",
    senderAccount: "000 000 000 000 000",
    recipientAccount: "1111 1111 1111 1111"
  }]

context('Actions', () => {
  before(() => {
    cy.visit('https://finance.dev.fabrique.studio/accounts/login/', {
      auth:{
        username: 'fabrique',
        password: 'fabrique',
      },
    })
    cy.get("input[type='email']")
      .type('admin@admin.ad');
    cy.get("input[type='password']")
      .type('admin');
    cy.get('.button__content')
      .click();
  })

  it('Tests', () => {
    cy.get('.button__content')
      .contains('Добавить платёж')
      .click();

    for(let i = 0; i < testCases.length; i++) {
      let obj = testCases[i];

      if(obj.itemOfExpenditure == 'АО 123 стандартная' || obj.itemOfExpenditure == 'АО 1234 стандартная'){
        cy.get("div[class='checkbox__icon checkbox__icon--radio']").then(els1 =>{
          const buttons = [...els1];

          cy.wrap(buttons[obj.operationType]).click();
          cy.wrap(buttons[obj.paymentstatus]).click();
        })

        cy.get("div[class='checkbox__icon checkbox__icon--checkbox']").then(els2 =>{
          const checkboxes = [...els2];

          if(checkboxes[obj.status1] != null){
            cy.wrap(checkboxes[obj.status1]).click();
          }
          if(checkboxes[obj.status2] != null){
            cy.wrap(checkboxes[obj.status2]).click();
          }
        })

        cy.get("label[class='input__content']").then(els3 =>{
          const labels = [...els3];

          //Описание
          cy.wrap(labels[0]).type(obj.description);
          //Сум план
          cy.wrap(labels[1]).type(obj.plansumm);
          //Сум факт
          cy.wrap(labels[2]).type(obj.factsumm);
          //Статья, уточнение
          cy.wrap(labels[3]).type(obj.correction);
        })

        cy.get("span[class='multiselect__placeholder']").then(els4 =>{
          const spans = [...els4];
          cy.wrap(spans[0])
            .type(obj.itemOfExpenditure);
          cy.get('span')
            .contains(obj.itemOfExpenditure)
            .click();

          cy.wrap(spans[1])
            .type(obj.legalEntity)
          cy.get('span')
            .contains(obj.legalEntity)
            .click();

          cy.wrap(spans[2])
            .type(obj.counterparty)
          cy.get('span')
            .contains(obj.counterparty)
            .click();

          cy.wrap(spans[3])
            .type(obj.senderAccount)
          cy.get('span')
            .contains(obj.senderAccount)
            .click();

          cy.wrap(spans[4])
            .type(obj.recipientAccount)
          cy.get('span')
            .contains(obj.recipientAccount)
            .click({force: true});
        })

        cy.get("div[class='button__content']").contains('Добавить').click().wait(5000);

        cy.get("img[class='picture picture--type-image']").click();
        cy.get("input[placeholder='Поиск']")
          .type(obj.description)
          .type('{enter}')
          .type('{enter}');

        cy.get("td[style='--bg-color: transparent;']")
          .children()
          .contains(obj.description)
          .then(els5 =>{
          const tds = [...els5];
          let result = false;
          for(let i = 0; i <= tds.length; i++){
            if(tds.length > 0){
              result = true;
            }
          }
          assert.isTrue(result, 'Платеж создан');
        })
        cy.get("div[class='button__content']").contains('Добавить платёж').click();
      }
      else if(obj.itemOfExpenditure == 'АО 123' || obj.itemOfExpenditure == 'АО 1234'){
        cy.get("div[class='checkbox__icon checkbox__icon--radio']").then(els1 =>{
          const buttons = [...els1];

          cy.wrap(buttons[obj.operationType]).click();
          cy.wrap(buttons[obj.paymentstatus]).click();
        })

        cy.get("div[class='checkbox__icon checkbox__icon--checkbox']").then(els2 =>{
          const checkboxes = [...els2];

          if(checkboxes[obj.status1] != null){
            cy.wrap(checkboxes[obj.status1]).click();
          }
          if(checkboxes[obj.status2] != null){
            cy.wrap(checkboxes[obj.status2]).click();
          }
        })

        cy.get("label[class='input__content']").then(els3 =>{
          const labels = [...els3];

          //Описание
          cy.wrap(labels[0]).type(obj.description);
          //Сум план
          cy.wrap(labels[1]).type(obj.plansumm);
          //Статья, уточнение
          cy.wrap(labels[2]).type(obj.correction);
        })

        cy.get("span[class='multiselect__placeholder']").then(els4 =>{
          const spans = [...els4];
          cy.wrap(spans[0])
            .type(obj.itemOfExpenditure);
          cy.get('span')
            .contains(obj.itemOfExpenditure)
            .click();

          cy.wrap(spans[1])
            .type(obj.legalEntity)
          cy.get('span')
            .contains(obj.legalEntity)
            .click();

          cy.wrap(spans[2])
            .type(obj.counterparty)
          cy.get('span')
            .contains(obj.counterparty)
            .click();
        })

        cy.get("div[class='button__content']").contains('Добавить').click().wait(5000);

        cy.get("img[class='picture picture--type-image']").click();
        cy.get("input[placeholder='Поиск']")
          .type(obj.description)
          .type('{enter}')
          .type('{enter}');

        cy.get("td[style='--bg-color: transparent;']")
          .children()
          .contains(obj.description)
          .then(els5 =>{
          const tds = [...els5];
          let result = false;
          for(let i = 0; i <= tds.length; i++){
            if(tds.length > 0){
              result = true;
            }
          }
          assert.isTrue(result, 'Платеж создан');
        })
        cy.get("div[class='button__content']").contains('Добавить платёж').click();
      }
    }
  })
})