export const CLASSES={
 attacker:{name:'ATACANTE',desc:'Dano explosivo, velocidade e finalização.',why:'Tecnologias que executam tarefas e transformam eventos em ação.'},
 tank:{name:'TANQUE',desc:'HP, Defesa e proteção da equipe.',why:'Sistemas estruturados e resistentes a falhas.'},
 support:{name:'SUPORTE',desc:'Cura, buffs e geração de Energia.',why:'Automação e ferramentas que ampliam o potencial de outras pessoas.'},
 controller:{name:'CONTROLADOR',desc:'Debuffs, ilusões e manipulação de campo.',why:'Tecnologias que controlam apresentação, dados e fluxo.'}
};
export const CHARACTERS=[
{id:'javascript',name:'JavaScript',class:'attacker',rarity:4,cost:0,hp:900,atk:115,def:60,spd:100,lore:'O mensageiro da rede. Rápido, caótico e especialista em transformar eventos em ação.',skills:[
{name:'Console.log()',desc:'Ataque básico. Causa dano normal e recupera 8⚡.',power:1,cost:0,energyGain:8,targetMode:'single'},
{name:'Async Burst',desc:'Concentra processos assíncronos em um golpe brutal. Dano muito alto.',power:2,cost:35,targetMode:'single'},
{name:'Promise.all()',desc:'Dispara processos em paralelo contra até 2 inimigos escolhidos.',power:1.05,cost:30,targetMode:'multi',maxTargets:2},
{name:'Event Loop',desc:'Distorce a ordem dos eventos e recebe +25% SPD por 2 turnos.',buff:{stat:'spd',percent:.25,turns:2},cost:30,targetMode:'self'}]},
{id:'python',name:'Python',class:'support',rarity:4,cost:2400,hp:800,atk:88,def:72,spd:86,lore:'A analista da resistência. Clareza, automação e raciocínio são suas armas.',skills:[
{name:'print()',desc:'Ataque básico e recupera 10⚡.',power:.85,cost:0,energyGain:10,targetMode:'single'},
{name:'Function Boost',desc:'Aumenta ATK de um aliado em 35% por 2 turnos.',buff:{stat:'atk',percent:.35,turns:2},cost:30,targetMode:'ally'},
{name:'recover()',desc:'Cura um aliado em 30% do HP máximo.',heal:.30,cost:40,targetMode:'ally'},
{name:'map()',desc:'Aplica uma rotina em paralelo: cura até 2 aliados em 18%.',heal:.18,cost:45,targetMode:'multiAlly',maxTargets:2}]},
{id:'css',name:'CSS',class:'controller',rarity:5,cost:4200,hp:720,atk:100,def:58,spd:115,lore:'A ilusionista de Neo-Codex. Se o inimigo não confia no que vê, já perdeu metade da batalha.',skills:[
{name:'Style Shift',desc:'Ataque rápido que aplica Vulnerável: o alvo recebe +20% dano por 1 turno.',power:1.05,cost:0,status:'vulnerable',targetMode:'single'},
{name:'Ilusão de Layout',desc:'Distorce a interface e reduz o ATK do alvo em 35% por 2 turnos.',debuff:{stat:'atk',percent:.35,turns:2},cost:30,targetMode:'single'},
{name:'Grid Collapse',desc:'Colapsa duas camadas da arena e atinge até 2 inimigos.',power:1.2,cost:35,targetMode:'multi',maxTargets:2},
{name:'Cascade Break',desc:'Quebra camadas visuais e ignora 45% da Defesa. Dano elevado.',power:2.05,armorPen:.45,cost:50,targetMode:'single'}]},
{id:'csharp',name:'C#',class:'tank',rarity:5,cost:5600,hp:1350,atk:88,def:115,spd:55,lore:'O bastião da resistência. Estrutura, tipagem e arquitetura fazem dele um escudo contra o caos.',skills:[
{name:'Compile Guard',desc:'Ataque seguro e ganha +15% DEF por 2 turnos.',power:.9,buff:{stat:'def',percent:.15,turns:2},cost:0,targetMode:'single'},
{name:'Encapsulate',desc:'Cria um escudo que reduz o próximo dano recebido em 60%.',shield:.60,cost:35,targetMode:'self'},
{name:'System Overload',desc:'Converte parte da própria Defesa em dano. Golpe pesado.',power:1.65,defScaling:.4,cost:45,targetMode:'single'},
{name:'Interface Wall',desc:'Protege toda a equipe, reduzindo o próximo dano de cada aliado em 30%.',teamShield:.30,cost:55,targetMode:'team'}]},
{id:'sql',name:'SQL',class:'controller',rarity:4,cost:3500,hp:800,atk:105,def:68,spd:78,lore:'O investigador. Consulta dados, encontra padrões e expõe o que a IA tenta esconder.',skills:[
{name:'SELECT',desc:'Consulta um ponto fraco e causa dano moderado.',power:1.05,cost:0,targetMode:'single'},
{name:'SELECT *',desc:'Consulta todos os registros e causa dano leve em TODOS os inimigos.',power:.8,cost:35,targetMode:'all'},
{name:'WHERE Clause',desc:'Filtra a defesa do alvo: ignora 30% DEF neste ataque.',power:1.45,armorPen:.30,cost:25,targetMode:'single'},
{name:'DROP TABLE',desc:'Ataque de alto risco e altíssimo dano. Gasta 60⚡.',power:2.45,cost:60,targetMode:'single'}]}
];
