// src/App.tsx
import { useState, useEffect, useMemo } from 'react';
import CardList from './components/CardList';
import DeckDisplay from './components/DeckDisplay';
import { RIFTBOUND_CARDS } from './data/mockCards';
import { checkDeckLimits } from './utils/deckRules';
import type { Card, DeckItem } from './types';

export default function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [deck, setDeck] = useState<DeckItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setCards(RIFTBOUND_CARDS);
  }, []);

  const totalCards = useMemo(() => {
    return deck.reduce((sum, item) => sum + item.count, 0);
  }, [deck]);

  const handleAddCard = (card: Card) => {
    const validation = checkDeckLimits(deck, card);

    if (!validation.allowed) {
      setErrorMessage(validation.reason || 'Cannot add card.');
      return;
    }

    setErrorMessage('');

    setDeck((prevDeck) => {
      const existing = prevDeck.find((item) => item.id === card.id);
      if (existing) {
        return prevDeck.map((item) =>
          item.id === card.id ? { ...item, count: item.count + 1 } : item
        );
      }
      return [...prevDeck, { ...card, count: 1 }];
    });
  };

  const handleRemoveCard = (cardId: string) => {
    setErrorMessage('');
    setDeck((prevDeck) => {
      const existing = prevDeck.find((item) => item.id === cardId);
      if (existing && existing.count > 1) {
        return prevDeck.map((item) =>
          item.id === cardId ? { ...item, count: item.count - 1 } : item
        );
      }
      return prevDeck.filter((item) => item.id !== cardId);
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1>⚔️ Riftbound Decksmith</h1>

      <div style={{ minHeight: '24px', marginBottom: '10px' }}>
        {errorMessage && (
          <span style={{ color: 'red', fontWeight: 'bold' }}>
            {errorMessage}
          </span>
        )}
      </div>

      <h3>Total Cards: {totalCards} / 40</h3>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <CardList cards={cards} onAddCard={handleAddCard} />
        <DeckDisplay deck={deck} onRemoveCard={handleRemoveCard} />
      </div>
    </div>
  );
}
