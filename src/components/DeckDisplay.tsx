import type { DeckItem } from '../types';

interface Props {
  deck: DeckItem[];
  onRemoveCard: (cardId: string) => void;
}

export default function DeckDisplay({ deck, onRemoveCard }: Props) {
  return (
    <div style={{ border: '2px solid blue', padding: '1rem', width: '45%' }}>
      <h2>🃏 Your Deck</h2>
      {deck.length === 0 ? (
        <p>Your deck is looking a little empty. Add some cards!</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {deck.map((item) => (
            <li
              key={item.id}
              style={{
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>
                <strong>{item.count}x</strong> {item.name}
              </span>
              <button onClick={() => onRemoveCard(item.id)}>- Remove 1</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
