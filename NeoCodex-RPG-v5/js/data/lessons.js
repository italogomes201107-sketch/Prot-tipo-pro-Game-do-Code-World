export const LESSONS=[
{id:'js',lang:'JavaScript',title:'JavaScript — Eventos e lógica',intro:'JavaScript permite criar comportamento em páginas e aplicações. Nesta aula você vai praticar variáveis, condições, funções e eventos.',sections:[
{title:'1. Variáveis',text:'Use let quando o valor pode mudar e const quando a referência não deve ser reatribuída.',code:'let hp = 100;\nconst nome = "Runner";\nhp = hp - 20;\nconsole.log(nome, hp);'},
{title:'2. Condições',text:'if executa um bloco quando uma expressão é verdadeira. else trata o caminho alternativo.',code:'const energia = 40;\nif (energia >= 30) {\n  console.log("Skill liberada");\n} else {\n  console.log("Sem energia");\n}'},
{title:'3. Funções',text:'Funções agrupam uma ação reutilizável.',code:'function dano(atk, defesa) {\n  return Math.max(1, atk - defesa);\n}\nconsole.log(dano(100, 35));'}],activity:{type:'js',prompt:'Faça o console mostrar 120, que é 150 - 30.',starter:'const ataque = 150;\nconst defesa = 30;\n// complete aqui',answer:'console.log(ataque - defesa);'}},
{id:'py',lang:'Python',title:'Python — Pensamento analítico',intro:'Python é usado em automação, dados, scripts e IA. Você vai praticar variáveis, listas, loops e funções.',sections:[
{title:'1. Variáveis e listas',text:'A sintaxe é enxuta e permite representar coleções com listas.',code:'nome = "Python"\nlinguagens = ["Python", "JS", "CSS"]\nprint(linguagens[0])'},
{title:'2. Repetição',text:'for percorre itens de uma sequência.',code:'for linguagem in ["Python", "JS", "CSS"]:\n    print(linguagem)'},
{title:'3. Funções',text:'def cria uma função.',code:'def dano(ataque, defesa):\n    return max(1, ataque - defesa)\n\nprint(dano(100, 35))'}],activity:{type:'python',prompt:'Complete para imprimir 15 + 5. O navegador executará a atividade em um interpretador Python leve quando disponível.',starter:'resultado = 15 + 5\n# use print(...) aqui',answer:'print(resultado)'}},
{id:'css',lang:'CSS',title:'CSS — O mundo das ilusões',intro:'CSS controla apresentação, layout, transições e animações. Aqui a interface vira uma arma da personagem CSS.',sections:[
{title:'1. Seletores',text:'Um seletor escolhe quais elementos recebem regras.',code:'.card {\n  border: 1px solid #00e5ff;\n  padding: 20px;\n}'},
{title:'2. Flexbox',text:'display:flex organiza elementos em linha ou coluna.',code:'.team {\n  display: flex;\n  gap: 16px;\n  justify-content: center;\n}'},
{title:'3. Transformações',text:'transform permite mover, girar e escalar elementos.',code:'.runner:hover {\n  transform: translateY(-8px) scale(1.03);\n}'}],activity:{type:'css',prompt:'Faça o quadrado ficar vermelho e 120px de largura. Edite apenas o CSS.',starter:'.quadrado {\n  width: 80px;\n  height: 80px;\n  background: cyan;\n}',answer:'width: 120px;\nbackground: red;'}},
{id:'sql',lang:'SQL',title:'SQL — A linguagem dos dados',intro:'SQL permite consultar e organizar informações. Você vai aprender SELECT, WHERE e filtros.',sections:[
{title:'1. SELECT',text:'SELECT escolhe as colunas que serão retornadas.',code:'SELECT nome, nivel\nFROM personagens;'},
{title:'2. WHERE',text:'WHERE filtra as linhas.',code:'SELECT nome\nFROM personagens\nWHERE nivel >= 10;'},
{title:'3. Ordenação',text:'ORDER BY organiza o resultado.',code:'SELECT nome, nivel\nFROM personagens\nORDER BY nivel DESC;'}],activity:{type:'sql',prompt:'Qual comando consulta a tabela personagens?',starter:'SELECT nome\nFROM personagens\n-- complete se quiser filtrar',answer:'SELECT nome FROM personagens;'}},
{id:'cs',lang:'C#',title:'C# — Sistemas robustos',intro:'C# é usado em aplicações, jogos e sistemas. A aula apresenta tipos, classes e métodos.',sections:[
{title:'1. Tipos',text:'C# é fortemente tipado: a variável declara seu tipo.',code:'int hp = 100;\nstring nome = "C#";\nbool ativo = true;'},
{title:'2. Métodos',text:'Métodos encapsulam comportamento dentro de classes.',code:'int Dano(int ataque, int defesa)\n{\n    return Math.Max(1, ataque - defesa);\n}'},
{title:'3. Classes',text:'Classes agrupam estado e comportamento.',code:'class Runner\n{\n    public int HP = 100;\n}'}],activity:{type:'csharp',prompt:'Escreva uma expressão que represente HP inicial 100.',starter:'int hp = 0;\n// altere o valor',answer:'int hp = 100;'}}
];
