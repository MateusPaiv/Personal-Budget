class Expense{
    constructor(year,month,day,type,description,value){
        this.year = year;
        this.month = month;
        this.day = day;
        this.type = type;
        this.description = description;
        this.value = value;
    }

    validFields(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false; 
            }
        }
        return true;
    }

   
}

class Bd{

    constructor(){
        let id = localStorage.getItem('id');

        if(id === null){
            localStorage.setItem('id',0);
        }
    }

    getNextId(){
        let nextId = localStorage.getItem('id');
        return parseInt(nextId)+1;

    }

    save(e){
        
        let id = this.getNextId();
        localStorage.setItem(id,JSON.stringify(e));
        localStorage.setItem('id',id)
    }

    //recover all expense registered in LocalStorage
    allRecords(){

        let arrayExpenses = Array();
        let id = localStorage.getItem('id');    

        for(let i=1; i<=id;i++){
            //recover a expense
            let expense = JSON.parse(localStorage.getItem(i));
             if(expense === null){
                continue;
             }
             arrayExpenses.push(expense);
        }

        return arrayExpenses;
    }

    search(expense) {
        let arrayExpenses = [];

        arrayExpenses = this.allRecords();
        if(expense.year != ''){
     
            arrayExpenses= arrayExpenses.filter(d => d.year == expense.year);
        }
        if(expense.month != ''){
          
            arrayExpenses=arrayExpenses.filter(d => d.month == expense.month);
        }
        if(expense.day != ''){
         
            arrayExpenses=arrayExpenses.filter(d => d.day == expense.day);
        }
        if(expense.type != ''){
        
            arrayExpenses=arrayExpenses.filter(d => d.type == expense.type);
        }
        if(expense.description != ''){
           
            arrayExpenses=arrayExpenses.filter(d => d.description == expense.description);
        }
        if(expense.value != ''){
         
            arrayExpenses=arrayExpenses.filter(d => d.value == expense.value);
        }

        console.log(arrayExpenses);

        let list = document.getElementById('listExpense');
        list.innerHTML = '';    
        arrayExpenses.forEach(function(e){
            let line = list.insertRow();

            switch(parseInt(e.type)){
                case 1:
                    e.type = 'Food';
                    break;
                case 2:
                    e.type = 'Education';
                    break;
                case 3:
                    e.type = 'Leisure';
                    break;
                case 4:
                    e.type = 'Health';
                    break;
                case 5:
                    e.type = 'Transport';
                    break;
            }
           
            line.insertCell(0).innerHTML =`${e.day}/${e.month}/${e.year}`;
            line.insertCell(1).innerHTML = `${e.type}`;
            line.insertCell(2).innerHTML = `${e.description}`;
            line.insertCell(3).innerHTML = `${e.value}`;
        });
    


    }
}

let bd = new Bd();

function registerExpense(){
   let year = document.getElementById('year');
   let month = document.getElementById('month');
   let day = document.getElementById('day');
   let type = document.getElementById('type');
   let description = document.getElementById('description');
   let value = document.getElementById('value');

   let expense = new Expense( 
        year.value,
        month.value,
        day.value,
        type.value,
        description.value,
        value.value
    );

    function clearFields(){
        year.value = '';
        month.value = '';
        day.value = '';
        type.value = '';
        description.value = '';
        value.value = '';
    }
    
    if (expense.validFields()){
        bd.save(expense);
        clearFields();
        document.getElementById('titleModal').className = 'modal-header text text-success';
        document.getElementById('title').innerHTML = 'Saved data';
        document.getElementById('content').innerHTML = ' Successfully saved expense';
        document.getElementById('btnReturn').className = 'btn btn-success';
        $('#modalRegisterExpense').modal('show');
    }else{
        document.getElementById('titleModal').className = 'modal-header text text-danger';
        document.getElementById('title').innerHTML = 'Error saving data';
        document.getElementById('content').innerHTML = ' Error saving expense';
        document.getElementById('btnReturn').className = 'btn btn-danger';
        $('#modalRegisterExpense').modal('show');
    }
}

function loadListExpense(){
    let expense = Array();
    expense = bd.allRecords();
    let list = document.getElementById('listExpense');
        expense.forEach(function(e){
            let line = list.insertRow();

            switch(parseInt(e.type)){
                case 1:
                    e.type = 'Food';
                    break;
                case 2:
                    e.type = 'Education';
                    break;
                case 3:
                    e.type = 'Leisure';
                    break;
                case 4:
                    e.type = 'Health';
                    break;
                case 5:
                    e.type = 'Transport';
                break;
            }
            
        line.insertCell(0).innerHTML =`${e.day}/${e.month}/${e.year}`;
        line.insertCell(1).innerHTML = `${e.type}`;
        line.insertCell(2).innerHTML = `${e.description}`;
        line.insertCell(3).innerHTML = `${e.value}`;
    });
}

function findExpense(){
   let year = document.getElementById('year').value;
   let month = document.getElementById('month').value;
   let day = document.getElementById('day').value;
   let type = document.getElementById('type').value;
   let description = document.getElementById('description').value;
   let value = document.getElementById('value').value;

   let expense = new Expense(year,month,day,type,description,value);

   bd.search(expense);
 
}