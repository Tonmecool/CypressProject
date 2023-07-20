let testCases = [
  {
    operationType: 0,
    paymentstatus: 3,
    description: "AutoTest_1",
    status1: 0,
    status2: 1,
    plansumm: "1000",
    factsumm: "200",
    correction: "Леша",
    itemOfExpenditure: "АО 123 стандартная",
    legalEntity: "АО 123",
    counterparty: "Леша",
    senderAccount: "000 000 000 000 000",
    recipientAccount: "1111 1111 1111 1111"
  },
  {
    operationType: null,
    paymentstatus: 3,
    description: "AutoTest_2",
    status1: 0,
    status2: 1,
    plansumm: "1000",
    factsumm: "1000",
    correction: "ХЗ",
    source: "Источник 123",
    documentstatus: "Акт подписан",
    legalEntity: "АО 123",
    counterparty: "Леша",
    senderAccount: "000 000 000 000 000",
    recipientAccount: "1111 1111 1111 1111"
  },  
  {
    operationType: 1,
    paymentstatus: 3,
    description: "AutoTest_3",
    status1: 0,
    status2: 1,
    plansumm: "1000",
    factsumm: "1000",
    senderAccount: "000 000 000 000 000",
    recipientAccount: "1111 1111 1111 1111"
  },
  {
    operationType: 0,
    paymentstatus: 3,
    description: "AutoTest_4",
    status1: 0,
    status2: 1,
    plansumm: "-1000",
    factsumm: "-200",
    correction: "Леша",
    itemOfExpenditure: "АО 123 стандартная",
    legalEntity: "АО 123",
    counterparty: "Леша",
    senderAccount: "000 000 000 000 000",
    recipientAccount: "1111 1111 1111 1111"
  },
  {
    operationType: 1,
    paymentstatus: 3,
    description: "AutoTest_5",
    status1: 0,
    status2: 1,
    plansumm: "1000",
    factsumm: "1000",
    senderAccount: "abc",
    recipientAccount: "def"
  },
  {
    operationType: 0,
    paymentstatus: 3,
    description: "AutoTest_6",
    status1: 0,
    status2: 1,
    plansumm: "1000",
    factsumm: "1200",
    correction: "Леша",
    itemOfExpenditure: "АО 123 стандартная",
    legalEntity: "АО 123",
    counterparty: "Леша",
    senderAccount: "000 000 000 000 000",
    recipientAccount: "1111 1111 1111 1111"
  },
  {
    operationType: 0,
    paymentstatus: 3,
    description: "AutoTest_1",
    status1: 0,
    status2: 1,
    plansumm: "0",
    factsumm: "//////////////////////////////////////////////////////////////////////////////////////////////////////",
    correction: "Леша",
    itemOfExpenditure: "АО 123 стандартная",
    legalEntity: "АО 123",
    counterparty: "Леша",
    senderAccount: "//////////////////////////////////////////////////////////////////////////////////////////////////////",
    recipientAccount: "1111 1111 1111 1111"
  },]

context('Action', () => {
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
      //При Расходе
      if(obj.operationType == 0){

        //https://stackoverflow.com/questions/49259356/how-to-select-identically-names-div-elements-when-writing-cypress-tests
        cy.get("div[class='checkbox__icon checkbox__icon--radio']").then(els1 =>{
          const buttons = [...els1];
          
          if(buttons[obj.operationType] != null){
            cy.wrap(buttons[obj.operationType]).click();
          }
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

          if(labels.length == 5){
            //Описание
            cy.wrap(labels[0]).type(obj.description);
            //Сум план
            cy.wrap(labels[1]).type(obj.plansumm);
            //Сум факт
            cy.wrap(labels[2]).type(obj.factsumm);
            //Статья, уточнение
            cy.wrap(labels[3]).type(obj.correction);
          }
          else{
            //Описание
            cy.wrap(labels[0]).type(obj.description);
            //Сум план
            cy.wrap(labels[1]).type(obj.plansumm);
            //Статья, уточнение
            cy.wrap(labels[2]).type(obj.correction);
          }
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
      //При доходе/приходе
      else if(obj.operationType == null){
        cy.get("div[class='checkbox__icon checkbox__icon--radio']").then(els1 =>{
          const buttons = [...els1];
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
            .type(obj.source);
          cy.get('span')
            .contains(obj.source)
            .click();

          cy.wrap(spans[1])
            .type(obj.documentstatus);
          cy.get('span')
            .contains(obj.documentstatus)
            .click();

          //  cy.wrap(spans[2])
          //    .type(obj.legalEntity);
          //  cy.get('span')
          //    .contains(obj.legalEntity)
          //    .click({force: true});

          cy.wrap(spans[3])
            .type(obj.counterparty);
          cy.get('span')
            .contains(obj.counterparty)
            .click();

          cy.wrap(spans[4])
            .type(obj.senderAccount);
          cy.get('span')
            .contains(obj.senderAccount)
            .click();

          cy.wrap(spans[5])
            .type(obj.recipientAccount);
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
      //Перевод средств
      else if(obj.operationType == 1){
        cy.get("div[class='checkbox__icon checkbox__icon--radio']").then(els1 =>{
          const buttons = [...els1];
          
          if(buttons[obj.operationType] != null){
            cy.wrap(buttons[obj.operationType]).click();
          }
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
        })

        cy.get("span[class='multiselect__placeholder']").then(els4 =>{
          const spans = [...els4];

          cy.wrap(spans[0])
            .type(obj.senderAccount)
          cy.get('span')
            .contains(obj.senderAccount)
            .click();

          cy.wrap(spans[1])
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
    }
  })
})
