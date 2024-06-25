# Sistema de Reservas - Com teste unitário

Este projeto é uma API simples de sistema de reservas, desenvolvida com Node.js, Express e PostgreSQL. O foco principal do projeto é a implementação de testes unitários utilizando Jest e Supertest, destacando as habilidades em criação e teste de rotas para um CRUD completo.

## Funcionalidades

- **Criação de Reservas:** Crie uma nova reserva fornecendo o nome do cliente, data da reserva, número de convidados e observações.
- **Listagem de Reservas:** Obtenha uma lista de todas as reservas.
- **Consulta de Reserva por ID:** Consulte uma reserva específica pelo seu ID.
- **Atualização de Reservas:** Atualize as informações de uma reserva existente.
- **Exclusão de Reservas:** Exclua uma reserva pelo seu ID.

## Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- Jest
- Supertest
- Moment.js

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/sistema-reservas.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd sistema-reservas
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure o banco de dados PostgreSQL:
   - Crie um banco de dados chamado `reservas`.
   - Atualize as informações de conexão no arquivo `src/config/database.js`.

5. Execute as migrações para criar a tabela de reservas:
   ```sql
   CREATE TABLE reservations (
       id SERIAL PRIMARY KEY,
       customer_name VARCHAR(255) NOT NULL,
       reservation_date TIMESTAMP NOT NULL,
       number_of_guests INT NOT NULL,
       notes TEXT
   );
   ```

6. Inicie o servidor:
   ```bash
   npm start
   ```

7. Execute os testes:
   ```bash
   npm test
   ```

## Endpoints

### Criar Reserva

- **URL:** `/api/reservas`
- **Método:** `POST`
- **Corpo da Requisição:**
  ```json
  {
      "customerName": "Aguinaldo Borges",
      "reservationDate": "2024-06-25T12:00:00Z",
      "numberOfGuests": 4,
      "notes": "Mesa perto da janela, por favor"
  }
  ```

### Listar Reservas

- **URL:** `/api/reservas`
- **Método:** `GET`

### Consultar Reserva por ID

- **URL:** `/api/reservas/:id`
- **Método:** `GET`

### Atualizar Reserva

- **URL:** `/api/reservas/:id`
- **Método:** `PUT`
- **Corpo da Requisição:**
  ```json
  {
      "customerName": "Aguinaldo Borges Updated",
      "reservationDate": "2024-06-25T12:00:00Z",
      "numberOfGuests": 4,
      "notes": "Mesa no canto"
  }
  ```

### Deletar Reserva

- **URL:** `/api/reservas/:id`
- **Método:** `DELETE`

## Testes

Os testes são implementados usando Jest e Supertest. Eles garantem que todas as rotas da API funcionem corretamente e que os dados sejam manipulados como esperado.

Para executar os testes, use o comando:

```bash
npm test
```
