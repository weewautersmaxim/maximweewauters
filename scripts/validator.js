function validation() {
  const form = document.getElementsByClassName("c-container__form")[0];
  const email = document.getElementsByClassName("c-container__form--input")[0]
    .value;
  const text = document.getElementsByClassName(
    "c-container__form--validator"
  )[0];
  const btn = document.getElementsByClassName("c-container__form--button")[0];
  let pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,4}$/;

  if (email.match(pattern)) {
    form.classList.add("valid");
    form.classList.remove("invalid");

    text.innerHTML = "Uw e-mailadres is correct";
    text.style.color = "#65b26c";
    document.getElementsByClassName(
      "c-container__form--input"
    )[0].style.borderColor = "#fff";
    btn.disabled = false;
  } else {
    form.classList.add("invalid");
    form.classList.remove("valid");
    text.innerHTML =
      "Uw e-mailadres is incorrect, voer een geldig email adress in";
    text.style.color = "#e62452";
    document.getElementsByClassName(
      "c-container__form--input"
    )[0].style.borderColor = "#e62452";
    btn.disabled = true;
  }
}
