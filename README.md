<!-- trazer o author do post no uniquePostOfClient e allPostOfClient -->

# Criacao do Client

**RF** => Requisitos Funcionais

Deve ser possivel cadrastrar um novo client
DeveSerpossivel Trazer Todas as Infomacoes sober um client[x]

**RN** Regra de negocio

Nao deve ser possivel Criar um Client com um email ja existente.

# Listagems Clients

**RF** => Requisitos Funcionais

Rota Authenticada[]

Deve ser possivel listar todos os post de um Client
Deve ser possivel lista Um Unico Post de um Client

**RN** Regra de negocio

Deve Conter Todas as informacao do client(infromao nao sensiveis).
Deve Conter Todos os Post Do clint jutamente com os comentario de cada post.

# Listagem de Post

Rota Authenticada[]

**RF** => Requisitos Funcionais
O Client nao percisa esta autenticado para ver a listagem de Posts.
Deve ser possivel list todos os Post de todos os Clinets
UM post pode conter muitas categorias

**RN** Regra de negocio

Nao deve ser possivel ver post nao ser Somente posts Published
Deve ser possivel Ver os Commentarios Somente Post com cometario ativado.
Nao deve conter informacoes sensiveis

# Criacao de um Post

Rota Authenticada[x]

**RF** => Requisitos Funcionais
Deve ser possivel cadrastrar um novo post

**RN** Regra de negocio

Nao deve ser possivel criar um Post com um nome de um post existente
Nao deve ser possivel criar um Post com o slug ja existente

# Fazendo um Comentario

Rota Authenticada[x]

Um Comentario nao deve esta em mais de um post
Nao deve ser possivel Client nao autenticados Fazerem Comentarios.
O Comentario deve Conter no maximo 150 caracteres
Nao deve ser possivel fazer Commentarios em Posts Com Conmentario desabilitados.
