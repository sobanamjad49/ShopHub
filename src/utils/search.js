export const SEARCH_HISTORY_KEY = 'ecommerce_search_history';
const MAX_HISTORY = 8;

const levenshtein = (a, b) => {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i += 1) dp[i][0] = i;
  for (let j = 0; j <= n; j += 1) dp[0][j] = j;
  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
};

export const fuzzyMatch = (query, text) => {
  const q = query.toLowerCase().trim();
  const t = text.toLowerCase();
  if (!q) return true;
  if (t.includes(q)) return true;
  if (q.length <= 2) return false;
  const words = t.split(/\s+/);
  return words.some((word) => {
    if (word.startsWith(q)) return true;
    const dist = levenshtein(q, word.slice(0, q.length + 2));
    return dist <= Math.max(1, Math.floor(q.length / 3));
  });
};

export const productMatchesSearch = (product, term) => {
  const q = term.trim();
  if (!q) return true;
  const fields = [product.name, product.description, product.category].filter(Boolean);
  return fields.some((field) => fuzzyMatch(q, field));
};

export const getSearchHistory = () => {
  try {
    const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const addSearchHistory = (term) => {
  const trimmed = term.trim();
  if (!trimmed) return;
  const history = getSearchHistory().filter((h) => h.toLowerCase() !== trimmed.toLowerCase());
  history.unshift(trimmed);
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
};

export const clearSearchHistory = () => {
  localStorage.removeItem(SEARCH_HISTORY_KEY);
};

export const getTrendingProducts = (products, limit = 4) =>
  [...products]
    .sort((a, b) => (b.rating * (b.reviews || 1)) - (a.rating * (a.reviews || 1)))
    .slice(0, limit);

export const getRecommendedProducts = (products, productId, limit = 4) => {
  const current = products.find((p) => p.id === productId);
  if (!current) return products.slice(0, limit);
  return products
    .filter((p) => p.id !== productId && p.category === current.category)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const getFrequentlyBoughtTogether = (products, productId, limit = 3) => {
  const current = products.find((p) => p.id === productId);
  if (!current) return [];
  const seed = productId % 7;
  return products
    .filter((p) => p.id !== productId)
    .sort((a, b) => ((a.id + seed) % 11) - ((b.id + seed) % 11))
    .slice(0, limit);
};
