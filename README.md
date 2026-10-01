# Open Backrooms

**Noclip into the Backrooms, right in your browser.** Open Backrooms is a free, open-source, hyper-real Backrooms horror game. It runs on most PCs and Macs, with no download, no account and no payments.

**Play:** https://awn3x.github.io/Open-Backrooms/ (opens straight into the game once Pages is enabled; see below)

## Features

- **Three levels:** Level 0 *The Lobby*, Level 1 *Habitable Zone*, Level 2 *Pipe Dreams*, each infinite and procedurally generated.
- **Two ways to play:** an **Escape run** that follows Backrooms lore (Level 0's halls give way to Level 1's parking levels, a stairwell leads down to Level 2, and stairs to an elevator lead out: the Frontrooms?), or **Endless** on any one level with no way out.
- **The Base:** a lit safe zone at spawn with a supply kiosk, lockers and a bulletin board.
- **Backrooms Coins (BC):** earned only by playing (exploring, surviving, finding Almond Water, escaping). There is no real money anywhere in the game.
- **Multiplayer:**
  - **Browse Games:** every hosted game, filtered to your region or the whole world. Join with one click; password rooms ask for the password.
  - Quick Join public worlds with region-based matchmaking (NA/SA/EU/AF/AS/OC, 8 players per world, automatic overflow).
  - Host your own room (optional password, escape or endless) with an invite link. Hosts can kick players; kicks are cryptographically signed so only the real host can issue them.
  - Everything other players send is validated (positions, entity state, pickups, chat rate limits), so a modified client can't teleport entities onto you or grab everyone's items.
  - 3D proximity voice with wall occlusion and reverb.
  - Text chat with a toggleable profanity filter.
- **AI mode:** play offline with two AI companions who follow your route in formation, match your pace, scout ahead, flee crawlers, hold the Watcher in their torchlight, back off from Smilers, mark threats and items on screen, and hand you Almond Water when you need it. There's no chat, board or voice, but you still earn coins.
- **Bulletin board:** one global board for every player, shared through public Nostr relays. It resets every 30 days; spend more BC (earned in-game only) to keep a note up for 90 days, a year, or permanently (priced so high it's practically unreachable). You get a ping when someone pins a new note.
- **Entities:**
  - Crawlers: pale, emaciated things that hunt by sound.
  - The Watcher: a faceless office worker that only moves when nobody is looking.
  - Smilers: a grin in the dark that hates light.
  - Mimics: they copy your friends.
  - Pipe-dwellers: charred, long-necked things in Level 2.
  - Getting caught is a real jumpscare: the camera snaps to it as it lunges into your face, with an impact flash, shake and a hard cut to black (tone it down with *Reduce flashes*).
- **Feel:** responsive mouse look (optional raw input), snappy movement with gentle, adjustable head bob, landing springs, stamina, crouch and real camera motion blur. A faint film-grain / old-tape look is adjustable in Settings.
- **Sound:**
  - Physically modelled footsteps on carpet, concrete, metal and water, with per-step variation.
  - Positional ballast buzz from every fluorescent fixture.
  - Sparking outlets.
  - Breathing driven by exertion and fear, plus a heartbeat layer.
  - HRTF 3D audio with wall occlusion and per-level convolution reverb.
- **Runs almost anywhere:** automatic quality presets, dynamic resolution, and a baked light field that lets hundreds of fixtures light the scene cheaply.

## Controls

WASD move · Shift sprint · C crouch · Space jump · F flashlight · E interact · Q drink Almond Water · R swap battery · T chat · V push-to-talk · Tab players / pause · Esc pause. Gamepads are supported.

## Run locally

```bash
npm install
npm run dev           # http://localhost:5173/
npm test              # world-gen determinism / connectivity tests
npm run build         # static site in docs/
npm run publish-site  # test + build; commit docs/ to publish
```

## Deploy (free)

The site is the game: `index.html` opens straight to the game screen. `npm run build` writes a static site with relative URLs to `docs/`, and that folder is committed, so there's no build server or workflow. The same `docs/` works on GitHub Pages under `/Open-Backrooms/` and on Vercel at the root. Old `/play/` links redirect to the root and keep their invite codes. Multiplayer is peer-to-peer (WebRTC, signalled over public Nostr relays through [Trystero](https://github.com/dmotz/trystero)), so there's no server to host or pay for.

**GitHub Pages (one-time setup)**
1. Merge to `main`.
2. In the repo, go to **Settings → Pages → Build and deployment**.
3. Set **Source** to **Deploy from a branch**, then choose branch **`main`** and folder **`/docs`**. Click **Save**.
4. After about a minute the game is live at `https://<user>.github.io/Open-Backrooms/`.

After changing the source, run `npm run publish-site` and commit the updated `docs/`.

**Vercel**
1. Go to https://vercel.com/new and import the repository (the free Hobby plan is fine).
2. `vercel.json` sets the build (`npm run build`, output `docs`). Click **Deploy**.

## How the assets are made

Everything is generated by scripts in `tools/`:

- `tools/textures/`: tileable PBR texture generators in numpy (wallpaper, carpet, ceiling tile atlas, lens, decals, concrete, pipe metal, block, plate). Each writes albedo, normal and ORM maps in two resolution tiers.
- `tools/blender/`: Blender (`bpy` 4.5) scripts that model the outlets (duplex, two-prong, GFCI, broken), switch plates, troffers, vents, exits, hub furniture and props, then export glTF.
- `tools/blender/mh_build.py`: the player avatar, Crawler, Dweller and Watcher, built from the [MakeHuman](https://github.com/makehumancommunity/makehuman) CC0 base mesh and skeleton. It morphs the body, reduces the rig to 59 game bones, dresses characters in clothing shells, and keys the animation clips.
- `tools/blender/bake.py`: procedural skin, knit, denim, cotton and leather shaders (mottling, veins, ribs, cracks, stains, cavity grime, pores) baked with Cycles into albedo / roughness / normal textures on MakeHuman's UV layout. `closeup.py` renders lit close-ups for review.
- `tools/audio/`: physically inspired sound synthesis (numpy/scipy), exported to Ogg Vorbis and AAC. Screams, stingers and jumpscares are tuned against Google's YAMNet AudioSet classifier (`tune.py`, `eval_yamnet.py`): each take has to be heard as what it's meant to be (e.g. *Screaming*, not *siren*).

```bash
python -m venv .venv && . .venv/bin/activate
pip install bpy==4.5.4 numpy scipy soundfile imageio-ffmpeg pillow
python tools/textures/gen_l0.py && python tools/textures/gen_l12.py
python tools/blender/build_all.py
git clone --depth 1 https://github.com/makehumancommunity/makehuman ../makehuman
MH_DATA=../makehuman/makehuman/data python tools/blender/mh_build.py
python tools/audio/build_audio.py
```

## Credits

The Backrooms began as an anonymous 2019 creepypasta and grew through a large community of writers and artists. This is a fan work inspired by that shared mythology, and it is not affiliated with any Backrooms film or wiki project. It is built with three.js, Blender, Web Audio and Trystero. The human base mesh and skeleton come from MakeHuman (CC0).

MIT licensed.
