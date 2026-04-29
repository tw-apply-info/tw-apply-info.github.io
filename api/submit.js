module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Parse body manually in case Vercel doesn't auto-parse
  let body = req.body;
  if (!body || typeof body === 'string') {
    try {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      body = JSON.parse(Buffer.concat(chunks).toString());
    } catch {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }
  }
  const { content, filename, title } = body || {};

  if (!content || !filename) {
    return res.status(400).json({ error: 'Missing content or filename' });
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo  = process.env.GITHUB_REPO;
  const base  = process.env.GITHUB_BASE_BRANCH || 'master';

  if (!token || !owner || !repo) {
    return res.status(500).json({ error: 'Server misconfiguration: missing env vars' });
  }

  const branch   = 'post/' + filename.replace('.md', '');
  const filePath = '_posts/' + filename;

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  };

  try {
    // 1. Get base branch SHA
    const refRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/ref/heads/${base}`,
      { headers }
    );
    if (!refRes.ok) {
      const err = await refRes.json();
      throw new Error('Failed to get branch ref: ' + (err.message || refRes.status));
    }
    const { object: { sha } } = await refRes.json();

    // 2. Create new branch
    const branchRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/refs`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ ref: `refs/heads/${branch}`, sha }),
      }
    );
    if (!branchRes.ok) {
      const err = await branchRes.json();
      throw new Error('Failed to create branch: ' + (err.message || branchRes.status));
    }

    // 3. Commit file to new branch
    const fileContent = Buffer.from(content).toString('base64');
    const fileRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          message: `Add post: ${filename}`,
          content: fileContent,
          branch,
        }),
      }
    );
    if (!fileRes.ok) {
      const err = await fileRes.json();
      throw new Error('Failed to commit file: ' + (err.message || fileRes.status));
    }

    // 4. Open Pull Request
    const prRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: title ? `New post: ${title}` : `New post: ${filename}`,
          head: branch,
          base,
          body: '## New Application Record\n\nSubmitted via the online form.\n\n**File:** `' + filePath + '`',
        }),
      }
    );
    if (!prRes.ok) {
      const err = await prRes.json();
      throw new Error('Failed to create PR: ' + (err.message || prRes.status));
    }
    const pr = await prRes.json();

    return res.status(200).json({ pr_url: pr.html_url, pr_number: pr.number });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
