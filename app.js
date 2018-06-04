//Controls UI
var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        percentage: '.item__percentage',
        date: '.budget__title--month',
        speedometer: '.off'

    };
    var formatNumber = function(num , type){
        var splitNum , int, decimal;
        num = Math.abs(num);
        num = num.toFixed(2);

        splitNum = num.split('.');
        int = splitNum[0];
        decimal = splitNum[1];

        if(int.length > 3){
           int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3 , 3);
        }

        
        return (type === 'inc' ? sign = '+' : sign = '-') + ' ' + int + '.' + decimal;
    };
    var NodeListForEach = function(list , callback){
        for (let i = 0; i < list.length; i++) {
            callback(list[i], i);
            
        }
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        addListItem: function (obj, type) {
            var html, newHtml, element;
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace("%description%", obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value , type));

            document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
        },
        deleteListItem: function(id){
            element = document.getElementById(id);
            element.parentNode.removeChild(element);

        },
        clearFields: function () {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ' ,' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function (cur, i, arr) {
                cur.value = '';


            });
            fieldsArr[0].focus();

        },
        displayBudget: function (obj) {
            var type;
            if (obj.budget > 0){
                type = 'inc';
            }else{
                type = 'exp';
            }

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget , type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalIncome , 'inc');
            document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExpenses , 'exp');


            if (obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            }else{
                document.querySelector(DOMstrings.percentageLabel).textContent = '--';
                
            }
            if (obj.percentage > 0 && obj.percentage < 11){
                document.querySelector(DOMstrings.speedometer).classList.toggle('line-1');
            }else if (obj.percentage > 10 && obj.percentage < 21){
                document.querySelector(DOMstrings.speedometer).classList.toggle('line-2');
            }else if (obj.percentage > 20 && obj.percentage < 31){
                document.querySelector(DOMstrings.speedometer).classList.toggle('line-3');
            }else if(obj.percentage > 30 && obj.percentage < 41){
                document.querySelector(DOMstrings.speedometer).classList.toggle('line-4');
            }else if (obj.percentage > 40 && obj.percentage < 51){
                document.querySelector(DOMstrings.speedometer).classList.toggle('line-6');
            }else if (obj.percentage > 50 && obj.percentage < 61){
                document.querySelector(DOMstrings.speedometer).classList.toggle('line-7');
            }else if (obj.percentage > 60 && obj.percentage < 71){
                document.querySelector(DOMstrings.speedometer).classList.toggle('line-8');
            }else if (obj.percentage > 70 && obj.percentage < 81){
                document.querySelector(DOMstrings.speedometer).classList.toggle('line-9');
            }else if (obj.percentage > 80 && obj.percentage < 91){
                document.querySelector(DOMstrings.speedometer).classList.toggle('line-10');
            }else if (obj.percentage > 90  && obj.percentage < 99){
                document.querySelector(DOMstrings.speedometer).classList.toggle('line-11');
            }else if (obj.percentage === 100){
                document.querySelector(DOMstrings.speedometer).classList.toggle('line-12');
            }

            

        },
        // Covers the color of speedometer as percentage goes up
        updateSpeedometer: function (obj){
            
        },
        displayPercentages: function (percentage){
            var fields = document.querySelectorAll(DOMstrings.percentage);
            
            NodeListForEach(fields, function(current , index){
                if (percentage[index] > 0){
                current.textContent = percentage[index] + '%';
                }else{
                    current.textContent = '--';
                }
            });
        },
        displayDate: function (){
            var now, year, month, months;
            now = new Date();
            year = now.getFullYear();
            month = now.getMonth();
            months = ['January', 'February', 'March', 'April', 
                'May', 'June', 'July', 'August', 'September', 
                'October', 'November','December'];

            document.querySelector(DOMstrings.date).textContent = months[month] + " " + year;
        },
        changedType: function(){
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue
            );
            NodeListForEach(fields , function(current){
                current.classList.toggle('red-focus');
            });
            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },
        // updateSpeedometer: function(){
        //     if(DOMstrings.percentageLabel > 0 && DOMstrings.percentageLabel < 20){
        //         document.querySelector(DOMstrings.percentageLabel).classList.toggle('line');
        //     }
        // },
        

        getDOMstrings: function () {
            return DOMstrings;

        }

    };





})();

//Controls Budget
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        }else{
            this.percentage = -1;
        }
    };
    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;

    };
    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (current) {
            sum += current.value;
        });
        data.totals[type] = sum;
    };
    var data = {
        allItems: {
            exp: [],
            inc: []

        },
        totals: {
            exp: 0,
            inc: 1
        },
        budget : 0,
        percentage : -1

    };
    return {
        addItem: function (type, des, val) {
            var newItem, ID;


            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }


            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            data.allItems[type].push(newItem);
            return newItem;
        },
        deleteItem: function(type , id){
            var ids, index;
            ids = data.allItems[type].map(function (current){
                return current.id;
            });
            index = ids.indexOf(id);
            
            if (index !== -1){
                data.allItems[type].splice(index , 1);
            }
        },
        calculateBudget: function () {
            calculateTotal('exp');
            calculateTotal('inc');

            data.budget = data.totals.inc - data.totals.exp;
            if (data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
                }else{
                data.percentage = -1;
            }


        },
        calculatePercentages: function(){
            data.allItems.exp.forEach(function(current){
               current.calcPercentage(data.totals.inc);
            });

        }, 
        getPercentages: function () {
           var allPercentages = data.allItems.exp.map(function (current) {
               return current.getPercentage(); 
            });
            return allPercentages;
            
        },
        getBudget : function (){
            return {
                budget: data.budget,
                totalIncome : data.totals.inc,
                totalExpenses : data.totals.exp,
                percentage : data.percentage
            };

    },

        testing: function () {
            console.log(data);
        }

    };


}());

//Controls App Globally Calculations
var controller = (function (budgetCtrl, UI) {

    var setUpEventListeners = function () {
        var DOM = UI.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        });
        document.querySelector(DOM.container).addEventListener('click' , ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change' , UI.changedType);
    };
    var ctrlDeleteItem = function (event){
        var itemID, IDsplit, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemID){
            IDsplit = itemID.split('-');
            type = IDsplit[0];
            ID = parseInt(IDsplit[1]);
            budgetCtrl.deleteItem(type, ID);
            UI.deleteListItem(itemID);
            updateBudget();
        }

    };
    var updateBudget = function () {
    budgetCtrl.calculateBudget();
    var budget = budgetCtrl.getBudget();
    UI.displayBudget(budget);

    };
    var updatePercentage = function (){
        budgetCtrl.calculatePercentages();
        var percentages = budgetCtrl.getPercentages();
        UI.displayPercentages(percentages);
        UI.updateSpeedometer(percentages);
    };

    var ctrlAddItem = function () {


        var input = UI.getInput();
        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {

            var newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            UI.addListItem(newItem, input.type);

            UI.clearFields();

            updateBudget();

            updatePercentage();

           
        }
    };

    return {
        init: function () {
            setUpEventListeners();
            UI.displayDate();
            UI.displayBudget({
                budget: 0,
                totalIncome : 0,
                totalExpenses : 0,
                percentage : -1

            });
        }
    };


})(budgetController, UIController);

controller.init();