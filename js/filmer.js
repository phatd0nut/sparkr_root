const expandBtns = document.querySelectorAll(".filmtitel");

expandBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    expandBtns.forEach((btn) => {
      btn.classList.remove("selected");
    });
    event.currentTarget.classList.add("selected");
  });
});


