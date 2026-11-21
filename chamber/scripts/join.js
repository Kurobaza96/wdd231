// Store the date and time when the page loads
const timestamp = document.querySelector("#timestamp");

if (timestamp) {
  timestamp.value = new Date().toISOString();
}

// Open membership modals
document.querySelectorAll("[data-modal]").forEach(button => {
  button.addEventListener("click", () => {
    const modalId = button.dataset.modal;
    const modal = document.getElementById(modalId);

    if (modal) {
      modal.showModal();
    }
  });
});

// Close membership modals
document.querySelectorAll(".close-modal").forEach(button => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});