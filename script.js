// =======================
//  ELEMENTS
// =======================
const scanStep   = document.getElementById('scanStep');
const searchStep = document.getElementById('searchStep');

const scanOverlay       = document.getElementById('scanOverlay');
const successMessage    = scanOverlay.querySelector('.success');

const searchOverlay     = document.getElementById('searchOverlay');
const searchInputOverlay= document.getElementById('searchInputOverlay');
const searchConfirmBtn  = document.getElementById('searchConfirmBtn');

const animalProfileOverlay = document.getElementById('animalProfileOverlay');
const closeProfile         = document.getElementById('closeProfile');

// =======================
//  INITIAL STATE
// =======================
[scanOverlay, searchOverlay, successMessage, animalProfileOverlay]
  .forEach(el => el && (el.style.display = 'none'));

// =======================


// =======================
//  SCAN = ATTENTE 1,2,3
// =======================
// =======================

// =======================

const animals = [
  { name: 'Holstein',  id: '0001', sex: 'Femelle',  year: '2022', weight: '510 kg',  state: 'Lactation',  nec: '3',   stab: 'Libre',    needs: 'Care, Lactation' },
  { name: 'Holstein',  id: '0002', sex: 'Mâle',     year: '2021', weight: '610 kg',  state: 'Entretien',  nec: '3',   stab: 'Entravé',  needs: 'Care' },
  { name: 'Montbéliarde',id:'0003',sex:'Femelle',  year:'2024', weight:'450 kg', state:'Croissance', nec:'2.8', stab:'Libre', needs: 'Care, Lactation, Growth' }
];

scanStep?.addEventListener('click', e => {
  e.preventDefault();
  scanOverlay.style.display = 'flex';
  successMessage.style.display = 'none';
});

// écoute 1,2,3
document.addEventListener('keydown', e => {
  if (scanOverlay.style.display === 'flex') {
    const idx = parseInt(e.key);
    if (idx >= 1 && idx <= 3) {
      successMessage.textContent = 'Approved!';
      successMessage.style.display = 'block';
      setTimeout(() => {
        scanOverlay.style.display = 'none';
        successMessage.style.display = 'none';
        fillProfile(animals[idx - 1]);
      }, 800);
    }
  }
});

function fillProfile(animal) {
  document.getElementById('animalName').textContent   = animal.name;
  document.getElementById('race').textContent         = animal.name;
  document.getElementById('animalId').textContent     = animal.id;
  document.getElementById('sex').textContent          = animal.sex;
  document.getElementById('year').textContent         = animal.year;
  document.getElementById('weight').textContent       = animal.weight;
  document.getElementById('state').textContent        = animal.state;
  document.getElementById('nec').textContent          = animal.nec;
  document.getElementById('stabulation').textContent  = animal.stab;
  document.getElementById('needs').textContent = animal.needs;

  animalProfileOverlay.style.display = 'flex';
}
// =======================
//  SEARCH CARD
// =======================
searchStep?.addEventListener('click', e => {
  e.preventDefault();
  openOverlay(true);
});

// =======================
//  COMMON OVERLAY LOGIC
// =======================
function openOverlay(isSearch) {
  const overlay = isSearch ? searchOverlay : scanOverlay;
  overlay.style.display = 'flex';
  successMessage.style.display = 'none';

  if (isSearch) {
    searchInputOverlay.value = '';
    searchInputOverlay.focus();
  } else {
    // auto-success for scan (press S)
    setTimeout(() => {
      successMessage.style.display = 'block';
      setTimeout(() => closeOverlay(false), 1000);
    }, 500);
  }
}

function closeOverlay(isSearch) {
  const overlay = isSearch ? searchOverlay : scanOverlay;
  overlay.style.display = 'none';
  successMessage.style.display = 'none';
  animalProfileOverlay.style.display = 'flex';
}

// =======================
//  SEARCH CONFIRM
// =======================
searchConfirmBtn?.addEventListener('click', () => {
  const q = searchInputOverlay.value.trim();
  if (!q) return;
  closeOverlay(true);
});

// =======================
//  KEYBOARD SCAN
// =======================
document.addEventListener('keydown', e => {
  if (scanOverlay.style.display === 'flex' && e.key.toLowerCase() === 's') {
    closeOverlay(false);
  }
});

// =======================
//  CLOSE PROFILE
// =======================
closeProfile?.addEventListener('click', () => {
  animalProfileOverlay.style.display = 'none';
});
