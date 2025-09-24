const employees = [
  {
    name: 'Ana Silva',
    email: 'ana.silva@limaconsulting.com',
    coins: 1850,
    department: 'People & Culture',
  },
  {
    name: 'Bruno Costa',
    email: 'bruno.costa@limaconsulting.com',
    coins: 1320,
    department: 'Consultoria Digital',
  },
  {
    name: 'Carolina Mendes',
    email: 'carolina.mendes@limaconsulting.com',
    coins: 980,
    department: 'Growth',
  },
  {
    name: 'Diego Albuquerque',
    email: 'diego.albuquerque@limaconsulting.com',
    coins: 2420,
    department: 'Tecnologia',
  },
  {
    name: 'Fernanda Ribeiro',
    email: 'fernanda.ribeiro@limaconsulting.com',
    coins: 610,
    department: 'Customer Success',
  },
];

const productCatalog = [
  {
    id: 'mug',
    name: 'Copo Térmico Lima',
    description:
      'Perfeito para manter sua bebida favorita na temperatura ideal durante reuniões e viagens.',
    price: 450,
    badge: 'Novidade',
  },
  {
    id: 'tee',
    name: 'Camiseta Lima Consulting',
    description:
      'Camiseta em algodão orgânico com a marca Lima Consulting para vestir com orgulho.',
    price: 600,
    badge: 'Edição limitada',
  },
  {
    id: 'backpack',
    name: 'Mochila Executiva',
    description:
      'Compartimentos inteligentes para notebook, cabos e documentos. Ideal para o dia a dia.',
    price: 1250,
  },
  {
    id: 'speaker',
    name: 'Caixa de Som Bluetooth',
    description:
      'Potência portátil com resistência à água e 12h de bateria para animar qualquer ocasião.',
    price: 950,
  },
  {
    id: 'notebook',
    name: 'Caderno Inteligente',
    description:
      'Caderno reutilizável com páginas reposicionáveis. Organize suas ideias de forma sustentável.',
    price: 380,
    badge: 'Eco friendly',
  },
  {
    id: 'experience',
    name: 'Experiência Gastronômica',
    description:
      'Voucher para um jantar exclusivo em restaurantes parceiros em São Paulo.',
    price: 2100,
    badge: 'Premium',
  },
];

const state = {
  currentUser: null,
  redemptions: [],
};

const selectors = {
  loginCard: document.getElementById('login-card'),
  loginForm: document.getElementById('login-form'),
  emailInput: document.getElementById('email'),
  sampleUsers: document.getElementById('sample-users'),
  dashboard: document.getElementById('dashboard'),
  welcome: document.getElementById('welcome'),
  coins: document.getElementById('coins'),
  catalog: document.getElementById('catalog'),
  history: document.getElementById('history'),
  historyEmpty: document.getElementById('history-empty'),
  logout: document.getElementById('logout'),
};

const getLocalState = () => {
  try {
    const raw = localStorage.getItem('limastore-state');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (error) {
    console.error('Erro ao ler estado local', error);
    return null;
  }
};

const persistState = () => {
  if (!state.currentUser) {
    localStorage.removeItem('limastore-state');
    return;
  }

  const payload = {
    currentUser: state.currentUser,
    redemptions: state.redemptions,
  };

  localStorage.setItem('limastore-state', JSON.stringify(payload));
};

const hydrateFromStorage = () => {
  const persisted = getLocalState();
  if (!persisted) return;

  const employee = employees.find(
    (person) => person.email === persisted.currentUser.email
  );

  if (employee) {
    employee.coins = persisted.currentUser.coins;
    state.currentUser = employee;
    state.redemptions = (persisted.redemptions ?? []).map((entry) => ({
      ...entry,
      date: new Date(entry.date),
    }));
    showDashboard();
  }
};

const renderSampleUsers = () => {
  selectors.sampleUsers.innerHTML = employees
    .map(
      (employee) => `
        <li>
          <strong>${employee.name}</strong>
          <span>${employee.email}</span>
          <span>${employee.coins} moedas</span>
          <button type="button" class="sample-users__fill" data-email="${
            employee.email
          }">
            Usar este colaborador
          </button>
        </li>
      `
    )
    .join('');
};

const renderCatalog = () => {
  selectors.catalog.innerHTML = productCatalog
    .map((product) => {
      const disabled = state.currentUser.coins < product.price;

      return `
        <article class="product-card" data-id="${product.id}">
          <div class="badge">✨ Catálogo LimaStore</div>
          <h4>${product.name}</h4>
          <p>${product.description}</p>
          <span class="price">${product.price} moedas</span>
          ${
            product.badge
              ? `<span class="badge">${product.badge}</span>`
              : ''
          }
          <button class="primary" ${disabled ? 'disabled' : ''}>
            ${disabled ? 'Saldo insuficiente' : 'Resgatar'}
          </button>
        </article>
      `;
    })
    .join('');
};

const renderHistory = () => {
  if (!state.redemptions.length) {
    selectors.history.classList.add('hidden');
    selectors.historyEmpty.classList.remove('hidden');
    selectors.history.innerHTML = '';
    return;
  }

  selectors.history.classList.remove('hidden');
  selectors.historyEmpty.classList.add('hidden');

  selectors.history.innerHTML = state.redemptions
    .map(
      (item) => `
        <li>
          <span>${item.productName}</span>
          <time datetime="${item.date.toISOString()}">
            ${item.date.toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </time>
        </li>
      `
    )
    .join('');
};

const showDashboard = () => {
  selectors.loginCard.classList.add('hidden');
  selectors.dashboard.classList.remove('hidden');
  selectors.welcome.textContent = `Olá, ${state.currentUser.name}!`;
  selectors.coins.textContent = state.currentUser.coins;
  renderCatalog();
  renderHistory();
  persistState();
};

const showLogin = () => {
  selectors.dashboard.classList.add('hidden');
  selectors.loginCard.classList.remove('hidden');
  selectors.loginForm.reset();
  state.currentUser = null;
  state.redemptions = [];
  persistState();
};

const redeemProduct = (productId) => {
  const product = productCatalog.find((item) => item.id === productId);
  if (!product) return;

  if (state.currentUser.coins < product.price) {
    alert('Saldo insuficiente para resgatar este produto.');
    return;
  }

  state.currentUser.coins -= product.price;
  state.redemptions.unshift({
    productId: product.id,
    productName: product.name,
    price: product.price,
    date: new Date(),
  });

  selectors.coins.textContent = state.currentUser.coins;
  renderCatalog();
  renderHistory();
  persistState();
};

const handleLogin = (event) => {
  event.preventDefault();
  const email = selectors.emailInput.value.trim().toLowerCase();

  if (!email.endsWith('@limaconsulting.com')) {
    selectors.emailInput.setCustomValidity(
      'Utilize seu e-mail corporativo @limaconsulting.com'
    );
    selectors.emailInput.reportValidity();
    return;
  }

  const employee = employees.find(
    (person) => person.email.toLowerCase() === email
  );

  if (!employee) {
    selectors.emailInput.setCustomValidity(
      'Usuário não encontrado. Verifique o e-mail informado.'
    );
    selectors.emailInput.reportValidity();
    return;
  }

  selectors.emailInput.setCustomValidity('');
  state.currentUser = employee;
  state.redemptions = [];
  showDashboard();
};

const handleCatalogClick = (event) => {
  const button = event.target.closest('button');
  if (!button || button.disabled) return;

  const card = event.target.closest('.product-card');
  if (!card) return;

  redeemProduct(card.dataset.id);
};

const handleSampleUserClick = (event) => {
  const button = event.target.closest('.sample-users__fill');
  if (!button) return;

  selectors.emailInput.value = button.dataset.email;
  selectors.emailInput.focus();
};

const initialize = () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  renderSampleUsers();
  selectors.loginForm.addEventListener('submit', handleLogin);
  selectors.catalog.addEventListener('click', handleCatalogClick);
  selectors.sampleUsers.addEventListener('click', handleSampleUserClick);
  selectors.logout.addEventListener('click', showLogin);

  hydrateFromStorage();
};

initialize();
