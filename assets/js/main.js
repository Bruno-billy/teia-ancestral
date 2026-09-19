document.addEventListener('DOMContentLoaded', () => {
  // --- Preloader ---
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    });
  }

  // --- Header com Efeito de Scroll (Exibir/Ocultar Header) ---
  const siteHeader = document.querySelector('[data-header]');
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        siteHeader.classList.add('is-scrolled');
      } else {
        siteHeader.classList.remove('is-scrolled');
      }
    });
  }

  // --- Menu Mobile (Sincronizado com a classe .is-open do CSS) ---
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const siteNav = document.querySelector('[data-nav]');
  
  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      siteNav.classList.toggle('is-open');
      document.body.classList.toggle('menu-open');
    });

    // Fechar menu ao clicar num link
    const navLinks = siteNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        siteNav.classList.remove('is-open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // --- Atualizar Ano no Rodapé ---
  const yearSpan = document.querySelector('[data-year]');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- Animações de Scroll (Reveal) ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // --- Botão Voltar ao Topo ---
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    });
  }

  // --- Lógica do Modal de Serviços (WhatsApp Dinâmico e Acessibilidade) ---
  const modal = document.getElementById('service-modal');
  const openModalBtns = document.querySelectorAll('.btn-modal');
  const closeModalBtn = document.querySelector('.modal-close');
  
  if (modal && openModalBtns.length > 0) {
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalPrice = document.getElementById('modal-price');
    const modalImg = document.getElementById('modal-img');
    const modalBook = document.getElementById('modal-book');
    
    let elementoFocadoAnteriormente; // Guarda o botão que abriu o modal

    // Função para abrir o modal
    openModalBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Guarda quem abriu para devolver o foco depois
        elementoFocadoAnteriormente = document.activeElement;

        // Puxa os dados do HTML
        const title = btn.getAttribute('data-title');
        const desc = btn.getAttribute('data-desc');
        const price = btn.getAttribute('data-price');
        const imgSrc = btn.getAttribute('data-img');

        // Preenche o modal
        modalTitle.textContent = title;
        
        // Formata a descrição quebrando as linhas onde há ponto e vírgula
        modalDesc.innerHTML = desc.replace(/;/g, '.<br><br>'); 
        
        modalPrice.textContent = price;
        modalImg.src = imgSrc;
        modalImg.alt = title;

        // Formata a mensagem do WhatsApp dinamicamente para o botão de dentro da modal
        const numeroZap = "5511960930659";
        const msgZap = `Olá, Daiana. Li os detalhes no site e tenho interesse em ${title}. Pode me passar mais informações?`;
        modalBook.href = `https://wa.me/${numeroZap}?text=${encodeURIComponent(msgZap)}`;
        
        // Garante que o link do modal abre em nova janela
        modalBook.target = "_blank";
        modalBook.rel = "noopener noreferrer";

        // Exibe o modal utilizando a classe .is-open
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('menu-open');

        // Foco na janela para leitores de tela
        setTimeout(() => {
          if(closeModalBtn) closeModalBtn.focus();
        }, 100);
      });
    });

    // Função para fechar o modal
    const fecharModal = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
      
      // Devolve o foco ao botão original (Acessibilidade)
      if (elementoFocadoAnteriormente) {
        elementoFocadoAnteriormente.focus();
      }
    };

    // Eventos de fechamento
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', fecharModal);
    }

    // Fechar ao clicar fora do modal (no overlay escuro)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        fecharModal();
      }
    });

    // Fechar com a tecla ESC (Acessibilidade)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
        fecharModal();
      }
    });
  }
});