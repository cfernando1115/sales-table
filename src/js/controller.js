import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { clicks, render, addHandlerQuarterBoxes, clearTable, isChecked, addHandlerSalesClick, addHandlerNameClick, buildForm, addHandlerForm } from './dataView.js';
import { state, loadData, updateRow, clearCurrentData, updateCurrentData, sortBySales, sortByName } from './dataModel.js';
import { DATA_PATH } from './config.js';
    
function controlData(){
    clearTable();
    clearCurrentData();
    isChecked(updateCurrentData);
    if (state.curData.length === 0) {
        updateCurrentData();
    }
    render(state.curData, controlForm);
};

function controlSort() {
    clearTable();
    sortBySales(clicks.salesClick);
    sortByName(clicks.nameClick);
    render(state.curData, controlForm);
}

function controlForm(row) {
    const value = row.target.getAttribute("value");
    const id = row.target.parentElement.parentElement.id;
    buildForm(value);
    addHandlerForm(controlEdit, id);
}

function controlEdit(id, sales, salesperson) {
    updateRow(id, sales, salesperson);
    clearTable();
    clicks.salesClick > 0 || clicks.nameClick > 0
        ? controlSort()
        : render(state.curData, controlForm);
}

( async function(){
    try {
        await loadData(DATA_PATH);            
        render(state.curData, controlForm);

        //Set up quarter checkboxes with event listeners
        addHandlerQuarterBoxes(controlData);

        //Set up sales/name clicks
        addHandlerSalesClick(controlSort);
        addHandlerNameClick(controlSort);
    } catch (error) {
        alert(`There was an error: ${error.message}`);
    }
})();








