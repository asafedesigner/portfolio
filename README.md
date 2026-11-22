# Portfólio · Asafe Ferreira

Site pessoal estático: quem sou, cases (ADScanner e Hub de IA Sinapsys), resultados, trajetória e contato.

- `index.html`: página inicial, com animações em GSAP
- `cases/adscanner/` e `cases/sinapsys/`: uma página por case (em inglês, `en/cases/...`). Links antigos com `#case-adscanner` e `#case-sinapsys` redirecionam para as páginas novas
- `ads-video.html` e `hub-video.html`: vídeos dos cases
- `ads-steps.html` e `hub-steps.html`: telas animadas da seção "O produto"
- `asafe.jpg`: foto do hero

Não tem build. Para publicar na Vercel, importe o repositório e use as configurações padrão (Framework: Other).

## English version

`en/` holds the English version of the site, with its own translated copies of the videos and animated screens. Both versions link to each other from the top menu (PT / EN). The photo is shared from the root.

## Idioma por localização

`middleware.js` roda na Vercel só na página inicial (`/`). Visitantes de países de língua portuguesa (Brasil, Portugal, Angola, Moçambique, Cabo Verde, Guiné-Bissau, São Tomé e Príncipe, Timor-Leste) ficam no português; os demais vão para `/en/`. Quando a pessoa usa o seletor PT/EN, a escolha fica salva num cookie (`lang`) e passa a valer em vez da localização. Links diretos para `/en/` nunca são redirecionados.
