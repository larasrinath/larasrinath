#!/usr/bin/env python3
"""Build a small, optically lighter Mea Culpa font containing only U+0053."""

from pathlib import Path

import pyclipper
from fontPens.flattenPen import FlattenPen
from fontTools.pens.recordingPen import RecordingPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "static/fonts/MeaCulpa-Regular.woff2"
OUTPUT = ROOT / "static/fonts/MeaCulpa-S-350.woff2"
GLYPH_NAME = "S"
THINNING_UNITS = 1


def flattened_paths(glyph_set):
    recording = RecordingPen()
    GLYPH_NAME and glyph_set[GLYPH_NAME].draw(
        FlattenPen(recording, approximateSegmentLength=2)
    )

    paths = []
    current = None
    for command, points in recording.value:
        if command == "moveTo":
            current = [tuple(round(value) for value in points[0])]
        elif command == "lineTo" and current is not None:
            point = tuple(round(value) for value in points[0])
            if point != current[-1]:
                current.append(point)
        elif command == "closePath" and current:
            paths.append(current)
            current = None
    return paths


def thinned_glyph(glyph_set):
    offsetter = pyclipper.PyclipperOffset(2, 0.25)
    offsetter.AddPaths(
        flattened_paths(glyph_set),
        pyclipper.JT_ROUND,
        pyclipper.ET_CLOSEDPOLYGON,
    )
    contours = [
        list(reversed(path))
        for path in offsetter.Execute(-THINNING_UNITS)
        if abs(pyclipper.Area(path)) >= 25
    ]

    pen = TTGlyphPen(None)
    for contour in contours:
        pen.moveTo(contour[0])
        for point in contour[1:]:
            pen.lineTo(point)
        pen.closePath()
    return pen.glyph()


def rename_font(font):
    replacements = {
        1: "Lara Mea Culpa S",
        2: "Light",
        4: "Lara Mea Culpa S 350",
        6: "LaraMeaCulpaS-350",
        16: "Lara Mea Culpa S",
        17: "Light",
    }
    name_table = font["name"]
    for record in name_table.names:
        if record.nameID in replacements:
            name_table.setName(
                replacements[record.nameID],
                record.nameID,
                record.platformID,
                record.platEncID,
                record.langID,
            )


def main():
    font = TTFont(SOURCE)
    glyph_set = font.getGlyphSet()
    font["glyf"][GLYPH_NAME] = thinned_glyph(glyph_set)

    options = Options()
    options.name_IDs = ["*"]
    options.name_legacy = True
    subsetter = Subsetter(options=options)
    subsetter.populate(unicodes=[ord(GLYPH_NAME)])
    subsetter.subset(font)

    font["OS/2"].usWeightClass = 350
    rename_font(font)
    font.flavor = "woff2"
    font.save(OUTPUT)
    print(f"Wrote {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
