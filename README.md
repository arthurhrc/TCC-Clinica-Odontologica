# Sistema de Gestão Odontológica

Sistema web para gerenciamento de clínica odontológica, desenvolvido como trabalho de conclusão de curso.

**Demo ao vivo:** [tcc-odonto.vercel.app](https://tcc-odonto.vercel.app)

## Funcionalidades

- Cadastro e gerenciamento de pacientes, colaboradores e profissionais
- Agendamento de consultas e cirurgias
- Agenda com visualização por tipo de atendimento
- Relatórios de consultas e cirurgias

## Tecnologias

**Backend**
- Java 21
- Spring Boot 3.3.3
- Spring Data JPA
- Banco de dados H2 (em memória, para desenvolvimento)

**Frontend**
- HTML, CSS e JavaScript puro
- Bootstrap 5
- Bootstrap Icons

## Como executar

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

A API estará disponível em `http://localhost:8080`.

O console do banco H2 pode ser acessado em `http://localhost:8080/h2-console`
com a URL `jdbc:h2:mem:testdb`, usuário `sa` e senha em branco.

### Frontend

Abra o arquivo `frontend/index.html` diretamente no navegador ou sirva a pasta
`frontend/` com qualquer servidor HTTP estático.

## Estrutura do projeto

```
odontologia/
├── backend/
│   └── src/main/java/com/trabalho/odontologia/
│       ├── controllers/      # Endpoints REST
│       ├── services/         # Regras de negócio
│       ├── repositories/     # Acesso a dados (Spring Data JPA)
│       ├── entities/         # Entidades JPA (Client, Professional, User, Consultation, Address)
│       └── config/           # Configuração de CORS
└── frontend/
    ├── index.html            # Página de login
    └── src/
        ├── css/styles.css    # Estilos globais
        ├── js/
        │   ├── config.js     # URL base da API
        │   ├── navbar.js     # Componente de navegação (injetado via JS)
        │   └── script.js     # Lógica da aplicação
        └── *.html            # Páginas internas
```

## Observações técnicas

- O frontend consome a API REST do backend via `fetch` com tratamento centralizado de erros no `apiService`
- O preenchimento automático de endereço utiliza a API pública [ViaCEP](https://viacep.com.br)
- Validação de CPF implementada client-side antes de enviar ao servidor
