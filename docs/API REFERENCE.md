
api.md
100%
# API de Carros

## `GET /carros`

**Descrição:** Retorna uma lista de carros com suporte a ordenação, paginação e filtros por modelo, marca e ano.

### Parâmetros de consulta (Query Parameters)

Todos os parâmetros são opcionais.

| Parâmetro | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `modelo` | `string` | — | Filtra os carros pelo modelo. A busca não diferencia letras maiúsculas e minúsculas e aceita correspondências parciais. |
| `marca` | `string` | — | Filtra os carros pela marca. A busca não diferencia letras maiúsculas e minúsculas e aceita correspondências parciais. |
| `minAno` | `number` | — | Retorna carros cujo ano seja maior ou igual ao valor informado. |
| `maxAno` | `number` | — | Retorna carros cujo ano seja menor ou igual ao valor informado. |
| `orderBy` | `string` | `modelo` | Define o campo utilizado para ordenação. Valores aceitos: `modelo`, `marca` ou `ano`. |
| `sortBy` | `string` | `asc` | Define a direção da ordenação. Valores aceitos: `asc` (crescente) ou `desc` (decrescente). |
| `page` | `number` | `1` | Define a página de resultados a ser retornada. |
| `limit` | `number` | `10` | Define a quantidade de carros por página. |

### Exemplo de requisição

```
GET /carros?marca=honda&minAno=2020&orderBy=ano&sortBy=desc&page=1&limit=5
```

### Resposta de sucesso — `200 OK`

```json
{
  "qtdPaginas": 10,
  "paginaAtual": 1,
  "qtdCarros": 20,
  "carros": [
    {
      "modelo": "Civic",
      "marca": "Honda",
      "ano": 2025
    },
    {
      "modelo": "City",
      "marca": "Honda",
      "ano": 2023
    }
  ]
}
```

## `POST /carros`

**Descrição:** Cadastra um novo carro.

**Content-Type:** `application/json`

### Corpo da requisição (Request Body)

| Campo | Tipo | Obrigatório | Validação |
| --- | --- | --- | --- |
| `modelo` | `string` | Sim | Após remover espaços no início e no fim, deve conter pelo menos 2 caracteres. |
| `marca` | `string` | Sim | Após remover espaços no início e no fim, deve conter pelo menos 3 caracteres. |
| `ano` | `number` | Sim | Deve ser igual ou superior a 1950 e não pode ultrapassar o próximo ano em relação ao ano atual.  |

### Exemplo de requisição

```bash
POST /carros
Content-Type: application/json
```

```json
{
  "modelo": "Civic",
  "marca": "Honda",
  "ano": 2026
}
```

### Resposta de sucesso — `201 Created`

Retornada quando o carro é cadastrado com sucesso.

```json
{
  "mensagem": "Carro cadastrado com sucesso",
  "carro": {
    "modelo": "Civic",
    "marca": "Honda",
    "ano": 2026
  }
}
```

### Resposta de erro — `400 Bad Request`

Retornada quando os dados enviados são inválidos.

Exemplo de resposta para um modelo com menos de 2 caracteres:

```json
{
  "erro": "Os parâmetros enviados são inválidos!",
  "mensagem": [
    "O modelo deve ter pelo menos 2 caracteres"
  ]
}
```

**Mensagens de validação possíveis:**

| Campo | Mensagem |
| --- | --- |
| `modelo` ausente ou inválido | `O modelo é obrigatório` |
| `modelo` com menos de 2 caracteres | `O modelo deve ter pelo menos 2 caracteres` |
| `marca` ausente ou inválida | `A marca é obrigatória` |
| `marca` com menos de 3 caracteres | `A marca deve ter pelo menos 3 caracteres` |
| `ano` ausente ou inválido | `O ano é obrigatório` |
| `ano` inferior a 1950 | `O ano não pode ser menor que 1950` |
| `ano` superior ao limite permitido | A mensagem informa o ano máximo permitido, calculado dinamicamente. |
Exibindo api.md…