# ENTEBOR - Site institucional

Site institucional da **ENTEBOR (Empresa Nacional de Tecnologia em Borracha e Poliuretano)**,
fabricante de artefatos tecnicos em borracha e poliuretano (elastomeros) para a industria:
vedacao, amortecimento e revestimento sob medida.

E uma landing page estatica de pagina unica, com tema escuro industrial, animacoes e foco
em conversao (pedido de orcamento).

## Stack

- HTML, CSS e JavaScript puros (sem framework, sem build, sem dependencias).
- Fontes via Google Fonts: Space Grotesk (titulos) e Inter (corpo).
- Icones em SVG inline (sem biblioteca externa).
- Imagens locais em `img/` (formato `.webp`) e algumas fotos de setores via CDN do Unsplash.

Nao ha etapa de build nem `npm install`. E so abrir o `index.html`.

## Estrutura de arquivos

```
.
├── index.html      # Toda a marcacao da pagina (todas as secoes)
├── styles.css      # Tema, layout, responsividade e animacoes
├── script.js       # Interacoes: menu, scroll, contadores, tabela de materiais, form
├── img/            # Logo e fotos de produtos (.webp)
├── CLAUDE.md       # Este arquivo
├── LICENSE
└── .gitignore
```

## Como rodar localmente

Basta abrir `index.html` no navegador. Para evitar qualquer restricao de origem ao carregar
recursos, da para servir a pasta com um servidor estatico simples, por exemplo:

```
npx serve .
```

## Secoes da pagina (em ordem)

1. **Nav** fixo com logo, links e CTA de orcamento (vira menu hamburguer no mobile).
2. **Hero** com titulo animado, numeros e indicador de scroll.
3. **Marquee** com os tipos de elastomero.
4. **Institucional** (quem somos) com foto da fabrica e diferenciais.
5. **Setores** (areas de atuacao) em cards com imagem.
6. **Produtos** mais procurados (grade de cards + card de CTA).
7. **Materiais**: explorador interativo de elastomeros (ver abaixo).
8. **Processo** em 4 passos.
9. **FAQ** em acordeao.
10. **Contato / Orcamento** com formulario.
11. **Footer** + botao flutuante de WhatsApp.

## Explorador de elastomeros (destaque)

A antiga tabela tecnica foi transformada num componente interativo em `script.js`
(array `materials`). Tem dois modos:

- **Explorar**: seleciona um material e mostra a faixa termica e barras de desempenho.
- **Matriz completa**: todos os materiais lado a lado, com ordenacao.

As barras de temperatura preenchem do inicio ate a temperatura maxima (escala de -70 C a 260 C).
Para alterar materiais ou valores, edite o array `materials` em `script.js`.

## Sistema de design

Tema escuro industrial. Tokens principais em `:root` no topo de `styles.css`:

- Base: azul-marinho profundo / grafite (`--ink`, `--surface`).
- Marca: azul (`--navy`, `--navy-2`).
- Acentos: ciano eletrico (`--cyan`) e ambar (`--amber`).
- Tipografia: Space Grotesk (titulos), Inter (corpo).

Animacoes respeitam `prefers-reduced-motion`. Layout responsivo nos breakpoints
1024px, 860px e 620px.

## Conteudo e contatos

Dados comerciais publicos da empresa estao no HTML (rodape e secao de contato):

- Telefones: (31) 3597-0597 e (31) 3160-1103
- E-mail comercial: vendas1@entebor.com.br
- Endereco: R. Texaco, 470 - Jardim Piemonte, Betim - MG, 32689-350

O formulario de orcamento abre o cliente de e-mail do visitante (mailto) com os dados
preenchidos. Nao ha backend.

## Imagens dos setores

As fotos da secao de Setores usam URLs do Unsplash (CDN). Cada card tem um gradiente de
fundo como fallback, entao continua apresentavel mesmo sem internet. Para deixar 100% local,
baixe as imagens para `img/` e troque as URLs no `index.html`.

## Deploy

Publicado no Netlify como site estatico (raiz do projeto, sem build). O deploy de previa fica
em um site dedicado e isolado na conta, separado de outros projetos.

## Convencoes

- Textos da interface em portugues, com tom direto e sem sinais de IA (sem travessoes,
  emojis ou cliches na copy).
- Sem segredos no repositorio: `.env`, chaves e afins ficam fora pelo `.gitignore`.
