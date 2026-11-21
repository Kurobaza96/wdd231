const params = new URLSearchParams(window.location.search);

const details = document.querySelector("#application-details");

const fields = [
  ["First Name", "firstName"],
  ["Last Name", "lastName"],
  ["Email", "email"],
  ["Mobile Phone", "phone"],
  ["Business Name", "organization"],
  ["Application Date", "timestamp"]
];

if (details) {
  fields.forEach(([label, key]) => {
    const paragraph = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = `${label}: `;

    let value = params.get(key) || "Not provided";

    if (key === "timestamp" && params.get(key)) {
      const date = new Date(value);

      if (!Number.isNaN(date.getTime())) {
        value = date.toLocaleString();
      }
    }

    paragraph.append(
      strong,
      document.createTextNode(value)
    );

    details.appendChild(paragraph);
  });
}