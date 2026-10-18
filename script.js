const $=s=>document.querySelector(s),grid=$("#grid"),svg=$("#constellation");
const NS="http://www.w3.org/2000/svg";
const slug=n=>n.toLowerCase().replace(/\W+/g,"-");
// ---- Constellation: plot real lat/lon on a plain grid (no outline needed)
const xy=j=>[40+(j.lon-67)/(88-67)*320,420-(j.lat-8)/(32-8)*380];
const order=[...JL].sort((a,b)=>a.lon-b.lon);
const path=document.createElementNS(NS,"polyline");path.setAttribute("class","line");
path.setAttribute("points",JL.map(j=>xy(j).join(",")).join(" "));svg.append(path);
JL.forEach((j,i)=>{const[x,y]=xy(j);const g=document.createElementNS(NS,"g");
g.setAttribute("class","star");g.setAttribute("tabindex","0");g.setAttribute("role","button");g.setAttribute("aria-label","Open "+j.n);
const left=x>260;g.innerHTML=`<circle class="halo" cx="${x}" cy="${y}" r="7" style="animation-delay:${i*.3}s"/><circle class="core" cx="${x}" cy="${y}" r="4.5"/><text x="${left?x-10:x+10}" y="${y+4}" text-anchor="${left?"end":"start"}">${j.n}</text>`;
g.onclick=()=>openM(i);g.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openM(i)}};
g.onmouseenter=g.onfocus=()=>$("#hint").textContent=j.n+", "+j.st;svg.append(g)});
// ---- Cards, search, filter
const states=[...new Set(JL.map(j=>j.st))].sort();
states.forEach(s=>$("#state").add(new Option(s,s)));
let list=JL.map((_,i)=>i),ordered=false;
function render(){const q=$("#q").value.toLowerCase(),st=$("#state").value;
const idx=(ordered?[...Array(12).keys()]:JL.map((_,i)=>i).sort((a,b)=>JL[a].n.localeCompare(JL[b].n)))
.filter(i=>{const j=JL[i];return(!st||j.st===st)&&(!q||JSON.stringify(j).toLowerCase().includes(q))});
grid.innerHTML=idx.map(i=>{const j=JL[i];return`<button class="card" data-i="${i}"><h3>${j.n}</h3><span>${j.st}</span><p>${j.loc}</p></button>`}).join("");
$("#none").hidden=idx.length>0}
grid.onclick=e=>{const c=e.target.closest(".card");if(c)openM(+c.dataset.i)};
$("#q").oninput=render;$("#state").onchange=render;
$("#route").onclick=function(){ordered=!ordered;this.textContent=ordered?"Show alphabetically":"Show in stotram order";render()};
// ---- Modal
const TABS=["Overview","Legend","History","Shloka","Scriptures","Visit"];let cur=0,tab=0,opener;
function body(j){switch(tab){
case 0:return`<dl><dt>Location</dt><dd>${j.loc}</dd><dt>State</dt><dd>${j.st}</dd><dt>Also called</dt><dd>${j.alt}</dd><dt>Goddess</dt><dd>${j.deity}</dd><dt>Water</dt><dd>${j.water}</dd><dt>Style</dt><dd>${j.style}</dd><dt>Coordinates</dt><dd>${j.lat}°N, ${j.lon}°E</dd></dl><p><b>Did you know?</b> ${j.fact}</p>`;
case 1:return`<p>${j.legend}</p>`;
case 2:return`<p>${j.hist}</p>`;
case 3:return`<blockquote>${j.sl}</blockquote><p><b>Meaning:</b> ${j.mean}</p><p class="hint">From the Dwadasha Jyotirlinga Stotram.</p>`;
case 4:return`<p>${j.txt}</p>`;
default:return`<p>${j.visit}</p>`}}
function paint(){const j=JL[cur];$("#mt").textContent=j.n;$("#msub").textContent=j.st+" | "+j.alt;
$(".tabs").innerHTML=TABS.map((t,i)=>`<button role="tab" aria-selected="${i===tab}" data-t="${i}">${t}</button>`).join("");
$("#mbody").innerHTML=body(j);location.hash=slug(j.n)}
function openM(i){opener=document.activeElement;cur=i;tab=0;$("#modal").hidden=false;paint();$("#close").focus()}
function closeM(){$("#modal").hidden=true;history.replaceState(null,"",location.pathname);opener&&opener.focus()}
$(".tabs").onclick=e=>{if(e.target.dataset.t){tab=+e.target.dataset.t;paint()}};
$("#close").onclick=closeM;$("#modal").onclick=e=>{if(e.target.id==="modal")closeM()};
$("#prev").onclick=()=>{cur=(cur+11)%12;paint()};$("#next").onclick=()=>{cur=(cur+1)%12;paint()};
document.onkeydown=e=>{if($("#modal").hidden)return;if(e.key==="Escape")closeM();if(e.key==="ArrowRight")$("#next").click();if(e.key==="ArrowLeft")$("#prev").click()};
// ---- Stotram + scriptures
$("#stotra").innerHTML=["Saurashtre Somanatham cha Srisaile Mallikarjunam","Ujjayinyam Mahakalam Omkare Amaleshwaram","Parlyam Vaidyanatham cha Dakinyam Bhimashankaram","Setubandhe tu Ramesham Nagesham Darukavane","Varanasyam tu Vishvesham Tryambakam Gautamitate","Himalaye tu Kedaram Ghushmesham cha Shivalaye"].join("<br>");
$("#textlist").innerHTML=TEXTS.map(t=>`<div><h4>${t[0]}</h4><p>${t[1]}</p></div>`).join("");
render();
const h=location.hash.slice(1),k=JL.findIndex(j=>slug(j.n)===h);if(k>-1)openM(k);
