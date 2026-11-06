import React, { useState, useEffect } from 'react';

const cardData = [
  { id: 1, name: '🍎', label: 'Алим' },
  { id: 2, name: '🚀', label: 'Ракета' },
  { id: 3, name: '🐱', label: 'Муур' },
  { id: 4, name: '⚽', label: 'Бөмбөг' },
  { id: 5, name: '🚗', label: 'Машин' },
  { id: 6, name: '⭐', label: 'Од' },
];

export default function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disabled, setDisabled] = useState(false);

  // Тоглоом эхлэхэд картуудыг давхарлаж холих
  const shuffleCards = () => {
    const duplicatedCards = [...cardData, ...cardData]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, uniqueId: index }));
    
    setFlipped([]);
    setMatched([]);
    setCards(duplicatedCards);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  // Карт дээр дарвал
  const handleCardClick = (card) => {
    if (disabled) return;
    if (flipped.length === 0) {
      setFlipped([card]);
    } else if (flipped.length === 1) {
      if (flipped[0].uniqueId === card.uniqueId) return; // Давхар дарвал тоохгүй
      setFlipped([flipped[0], card]);
      setDisabled(true);

      // Ижилхэн эсэхийг шалгах
      if (flipped[0].name === card.name) {
        setMatched((prev) => [...prev, flipped[0].name]);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  };

  const resetTurn = () => {
    setFlipped([]);
    setDisabled(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4"></h1>
      
      <button 
        onClick={shuffleCards}
        className="mb-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold transition"
      >
        Шинээр эхлэх
      </button>

      <div className="grid grid-cols-4 gap-4 max-w-md w-full">
        {cards.map((card) => {
          const isFlipped = flipped.includes(card) || matched.includes(card);
          
          return (
            <div
              key={card.uniqueId}
              onClick={() => !isFlipped && handleCardClick(card)}
              className={`h-24 flex flex-col items-center justify-center text-3xl rounded-xl cursor-pointer transition-all duration-300 font-bold shadow-md ${
                isFlipped 
                  ? 'bg-white text-slate-900 rotate-y-180' 
                  : 'bg-indigo-900 hover:bg-indigo-800 text-transparent'
              }`}
            >
              {isFlipped ? (
                <>
                  <span>{card.name}</span>
                  <span className="text-xs text-slate-500 mt-1">{card.label}</span>
                </>
              ) : (
                <span className="text-white text-lg">❓</span>
              )}
            </div>
          );
        })}
      </div>

      {matched.length === cardData.length && (
        <div className="mt-6 text-xl font-bold text-green-400 animate-bounce">
          🎉 Баяр хүргэе! Та бүх хосыг оллоо!
        </div>
      )}
    </div>
  );
}