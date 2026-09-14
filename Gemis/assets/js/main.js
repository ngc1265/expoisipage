// Datos locales: funciona con doble clic y sin servidor.
const localDataResponse = (name) => Promise.resolve({ok: true, json: () => Promise.resolve(window.GEMIS_DATA[name])});
const revealItems = document.querySelectorAll('[data-reveal]');
const fallbackImagePath = 'assets/img/gemis-wallpaper.png';

const applyImageFallback = (image) => {
  if (!image || image.matches('[data-video-thumbnail]') || image.dataset.fallbackReady === 'true') return;

  const useFallback = () => {
    if (image.getAttribute('src') === fallbackImagePath) return;
    image.src = fallbackImagePath;
    image.classList.add('is-fallback-image');
  };

  image.dataset.fallbackReady = 'true';
  image.addEventListener('error', useFallback);

  if (image.complete && image.naturalWidth === 0) useFallback();
};

document.querySelectorAll('img').forEach((image) => {
  if (!image.matches('[data-logo]') && !image.closest('.social-link, .team-social-link')) {
    applyImageFallback(image);
  }
});

document.addEventListener('error', (event) => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement)) return;
  if (image.matches('[data-logo], [data-video-thumbnail]') || image.closest('.social-link, .team-social-link')) return;
  if (image.getAttribute('src') === fallbackImagePath) return;

  image.src = fallbackImagePath;
  image.classList.add('is-fallback-image');
}, true);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const brand = document.querySelector('.brand');
const logo = document.querySelector('[data-logo]');

if (brand && logo && logo.getAttribute('src')) {
  logo.addEventListener('load', () => brand.classList.add('has-logo'));
  logo.addEventListener('error', () => brand.classList.remove('has-logo'));
}

const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = document.querySelector('[data-nav-links]');
const navBar = navToggle ? navToggle.closest('.nav') : null;

if (navToggle && navLinks) {
  const closeNavigation = () => {
    navLinks.classList.remove('is-open');
    navBar?.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir navegación');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navBar?.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Cerrar navegación' : 'Abrir navegación');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNavigation);
  });
}

const homeNews = document.getElementById('home-news');
const newsMore = document.getElementById('news-more');
const openNewsModalButton = document.getElementById('open-news-modal');
const newsModal = document.getElementById('news-modal');
const newsGallery = document.getElementById('news-gallery');

if (homeNews) {
  const resetNewsGalleryVideos = [];
  const getNewsImages = (item) => {
    const values = Array.isArray(item.images) && item.images.length ? item.images : [item.image];

    return values
      .map((value) => {
        if (typeof value === 'string') return { url: value.trim(), alt: '' };
        if (value && typeof value === 'object') {
          return { url: String(value.url || value.src || '').trim(), alt: String(value.alt || '').trim() };
        }
        return null;
      })
      .filter((image) => image?.url);
  };

  const appendNewsImages = (media, item) => {
    const images = getNewsImages(item);
    const slides = images.length ? images : [{ url: fallbackImagePath, alt: '' }];
    const imageElements = [];
    const updateMediaAspectRatio = (image) => {
      if (!image?.naturalWidth || !image?.naturalHeight) return;
      media.style.aspectRatio = `${image.naturalWidth} / ${image.naturalHeight}`;
    };

    slides.forEach((slide, index) => {
      const image = document.createElement('img');
      image.src = slide.url;
      image.alt = slide.alt || (slides.length > 1 ? `${item.title || 'Novedad'}, imagen ${index + 1}` : (item.title || ''));
      image.loading = 'lazy';
      image.className = 'news-slide';
      image.classList.toggle('is-active', index === 0);
      image.setAttribute('aria-hidden', String(index !== 0));
      image.addEventListener('load', () => {
        if (image.classList.contains('is-active')) updateMediaAspectRatio(image);
      });
      applyImageFallback(image);
      media.appendChild(image);
      imageElements.push(image);
      if (index === 0 && image.complete) updateMediaAspectRatio(image);
    });

    if (slides.length < 2) return;

    media.classList.add('news-carousel');
    const previous = document.createElement('button');
    previous.className = 'news-carousel-control news-carousel-previous';
    previous.type = 'button';
    previous.setAttribute('aria-label', 'Imagen anterior');
    previous.textContent = '‹';

    const next = document.createElement('button');
    next.className = 'news-carousel-control news-carousel-next';
    next.type = 'button';
    next.setAttribute('aria-label', 'Imagen siguiente');
    next.textContent = '›';

    const indicators = document.createElement('div');
    indicators.className = 'news-carousel-indicators';
    indicators.setAttribute('aria-label', 'Seleccionar imagen');
    const dots = slides.map((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Mostrar imagen ${index + 1} de ${slides.length}`);
      dot.classList.toggle('is-active', index === 0);
      indicators.appendChild(dot);
      return dot;
    });

    let activeIndex = 0;
    let touchStartX = 0;
    const updateSlide = (newIndex) => {
      activeIndex = (newIndex + slides.length) % slides.length;
      media.querySelectorAll('.news-slide').forEach((image, index) => {
        const isActive = index === activeIndex;
        image.classList.toggle('is-active', isActive);
        image.setAttribute('aria-hidden', String(!isActive));
      });
      updateMediaAspectRatio(imageElements[activeIndex]);
      dots.forEach((dot, index) => dot.classList.toggle('is-active', index === activeIndex));
    };

    previous.addEventListener('click', () => updateSlide(activeIndex - 1));
    next.addEventListener('click', () => updateSlide(activeIndex + 1));
    dots.forEach((dot, index) => dot.addEventListener('click', () => updateSlide(index)));
    media.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
    media.addEventListener('touchend', (event) => {
      const distance = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(distance) > 45) updateSlide(activeIndex + (distance < 0 ? 1 : -1));
    }, { passive: true });

    media.appendChild(previous);
    media.appendChild(next);
    media.appendChild(indicators);
  };

  const createNewsCard = (item, { featured = false, gallery = false } = {}) => {
    const article = document.createElement('article');
    article.className = 'news-card';
    if (featured) article.classList.add('news-card-featured');
    if (gallery) article.classList.add('news-card-gallery');

    const media = document.createElement('div');
    media.className = 'news-media';

    article.classList.add('news-card-has-images');
    appendNewsImages(media, item);

    const content = document.createElement('div');
    content.className = 'news-content';

    const meta = document.createElement('p');
    meta.className = 'news-meta';
    meta.textContent = [item.type, item.date].filter(Boolean).join(' - ');

    const title = document.createElement('h3');
    title.textContent = item.title || '';

    const description = document.createElement('p');
    description.textContent = item.description || '';

    content.appendChild(meta);
    content.appendChild(title);
    content.appendChild(description);
    if (item.offlineMediaNote) {
      const note = document.createElement('p');
      note.className = 'offline-media-note';
      note.textContent = item.offlineMediaNote + ' ↗';
      content.appendChild(note);
    }

    if (item.url) {
      article.classList.add('news-card-linkable');

      const link = document.createElement('a');
      link.className = 'news-card-link';
      link.href = item.url;
      link.setAttribute('aria-label', `${item.cta || 'Acceder'}: ${item.title || 'Novedad'}`);

      if (/^https?:\/\//.test(item.url)) {
        link.target = '_blank';
        link.rel = 'noopener';
        link.setAttribute('aria-label', `${item.cta || 'Acceder'}: ${item.title || 'Novedad'} (se abre en una pestaña nueva)`);
      }

      article.appendChild(link);
    }

    article.appendChild(media);
    article.appendChild(content);
    return article;
  };

  localDataResponse('news')
    .then((response) => {
      if (!response.ok) {
        throw new Error('No se pudo cargar news.json');
      }
      return response.json();
    })
    .then((items) => {
      const allItems = Array.isArray(items) ? items : [];
      const latestItems = allItems.slice(-3).reverse();
      homeNews.innerHTML = '';
      homeNews.dataset.count = String(latestItems.length);

      latestItems.forEach((item, index) => {
        homeNews.appendChild(createNewsCard(item, { featured: latestItems.length === 3 && index === 0 }));
      });

      if (newsGallery && newsModal && newsMore && openNewsModalButton && allItems.length > 3) {
        newsGallery.innerHTML = '';
        allItems.slice().reverse().forEach((item) => {
          newsGallery.appendChild(createNewsCard(item, { gallery: true }));
        });
        newsMore.hidden = false;

        const closeNewsModal = () => {
          resetNewsGalleryVideos.forEach((resetVideo) => resetVideo());
          newsModal.classList.remove('is-open');
          newsModal.setAttribute('aria-hidden', 'true');
          document.body.classList.remove('modal-open');
          openNewsModalButton.focus();
        };

        openNewsModalButton.addEventListener('click', () => {
          newsModal.classList.add('is-open');
          newsModal.setAttribute('aria-hidden', 'false');
          document.body.classList.add('modal-open');
          newsModal.querySelector('button[data-close-news-modal]')?.focus();
        });

        newsModal.querySelectorAll('[data-close-news-modal]').forEach((button) => {
          button.addEventListener('click', closeNewsModal);
        });

        document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape' && newsModal.classList.contains('is-open')) closeNewsModal();
        });
      }
    })
    .catch((error) => {
      console.error('Error cargando novedades:', error);
    });
}

const projectModal = document.getElementById('projectModal');
const modalProjectTitle = document.getElementById('modalProjectTitle');
const modalProjectDescription = document.getElementById('modalProjectDescription');
const modalProjectLocation = document.getElementById('modalProjectLocation');
const modalProjectTeam = document.getElementById('modalProjectTeam');
const modalProjectPeriod = document.getElementById('modalProjectPeriod');
const modalProjectActions = document.getElementById('modalProjectActions');

const projectCards = document.querySelectorAll('.project-card');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');

if (
  projectModal &&
  modalProjectTitle &&
  modalProjectDescription &&
  modalProjectLocation &&
  modalProjectTeam &&
  modalProjectPeriod &&
  modalProjectActions &&
  projectCards.length
) {
  const renderLines = (container, value) => {
    container.innerHTML = '';

    const lines = (value || '')
      .split('|')
      .map((item) => item.trim())
      .filter(Boolean);

    lines.forEach((line) => {
      const row = document.createElement('div');
      row.textContent = line;
      container.appendChild(row);
    });
  };

  const renderTeam = (container, value) => {
    container.innerHTML = '';

    const members = (value || '')
      .split('|')
      .map((item) => item.trim())
      .filter(Boolean);

    members.forEach((member) => {
      const li = document.createElement('li');
      li.textContent = member;
      container.appendChild(li);
    });
  };

  const openProjectModal = (card) => {
    const title = card.dataset.title || '';
    const description = card.dataset.description || '';
    const location = card.dataset.location || '';
    const team = card.dataset.team || '';
    const period = card.dataset.period || '';
    const publications = card.dataset.publications || '';

    modalProjectTitle.textContent = title;
    modalProjectDescription.textContent = description;

    renderLines(modalProjectLocation, location);
    renderTeam(modalProjectTeam, team);
    renderLines(modalProjectPeriod, period);

    modalProjectActions.innerHTML = '';

    if (publications) {
      const publicationsButton = document.createElement('a');
      publicationsButton.href = publications;
      publicationsButton.className = 'button primary';
      publicationsButton.textContent = 'Ver publicaciones';
      modalProjectActions.appendChild(publicationsButton);
    }

    projectModal.classList.add('is-open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const closeProjectModal = () => {
    projectModal.classList.remove('is-open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  projectCards.forEach((card) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');

    card.addEventListener('click', () => openProjectModal(card));

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProjectModal(card);
      }
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener('click', closeProjectModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && projectModal.classList.contains('is-open')) {
      closeProjectModal();
    }
  });
}

const eventModal = document.getElementById('eventModal');
const modalEventTitle = document.getElementById('modalEventTitle');
const modalEventDescription = document.getElementById('modalEventDescription');
const modalEventEditions = document.getElementById('modalEventEditions');
const eventCards = document.querySelectorAll('.event-card');
const closeEventModalButtons = document.querySelectorAll('[data-close-event-modal]');

if (
  eventModal &&
  modalEventTitle &&
  modalEventDescription &&
  modalEventEditions &&
  eventCards.length
) {
  const events = {
    wkmit: {
      title: 'International Workshop on Knowledge Management, Innovation and Technologies',
      description: 'WKMIT es un workshop internacional organizado por GEMIS sobre gestión del conocimiento, innovación y tecnologías, colocalizado con ICAI.',
      editions: [
        ['WKMIT 2026', 'Octubre 2026', 'Universidad Central de Florida - USA', 'https://grupogemis.com.ar/icai/wkmit/2026/'],
        ['WKMIT 2025', 'Octubre 2025', 'Université Mohammed VI Polytechnic - Marruecos', 'https://grupogemis.com.ar/icai/wkmit/2025/'],
        ['WKMIT 2024', 'Octubre 2024', 'Universidad Andrés Bello - Viña del Mar, Chile', 'https://grupogemis.com.ar/icai/wkmit/2024/'],
        ['WKMIT 2023', 'Octubre 2023', 'Universidad Ecotec - Guayaquil, Ecuador', 'https://grupogemis.com.ar/icai/wkmit/2023/'],
        ['WKMIT 2022', 'Octubre 2022', 'Universidad Continental - Arequipa, Perú', 'https://grupogemis.com.ar/icai/wkmit/2022/'],
        ['WKMIT 2021', 'Octubre 2021', 'Universidad Tecnológica Nacional - Buenos Aires, Argentina', 'https://grupogemis.com.ar/icai/wkmit/2021/']
      ]
    },
    waai: {
      title: 'International Workshop on Applied Artificial Intelligence',
      description: 'WAAI es un workshop internacional organizado por GEMIS para reunir investigaciones, aplicaciones y experiencias en inteligencia artificial aplicada.',
      editions: [
        ['WAAI 2026', 'Octubre 2026', 'Universidad Central de Florida - USA', 'https://grupogemis.com.ar/icai/waai/2026/'],
        ['WAAI 2025', 'Octubre 2025', 'Université Mohammed VI Polytechnic - Marruecos', 'https://grupogemis.com.ar/icai/waai/2025/'],
        ['WAAI 2024', 'Octubre 2024', 'Universidad Andrés Bello - Viña del Mar, Chile', 'https://grupogemis.com.ar/icai/waai/2024/'],
        ['WAAI 2023', 'Octubre 2023', 'Universidad Ecotec - Guayaquil, Ecuador', 'https://grupogemis.com.ar/icai/waai/2023/'],
        ['WAAI 2022', 'Octubre 2022', 'Universidad Continental - Arequipa, Perú', 'https://grupogemis.com.ar/icai/waai/2022/'],
        ['WAAI 2021', 'Octubre 2021', 'Universidad Tecnológica Nacional - Buenos Aires, Argentina', 'https://grupogemis.com.ar/icai/waai/2021/']
      ]
    }
  };

  const renderEventEditions = (editions) => {
    modalEventEditions.innerHTML = '';

    editions.forEach(([title, date, venue, url]) => {
      const item = document.createElement('article');
      item.className = 'event-edition';

      const heading = document.createElement('h3');
      heading.textContent = title;

      const meta = document.createElement('p');
      meta.textContent = `${date} · ${venue}`;

      const link = document.createElement('a');
      link.className = 'button ghost';
      link.href = url;
      link.textContent = 'Ir al sitio web (Internet)';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';

      item.appendChild(heading);
      item.appendChild(meta);
      item.appendChild(link);
      modalEventEditions.appendChild(item);
    });
  };

  const openEventModal = (card) => {
    const event = events[card.dataset.event];
    if (!event) return;

    modalEventTitle.textContent = event.title;
    modalEventDescription.textContent = event.description;
    renderEventEditions(event.editions);

    eventModal.classList.add('is-open');
    eventModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const closeEventModal = () => {
    eventModal.classList.remove('is-open');
    eventModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  eventCards.forEach((card) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');

    card.addEventListener('click', () => openEventModal(card));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openEventModal(card);
      }
    });
  });

  closeEventModalButtons.forEach((button) => {
    button.addEventListener('click', closeEventModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && eventModal.classList.contains('is-open')) {
      closeEventModal();
    }
  });
}

//PAPERS: Actualizable por json
const papersKnowledgeManagement = document.getElementById('papers-knowledge-management');
const papersArtificialIntelligence = document.getElementById('papers-artificial-intelligence');
const papersEducationTics = document.getElementById('papers-education-tics');

const paperModal = document.getElementById('paperModal');
const modalPaperTitle = document.getElementById('modalPaperTitle');
const modalPaperDescription = document.getElementById('modalPaperDescription');
const modalPaperCitation = document.getElementById('modalPaperCitation');
const modalPaperActions = document.getElementById('modalPaperActions');
const closePaperModalButtons = document.querySelectorAll('[data-close-paper-modal]');

if (
  papersKnowledgeManagement &&
  papersArtificialIntelligence &&
  papersEducationTics &&
  paperModal &&
  modalPaperTitle &&
  modalPaperDescription &&
  modalPaperCitation &&
  modalPaperActions
) {
  const paperContainers = {
    'knowledge-management': papersKnowledgeManagement,
    'artificial-intelligence': papersArtificialIntelligence,
    'education-tics': papersEducationTics
  };

  const getPaperCategoryFromHash = () => {
    return decodeURIComponent(window.location.hash.replace('#', '')).trim();
  };

  const openPaperCategoryFromHash = (shouldScroll = false) => {
    const category = getPaperCategoryFromHash();
    const container = paperContainers[category];
    if (!container) return;

    const section = document.getElementById(category);
    const details = section ? section.querySelector('.details-block') : null;
    if (!details) return;

    details.open = true;
    section.querySelectorAll('[data-reveal]').forEach((item) => {
      item.classList.add('is-visible');
    });

    if (shouldScroll) {
      window.requestAnimationFrame(() => {
        section.scrollIntoView({ behavior: 'auto', block: 'start' });
      });
    }
  };

  const renderPaperLines = (container, value) => {
    container.innerHTML = '';

    const lines = (value || '')
      .split('|')
      .map((item) => item.trim())
      .filter(Boolean);

    lines.forEach((line) => {
      const row = document.createElement('div');
      row.textContent = line;
      container.appendChild(row);
    });
  };

  const openPaperModal = (paper) => {
    modalPaperTitle.textContent = paper.title || '';
    modalPaperDescription.textContent = paper.summary || paper.description || '';
    renderPaperLines(modalPaperCitation, paper.citation || '');

    modalPaperActions.innerHTML = '';

    if (paper.pdf) {
      const pdfButton = document.createElement('a');
      pdfButton.href = paper.pdf;
      pdfButton.className = 'button primary';
      pdfButton.textContent = 'Acceder a la publicación (Internet)';
      pdfButton.target = '_blank';
      pdfButton.rel = 'noopener noreferrer';
      modalPaperActions.appendChild(pdfButton);
    }

    paperModal.classList.add('is-open');
    paperModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const closePaperModal = () => {
    paperModal.classList.remove('is-open');
    paperModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  const createPaperCard = (paper) => {
    const article = document.createElement('article');
    article.className = 'paper-item';
    article.setAttribute('tabindex', '0');
    article.setAttribute('role', 'button');

    const title = document.createElement('h3');
    title.textContent = paper.title || '';

    const description = document.createElement('p');
    description.textContent = paper.description || '';

    article.appendChild(title);
    article.appendChild(description);

    article.addEventListener('click', () => openPaperModal(paper));
    article.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openPaperModal(paper);
      }
    });

    return article;
  };

  const renderPaperCards = (papers) => {
    Object.values(paperContainers).forEach((container) => {
      container.innerHTML = '';
    });

    papers.forEach((paper) => {
      const container = paperContainers[paper.category];
      if (!container) return;

      container.appendChild(createPaperCard(paper));
    });
  };

  localDataResponse('papers')
    .then((response) => {
      if (!response.ok) {
        throw new Error('No se pudo cargar papers.json');
      }
      return response.json();
    })
    .then((papers) => {
      renderPaperCards(papers);

      openPaperCategoryFromHash(true);
      window.setTimeout(() => openPaperCategoryFromHash(true), 80);
    })
    .catch((error) => {
      console.error('Error cargando papers:', error);
    });

  openPaperCategoryFromHash();
  window.addEventListener('hashchange', () => openPaperCategoryFromHash(true));

  closePaperModalButtons.forEach((button) => {
    button.addEventListener('click', closePaperModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && paperModal.classList.contains('is-open')) {
      closePaperModal();
    }
  });
}

// TRANSFERENCIA TECNOLOGICA: Actualizable por json
const technologyTransferList = document.getElementById('technology-transfer-list');
const transferModal = document.getElementById('transferModal');
const modalTransferTitle = document.getElementById('modalTransferTitle');
const modalTransferDescription = document.getElementById('modalTransferDescription');
const modalTransferMeta = document.getElementById('modalTransferMeta');
const modalTransferDetails = document.getElementById('modalTransferDetails');
const modalTransferPublications = document.getElementById('modalTransferPublications');
const modalTransferPublicationsSection = document.getElementById('modalTransferPublicationsSection');
const modalTransferActions = document.getElementById('modalTransferActions');
const closeTransferModalButtons = document.querySelectorAll('[data-close-transfer-modal]');

if (
  technologyTransferList &&
  transferModal &&
  modalTransferTitle &&
  modalTransferDescription &&
  modalTransferMeta &&
  modalTransferDetails &&
  modalTransferPublications &&
  modalTransferPublicationsSection &&
  modalTransferActions
) {
  const renderTransferLines = (container, lines) => {
    container.innerHTML = '';

    (lines || [])
      .map((item) => String(item || '').trim())
      .filter(Boolean)
      .forEach((line) => {
        const row = document.createElement('div');
        row.textContent = line;
        container.appendChild(row);
      });
  };

  const renderTransferPublications = (publications) => {
    modalTransferPublications.innerHTML = '';

    const items = publications || [];
    modalTransferPublicationsSection.hidden = items.length === 0;

    items.forEach((publication) => {
      const item = document.createElement('li');
      item.textContent = publication;
      modalTransferPublications.appendChild(item);
    });
  };

  const openTransferModal = (item) => {
    modalTransferTitle.textContent = item.title || '';
    modalTransferDescription.textContent = item.description || '';

    renderTransferLines(modalTransferMeta, [
      item.organization ? `Organización: ${item.organization}` : '',
      item.period ? `Período: ${item.period}` : ''
    ]);

    renderTransferLines(modalTransferDetails, [item.details || '']);
    renderTransferPublications(item.publications);

    modalTransferActions.innerHTML = '';

    if (item.sourceUrl) {
      const sourceButton = document.createElement('a');
      sourceButton.href = item.sourceUrl;
      sourceButton.className = 'button primary';
      sourceButton.textContent = 'Ver fuente original (Internet)';
      sourceButton.target = '_blank';
      sourceButton.rel = 'noopener';
      modalTransferActions.appendChild(sourceButton);
    }

    transferModal.classList.add('is-open');
    transferModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const closeTransferModal = () => {
    transferModal.classList.remove('is-open');
    transferModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  const createTransferCard = (item) => {
    const article = document.createElement('article');
    article.className = 'paper-item transfer-item';
    article.setAttribute('tabindex', '0');
    article.setAttribute('role', 'button');
    article.setAttribute('aria-label', `Ver detalle de ${item.title || 'transferencia tecnológica'}`);

    if (item.image) {
      const media = document.createElement('figure');
      media.className = 'transfer-media';

      const image = document.createElement('img');
      image.src = item.image;
      image.alt = item.imageAlt || '';
      image.width = 1600;
      image.height = 1067;
      image.loading = 'lazy';
      image.decoding = 'async';
      applyImageFallback(image);

      media.appendChild(image);
      article.appendChild(media);
    }

    const content = document.createElement('div');
    content.className = 'transfer-content';

    const title = document.createElement('h3');
    title.textContent = item.title || '';

    const description = document.createElement('p');
    description.textContent = item.description || '';

    const meta = document.createElement('span');
    meta.className = 'transfer-meta';
    meta.textContent = [item.organization, item.period].filter(Boolean).join(' · ');

    content.appendChild(title);
    content.appendChild(description);
    if (meta.textContent) {
      content.appendChild(meta);
    }
    article.appendChild(content);

    article.addEventListener('click', () => openTransferModal(item));
    article.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openTransferModal(item);
      }
    });

    return article;
  };

  localDataResponse('technology-transfer')
    .then((response) => {
      if (!response.ok) {
        throw new Error('No se pudo cargar technology-transfer.json');
      }
      return response.json();
    })
    .then((items) => {
      technologyTransferList.innerHTML = '';

      items.forEach((item) => {
        technologyTransferList.appendChild(createTransferCard(item));
      });
    })
    .catch((error) => {
      console.error('Error cargando transferencia tecnologica:', error);
    });

  closeTransferModalButtons.forEach((button) => {
    button.addEventListener('click', closeTransferModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && transferModal.classList.contains('is-open')) {
      closeTransferModal();
    }
  });
}

const teamDirectoryGrid = document.getElementById('teamDirectoryGrid');

if (teamDirectoryGrid) {
  const formerList = document.getElementById('teamDirectoryFormer');
  const formerPrevious = document.getElementById('teamDirectoryFormerPrevious');
  const formerNext = document.getElementById('teamDirectoryFormerNext');
  const modal = document.getElementById('teamDirectoryModal');
  const modalPhoto = document.getElementById('teamDirectoryModalPhoto');
  const modalName = document.getElementById('teamDirectoryModalName');
  const modalGroupRole = document.getElementById('teamDirectoryModalProfileLabel');
  const modalDescription = document.getElementById('teamDirectoryModalDescription');
  const modalActions = document.getElementById('teamDirectoryModalActions');
  const modalDialog = modal?.querySelector('[role="dialog"]');
  const modalCloseButton = modal?.querySelector('button[data-close-team-directory-modal]');
  const modalScrollArea = modal?.querySelector('.team-modal-layout');
  let modalTrigger = null;

  const normalizeValue = (value) => String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  const asList = (value) => {
    if (Array.isArray(value)) return value.filter(Boolean).map(String);
    return value ? [String(value)] : [];
  };

  const addUnique = (target, values) => {
    const existing = new Set(target.map(normalizeValue));
    values.forEach((value) => {
      const key = normalizeValue(value);
      if (key && !existing.has(key)) {
        target.push(value);
        existing.add(key);
      }
    });
  };

  const getGroupRole = (member) => typeof member.groupRole === 'string' ? member.groupRole.trim() : '';

  const normalizeMembers = (data) => {
    const categories = [
      ['investigators', 'Investigación', 'Investigador/a'],
      ['thesisResearchers', 'Investigación', 'Tesista'],
      ['researchersInTraining', 'Investigación', 'Investigador/a en formación']
    ];
    const membersByName = new Map();

    categories.forEach(([key, defaultSector, defaultTitle]) => {
      (data?.current?.[key] || []).forEach((source) => {
        const memberKey = normalizeValue(source.name);
        if (!memberKey) return;

        if (!membersByName.has(memberKey)) {
          membersByName.set(memberKey, { ...source, titles: [], sectors: [], groups: [] });
        }

        const member = membersByName.get(memberKey);
        if (source.leader === true) member.leader = true;
        if (!getGroupRole(member) && getGroupRole(source)) member.groupRole = getGroupRole(source);
        const titles = [...asList(source.titles), ...asList(source.role || defaultTitle)];
        const sectors = [...asList(source.sectors), ...asList(source.sector || defaultSector)];
        addUnique(member.titles, titles);
        addUnique(member.sectors, sectors);
        addUnique(member.groups, [key]);

        if ((source.description || '').length > (member.description || '').length) member.description = source.description;
        ['image', 'initials', 'linkedin', 'orcid', 'scholar', 'academicTitle', 'displayFirstName', 'displayLastName'].forEach((property) => {
          if (!member[property] && source[property]) member[property] = source[property];
        });
      });
    });

    return Array.from(membersByName.values());
  };

  const createAvatar = (member, large = false) => {
    const avatar = document.createElement('div');
    avatar.className = `avatar${large ? ' avatar-large' : ''}`;
    const initials = document.createElement('span');
    initials.textContent = member.initials || '';
    avatar.appendChild(initials);

    if (member.image) {
      const image = document.createElement('img');
      image.src = member.image;
      image.alt = member.name || '';
      image.loading = 'lazy';
      image.addEventListener('error', () => image.remove(), { once: true });
      avatar.appendChild(image);
    }

    return avatar;
  };

  const profileLinks = [
    ['linkedin', 'LinkedIn', 'team-social-linkedin', 'in'],
    ['orcid', 'ORCID', 'team-social-orcid', 'iD'],
    ['scholar', 'Google Scholar', 'team-social-scholar', 'G']
  ];

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    modalTrigger?.focus();
  };

  const openModal = (member, trigger) => {
    if (!modal || !modalPhoto || !modalName || !modalGroupRole || !modalDescription || !modalActions) return;
    modalTrigger = trigger;
    modalPhoto.innerHTML = '';
    modal.classList.remove('team-modal-no-photo');
    modalPhoto.appendChild(createAvatar(member, true));
    modalName.textContent = [member.academicTitle, member.name].filter(Boolean).join(' ');
    modalGroupRole.textContent = getGroupRole(member) || 'Investigador';
    modalDescription.textContent = member.description || 'Información en actualización.';
    modalActions.innerHTML = '';

    profileLinks.forEach(([key, label, className, mark]) => {
      if (!member[key]) return;
      const link = document.createElement('a');
      link.className = `button team-social-link ${className}`;
      link.href = member[key];
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.title = label;
      link.setAttribute('aria-label', `${label} de ${member.name}`);
      const hasOfficialIcon = key === 'linkedin' || key === 'orcid';
      const icon = document.createElement(hasOfficialIcon ? 'img' : 'span');
      if (hasOfficialIcon) {
        icon.src = key === 'linkedin' ? 'assets/img/linkedin-official.png' : 'assets/img/orcid-official.svg';
        icon.alt = '';
        icon.width = key === 'linkedin' ? 635 : 256;
        icon.height = key === 'linkedin' ? 540 : 256;
        icon.setAttribute('aria-hidden', 'true');
        icon.addEventListener('error', () => { link.textContent = '↗'; }, { once: true });
      } else {
        icon.textContent = mark;
      }
      link.appendChild(icon);
      modalActions.appendChild(link);
    });

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    if (modalScrollArea) modalScrollArea.scrollTop = 0;
    modalCloseButton?.focus({ preventScroll: true });
  };

  const compoundFirstNameLengths = new Map([
    ['patricia raquel cristaldo', 2],
    ['lautaro ignacio ferrer', 2],
    ['maria de los angeles chiang', 4],
    ['maria eugenia ansalas', 2],
    ['juan ignacio sole gagliano', 2],
    ['bruno esteban jaime', 2],
    ['cecilia andrea ramacciotti', 2],
    ['diego hernan feresin', 2],
    ['federico ilan maleh', 2],
    ['flor angela lisseth soto pascacio', 3],
    ['gerardo luis santoriello', 2],
    ['giovanni daian rottoli', 2],
    ['jesus ivan farfan quispe', 2],
    ['juan cruz gonzalez allonca', 2],
    ['juan francisco paoli', 2],
    ['julieta rocio prado walsh', 2],
    ['lautaro agustin melchiori callegher', 2],
    ['maria g. bongiorno', 2],
    ['maria isabella innocente', 2],
    ['mariel liliana ojeda', 2],
    ['matias ignacio almad', 2],
    ['maximiliano ezequiel afonso', 2],
    ['natalia graciela gimenez pizzio', 2],
    ['osvaldo german fernandez', 2],
    ['patricia a. gerlero', 2]
  ]);

  const getMemberNameParts = (member) => {
    if (member.displayFirstName || member.displayLastName) {
      return {
        firstName: member.displayFirstName || '',
        lastName: member.displayLastName || ''
      };
    }

    const parts = String(member.name || '').trim().split(/\s+/).filter(Boolean);
    const firstNameLength = compoundFirstNameLengths.get(normalizeValue(member.name)) || 1;
    return {
      firstName: parts.slice(0, firstNameLength).join(' '),
      lastName: parts.slice(firstNameLength).join(' ')
    };
  };

  const createMemberCard = (member, opensProfile) => {
    const article = document.createElement('article');
    article.className = `team-directory-card${member.leader === true ? ' team-directory-card-leader' : ' team-directory-card-member'}${member.accompanying === true ? ' team-directory-card-accompanying' : ''}${opensProfile ? '' : ' team-directory-card-static'}`;
    article.setAttribute('data-member-name', member.name || '');
    if (opensProfile) {
      article.tabIndex = 0;
      article.setAttribute('role', 'button');
      article.setAttribute('aria-label', `Ver perfil de ${member.name}`);
    }
    const name = document.createElement('h2');
    const memberName = getMemberNameParts(member);
    const firstName = document.createElement('span');
    firstName.className = 'team-directory-first-name';
    firstName.textContent = [member.academicTitle, memberName.firstName].filter(Boolean).join(' ');
    name.appendChild(firstName);

    const lastName = document.createElement('span');
    lastName.className = 'team-directory-last-name';
    lastName.textContent = memberName.lastName;
    name.appendChild(lastName);

    if (Math.max(firstName.textContent.length, lastName.textContent.length) > 18) {
      article.classList.add('team-directory-card-long-name');
    }

    if (member.accompanying !== true) {
      article.appendChild(createAvatar(member));
    }
    article.appendChild(name);
    if (opensProfile) {
      article.addEventListener('click', () => openModal(member, article));
      article.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openModal(member, article);
        }
      });
    }
    return article;
  };

  const getAcademicTitleOrder = (member) => {
    const title = normalizeValue(member.academicTitle).replace(/\./g, '');
    if (title === 'dr' || title === 'dra') return 0;
    if (title === 'mg') return 1;
    if (title === 'esp') return 2;
    if (title === 'ing') return 3;
    if (title === 'lic') return 4;
    return 5;
  };

  const formerPageSize = 5;
  let formerMembers = [];
  let formerStart = 0;
  const formerAcademicTitles = new Map([
    ['patricia a. gerlero', 'Mg.'], ['agustin sabelli', 'Mg.'], ['gerardo luis santoriello', 'Mg.'],
    ['adriana maulini buno', 'Mg.'], ['martha orozco', 'Mg.'], ['gabriela velazquez', 'Mg.'],
    ['juan cruz gonzalez allonca', 'Mg.'], ['ana keravenant', 'Mg.'], ['pablo cigliuti', 'Mg.'],
    ['leonardo montesano', 'Mg.'], ['dario rodriguez', 'Dr.'], ['mariel liliana ojeda', 'Esp.'],
    ['salvador soto', 'Esp.'], ['yamila zakhem', 'Esp.'], ['fernando petrone', 'Esp.'],
    ['julio villagarcia', 'Esp.'], ['daniel wilson', 'Esp.'], ['jesus ivan farfan quispe', 'Esp.'],
    ['carolina nieto claros', 'Esp.'], ['sebastian lopreto', 'Esp.'], ['rodrigo pampin', 'Esp.'],
    ['eduardo iberti', 'Esp.'], ['noemi medina', 'Esp.'], ['diana carolina ariza marin', 'Esp.']
    ,['juan francisco paoli', 'Ing.'], ['milena lebedinsky', 'Ing.'], ['julieta rocio prado walsh', 'Ing.']
    ,['maximiliano ezequiel afonso', 'Ing.'], ['mauricio rozo rodriguez', 'Mg.'], ['cecilia andrea ramacciotti', 'Ing.']
    ,['luciano panizza', 'Ing.'], ['sebastian plawner', 'Ing.'], ['jonathan castro', 'Ing.']
    ,['luciano bernal tomadoni', 'Ing.'], ['giovanni daian rottoli', 'Dr.'], ['nicolas raus', 'Ing.']
    ,['facundo lujan', 'Ing.'], ['maximiliano tomasello', 'Ing.'], ['ariel bachetti', 'Ing.']
    ,['nicolas corrizo', 'Lic.'], ['javier goilenberg', 'Ing.'], ['alex soler trias', 'Ing.']
    ,['juan cristian miguel', 'Esp.'], ['brayan julian barbosa sierra', 'Esp.'], ['juana noemi acosta llugdar', 'Esp.']
    ,['florencia nahir sanchez', 'Esp.'], ['diego basso', 'Mg.']
  ]);

  const renderFormer = (members) => {
    if (!formerList) return;
    const currentNames = new Set(normalizeMembers(teamDirectoryData).map((member) => normalizeValue(member.name)));
    const formerNames = new Set();
    formerMembers = (members || [])
      .filter((member) => {
        const name = normalizeValue(member.name);
        const role = normalizeValue(member.role);
        const shouldInclude = !currentNames.has(name)
          && !formerNames.has(name)
          && role !== 'proyecto final de grado'
          && role !== 'pps';
        if (shouldInclude) formerNames.add(name);
        return shouldInclude;
      })
      .sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), 'es', { sensitivity: 'base' }));

    formerStart = 0;
    renderFormerPage();
  };

  const renderFormerPage = (direction = '') => {
    if (!formerList) return;
    formerList.innerHTML = '';
    formerList.classList.remove('is-sliding-next', 'is-sliding-previous');
    const visibleMembers = formerMembers.slice(formerStart, formerStart + formerPageSize);
    visibleMembers.forEach((member) => {
      const item = document.createElement('li');
      item.className = 'member-item';
      const name = document.createElement('h3');
      const memberName = getMemberNameParts(member);
      const academicTitle = member.academicTitle || formerAcademicTitles.get(normalizeValue(member.name)) || '';
      name.setAttribute('aria-label', [academicTitle, member.name].filter(Boolean).join(' '));
      if (Math.max(memberName.firstName.length, memberName.lastName.length) > 18) name.classList.add('team-former-name-long');
      if (academicTitle) {
        const title = document.createElement('span');
        title.className = 'team-former-academic-title';
        title.textContent = academicTitle;
        name.appendChild(title);
      }
      const firstName = document.createElement('span');
      firstName.className = 'team-former-first-name';
      firstName.textContent = memberName.firstName;
      const lastName = document.createElement('span');
      lastName.className = 'team-former-last-name';
      lastName.textContent = memberName.lastName;
      name.appendChild(firstName);
      name.appendChild(lastName);
      item.appendChild(name);
      formerList.appendChild(item);
    });

    if (direction) {
      void formerList.offsetWidth;
      formerList.classList.add(`is-sliding-${direction}`);
    }

    const visibleEnd = Math.min(formerStart + formerPageSize, formerMembers.length);
    if (formerPrevious) formerPrevious.disabled = formerStart === 0;
    if (formerNext) formerNext.disabled = visibleEnd >= formerMembers.length;
  };

  formerPrevious?.addEventListener('click', () => {
    formerStart = Math.max(0, formerStart - formerPageSize);
    renderFormerPage('previous');
  });

  formerNext?.addEventListener('click', () => {
    formerStart += formerPageSize;
    renderFormerPage('next');
  });

  let teamDirectoryData = {};

  localDataResponse('team')
    .then((response) => {
      if (!response.ok) throw new Error('No se pudo cargar team.json');
      return response.json();
    })
    .then((data) => {
      teamDirectoryData = data;
      const members = normalizeMembers(data);
      renderFormer(data.former || []);

      const render = () => {
        teamDirectoryGrid.innerHTML = '';
        const isAccompanying = (member) => member.accompanying === true;
        const groups = [
          ['Dirección', (member) => member.leader === true, true],
          ['Equipo', (member) => member.leader !== true && !isAccompanying(member), true],
          ['Profesionales colaboradores', (member) => member.leader !== true && isAccompanying(member), false]
        ];

        groups.forEach(([label, belongsToGroup, opensProfile]) => {
          const groupMembers = members
            .filter(belongsToGroup)
            .sort((a, b) => {
              if (label === 'Equipo') {
                const titleDifference = getAcademicTitleOrder(a) - getAcademicTitleOrder(b);
                if (titleDifference) return titleDifference;
                return String(a.name || '').localeCompare(String(b.name || ''), 'es', { sensitivity: 'base' });
              }
              const orderDifference = (a.displayOrder ?? Number.MAX_SAFE_INTEGER)
                - (b.displayOrder ?? Number.MAX_SAFE_INTEGER);
              return orderDifference || String(a.name || '').localeCompare(String(b.name || ''), 'es', { sensitivity: 'base' });
            });
          if (!groupMembers.length) return;
          const section = document.createElement('section');
          section.className = 'team-directory-category';
          const heading = document.createElement('h2');
          heading.className = 'team-category-title';
          heading.textContent = label;
          const grid = document.createElement('div');
          grid.className = 'team-directory-grid';
          groupMembers.forEach((member) => {
            const profileEnabled = opensProfile && member.modalEnabled !== false;
            grid.appendChild(createMemberCard(member, profileEnabled));
          });
          section.appendChild(heading);
          section.appendChild(grid);
          teamDirectoryGrid.appendChild(section);
        });
        if (!members.length) {
          const empty = document.createElement('p');
          empty.className = 'paper-search-empty team-directory-empty';
          empty.textContent = 'La información del equipo no está disponible en este momento.';
          teamDirectoryGrid.appendChild(empty);
        }
      };

      render();
    })
    .catch((error) => {
      console.error('Error cargando integrantes:', error);
      teamDirectoryGrid.innerHTML = '<p class="paper-search-empty team-directory-empty">No se pudo cargar el equipo.</p>';
    });

  modal?.querySelectorAll('[data-close-team-directory-modal]').forEach((button) => button.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => {
    if (!modal?.classList.contains('is-open')) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }
    if (event.key !== 'Tab' || !modalDialog) return;
    const focusable = Array.from(modalDialog.querySelectorAll('button:not([disabled]), a[href], [tabindex="0"]'));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first) return;
    const focusOutsideDialog = !modalDialog.contains(document.activeElement);
    if (event.shiftKey && (document.activeElement === first || focusOutsideDialog)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || focusOutsideDialog)) {
      event.preventDefault();
      first.focus();
    }
  });
}


// Identify external destinations, including those created inside profile dialogs.
function markOnlineLinks(root) {
  root.querySelectorAll('a[href^="https://"], a[href^="http://"]').forEach((link) => {
    if (link.dataset.online) return;
    link.dataset.online = 'true';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.title = (link.title || link.getAttribute('aria-label') || link.textContent.trim() || 'Enlace externo') + ' · Requiere conexión a Internet';
    if (link.hasAttribute('aria-label')) link.setAttribute('aria-label', link.getAttribute('aria-label') + ' · Requiere conexión a Internet');
  });
}
markOnlineLinks(document);
new MutationObserver(() => markOnlineLinks(document)).observe(document.body, {childList:true, subtree:true});
if (logo?.complete && logo.naturalWidth > 0) brand?.classList.add('has-logo');
