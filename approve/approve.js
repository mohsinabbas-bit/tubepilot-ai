;(function () {
  const cfg = window.TUBEPILOT_APPROVE || {}
  const statusEl = document.getElementById('status')
  const listEl = document.getElementById('list')
  const params = new URLSearchParams(window.location.search)
  const token = (params.get('t') || '').trim()

  function banner(type, text) {
    statusEl.innerHTML = `<div class="banner ${type}">${escapeHtml(text)}</div>`
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  async function sb(path, init) {
    const url = `${String(cfg.supabaseUrl || '').replace(/\/$/, '')}/rest/v1/${path}`
    const res = await fetch(url, {
      ...init,
      headers: {
        apikey: cfg.supabaseAnonKey,
        Authorization: `Bearer ${cfg.supabaseAnonKey}`,
        'Content-Type': 'application/json',
        Prefer: init && init.prefer ? init.prefer : 'return=representation',
        ...(init && init.headers ? init.headers : {})
      }
    })
    const text = await res.text()
    let json = null
    try {
      json = text ? JSON.parse(text) : null
    } catch (_) {
      json = null
    }
    if (!res.ok) throw new Error(text || res.statusText)
    return json
  }

  if (!token) {
    banner('err', 'Missing invite token. Open the full invite link from TubePilot → Team.')
    return
  }
  if (!cfg.supabaseUrl || !cfg.supabaseAnonKey) {
    banner('err', 'Approve page is not configured (config.js).')
    return
  }

  let invite = null

  async function load() {
    banner('ok', 'Loading invite…')
    const invites = await sb(
      `agency_invites?token=eq.${encodeURIComponent(token)}&status=eq.active&select=*`
    )
    if (!Array.isArray(invites) || !invites[0]) {
      banner('err', 'This invite link is invalid or was revoked.')
      listEl.innerHTML = ''
      return
    }
    invite = invites[0]
    banner('ok', `Signed in as teammate “${invite.label || 'Teammate'}”. Pending videos below.`)

    const rows = await sb(
      `agency_pending_reviews?owner_id=eq.${encodeURIComponent(invite.owner_id)}&status=eq.pending&order=created_at.desc&select=*`
    )
    if (!Array.isArray(rows) || rows.length === 0) {
      listEl.innerHTML = '<div class="approve-card empty">No videos waiting for approval right now. Check back later.</div>'
      return
    }
    listEl.innerHTML = rows.map(renderCard).join('')
    rows.forEach((row) => bindCard(row))
  }

  function renderCard(row) {
    const id = escapeHtml(row.id)
    return `
      <div class="approve-card" data-id="${id}">
        <div class="meta">${escapeHtml(row.channel_name || 'Channel')} · ${escapeHtml(row.file_name || '')}</div>
        <div class="score">Readiness ${Number(row.readiness_score || 0)}/100 · Hook ${Number(row.hook_score || 0)}/100</div>
        <label>Title</label>
        <input data-field="title" value="${escapeHtml(row.title || '')}" />
        <label>Description</label>
        <textarea data-field="description">${escapeHtml(row.description || '')}</textarea>
        <label>Tags (comma separated)</label>
        <input data-field="tags" value="${escapeHtml((row.tags || []).join(', '))}" />
        <label>Hashtags</label>
        <input data-field="hashtags" value="${escapeHtml((row.hashtags || []).join(' '))}" />
        <p class="meta" style="margin-top:10px">${escapeHtml(row.reasoning || '')}</p>
        <div class="actions">
          <button class="btn btn-ok" data-act="approve">Approve &amp; send to upload</button>
          <button class="btn btn-no" data-act="reject">Reject</button>
        </div>
      </div>`
  }

  function parseList(raw, sep) {
    return String(raw || '')
      .split(sep)
      .map((s) => s.trim())
      .filter(Boolean)
  }

  function bindCard(row) {
    const card = listEl.querySelector(`[data-id="${CSS.escape(row.id)}"]`)
    if (!card) return
    card.querySelector('[data-act="approve"]').addEventListener('click', async () => {
      try {
        const title = card.querySelector('[data-field="title"]').value.trim()
        const description = card.querySelector('[data-field="description"]').value.trim()
        const tags = parseList(card.querySelector('[data-field="tags"]').value, /,/)
        const hashtags = parseList(card.querySelector('[data-field="hashtags"]').value, /\s+/).map((h) =>
          h.startsWith('#') ? h : `#${h}`
        )
        await sb(`agency_pending_reviews?id=eq.${encodeURIComponent(row.id)}`, {
          method: 'PATCH',
          prefer: 'return=minimal',
          body: JSON.stringify({
            status: 'approved',
            decided_title: title,
            decided_description: description,
            decided_tags: tags,
            decided_hashtags: hashtags,
            decided_by_token: token,
            decided_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
        })
        card.innerHTML = `<div class="banner ok">Approved. The owner’s TubePilot app will upload this video shortly.</div>`
      } catch (err) {
        banner('err', String(err.message || err))
      }
    })
    card.querySelector('[data-act="reject"]').addEventListener('click', async () => {
      try {
        await sb(`agency_pending_reviews?id=eq.${encodeURIComponent(row.id)}`, {
          method: 'PATCH',
          prefer: 'return=minimal',
          body: JSON.stringify({
            status: 'rejected',
            decided_by_token: token,
            decided_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
        })
        card.innerHTML = `<div class="banner err">Rejected. Sent back to the owner’s queue.</div>`
      } catch (err) {
        banner('err', String(err.message || err))
      }
    })
  }

  load().catch((err) => banner('err', String(err.message || err)))
})()
