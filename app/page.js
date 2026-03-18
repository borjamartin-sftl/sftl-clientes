"use client";
import { useState, useEffect } from "react";

const COLORS=[{dot:"#F2E2A4"},{dot:"#73FBF9"},{dot:"#D4C478"},{dot:"#000E37"},{dot:"#F2E2A4"},{dot:"#73FBF9"},{dot:"#D4C478"},{dot:"#000E37"},{dot:"#F2E2A4"},{dot:"#73FBF9"}];
const SVC_COLORS={"Fiscal":"#F2E2A4","Contabilidad":"#D4C478","Legal":"#73FBF9","Laboral":"#8B5CF6","Procedimiento judicial":"#EF4444","Administración":"#F59E0B","Business Management":"#10B981","Consultoría":"#EC4899","Financiero":"#3B82F6","Fiscal integral":"#F2E2A4","Legal integral":"#73FBF9","Rights Management":"#06B6D4","Marca":"#F97316"};
const SVC_LIST=["Fiscal","Contabilidad","Legal","Laboral","Administración","Business Management","Procedimiento judicial","Financiero","Consultoría","Fiscal integral","Legal integral","Rights Management","Marca"];
const MANAGERS=["Pilar Aguilar","Javier Romero","Nicolás Chica","Irene Fuentes Holanda","Ángeles Lozano","Marisol Veliz","Cristina Sánchez"];

const DEFAULT_DATA={
categories:["Promotores de conciertos","Festivales de música","Artistas","Giras (participamos)","Agencias de Management y Booking","Empresa musical (sello, editorial, productora)","Salas y clubs","Asociaciones e instituciones","Otros"],
clients:[
{id:1,name:"Medusa/Zevra Festival",category:"Promotores de conciertos",servicios:["Fiscal"],manager:"Cristina Sánchez",loc:"C. Valenciana"},
{id:2,name:"Intromethod (CCME)",category:"Promotores de conciertos",servicios:["Legal","Procedimiento judicial"],manager:"Nicolás Chica",loc:"Madrid"},
{id:3,name:"Top Concerts",category:"Promotores de conciertos",servicios:["Legal"],manager:"",loc:""},
{id:4,name:"Rhapsody",category:"Promotores de conciertos",servicios:["Fiscal","Laboral"],manager:"",loc:""},
{id:5,name:"In&Out",category:"Promotores de conciertos",servicios:["Fiscal","Contabilidad"],manager:"Javier Romero",loc:"Madrid"},
{id:6,name:"SN Systema",category:"Promotores de conciertos",servicios:["Legal"],manager:"",loc:""},
{id:7,name:"Ibizenco",category:"Promotores de conciertos",servicios:["Legal"],manager:"",loc:""},
{id:8,name:"Santos y Familia / SyS",category:"Promotores de conciertos",servicios:["Fiscal","Laboral","Legal","Procedimiento judicial"],manager:"",loc:""},
{id:9,name:"Lapsus",category:"Promotores de conciertos",servicios:["Fiscal","Laboral"],manager:"",loc:""},
{id:100,name:"Mundo Acorde",category:"Promotores de conciertos",servicios:["Legal"],manager:"Pilar Aguilar",loc:"Madrid"},
{id:101,name:"Paradigma",category:"Promotores de conciertos",servicios:["Legal"],manager:"",loc:""},
{id:102,name:"Jackies Music",category:"Promotores de conciertos",servicios:["Fiscal","Laboral","Legal"],manager:"Pilar Aguilar",loc:"Cataluña"},
{id:200,name:"Dee Fest",category:"Promotores de conciertos",servicios:[],manager:"Nicolás Chica",loc:"Granada"},
{id:201,name:"Latitud Canarias",category:"Promotores de conciertos",servicios:[],manager:"Irene Fuentes Holanda",loc:"Islas Canarias"},
{id:202,name:"Ebrovision",category:"Promotores de conciertos",servicios:[],manager:"Ángeles Lozano",loc:"Castilla y León"},
{id:203,name:"Doctor Music",category:"Promotores de conciertos",servicios:[],manager:"Nicolás Chica",loc:"Cataluña"},
{id:204,name:"Sound Dealers",category:"Promotores de conciertos",servicios:[],manager:"Pilar Aguilar",loc:"Madrid"},
{id:205,name:"Oh Salvaje",category:"Promotores de conciertos",servicios:[],manager:"Irene Fuentes Holanda",loc:"Málaga"},
{id:206,name:"Gran Gala Flamenca",category:"Promotores de conciertos",servicios:[],manager:"Nicolás Chica",loc:"Cataluña"},
{id:207,name:"ABDM",category:"Promotores de conciertos",servicios:[],manager:"Irene Fuentes Holanda",loc:"Andalucía"},
{id:208,name:"El Hombre Music",category:"Promotores de conciertos",servicios:[],manager:"Ángeles Lozano",loc:"Castilla la Mancha"},
{id:209,name:"VID Festival",category:"Promotores de conciertos",servicios:[],manager:"Ángeles Lozano",loc:"Castilla la Mancha"},
{id:210,name:"Insomnia",category:"Promotores de conciertos",servicios:[],manager:"Nicolás Chica",loc:"Andalucía"},
{id:211,name:"El Garaje Producciones",category:"Promotores de conciertos",servicios:[],manager:"Javier Romero",loc:"Madrid"},
{id:212,name:"Bee Week",category:"Promotores de conciertos",servicios:[],manager:"Pilar Aguilar",loc:"Madrid"},
{id:213,name:"Why Not",category:"Promotores de conciertos",servicios:[],manager:"Pilar Aguilar",loc:"Cataluña"},
{id:214,name:"Cavea Producciones",category:"Promotores de conciertos",servicios:[],manager:"Irene Fuentes Holanda",loc:"Galicia"},
{id:215,name:"Cultura Emergente",category:"Promotores de conciertos",servicios:[],manager:"Pilar Aguilar",loc:"Castilla y León"},
{id:216,name:"Tala Producciones",category:"Promotores de conciertos",servicios:[],manager:"Javier Romero",loc:"Madrid"},
{id:217,name:"Reggaeboa Festival",category:"Promotores de conciertos",servicios:[],manager:"Nicolás Chica",loc:"Castilla y León"},
{id:218,name:"Cultura Periférica",category:"Promotores de conciertos",servicios:[],manager:"Nicolás Chica",loc:"Madrid"},
{id:219,name:"Hontzaprodukzioak",category:"Promotores de conciertos",servicios:[],manager:"Pilar Aguilar",loc:"Álava"},
{id:220,name:"Arrecife en Vivo",category:"Promotores de conciertos",servicios:[],manager:"Nicolás Chica",loc:"Islas Canarias"},
{id:221,name:"Madhouse HC",category:"Promotores de conciertos",servicios:[],manager:"Irene Fuentes Holanda",loc:"Cataluña"},
{id:222,name:"Madness Live",category:"Promotores de conciertos",servicios:[],manager:"Pilar Aguilar",loc:"Cataluña"},
{id:223,name:"Maelicum",category:"Promotores de conciertos",servicios:[],manager:"Javier Romero",loc:"Cantabria"},
{id:224,name:"Cero en Conducta",category:"Promotores de conciertos",servicios:[],manager:"Ángeles Lozano",loc:"C. Valenciana"},
{id:225,name:"Sons Producciones",category:"Promotores de conciertos",servicios:[],manager:"Pilar Aguilar",loc:"C. Valenciana"},
{id:226,name:"Muses Festival",category:"Promotores de conciertos",servicios:[],manager:"Pilar Aguilar",loc:"Cataluña"},
{id:227,name:"Panorama Producciones",category:"Promotores de conciertos",servicios:[],manager:"Nicolás Chica",loc:"Cataluña"},
{id:228,name:"Rootsound",category:"Promotores de conciertos",servicios:[],manager:"Irene Fuentes Holanda",loc:"Andalucía"},
{id:229,name:"Orquesta Carlos III",category:"Promotores de conciertos",servicios:[],manager:"Nicolás Chica",loc:"Madrid"},
{id:230,name:"Capla Festival",category:"Promotores de conciertos",servicios:[],manager:"Irene Fuentes Holanda",loc:"C. Valenciana"},
{id:231,name:"Impar Eventos",category:"Promotores de conciertos",servicios:[],manager:"Javier Romero",loc:"Madrid"},
{id:232,name:"Jaime Reyes Producciones",category:"Promotores de conciertos",servicios:[],manager:"Javier Romero",loc:"Extremadura"},
{id:233,name:"Undenvi (Zeid Fest Gaztea)",category:"Promotores de conciertos",servicios:[],manager:"Pilar Aguilar",loc:"Bizkaia"},
{id:234,name:"Polifonik Sound",category:"Promotores de conciertos",servicios:[],manager:"Nicolás Chica",loc:"Aragón"},
{id:235,name:"Ocho y Medio",category:"Promotores de conciertos",servicios:[],manager:"Pilar Aguilar",loc:"Madrid"},
{id:236,name:"Blackworks",category:"Promotores de conciertos",servicios:[],manager:"Pilar Aguilar",loc:"Madrid"},
{id:237,name:"Houston Party",category:"Promotores de conciertos",servicios:[],manager:"Ángeles Lozano",loc:"Cataluña"},
{id:238,name:"Jimmy Jazz",category:"Promotores de conciertos",servicios:[],manager:"Nicolás Chica",loc:"Álava"},
{id:239,name:"Entzun",category:"Promotores de conciertos",servicios:[],manager:"Nicolás Chica",loc:"Álava"},
{id:240,name:"Camera Musicae",category:"Promotores de conciertos",servicios:[],manager:"Pilar Aguilar",loc:"Cataluña"},
{id:241,name:"La Barriga Producciones",category:"Promotores de conciertos",servicios:[],manager:"Pilar Aguilar",loc:"Madrid"},
{id:242,name:"Front of House",category:"Promotores de conciertos",servicios:[],manager:"Irene Fuentes Holanda",loc:"Madrid"},
{id:243,name:"La Vendición Live",category:"Promotores de conciertos",servicios:[],manager:"Irene Fuentes Holanda",loc:"Andalucía"},
{id:244,name:"PPL United",category:"Promotores de conciertos",servicios:[],manager:"Nicolás Chica",loc:"Cataluña"},
{id:245,name:"Festival Telecogresca",category:"Promotores de conciertos",servicios:[],manager:"Irene Fuentes Holanda",loc:"Cataluña"},
{id:10,name:"Medusa Festival",category:"Festivales de música",promotor:"Medusa/Zevra Festival",servicios:[],manager:"Cristina Sánchez",loc:"C. Valenciana"},
{id:11,name:"Zevra Festival",category:"Festivales de música",promotor:"Medusa/Zevra Festival",servicios:[],manager:"Cristina Sánchez",loc:"C. Valenciana"},
{id:12,name:"Coca-Cola Music Experience",category:"Festivales de música",promotor:"Intromethod (CCME)",servicios:[],manager:"Nicolás Chica",loc:"Madrid"},
{id:13,name:"Bella Festival",category:"Festivales de música",promotor:"Mundo Acorde",servicios:["Legal"],manager:"Pilar Aguilar",loc:"Andalucía"},
{id:14,name:"Oasis Sound",category:"Festivales de música",promotor:"Paradigma",servicios:["Fiscal","Legal"],manager:"",loc:""},
{id:15,name:"Fury y Jackies Music Electronic Fest",category:"Festivales de música",promotor:"Jackies Music",servicios:[],manager:"Pilar Aguilar",loc:"Cataluña"},
{id:16,name:"Rototom",category:"Festivales de música",promotor:null,servicios:["Legal"],manager:"",loc:""},
{id:17,name:"Z Live Rock Fest",category:"Festivales de música",promotor:null,servicios:["Fiscal"],manager:"Pilar Aguilar",loc:"Aragón"},
{id:18,name:"Share Festival",category:"Festivales de música",promotor:null,servicios:[],manager:"",loc:""},
{id:19,name:"Cooltural",category:"Festivales de música",promotor:null,servicios:[],manager:"",loc:""},
{id:20,name:"Andalucía Salvaje",category:"Festivales de música",promotor:null,servicios:[],manager:"",loc:""},
{id:21,name:"Sonoramex",category:"Festivales de música",promotor:null,servicios:[],manager:"",loc:""},
{id:22,name:"Sonorama Goes to Ibiza",category:"Festivales de música",promotor:null,servicios:[],manager:"",loc:""},
{id:23,name:"Festival Mas i Mas",category:"Festivales de música",promotor:null,servicios:["Legal"],manager:"Javier Romero",loc:"Cataluña"},
{id:24,name:"Sound Isidro",category:"Festivales de música",promotor:null,servicios:[],manager:"Irene Fuentes Holanda",loc:"Madrid"},
{id:25,name:"Festival Planeta Sound",category:"Festivales de música",promotor:null,servicios:[],manager:"Pilar Aguilar",loc:"Ponferrada"},
{id:26,name:"Infierno Festival",category:"Festivales de música",promotor:"La Vendición Live",servicios:[],manager:"Irene Fuentes Holanda",loc:"Andalucía"},
{id:27,name:"El Bosque Sonoro",category:"Festivales de música",promotor:null,servicios:[],manager:"Pilar Aguilar",loc:"Aragón"},
{id:300,name:"B Side",category:"Festivales de música",promotor:"Crash Music",servicios:[],manager:"Nicolás Chica",loc:"Andalucía"},
{id:301,name:"Noches del Camino",category:"Festivales de música",promotor:"Crash Music",servicios:[],manager:"Nicolás Chica",loc:"Andalucía"},
{id:302,name:"Festival Contemporánea",category:"Festivales de música",promotor:"Crash Music",servicios:[],manager:"Nicolás Chica",loc:"Extremadura"},
{id:303,name:"Escenario Harmonía",category:"Festivales de música",promotor:"Crash Music",servicios:[],manager:"Nicolás Chica",loc:"Madrid"},
{id:304,name:"Conexión Sonora",category:"Festivales de música",promotor:"Crash Music",servicios:[],manager:"Nicolás Chica",loc:"Andalucía"},
{id:305,name:"Divino Festival",category:"Festivales de música",promotor:"El Bosque Sonoro",servicios:[],manager:"Pilar Aguilar",loc:"Aragón"},
{id:306,name:"SLAP!",category:"Festivales de música",promotor:"El Bosque Sonoro",servicios:[],manager:"Pilar Aguilar",loc:"Aragón"},
{id:307,name:"Brizna Festival",category:"Festivales de música",promotor:"El Bosque Sonoro",servicios:[],manager:"Pilar Aguilar",loc:"Aragón"},
{id:308,name:"Mas i Mas Live",category:"Festivales de música",promotor:"Festival Mas i Mas",servicios:[],manager:"Javier Romero",loc:"Cataluña"},
{id:309,name:"Numbernine",category:"Festivales de música",promotor:"Festival Mas i Mas",servicios:[],manager:"Javier Romero",loc:"Cataluña"},
{id:310,name:"Pelaimas",category:"Festivales de música",promotor:"Festival Mas i Mas",servicios:[],manager:"Javier Romero",loc:"Cataluña"},
{id:311,name:"Tarantos Jamboree",category:"Festivales de música",promotor:"Festival Mas i Mas",servicios:[],manager:"Javier Romero",loc:"Cataluña"},
{id:312,name:"The End of the World Festival",category:"Festivales de música",promotor:"Madhouse HC",servicios:[],manager:"Irene Fuentes Holanda",loc:"Cataluña"},
{id:313,name:"Alameda Festival",category:"Festivales de música",promotor:null,servicios:[],manager:"Javier Romero",loc:"Andalucía"},
{id:314,name:"Franz Schubert Filharmonia",category:"Festivales de música",promotor:"Camera Musicae",servicios:[],manager:"Pilar Aguilar",loc:"Cataluña"},
{id:315,name:"El Planeta Sonoro",category:"Festivales de música",promotor:null,servicios:[],manager:"Pilar Aguilar",loc:"Castilla y León"},
{id:30,name:"Judeline",category:"Artistas",agencia:null,servicios:["Fiscal","Contabilidad","Administración","Laboral"],manager:"",loc:""},
{id:31,name:"Amparanoia",category:"Artistas",agencia:null,servicios:["Fiscal","Contabilidad"],manager:"",loc:""},
{id:32,name:"La Raíz",category:"Artistas",agencia:null,servicios:["Fiscal","Contabilidad"],manager:"Pilar Aguilar",loc:"C. Valenciana"},
{id:33,name:"Barry B",category:"Artistas",agencia:"El Rugido",servicios:["Fiscal","Contabilidad"],manager:"Irene Fuentes Holanda",loc:"Madrid"},
{id:34,name:"Hard GZ",category:"Artistas",agencia:null,servicios:["Fiscal integral","Legal integral"],manager:"",loc:""},
{id:35,name:"Sexy Zebras",category:"Artistas",agencia:null,servicios:["Fiscal","Contabilidad"],manager:"Javier Romero",loc:"Madrid"},
{id:36,name:"La M.O.D.A.",category:"Artistas",agencia:null,servicios:["Fiscal","Contabilidad","Administración","Laboral"],manager:"Javier Romero",loc:"Castilla y León"},
{id:37,name:"Sanguijuelas del Guadiana",category:"Artistas",agencia:null,servicios:["Fiscal","Business Management"],manager:"",loc:""},
{id:38,name:"Víctor Martínez",category:"Artistas",agencia:null,servicios:["Legal","Rights Management"],manager:"",loc:""},
{id:39,name:"Kiddo",category:"Artistas",agencia:null,servicios:["Business Management","Procedimiento judicial"],manager:"",loc:""},
{id:40,name:"Zetak Mitoaroa I, II, III",category:"Artistas",agencia:"Panda Artist",servicios:["Legal"],manager:"",loc:""},
{id:41,name:"DELLAFUENTE",category:"Artistas",agencia:null,servicios:["Fiscal","Contabilidad","Administración","Legal","Laboral"],manager:"",loc:""},
{id:42,name:"Los Planetas",category:"Artistas",agencia:null,servicios:["Fiscal","Laboral"],manager:"",loc:""},
{id:43,name:"Natalia Lacunza",category:"Artistas",agencia:null,servicios:["Legal"],manager:"",loc:""},
{id:44,name:"Rosalía",category:"Artistas",agencia:null,servicios:["Legal"],manager:"",loc:""},
{id:45,name:"Sohaib",category:"Artistas",agencia:null,servicios:["Fiscal"],manager:"",loc:""},
{id:46,name:"Cervatana",category:"Artistas",agencia:null,servicios:["Legal"],manager:"",loc:""},
{id:47,name:"Bandanera",category:"Artistas",agencia:null,servicios:["Fiscal","Legal"],manager:"",loc:""},
{id:48,name:"Niña Polaca",category:"Artistas",agencia:null,servicios:["Fiscal"],manager:"",loc:""},
{id:49,name:"The Iconics (Asier Cerezo)",category:"Artistas",agencia:null,servicios:["Fiscal"],manager:"",loc:""},
{id:103,name:"Lex C",category:"Artistas",agencia:null,servicios:["Fiscal"],manager:"",loc:""},
{id:104,name:"De la Ría",category:"Artistas",agencia:null,servicios:["Legal","Marca"],manager:"",loc:""},
{id:105,name:"Carlos Marco",category:"Artistas",agencia:null,servicios:["Legal"],manager:"",loc:""},
{id:106,name:"Salvi Vila",category:"Artistas",agencia:null,servicios:["Legal"],manager:"",loc:""},
{id:107,name:"Sandrazz (Sandra Ruiz)",category:"Artistas",agencia:null,servicios:["Legal"],manager:"",loc:""},
{id:108,name:"Lagartija Nick",category:"Artistas",agencia:null,servicios:["Legal"],manager:"",loc:""},
{id:109,name:"Alejandra Restrepo",category:"Artistas",agencia:null,servicios:["Fiscal","Laboral"],manager:"",loc:""},
{id:110,name:"Antonio VG (Er Perche)",category:"Artistas",agencia:null,servicios:["Fiscal"],manager:"",loc:""},
{id:111,name:"Marc Costa",category:"Artistas",agencia:null,servicios:["Fiscal"],manager:"",loc:""},
{id:112,name:"Chupy",category:"Artistas",agencia:null,servicios:["Procedimiento judicial"],manager:"",loc:""},
{id:113,name:"Urs Buhler (Il Divo)",category:"Artistas",agencia:null,servicios:["Legal"],manager:"",loc:""},
{id:114,name:"Sergio Pastor",category:"Artistas",agencia:null,servicios:["Fiscal"],manager:"",loc:""},
{id:115,name:"Arturo Paniagua",category:"Artistas",agencia:null,servicios:["Fiscal"],manager:"",loc:""},
{id:116,name:"David Hidalgo",category:"Artistas",agencia:null,servicios:["Fiscal"],manager:"",loc:""},
{id:117,name:"Guillermo Orrico",category:"Artistas",agencia:null,servicios:["Procedimiento judicial"],manager:"",loc:""},
{id:118,name:"Deva (Sac Barrios)",category:"Artistas",agencia:null,servicios:["Legal"],manager:"",loc:""},
{id:119,name:"Rico Rosa (Sac Barrios)",category:"Artistas",agencia:null,servicios:["Legal"],manager:"",loc:""},
{id:50,name:"Katy Perry",category:"Giras (participamos)",agencia:null,servicios:[],manager:"",loc:""},
{id:51,name:"Shawn Mendes",category:"Giras (participamos)",agencia:null,servicios:[],manager:"",loc:""},
{id:52,name:"Yerai Cortés",category:"Giras (participamos)",agencia:null,servicios:[],manager:"",loc:""},
{id:53,name:"María Becerra",category:"Giras (participamos)",agencia:null,servicios:[],manager:"",loc:""},
{id:54,name:"Carolina Durante",category:"Giras (participamos)",agencia:null,servicios:[],manager:"",loc:""},
{id:55,name:"Rosario Flores",category:"Giras (participamos)",agencia:null,servicios:[],manager:"",loc:""},
{id:56,name:"Amaral",category:"Giras (participamos)",agencia:null,servicios:[],manager:"",loc:""},
{id:57,name:"Bustamante",category:"Giras (participamos)",agencia:null,servicios:[],manager:"",loc:""},
{id:58,name:"Antonio Orozco",category:"Giras (participamos)",agencia:null,servicios:[],manager:"",loc:""},
{id:59,name:"Alba Reche",category:"Giras (participamos)",agencia:null,servicios:[],manager:"",loc:""},
{id:60,name:"Pablo López",category:"Giras (participamos)",agencia:null,servicios:[],manager:"",loc:""},
{id:61,name:"Morad",category:"Giras (participamos)",agencia:"Polar",servicios:[],manager:"",loc:""},
{id:62,name:"La Zowi",category:"Giras (participamos)",agencia:"Polar",servicios:[],manager:"",loc:""},
{id:350,name:"Pedro Pastor",category:"Giras (participamos)",agencia:null,servicios:[],manager:"Marisol Veliz",loc:"Madrid"},
{id:351,name:"Bola 9 / Los Chikos del Maíz",category:"Giras (participamos)",agencia:null,servicios:[],manager:"Nicolás Chica",loc:"Madrid"},
{id:352,name:"Rita la Bailaora",category:"Giras (participamos)",agencia:null,servicios:[],manager:"Pilar Aguilar",loc:"Madrid"},
{id:70,name:"Polar",category:"Agencias de Management y Booking",servicios:["Fiscal","Contabilidad","Legal","Procedimiento judicial"],manager:"Irene Fuentes Holanda",loc:"Cataluña"},
{id:71,name:"El Rugido",category:"Agencias de Management y Booking",servicios:["Fiscal","Laboral"],manager:"Javier Romero",loc:"C. Valenciana"},
{id:72,name:"HFMN Crew",category:"Agencias de Management y Booking",servicios:["Fiscal"],manager:"Nicolás Chica",loc:"Cataluña"},
{id:73,name:"Right Method",category:"Agencias de Management y Booking",servicios:["Legal"],manager:"",loc:""},
{id:74,name:"BCA Music",category:"Agencias de Management y Booking",servicios:["Legal"],manager:"",loc:""},
{id:75,name:"Bolt Music",category:"Agencias de Management y Booking",servicios:["Procedimiento judicial"],manager:"",loc:""},
{id:76,name:"UVE",category:"Agencias de Management y Booking",servicios:["Procedimiento judicial"],manager:"",loc:""},
{id:77,name:"Panda Artist",category:"Agencias de Management y Booking",servicios:["Legal"],manager:"",loc:""},
{id:78,name:"Crash Music",category:"Agencias de Management y Booking",servicios:["Legal","Procedimiento judicial","Laboral"],manager:"Nicolás Chica",loc:"Andalucía"},
{id:360,name:"Latencia Booking",category:"Agencias de Management y Booking",servicios:[],manager:"Nicolás Chica",loc:"Cataluña"},
{id:361,name:"Live in Dallas",category:"Agencias de Management y Booking",servicios:[],manager:"Nicolás Chica",loc:"Murcia"},
{id:80,name:"Lowlight Music",category:"Empresa musical (sello, editorial, productora)",servicios:["Fiscal"],manager:"",loc:""},
{id:81,name:"Charco Música",category:"Empresa musical (sello, editorial, productora)",servicios:["Fiscal"],manager:"Javier Romero",loc:"Madrid"},
{id:82,name:"Sira Música",category:"Empresa musical (sello, editorial, productora)",servicios:["Fiscal","Laboral"],manager:"Javier Romero",loc:"Madrid"},
{id:83,name:"Schubert Music Publishing",category:"Empresa musical (sello, editorial, productora)",servicios:["Fiscal","Contabilidad"],manager:"",loc:""},
{id:84,name:"Rocketbeat Records",category:"Empresa musical (sello, editorial, productora)",servicios:["Legal"],manager:"",loc:""},
{id:85,name:"Vanana Records",category:"Empresa musical (sello, editorial, productora)",servicios:["Legal"],manager:"",loc:""},
{id:86,name:"Anatomía del Sonido",category:"Empresa musical (sello, editorial, productora)",servicios:["Fiscal"],manager:"",loc:""},
{id:87,name:"Sonorama Producciones",category:"Empresa musical (sello, editorial, productora)",servicios:["Legal"],manager:"",loc:""},
{id:88,name:"Dientes de Bala / Caníbal",category:"Empresa musical (sello, editorial, productora)",servicios:["Fiscal","Laboral","Legal"],manager:"Marisol Veliz",loc:"Castilla y León"},
{id:370,name:"Byron Books",category:"Empresa musical (sello, editorial, productora)",servicios:[],manager:"Pilar Aguilar",loc:"Madrid"},
{id:371,name:"Subterfuge Records",category:"Empresa musical (sello, editorial, productora)",servicios:[],manager:"Pilar Aguilar",loc:"Madrid"},
{id:372,name:"Acqustic Platform",category:"Empresa musical (sello, editorial, productora)",servicios:[],manager:"Nicolás Chica",loc:"Cataluña"},
{id:373,name:"Bidean Produkzioak",category:"Empresa musical (sello, editorial, productora)",servicios:[],manager:"Javier Romero",loc:"Guipúzcoa"},
{id:374,name:"Tranquilo Música",category:"Empresa musical (sello, editorial, productora)",servicios:[],manager:"Ángeles Lozano",loc:"C. Valenciana"},
{id:90,name:"Antídoto Club",category:"Salas y clubs",servicios:["Fiscal","Financiero","Legal"],manager:"",loc:""},
{id:380,name:"Sala Zero",category:"Salas y clubs",servicios:[],manager:"Pilar Aguilar",loc:"Tarragona"},
{id:381,name:"Sala El Tren",category:"Salas y clubs",servicios:[],manager:"Irene Fuentes Holanda",loc:"Granada"},
{id:382,name:"Sala Marte",category:"Salas y clubs",servicios:[],manager:"Pilar Aguilar",loc:"Andalucía"},
{id:383,name:"Industrial Copera",category:"Salas y clubs",servicios:[],manager:"Irene Fuentes Holanda",loc:"Granada"},
{id:384,name:"Tablao Flamenco Alma",category:"Salas y clubs",servicios:[],manager:"Javier Romero",loc:"Islas Baleares"},
{id:91,name:"APM",category:"Asociaciones e instituciones",servicios:["Legal"],manager:"",loc:""},
{id:92,name:"Navarra Music Commission",category:"Asociaciones e instituciones",servicios:["Legal"],manager:"",loc:""},
{id:93,name:"Fundación Orquesta y Coro Com Madrid",category:"Asociaciones e instituciones",servicios:["Legal"],manager:"",loc:""},
{id:94,name:"Red Bull",category:"Asociaciones e instituciones",servicios:["Consultoría"],manager:"",loc:""},
{id:95,name:"Ayuntamiento Zaragoza",category:"Asociaciones e instituciones",servicios:["Legal"],manager:"",loc:""},
{id:120,name:"The Game Kitchen (videojuegos)",category:"Otros",servicios:["Legal"],manager:"",loc:""},
{id:121,name:"Xceed (ticketing)",category:"Otros",servicios:["Procedimiento judicial"],manager:"",loc:""},
{id:122,name:"Grupo Run Run",category:"Otros",servicios:["Legal"],manager:"",loc:""},
{id:123,name:"Cazorla Alcón",category:"Otros",servicios:["Fiscal","Laboral"],manager:"",loc:""},
{id:124,name:"Hermes Mk",category:"Otros",servicios:["Fiscal","Contabilidad"],manager:"Marisol Veliz",loc:"Madrid"},
{id:125,name:"Lunisao / Recyclaje",category:"Otros",servicios:["Fiscal"],manager:"",loc:""},
{id:126,name:"Francisco Taibo",category:"Otros",servicios:["Fiscal"],manager:"",loc:""},
{id:127,name:"Eduardo Segura",category:"Otros",servicios:["Legal"],manager:"",loc:""},
{id:128,name:"Rodolfo De la Fuente",category:"Otros",servicios:["Legal"],manager:"",loc:""},
{id:129,name:"Ana Escribano Taboada",category:"Otros",servicios:["Legal"],manager:"",loc:""},
{id:130,name:"Nuria Net",category:"Otros",servicios:["Fiscal"],manager:"",loc:""},
{id:131,name:"Vincent Esclusá",category:"Otros",servicios:["Fiscal"],manager:"",loc:""},
{id:132,name:"María Talaverano Valverde",category:"Otros",servicios:["Fiscal"],manager:"",loc:""},
{id:133,name:"Jesús Olivares Heredia",category:"Otros",servicios:["Fiscal"],manager:"",loc:""},
{id:134,name:"Mario Diaz",category:"Otros",servicios:["Legal"],manager:"",loc:""},
]};

function getStoredData(){if(typeof window==="undefined")return DEFAULT_DATA;try{const r=localStorage.getItem("sftl-v6");return r?JSON.parse(r):DEFAULT_DATA}catch{return DEFAULT_DATA}}
function storeData(d){try{localStorage.setItem("sftl-v6",JSON.stringify(d))}catch{}}

const In=({name})=>{const l=name.split(" ").map(w=>w[0]).filter(Boolean).join("").slice(0,2).toUpperCase();return<div style={{backgroundColor:"#1E1E1C",border:"1px solid #F2E2A433"}} className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"><span style={{color:"#F2E2A4"}}>{l}</span></div>};

export default function Home(){
  const[data,setData]=useState(null);const[search,setSearch]=useState("");const[filter,setFilter]=useState("Todas");const[svcFilter,setSvcFilter]=useState("Todos");const[mgrFilter,setMgrFilter]=useState("Todos");const[showAdd,setShowAdd]=useState(false);const[showAddCat,setShowAddCat]=useState(false);const[nN,sNN]=useState("");const[nC,sNC]=useState("");const[nP,sNP]=useState("");const[nA,sNA]=useState("");const[nS,sNS]=useState([]);const[nM,sNM]=useState("");const[nL,sNL]=useState("");const[nCN,sNCN]=useState("");const[eId,sEId]=useState(null);const[eN,sEN]=useState("");const[eC,sEC]=useState("");const[eP,sEP]=useState("");const[eA,sEA]=useState("");const[eS,sES]=useState([]);const[eM,sEM]=useState("");const[eL,sEL]=useState("");const[cD,sCD]=useState(null);const[cDC,sCDC]=useState(null);const[expId,sExpId]=useState(null);

  useEffect(()=>{setData(getStoredData())},[]);
  const save=d=>{setData(d);storeData(d)};
  const tog=(a,s,v)=>a.includes(v)?s(a.filter(x=>x!==v)):s([...a,v]);
  const addC=()=>{if(!nN.trim()||!nC)return;save({...data,clients:[...data.clients,{id:Date.now(),name:nN.trim(),category:nC,promotor:nC==="Festivales de música"&&nP?nP:null,agencia:(nC==="Artistas"||nC==="Giras (participamos)")&&nA?nA:null,servicios:nS,manager:nM,loc:nL}]});sNN("");sNC("");sNP("");sNA("");sNS([]);sNM("");sNL("");setShowAdd(false)};
  const addCat=()=>{if(!nCN.trim()||data.categories.includes(nCN.trim()))return;save({...data,categories:[...data.categories,nCN.trim()]});sNCN("");setShowAddCat(false)};
  const delC=id=>{const cl=data.clients.find(c=>c.id===id);let u=data.clients.filter(c=>c.id!==id);if(cl?.category==="Promotores de conciertos")u=u.map(c=>c.promotor===cl.name?{...c,promotor:null}:c);if(cl?.category==="Agencias de Management y Booking")u=u.map(c=>c.agencia===cl.name?{...c,agencia:null}:c);save({...data,clients:u});sCD(null)};
  const delCat=cat=>{save({...data,categories:data.categories.filter(c=>c!==cat),clients:data.clients.filter(c=>c.category!==cat)});sCDC(null)};
  const saveE=id=>{if(!eN.trim())return;const old=data.clients.find(c=>c.id===id);let u=data.clients.map(c=>{if(c.id===id)return{...c,name:eN.trim(),category:eC||c.category,promotor:eC==="Festivales de música"?(eP||null):c.promotor,agencia:(eC==="Artistas"||eC==="Giras (participamos)")?(eA||null):c.agencia,servicios:eS,manager:eM,loc:eL};return c});if(old.category==="Promotores de conciertos"&&old.name!==eN.trim())u=u.map(c=>c.promotor===old.name?{...c,promotor:eN.trim()}:c);if(old.category==="Agencias de Management y Booking"&&old.name!==eN.trim())u=u.map(c=>c.agencia===old.name?{...c,agencia:eN.trim()}:c);save({...data,clients:u});sEId(null)};

  if(!data)return<div style={{backgroundColor:"#1E1E1C"}} className="min-h-screen flex items-center justify-center"><p style={{color:"#F2E2A4"}}>Cargando...</p></div>;
  const cats=data.categories;const proms=data.clients.filter(c=>c.category==="Promotores de conciertos");const ags=data.clients.filter(c=>c.category==="Agencias de Management y Booking");
  const allSvcs=[...new Set(data.clients.flatMap(c=>c.servicios||[]))].sort();
  const filtered=data.clients.filter(c=>{const ms=c.name.toLowerCase().includes(search.toLowerCase());const mf=filter==="Todas"||c.category===filter;const msvc=svcFilter==="Todos"||((c.servicios||[]).includes(svcFilter));const mmgr=mgrFilter==="Todos"||(c.manager||"")===mgrFilter;return ms&&mf&&msvc&&mmgr});
  const grouped={};cats.forEach(cat=>{grouped[cat]=[]});filtered.forEach(c=>{if(grouped[c.category])grouped[c.category].push(c)});
  const total=data.clients.length;
  const getL=c=>{if(c.category==="Promotores de conciertos")return data.clients.filter(x=>x.category==="Festivales de música"&&x.promotor===c.name);if(c.category==="Agencias de Management y Booking")return data.clients.filter(x=>(x.category==="Artistas"||x.category==="Giras (participamos)")&&x.agencia===c.name);return[]};
  const canE=c=>c.category==="Promotores de conciertos"||c.category==="Agencias de Management y Booking";
  const shA=cat=>cat==="Artistas"||cat==="Giras (participamos)";const shP=cat=>cat==="Festivales de música";

  return(
    <div style={{backgroundColor:"#1E1E1C"}} className="min-h-screen">
      <div style={{backgroundColor:"#1E1E1C",borderBottom:"1px solid #2a2a28"}} className="sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-5">
          <div className="flex items-center gap-3 mb-1"><h1 style={{color:"#F2E2A4"}} className="text-2xl font-bold tracking-wide">SFTL</h1><span style={{color:"#73FBF9"}} className="text-2xl font-bold tracking-wide">INCENTIVA</span></div>
          <p style={{color:"#F2E2A466"}} className="text-xs">Sympathy for the Lawyer</p>
          <div className="flex items-center justify-between mb-3 mt-3">
            <p style={{color:"#F2E2A488"}} className="text-sm">{total} clientes</p>
            <div className="flex gap-2">
              <button onClick={()=>setShowAddCat(true)} style={{borderColor:"#F2E2A433",color:"#F2E2A4"}} className="px-3 py-2 text-xs rounded-xl border">+ Categoría</button>
              <button onClick={()=>{setShowAdd(true);sNC(cats[0]||"");sNP("");sNA("");sNS([]);sNM("");sNL("")}} style={{backgroundColor:"#F2E2A4",color:"#1E1E1C"}} className="px-3 py-2 text-xs rounded-xl font-semibold">+ Cliente</button>
            </div>
          </div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar cliente..." style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none placeholder-stone-500"/>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">{["Todas",...cats].map(c=><button key={c} onClick={()=>setFilter(c)} style={filter===c?{backgroundColor:"#F2E2A4",color:"#1E1E1C"}:{backgroundColor:"#2a2a28",color:"#F2E2A488"}} className="px-3 py-1.5 text-xs rounded-full whitespace-nowrap font-medium">{c}</button>)}</div>
          <div className="flex gap-2 mt-2 overflow-x-auto pb-1">{["Todos",...allSvcs].map(s=><button key={s} onClick={()=>setSvcFilter(s)} style={svcFilter===s?{backgroundColor:"#73FBF9",color:"#1E1E1C"}:{backgroundColor:"#2a2a28",color:"#73FBF988"}} className="px-2.5 py-1 text-xs rounded-full whitespace-nowrap font-medium">{s}</button>)}</div>
          <div className="flex gap-2 mt-2 overflow-x-auto pb-1">{["Todos",...MANAGERS].map(m=><button key={m} onClick={()=>setMgrFilter(m)} style={mgrFilter===m?{backgroundColor:"#8B5CF6",color:"#fff"}:{backgroundColor:"#2a2a28",color:"#8B5CF688"}} className="px-2.5 py-1 text-xs rounded-full whitespace-nowrap font-medium">{m}</button>)}</div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {cats.filter(cat=>filter==="Todas"||filter===cat).map((cat,ci)=>{const col=COLORS[ci%COLORS.length];const cls=grouped[cat]||[];return(<div key={cat}>
          <div className="flex items-center justify-between mb-2 px-1"><div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor:col.dot}}/><span style={{color:"#F2E2A4"}} className="text-sm font-semibold">{cat}</span><span style={{backgroundColor:"#2a2a28",color:"#F2E2A4"}} className="text-xs px-2 py-0.5 rounded-full font-medium">{cls.length}</span></div><button onClick={()=>sCDC(cat)} style={{color:"#F2E2A433"}} className="hover:text-red-400 text-xs">eliminar</button></div>
          {cls.length===0?<div style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38"}} className="rounded-2xl border p-6 text-center"><p style={{color:"#F2E2A444"}} className="text-sm">Sin clientes</p></div>:
          <div className="space-y-2">{cls.map(c=>{const ce=canE(c);const lk=ce?getL(c):[];const isE=expId===c.id;const hL=lk.length>0;return(<div key={c.id}>
            <div style={{backgroundColor:"#252523",borderColor:"#3a3a38"}} className={`rounded-2xl border p-3.5 hover:border-yellow-800 transition group ${ce&&hL?"cursor-pointer":""}`} onClick={()=>ce&&hL&&sExpId(isE?null:c.id)}>
              {eId===c.id?<div className="space-y-2" onClick={e=>e.stopPropagation()}>
                <div className="flex gap-2 flex-wrap"><input autoFocus value={eN} onChange={e=>sEN(e.target.value)} style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="flex-1 min-w-0 px-3 py-1.5 rounded-lg border text-sm focus:outline-none" onKeyDown={e=>e.key==="Enter"&&saveE(c.id)}/><select value={eC} onChange={e=>sEC(e.target.value)} style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="px-2 py-1.5 rounded-lg border text-sm">{cats.map(ct=><option key={ct} value={ct}>{ct}</option>)}</select></div>
                {shP(eC)&&<select value={eP} onChange={e=>sEP(e.target.value)} style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="w-full px-2 py-1.5 rounded-lg border text-sm"><option value="">Sin promotor</option>{proms.map(p=><option key={p.id} value={p.name}>{p.name}</option>)}</select>}
                {shA(eC)&&<select value={eA} onChange={e=>sEA(e.target.value)} style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="w-full px-2 py-1.5 rounded-lg border text-sm"><option value="">Sin agencia</option>{ags.map(a=><option key={a.id} value={a.name}>{a.name}</option>)}</select>}
                <div className="flex gap-2"><select value={eM} onChange={e=>sEM(e.target.value)} style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="flex-1 px-2 py-1.5 rounded-lg border text-sm"><option value="">Sin manager</option>{MANAGERS.map(m=><option key={m} value={m}>{m}</option>)}</select><input value={eL} onChange={e=>sEL(e.target.value)} placeholder="Localización" style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="flex-1 px-2 py-1.5 rounded-lg border text-sm focus:outline-none placeholder-stone-500"/></div>
                <div className="flex flex-wrap gap-1">{SVC_LIST.map(s=><button key={s} onClick={()=>tog(eS,sES,s)} style={eS.includes(s)?{backgroundColor:SVC_COLORS[s]||"#F2E2A4",color:"#1E1E1C"}:{backgroundColor:"#2a2a28",color:"#F2E2A466"}} className="px-2 py-0.5 rounded-full text-xs">{s}</button>)}</div>
                <div className="flex gap-2"><button onClick={()=>saveE(c.id)} style={{color:"#73FBF9"}} className="text-sm font-medium">Guardar</button><button onClick={()=>sEId(null)} style={{color:"#F2E2A466"}} className="text-sm">Cancelar</button></div>
              </div>:
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0"><In name={c.name}/><div className="min-w-0">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span style={{color:"#F2E2A4"}} className="text-sm font-medium">{c.name}</span>
                    {c.promotor&&<span style={{backgroundColor:"#73FBF915",color:"#73FBF9"}} className="text-xs px-2 py-0.5 rounded-full">{c.promotor}</span>}
                    {c.agencia&&<span style={{backgroundColor:"#F2E2A415",color:"#F2E2A4"}} className="text-xs px-2 py-0.5 rounded-full">{c.agencia}</span>}
                  </div>
                  <div className="flex flex-wrap items-center gap-1 mt-1">
                    {(c.servicios||[]).map(s=><span key={s} style={{backgroundColor:(SVC_COLORS[s]||"#F2E2A4")+"22",color:SVC_COLORS[s]||"#F2E2A4"}} className="text-xs px-2 py-0.5 rounded-full">{s}</span>)}
                    {c.manager&&<span style={{backgroundColor:"#8B5CF622",color:"#8B5CF6"}} className="text-xs px-2 py-0.5 rounded-full">{c.manager}</span>}
                    {c.loc&&<span style={{backgroundColor:"#FFFFFF11",color:"#FFFFFF88"}} className="text-xs px-2 py-0.5 rounded-full">{c.loc}</span>}
                  </div>
                  {ce&&hL&&<p style={{color:"#F2E2A444"}} className="text-xs mt-1">{lk.length} vinculado{lk.length!==1?"s":""}</p>}
                </div></div>
                <div className="flex items-center gap-1">
                  {ce&&hL&&<span style={{color:"#F2E2A444"}} className="text-xs mr-1">{isE?"▲":"▼"}</span>}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition" onClick={e=>e.stopPropagation()}>
                    <button onClick={()=>{sEId(c.id);sEN(c.name);sEC(c.category);sEP(c.promotor||"");sEA(c.agencia||"");sES(c.servicios||[]);sEM(c.manager||"");sEL(c.loc||"")}} style={{color:"#F2E2A466"}} className="p-1.5 text-xs">editar</button>
                    <button onClick={()=>sCD(c.id)} style={{color:"#F2E2A433"}} className="p-1.5 hover:text-red-400 text-xs">borrar</button>
                  </div>
                </div>
              </div>}
            </div>
            {ce&&isE&&hL&&<div style={{borderColor:"#73FBF944"}} className="ml-6 mt-1 space-y-1 border-l-2 pl-3">{lk.map(f=><div key={f.id} style={{backgroundColor:"#73FBF910"}} className="rounded-xl px-3 py-2 flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{backgroundColor:"#73FBF9"}}/><span style={{color:"#73FBF9"}} className="text-sm">{f.name}</span></div><span style={{color:"#73FBF988"}} className="text-xs">{f.category}</span></div>)}</div>}
          </div>)})}</div>}
        </div>)})}
      </div>

      {showAdd&&<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={()=>setShowAdd(false)}><div style={{backgroundColor:"#252523",borderColor:"#3a3a38"}} className="rounded-2xl border p-6 w-full max-w-sm shadow-xl max-h-screen overflow-y-auto" onClick={e=>e.stopPropagation()}>
        <h2 style={{color:"#F2E2A4"}} className="text-lg font-bold mb-4">Nuevo cliente</h2>
        <input autoFocus value={nN} onChange={e=>sNN(e.target.value)} placeholder="Nombre" style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="w-full px-4 py-2.5 rounded-xl border text-sm mb-3 focus:outline-none placeholder-stone-500"/>
        <select value={nC} onChange={e=>{sNC(e.target.value);sNP("");sNA("")}} style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="w-full px-4 py-2.5 rounded-xl border text-sm mb-3">{cats.map(c=><option key={c} value={c}>{c}</option>)}</select>
        {shP(nC)&&proms.length>0&&<select value={nP} onChange={e=>sNP(e.target.value)} style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="w-full px-4 py-2.5 rounded-xl border text-sm mb-3"><option value="">Sin promotor</option>{proms.map(p=><option key={p.id} value={p.name}>{p.name}</option>)}</select>}
        {shA(nC)&&ags.length>0&&<select value={nA} onChange={e=>sNA(e.target.value)} style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="w-full px-4 py-2.5 rounded-xl border text-sm mb-3"><option value="">Sin agencia</option>{ags.map(a=><option key={a.id} value={a.name}>{a.name}</option>)}</select>}
        <select value={nM} onChange={e=>sNM(e.target.value)} style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="w-full px-4 py-2.5 rounded-xl border text-sm mb-3"><option value="">Manager</option>{MANAGERS.map(m=><option key={m} value={m}>{m}</option>)}</select>
        <input value={nL} onChange={e=>sNL(e.target.value)} placeholder="Localización" style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="w-full px-4 py-2.5 rounded-xl border text-sm mb-3 focus:outline-none placeholder-stone-500"/>
        <p style={{color:"#F2E2A488"}} className="text-xs mb-2">Servicios:</p>
        <div className="flex flex-wrap gap-1 mb-4">{SVC_LIST.map(s=><button key={s} onClick={()=>tog(nS,sNS,s)} style={nS.includes(s)?{backgroundColor:SVC_COLORS[s]||"#F2E2A4",color:"#1E1E1C"}:{backgroundColor:"#2a2a28",color:"#F2E2A466"}} className="px-2.5 py-1 rounded-full text-xs">{s}</button>)}</div>
        <div className="flex gap-2"><button onClick={()=>setShowAdd(false)} style={{borderColor:"#3a3a38",color:"#F2E2A488"}} className="flex-1 px-4 py-2.5 rounded-xl border text-sm">Cancelar</button><button onClick={addC} style={{backgroundColor:"#F2E2A4",color:"#1E1E1C"}} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold">Añadir</button></div>
      </div></div>}

      {showAddCat&&<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={()=>setShowAddCat(false)}><div style={{backgroundColor:"#252523",borderColor:"#3a3a38"}} className="rounded-2xl border p-6 w-full max-w-sm shadow-xl" onClick={e=>e.stopPropagation()}>
        <h2 style={{color:"#F2E2A4"}} className="text-lg font-bold mb-4">Nueva categoría</h2>
        <input autoFocus value={nCN} onChange={e=>sNCN(e.target.value)} placeholder="Nombre" style={{backgroundColor:"#2a2a28",borderColor:"#3a3a38",color:"#F2E2A4"}} className="w-full px-4 py-2.5 rounded-xl border text-sm mb-4 focus:outline-none placeholder-stone-500" onKeyDown={e=>e.key==="Enter"&&addCat()}/>
        <div className="flex gap-2"><button onClick={()=>setShowAddCat(false)} style={{borderColor:"#3a3a38",color:"#F2E2A488"}} className="flex-1 px-4 py-2.5 rounded-xl border text-sm">Cancelar</button><button onClick={addCat} style={{backgroundColor:"#F2E2A4",color:"#1E1E1C"}} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold">Crear</button></div>
      </div></div>}

      {cD&&<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={()=>sCD(null)}><div style={{backgroundColor:"#252523",borderColor:"#3a3a38"}} className="rounded-2xl border p-6 w-full max-w-sm shadow-xl" onClick={e=>e.stopPropagation()}>
        <p style={{color:"#F2E2A4"}} className="text-sm mb-4">¿Eliminar este cliente?</p>
        <div className="flex gap-2"><button onClick={()=>sCD(null)} style={{borderColor:"#3a3a38",color:"#F2E2A488"}} className="flex-1 px-4 py-2.5 rounded-xl border text-sm">Cancelar</button><button onClick={()=>delC(cD)} className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium">Eliminar</button></div>
      </div></div>}

      {cDC&&<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={()=>sCDC(null)}><div style={{backgroundColor:"#252523",borderColor:"#3a3a38"}} className="rounded-2xl border p-6 w-full max-w-sm shadow-xl" onClick={e=>e.stopPropagation()}>
        <p style={{color:"#F2E2A4"}} className="text-sm mb-4">¿Eliminar <strong>{cDC}</strong> y todos sus clientes?</p>
        <div className="flex gap-2"><button onClick={()=>sCDC(null)} style={{borderColor:"#3a3a38",color:"#F2E2A488"}} className="flex-1 px-4 py-2.5 rounded-xl border text-sm">Cancelar</button><button onClick={()=>delCat(cDC)} className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium">Eliminar</button></div>
      </div></div>}
    </div>);
}
