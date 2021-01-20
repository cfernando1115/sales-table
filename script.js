    import {fetchData} from './fetchData.js'

    const table=document.getElementById('data-container');
    
    function buildTable(monthData){
        for(let key in monthData){
            buildRow(monthData[key], key);
        }
    }

    function buildRow(month,key){
        const row=document.createElement('tr');
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
        row.append(monthData,salesData,personData);
        table.append(row);
    }

    function updateTable(data,curData){
        table.innerHTML='';
        curData=[];
        if(document.getElementById('q1').checked){
            for(let i=0;i<3;i++){
                curData.push(data[i]);
            }
        }
        if(document.getElementById('q2').checked){
            for(let i=3;i<6;i++){
                curData.push(data[i]);
            }
        }
        if(document.getElementById('q3').checked){
            for(let i=6;i<9;i++){
                curData.push(data[i]);
            }
        }
        if(document.getElementById('q4').checked){
            for(let i=9;i<12;i++){
                curData.push(data[i]);
            }
        }
        if(curData.length==0){
            curData=JSON.parse(sessionStorage['data']);
        }
        buildTable(curData);
        return curData;
    };

    function sortBySales(salesClick, curData){
        table.innerHTML='';
        switch(salesClick){
            case 1:{
                curData.sort((a, b) => {
                    return a.sales - b.sales;
                });
                buildTable(curData);
                return curData;
            }
            case 2:{
                curData.sort((a,b)=>{
                    return b.sales-a.sales;
                });
                buildTable(curData);
                return curData;
            }
        }
    }

    function sortByName(curData){
        table.innerHTML='';
        curData.sort((a,b)=>{
            return (a.salesPerson).localeCompare(b.salesPerson);
        });
        buildTable(curData);
        return curData;
    }

    async function getData(){
        //fetchData only once per session
        if(sessionStorage['data']){
            return JSON.parse(sessionStorage['data']);
        }
        else{
            let data=await fetchData();
            sessionStorage.setItem('data',JSON.stringify(data));
            return data;
        }
    }


    ( async function(){
        let curData=[];
        let salesClick=0;
        let nameClick=0;

        const data=await getData();
        
        curData=data.slice(0);
        buildTable(data);

        //Set up quarter checkboxes with event listeners
        const quarterBoxes=document.querySelectorAll('#quarters input');
        quarterBoxes.checked=false;
        quarterBoxes.forEach(el=>el.onchange=function(){
            el.toggleAttribute('checked');
            salesClick=0;
            nameClick=0;
            curData=updateTable(data, curData);
        });

        //Set up sales/name clicks
        const bySales=document.getElementById('sales');
        const byName=document.getElementById('name');

        bySales.addEventListener('click', function(){
            salesClick++;
            nameClick=0;
            if(salesClick==3){
                curData=updateTable(data, curData);
                salesClick=0;
            }
            else{
                curData=sortBySales(salesClick,curData);
            }
        })

        byName.addEventListener('click', function(){
            nameClick++;
            salesClick=0;
            if(nameClick==2){
                curData=updateTable(data, curData);
                nameClick=0;
            }
            else{
                curData=sortByName(curData);
            }
        })
    })();



