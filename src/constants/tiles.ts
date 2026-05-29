import { TileProduct } from "@/types";

export const TILE_CATALOG: TileProduct[] = [
  {
    id: "ocean-wave",
    name: "Ocean Wave",
    unitPrice: 28.0,
    patternClass: "tile-ocean-wave",
    collectionIconClass: "tile-ocean-wave-sm",
  },
  {
    id: "forest-fern",
    name: "Forest Fern",
    unitPrice: 30.0,
    patternClass: "tile-forest-fern",
    collectionIconClass: "tile-forest-fern-sm",
  },
  {
    id: "terracotta-dot",
    name: "Terracotta Dot",
    unitPrice: 26.0,
    patternClass: "tile-terracotta-dot",
    collectionIconClass: "tile-terracotta-dot-sm",
  },
  {
    id: "yellow-star",
    name: "Yellow Star",
    unitPrice: 29.0,
    patternClass: "tile-yellow-star",
    collectionIconClass: "tile-yellow-star-sm",
  },
  {
    id: "geometric-blue",
    name: "Geometric Blue",
    unitPrice: 27.0,
    patternClass: "tile-geometric-blue",
    collectionIconClass: "tile-geometric-blue-sm",
  },
  {
    id: "floral-pink",
    name: "Floral Pink",
    unitPrice: 31.0,
    patternClass: "tile-floral-pink",
    collectionIconClass: "tile-floral-pink-sm",
  },
  {
    id: "bird-sage",
    name: "Bird Sage",
    unitPrice: 32.0,
    patternClass: "tile-bird-sage",
    collectionIconClass: "tile-bird-sage-sm",
  },
  {
    id: "wave-navy",
    name: "Wave Navy",
    unitPrice: 28.5,
    patternClass: "tile-wave-navy",
    collectionIconClass: "tile-wave-navy-sm",
  },
  {
    id: "dot-cream",
    name: "Dot Cream",
    unitPrice: 25.0,
    patternClass: "tile-dot-cream",
    collectionIconClass: "tile-dot-cream-sm",
  },
  {
    id: "star-mustard",
    name: "Star Mustard",
    unitPrice: 29.5,
    patternClass: "tile-star-mustard",
    collectionIconClass: "tile-star-mustard-sm",
  },
];

export const GRID_SIZE = 6;

export const SHIPPING_THRESHOLD = 500;
export const SHIPPING_COST = 25;

export const getTileById = (id: string) =>
  TILE_CATALOG.find((tile) => tile.id === id);
