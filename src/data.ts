export type ModelCategory =
  | "Texto e raciocínio"
  | "Pesquisa e produtividade"
  | "Imagens e design"
  | "Edição criativa";

export type Model = {
  name: string;
  category: ModelCategory;
  description: string;
  monogram: string;
  color: string;
  icon: string;
};

export const modelCategories = [
  "Todas",
  "Texto e raciocínio",
  "Pesquisa e produtividade",
  "Imagens e design",
  "Edição criativa",
] as const;

export const models: Model[] = [
  { name: "ChatGPT", category: "Texto e raciocínio", description: "Conversas, raciocínio e produtividade.", monogram: "G", color: "mint", icon: "/models/chatgpt.png" },
  { name: "Claude", category: "Texto e raciocínio", description: "Escrita, análise e documentos.", monogram: "C", color: "peach", icon: "/models/claude.png" },
  { name: "Gemini", category: "Pesquisa e produtividade", description: "Pesquisa e tarefas multimodais.", monogram: "✦", color: "blue", icon: "/models/gemini.png" },
  { name: "Grok", category: "Pesquisa e produtividade", description: "Conversas, pesquisa e tendências.", monogram: "𝕏", color: "white", icon: "/models/grok.png" },
  { name: "Leonardo AI", category: "Imagens e design", description: "Ilustrações e conceitos visuais.", monogram: "L", color: "violet", icon: "/models/leonardo.png" },
  { name: "DALL·E", category: "Imagens e design", description: "Criação de imagens a partir de ideias.", monogram: "D", color: "mint", icon: "/models/dalle.png" },
  { name: "Stable Diffusion", category: "Imagens e design", description: "Geração visual com possibilidades criativas.", monogram: "◉", color: "blue", icon: "/models/stable-diffusion.png" },
  { name: "Midjourney", category: "Imagens e design", description: "Imagens artísticas e expressivas.", monogram: "✳", color: "white", icon: "/models/midjourney.png" },
  { name: "Nano Banana Pro", category: "Edição criativa", description: "Criação e edição de imagens.", monogram: "N", color: "yellow", icon: "/models/nano-banana.png" },
  { name: "Seedream", category: "Imagens e design", description: "Exploração de novas ideias visuais.", monogram: "S", color: "peach", icon: "/models/seedream.png" },
  { name: "Flux Kontext Pro", category: "Edição criativa", description: "Edição e transformação de imagens.", monogram: "F", color: "violet", icon: "/models/flux-kontext.png" },
];

export const useCases = [
  { label: "Marketing", icon: "✳", title: "Ideias que encontram seu público.", description: "Transforme ideias em campanhas que chamam atenção.", prompt: "Crie uma campanha de marketing" },
  { label: "Desenvolvimento", icon: "⌘", title: "Do conceito ao próximo commit.", description: "Explore soluções, documente projetos e acelere sua criatividade técnica.", prompt: "Explique um conceito de código" },
  { label: "Estudos", icon: "▤", title: "Aprender também é explorar.", description: "Organize conteúdos, explore conceitos e amplie seu aprendizado.", prompt: "Resuma um tema para estudar" },
  { label: "Negócios", icon: "↗", title: "Espaço para novas possibilidades.", description: "Planeje estratégias e desenvolva novas oportunidades.", prompt: "Desenvolva uma ideia de negócio" },
  { label: "Design", icon: "◈", title: "Imagine. Experimente. Crie.", description: "Experimente novas possibilidades de criação visual.", prompt: "Crie um prompt para gerar imagens" },
  { label: "Produtividade", icon: "◷", title: "Mais clareza para o seu dia.", description: "Organize tarefas, refine textos e simplifique processos.", prompt: "Organize minhas tarefas da semana" },
];

export const faqs = [
  { question: "O que é a SelectAI?", answer: "A SelectAI é uma plataforma em desenvolvimento com a proposta de reunir diferentes inteligências artificiais em uma experiência unificada." },
  { question: "Quais inteligências artificiais estarão disponíveis?", answer: "Estamos planejando um catálogo com diferentes modelos de texto, pesquisa e criação visual. A disponibilidade de cada modelo será comunicada oficialmente." },
  { question: "Preciso contratar cada inteligência separadamente?", answer: "As condições de acesso ainda estão em definição. Não há planos ou integrações disponíveis para contratação neste momento." },
  { question: "A SelectAI terá planos de assinatura?", answer: "A estrutura de planos está sendo estudada. Valores, limites e condições serão divulgados quando estiverem definidos." },
  { question: "Será possível gerar imagens?", answer: "A criação visual faz parte das possibilidades planejadas para a plataforma. A disponibilidade dependerá das integrações futuras." },
  { question: "A plataforma funcionará no celular?", answer: "A experiência apresentada foi pensada para se adaptar a telas de diferentes tamanhos. O produto final ainda está em desenvolvimento." },
  { question: "Como funcionará o acesso aos modelos?", answer: "A forma de acesso ainda não foi definida. As informações serão atualizadas quando a plataforma estiver mais próxima do lançamento." },
  { question: "Quando a SelectAI estará disponível?", answer: "Ainda não temos uma data oficial de lançamento. Acompanhe nossos canais oficiais quando forem divulgados." },
];

export const plans = [
  { name: "Starter", description: "Para começar a explorar o universo da IA.", features: ["Experiência unificada", "Exploração de modelos", "Novidades da plataforma"] },
  { name: "Pro", description: "Para quem quer levar a produtividade mais longe.", features: ["Mais possibilidades de criação", "Recursos avançados planejados", "Uma experiência mais completa"], featured: true },
  { name: "Business", description: "Para equipes que desejam trabalhar de forma mais integrada.", features: ["Fluxos para equipes", "Colaboração planejada", "Gestão centralizada"] },
];
