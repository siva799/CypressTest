/// <reference types="cypress" />

import dynamicpage from '../pages/DynamicTablePage'
import tableData from '../Const/TableTestData'

describe("Dynamic HTML UI Test Suite", () => {

    beforeEach(() => {
        cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html')
        cy.fixture('TableArrayData').as('users')
      })

    it('Change the table data and Assert the correct data is displayed', () => {
        dynamicpage.getDynamicTableLabel().as('dynamicTableLabel').invoke('text').should('eq',tableData.heading)
        dynamicpage.getTableDataLabel().click()
        cy.get('@users').then((data)=>{
            const usersData=JSON.stringify(data)
            dynamicpage.getInputTableBox().clear().type(usersData,{ parseSpecialCharSequences: false })
        })
        dynamicpage.getRefreshTableBtn().click()
        cy.get('@dynamicTableLabel').invoke('text').should('eq','Dynamic Table')
        dynamicpage.getDynamicTableHeader().then(($td) => {
            const texts = Cypress._.map($td, 'innerText')
            expect(texts, 'headings').to.deep.equal(tableData.columnNames)
          })
        cy.get('@users').then((data)=>{
            data.forEach((rowData,index)=>{
            dynamicpage.getDynamicTableData().as('dynamicTableData').eq(index+1).find('td').eq(0)
                .invoke('text').should('be.eq',rowData.name)
            cy.get('@dynamicTableData').eq(index+1).find('td').eq(1)
                .invoke('text').should('be.eq',String(rowData.age))
            cy.get('@dynamicTableData').eq(index+1).find('td').eq(2)
                .invoke('text').should('be.eq',rowData.gender)
            })
        })   
    })
})