import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleHelp,
  Image,
  Layers3,
  Menu,
  MessageSquareText,
  MousePointer2,
  Plus,
  Search,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { faqs, modelCategories, models, plans, useCases } from "./data";

const navLinks = [
  ["Início", "#inicio"],
  ["Inteligências", "#inteligencias"],
  ["Recursos", "#recursos"],
  ["Como funciona", "#como-funciona"],
  ["Planos", "#planos"],
  ["FAQ", "#faq"],
];

const demoPrompts = [
  "Crie uma campanha de marketing",
  "Explique um conceito complexo",
  "Desenvolva uma ideia de negócio",
  "Crie um prompt para gerar imagens",
];

function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a className={`brand${footer ? " brand-footer" : ""}`} href="#inicio" aria-label="SelectAI — início">
      <img src={assetUrl("logos/logoselectIA.jpg")} alt="" />
      <span className="brand-wordmark">Select<span>AI</span></span>
    </a>
  );
}

function ModelIcon({ model, className = "" }: {
  model: (typeof models)[number];
  className?: string;
}) {
  return (
    <span className={`model-symbol model-image-symbol ${className}`} aria-hidden="true">
      <img src={assetUrl(model.icon)} alt="" loading="lazy" />
    </span>
  );
}

function SectionHeading({ eyebrow, title, description, centered = false }: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={`section-heading${centered ? " centered" : ""}`}>
      <span className="eyebrow"><i />{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function App() {
  const [category, setCategory] = useState<(typeof modelCategories)[number]>("Todas");
  const [selectedModel, setSelectedModel] = useState("ChatGPT");
  const [prompt, setPrompt] = useState("");
  const [demoResponse, setDemoResponse] = useState(false);
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [billing, setBilling] = useState<"Mensal" | "Anual">("Mensal");
  const [modal, setModal] = useState<"interest" | "signin" | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen && !modal) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setModal(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, modal]);

  const visibleModels = useMemo(
    () => category === "Todas" ? models : models.filter((model) => model.category === category),
    [category],
  );
  const selectedUseCase = useCases[activeUseCase];

  function submitDemo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!prompt.trim()) return;
    setDemoResponse(true);
  }

  function fillPrompt(value: string) {
    setPrompt(value);
    setDemoResponse(false);
    document.querySelector("#demonstracao")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navLinks.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <button className="button button-quiet sign-in" onClick={() => setModal("signin")}>Entrar <ArrowUpRight size={15} /></button>
            <a className="button button-small button-primary" href="#planos">Começar agora <ArrowRight size={15} /></a>
          </div>
          <button className="mobile-menu-toggle" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Navegação móvel">
            {navLinks.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={15} /></a>)}
            <button className="button button-primary" onClick={() => { setMenuOpen(false); setModal("signin"); }}>Entrar na plataforma <ArrowRight size={16} /></button>
          </nav>
        )}
      </header>

      <main>
        <section className="hero-section" id="inicio">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="status-pill"><span className="status-dot" /> Uma nova perspectiva sobre IA</div>
              <h1>Inteligência<br />em <span className="gradient-text">outra escala.</span></h1>
              <p className="hero-description">As melhores inteligências, em um só lugar. Uma nova forma de explorar ideias, criar possibilidades e trabalhar com IA.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#inteligencias">Conheça a SelectAI <ArrowRight size={17} /></a>
                <a className="button button-outline" href="#demonstracao"><span className="play-mark">▶</span> Ver demonstração</a>
              </div>
              <div className="hero-footnote"><span className="tiny-sparkle">✳</span> Uma experiência unificada para diferentes formas de criar.</div>
              <div className="hero-index"><span>01</span><span className="index-line" /><span>06</span><ArrowDown size={14} /></div>
            </div>

            <div className="hero-art" aria-label="Prévia visual do ambiente SelectAI">
              <div className="orb orb-one" /><div className="orb orb-two" />
              <div className="art-caption"><span>SELECTAI / WORKSPACE</span><span>CONCEITO · 2026</span></div>
              <div className="floating-chip chip-left"><ModelIcon model={models[0]} /><span>ChatGPT</span><i /></div>
              <div className="floating-chip chip-right"><ModelIcon model={models[1]} /><span>Claude</span><i /></div>
              <div className="product-window">
                <div className="window-topbar">
                  <div className="window-dots"><i /><i /><i /></div>
                  <span>selectai.app</span><span className="window-avatar">S</span>
                </div>
                <div className="window-layout">
                  <aside className="window-sidebar">
                    <div className="sidebar-mark"><img src={assetUrl("logos/logoselectIA.jpg")} alt="" /></div>
                    <button aria-label="Nova conversa"><Plus size={16} /></button>
                    <button aria-label="Conversas"><MessageSquareText size={16} /></button>
                    <button aria-label="Explorar"><Layers3 size={16} /></button>
                    <div className="sidebar-bottom"><CircleHelp size={15} /></div>
                  </aside>
                  <div className="window-content">
                    <div className="window-welcome"><span className="mini-eyebrow">SEU ESPAÇO CRIATIVO</span><h3>Por onde vamos<br /><span>começar?</span></h3><p>Uma ideia pode levar a qualquer lugar.</p></div>
                    <div className="window-prompt">
                      <p>Crie uma estratégia de marketing para minha empresa.</p>
                      <div className="prompt-bottom"><span><ModelIcon model={models[0]} /> ChatGPT <ChevronDown size={12} /></span><button aria-label="Enviar prompt"><ArrowUpRight size={15} /></button></div>
                    </div>
                    <div className="window-answer"><span className="answer-glow"><Sparkles size={14} /></span><div><span className="mini-eyebrow">PRÉVIA DE INTERFACE</span><p>Escolha a inteligência ideal para a sua tarefa e transforme sua ideia em um novo começo.</p></div></div>
                    <div className="window-suggestions"><span>IDEIAS PARA EXPLORAR</span><div><button>Escrever <ArrowUpRight size={11} /></button><button>Criar <ArrowUpRight size={11} /></button></div></div>
                  </div>
                </div>
                <div className="demo-stamp"><span className="stamp-dot" /> DEMONSTRAÇÃO VISUAL</div>
              </div>
              <div className="floating-chip chip-bottom"><ModelIcon model={models[2]} /><span>Gemini</span><i /></div>
              <div className="art-glint">✳</div>
              <div className="art-note"><span>UMA INTERFACE.</span><span>MUITAS POSSIBILIDADES.</span></div>
            </div>
          </div>
          <div className="hero-bottomline"><span>01 — 06</span><span>UMA NOVA GERAÇÃO DE EXPERIÊNCIAS COM IA</span><a href="#inteligencias">Explore o ecossistema <ArrowDownRight size={15} /></a></div>
        </section>

        <section className="models-section section-pad" id="inteligencias">
          <div className="section-topline"><span>01 / ECOSSISTEMA</span><span>UM UNIVERSO DE POSSIBILIDADES</span></div>
          <div className="models-intro">
            <SectionHeading eyebrow="O ECOSSISTEMA SELECTAI" title={<>Uma plataforma.<br /><span className="muted-heading">Muitas inteligências.</span></>} description="Explore diferentes modelos e encontre novas possibilidades para cada desafio." />
            <p className="section-aside">O catálogo abaixo representa modelos planejados. Disponibilidade e integrações serão confirmadas oficialmente.</p>
          </div>
          <div className="catalog-toolbar">
            <div><span className="eyebrow"><i /> MODELOS PLANEJADOS</span><span className="model-count">{visibleModels.length.toString().padStart(2, "0")} modelos</span></div>
            <div className="filter-list" role="group" aria-label="Filtrar modelos por categoria">
              {modelCategories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
          </div>
          <div className="catalog-art">
            <div className="catalog-art-image"><img src={assetUrl("logos/todasIAS.jpeg")} alt="Arte original com diferentes inteligências artificiais reunidas" loading="lazy" /></div>
            <div className="catalog-art-copy"><span className="mini-eyebrow">UM ECOSSISTEMA EM EXPANSÃO</span><h3>Várias perspectivas.<br /><em>Um só ponto de partida.</em></h3><p>Uma experiência pensada para aproximar diferentes formas de criar, pesquisar e resolver.</p><a href="#demonstracao" className="text-link">Explore a experiência <ArrowRight size={15} /></a></div>
            <div className="catalog-ornament">S / AI<br /><span>∞</span></div>
          </div>
          <div className="model-grid">
            {visibleModels.map((model, index) => (
              <article className="model-card" key={model.name} style={{ animationDelay: `${index * 35}ms` }}>
                <div className="model-card-top"><ModelIcon model={model} /><span className="model-availability">PLANEJADO</span></div>
                <h3>{model.name}</h3><p>{model.description}</p>
                <div className="model-card-bottom"><span>{model.category}</span><ArrowUpRight size={15} /></div>
              </article>
            ))}
          </div>
          <div className="catalog-footnote"><span>✳</span> Nomes e marcas pertencem aos seus respectivos titulares. A exibição não implica integração ativa ou endosso.</div>
        </section>

        <section className="manifesto-section section-pad" id="recursos">
          <div className="section-topline"><span>02 / UMA NOVA FORMA</span><span>MENOS FRAGMENTAÇÃO, MAIS FLUXO</span></div>
          <div className="manifesto-layout">
            <SectionHeading eyebrow="POR QUE SELECTAI" title={<>Menos troca.<br /><span className="muted-heading">Mais espaço para criar.</span></>} description="Uma nova maneira de explorar inteligência artificial, com clareza e liberdade para seguir suas ideias." />
            <div className="manifesto-aside"><span className="manifesto-symbol">S<span>✳</span></span><p>Um lugar para começar. Muitas direções para explorar.</p><a href="#como-funciona" className="text-link">Veja como funciona <ArrowRight size={15} /></a></div>
          </div>
          <div className="bento-grid">
            <article className="bento-card bento-large bento-one"><div className="bento-meta">01 — VISÃO UNIFICADA <ArrowUpRight size={16} /></div><h3>Diferentes caminhos.<br />Um só espaço.</h3><p>Uma experiência organizada para explorar diversas ferramentas sem perder o fio da ideia.</p><div className="orbit-visual"><div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" /><div className="orbit-core">S<span>✳</span></div><span className="orbit-tag tag-a">TEXTO</span><span className="orbit-tag tag-b">IDEIAS</span><span className="orbit-tag tag-c">VISUAL</span></div></article>
            <article className="bento-card bento-two"><div className="bento-meta">02 — ESCOLHA <ArrowUpRight size={16} /></div><div className="mini-choice"><ModelIcon model={models[0]} /><div><strong>ChatGPT</strong><small>Texto e raciocínio</small></div><Check size={15} /></div><div className="mini-choice"><ModelIcon model={models[1]} /><div><strong>Claude</strong><small>Escrita e análise</small></div><ArrowUpRight size={15} /></div><h3>Encontre sua<br />perspectiva.</h3><p>Conheça modelos planejados para diferentes tipos de tarefa.</p></article>
            <article className="bento-card bento-three"><div className="bento-meta">03 — CRIATIVIDADE <ArrowUpRight size={16} /></div><div className="creative-mark"><span>ideas</span><span>into</span><span className="gradient-text">anything<span className="creative-star">✳</span></span></div><p>Da primeira faísca a uma nova possibilidade.</p></article>
            <article className="bento-card bento-four"><div className="bento-meta">04 — FLUXO SIMPLES <ArrowUpRight size={16} /></div><div className="flow-lines"><span /><span /><span /><i /><i /><i /></div><h3>Uma jornada<br />mais intuitiva.</h3><p>Menos abas. Mais foco no que você quer fazer.</p></article>
            <article className="bento-card bento-five"><div className="bento-meta">05 — EM EVOLUÇÃO <ArrowUpRight size={16} /></div><div className="evolution-visual"><div /><div /><div /><ArrowUpRight size={19} /></div><h3>Preparada para<br />novas ideias.</h3><p>Uma estrutura pensada para crescer com novas possibilidades.</p></article>
          </div>
        </section>

        <section className="demo-section section-pad" id="demonstracao">
          <div className="section-topline"><span>03 / UM PRIMEIRO OLHAR</span><span>EXPERIÊNCIA DEMONSTRATIVA</span></div>
          <div className="demo-heading-row"><SectionHeading eyebrow="A PLATAFORMA POR DENTRO" title={<>Sua próxima ideia<br /><span className="muted-heading">começa aqui.</span></>} description="Uma interface. Diferentes inteligências. Novas possibilidades." /><div className="demo-notice"><span><Sparkles size={14} /></span><p>Prévia demonstrativa<br /><small>Sem conexão com modelos de IA</small></p></div></div>
          <div className="dashboard-shell">
            <aside className="dashboard-sidebar">
              <div className="dashboard-brand"><img src={assetUrl("logos/logoselectIA.jpg")} alt="" /><span>Select<span>AI</span></span></div>
              <button className="new-chat"><Plus size={16} /> Nova conversa</button>
              <div className="dash-nav-label">ESPAÇO DE TRABALHO</div>
              <button className="dash-nav active"><MessageSquareText size={15} /> Conversas recentes</button>
              <button className="dash-nav"><Layers3 size={15} /> Explorar modelos</button>
              <button className="dash-nav"><Image size={15} /> Criar imagem <span className="soon-tag">EM BREVE</span></button>
              <div className="recent-label">RECENTES <Search size={13} /></div>
              <a className="recent-item" href="#demonstracao"><span /> Ideias para uma marca</a><a className="recent-item" href="#demonstracao"><span /> Planejamento de conteúdo</a><a className="recent-item" href="#demonstracao"><span /> Rascunho de projeto</a>
              <div className="dashboard-user"><span className="user-avatar">S</span><span>Visitante<small>Prévia do produto</small></span><ChevronDown size={14} /></div>
            </aside>
            <div className="dashboard-main">
              <div className="dashboard-top"><div><span className="dash-crumb">Workspace</span><span className="crumb-slash">/</span><span>Nova conversa</span></div><span className="preview-badge"><i /> PRÉVIA DO PRODUTO</span></div>
              <div className="dashboard-body">
                <div className="dash-welcome"><span className="dash-sparkle"><Sparkles size={18} /></span><span className="mini-eyebrow">BOM TER VOCÊ AQUI</span><h3>O que vamos<br /><span>imaginar hoje?</span></h3><p>Escolha um modelo ou comece com uma ideia.</p></div>
                <div className="model-selector" aria-label="Escolha um modelo">
                  <span className="mini-eyebrow">ESCOLHA UMA INTELIGÊNCIA</span><div className="selector-list">
                    {models.slice(0, 4).map((model) => <button key={model.name} onClick={() => { setSelectedModel(model.name); setDemoResponse(false); }} className={selectedModel === model.name ? "selected" : ""}><ModelIcon model={model} /><span>{model.name}</span>{selectedModel === model.name && <Check size={13} />}</button>)}
                  </div>
                </div>
                {!demoResponse ? (
                  <div className="suggestion-row">{demoPrompts.map((item) => <button key={item} onClick={() => setPrompt(item)}>{item}<ArrowUpRight size={12} /></button>)}</div>
                ) : (
                  <div className="demo-answer"><span className="answer-label"><Sparkles size={13} /> RESPOSTA ESTÁTICA · EXEMPLO</span><p>Uma boa ideia começa entendendo seu público. Experimente explorar diferentes ângulos, definir uma mensagem clara e escolher o formato que melhor conta sua história.</p><span className="answer-model">Exemplo ilustrativo · {selectedModel}</span></div>
                )}
                <form className="demo-composer" onSubmit={submitDemo}><label className="visually-hidden" htmlFor="demo-prompt">Digite uma mensagem de demonstração</label><textarea id="demo-prompt" value={prompt} onChange={(event) => { setPrompt(event.target.value); setDemoResponse(false); }} placeholder="Compartilhe uma ideia para explorar..." rows={2} /><div className="composer-bottom"><div><button type="button" aria-label="Adicionar conteúdo"><Plus size={17} /></button><span className="composer-model"><span className="tiny-model-dot" /> {selectedModel} <ChevronDown size={12} /></span><span className="composer-demo-label">MODO DEMONSTRAÇÃO</span></div><button className="send-button" aria-label="Ver exemplo estático" type="submit"><Send size={15} /></button></div></form>
                <div className="dashboard-disclaimer">Esta demonstração usa respostas estáticas. Nenhuma solicitação é enviada a modelos de IA.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="steps-section section-pad" id="como-funciona">
          <div className="section-topline"><span>04 / SIMPLES DE COMEÇAR</span><span>UM PASSO DE CADA VEZ</span></div>
          <SectionHeading eyebrow="COMO FUNCIONA" title={<>Da curiosidade à criação.<br /><span className="muted-heading">No seu ritmo.</span></>} description="Uma jornada simples para descobrir novas formas de trabalhar com IA." />
          <div className="steps-grid">
            <article className="step-card"><span className="step-number">01</span><div className="step-icon"><MousePointer2 size={19} /></div><span className="mini-eyebrow">COMECE</span><h3>Entre no universo.</h3><p>Conheça a proposta e explore o que a SelectAI está preparando.</p><span className="step-bottom">UMA NOVA IDEIA COMEÇA AQUI <ArrowUpRight size={14} /></span></article>
            <article className="step-card"><span className="step-number">02</span><div className="step-icon"><Layers3 size={19} /></div><span className="mini-eyebrow">DESCUBRA</span><h3>Explore inteligências.</h3><p>Encontre modelos planejados para diferentes necessidades e tarefas.</p><span className="step-bottom">DIFERENTES FORMAS DE PENSAR <ArrowUpRight size={14} /></span></article>
            <article className="step-card"><span className="step-number">03</span><div className="step-icon"><Sparkles size={19} /></div><span className="mini-eyebrow">IMAGINE</span><h3>Transforme possibilidades.</h3><p>Uma experiência pensada para ajudar suas ideias a ganharem forma.</p><span className="step-bottom">SIGA A SUA CURIOSIDADE <ArrowUpRight size={14} /></span></article>
          </div>
          <div className="steps-disclaimer">As etapas representam a visão planejada para a plataforma, ainda em desenvolvimento.</div>
        </section>

        <section className="usecase-section section-pad" id="possibilidades">
          <div className="section-topline"><span>05 / IDEIAS EM MOVIMENTO</span><span>UMA PLATAFORMA, MUITOS CAMINHOS</span></div>
          <div className="usecase-layout">
            <div className="usecase-left"><SectionHeading eyebrow="POSSIBILIDADES DE USO" title={<>Uma ideia pode<br /><span className="muted-heading">mudar de forma.</span></>} description="Descubra como diferentes inteligências podem acompanhar diferentes momentos do seu processo." />
              <div className="usecase-tabs" role="tablist" aria-label="Possibilidades de uso">{useCases.map((item, index) => <button key={item.label} role="tab" aria-selected={activeUseCase === index} className={activeUseCase === index ? "active" : ""} onClick={() => setActiveUseCase(index)}><span>{item.icon}</span>{item.label}<ArrowUpRight size={14} /></button>)}</div>
            </div>
            <div className="usecase-panel" role="tabpanel" key={selectedUseCase.label}>
              <div className="usecase-panel-top"><span className="usecase-icon">{selectedUseCase.icon}</span><span className="mini-eyebrow">UM CAMINHO PARA EXPLORAR</span><span className="case-number">0{activeUseCase + 1} / 06</span></div>
              <h3>{selectedUseCase.title}</h3><p>{selectedUseCase.description}</p>
              <div className="case-prompt"><span>EXEMPLO DE IDEIA</span><button onClick={() => fillPrompt(selectedUseCase.prompt)}>{selectedUseCase.prompt}<ArrowUpRight size={14} /></button></div>
              <div className="case-visual"><div className="case-visual-lines"><span /><span /><span /></div><div className="case-visual-card"><Sparkles size={14} /><span>UMA IDEIA PODE COMEÇAR AQUI</span></div><div className="case-visual-caption">POSSIBILIDADES EM CONSTRUÇÃO <ArrowUpRight size={13} /></div></div>
            </div>
          </div>
        </section>

        <section className="compare-section section-pad">
          <div className="section-topline"><span>06 / UM FLUXO MAIS CLARO</span><span>UM NOVO JEITO DE EXPLORAR</span></div>
          <SectionHeading eyebrow="UMA EXPERIÊNCIA UNIFICADA" title={<>Menos abas abertas.<br /><span className="muted-heading">Mais ideias em movimento.</span></>} description="Um olhar sobre a diferença entre alternar ferramentas e imaginar uma experiência mais conectada." />
          <div className="compare-grid">
            <article className="compare-card traditional"><div className="compare-title"><span>01</span><h3>O fluxo fragmentado</h3><span className="compare-title-symbol">↗</span></div><div className="tab-stack"><span>✳ Assistente de texto <i>—</i></span><span>◈ Criador visual <i>—</i></span><span>▤ Pesquisa <i>—</i></span><span>⌘ Mais uma aba... <i>—</i></span></div><ul><li><X size={14} /> Diferentes interfaces</li><li><X size={14} /> Conversas em lugares distintos</li><li><X size={14} /> Troca constante de contexto</li></ul></article>
            <article className="compare-card unified"><div className="compare-title"><span>02</span><h3>A visão SelectAI</h3><span className="compare-title-symbol"><Sparkles size={17} /></span></div><div className="unified-visual"><div className="unified-logo"><img src={assetUrl("logos/logoselectIA.jpg")} alt="" /></div><span className="unified-chip chip-one">TEXTO</span><span className="unified-chip chip-two">IDEIAS</span><span className="unified-chip chip-three">VISUAL</span><div className="unified-ring" /></div><ul><li><Check size={14} /> Interface pensada para centralizar</li><li><Check size={14} /> Modelos organizados em um só lugar</li><li><Check size={14} /> Uma jornada mais conectada</li></ul><span className="planned-note">UMA PROPOSTA EM DESENVOLVIMENTO</span></article>
          </div>
          <p className="compare-disclaimer">A visão apresentada descreve a proposta da SelectAI e não representa funcionalidades já disponíveis.</p>
        </section>

        <section className="pricing-section section-pad" id="planos">
          <div className="section-topline"><span>07 / CAMINHOS À FRENTE</span><span>PLANOS EM DEFINIÇÃO</span></div>
          <div className="pricing-header"><SectionHeading eyebrow="PLANOS SELECTAI" title={<>O próximo passo,<br /><span className="muted-heading">no seu tempo.</span></>} description="Estamos desenhando formas de explorar a plataforma para diferentes necessidades." /><div className="billing-control" aria-label="Período demonstrativo">{(["Mensal", "Anual"] as const).map((period) => <button key={period} className={billing === period ? "active" : ""} onClick={() => setBilling(period)}>{period}{period === "Anual" && <span>EM BREVE</span>}</button>)}</div></div>
          <div className="pricing-grid">{plans.map((plan, index) => <article className={`plan-card${plan.featured ? " plan-featured" : ""}`} key={plan.name}><div className="plan-topline"><span>0{index + 1} / SELECTAI</span>{plan.featured && <span className="featured-badge"><Sparkles size={12} /> EM DESTAQUE</span>}</div><h3>{plan.name}</h3><p>{plan.description}</p><div className="plan-price"><span>Em breve</span><small>Plano em definição</small></div><a className={`button ${plan.featured ? "button-primary" : "button-outline"}`} href="#interesse">Tenho interesse <ArrowRight size={15} /></a><div className="plan-separator" /><span className="plan-includes">POSSIBILIDADES PLANEJADAS</span><ul>{plan.features.map((feature) => <li key={feature}><Check size={14} />{feature}</li>)}</ul></article>)}</div>
          <p className="pricing-disclaimer">Valores, recursos, limites e condições ainda não foram definidos. Nenhum plano está disponível para contratação.</p>
        </section>

        <section className="faq-section section-pad" id="faq">
          <div className="section-topline"><span>08 / BOA PERGUNTA</span><span>CLAREZA EM PRIMEIRO LUGAR</span></div>
          <div className="faq-layout"><div><SectionHeading eyebrow="PERGUNTAS FREQUENTES" title={<>Tudo começa<br /><span className="muted-heading">com uma pergunta.</span></>} description="A SelectAI está em desenvolvimento. Veja o que podemos compartilhar até aqui." /><a className="text-link faq-contact" href="#interesse">Ainda tem dúvidas? <ArrowRight size={15} /></a></div>
            <div className="faq-list">{faqs.map((item, index) => <div className={`faq-item${openFaq === index ? " open" : ""}`} key={item.question}><button aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span className="faq-index">0{index + 1}</span><span>{item.question}</span><span className="faq-toggle"><Plus size={15} /></span></button>{openFaq === index && <div className="faq-answer"><p>{item.answer}</p></div>}</div>)}</div>
          </div>
        </section>

        <section className="final-cta section-pad" id="interesse">
          <div className="cta-orbit cta-orbit-one" /><div className="cta-orbit cta-orbit-two" /><div className="cta-spark cta-spark-one">✳</div><div className="cta-spark cta-spark-two">✧</div>
          <div className="cta-content"><span className="eyebrow"><i /> UM NOVO UNIVERSO COMEÇA COM UMA IDEIA</span><div className="cta-logo"><img src={assetUrl("logos/logoselectIA.jpg")} alt="" /></div><h2>As melhores inteligências.<br /><span className="gradient-text">Um só lugar.</span></h2><p>O futuro da inteligência não precisa estar espalhado.</p><div className="cta-actions"><button className="button button-primary" onClick={() => setModal("interest")}>Acompanhar novidades <ArrowRight size={16} /></button><a className="button button-outline" href="#inteligencias">Explorar inteligências <ArrowUpRight size={15} /></a></div><span className="cta-footnote">SELECTAI — UMA VISÃO EM CONSTRUÇÃO</span></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main"><div className="footer-brand-col"><Brand footer /><p>As melhores inteligências<br />em um só lugar.</p><span className="footer-status"><i /> UM UNIVERSO EM CONSTRUÇÃO</span></div>
          <div className="footer-column"><span>PLATAFORMA</span><a href="#inteligencias">Inteligências</a><a href="#recursos">Recursos</a><a href="#como-funciona">Como funciona</a><a href="#planos">Planos</a></div>
          <div className="footer-column"><span>SELECTAI</span><a href="#inicio">Sobre a proposta</a><a href="#faq">Perguntas frequentes</a><a href="#interesse" onClick={(event) => { event.preventDefault(); setModal("interest"); }}>Contato</a><span className="footer-unavailable">Privacidade <small>EM BREVE</small></span><span className="footer-unavailable">Termos de uso <small>EM BREVE</small></span></div>
          <div className="footer-column"><span>ACOMPANHE</span><span className="footer-unavailable">Instagram <small>EM BREVE</small></span><span className="footer-unavailable">LinkedIn <small>EM BREVE</small></span><span className="footer-unavailable">YouTube <small>EM BREVE</small></span></div>
        </div>
        <div className="footer-bottom"><span>© 2026 SelectAI. Todos os direitos reservados.</span><span>As marcas e nomes dos modelos pertencem aos seus respectivos titulares.</span><a href="#inicio">Voltar ao topo <ArrowUpRight size={13} /></a></div>
      </footer>

      {modal && (
        <div className="modal-backdrop" onClick={(event) => { if (event.target === event.currentTarget) setModal(null); }}>
          <section className="info-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close" onClick={() => setModal(null)} aria-label="Fechar"><X size={17} /></button>
            <span className="modal-icon"><Sparkles size={18} /></span><span className="mini-eyebrow">SELECTAI · EM DESENVOLVIMENTO</span>
            <h2 id="modal-title">{modal === "signin" ? "A plataforma ainda está sendo preparada." : "Estamos preparando algo novo."}</h2>
            <p>{modal === "signin" ? "O acesso à plataforma ainda não está disponível. Esta página apresenta uma prévia demonstrativa da experiência." : "Cadastro, novidades e canais oficiais ainda serão divulgados. Acompanhe esta página para conhecer a proposta da SelectAI."}</p>
            <button className="button button-primary" onClick={() => setModal(null)}>Entendi <Check size={15} /></button>
          </section>
        </div>
      )}
    </>
  );
}

export default App;
