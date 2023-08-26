class DynamicTablePage{
    constructor() { }

    getDynamicTable(){
        return cy.get("#dynamictable")
    }

    getDynamicTableLabel(){
        return this.getDynamicTable().find('caption')
    }

    getDynamicTableHeader(){
        return this.getDynamicTable().find('tr>th')
    }

    getDynamicTableData(){
        return this.getDynamicTable().find('tr')
    }

    getTableDataLabel(){
        return cy.get("div[class='centered']>details>summary")
    }

    getInputTableBox(){
        return cy.get("#jsondata")    
    }

    getRefreshTableBtn(){
        return cy.get("#refreshtable")
    }
}

export default new DynamicTablePage();