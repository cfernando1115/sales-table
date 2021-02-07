
export const state = {
    data: [],
    curData: []
};

export async function loadData(path){
    try {
        if (sessionStorage['data']) {
            state.data = JSON.parse(sessionStorage['data']);
        }
        else{
            const response = await fetch(path);
            state.data = await response.json();
            if (!response.ok) {
                throw Error('${data.message} (${res.status})');
            }
            sessionStorage.setItem('data',JSON.stringify(state.data));
        }
        state.curData = state.data.slice();
    } catch (error) {
        throw error;
    }
}

export function updateRow(row, sales, salesperson) {
    if (sales != '' && salesperson != '') {
        const newSales = parseInt(sales);
        const curMonth = state.curData.find(d => d.id === parseInt(row));
        const dataMonth = state.data.find(d => d.id == parseInt(row));
        [curMonth, dataMonth].forEach(el => {
            el.sales = newSales;
            el.salesPerson = salesperson;
        })
        sessionStorage.setItem('data', JSON.stringify(state.data));
    }
}

export function clearCurrentData() {
    state.curData = [];
}

export function updateCurrentData(quarter=0) {
    switch (quarter) {
        case 1: {
            for(let i=0;i<3;i++){
                state.curData.push(state.data[i]);
            }
            break;
        }
        case 2: {
            for(let i=3;i<6;i++){
                state.curData.push(state.data[i]);
            }
            break;
        }
        case 3: {
            for(let i=6;i<9;i++){
                state.curData.push(state.data[i]);
            }
            break;
        }
        case 4: {
            for(let i=9;i<12;i++){
                state.curData.push(state.data[i]);
            }
            break;
        }
        case 0: {
            state.curData=JSON.parse(sessionStorage['data']);
        }
    }
}

export function sortBySales(salesClick){
    switch(salesClick){
        case 1:{
            state.curData.sort((a, b) => {
                return a.sales - b.sales;
            });
            break;
        }
        case 2:{
            state.curData.sort((a,b)=>{
                return b.sales-a.sales;
            });
            break;
        }
        case 0: {
            state.curData.sort((a, b) => {
                return a.id - b.id;
            })
        }
    }
}

export function sortByName(nameClick) {
    if (nameClick !== 0) {
        state.curData.sort((a,b)=>{
            return (a.salesPerson).localeCompare(b.salesPerson);
        });
    }
}