
const elements = {
    tableOutput: document.getElementById('data-container'),
    quarterBoxes: document.querySelectorAll('#quarters input'),
    bySales: document.getElementById('sales'),
    byName: document.getElementById('name'),
    q1: document.getElementById('q1'),
    q2: document.getElementById('q2'),
    q3: document.getElementById('q3'),
    q3: document.getElementById('q4'),
};

export const clicks = {
    salesClick: 0,
    nameClick: 0
};

export function render(data, handler) {
    for(let key in data){
        buildRow(data[key], key, handler);
    }
}
    
export function addHandlerQuarterBoxes(handler) {
    elements.quarterBoxes.checked=false;
    elements.quarterBoxes.forEach(el=>el.onchange=function(){
        el.toggleAttribute('checked');
        clicks.salesClick = 0;
        clicks.nameClick = 0;
        handler();
    });   
}

export function addHandlerSalesClick(handler) {
    elements.bySales.addEventListener('click', function(){
        clicks.salesClick++;
        if(clicks.salesClick===3){
            clicks.salesClick=0;
        }
        handler();
        clicks.nameClick=0;
    })
}

export function addHandlerNameClick(handler) {
    elements.byName.addEventListener('click', function(){
        clicks.nameClick++;
        if(clicks.nameClick===2){
            clicks.nameClick=0;
        }
        handler();
        clicks.salesClick=0;
    })
}

export function addHandlerForm(handler, id) {
    const cancel = document.querySelector('#cancel');
    const submit = document.querySelector('#submit');
    const container = document.querySelector('.form-container');
    cancel.addEventListener('click', function (){
        container.remove();
    })
    submit.addEventListener('click', function () {
        const sales = document.querySelector('#salesInput').value;
        const salesperson = document.querySelector('#salespersonInput').value;
        handler(id, sales, salesperson);
        container.remove();
    })
}

export function clearTable() {
    elements.tableOutput.innerHTML = '';
}

export function isChecked(handler) {
    if (q1.checked) {
        handler(1);
    }
    if (q2.checked) {
        handler(2);
    }
    if (q3.checked) {
        handler(3);
    }
    if (q4.checked) {
        handler(4);
    }
}

function buildRow(month,key, handler){
    const row = document.createElement('tr');
    row.id = month.id;
    row.setAttribute('value', key);
    row.setAttribute('name', month.month);
    const monthData=document.createElement('td');
    monthData.textContent=month.month;
    const salesData=document.createElement('td');
    const midNum=(month.sales.toFixed(2));
    const dec=midNum.slice(midNum.length-3);
    const num=(month.sales).toLocaleString("en-US");
    salesData.textContent=`$${num}${dec}`;
    const personData=document.createElement('td');
    personData.textContent=month.salesPerson;
    const editData=document.createElement('td');
    const edit=document.createElement('a');
    edit.onclick = handler.bind(this);
    edit.setAttribute('value', key);
    edit.textContent='Edit';
    edit.setAttribute('style','text-decoration:none;')
    editData.append(edit);
    row.append(monthData, salesData, personData, editData);
    elements.tableOutput.append(row);
}

export function buildForm(value) {
    const form = document.querySelector('#form-container');
    if (form!=null) {
        form.remove();
    }
    const row = document.querySelector(`[value='${value}']`);
    const month = row.getAttribute('name');
    const markup = `
    <tr class="form-container" id="form-container">
        <td>Edit ${month}</td>
        <td>
            <label for="sales">Top sales: $</label>
            <input type="text" id="salesInput" name="sales" placeholder="no commas">
        </td>
        <td>
            <label for="salesperson">Sales Person: </label>
            <input type="text" id="salespersonInput" name="salesperson">
        </td>
        <td>
            <input type="button" id="submit" name="submit" value="Submit">
            <input type="button" id="cancel" Name="cancel" value="Cancel">
        </td>
    </tr>
    `;
    row.insertAdjacentHTML('beforebegin', markup);
}




