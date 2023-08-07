var myApp = angular.module("AJS_CRUD_MODAL", []);

myApp.controller("AJS_CRUD_MODAL_Controller", function () {
  let ctrl = this;
  ctrl.users = {
    user1: {
      userName: "Kieu Quoc Anh",
      email: "kieuquocanh4@gmail.com",
      fullName: "Kieu Quoc Anh",
    },
    user2: {
      userName: "Kieu Quoc Anh1",
      email: "anh3@gmail.com",
      fullName: "Kieu Quoc Anh1",
    },
  };

  ctrl.message = "";
  ctrl.clickedKey = ""; // ko cần dùng
  ctrl.clickedUserValue = {};

  ctrl.newUserName = "";
  ctrl.newEmail = "";
  ctrl.newFullName = "";

  (function addingNewUser() {
    ctrl.dismissAddUser = function () {
      ctrl.newUserName = "";
      ctrl.newEmail = "";
      ctrl.newFullName = "";
      $("#addUserForm").removeClass("was-validated");
    };

    ctrl.addUser = function () {
      // (function checkValid() {
      // if (!ctrl.newUserName.length || ctrl.newUserName.length > 50) {
      //   $("#newUserName").addClass("is-invalid");
      //   $("#newUserName").removeClass("is-valid");
      //   $("#newUserName")[0].setCustomValidity("invalid UserName");
      // } else {
      //   $("#newUserName").removeClass("is-invalid");
      //   $("#newUserName").addClass("is-valid");
      //   $("#newUserName")[0].setCustomValidity("");
      // }
      // let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/

      // if (!emailRegex.test(ctrl.newEmail)) {
      //   $("#newEmail").removeClass("is-valid");
      //   $("#newEmail").addClass("is-invalid");
      //   $("#newEmail")[0].setCustomValidity("invalid email");
      // } else {
      //   $("#newEmail").addClass("is-valid");
      //   $("#newEmail").removeClass("is-invalid");
      //   $("#newEmail")[0].setCustomValidity("");
      // }
      // })();

      if (!$("#addUserForm")[0].checkValidity()) {
        console.log("disqualified");
        $("#addUserForm").addClass("was-validated");
      } else {
        console.log("qualified");

        let userOrder = "user" + (Object.keys(ctrl.users).length + 1);
        ctrl.users[userOrder] = {
          userName: ctrl.newUserName,
          email: ctrl.newEmail,
          fullName: ctrl.newFullName,
        };
        ctrl.newUserName = "";
        ctrl.newEmail = "";
        ctrl.newFullName = "";
        $("#newUserClose")[0].click();
        ctrl.message = "Adding new user succeeded.";
        $("#addUserForm").removeClass("was-validated");
      }
    };
  })();

  (function editingUser() {
    ctrl.selectEdit = function (userValue, key) {
      ctrl.clickedUserValue = { ...userValue };
      console.log(ctrl.clickedUserValue);

      ctrl.saveEdit = function () {
        if (!$("#editUserForm")[0].checkValidity()) {
          console.log("disqualified");
          $("#editUserForm").addClass("was-validated");
        } else {
          console.log("qualified");

          ctrl.users[key] = ctrl.clickedUserValue;
          $("#editUserClose")[0].click(); // form ok manully click the X button
          ctrl.message = "Edit user successully.";
          $("#editUserForm").removeClass("was-validated");
        }
      };
    };

    ctrl.dismissEditModal = function () {
      ctrl.clickedUserValue = {};

      $("#editUserForm").removeClass("was-validated");
    };
  })();

  (function deleteUser() {
    ctrl.selectDelete = function (key) {
      ctrl.yesDelete = function () {
        delete ctrl.users[key];

        let oldUsers = ctrl.users;
        ctrl.users = {};

        let i = 1;
        angular.forEach(oldUsers, function (value, prop) {
          ctrl.users[`user${i}`] = value;
          i++;
        });

        ctrl.message = "Deleting user succeeded.";
      };
    };
  })();
});

// myApp.filter("toC", function () {
//   return function (input) {
//     return input - 273.15;
//   };
// });
