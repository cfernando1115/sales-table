export async function fetchData(){
    const response=await fetch('data.json');
    const months=await response.json();
    return months;
};








