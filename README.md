# Smash Fire — Cardápio Digital

Projeto de um cardápio digital responsivo para a hamburgueria fictícia Smash Fire. Feito com
HTML, CSS e JavaScript puro, ele permite que clientes consultem o menu pelo celular ou computador,
inclusive acessando a página por um QR Code.

O site apresenta categorias e produtos com fotos, descrições, ingredientes e preços, além de
promoções, horário de funcionamento, endereço e links de contato. É um cardápio **somente para
consulta**: não há carrinho nem pedidos pelo site; o WhatsApp é usado apenas para contato.

> **Demonstração:** os dados de contato, endereço, horários e produtos são exemplos. Atualize as
> configurações antes de usar o projeto para uma empresa real.

```
/index.html
/css/style.css
/js/script.js
/assets/images/   (placeholder.svg, favicon.svg e, depois, as fotos reais)
```

## Onde mudar cada coisa

Quase tudo fica no **início do arquivo `js/script.js`** (seções 1, 2 e 3, marcadas com `← EDITE AQUI`).

| O que mudar | Onde |
|---|---|
| **Nome da empresa** | `CONFIG.restaurantName` e `CONFIG.tagline` (a última palavra do nome fica amarela) |
| **Logo** | Ícone: `<symbol id="icon-logo">` no `index.html` (e `assets/images/favicon.svg`). Texto: `CONFIG.restaurantName` |
| **Instagram** | `CONFIG.instagram` |
| **WhatsApp (contato)** | `CONFIG.whatsapp` (só números, com 55 + DDD) e `CONFIG.whatsappMessage` (mensagem inicial) |
| **Endereço** | `CONFIG.address` (cada texto da lista é uma linha) |
| **Google Maps** | `CONFIG.googleMaps` |
| **Horários** | `CONFIG.schedule` (0 = domingo … 6 = sábado; `null` = fechado). O "Aberto agora" usa os mesmos horários |
| **Adicionar produto** | Copie uma linha de `products`, cole e mude `id` (único), `name`, `category`, `description`, `ingredients`, `price`, `image` |
| **Excluir produto** | Apague a linha do produto em `products` |
| **Preços** | Campo `price` (use ponto: `28.90`) |
| **Descrições / ingredientes** | Campos `description` e `ingredients` (lista; pode apagar o campo se não quiser) |
| **Categorias** | Lista `categories` (o `id` precisa ser igual ao `category` dos produtos). Categoria sem produtos some sozinha |
| **Fotografias** | Campo `image` do produto: link completo ou `"assets/images/bacon-smash.jpg"`. Foto do topo: `<img>` dentro de `.hero__media` no `index.html` |
| **Mais pedidos** | `featured: true` no produto. Selo personalizado: `badge: "⭐ Favorito da casa"` |
| **Promoção (faixa amarela)** | `CONFIG.promo` (título, descrição, preço e foto). Para esconder: `promo: null` |
| **Produto indisponível** | `available: false` no produto. Ele continua no cardápio, escurecido e com "Indisponível no momento". Para voltar, apague o campo ou use `true` |
| **Cores** | `css/style.css`, bloco `:root` (`--yellow`, `--bg`...) |
| **Título e Open Graph (SEO)** | `<head>` do `index.html` (`title`, `description`, `og:*`). São lidos por Google/WhatsApp antes do JavaScript, por isso ficam no HTML |

### Fotos
As fotos de demonstração vêm do Unsplash e precisam de internet. Se alguma não carregar, o site mostra
`assets/images/placeholder.svg`. Para o cliente real, coloque as fotos em `assets/images/` (ideal: JPG ou WebP,
cerca de 600px de largura, abaixo de 100 KB cada) e troque o campo `image`.

## Publicação

O projeto pode ser publicado na Vercel conectado ao repositório do GitHub. Como é um site estático
em HTML, CSS e JavaScript, não precisa de etapa de build nem configuração especial.

Depois de publicar, gere o QR Code com o link final e imprima para as mesas, o balcão e a bio do Instagram.
