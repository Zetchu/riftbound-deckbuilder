import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CardList from './CardList';
import { RIFTBOUND_CARDS } from '../data/mockCards';
import { MemoryRouter } from 'react-router-dom';

describe('CardList', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <CardList cards={RIFTBOUND_CARDS} onAddCard={() => {}} />
      </MemoryRouter>
    );
    expect(screen.getByText('📚 Card Database')).toBeInTheDocument();
    expect(screen.getByText("Teemo's Mushroom")).toBeInTheDocument();
  });
});
