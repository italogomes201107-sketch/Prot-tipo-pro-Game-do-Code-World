import {damage} from './damage.js';

export class Battle{
  constructor(team,enemies,cb){
    this.team=team.map(x=>({...x,hpNow:x.hp,enNow:25,shield:0,guard:false,buffs:[]}));
    this.enemies=enemies.map(x=>({...x,hpNow:x.hp,shield:0,guard:false,buffs:[]}));
    this.active=0; this.target=0; this.targets=[0]; this.pendingSkill=null; this.selectedSkill=0; this.round=1; this.phase='player'; this.acted=new Set(); this.cb=cb;
    this.say('RODADA 1 — escolha um personagem, uma habilidade e o(s) alvo(s).');
  }
  say(msg,event=null){this.lastEvent=event;this.cb(this,msg)}
  actor(){return this.team[this.active]}
  aliveTeam(){return this.team.filter(x=>x.hpNow>0)}
  aliveEnemies(){return this.enemies.filter(x=>x.hpNow>0)}
  switch(i){
    if(this.phase!=='player'||!this.team[i]||this.team[i].hpNow<=0)return;
    this.active=i;
    this.say(`Turno de ${this.team[i].name}.`);
  }
  targetEnemy(i){
    if(this.phase!=='player'||!this.enemies[i]||this.enemies[i].hpNow<=0)return;
    this.target=i;
    if(this.targets.includes(i)) this.targets=this.targets.filter(x=>x!==i); else this.targets.push(i);
    if(!this.targets.length)this.targets=[i];
    this.say(`Alvos: ${this.targets.map(x=>this.enemies[x].name).join(', ')}.`);
  }
  setSingleTarget(i){this.target=i;this.targets=[i]}
  nextActor(){
    const next=this.team.findIndex((x,i)=>x.hpNow>0&&!this.acted.has(i));
    if(next>=0){this.active=next;return true}
    return false;
  }
  targetsFor(skill){
    if(skill.targetMode==='all')return this.aliveEnemies();
    if(skill.targetMode==='single')return this.enemies[this.target]&&this.enemies[this.target].hpNow>0?[this.enemies[this.target]]:[];
    if(skill.targetMode==='multi')return this.targets.map(i=>this.enemies[i]).filter(Boolean).filter(x=>x.hpNow>0).slice(0,skill.maxTargets||2);
    return [];
  }
  alliesFor(skill){
    if(skill.targetMode==='ally')return [this.team[this.active]];
    if(skill.targetMode==='multiAlly')return this.team.filter(x=>x.hpNow>0).slice(0,skill.maxTargets||2);
    return [];
  }
  use(i){
    if(this.phase!=='player')return;
    const a=this.actor(),s=a.skills[i];
    if(!s||a.hpNow<=0||this.acted.has(this.active))return;
    if(a.enNow<s.cost){this.say('Energia insuficiente. Ataques básicos e DEFENDER recuperam ⚡.');return}
    if(s.targetMode==='multi' && this.targets.length<1){this.say('Escolha pelo menos um alvo.');return}
    a.enNow-=s.cost;
    let messages=[],fx=[];
    if(s.targetMode==='self'){
      if(s.buff)this.applyBuff(a,s.buff);
      if(s.shield)a.shield=s.shield;
      messages.push(`${a.name} ativou ${s.name}.`);
      fx.push({type:'self',teamIndex:this.active});
    }else if(s.targetMode==='team'){
      this.aliveTeam().forEach(x=>x.shield=Math.max(x.shield,s.teamShield));
      messages.push(`${a.name} levantou uma barreira para toda a equipe.`);
      fx.push({type:'teamShield'});
    }else if(s.targetMode==='ally'||s.targetMode==='multiAlly'){
      const allies=this.alliesFor(s);
      if(s.heal)allies.forEach(x=>{const before=x.hpNow;x.hpNow=Math.min(x.hp,x.hpNow+Math.floor(x.hp*s.heal));messages.push(`${x.name} recuperou ${x.hpNow-before} HP.`);fx.push({type:'heal',teamIndex:this.team.indexOf(x)})});
      if(s.buff)allies.forEach(x=>this.applyBuff(x,s.buff));
    }else{
      const ts=this.targetsFor(s);
      ts.forEach(t=>{
        const d=damage(a,t,s);let final=d;
        if(t.shield){final=Math.floor(d*(1-t.shield));t.shield=0}
        t.hpNow=Math.max(0,t.hpNow-final);
        if(s.status==='vulnerable')t.buffs.push({type:'vulnerable',turns:1});
        if(s.debuff)this.applyBuff(t,{...s.debuff,type:'debuff'});
        messages.push(`${a.name} usou ${s.name} em ${t.name}: -${final} HP`);
        fx.push({type:'attack',teamIndex:this.active,enemyIndex:this.enemies.indexOf(t),damage:final});
      });
      if(s.energyGain)a.enNow=Math.min(100,a.enNow+s.energyGain);
    }
    this.acted.add(this.active);
    this.say(messages.join(' '),fx);
    if(this.aliveEnemies().length===0){this.phase='victory';this.say('VITÓRIA — setor liberado.',{type:'victory'});return}
    if(this.nextActor()){
      this.phase='player';this.say(`${this.team[this.active].name} está pronto para agir.`);return;
    }
    this.enemyPhase();
  }
  applyBuff(target,buff){
    target.buffs=target.buffs.filter(b=>b.stat!==buff.stat||b.type!==buff.type);
    target.buffs.push({...buff});
  }
  stat(unit,key){
    let value=unit[key];
    unit.buffs.filter(b=>b.stat===key).forEach(b=>value*=1-(b.type==='debuff'?b.percent:-b.percent));
    return value;
  }
  defend(){
    if(this.phase!=='player')return;const a=this.actor();if(this.acted.has(this.active))return;
    a.guard=true;a.enNow=Math.min(100,a.enNow+20);this.acted.add(this.active);
    this.say(`${a.name} defendeu e recuperou 20⚡.`,{type:'guard',teamIndex:this.active});
    if(this.nextActor())return;
    this.enemyPhase();
  }
  enemyPhase(){
    this.phase='enemy';this.say('A IA está respondendo...');
    setTimeout(()=>this.enemyTurn(),650);
  }
  enemyTurn(){
    if(!this.aliveTeam().length){this.phase='defeat';this.say('DERROTA — a equipe caiu.');return}
    const enemies=this.aliveEnemies();let fx=[];
    enemies.forEach((e,idx)=>{
      const targets=this.aliveTeam();if(!targets.length)return;
      const t=targets[Math.floor(Math.random()*targets.length)];
      const s=e.skills[Math.floor(Math.random()*e.skills.length)];
      let d=damage(e,t,s);if(t.guard)d=Math.floor(d*.4);if(t.shield){d=Math.floor(d*(1-t.shield));t.shield=0}
      t.hpNow=Math.max(0,t.hpNow-d);t.guard=false;fx.push({type:'enemyAttack',enemyIndex:this.enemies.indexOf(e),teamIndex:this.team.indexOf(t),damage:d});
    });
    this.team.forEach(x=>{if(x.hpNow>0)x.enNow=Math.min(100,x.enNow+12);x.buffs=x.buffs.map(b=>({...b,turns:b.turns-1})).filter(b=>b.turns>0)});
    this.enemies.forEach(x=>x.buffs=x.buffs.map(b=>({...b,turns:b.turns-1})).filter(b=>b.turns>0));
    this.acted.clear();this.round++;this.phase='player';
    const next=this.team.findIndex(x=>x.hpNow>0);if(next>=0)this.active=next;
    if(!this.aliveTeam().length){this.phase='defeat';this.say('DERROTA — a equipe caiu.',{type:'defeat'});return}
    this.targets=this.aliveEnemies().length?[this.aliveEnemies().map(x=>this.enemies.indexOf(x))[0]]:[];
    this.say(`RODADA ${this.round} — todos os aliados podem agir novamente.`,fx);
  }
}
