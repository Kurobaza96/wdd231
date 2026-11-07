
// Week 02: JSON + fetch + async/await + Grid/List selection

const memberContainer = document.querySelector('#members');
const resultCount = document.querySelector('#member-count');
const gridButton = document.querySelector('#grid-view');
const listButton = document.querySelector('#list-view');

const membershipLabels = {
  1: 'Member',
  2: 'Silver',
  3: 'Gold'
};

// Change between grid and list views
function setView(view) {
  const showGrid = view === 'grid';

  memberContainer.classList.toggle('grid-view', showGrid);
  memberContainer.classList.toggle('list-view', !showGrid);

  gridButton.setAttribute('aria-pressed', String(showGrid));
  listButton.setAttribute('aria-pressed', String(!showGrid));
}

gridButton.addEventListener('click', () => setView('grid'));
listButton.addEventListener('click', () => setView('list'));

// Create a detail row
function addDetail(details, label, value, link = false) {
  const row = document.createElement('div');
  const term = document.createElement('dt');
  const description = document.createElement('dd');

  term.textContent = label;

  if (link) {
    const website = document.createElement('a');

    website.className = 'member-site';
    website.href = new URL(value).href;
    website.target = '_blank';
    website.rel = 'noopener noreferrer';
    website.textContent = 'Website (demo)';
    website.setAttribute('aria-label', 'Demo website link for ' + link);

    description.append(website);
  } else {
    description.textContent = value;
  }

  row.append(term, description);
  details.append(row);
}

// Create a business card
function createMemberCard(member) {
  const card = document.createElement('article');
  card.className = 'member-card';

  // Business image
  const visual = document.createElement('div');
  visual.className = 'member-visual';

  const img = document.createElement('img');
  img.src = `images/members/${member.image}`;
  img.alt = `${member.name} visual identity`;
  img.width = 640;
  img.height = 360;
  img.loading = 'lazy';

  visual.append(img);

  // Business information
  const content = document.createElement('div');
  content.className = 'member-content';

  const meta = document.createElement('div');
  meta.className = 'member-meta';

  const category = document.createElement('span');
  category.className = 'member-category';
  category.textContent = member.category;

  const tier = document.createElement('span');
  tier.className = `member-tier tier-${membershipLabels[member.membership].toLowerCase()}`;
  tier.textContent = `${membershipLabels[member.membership]} Member`;

  meta.append(category, tier);

  const heading = document.createElement('h3');
  heading.textContent = member.name;

  const description = document.createElement('p');
  description.className = 'member-description';
  description.textContent = member.description;

  // Address, phone and website
  const details = document.createElement('dl');
  details.className = 'member-details';

  addDetail(details, 'Address', member.address);
  addDetail(details, 'Phone', member.phone);
  addDetail(details, 'Online', member.website, member.name);

  content.append(meta, heading, description, details);
  card.append(visual, content);

  return card;
}

// Fetch member data from JSON
async function showMembers() {
  try {
    const response = await fetch('./data/members.json');

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const members = await response.json();

    if (!Array.isArray(members)) {
      throw new Error('Members data is not an array');
    }

    const fragment = document.createDocumentFragment();

    for (const member of members) {
      fragment.append(createMemberCard(member));
    }

    memberContainer.replaceChildren(fragment);
    resultCount.textContent = `${members.length} local businesses`;

  } catch (error) {
    console.error('Could not load chamber member data:', error);

    resultCount.textContent = 'Directory unavailable';

    const message = document.createElement('p');
    message.setAttribute('role', 'alert');
    message.textContent = 'Could not load members. Open the site using VS Code Live Server (not file://) and check the JSON file.';

    memberContainer.replaceChildren(message);
  }
}

// Load directory members
showMembers();
