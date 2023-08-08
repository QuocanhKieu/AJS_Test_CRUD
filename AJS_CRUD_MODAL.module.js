var myApp = angular.module("AJS_CRUD_MODAL", []);

myApp.controller("AJS_CRUD_MODAL_Controller", function () {
  let ctrl = this;
  ctrl.products = [
    {
      productName: "Product One",
      productPrice: 22.5,
    },
    {
      productName: "Product Two",
      productPrice: 15,
    },
    {
      productName: "MoChi",
      productPrice: 55,
    },
    {
      productName: "Matcha",
      productPrice: 56,
    },
  ];

  ctrl.message = "";
  ctrl.clickedProduct = {};

  ctrl.newProductName = "";
  ctrl.newProductPrice = "";

  (function addingNewUser() {
    ctrl.dismissAddUser = function () {
      ctrl.newProductName = "";
      ctrl.newProductPrice = "";
      $("#addUserForm").removeClass("was-validated");
    };

    ctrl.addUser = function () {
      if (!$("#addUserForm")[0].checkValidity()) {
        console.log("disqualified");
        $("#addUserForm").addClass("was-validated");
      } else {
        console.log("qualified");
        console.log(ctrl.newProductPrice);

        ctrl.products.push({
          productName: ctrl.newProductName,
          productPrice: ctrl.newProductPrice,
        });

        ctrl.newProductName = "";
        ctrl.newProductPrice = "";
        $("#newUserClose")[0].click();
        ctrl.message = "Adding new product succeeded.";
        $("#addUserForm").removeClass("was-validated");
      }
    };
  })();

  (function editingUser() {
    ctrl.selectEdit = function (productValue, index) {
      ctrl.clickedProduct = { ...productValue };
      console.log(ctrl.clickedProduct);

      ctrl.saveEdit = function () {
        if (!$("#editUserForm")[0].checkValidity()) {
          console.log("disqualified");
          $("#editUserForm").addClass("was-validated");
        } else {
          console.log("qualified");

          ctrl.products[index] = ctrl.clickedProduct;
          $("#editUserClose")[0].click(); // form ok manully click the X button
          ctrl.message = "Edit user successully.";
          $("#editUserForm").removeClass("was-validated");
        }
      };
    };

    ctrl.dismissEditModal = function () {
      ctrl.clickedProduct = {};

      $("#editUserForm").removeClass("was-validated");
    };
  })();

  (function deleteUser() {
    ctrl.selectDelete = function (index) {
      console.log("here", index);
      ctrl.yesDelete = function () {
        ctrl.products.splice(index, 1);
        console.log(ctrl.products);

        ctrl.message = "Deleting user succeeded.";
      };
    };
  })();

  ctrl.resetMessage = function () {
    ctrl.message = "";
  };
});
