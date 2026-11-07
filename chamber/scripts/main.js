
// Shared site behaviors used by all Chamber pages.

const navButton = document.querySelector('#menu-button');
const navigation = document.querySelector('#site-nav');

if (navButton && navigation) {
  navButton.addEventListener('click', () => {
    const expanded = navButton.getAttribute('aria-expanded') === 'true';

    navButton.setAttribute('aria-expanded', String(!expanded));
    navigation.classList.toggle('is-open', !expanded);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      navigation.classList.remove('is-open');
      navButton.setAttribute('aria-expanded', 'false');
    }
  });
}

// Current copyright year
const yearOutput = document.querySelector('#current-year');

if (yearOutput) {
  yearOutput.textContent = new Date().getFullYear();
}

// Last modified date
const modifiedOutput = document.querySelector('#last-modified');

if (modifiedOutput) {
  const changed = new Date(document.lastModified);

  modifiedOutput.textContent = Number.isNaN(changed.getTime())
    ? document.lastModified
    : new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(changed);
}
