<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Morveau</title>

<style>
  :root{
    --bg:#0b1220;
    --panel:#0f1a2b;
    --panel2:#0c1626;
    --border:rgba(255,255,255,.10);
    --text:#e7eefc;
    --muted:rgba(231,238,252,.72);

    --primary:#4f46e5;
    --primary2:#7c3aed;

    --label:#cbd5e1;
    --label2:rgba(203,213,225,.78);

    --danger:#ef4444;

    --rowHover:rgba(255,255,255,.05);
    --missingBg:rgba(239,68,68,.18);
    --doneBg:rgba(255,255,255,.03);

    --hlMay: rgba(56,189,248,.26);
    --slMay: rgba(56,189,248,.06);
    --hlNov: rgba(249,115,22,.28);
    --slNov: rgba(249,115,22,.11);

    --p1-bg: rgba(56,189,248,.18);
    --p1ab-bg: rgba(56,189,248,.10);
    --p2-bg: rgba(34,197,94,.18);
    --p3-bg: rgba(124,58,237,.18);

    --btn:#2b3a5a;
    --btnHover:#344a73;
    --link:#93c5fd;
  }

  [data-theme="light"]{
    --bg:#f6f7fb;
    --panel:#ffffff;
    --panel2:#f2f4fb;
    --border:rgba(0,0,0,.10);
    --text:#0f172a;
    --muted:rgba(15,23,42,.70);

    --primary:#4f46e5;
    --primary2:#6d28d9;

    --label:#334155;
    --label2:rgba(51,65,85,.78);

    --danger:#dc2626;

    --rowHover:rgba(15,23,42,.04);
    --missingBg:rgba(220,38,38,.10);
    --doneBg:rgba(15,23,42,.03);

    --hlMay: rgba(8,145,178,.18);
    --slMay: rgba(8,145,178,.05);
    --hlNov: rgba(194,65,12,.20);
    --slNov: rgba(194,65,12,.10);

    --p1-bg: rgba(8,145,178,.12);
    --p1ab-bg: rgba(8,145,178,.07);
    --p2-bg: rgba(22,163,74,.12);
    --p3-bg: rgba(109,40,217,.12);

    --btn:#e8ecf7;
    --btnHover:#dfe6fb;
    --link:#1d4ed8;
  }

  body{
    font:15px "Segoe UI",sans-serif;
    background:var(--bg);
    color:var(--text);
    margin:16px auto;
    max-width:1420px;
  }

  #bar{
    display:flex;
    gap:10px;
    justify-content:center;
    flex-wrap:wrap;
    margin-bottom:10px;
    align-items:center;
    position:relative;
  }

  #loadedDot{
    width:12px; height:12px;
    border-radius:999px;
    border:1px solid var(--border);
    background:rgba(255,255,255,.06);
    display:inline-block;
    margin-right:2px;
    box-shadow:0 0 0 2px rgba(0,0,0,0);
  }
  #loadedDot.loaded{
    background:color-mix(in srgb, var(--primary) 55%, transparent);
    box-shadow:0 0 0 2px color-mix(in srgb, var(--primary) 18%, transparent);
  }
  #loadedWrap{
    display:flex;
    align-items:center;
    gap:6px;
    position:absolute;
    left:0;
    top:0;
    transform:translateY(2px);
    opacity:.85;
    user-select:none;
  }
  #loadedWrap .txt{
    font-size:12px;
    color:var(--muted);
    font-weight:800;
    letter-spacing:.2px;
  }

  button,select,input[type=text],textarea{
    border:1px solid var(--border);
    border-radius:12px;
    padding:8px 12px;
    font-size:13px;
    background:var(--panel2);
    color:var(--text);
    outline:none;
    box-sizing:border-box;
  }

  button{
    cursor:pointer;
    background:var(--primary);
    border-color:transparent;
    color:white;
  }
  button:hover{ filter:brightness(1.06); }
  button:disabled{
    opacity:.65;
    cursor:default;
    filter:none;
  }

  .btnGhost{
    background:var(--btn);
    border-color:var(--border);
    color:var(--text);
  }
  .btnGhost:hover{ background:var(--btnHover); }

  .btnDanger{ background:var(--danger); }
  .btnDanger:hover{ filter:brightness(1.06); }

  a{ color:var(--link); text-decoration:none }
  a:hover{ text-decoration:underline }

  .panelWrap{ display:none; max-width:1420px; margin:0 auto 10px; }
  .panel{
    background:var(--panel);
    border:1px solid var(--border);
    border-radius:16px;
    padding:12px;
    display:grid;
    grid-template-columns:repeat(3,minmax(300px,1fr));
    gap:10px;
  }
  .group{
    background:var(--panel2);
    border:1px solid var(--border);
    border-radius:14px;
    padding:10px;
  }
  .group h3{ margin:0 0 8px; font-size:13px; letter-spacing:.2px; color:var(--label2); }
  .note{ font-size:12px; opacity:.9; line-height:1.35; color:var(--muted); }

  .checklist{
    display:flex;
    flex-direction:column;
    gap:7px;
    max-height:260px;
    overflow:auto;
    padding-right:6px;
  }
  .item{ display:flex; gap:8px; align-items:center }
  .item label{ cursor:pointer }
  input[type=checkbox], input[type=radio]{ transform:scale(1.05); accent-color:var(--primary2); }
  .footerRow{ display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-top:8px }

  table{
    width:100%;
    border-collapse:collapse;
    font-size:14px;
    border-radius:16px;
    overflow:hidden;
    border:1px solid var(--border);
    background:var(--panel);
  }
  th,td{
    padding:7px 10px;
    border-bottom:1px solid var(--border);
    text-align:left;
    vertical-align:middle;
    line-height:1.15;
  }
  th{
    color:var(--label);
    font-weight:900;
    background:linear-gradient(to bottom, rgba(255,255,255,.02), transparent);
    font-size:13px;
    padding:9px 10px;
  }
  th.compact, td.compact{ white-space:nowrap }
  tbody tr:hover td{ background:var(--rowHover); }

  .yearhead{
    background:var(--panel2);
    font-weight:900;
    color:var(--label);
    padding:8px 10px !important;
  }

  .hlMay{ background:var(--hlMay); }
  .slMay{ background:var(--slMay); }
  .hlNov{ background:var(--hlNov); }
  .slNov{ background:var(--slNov); }

  .missingRow{ background:var(--missingBg); }
  .doneRow{ background:var(--doneBg) !important; color:var(--muted); }

  .small{ font-size:12px; color:var(--muted); }

  .pill{
    border:1px solid var(--border);
    border-radius:999px;
    padding:3px 9px;
    font-size:12px;
    font-weight:900;
    display:inline-flex;
    align-items:center;
  }
  .pill.p1{ background:var(--p1-bg); }
  .pill.p1a,.pill.p1b{ background:var(--p1ab-bg); }
  .pill.p2{ background:var(--p2-bg); }
  .pill.p3{ background:var(--p3-bg); }

  .missTxt{ color:var(--danger); font-weight:900 }

  .progCell{ display:flex; align-items:center; justify-content:center; }
  .progStack{ display:flex; flex-direction:column; justify-content:center; gap:6px; width:150px; }
  .statRail{
    display:flex;
    border:1px solid var(--border);
    border-radius:14px;
    overflow:hidden;
    background:rgba(255,255,255,.02);
    height:40px;
  }
  .statBtn{
    flex:1;
    padding:0;
    background:transparent;
    border:none;
    color:var(--muted);
    cursor:pointer;
    font-weight:900;
    font-size:15px;
  }
  .statBtn:hover{ background:var(--rowHover); }
  .statBtn.active{
    background:color-mix(in srgb, var(--primary) 38%, transparent);
    color:var(--text);
  }
  .notesBtn{
    background:var(--btn);
    border:1px solid var(--border);
    color:var(--text);
    border-radius:12px;
    padding:8px 10px;
    cursor:pointer;
    height:40px;
  }
  .notesBtn:hover{ background:var(--btnHover); }

  .doneStamp{
    font-size:11px;
    color:var(--muted);
    text-align:center;
    line-height:1.2;
    margin-top:-2px;
    min-height:14px;
  }

  #notePopover{
    position:fixed;
    display:none;
    z-index:120;
    width:360px;
    background:var(--panel);
    border:1px solid var(--border);
    border-radius:16px;
    box-shadow:0 18px 50px rgba(0,0,0,.35);
    padding:10px;
    box-sizing:border-box;
  }
  #notePopover .hdr{
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:10px;
    margin-bottom:8px;
  }
  #notePopover textarea{
    width:100%;
    min-height:140px;
    border-radius:14px;
    box-sizing:border-box;
    display:block;
  }
  #notePopover .actions{
    display:flex;
    gap:8px;
    justify-content:flex-end;
    margin-top:8px;
  }

  #previewPane{
    position:fixed;
    top:58px;
    left:0;
    width:44%;
    height:86%;
    background:var(--panel);
    border-right:1px solid var(--border);
    display:none;
    z-index:60;
    border-top-right-radius:16px;
    border-bottom-right-radius:16px;
    overflow:hidden;
    box-shadow:0 18px 60px rgba(0,0,0,.30);
  }
  #previewPane.msShift{ left:120px; }

  #previewTop{
    display:flex;
    align-items:center;
    gap:8px;
    padding:10px;
    border-bottom:1px solid var(--border);
    background:linear-gradient(to bottom, rgba(255,255,255,.04), transparent);
  }
  #previewTitle{
    flex:1;
    font-weight:900;
    font-size:12px;
    color:var(--muted);
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .pbtn{
    background:var(--btn);
    border:1px solid var(--border);
    color:var(--text);
    border-radius:12px;
    padding:7px 10px;
    cursor:pointer;
    font-weight:800;
    font-size:12px;
  }
  .pbtn:hover{ background:var(--btnHover); }

  #previewFrame{ width:100%; height:calc(100% - 52px); border:none; }

  #previewPane.full{
    top:0;
    left:0 !important;
    width:100% !important;
    height:100% !important;
    border-radius:0 !important;
    border-right:none;
  }

  #themeBtn{
    position:absolute;
    right:0;
    top:0;
    background:var(--btn);
    border:1px solid var(--border);
    color:var(--text);
  }
  #themeBtn:hover{ background:var(--btnHover); }
</style>
</head>
<body>

<div id="bar">
  <div id="loadedWrap" title="Papers loaded status">
    <span id="loadedDot"></span>
    <span class="txt" id="loadedText">Not loaded</span>
  </div>

  <input type="text" id="search" placeholder="Search (year / session / tz / level / subject / file / notes)" size="44">
  <button id="pick">Choose Folder</button>
  <button id="filtersBtn" class="btnGhost">Filters</button>
  <button id="rulesBtn" class="btnGhost">Missing Rules</button>

  <button id="themeBtn" title="Toggle light/dark">☀︎ / ☾</button>
</div>

<div id="filtersWrap" class="panelWrap">
  <div class="panel">
    <div class="group">
      <h3>Subjects</h3>
      <div class="checklist" id="subjectsList"></div>
      <div class="footerRow">
        <button id="subAll" class="btnGhost">Select all</button>
        <button id="subNone" class="btnGhost">Select none</button>
      </div>
      <div class="note">If any filter section is empty, nothing is shown.</div>
    </div>

    <div class="group">
      <h3>Session / Level / TZ / Papers</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div>
          <div class="small" style="margin-bottom:6px">Session</div>
          <div class="checklist" id="sessionsList"></div>
          <div class="footerRow">
            <button id="sesAll" class="btnGhost">All</button>
            <button id="sesNone" class="btnGhost">None</button>
          </div>
        </div>
        <div>
          <div class="small" style="margin-bottom:6px">Level</div>
          <div class="checklist" id="levelsList"></div>
          <div class="footerRow">
            <button id="lvlAll" class="btnGhost">All</button>
            <button id="lvlNone" class="btnGhost">None</button>
          </div>
        </div>
        <div>
          <div class="small" style="margin-bottom:6px">Timezone</div>
          <div class="checklist" id="tzList"></div>
          <div class="footerRow">
            <button id="tzAll" class="btnGhost">All</button>
            <button id="tzNone" class="btnGhost">None</button>
          </div>
        </div>
        <div>
          <div class="small" style="margin-bottom:6px">Papers</div>
          <div class="checklist" id="papersList"></div>
          <div class="footerRow">
            <button id="papAll" class="btnGhost">All</button>
            <button id="papNone" class="btnGhost">None</button>
          </div>
        </div>
      </div>
    </div>

    <div class="group">
      <h3>Availability + Progress</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div>
          <div class="small" style="margin-bottom:6px">Availability</div>
          <div class="checklist" id="availList"></div>
        </div>
        <div>
          <div class="small" style="margin-bottom:6px">Progress</div>
          <div class="checklist" id="statusList"></div>
        </div>
      </div>
      <div class="footerRow">
        <button id="downloadProgress" class="btnGhost">Download progress</button>
        <button id="importProgressFile" class="btnGhost">Import progress</button>
        <button id="resetProgress" class="btnDanger">Reset progress</button>
      </div>
    </div>
  </div>
</div>

<div id="rulesWrap" class="panelWrap">
  <div class="panel">
    <div class="group" style="grid-column:1 / -1">
      <h3>Missing Rules</h3>
      <div class="note">Rules decide what is expected.</div>
    </div>

    <div class="group" style="grid-column:1 / 3">
      <h3>Create Rule</h3>
      <div class="footerRow" style="margin-top:0">
        <select id="ruleType">
          <option value="disable">Disable combination</option>
          <option value="enableP1ab">Enable combination (P1a/P1b)</option>
        </select>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:10px">
        <div>
          <div class="small" style="margin-bottom:6px">Subjects</div>
          <div class="checklist" id="ruleSubjects"></div>
          <div class="footerRow">
            <button id="rsAll" class="btnGhost">Select all</button>
            <button id="rsNone" class="btnGhost">Select none</button>
          </div>
        </div>

        <div>
          <div class="small" style="margin-bottom:6px">Years</div>
          <div class="checklist" id="ruleYears"></div>
          <div class="footerRow">
            <button id="ryAll" class="btnGhost">Select all</button>
            <button id="ryNone" class="btnGhost">Select none</button>
          </div>
        </div>

        <div>
          <div class="small" style="margin-bottom:6px">Papers</div>
          <div class="checklist" id="rulePapers"></div>
          <div class="footerRow">
            <button id="rpAll" class="btnGhost">Select all</button>
            <button id="rpNone" class="btnGhost">Select none</button>
          </div>

          <div style="margin-top:10px">
            <div class="small" style="margin-bottom:6px">Level</div>
            <div class="checklist" id="ruleLevels"></div>
          </div>
          <div style="margin-top:10px">
            <div class="small" style="margin-bottom:6px">Timezone</div>
            <div class="checklist" id="ruleTZ"></div>
          </div>
          <div style="margin-top:10px">
            <div class="small" style="margin-bottom:6px">Session</div>
            <div class="checklist" id="ruleSessions"></div>
          </div>
        </div>
      </div>

      <div class="footerRow" style="margin-top:12px">
        <button id="clearRuleConfig" class="btnGhost">Clear all</button>
        <button id="selectAllRuleConfig" class="btnGhost">Select all</button>
      </div>

      <div class="footerRow" style="margin-top:10px">
        <button id="addRule">Add rule</button>
      </div>
    </div>

    <div class="group" style="grid-column:3 / 4">
      <h3>Current Rules</h3>
      <div id="rulesList" class="checklist"></div>
      <div class="footerRow">
        <button id="clearRules" class="btnDanger">Clear all rules</button>
      </div>

      <div style="margin-top:10px">
        <h3 style="margin:0 0 8px">Rules Export / Import</h3>
        <textarea id="rulesJson" readonly style="min-height:140px"></textarea>
        <div class="footerRow">
          <button id="updateRulesJson" class="btnGhost">Update JSON</button>
          <button id="downloadRules" class="btnGhost">Download rules</button>
          <button id="importRulesFile" class="btnGhost">Import rules</button>
        </div>
      </div>
    </div>
  </div>
</div>

<table id="tbl">
<thead>
<tr>
  <th class="compact" style="width:70px">Year</th>
  <th class="compact" style="width:70px">Session</th>
  <th class="compact" style="width:220px">Subject</th>
  <th class="compact" style="width:60px">Lvl</th>
  <th class="compact" style="width:45px">TZ</th>
  <th class="compact" style="width:70px">Paper</th>
  <th>Question paper</th>
  <th>Markscheme</th>
  <th class="compact" style="width:170px;text-align:center">Progress</th>
</tr>
</thead>
<tbody></tbody>
</table>

<div id="previewPane" aria-hidden="true">
  <div id="previewTop">
    <div id="previewTitle">Preview</div>
    <button id="previewDownload" class="pbtn" title="Save a copy">⤓</button>
    <button id="previewFull" class="pbtn" title="Fullscreen">⤢</button>
    <button id="previewClose" class="pbtn" title="Close">✕</button>
  </div>
  <iframe id="previewFrame"></iframe>
</div>

<div id="notePopover" role="dialog" aria-modal="false">
  <div class="hdr">
    <div class="title" style="font-weight:900;font-size:13px">Notes</div>
    <button id="noteClose" class="btnGhost" style="padding:6px 10px;border-radius:12px">Close</button>
  </div>
  <div class="small" style="margin-bottom:8px">Completed questions (e.g. 1, 2a, 3b):</div>
  <textarea id="noteText"></textarea>
  <div class="actions">
    <button id="noteSave" class="btnGhost">Save</button>
  </div>
</div>

<input type="file" id="rulesFile" accept=".json,.txt" style="display:none">
<input type="file" id="progressFile" accept=".json,.txt" style="display:none">

<script src="./app.js"></script>
</body>
</html>
