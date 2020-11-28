    const originalTable=document.getElementById('js--data').innerHTML;
    const table=document.getElementById('js--data');
    const tableRows=document.getElementById('js--data').getElementsByTagName('tr');
    let chronoTable;
    let curTable;
    let q1Rows='';
    let q2Rows='';
    let q3Rows='';
    let q4Rows='';
    let rows=[];
    let sortedRows=[];
    let filter;
    let salesClick=0;
    let nameClick=0;
    q1Checked=false;
    q2Checked=false;
    q3Checked=false;
    q4Checked=false;


function init(){

    for(var i=0;i<3;i++){
        q1Rows+=tableRows[i].outerHTML;
    }

    for(var i=3;i<6;i++){
        q2Rows+=tableRows[i].outerHTML;
    }

    for(var i=6;i<9;i++){
        q3Rows+=tableRows[i].outerHTML;
    }

    for(var i=9;i<12;i++){
        q4Rows+=tableRows[i].outerHTML;
    }

    //Event listeners
    document.getElementById('js--q1').addEventListener('click',function(){
        if(salesClick>0||nameClick>0){
            //Reset salesClick and nameClick
            clickReset();
            //Reset table to chronological sort
            restoreChronoTable();
        }
        q1Sort();
    });
    document.getElementById('js--q2').addEventListener('click',function(){
        if(salesClick>0||nameClick>0){
            clickReset();
            restoreChronoTable();
        }        
        q2Sort();
    });
    document.getElementById('js--q3').addEventListener('click',function(){
        if(salesClick>0||nameClick>0){
            clickReset();
            restoreChronoTable();
        }
        q3Sort();
    });
    document.getElementById('js--q4').addEventListener('click',function(){
        if(salesClick>0||nameClick>0){
            clickReset();
            restoreChronoTable();
        }
        q4Sort();
    });

    document.getElementById('js--sales').addEventListener('click',function(){
        if(salesClick===0&&nameClick===0){
            //Save current chronological table for quarter checkbox change
            chronoTable=table.innerHTML;
        }  
        nameClick=0;      
        salesClick++;
        filter=1//td[1]
        sortTable(filter);
    })

    document.getElementById('js--name').addEventListener('click',function(){
        if(salesClick===0&&nameClick===0){
            chronoTable=table.innerHTML;
        } 
        salesClick=0;       
        nameClick++;
        filter=2;//td[2]
        sortTable(filter);
    })   
}


//Sort by quarter functions
function q1Sort(){
    length=tableRows.length;
    if(q1Checked){
        if(length===3){
            restoreOrigTable();
        }
        else{
            removeQuarter(q1Rows);
        }
        q1Checked=false;
    }
    else{
            if(length===12){
                table.innerHTML=q1Rows;
            }
            else{
                table.insertAdjacentHTML('afterbegin',q1Rows);
            }            
            q1Checked=true;
    }
}

function q2Sort(){
    length=tableRows.length;
    if(q2Checked){
        if(length===3){
            restoreOrigTable();
        }
        else{
            removeQuarter(q2Rows);
        }
        q2Checked=false;
    }
    else{
        if(length===12){
            table.innerHTML=q2Rows;
        }  
        else{
            curTable=table.innerHTML;
            if(length===9){
                restoreOrigTable();
            }
            else{
                //Determine location for row insertion
                let position;
                let index;
                if(length===6){
                    if(q3Checked&&q4Checked){
                        position='beforebegin';
                        index=0;
                    }
                    if((q1Checked&&q4Checked)||(q1Checked&&q3Checked)){
                        position='afterend';
                        index=2;
                    }
                }
                if(length===3){
                    if(q3Checked||q4Checked){
                        index=0;
                        position='beforebegin';
                    }
                    else{
                        index=2;
                        position='afterend';
                    }
                }
                tableRows[index].insertAdjacentHTML(position, q2Rows);
            }
        }      
        q2Checked=true;
    }
}

function q3Sort(){
    length=tableRows.length;
    if(q3Checked){
        if(length===3){
            restoreOrigTable();
        }
        else{
            removeQuarter(q3Rows);
        }
        q3Checked=false;
    }
    else{
        if(length===12){
            table.innerHTML=q3Rows;
        }  
        else{
            curTable=table.innerHTML;
            if(length===9){
                restoreOrigTable();
            }
            else{
                let position;
                let index;
                if(length===6){
                    position='afterend';
                    if(q1Checked&&q2Checked){
                        index=5;
                    }
                    if((q1Checked&&q4Checked)||(q2Checked&&q4Checked)){
                        index=2;
                    }
                }
                if(length===3){
                    index=2;
                    if(q1Checked||q2Checked){
                        position='afterend';
                    }
                    else{
                        position='beforebegin';
                    }
                }
                tableRows[index].insertAdjacentHTML(position, q3Rows);
            }
        }
        q3Checked=true;
    }         
}

function q4Sort(){
    length=tableRows.length;
    if(q4Checked){
        if(length===3){
            restoreOrigTable();
        }
        else{
            removeQuarter(q4Rows);
        }
        q4Checked=false;
    }
    else{
        if(length===12){
            table.innerHTML=q4Rows;
        }
        else{
            table.insertAdjacentHTML('beforeend',q4Rows);
        }            
        q4Checked=true;
    }
}

//Reset/restore/remove helpers
function clickReset(){
    salesClick=0;
    nameClick=0;
}

function restoreOrigTable(){
    table.innerHTML=originalTable;
}

function restoreChronoTable(){
    table.innerHTML=chronoTable;
}

function removeQuarter(rows){
    curTable=table.innerHTML;
    newHtml=curTable.replace(rows,'');
    table.innerHTML=newHtml;
}

//Sorting and inserting functions
function sortTable(filter){
    newHtml='';
    let unsortedRows=[];
    let length=tableRows.length;
    
    //Filter by sales
    if(filter===1){
        if(salesClick===3){
            table.innerHTML=chronoTable;
            salesClick=0;
        }
        else{
            if(salesClick===1){
                for(let i=0;i<length;i++){
                    let fullCell=tableRows[i].getElementsByTagName('td')[filter].innerHTML;
                    let data=trimNumber(fullCell);
                    unsortedRows.push(data);
                }
                rows=unsortedRows.slice(0);
                sortedRows=quickSort(unsortedRows,0,length-1);
                insertSorted(sortedRows,rows);
            }
            else{
                sortedRows.reverse();
                insertSorted(sortedRows,rows);
            }
        }
    }

    //Filter by name
    if(filter===2){
        if(nameClick===2){
            table.innerHTML=chronoTable;
            nameClick=0;
        }
        else{
            for(let i=0;i<length;i++){
                let name=tableRows[i].getElementsByTagName('td')[filter].innerHTML;
                unsortedRows.push(name);
            }
            rows=unsortedRows.slice(0);
            sortedRows=quickSort(unsortedRows,0,length-1);
            insertSorted(sortedRows,rows);
        }
    }

    //Compare and insert sorted rows
    function insertSorted(sortedRows,unsortedRows){
        let tempRows=unsortedRows.slice(0);
        let data;
        for(let i=0;i<length;i++){
            for(let y=0;y<length;y++){
                data=tempRows[y];
                if(data===sortedRows[i]){
                    newHtml+=tableRows[y].outerHTML;
                    tempRows[y]='';
                }
            }
        }
        table.innerHTML=newHtml;
    }

    //Prep sales numbers for comparison
    function trimNumber(dataCell){
        let shave=dataCell.slice(1);
        let data= +parseFloat(shave.replace(',','')).toFixed(2);
        return data;
    }

    //Quick sort functions
    function swap(data,i,j){
        let temp=data[i];
        data[i]=data[j];
        data[j]=temp;
    }

    function search(data,first,last){
        let middle=data[Math.floor((first+last)/2)];
        let i=first;
        let j=last;
        while(i<=j){
            while(data[i]<middle){
                i++;
            }
            while(data[j]>middle){
                j--;
            }
            if(i<=j){
                swap(data,i,j);
                i++;
                j--;
            }
        }
        return i;
    }

    function quickSort(data,first,last){
        let index;
        if(data.length>1){
            index=search(data,first,last);
            if(first<index-1){
                quickSort(data, first,index-1);
            }
            if(index<last){
                quickSort(data,index,last);
            }
        }
        return data;
    }
}

init();


