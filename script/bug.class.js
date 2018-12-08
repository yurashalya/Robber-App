function Knapsack(objects, maxWeight) {
    this.objects = objects;
    this.maxWeight = maxWeight;
    this.ID = objects.length;

    //Добавляем элемент в экземпляр рюкзака
    this.addObject = function(object) {
      this.objects.push(object);
    }
  
    //Удаляем элемент из экземпляра рюкзака
    this.deleteObject = function(id) {
      this.objects = this.objects.filter((el) =>
         el.id != id
      );
    }
  
    //Возвращаем все элементы 
    this.getObjects = function() {
      return this.objects;
    }
  
    //Установка максимального веса 
    this.setMaxWeight = function(maxWeight) {
      this.maxWeight = maxWeight;
    }
  
    // Возвращаем максимальный вес
    this.getMaxWeight = function() {
      return this.maxWeight;
    }
  
    // Отмена выбора
    this.unselectAllObjects = function() {
  
      this.objects.forEach(function(obj) {
        obj.selected = false;
      });
    }
  
    // Общая стоимость
    this.getTotalValue = function() {
      var totalValue = this.objects.reduce(function(sum, obj) {
        if (obj.selected) return sum + obj.value;
        else return 0;
      }, 0);
  
      return totalValue;
    }
  
    this.getSelectedItems = function() {
      var arr = this.objects.filter(function(obj) {
        if(obj.selected) return true;
        return false;
      });
  
      return arr;
    }
  
    // Получение номера выбранного элемента 
    this.getNumberSelectedItems = function() {
      var items = this.getSelectedItems();
  
      return items.length;
    }
  
    this.getNameSelectedItems = function() {
      var tab = this.getSelectedItems();
  
      if(tab.length > 0) {
        var str = '';
        var prev;
  
        tab.forEach(function(obj, index) {
          prev = str;
          if(obj.selected) str += obj.name + ', ';
        });
  
        return prev + '' + tab[tab.length-1].name;
      } else return 'No Object selected.'
    }
  
    this.order = function() {
  
      // Массив для таблицы
      var trace = Array(this.objects.length+1).fill(0).map(x => Array(this.maxWeight+1).fill(0));
      var choosen = Array(this.objects.length+1).fill(0).map(x => Array(this.maxWeight+1).fill(0));
  
      for(var i=1; i<this.objects.length+1; i++) {
        var wi = this.objects[i-1].weight;
        var vi = this.objects[i-1].value;
  
        for(var w=0; w<this.maxWeight+1; w++) {
          if((wi > w) || (trace[i-1][w-wi] + vi < trace[i-1][w])) trace[i][w] = trace[i-1][w];
          else {
            trace[i][w] = trace[i-1][w-wi] + vi;
            
            choosen[i][w] = 1;
          }
        }
  
      }
  
      // Так как мы знаем что было помещено в рюкзак, но мы не знаем какие элементы 
      //были помещены в рюкзак, чтобы получить обтимальное значение 
  
      var K = this.maxWeight;
  
      this.unselectAllObjects();
      var a = 1;
      for(var i=this.objects.length; i>0; i--) {
        
        if(choosen[i][K] == 1) {
          this.objects[i - 1].selected = true;
          this.objects[i - 1].order = a++;
          K = K - this.objects[i-1].weight;
        }
      }
  
    }
  }
  