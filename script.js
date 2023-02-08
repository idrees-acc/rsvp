const toastWait = () => {
  var x = document.getElementById("wait");
  x.className = "show";
};
const removeWait = () => {
  var x = document.getElementById("wait");
  x.className = x.className.replace("show", "");
};
const toastLoad = () => {
  var x = document.getElementById("toast");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 5000);
};
const toastError = () => {
  var x = document.getElementById("error");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 5000);
};

const fp = new Fingerprint2();
let fingerPrintResult = "";
fp.get((result) => {
  fingerPrintResult = result;
});

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
};

fetch("https://rsvp-372207.el.r.appspot.com/current-count", requestOptions)
  .then((response) => response.text())
  .then((result) => {
    $("#currentCount").text(JSON.parse(result).totalCount);
  })
  .catch((error) => {
    console.log("error", error);
  });

$("#form_button").click(function (e) {
  toastWait();
  e.preventDefault();
  if (validatehofits() == true && $("#adult").val() && $("#child").val()) {
    const self = this;
    this.disabled = true;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      hof: $("#hof").val(),
      adult: +$("#adult").val(),
      child: +$("#child").val(),
      fingerPrint: fingerPrintResult,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("https://rsvp-372207.el.r.appspot.com/rsvp", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        $("#contact_form")[0].reset();
        removeWait();
        self.disabled = false;
        toastLoad();
      })
      .catch((error) => {
        console.log("error", error);
        self.disabled = false;
        removeWait();
      });
  } else {
    toastError();
    removeWait();
  }
});
function validatehofits() {
  let hofits = $("#hof").val();

  let regex = /^[1-9][0-9]{7}$/;
  if (regex.test(hofits)) {
    return true;
  } else {
    return false;
  }
}
