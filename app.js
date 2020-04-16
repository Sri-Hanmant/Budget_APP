//Budget Controller
var budgetController = ( function(){
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;

    }

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;

    }



    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }

    }

    return{
        addItem: function(type, des, val){
            var newItem;

            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            if (type === 'exp'){
                newItem = new Expense(ID, des, val);
            }else if (type === 'inc'){
                newItem = new Income(ID, des, val);
            }

            data.allItems[type].push(newItem);
            return newItem;

        },

        testing: function(){
            console.log(data);
        }
    };

}) ();



//UI Controller
var UIController = (function(){

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'

    };

    //write a method in UI controller to get the user input
    return {
        getInput: function(){
            return {
            type: document.querySelector(DOMstrings.inputType).value, //value will read thevalue of the add__type i.e; "inc" or "exp"
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value
            };

        },

        addListItem: function(obj, type){
            var html, newHTML, element;

            //create html string with placeholder text

            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div></div>'
            } else if(type === 'exp'){
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            }

            //replace placeholder text with real data
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', obj.value);

            //insert html into the dom
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);

        },

				clearFields: function(){
				    var fields, fieldArray;

				    fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fieldArray = Array.prototype.slice.call(fields);

            fieldArray.forEach(function(current, index, array){
                current.value = "";

            });

            fieldArray[0].focus();


				},

        getDOMstrings: function(){
            return DOMstrings;
        }
    };


})();


//Global App controller
var controller = (function(budgetCtrl, UICtrl){

    var setupEventListners = function(){
        var DOM = UICtrl.getDOMstrings();
        //We dont need to call the ctrlAddItem() function here, so we are not using parentesis ()
        //The addEventListner calls the function for us, so we can just write ctrlAddItem
        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

        //keypress evevnt - adding to global
        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13){

                ctrlAddItem();
            }
        });
    };




    var ctrlAddItem = function(){

        var input, newItem;

        //1. get input data
        input = UICtrl.getInput();

        //2. add item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        //3. Add the new Item to UI
        UICtrl.addListItem(newItem, input.type);

        //Clear fields
        UICtrl.clearFields();

        //4. Calculate the bidget

        //5. Display the budget on UI


    };

    return{
        init: function(){
            console.log('Hi');
            setupEventListners();
        }
    };


})(budgetController, UIController);


controller.init();
