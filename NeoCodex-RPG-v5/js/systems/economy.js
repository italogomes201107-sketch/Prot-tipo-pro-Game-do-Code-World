import {load,save} from './save.js';
export function buy(id,cost){const s=load();if(s.unlocked.includes(id))return[false,'Você já desbloqueou esta linguagem.'];if(s.money<cost)return[false,'Ryo insuficiente.'];s.money-=cost;s.unlocked.push(id);const added=s.team.length<3;if(added)s.team.push(id);save(s);return[true,added?'Linguagem desbloqueada e adicionada automaticamente à equipe!':'Linguagem desbloqueada! A equipe já estava cheia.']}
export function addMoney(v){const s=load();s.money+=v;save(s);return s.money}
