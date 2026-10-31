# RSSD sites

Public configuration for ten RSSD sites: stable site/workspace identifiers,
sections, display modules, public origins, RSS sources and brand assets.
Operational credentials and live content belong outside this repository.

In the assembled RSSD workspace this repository lives at `sites/`. The engine
uses `profiles.json`, `organization/` and `branding/`; content is supplied by
the authenticated publication receiver. Historical article seeds are empty.

## Independent build

Run `npm run build` with Node.js 24+. The build fetches the exact public core
commit in `compatibility.json`, assembles its pinned public dependencies under
`.local/`, and overlays this repository. No private checkout or account is
required. Artifacts remain under `.local/`; this command does not deploy.
