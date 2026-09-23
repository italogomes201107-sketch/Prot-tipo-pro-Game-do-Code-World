# NEO-CODEX — Guia do Desenvolvedor

Este documento explica como expandir o portal sem precisar reescrever o jogo inteiro.

## 1. Como abrir o projeto

O projeto é HTML/CSS/JS com módulos ES. Recomenda-se abrir por um servidor local.

### VS Code
1. Abra a pasta `NeoCodex-RPG-v5`.
2. Use uma extensão como Live Server ou rode qualquer servidor HTTP local.
3. Abra `index.html` pelo servidor, não pelo `file:///`.
4. Abra o DevTools do navegador (`F12`) para ver erros no Console.

## 2. Estrutura

```text
NeoCodex-RPG-v5/
├── index.html
├── css/
│   ├── base.css       # visual geral, portal, modais, academia
│   ├── layout.css     # cabeçalho e responsividade
│   └── battle.css     # arena e animações
├── js/
│   ├── main.js        # interface e ligação entre os sistemas
│   ├── data/
│   │   ├── characters.js
│   │   ├── enemies.js
│   │   ├── chapters.js
│   │   ├── missions.js
│   │   └── lessons.js
│   ├── engine/
│   │   ├── battle.js   # regras do combate
│   │   └── damage.js   # cálculo de dano
│   └── systems/
│       ├── save.js     # localStorage
│       └── economy.js  # compra e Ryo
├── assets/
│   ├── characters/    # sprites SVG dos personagens
│   └── enemies/       # sprites SVG dos inimigos
└── docs/
    └── GUIA-DO-DESENVOLVEDOR.md
```

---

## 3. Como adicionar um personagem

Abra `js/data/characters.js` e adicione um novo objeto dentro de `CHARACTERS`.

### Modelo mínimo

```js
{
  id:'java',
  name:'Java',
  class:'tank',
  rarity:5,
  cost:5000,
  hp:1200,
  atk:90,
  def:105,
  spd:60,
  lore:'Uma descrição do personagem e de sua personalidade.',
  skills:[
    {
      name:'JVM Core',
      desc:'Ataque básico. Recupera 8 Energia.',
      power:1,
      cost:0,
      energyGain:8,
      targetMode:'single'
    }
  ]
}
```

### IDs
O `id` deve ser único e sem espaços. Ele é usado para localizar o sprite:

```text
assets/characters/java.svg
```

### Classes disponíveis

- `attacker` — dano e finalização.
- `tank` — HP, Defesa e proteção.
- `support` — cura, buffs e Energia.
- `controller` — debuffs, ilusões e controle.

Se quiser criar uma classe nova, primeiro adicione a classe em `CLASSES` e depois use o mesmo identificador no personagem.

---

## 4. Como criar skills

Cada skill tem pelo menos:

```js
{
  name:'Nome da Skill',
  desc:'Explique exatamente o que ela faz.',
  power:1.2,
  cost:30,
  targetMode:'single'
}
```

### Ataque único

```js
power:1.2,
cost:20,
targetMode:'single'
```

### Ataque em múltiplos inimigos

```js
power:1.05,
cost:30,
targetMode:'multi',
maxTargets:2
```

O jogador seleciona os inimigos clicando neles antes de usar a habilidade.

### Ataque em TODOS os inimigos

```js
power:.8,
cost:35,
targetMode:'all'
```

### Cura do próprio personagem

```js
heal:.30,
cost:40,
targetMode:'ally'
```

### Buff

```js
buff:{stat:'atk',percent:.35,turns:2},
cost:30,
targetMode:'ally'
```

### Debuff

```js
debuff:{stat:'atk',percent:.35,turns:2},
cost:30,
targetMode:'single'
```

### Escudo

```js
shield:.60,
cost:35,
targetMode:'self'
```

### Penetração de Defesa

```js
power:1.45,
armorPen:.30,
cost:25,
targetMode:'single'
```

### Dano baseado em Defesa

```js
power:1.65,
defScaling:.40,
cost:45,
targetMode:'single'
```

---

## 5. Como colocar o sprite do personagem

O projeto já usa SVG, que é ótimo para sprites simples porque não perde qualidade.

1. Crie ou desenhe o personagem.
2. Exporte como SVG ou PNG.
3. Dê exatamente o mesmo nome do `id`.
4. Coloque em `assets/characters/`.

Exemplo:

```text
id:'rust'
```

deve ter:

```text
assets/characters/rust.svg
```

O portal já procura esse arquivo automaticamente.

### Para sprites PNG

Também funciona. Basta trocar:

```text
rust.svg
```

por:

```text
rust.png
```

E alterar a função `sprite()` em `main.js` para usar `.png`.

---

## 6. Como adicionar um inimigo

Abra `js/data/enemies.js`.

```js
{
  id:'memory-eater',
  name:'Memory Eater',
  hp:1100,
  atk:100,
  def:75,
  spd:65,
  weakTo:'sql',
  skills:[
    {name:'Erase',power:1.1},
    {name:'Forget',power:1.4}
  ]
}
```

Depois crie:

```text
assets/enemies/memory-eater.svg
```

O sprite aparece automaticamente na arena.

---

## 7. Como criar um capítulo da história

Abra `js/data/chapters.js`.

```js
{
  id:4,
  title:'A Biblioteca Fantasma',
  location:'Dock 404',
  enemyTeam:['memory-eater','drone'],
  reward:1800,
  scenes:[
    {
      text:'DOCK 404 // 03:40',
      speaker:'NARRADOR',
      body:'Uma biblioteca clandestina foi encontrada...'
    },
    {
      text:'O aviso',
      speaker:'SQL',
      body:'Se os dados sumirem, precisamos descobrir de onde eles vieram.'
    }
  ]
}
```

### Caixa de texto

Cada objeto de `scenes` vira uma tela de diálogo com:

- local/identificação;
- nome do personagem que fala;
- texto da lore;
- botão anterior;
- botão próximo;
- entrada automática no combate depois da última cena.

Isso permite construir capítulos como um visual novel/RPG.

### Equipe de inimigos

```js
enemyTeam:['drone','neural','archivist']
```

Coloque de 1 a 3 IDs de inimigos.

---

## 8. Como adicionar uma missão de conhecimento

Em `js/data/missions.js`:

```js
{
  id:'m5',
  title:'Função Perdida',
  lang:'JavaScript',
  difficulty:'Médio',
  q:'Qual palavra cria uma função?',
  o:['function','style','select','className'],
  a:0,
  reward:300
}
```

`a` é o índice da resposta correta. Como arrays começam em 0:

```text
0 = primeira
1 = segunda
2 = terceira
3 = quarta
```

---

## 9. Como criar uma aula completa

Abra `js/data/lessons.js`.

Cada aula possui:

- `intro` — explicação inicial;
- `sections` — módulos teóricos;
- `code` — exemplos;
- `activity` — desafio prático.

Modelo:

```js
{
  id:'rust',
  lang:'Rust',
  title:'Rust — Segurança de memória',
  intro:'Explique o conceito antes de pedir código.',
  sections:[
    {
      title:'1. Ownership',
      text:'Explique ownership com linguagem simples.',
      code:'let x = 10;'
    }
  ],
  activity:{
    type:'js',
    prompt:'Complete o exercício.',
    starter:'// escreva aqui',
    answer:'console.log(10);'
  }
}
```

A Academia abre tudo em um laboratório próprio.

---

## 10. Laboratório de código

O laboratório possui três etapas:

### EXECUTAR
Executa o código quando o navegador consegue interpretar aquela linguagem.

### ANALISAR / CORRIGIR
Procura erros comuns e dá uma dica de depuração.

### CONFERIR ATIVIDADE
Compara a solução com o objetivo pedagógico da atividade.

### JavaScript
É executado diretamente no navegador com captura de `console.log()` e erros.

### HTML/CSS
O CSS é renderizado em um preview isolado. O HTML/CSS pode ser expandido para atividades de construção de interface.

### Python
O projeto tenta carregar o interpretador Pyodide no navegador. Isso exige conexão com a CDN na primeira utilização. Se não houver conexão, o laboratório informa o problema em vez de fingir que executou o código.

### SQL
Existe um simulador didático para as consultas básicas usadas nas aulas.

### C#
O navegador não compila C# nativamente neste projeto. O laboratório faz análise didática e aponta o conceito esperado. Para compilação real, use o .NET SDK localmente.

---

## 11. Como funciona o combate em equipe

A equipe pode ter até 3 personagens.

Cada rodada:

1. O jogador escolhe um personagem vivo.
2. Escolhe uma skill.
3. Seleciona um inimigo ou vários inimigos, dependendo da skill.
4. A skill é executada.
5. Esse personagem fica com `AÇÃO FEITA`.
6. O próximo aliado pode agir.
7. Quando todos os aliados vivos agem, a IA responde.
8. A nova rodada começa e todos podem agir novamente.

### Exemplo de dois personagens atacando

Se a equipe for:

```text
JavaScript + CSS
```

na mesma rodada:

```text
JavaScript → Promise.all() → inimigo 1 + inimigo 2
CSS → Grid Collapse → inimigo 2 + inimigo 3
```

Isso permite montar combos e dividir alvos.

---

## 12. Energia

Skills especiais usam `cost`.

Ataques básicos podem ter custo 0 e gerar Energia:

```js
energyGain:8
```

Defender gera Energia automaticamente.

No início da versão atual, cada personagem começa com 25⚡ durante a batalha.

---

## 13. Loja e composição automática

As compras são salvas em `localStorage`.

Ao comprar:

```text
Ryo suficiente?
    ↓
Desbloqueia personagem
    ↓
Existe vaga na equipe?
    ↓ sim
Entra automaticamente na equipe
```

Se os 3 slots estiverem ocupados, o personagem fica desbloqueado e pode ser colocado manualmente depois.

---

## 14. Como zerar o progresso durante testes

Abra o Console do navegador e use:

```js
localStorage.removeItem('neo_codex_save_v5');
location.reload();
```

Isso volta o jogo ao estado inicial.

---

## 15. Regra de ouro para adicionar conteúdo

Tente manter cada conteúdo em seu arquivo de dados:

```text
Personagem → characters.js
Inimigo → enemies.js
Capítulo → chapters.js
Missão → missions.js
Aula → lessons.js
Sprite → assets/
```

Evite colocar dados diretamente em `main.js`. O `main.js` deve cuidar da interface e chamar os sistemas.

---

## 16. Como criar uma nova linguagem como personagem

Pense primeiro na linguagem real e transforme suas características em fantasia RPG.

| Linguagem | Ideias de classe/skills |
|---|---|
| JavaScript | eventos, async, callbacks, execução dinâmica |
| Python | automação, análise, clareza, suporte |
| CSS | ilusões, camadas, transformação, controle visual |
| SQL | investigação, consultas, filtros, dados |
| C# | estrutura, tipagem, arquitetura, defesa |
| C/C++ | baixo nível, velocidade, dano físico/máquina |
| Rust | segurança de memória, resistência, prevenção de falhas |
| Java | portabilidade, arquitetura, sistemas grandes |
| Go | concorrência, rede, serviços |
| HTML | estrutura, construção, criação de campos |

O objetivo é que o personagem ensine programação através da fantasia, em vez de só usar o nome da linguagem como skin.
