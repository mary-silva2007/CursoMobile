# 🏠 Imobiliária Prime

> Uma plataforma Angular para gestão de imóveis com autenticação por perfil (cliente e corretor).

Este projeto demonstra os principais conceitos do **Angular** — como componentes, serviços, roteamento com guardas, comunicação com API via `HttpClient`, e arquitetura baseada em perfis — aplicados a um cenário real: uma imobiliária digital.

---

## 🎯 Objetivo

Desenvolver uma **Single Page Application (SPA)** que permita:

- **Corretores** gerenciarem seus imóveis (CRUD).
- **Clientes** pesquisarem imóveis e manifestarem interesse.
- **Visitantes** visualizarem imóveis em destaque sem login.
- Controle de acesso seguro com **autenticação e autorização por perfil**.

---

## 📋 Funcionalidades

| Perfil       | Funcionalidades |
|--------------|-----------------|
| **Visitante** | Visualizar imóveis em destaque, detalhes de imóvel, criar conta de cliente |
| **Cliente**   | Marcar imóveis como "Tenho Interesse", ver lista de interesses, editar perfil |
| **Corretor**  | CRUD de imóveis, visualizar clientes interessados |

---

## ⚙️ Tecnologias Utilizadas

- **Frontend**: Angular 17+ (com Standalone Components)
- **Estilização**: SCSS
- **Formulários**: Reactive Forms
- **Comunicação com API**: `HttpClient` + RxJS (`Observable`)
- **Backend simulado**: [JSON Server](https://github.com/typicode/json-server)
- **Autenticação**: `localStorage` + `AuthService`
- **Proteção de rotas**: Guardas de rota (`CanActivateFn`)
- **Identidade Visual**:  
  - Verde-esmeralda: `#009B77`  
  - Cinza-escuro: `#333333`  
  - Branco: `#FFFFFF`

---

## 📁 Estrutura do Projeto

```bash
src/
└── app/
    ├── core/          
    │   ├── guards/    
    │   ├── services/  
    │   └── models/    
    ├── views/          
    │   ├── public/    
    │   ├── cliente/   
    │   └── corretor/  
    └── templates/     
        ├── components/
        └── pipes/     
```

---

## Diagrama de Fluxo 

```mermaid

flowchart TD
  A[Iniciar Aplicação] --> B{Usuário Logado?}
  B -- Não --> C[Tela de Login]
  B -- Sim --> D{Tipo de Usuário?}
  D -- "cliente" --> E[Redirecionar para /cliente/meus-interesses]
  D -- "corretor" --> F[Redirecionar para /corretor/dashboard]
  C --> G[Autenticar com AuthService]
  G --> H{Credenciais Válidas?}
  H -- Sim --> D
  H -- Não --> I[Exibir Erro]
  I --> C
```

---

## Diagrma de Classes

```mermaid

classDiagram
  class Usuario {
    +id: number
    +nome: string
    +email: string
    +senha: string
    +tipo: string
  }

  class Imovel {
    +id: number
    +titulo: string
    +corretorId: number
    +tipo: string
    +cidade: string
    +preco: number
    +descricao: string
    +imagemUrl: string
  }

  class Interesse {
    +id: number
    +clienteId: number
    +imovelId: number
  }

  Usuario "1" -- "0..*" Imovel : publica
  Usuario "1" -- "0..*" Interesse : manifesta
  Imovel "1" -- "0..*" Interesse : recebe
```

--- 

## Diagrama de Uso

```mermaid 

flowchart TD
    subgraph Atores
        V[Visitante]
        C[Cliente]
        R[Corretor]
    end

    subgraph Funcionalidades
        F1[Visualizar Imóveis em Destaque]
        F2[Visualizar Detalhes do Imóvel]
        F3[Criar Conta de Cliente]
        F4[Marcar Imóvel como Interesse]
        F5[Visualizar Meus Interesses]
        F6[Editar Perfil]
        F7[Gerenciar Meus Imóveis]
        F8[Visualizar Clientes Interessados]
        F9[Login]
    end

    V --> F1
    V --> F2
    V --> F3

    C --> F4
    C --> F5
    C --> F6
    C --> F9

    R --> F7
    R --> F8
    R --> F9

    class V,C,R actor
    class F1,F2,F3,F4,F5,F6,F7,F8,F9 feature
```