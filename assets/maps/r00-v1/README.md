# R00 v1b map assets

Version: `UF-R00-V1B-2026-10-09`.

The approved artwork is `design/maps/2026-10-08-v1/01-r00-forest-and-sacred-grove-v1b.png`.
`background.png` is its native-resolution crop `[18,50,1516,952)`, measuring
1498 × 902 pixels. For the CH00 renderer, source coordinates map into world
coordinates using `(sourceX - 18) * 1.25` and `(sourceY - 50) * 1.25`.

The existing imagegen cleanup is preserved in `cleanup-source.png`. It supplies
only the small rectangles in `manifest.json`; the full regenerated picture is
never used as the game background. The binary masks and SHA-256 proof show that
all source pixels outside the declared edits remain identical to the approved
image. `cleanup-regions-preview.png` marks the crop in yellow and permitted edits
in pink. `inspection-crops.png` compares approved art with the final local edits.

Chest, stone door, and purple rift sprites are copied from original source
pixels. Their alpha is binary 0/255; coordinates and pivots are in the manifest.
C2/C3 chests and the save star remain in the approved background. C1/C4 chests,
the closed stone face, and the prototype purple rift can be drawn as overlays.

Reproduce with a Python environment containing Pillow:

```powershell
python tools/prepare-r00-map-v1.py
```

This prepares artwork only. Runtime movement, collision, story gates and browser
acceptance are verified separately by the CH00 integration.
