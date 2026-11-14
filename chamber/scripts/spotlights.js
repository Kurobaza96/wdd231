// Chamber Member Spotlights

const spotlightContainer =
    document.querySelector("#spotlight-cards");

async function loadSpotlights() {

    if (!spotlightContainer) return;

    try {

        // Fetch existing member data
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Failed to load members");
        }

        const members = await response.json();

        // Select Gold and Silver members only
        const eligibleMembers = members.filter(member =>
            Number(member.membership) === 2 ||
            Number(member.membership) === 3
        );

        // Randomize using Fisher-Yates shuffle
        for (let i = eligibleMembers.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [eligibleMembers[i], eligibleMembers[j]] =
                [eligibleMembers[j], eligibleMembers[i]];

        }

        // Select up to three members
        const selectedMembers = eligibleMembers.slice(0, 3);

        spotlightContainer.innerHTML = "";

        selectedMembers.forEach(member => {

            const membershipLevel =
                Number(member.membership) === 3
                    ? "Gold"
                    : "Silver";

            const card = document.createElement("article");

            card.classList.add("spotlight-card");

            // Company logo
            const logo = document.createElement("img");

            logo.src = `images/members/${member.image}`;
            logo.alt = `${member.name} logo`;
            logo.loading = "lazy";
            logo.width = 180;
            logo.height = 95;

            // Company name
            const name = document.createElement("h3");
            name.textContent = member.name;

            // Membership badge
            const badge = document.createElement("span");

            badge.classList.add(
                "membership-badge",
                membershipLevel.toLowerCase()
            );

            badge.textContent = `${membershipLevel} Member`;

            // Address
            const address = document.createElement("p");
            address.textContent = member.address;

            // Phone
            const phone = document.createElement("p");
            const phoneLink = document.createElement("a");

            phoneLink.href =
                `tel:${member.phone.replace(/[^+\d]/g, "")}`;

            phoneLink.textContent = member.phone;

            phone.appendChild(phoneLink);

            // Website
            const website = document.createElement("p");
            const websiteLink = document.createElement("a");

            websiteLink.href = member.website;
            websiteLink.textContent = "Visit Website ↗";
            websiteLink.target = "_blank";
            websiteLink.rel = "noopener noreferrer";

            website.appendChild(websiteLink);

            // Assemble card
            card.append(
                logo,
                name,
                badge,
                address,
                phone,
                website
            );

            spotlightContainer.appendChild(card);

        });

    } catch (error) {

        console.error("Spotlight error:", error);

        spotlightContainer.textContent =
            "Member spotlights are temporarily unavailable.";

    }

}

loadSpotlights();