import useAsync from '../hooks/useAsync';
import type { Card } from '../types';

const getApiUrl = () => {
  if (import.meta.env.DEV) {
    return '/api/cards';
  }
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(
    'https://api.riftcodex.com/cards'
  )}`;
};

export async function fetchAllCards(): Promise<Card[]> {
  const response = await fetch(getApiUrl());
  if (!response.ok) throw new Error('Could not fetch cards');
  const json = await response.json();

  if (Array.isArray(json)) {
    return json;
  }
  if (json && Array.isArray(json.cards)) {
    return json.cards;
  }
  if (json && Array.isArray(json.data)) {
    return json.data;
  }
  if (json && Array.isArray(json.items)) {
    return json.items;
  }

  console.error('Unexpected API response format:', json);
  throw new Error('API did not return a list of cards');
}

export function useCards() {
  return useAsync(fetchAllCards);
}
