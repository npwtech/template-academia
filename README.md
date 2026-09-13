# Academia — Template de Academia

Template completo de landing page para academia, em React + CSS puro (sem Tailwind, sem framer-motion). Pensado pra você apresentar como demo para academias pequenas/médias, trocando a marca e a paleta depois.

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

Para gerar a versão de produção (arquivos estáticos prontos pra subir em qualquer hospedagem):

```bash
npm run build
```

Os arquivos finais ficam em `dist/`.

## Onde mexer

Tudo está em `src/App.jsx`, num arquivo só, de propósito — facilita copiar e reaproveitar em outro projeto.

- **Paleta de cores**: objeto `THEME` no topo do arquivo. São 9 valores hexadecimais nomeados (`ink`, `paper`, `accent`, `cyan`, `gold`, etc). Todo o CSS do site usa essas variáveis, então trocar esses 9 valores re-skina o site inteiro.
- **Fotos**: objeto `IMG`, logo abaixo do `THEME`. São fotos do [Pexels](https://pexels.com), banco gratuito com licença de uso comercial. Troque pelas fotos reais do cliente quando for entregar de verdade.
- **Textos e dados**: `NAV_LINKS`, `FEATURES`, `PROGRAMS`, `STEPS`, `PLANS`, `TESTIMONIALS`, `FAQS`, `GALLERY` — todos são arrays simples no topo do arquivo, dá pra editar sem mexer no resto do código.

## Seções da página (nessa ordem)

1. Nav fixo + menu mobile
2. Hero (com foto de fundo + preço em destaque)
3. Faixa em movimento (marquee) com as modalidades
4. Sobre (história da academia)
5. Estrutura (grade de diferenciais)
6. Números (contadores animados)
7. Modalidades (cards com foto)
8. Como funciona (3 passos)
9. Planos (com toggle mensal/anual)
10. Galeria (mosaico de fotos)
11. Depoimentos (carrossel)
12. CTA do app
13. FAQ (acordeão)
14. CTA final
15. Footer
16. Botão fixo no rodapé (só mobile)

## Observações

- As fotos são carregadas direto do CDN do Pexels — precisa de internet pra aparecer.
- O grosso do movimento (scroll reveal, contadores, marquee, carrossel) é feito com CSS + `IntersectionObserver`, sem biblioteca externa de animação.
- O site respeita `prefers-reduced-motion` — quem tem essa preferência ativada no sistema não vê as transições.
