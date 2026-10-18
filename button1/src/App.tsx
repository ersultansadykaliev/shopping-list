import { useState } from 'react';
import ShoppingItem from './ShoppingItem';

// Тип для одного товара
interface Item {
  id: number;
  name: string;
  price: number;
}

function App() {
  // State для списка покупок (с парой начальных товаров для примера)
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Молоко', price: 85 },
    { id: 2, name: 'Хлеб', price: 35 },
  ]);

  // State для полей ввода (название и цена)
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  // Функция добавления нового товара
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault(); // Чтобы страница не перезагружалась при отправке формы

    const numericPrice = parseFloat(price);
    if (!name.trim() || isNaN(numericPrice) || numericPrice <= 0) {
      alert('Пожалуйста, введите корректное название и цену больше 0');
      return;
    }

    const newItem: Item = {
      id: Date.now(), // Генерируем уникальный ID на основе текущего времени
      name: name.trim(),
      price: numericPrice,
    };

    setItems([...items, newItem]); // Добавляем товар в массив
    setName(''); // Очищаем поле названия
    setPrice(''); // Очищаем поле цены
  };

  // Функция удаления товара по ID
  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Подсчет общей стоимости всех покупок
  const totalCost = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4 text-center">Список покупок</h2>

          {/* Форма добавления товара */}
          <form onSubmit={handleAddItem} className="row g-2 mb-4">
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                placeholder="Название товара"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-sm-3">
              <input
                type="number"
                className="form-control"
                placeholder="Цена"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                step="any"
              />
            </div>
            <div className="col-sm-3 d-grid">
              <button type="submit" className="btn btn-primary">
                Добавить
              </button>
            </div>
          </form>

          {/* Список товаров */}
          {items.length === 0 ? (
            <p className="text-center text-muted my-3">Список покупок пуст</p>
          ) : (
            <ul className="list-group mb-3">
              {items.map((item) => (
                <ShoppingItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  onDelete={handleDeleteItem}
                />
              ))}
            </ul>
          )}

          {/* Общая стоимость */}
          <div className="d-flex justify-content-between align-items-center border-top pt-3">
            <h5 className="mb-0">Итого:</h5>
            <h4 className="mb-0 text-success fw-bold">{totalCost} сом</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;