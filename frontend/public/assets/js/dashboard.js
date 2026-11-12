 function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('show');
  }

  function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
  }

  function filterCards() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('.alumni-col').forEach(col => {
      col.style.display = col.dataset.name.includes(query) ? '' : 'none';
    });
  }


   var jobs = [
    {
      title: "abc",
      company: "abc",
      location: "abc",
      type: "Full-Time",
      description: "abc",
      requirements: "abc",
      salary: "10-20",
      applyLink: "",
      postedBy: "admin"
    }
  ];

  function renderJobs(list) {
    var el = document.getElementById("jobsList");
    var noEl = document.getElementById("noJobs");
    if (!list.length) {
      el.innerHTML = "";
      noEl.style.display = "block";
      return;
    }
    noEl.style.display = "none";
    el.innerHTML = list.map(function(j, i) {
      var applyBtn = j.applyLink
        ? '<a href="' + j.applyLink + '" target="_blank" class="btn-apply">Apply <i class="bi bi-box-arrow-up-right" style="font-size:12px;"></i></a>'
        : '<button class="btn-apply" onclick="alert(\'No apply link provided.\')">Apply <i class="bi bi-box-arrow-up-right" style="font-size:12px;"></i></button>';

      return '<div class="job-card">' +
        '<div class="job-title-row">' +
          '<span class="job-title">' + escHtml(j.title) + '</span>' +
          '<span class="badge-type">' + escHtml(j.type) + '</span>' +
        '</div>' +
        '<div class="job-meta">' +
          '<span><i class="bi bi-building" style="font-size:13px;"></i> ' + escHtml(j.company) + '</span>' +
          (j.location ? '<span><i class="bi bi-geo-alt" style="font-size:13px;"></i> ' + escHtml(j.location) + '</span>' : '') +
          (j.salary ? '<span class="salary"><i class="bi bi-currency-dollar" style="font-size:13px;"></i> ' + escHtml(j.salary) + '</span>' : '') +
        '</div>' +
        (j.description ? '<div class="job-description">' + escHtml(j.description) + '</div>' : '') +
        (j.requirements ? '<div class="job-requirements">Requirements: ' + escHtml(j.requirements) + '</div>' : '') +
        '<div class="job-footer">' +
          '<span class="job-posted">Posted by ' + escHtml(j.postedBy) + '</span>' +
          applyBtn +
        '</div>' +
      '</div>';
    }).join('');
  }

  function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function filterJobs() {
    var q = document.getElementById("searchInput").value.toLowerCase();
    var t = document.getElementById("typeFilter").value;
    var filtered = jobs.filter(function(j) {
      var matchQ = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q);
      var matchT = !t || j.type === t;
      return matchQ && matchT;
    });
    renderJobs(filtered);
  }

  function openModal() {
    document.getElementById("postJobModal").classList.add("show");
    document.body.style.overflow = "hidden";
    ["fTitle","fCompany","fLocation","fDesc","fReqs","fSalary","fLink"].forEach(function(id){ document.getElementById(id).value = ""; });
    document.getElementById("fType").value = "Full-Time";
    document.getElementById("formError").style.display = "none";
  }

  function closeModal() {
    document.getElementById("postJobModal").classList.remove("show");
    document.body.style.overflow = "";
  }

  document.getElementById("postJobModal").addEventListener("click", function(e) {
    if (e.target === this) closeModal();
  });

  function submitJob() {
    var title   = document.getElementById("fTitle").value.trim();
    var company = document.getElementById("fCompany").value.trim();
    var desc    = document.getElementById("fDesc").value.trim();
    var errEl   = document.getElementById("formError");

    if (!title || !company || !desc) {
      errEl.textContent = "Please fill in all required fields (Job Title, Company, Description).";
      errEl.style.display = "block";
      return;
    }

    errEl.style.display = "none";
    jobs.unshift({
      title:      title,
      company:    company,
      location:   document.getElementById("fLocation").value.trim(),
      type:       document.getElementById("fType").value,
      description:desc,
      requirements:document.getElementById("fReqs").value.trim(),
      salary:     document.getElementById("fSalary").value.trim(),
      applyLink:  document.getElementById("fLink").value.trim(),
      postedBy:   "Harinder Singh"
    });

    filterJobs();
    closeModal();
  }

  function toggleSidebar() {
    var s = document.getElementById("sidebar");
    var o = document.getElementById("sidebarOverlay");
    var open = s.classList.toggle("open");
    o.style.display = open ? "block" : "none";
    document.body.style.overflow = open ? "hidden" : "";
  }

  renderJobs(jobs);



   const openBtn = document.getElementById('openModal');
  const closeBtn = document.getElementById('closeModal');
  const overlay = document.getElementById('modalOverlay');
  const submitBtn = document.getElementById('submitAnnouncement');
  const cardsList = document.getElementById('cardsList');
  const emptyState = document.getElementById('emptyState');
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  openBtn.addEventListener('click', () => overlay.classList.add('open'));
  closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });

  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('open');
  });
  sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('open');
  });

  submitBtn.addEventListener('click', () => {
    const title = document.getElementById('inputTitle').value.trim();
    const category = document.getElementById('inputCategory').value;
    const body = document.getElementById('inputBody').value.trim();
    if (!title || !body) { alert('Please fill in title and message.'); return; }

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const card = document.createElement('div');
    card.className = 'announcement-card mb-3';
    card.innerHTML = `
      <div class="d-flex justify-content-between align-items-start mb-1">
        <span class="tag-badge">${category}</span>
        <div class="d-flex align-items-center gap-2">
          <span class="card-date">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${dateStr}
          </span>
          <button class="delete-btn" onclick="this.closest('.announcement-card').remove(); checkEmpty();">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          </button>
        </div>
      </div>
      <div class="card-title">${title}</div>
      <div class="card-body-text">${body}</div>
      <div class="card-author">By admin</div>
    `;
    cardsList.prepend(card);
    checkEmpty();

    document.getElementById('inputTitle').value = '';
    document.getElementById('inputBody').value = '';
    document.getElementById('inputCategory').value = 'General';
    overlay.classList.remove('open');
  });

  function checkEmpty() {
    emptyState.style.display = cardsList.children.length === 0 ? 'block' : 'none';
  }