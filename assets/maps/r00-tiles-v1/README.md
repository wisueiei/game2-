# R00 layered scene building blocks

These are separate objects and small terrain tokens extracted from the approved
`01-r00-forest-and-sacred-grove-v1b.png`; no whole-map background is supplied.

The manifest provides `trees.broadleafBlue`, `rootedBlue`, `coniferBlue`, and
`ancientHollow`. Each tree has separate canopy/trunk PNGs, a full transparent PNG,
native size, foot pivot and a separate 12×6 collider suggestion. Draw native
pixels at 1.25 and sort the entire object by its placed foot Y. The collider does
not use the large crown rectangle. `trees-preview.png` shows transparency.

All opaque pixels retain source RGB and alpha is 0/255. The conifer's original
trunk was hidden by another tree: this template explicitly combines its visible
original crown with an exposed original rooted trunk. Component source rectangles
and placement offsets record that assembly; it is not an intact original crop.

`terrain-atlas.png` supplies twelve native 16/32-pixel tokens for grass, dirt,
rock, cliffs, water, falls, wood and stairs. `objects` also provides transparent
original bridge/stair components. The engine must build terrain from these
tokens along the existing approved layout and place tree entities as individual
objects. Crops cannot recover the original unseen ground under a tree.

Reproduce with Pillow:

```powershell
python tools/prepare-r00-tiles-v1.py
```

This asset preparation has no runtime or visual acceptance claim.
