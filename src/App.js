import { useState } from "react";
import "./App.css";

function App() {
  const [cardList, setCardList] = useState([
    { id: 1, order: 1, text: "Card 1" },
    { id: 2, order: 2, text: "Card 2" },
    { id: 3, order: 3, text: "Card 3" },
  ]);

  const [currentCard, setCurrentCard] = useState(null);

  function dragStartHandler(event, card) {
    event.target.classList.remove("leave", "hover","dropped");
   
    event.target.classList.add("hold");

    setCurrentCard(card);
  }

  function dragLeaveHandler(event) {
    event.target.classList.add("leave");
  }

  function dragEndHandler(event) {
    event.target.classList.remove("hold", "hover", "leave");
    event.target.classList.add("dropped");
  }

  function dragOverHandler(event) {
    event.preventDefault(event);
    event.target.classList.add("hover");
    event.target.classList.remove("leave", "hold", "dropped");
  }

  function dropHandler(event, card) {
    event.preventDefault(event);
    event.target.classList.remove("hold", "hover", "leave");
    event.target.classList.add("dropped");
    setCardList(
      cardList.map((c) => {
        if (c.id === card.id) {
          return { ...c, order: currentCard.order };
        }
        if (c.id === currentCard.id) {
          return { ...c, order: card.order };
        }
        return c;
      })
    );
  }

  const sortCard = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };
  return (
    <div className="box">
      {cardList.sort(sortCard).map((card) => (
        <div
          className="card"
          onDragStart={(event) => dragStartHandler(event, card)}
          onDragLeave={(event) => dragLeaveHandler(event)}
          onDragEnd={(event) => dragEndHandler(event)}
          onDragOver={(event) => dragOverHandler(event)}
          onDrop={(event) => dropHandler(event, card)}
          draggable={true}
        >
          {card.text}
        </div>
      ))}
    </div>
  );
}

export default App;
