const KEY='neo_codex_save_v5';
const DEFAULT={money:1200,unlocked:['javascript'],team:['javascript'],completed:[],chapterProgress:0};
export function load(){try{return {...DEFAULT,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return {...DEFAULT}}}
export function save(s){localStorage.setItem(KEY,JSON.stringify(s));return s}
export function reset(){localStorage.removeItem(KEY);location.reload()}
