"""Build every model. Usage: python tools/blender/build_all.py [name ...]"""
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import bpy  # noqa: F401,E402
import props  # noqa: E402

try:
    import characters  # noqa: E402
    CHARS = characters.ALL
except ImportError:
    CHARS = []

only = set(sys.argv[1:])
for fn in props.ALL + CHARS:
    if only and fn.__name__ not in only:
        continue
    t = time.time()
    print(f"[{fn.__name__}]")
    fn()
    print(f"  {time.time() - t:.1f}s")
