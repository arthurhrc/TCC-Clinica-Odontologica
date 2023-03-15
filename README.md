# Sistema de Gestão Odontológica

Sistema web para gerenciamento de clínica odontológica, desenvolvido como trabalho de conclusão de curso.

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
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── entities/
│       └── config/
└── frontend/
    ├── index.html
    └── src/
        ├── css/
        ├── js/
        └── *.html
```
