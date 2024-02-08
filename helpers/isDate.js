const moment=require('moment')

const isDate=( value)=>{
if (!value){
    return false;
}
const fecha= moment(value);//el moment dice si es una fecha correcta o no, devuelve el valor 

if(fecha.isValid()){
    return true;
}else{
    return false;
}
}

module.exports={isDate}