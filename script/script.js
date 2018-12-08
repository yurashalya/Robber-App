$(document).ready(function(){

    var objects = [
      {
        id: 1,
        weight: 5,
        value: 50,
        name: "OSBD",
        selected: false,
        order: 0
      },
      {
        id: 2,
        weight: 14,
        value: 40,
        name: "React",
        selected: false,
        order: 0
      },
      {
        id: 3,
        weight: 70,
        value: 30,
        name: "Vue",
        selected: false,
        order: 0
      },
      {
        id: 4,
        weight: 5,
        value: 30,
        name: "Angular",
        selected: false,
        order: 0
      },
      {
        id: 5,
        weight: 5,
        value: 45,
        name: "JavaScript",
        selected: false,
        order: 0
      },
    ];
  
    var knapsack = new Knapsack(objects, 30);
    knapsack.order();
    updateUI();
  
    $('#form-add-article input:text').keypress(function(e) {
      if(e.which == 13) {
          $('#add-me-to-the-bag').click();
      }
    });
  
    $('#form-mod-max-weight input:text').keypress(function(e) {
      if(e.which == 13) {
          $('#set-weight').click();
      }
    });
  
    $('#add-me-to-the-bag').click(function(){
      var name = $('#name').val();
      var weight = $('#weight').val();
      var value = $('#value').val();
  
      if((weight != '') && (value != '')) {
        var aID = knapsack.ID+1;
  
        console.log('aID: ', aID);
        if(name == '') name = 'Element' + aID;
  
        knapsack.ID++;
        var obj = {
          id: aID,
          name: name,
          weight: parseInt(weight),
          value: parseInt(value),
          selected: false
        };
  
        knapsack.addObject(obj);
        knapsack.order();
  
        updateUI();
      }
  
    });
  
    $('#set-weight').click(function(){
      var maxWeight = $('#new-max-weight').val();
  
      knapsack.setMaxWeight(parseInt(maxWeight));
      knapsack.order();
  
      updateUI();
  
    });
  
    $(document).on('click', '.delete', function(){
      var id = $(this).attr('data-id');
  
      knapsack.deleteObject(parseInt(id));
      knapsack.order();
  
      updateUI();
  
    });
  
    function updateUI() {
      var html = '';
      var totalValue = 0;
      var objects = knapsack.getObjects();
  
      if(objects.length > 0) {
        for(var i=0; i<objects.length; i++) {
          var object = objects[i];
          html += buildElementRow(object);
  
          if(object.selected) totalValue = object.value;
        }
      } else {
        html += '<div class="notification">No item. Please create ones.</div>'
      }
  
      $('#max-weight-span').text(knapsack.getMaxWeight() + 'Kg');
      $('#new-max-weight').val(knapsack.getMaxWeight());
      $('#number-selected-items').text(knapsack.getNumberSelectedItems());
      $('#total-value').text(knapsack.getTotalValue() + '€');
      $('#name-selected-items').text(knapsack.getNameSelectedItems());
      $('#elements-list').html(html);
    }
  
    function buildElementRow(object) {
      var code = '';
      var classe = "";
      var iconsClasse = "";
  
      if(object.selected){
        classe = "is-success";
        iconsClasse = "fa fa-check";
      }
      else {
        classe = "unsharp is-danger";
        iconsClasse = "fa fa-close";
      }
  
      code += '<div class="notification ' + classe + '" >';
        code += '<button class="delete" data-id="' + object.id + '"></button>';
        if (object.selected) code += '<div><i class="' + iconsClasse + '"></i> (' + object.order + ') Name: ' + object.name + ', Weight: ' + object.weight + 'Kg, Value: ' + object.value + '€</div>';
        else code += '<div><i class="' + iconsClasse + '"></i> Name: ' + object.name + ', Weight: ' + object.weight + 'Kg, Value: ' + object.value + '€</div>';
      code += '</div>';
      return code;
    }
  });
  