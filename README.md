# LimaStore

Protótipo de um aplicativo web onde colaboradores da Lima Consulting podem
resgatar produtos da LimaStore utilizando suas moedas da Feedz.

## Como executar

1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` em seu navegador favorito.

Todo o comportamento é implementado com HTML, CSS e JavaScript puro, então não
é necessário instalar dependências ou rodar comandos adicionais.

## Funcionalidades implementadas

- Identificação do colaborador por e-mail corporativo (`@limaconsulting.com`).
- Catálogo mockado com produtos como copo térmico, camiseta, mochila, caixinha
  de som, entre outros.
- Controle de saldo de moedas Feedz mockado por colaborador.
- Fluxo de resgate de produtos com atualização de saldo e registro no histórico.
- Histórico de resgates persistido no `localStorage` para demonstrar como o
  estado pode ser restaurado entre sessões.
- Estrutura pensada para futura integração com a API da Feedz para consumir
  saldo em tempo real.

## Usuários de exemplo

Utilize um dos usuários abaixo para explorar o protótipo:

- ana.silva@limaconsulting.com — 1850 moedas
- bruno.costa@limaconsulting.com — 1320 moedas
- carolina.mendes@limaconsulting.com — 980 moedas
- diego.albuquerque@limaconsulting.com — 2420 moedas
- fernanda.ribeiro@limaconsulting.com — 610 moedas

## Próximos passos sugeridos

- Conectar com a API da Feedz para obter saldo e registrar resgates
  automaticamente.
- Adicionar autenticação com Single Sign-On ou outro provedor utilizado pela
  Lima Consulting.
- Integrar com um backend da LimaStore para gerenciar estoque, pedidos e
  entregas.
- Criar um painel administrativo para cadastro/edição do catálogo e para
  acompanhamento de resgates em tempo real.
