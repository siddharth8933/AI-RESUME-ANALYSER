const API_BASE = "https://ai-resume-analyser-6-7nlj.onrender.com";
const $=id=>document.getElementById(id);
let lastFile=null;
function showError(el,msg){$(el).innerHTML=`<p class="error">${msg}</p>`}
async function analyse(){
 const file=$("resume").files[0]; if(!file)return showError("status","Select a PDF, DOCX or TXT resume.");
 lastFile=file; $("status").textContent="Analysing...";
 const fd=new FormData(); fd.append("resume",file);
 try{
  const r = await fetch(${API_BASE}/api/analyse, {method:"POST",body:fd}); const d=await r.json();
  if(!r.ok) throw Error(d.error);
  $("status").textContent="Analysis complete.";
  $("result").innerHTML=`<div class="grid">
  <div class="stat"><div class="muted">ATS score</div><div class="score">${d.ats_score}/100</div></div>
  <div class="stat"><div class="muted">Skills found</div><div class="score">${d.skill_count}</div></div>
  <div class="stat"><div class="muted">Words</div><div class="score">${d.word_count}</div></div>
  </div><p><b>Email:</b> ${d.email||"Not found"} &nbsp; <b>Phone:</b> ${d.phone||"Not found"}</p>
  <h3>Detected skills</h3><div class="tags">${d.skills.map(s=>`<span class="tag">${s}</span>`).join("")||"None detected"}</div>
  <h3>Suggestions</h3>${d.suggestions.map(s=>`<div class="suggest">• ${s}</div>`).join("")||'<p class="ok">No major basic issues detected.</p>'}`;
 }catch(e){$("status").textContent="";showError("result",e.message)}
}
async function matchJD(){
 const file=$("resume").files[0]||lastFile, jd=$("jd").value.trim();
 if(!file)return showError("match","Upload a resume first.");
 if(!jd)return showError("match","Paste a job description first.");
 const fd=new FormData();fd.append("resume",file);fd.append("job_description",jd);
 $("match").textContent="Checking...";
 try{
  const r = await fetch(${API_BASE}/api/match, {method:"POST",body:fd});const d=await r.json();if(!r.ok)throw Error(d.error);
  $("match").innerHTML=`<div class="grid"><div class="stat"><div class="muted">Job match</div><div class="score">${d.match_percentage}%</div></div><div class="stat"><div class="muted">Job skills</div><div class="score">${d.job_skills.length}</div></div></div>
  <h3>Matched skills</h3><div class="tags">${d.matched.map(s=>`<span class="tag">${s}</span>`).join("")||"None"}</div>
  <h3>Missing / not detected</h3><div class="tags">${d.missing.map(s=>`<span class="tag">${s}</span>`).join("")||"None"}</div>`;
 }catch(e){showError("match",e.message)}
}
