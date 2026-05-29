"use client";

import { motion } from "framer-motion";
import { TILE_CATALOG, getTileById } from "@/constants/tiles";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearGrid,
  placeTile,
  removeTileFromGrid,
  selectDesignGrid,
  selectEraseMode,
  selectPaletteTile,
  selectSelectedPaletteTile,
  setEraseMode,
} from "@/store/slices/designSlice";
import { TilePatternId } from "@/types";
import TileSwatch from "@/components/ui/TileSwatch";

export default function DesignTool() {
  const dispatch = useAppDispatch();
  const grid = useAppSelector(selectDesignGrid);
  const selectedTile = useAppSelector(selectSelectedPaletteTile);
  const eraseMode = useAppSelector(selectEraseMode);

  const placedCount = grid.flat().filter(Boolean).length;

  const handleCellClick = (row: number, col: number) => {
    const hasTile = Boolean(grid[row][col]);

    if (eraseMode || (!selectedTile && hasTile)) {
      if (hasTile) dispatch(removeTileFromGrid({ row, col }));
      return;
    }

    if (selectedTile) {
      dispatch(placeTile({ row, col }));
    }
  };

  const handleRemoveCell = (
    event: React.MouseEvent,
    row: number,
    col: number,
  ) => {
    event.stopPropagation();
    dispatch(removeTileFromGrid({ row, col }));
  };

  return (
    <section className="section-panel layout-transition desktop-only">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="label-caps text-[0.62rem] md:text-[0.68rem]">
            Visualize Your Order
          </h2>
          <p className="mt-1 text-[0.6rem] leading-relaxed text-ink/65">
            Select a tile from the palette and click cells to place. Use the
            eraser or the × button to remove tiles.
          </p>
        </div>
        {placedCount > 0 && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => dispatch(clearGrid())}
            className="shrink-0 border border-terracotta-dark bg-terracotta-dark/10 px-2 py-1 text-[0.55rem] font-bold uppercase tracking-wide text-terracotta-dark hover:bg-terracotta-dark/20"
          >
            Clear All
          </motion.button>
        )}
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <div
            className={`grid grid-cols-6 gap-0 border-2 border-ink bg-parchment-dark/50 ${
              eraseMode ? "ring-2 ring-terracotta-dark/40" : ""
            }`}
          >
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const tile = cell ? getTileById(cell) : null;
                return (
                  <motion.button
                    key={`${rowIndex}-${colIndex}`}
                    type="button"
                    whileHover={{ scale: cell ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    className={`group relative aspect-square border border-ink/20 transition-colors ${
                      eraseMode && cell
                        ? "cursor-pointer bg-terracotta-dark/10 hover:bg-terracotta-dark/25"
                        : selectedTile && !cell
                          ? "cursor-crosshair bg-white/40 hover:bg-tan/40"
                          : cell
                            ? "cursor-pointer hover:brightness-95"
                            : "cursor-default bg-white/20"
                    }`}
                    aria-label={
                      cell
                        ? `Remove ${tile?.name ?? "tile"} from row ${rowIndex + 1}, column ${colIndex + 1}`
                        : `Grid cell ${rowIndex + 1}, ${colIndex + 1}`
                    }
                  >
                    {tile && (
                      <>
                        <motion.div
                          layout
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className={`tile-swatch ${tile.patternClass} h-full w-full border-0`}
                        />
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(event) =>
                            handleRemoveCell(event, rowIndex, colIndex)
                          }
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              event.stopPropagation();
                              dispatch(
                                removeTileFromGrid({
                                  row: rowIndex,
                                  col: colIndex,
                                }),
                              );
                            }
                          }}
                          className="absolute -right-0.5 -top-0.5 z-10 flex h-4 w-4 items-center justify-center border border-ink/40 bg-terracotta-dark text-[0.55rem] font-bold leading-none text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 hover:scale-110"
                          aria-label={`Remove ${tile.name}`}
                        >
                          ×
                        </span>
                      </>
                    )}
                  </motion.button>
                );
              }),
            )}
          </div>
        </div>

        <div className="w-[4.5rem] shrink-0">
          <p className="mb-2 text-[0.55rem] font-bold uppercase tracking-wider">
            Palette
          </p>

          <button
            type="button"
            onClick={() => dispatch(setEraseMode(!eraseMode))}
            className={`mb-2 flex w-full flex-col items-center gap-0.5 border border-ink/30 py-2 text-[0.45rem] font-bold uppercase tracking-wide transition ${
              eraseMode
                ? "bg-terracotta-dark text-white"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-pressed={eraseMode}
          >
            <EraserIcon active={eraseMode} />
            Remove
          </button>

          <div className="flex max-h-[240px] flex-col gap-1.5 overflow-y-auto pr-1 scrollbar-artisan">
            {TILE_CATALOG.map((tile) => (
              <TileSwatch
                key={tile.id}
                patternClass={tile.patternClass}
                size="sm"
                selected={selectedTile === tile.id}
                title={tile.name}
                onClick={() =>
                  dispatch(
                    selectPaletteTile(
                      selectedTile === tile.id
                        ? null
                        : (tile.id as TilePatternId),
                    ),
                  )
                }
                className="w-full !h-10"
              />
            ))}
          </div>
        </div>
      </div>

      {eraseMode && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-[0.6rem] font-semibold text-terracotta-dark"
        >
          Remove mode — click placed tiles to erase them
        </motion.p>
      )}

      {selectedTile && !eraseMode && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-[0.6rem] font-semibold text-navy"
        >
          Selected: {getTileById(selectedTile)?.name} — click empty cells to
          place
        </motion.p>
      )}
    </section>
  );
}

function EraserIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-4 w-4 ${active ? "text-white" : "text-terracotta-dark"}`}
      fill="currentColor"
      aria-hidden
    >
      <path d="M8.5 2.5 2 9l7.5 7.5L16 10 8.5 2.5zm1.8 1.4 5.3 5.3-1.4 1.4-5.3-5.3 1.4-1.4zM3.4 9.6l5.3 5.3-1.4 1.4L2 11l1.4-1.4zM11.6 16.8l1.4-1.4 2.1 2.1-1.4 1.4-2.1-2.1z" />
    </svg>
  );
}
