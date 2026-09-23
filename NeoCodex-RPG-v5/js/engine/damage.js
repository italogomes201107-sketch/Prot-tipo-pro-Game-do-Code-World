export function damage(a,t,s){
  const raw=a.atk*(s.power||1)+(a.def*(s.defScaling||0));
  const targetDef=t.def*(1-(s.armorPen||0));
  let d=Math.max(1,Math.floor((raw-targetDef*.38)*(0.9+Math.random()*.2)));
  if(t.weakTo===a.id)d=Math.floor(d*1.5);
  if(t.buffs?.some(b=>b.type==='vulnerable'))d=Math.floor(d*1.2);
  return d;
}
