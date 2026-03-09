"use client";
import { useState, useEffect } from "react";

const COLORS = [
  { dot: "#F2E2A4" },
  { dot: "#73FBF9" },
  { dot: "#D4C478" },
  { dot: "#000E37" },
  { dot: "#F2E2A4" },
  { dot: "#73FBF9" },
  { dot: "#D4C478" },
  { dot: "#000E37" },
  { dot: "#F2E2A4" },
  { dot: "#73FBF9" },
];

const DEFAULT_DATA = {
  categories: ["Promotores de conciertos","Festivales de música","Artistas","Giras (participamos)","Agencias de Management y Booking","Empresa musical (sello, editorial, productora)","Salas y clubs","Asociaciones e instituciones","Otros"],
  clients: [
    {id:1,name:"Medusa/Zevra Festival",category:"Promotores de conciertos",servicios:["Fiscal"]},
    {id:2,name:"Intromethod (CCME)",category:"Promotores de conciertos",servicios:["Legal","Procedimiento judicial"]},
    {id:3,name:"Top Concerts",category:"Promotores de conciertos",servicios:["Legal"]},
    {id:4,name:"Rhapsody",category:"Promotores de conciertos",servicios:["Fiscal","Laboral"]},
    {id:5,name:"In&Out",category:"Promotores de conciertos",servicios:["Fiscal","Contabilidad"]},
    {id:6,name:"SN Systema",category:"Promotores de conciertos",servicios:["Legal"]},
    {id:7,name:"Ibizenco",category:"Promotores de conciertos",servicios:["Legal"]},
    {id:8,name:"Santos y Familia / SyS",category:"Promotores de conciertos",servicios:["Fiscal","Laboral","Legal","Procedimiento judicial"]},
    {id:9,name:"Lapsus",category:"Promotores de conciertos",servicios:["Fiscal","Laboral"]},
    {id:100,name:"Mundo Acorde",category:"Promotores de conciertos",servicios:["Legal"]},
    {id:101,name:"Paradigma",category:"Promotores de conciertos",servicios:["Legal"]},
    {id:102,name:"Jackies Music",category:"Promotores de conciertos",servicios:["Fiscal","Laboral","Legal"]},
    {id:10,name:"Medusa Festival",category:"Festivales de música",promotor:"Medusa/Zevra Festival",servicios:[]},
    {id:11,name:"Zevra Festival",category:"Festivales de música",promotor:"Medusa/Zevra Festival",servicios:[]},
    {id:12,name:"Coca-Cola Music Experience",category:"Festivales de música",promotor:"Intromethod (CCME)",servicios:[]},
    {id:13,name:"Bella Festival",category:"Festivales de música",promotor:"Mundo Acorde",servicios:["Legal"]},
    {id:14,name:"Oasis Sound",category:"Festivales de música",promotor:"Paradigma",servicios:["Fiscal","Legal"]},
    {id:15,name:"Fury y Jackies Music Electronic Fest",category:"Festivales de música",promotor:"Jackies Music",servicios:[]},
    {id:16,name:"Rototom",category:"Festivales de música",promotor:null,servicios:["Legal"]},
    {id:17,name:"Z Live Rock Fest",category:"Festivales de música",promotor:null,servicios:["Fiscal"]},
    {id:18,name:"Share Festival",category:"Festivales de música",promotor:null,servicios:[]},
    {id:19,name:"Cooltural",category:"Festivales de música",promotor:null,servicios:[]},
    {id:20,name:"Andalucía Salvaje",category:"Festivales de música",promotor:null,servicios:[]},
    {id:21,name:"Sonoramex",category:"Festivales de música",promotor:null,servicios:[]},
    {id:22,name:"Sonorama Goes to Ibiza",category:"Festivales de música",promotor:null,servicios:[]},
    {id:23,name:"Festival Mas i Mas",category:"Festivales de música",promotor:null,servicios:["Legal"]},
    {id:24,name:"Sound Isidro",category:"Festivales de música",promotor:null,servicios:[]},
    {id:25,name:"Festival Planeta Sound",category:"Festivales de música",promotor:null,servicios:[]},
    {id:26,name:"Infierno Festival",category:"Festivales de música",promotor:null,servicios:[]},
    {id:27,name:"El Bosque Sonoro",category:"Festivales de música",promotor:null,servicios:[]},
    {id:30,name:"Judeline",category:"Artistas",agencia:null,servicios:["Fiscal","Contabilidad","Administración","Laboral"]},
    {id:31,name:"Amparanoia",category:"Artistas",agencia:null,servicios:["Fiscal","Contabilidad"]},
    {id:32,name:"La Raíz",category:"Artistas",agencia:null,servicios:["Fiscal","Contabilidad"]},
    {id:33,name:"Barry B",category:"Artistas",agencia:"El Rugido",servicios:["Fiscal","Contabilidad"]},
    {id:34,name:"Hard GZ",category:"Artistas",agencia:null,servicios:["Fiscal integral","Legal integral"]},
    {id:35,name:"Sexy Zebras",category:"Artistas",agencia:null,servicios:["Fiscal","Contabilidad"]},
    {id:36,name:"La M.O.D.A.",category:"Artistas",agencia:null,servicios:["Fiscal","Contabilidad","Administración","Laboral"]},
    {id:37,name:"Sanguijuelas del Guadiana",category:"Artistas",agencia:null,servicios:["Fiscal","Business Management"]},
    {id:38,name:"Víctor Martínez",category:"Artistas",agencia:null,servicios:["Legal","Rights Management"]},
    {id:39,name:"Kiddo",category:"Artistas",agencia:null,servicios:["Business Management","Procedimiento judicial"]},
    {id:40,name:"Zetak Mitoaroa I, II, III",category:"Artistas",agencia:"Panda Artist",servicios:["Legal"]},
    {id:41,name:"DELLAFUENTE",category:"Artistas",agencia:null,servicios:["Fiscal","Contabilidad","Administración","Legal","Laboral"]},
    {id:42,name:"Los Planetas",category:"Artistas",agencia:null,servicios:["Fiscal","Laboral"]},
    {id:43,name:"Natalia Lacunza",category:"Artistas",agencia:null,servicios:["Legal"]},
    {id:44,name:"Rosalía",category:"Artistas",agencia:null,servicios:["Legal"]},
    {id:45,name:"Sohaib",category:"Artistas",agencia:null,servicios:["Fiscal"]},
    {id:46,name:"Cervatana",category:"Artistas",agencia:null,servicios:["Legal"]},
    {id:47,name:"Bandanera",category:"Artistas",agencia:null,servicios:["Fiscal","Legal"]},
    {id:48,name:"Niña Polaca",category:"Artistas",agencia:null,servicios:["Fiscal"]},
    {id:49,name:"The Iconics (Asier Cerezo)",category:"Artistas",agencia:null,servicios:["Fiscal"]},
    {id:103,name:"Lex C",category:"Artistas",agencia:null,servicios:["Fiscal"]},
    {id:104,name:"De la Ría",category:"Artistas",agencia:null,servicios:["Legal","Marca"]},
    {id:105,name:"Carlos Marco",category:"Artistas",agencia:null,servicios:["Legal"]},
    {id:106,name:"Salvi Vila",category:"Artistas",agencia:null,servicios:["Legal"]},
    {id:107,name:"Sandrazz (Sandra Ruiz)",category:"Artistas",agencia:null,servicios:["Legal"]},
    {id:108,name:"Lagartija Nick",category:"Artistas",agencia:null,servicios:["Legal"]},
    {id:109,name:"Alejandra Restrepo",category:"Artistas",agencia:null,servicios:["Fiscal","Laboral"]},
    {id:110,name:"Antonio VG (Er Perche)",category:"Artistas",agencia:null,servicios:["Fiscal"]},
    {id:111,name:"Marc Costa",category:"Artistas",agencia:null,servicios:["Fiscal"]},
    {id:112,name:"Chupy",category:"Artistas",agencia:null,servicios:["Procedimiento judicial"]},
    {id:113,name:"Urs Buhler (Il Divo)",category:"Artistas",agencia:null,servicios:["Legal"]},
    {id:114,name:"Sergio Pastor",category:"Artistas",agencia:null,servicios:["Fiscal"]},
    {id:115,name:"Arturo Paniagua",category:"Artistas",agencia:null,servicios:["Fiscal"]},
    {id:116,name:"David Hidalgo",category:"Artistas",agencia:null,servicios:["Fiscal"]},
    {id:117,name:"Guillermo Orrico",category:"Artistas",agencia:null,servicios:["Procedimiento judicial"]},
    {id:118,name:"Deva (Sac Barrios)",category:"Artistas",agencia:null,servicios:["Legal"]},
    {id:119,name:"Rico Rosa (Sac Barrios)",category:"Artistas",agencia:null,servicios:["Legal"]},
    {id:50,name:"Katy Perry",category:"Giras (participamos)",agencia:null,servicios:[]},
    {id:51,name:"Shawn Mendes",category:"Giras (participamos)",agencia:null,servicios:[]},
    {id:52,name:"Yerai Cortés",category:"Giras (participamos)",agencia:null,servicios:[]},
    {id:53,name:"María Becerra",category:"Giras (participamos)",agencia:null,servicios:[]},
    {id:54,name:"Carolina Durante",category:"Giras (participamos)",agencia:null,servicios:[]},
    {id:55,name:"Rosario Flores",category:"Giras (participamos)",agencia:null,servicios:[]},
    {id:56,name:"Amaral",category:"Giras (participamos)",agencia:null,servicios:[]},
    {id:57,name:"Bustamante",category:"Giras (participamos)",agencia:null,servicios:[]},
    {id:58,name:"Antonio Orozco",category:"Giras (participamos)",agencia:null,servicios:[]},
    {id:59,name:"Alba Reche",category:"Giras (participamos)",agencia:null,servicios:[]},
    {id:60,name:"Pablo López",category:"Giras (participamos)",agencia:null,servicios:[]},
    {id:61,name:"Morad",category:"Giras (participamos)",agencia:"Polar",servicios:[]},
    {id:62,name:"La Zowi",category:"Giras (participamos)",agencia:"Polar",servicios:[]},
    {id:70,name:"Polar",category:"Agencias de Management y Booking",servicios:["Fiscal","Contabilidad","Legal","Procedimiento judicial"]},
    {id:71,name:"El Rugido",category:"Agencias de Management y Booking",servicios:["Fiscal","Laboral"]},
    {id:72,name:"HFMN Crew",category:"Agencias de Management y Booking",servicios:["Fiscal"]},
    {id:73,name:"Right Method",category:"Agencias de Management y Booking",servicios:["Legal"]},
    {id:74,name:"BCA Music",category:"Agencias de Management y Booking",servicios:["Legal"]},
    {id:75,name:"Bolt Music",category:"Agencias de Management y Booking",servicios:["Procedimiento judicial"]},
    {id:76,name:"UVE",category:"Agencias de Management y Booking",servicios:["Procedimiento judicial"]},
    {id:77,name:"Panda Artist",category:"Agencias de Management y Booking",servicios:["Legal"]},
    {id:78,name:"Crash Music",category:"Agencias de Management y Booking",servicios:["Legal","Procedimiento judicial","Laboral"]},
    {id:80,name:"Lowlight Music",category:"Empresa musical (sello, editorial, productora)",servicios:["Fiscal"]},
    {id:81,name:"Charco Música",category:"Empresa musical (sello, editorial, productora)",servicios:["Fiscal"]},
    {id:82,name:"Sira Música",category:"Empresa musical (sello, editorial, productora)",servicios:["Fiscal","Laboral"]},
    {id:83,name:"Schubert Music Publishing",category:"Empresa musical (sello, editorial, productora)",servicios:["Fiscal","Contabilidad"]},
    {id:84,name:"Rocketbeat Records",category:"Empresa musical (sello, editorial, productora)",servicios:["Legal"]},
    {id:85,name:"Vanana Records",category:"Empresa musical (sello, editorial, productora)",servicios:["Legal"]},
    {id:86,name:"Anatomía del Sonido",category:"Empresa musical (sello, editorial, productora)",servicios:["Fiscal"]},
    {id:87,name:"Sonorama Producciones",category:"Empresa musical (sello, editorial, productora)",servicios:["Legal"]},
    {id:88,name:"Dientes de Bala / Caníbal",category:"Empresa musical (sello, editorial, productora)",servicios:["Fiscal","Laboral","Legal"]},
    {id:90,name:"Antídoto Club",category:"Salas y clubs",servicios:["Fiscal","Financiero","Legal"]},
    {id:91,name:"APM",category:"Asociaciones e instituciones",servicios:["Legal"]},
    {id:92,name:"Navarra Music Commission",category:"Asociaciones e instituciones",servicios:["Legal"]},
    {id:93,name:"Fundación Orquesta y Coro Com Madrid",category:"Asociaciones e instituciones",servicios:["Legal"]},
    {id:94,name:"Red Bull",category:"Asociaciones e instituciones",servicios:["Consultoría"]},
    {id:95,name:"Ayuntamiento Zaragoza",category:"Asociaciones e instituciones",servicios:["Legal"]},
    {id:120,name:"The Game Kitchen (videojuegos)",category:"Otros",servicios:["Legal"]},
    {id:121,name:"Xceed (ticketing)",category:"Otros",servicios:["Procedimiento judicial"]},
    {id:122,name:"Grupo Run Run",category:"Otros",servicios:["Legal"]},
    {id:123,name:"Cazorla Alcón",category:"Otros",servicios:["Fiscal","Laboral"]},
    {id:124,name:"Hermes Mk",category:"Otros",servicios:["Fiscal","Contabilidad"]},
    {id:125,name:"Lunisao / Recyclaje",category:"Otros",servicios:["Fiscal"]},
    {id:126,name:"Francisco Taibo",category:"Otros",servicios:["Fiscal"]},
    {id:127,name:"Eduardo Segura",category:"Otros",servicios:["Legal"]},
    {id:128,name:"Rodolfo De la Fuente",category:"Otros",servicios:["Legal"]},
    {id:129,name:"Ana Escribano Taboada",category:"Otros",servicios:["Legal"]},
    {id:130,name:"Nuria Net",category:"Otros",servicios:["Fiscal"]},
    {id:131,name:"Vincent Esclusá",category:"Otros",servicios:["Fiscal"]},
    {id:132,name:"María Talaverano Valverde",category:"Otros",servicios:["Fiscal"]},
    {id:133,name:"Jesús Olivares Heredia",category:"Otros",servicios:["Fiscal"]},
    {id:134,name:"Mario Diaz",category:"Otros",servicios:["Legal"]},
  ],
};

const SVC_COLORS = {"Fiscal":"#F2E2A4","Contabilidad":"#D4C478","Legal":"#73FBF9","Laboral":"#8B5CF6","Procedimiento judicial":"#EF4444","Administración":"#F59E0B","Business Management":"#10B981","Consultoría":"#EC4899","Financiero":"#3B82F6","Fiscal integral":"#F2E2A4","Legal integral":"#73FBF9","Rights Management":"#06B6D4","Marca":"#F97316"};
const SVC_LIST=["Fiscal","Contabilidad","Legal","Laboral","Administración","Business Management","Procedimiento judicial","Financiero","Consultoría","Fiscal integral","Legal integral","Rights Management","Marca"];

function getStoredData(){if(typeof window==="undefined")return DEFAULT_DATA;try{const r=localStorage.getItem("sftl-v5");return r?JSON.parse(r):DEFAULT_DATA}catch{return DEFAULT_DATA}}
function storeData(d){try{localStorage.setItem("sftl-v5",JSON.stringify(d))}catch{}}

const Initials=({name})=>{const l=name.split(" ").map(w=>w[0]).filter(Boolean).join("").slice(0,2).toUpperCase();return<div style={{backgroundColor:"#1E1E1C",border:"1px solid #F2E2A433"}} className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"><span style={{color:"#F2E2A4"}}>{l}</span></div>};

export default function Home(){
  const[data,setData]=useState(null);
  const[search,setSearch]=useState("");
  const[filter,setFilter]=useState("Todas");
  const[svcFilter,setSvcFilter]=useState("Todos");
  const[showAdd,setShowAdd]=useState(false);
  const[showAddCat,setShowAddCat]=useState(false);
  const[newName,setNewName]=useState("");
  const[newCat,setNewCat]=useState("");
  const[newPromotor,setNewPromotor]=useState("");
  const[newAgencia,setNewAgencia]=useState("");
  const[newSvcs,setNewSvcs]=useState([]);
  const[newCatName,setNewCatName]=useState("");
  const[editId,setEditId]=useState(null);
  const[editName,setEditName]=useState("");
  const[editCat,setEditCat]=useState("");
  const[editProm,setEditProm]=useState("");
  const[editAg,setEditAg]=useState("");
  const[editSvcs,setEditSvcs]=useState([]);
  const[confirmDel,setConfirmDel]=useState(null);
  const[confirmDelCat,setConfirmDelCat]=useState(null);
  const[expId,setExpId]=useState(null);

  useEffect(()=>{setData(getStoredData())},[]);
  const save=d=>{setData(d);storeData(d)};
  const toggleSvc=(arr,setArr,s)=>arr.includes(s)?setArr(arr.filter(x=>x!==s)):setArr([...arr,s]);

  const addClient=()=>{if(!newName.trim()||!newCat)return;const c={id:Date.now(),name:newName.trim(),category:newCat,promotor:newCat==="Festivales de música"&&newPromotor?newPromotor:null,agencia:(newCat==="Artistas"||newCat==="Giras (participamos)")&&newAgencia?newAgencia:null,servicios:newSvcs};save({...data,clients:[...data.clients,c]});setNewName("");setNewCat("");setNewPromotor("");setNewAgencia("");setNewSvcs([]);setShowAdd(false)};
  const addCat=()=>{if(!newCatName.trim()||data.categories.includes(newCatName.trim()))return;save({...data,categories:[...data.categories,newCatName.trim()]});setNewCatName("");setShowAddCat(false)};
  const delClient=id=>{const cl=data.clients.find(c=>c.id===id);let u=data.clients.filter(c=>c.id!==id);if(cl&&cl.category==="Promotores de conciertos")u=u.map(c=>c.promotor===cl.name?{...c,promotor:null}:c);if(cl&&cl.category==="Agencias de Management y Booking")u=u.map(c=>c.agencia===cl.name?{...c,agencia:null}:c);save({...data,clients:u});setConfirmDel(null)};
  const delCat=cat=>{save({...data,categories:data.categories.filter(c=>c!==cat),clients:data.clients.filter(c=>c.category!==cat)});setConfirmDelCat(null)};
  const saveEdit=id=>{if(!editName.trim())return;const old=data.clients.find(c=>c.id===id);let u=data.clients.map(c=>{if(c.id===id)return{...c,name:editName.trim(),category:editCat||c.category,promotor:editCat==="Festivales de música"?(editProm||null):c.promotor,agencia:(editCat==="Artistas"||editCat==="Giras (participamos)")?(editAg||null):c.agencia,servicios:editSvcs};return c});if(old.category==="Promotores de conciertos"&&old.name!==editName.trim())u=u.map(c=>c.promotor===old.name?{...c,promotor:editName.trim()}:c);if(old.category==="Agencias de Management y Booking"&&old.name!==editName.trim())u=u.map(c=>c.agencia===old.name?{...c,agencia:editName.trim()}:c);save({...data,clients:u});setEditId(null)};

  if(!data)return<div style={{backgroundColor:"#1E1E1C"}} className="min-h-screen flex items-center justify-center"><p style={{color:"#F2E2A4"}}>Cargando...</p></div>;

  const cats=data.categories;
  const proms=data.clients.filter(c=>c.category==="Promotores de conciertos");
  const ags=data.clients.filter(c=>c.category==="Agencias de Management y Booking");
  const allSvcs=[...new Set(data.clients.flatMap(c=>c.servicios||[]))].sort();
  const filtered=data.clients.filter(c=>{const ms=c.name.toLowerCase().includes(search.toLowerCase());const mf=filter==="Todas"||c.category===filter;const msvc=svcFilter==="Todos"||((c.servicios||[]).includes(svcFilter));return ms&&mf&&msvc});
  const grouped={};cats.forEach(cat=>{grouped[cat]=[]});filtered.forEach(c=>{if(grouped[c.category])grouped[c.category].push(c)});
  const total=data.clients.length;
  const getLinked=c=>{if(c.category==="Promotores de conciertos")return data.clients.filter(x=>x.category==="Festivales de música"&&x.promotor===c.name);if(c.category==="Agencias de Management y Booking")return data.clients.filter(x=>(x.category==="Artistas"||x.category==="Giras (participamos)")&&x.agencia===c.name);return[]};
  const canExp=c=>c.category==="Promotores de conciertos"||c.category==="Agencias de Management y Booking";
  const showAg=cat=>cat==="Artistas"||cat==="Giras (participamos)";
  const showPr=cat=>cat==="Festivales de música";

  return(
    <div style={{backgroundColor:"#1E1E1C"}} className="min-h-screen">
      <div style={{backgroundColor:"#1E1E1C",borderBottom:"1px solid #2a2a28"}} className="sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between mb-1"><div><div className="flex items-center gap-3"><h1 style={{color:"#F2E2A4"}} className="text-2xl font-bold tracking-wide">SFTL</h1><span style={{color:"#73FBF9"}} className="text-2xl font-bold tracking-wide">INCENTIVA</span></div><p style={{color:"#F2E2A466"}} className="text-xs mt-0.5">Sympathy for the Lawyer</p></div></div>
          <div className="flex items-center justify-between mb-4 mt-3">
            <p style={{color:"#F2E2A488"}} className="text-sm">{total} clientes · {cats.length} categorías</p>
            <div className="flex gap-2">
              <button onClick={()=>setShowAddCat(true)} style={{borderColor:"#F2E2A433",color:"#F2E2A4"}} className="px-3 py-2 text-xs rounded-xl border hover:opacity-80 transition">+ Categoría</button>
              <button onClick={()=>{setShowAdd(true);setNewCat(cats[0]||"");setNewPromotor("");setNewAgencia("");setNewSvcs([])}} style={{backgroundColor:"#F2E2A4",color:"#1E1E1C"}} className="px-3 py-2 text-xs rounded-xl font-semibold hover:opacity-90 transition">+ Cliente</button>
            </div>
          </div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar cliente..." style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none placeholder-stone-500"/>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {["Todas",...cats].map(c=><button key={c} onClick={()=>setFilter(c)} style={filter===c?{backgroundColor:"#F2E2A4",color:"#1E1E1C"}:{backgroundColor:"#2a2a28",color:"#F2E2A488"}} className="px-3 py-1.5 text-xs rounded-full whitespace-nowrap transition font-medium hover:opacity-80">{c}</button>)}
          </div>
          <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
            {["Todos",...allSvcs].map(s=><button key={s} onClick={()=>setSvcFilter(s)} style={svcFilter===s?{backgroundColor:"#73FBF9",color:"#1E1E1C"}:{backgroundColor:"#2a2a28",color:"#73FBF988"}} className="px-2.5 py-1 text-xs rounded-full whitespace-nowrap transition font-medium hover:opacity-80">{s}</button>)}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {cats.filter(cat=>filter==="Todas"||filter===cat).map((cat,ci)=>{
          const col=COLORS[ci%COLORS.length];const clients=grouped[cat]||[];
          return(<div key={cat}>
            <div className="flex items-center justify-between mb-2 px-1"><div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor:col.dot}}/><span style={{color:"#F2E2A4"}} className="text-sm font-semibold">{cat}</span><span style={{backgroundColor:"#2a2a28",color:"#F2E2A4"}} className="text-xs px-2 py-0.5 rounded-full font-medium">{clients.length}</span></div><button onClick={()=>setConfirmDelCat(cat)} style={{color:"#F2E2A433"}} className="hover:text-red-400 transition text-xs">eliminar</button></div>
            {clients.length===0?<div style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38"}} className="rounded-2xl border p-6 text-center"><p style={{color:"#F2E2A444"}} className="text-sm">Sin clientes</p></div>:
            <div className="space-y-2">{clients.map(c=>{
              const ce=canExp(c);const linked=ce?getLinked(c):[];const isE=expId===c.id;const hasL=linked.length>0;
              return(<div key={c.id}>
                <div style={{backgroundColor:"#252523",borderColor:"#3a3a38"}} className={`rounded-2xl border p-3.5 hover:border-yellow-800 transition group ${ce&&hasL?"cursor-pointer":""}`} onClick={()=>ce&&hasL&&setExpId(isE?null:c.id)}>
                  {editId===c.id?
                    <div className="flex-1 space-y-2" onClick={e=>e.stopPropagation()}>
                      <div className="flex gap-2 items-center flex-wrap">
                        <input autoFocus value={editName} onChange={e=>setEditName(e.target.value)} style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="flex-1 min-w-0 px-3 py-1.5 rounded-lg border text-sm focus:outline-none" onKeyDown={e=>e.key==="Enter"&&saveEdit(c.id)}/>
                        <select value={editCat} onChange={e=>setEditCat(e.target.value)} style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="px-2 py-1.5 rounded-lg border text-sm focus:outline-none">{cats.map(ct=><option key={ct} value={ct}>{ct}</option>)}</select>
                      </div>
                      {showPr(editCat)&&<select value={editProm} onChange={e=>setEditProm(e.target.value)} style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="w-full px-2 py-1.5 rounded-lg border text-sm focus:outline-none"><option value="">Sin promotor</option>{proms.map(p=><option key={p.id} value={p.name}>{p.name}</option>)}</select>}
                      {showAg(editCat)&&<select value={editAg} onChange={e=>setEditAg(e.target.value)} style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="w-full px-2 py-1.5 rounded-lg border text-sm focus:outline-none"><option value="">Sin agencia</option>{ags.map(a=><option key={a.id} value={a.name}>{a.name}</option>)}</select>}
                      <div className="flex flex-wrap gap-1">{SVC_LIST.map(s=><button key={s} onClick={()=>toggleSvc(editSvcs,setEditSvcs,s)} style={editSvcs.includes(s)?{backgroundColor:SVC_COLORS[s]||"#F2E2A4",color:"#1E1E1C"}:{backgroundColor:"#2a2a28",color:"#F2E2A466"}} className="px-2 py-0.5 rounded-full text-xs transition">{s}</button>)}</div>
                      <div className="flex gap-2"><button onClick={()=>saveEdit(c.id)} style={{color:"#73FBF9"}} className="text-sm font-medium">Guardar</button><button onClick={()=>setEditId(null)} style={{color:"#F2E2A466"}} className="text-sm">Cancelar</button></div>
                    </div>
                  :
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <Initials name={c.name}/>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1 flex-wrap">
                            <span style={{color:"#F2E2A4"}} className="text-sm font-medium">{c.name}</span>
                            {c.promotor&&<span style={{backgroundColor:"#73FBF915",color:"#73FBF9"}} className="text-xs px-2 py-0.5 rounded-full font-medium">{c.promotor}</span>}
                            {c.agencia&&<span style={{backgroundColor:"#F2E2A415",color:"#F2E2A4"}} className="text-xs px-2 py-0.5 rounded-full font-medium">{c.agencia}</span>}
                          </div>
                          {(c.servicios||[]).length>0&&<div className="flex flex-wrap gap-1 mt-1">{c.servicios.map(s=><span key={s} style={{backgroundColor:(SVC_COLORS[s]||"#F2E2A4")+"22",color:SVC_COLORS[s]||"#F2E2A4"}} className="text-xs px-2 py-0.5 rounded-full">{s}</span>)}</div>}
                          {ce&&hasL&&<p style={{color:"#F2E2A444"}} className="text-xs mt-1">{linked.length} vinculado{linked.length!==1?"s":""}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {ce&&hasL&&<span style={{color:"#F2E2A444"}} className="text-xs mr-1">{isE?"▲":"▼"}</span>}
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition" onClick={e=>e.stopPropagation()}>
                          <button onClick={()=>{setEditId(c.id);setEditName(c.name);setEditCat(c.category);setEditProm(c.promotor||"");setEditAg(c.agencia||"");setEditSvcs(c.servicios||[])}} style={{color:"#F2E2A466"}} className="p-1.5 rounded-lg text-xs">editar</button>
                          <button onClick={()=>setConfirmDel(c.id)} style={{color:"#F2E2A433"}} className="p-1.5 rounded-lg hover:text-red-400 text-xs">borrar</button>
                        </div>
                      </div>
                    </div>
                  }
                </div>
                {ce&&isE&&hasL&&<div style={{borderColor:"#73FBF944"}} className="ml-6 mt-1 space-y-1 border-l-2 pl-3">{linked.map(f=><div key={f.id} style={{backgroundColor:"#73FBF910"}} className="rounded-xl px-3 py-2 flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{backgroundColor:"#73FBF9"}}/><span style={{color:"#73FBF9"}} className="text-sm">{f.name}</span></div><span style={{color:"#73FBF988"}} className="text-xs">{f.category}</span></div>)}</div>}
              </div>)})}</div>}
          </div>)
        })}
      </div>

      {showAdd&&<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={()=>setShowAdd(false)}><div style={{backgroundColor:"#252523",borderColor:"#3a3a38"}} className="rounded-2xl border p-6 w-full max-w-sm shadow-xl max-h-screen overflow-y-auto" onClick={e=>e.stopPropagation()}>
        <h2 style={{color:"#F2E2A4"}} className="text-lg font-bold mb-4">Nuevo cliente</h2>
        <input autoFocus value={newName} onChange={e=>setNewName(e.target.value)} placeholder="Nombre" style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="w-full px-4 py-2.5 rounded-xl border text-sm mb-3 focus:outline-none placeholder-stone-500"/>
        <select value={newCat} onChange={e=>{setNewCat(e.target.value);setNewPromotor("");setNewAgencia("")}} style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="w-full px-4 py-2.5 rounded-xl border text-sm mb-3 focus:outline-none">{cats.map(c=><option key={c} value={c}>{c}</option>)}</select>
        {showPr(newCat)&&proms.length>0&&<select value={newPromotor} onChange={e=>setNewPromotor(e.target.value)} style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="w-full px-4 py-2.5 rounded-xl border text-sm mb-3 focus:outline-none"><option value="">Sin promotor</option>{proms.map(p=><option key={p.id} value={p.name}>{p.name}</option>)}</select>}
        {showAg(newCat)&&ags.length>0&&<select value={newAgencia} onChange={e=>setNewAgencia(e.target.value)} style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="w-full px-4 py-2.5 rounded-xl border text-sm mb-3 focus:outline-none"><option value="">Sin agencia</option>{ags.map(a=><option key={a.id} value={a.name}>{a.name}</option>)}</select>}
        <p style={{color:"#F2E2A488"}} className="text-xs mb-2">Servicios:</p>
        <div className="flex flex-wrap gap-1 mb-4">{SVC_LIST.map(s=><button key={s} onClick={()=>toggleSvc(newSvcs,setNewSvcs,s)} style={newSvcs.includes(s)?{backgroundColor:SVC_COLORS[s]||"#F2E2A4",color:"#1E1E1C"}:{backgroundColor:"#2a2a28",color:"#F2E2A466"}} className="px-2.5 py-1 rounded-full text-xs transition">{s}</button>)}</div>
        <div className="flex gap-2"><button onClick={()=>setShowAdd(false)} style={{borderColor:"#3a3a38",color:"#F2E2A488"}} className="flex-1 px-4 py-2.5 rounded-xl border text-sm">Cancelar</button><button onClick={addClient} style={{backgroundColor:"#F2E2A4",color:"#1E1E1C"}} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold">Añadir</button></div>
      </div></div>}

      {showAddCat&&<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={()=>setShowAddCat(false)}><div style={{backgroundColor:"#252523",borderColor:"#3a3a38"}} className="rounded-2xl border p-6 w-full max-w-sm shadow-xl" onClick={e=>e.stopPropagation()}>
        <h2 style={{color:"#F2E2A4"}} className="text-lg font-bold mb-4">Nueva categoría</h2>
        <input autoFocus value={newCatName} onChange={e=>setNewCatName(e.target.value)} placeholder="Nombre" style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="w-full px-4 py-2.5 rounded-xl border text-sm mb-4 focus:outline-none placeholder-stone-500" onKeyDown={e=>e.key==="Enter"&&addCat()}/>
        <div className="flex gap-2"><button onClick={()=>setShowAddCat(false)} style={{borderColor:"#3a3a38",color:"#F2E2A488"}} className="flex-1 px-4 py-2.5 rounded-xl border text-sm">Cancelar</button><button onClick={addCat} style={{backgroundColor:"#F2E2A4",color:"#1E1E1C"}} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold">Crear</button></div>
      </div></div>}

      {confirmDel&&<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={()=>setConfirmDel(null)}><div style={{backgroundColor:"#252523",borderColor:"#3a3a38"}} className="rounded-2xl border p-6 w-full max-w-sm shadow-xl" onClick={e=>e.stopPropagation()}>
        <p style={{color:"#F2E2A4"}} className="text-sm mb-4">¿Eliminar este cliente?</p>
        <div className="flex gap-2"><button onClick={()=>setConfirmDel(null)} style={{borderColor:"#3a3a38",color:"#F2E2A488"}} className="flex-1 px-4 py-2.5 rounded-xl border text-sm">Cancelar</button><button onClick={()=>delClient(confirmDel)} className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium">Eliminar</button></div>
      </div></div>}

      {confirmDelCat&&<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={()=>setConfirmDelCat(null)}><div style={{backgroundColor:"#252523",borderColor:"#3a3a38"}} className="rounded-2xl border p-6 w-full max-w-sm shadow-xl" onClick={e=>e.stopPropagation()}>
        <p style={{color:"#F2E2A4"}} className="text-sm mb-4">¿Eliminar <strong>{confirmDelCat}</strong> y todos sus clientes?</p>
        <div className="flex gap-2"><button onClick={()=>setConfirmDelCat(null)} style={{borderColor:"#3a3a38",color:"#F2E2A488"}} className="flex-1 px-4 py-2.5 rounded-xl border text-sm">Cancelar</button><button onClick={()=>delCat(confirmDelCat)} className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium">Eliminar</button></div>
      </div></div>}
    </div>
  );
}
