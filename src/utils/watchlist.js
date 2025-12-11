// src/utils/watchlist.js

const WATCHLIST_KEY = "watchlist";

export function getWatchlist() {
  const stored = localStorage.getItem(WATCHLIST_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addToWatchlist(coin) {
  const list = getWatchlist();
  if (!list.find((c) => c.id === coin.id)) {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify([...list, coin]));
  }
}

export function removeFromWatchlist(id) {
  const list = getWatchlist();
  const updated = list.filter((coin) => coin.id !== id);
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
}

export function isInWatchlist(id) {
  const list = getWatchlist();
  return list.some((coin) => coin.id === id);
}
