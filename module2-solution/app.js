(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController )
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buyList = this;

  buyList.items = ShoppingListCheckOffService.getBuyItems();  
  buyList.errorMsg="";
  buyList.removeItem = function (itemIndex) {
    try {
        ShoppingListCheckOffService.removeBuyItem(itemIndex);
    }catch(error) {
        buyList.errorMsg=error.message;
    }}  
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;
  boughtList.errorMsg = "Nothing bought yet.";  
  boughtList.items = ShoppingListCheckOffService.getBoughtItems();
  
  if(boughtList.items.length >0) {
    boughtList.errorMsg = "";
  }

}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var buyItems = [
      {
        itemName:"itune",
        quantity:"1",
      },
      {
        itemName:"iphone",
        quantity:"1",

      },
      {
        itemName:"mac",
        quantity:"2",

      },
      {
        itemName:"ipod",
        quantity:"4",

      },
      {
        itemName:"SmartWatch",
        quantity:"2",

      }];
  var boughtItems = []

  service.addBoughtItem = function (itemName, quantity) {
    var item = {
      itemName: itemName,
      quantity: quantity
    };
    boughtItems.push(item);

  };

  service.removeBuyItem = function (itemIdex) {
    service.addBoughtItem(buyItems[itemIdex].itemName,buyItems[itemIdex].quantity);
    buyItems.splice(itemIdex, 1);
    if(buyItems.length === 0) {
      throw new Error("Everything is bought!");
    }

  };

  service.getBuyItems = function () {
    return buyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();