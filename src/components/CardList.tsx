import type { Card } from '../types';

interface Props {
  cards: Card[];
  onAddCard: (card: Card) => void;
}

export default function CardList({ cards, onAddCard }: Props) {
  return (
    <div style={{ border: '2px dashed gray', padding: '1rem', width: '45%' }}>
      <h2>📚 Card Database</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {cards.map((card) => (
          <li
            key={card.id}
            style={{
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              <strong>{card.name}</strong> (Cost: {card.cost}) - {card.type}
            </span>
            <button onClick={() => onAddCard(card)}>+ Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
