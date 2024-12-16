Feature: Serviço para Gerenciar Tarefas
    Como desenvolvedor ou consumidor do serviço de gerenciamento de tarefas,
    Quero garantir que os endpoints de criação de tarefas funcionem corretamente,
    Para que as tarefas sejam armazenadas de forma consistente e válida.

  Background:
    Given que o serviço de gerenciamento de tarefas está disponível
    And que o serviço de gerenciamento de tarefas está limpo

  Scenario: Criar uma tarefa válida via serviço
    Given não existe uma tarefa com o título "Finalizar relatório mensal"
    And o payload da requisição contém:
      """
      {
      "title": "Finalizar relatório mensal",
      "description": "Finalizar e revisar o relatório de dezembro",
      "completed": false,
      "priority": 1,
      "deadline": "2024-12-31",
      "important": true,
      "urgent": false,
      "subtasks": [
          { "description": "Revisar dados financeiros", "completed": false },
          { "description": "Atualizar gráfico de vendas", "completed": false }
      ]
      }
      """
    When o cliente faz a requisição POST para "/api/tasks"
    Then o serviço deve retornar o código de status 201
    And o corpo da resposta deve conter:
      """
      {
      "id": "<uuid>",
      "title": "Finalizar relatório mensal",
      "description": "Finalizar e revisar o relatório de dezembro",
      "completed": false,
      "priority": 1,
      "deadline": "2024-12-31",
      "important": true,
      "urgent": false,
      "subtasks": [
          { "description": "Revisar dados financeiros", "completed": false },
          { "description": "Atualizar gráfico de vendas", "completed": false }
      ],
      "createdAt": "<timestamp>",
      "updatedAt": "<timestamp>"
      }
      """
