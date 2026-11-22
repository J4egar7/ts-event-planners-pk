/* TS Event Planners — demo enquiry form. Nothing is transmitted. */
(function () {
  "use strict";

  var form = document.querySelector("[data-demo-form]");
  if (!form) return;

  var status = form.querySelector(".form-status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = (form.querySelector("#name") || {}).value || "";
    var date = (form.querySelector("#date") || {}).value || "";

    var msg = "Nothing has been sent yet — this form is a preview. Call 0321 4863628 to book the date.";
    if (name.trim()) {
      msg =
        "Thank you" + (name.trim() ? ", " + name.trim().split(" ")[0] : "") +
        ". This form doesn't send yet — call 0321 4863628" +
        (date ? " about " + date : "") +
        " and we'll take the details down properly.";
    }
    if (status) status.textContent = msg;
  });

  var reset = form.querySelector("[data-reset]");
  if (reset) {
    reset.addEventListener("click", function () {
      form.reset();
      if (status) status.textContent = "";
    });
  }
})();
