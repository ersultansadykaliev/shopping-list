interface ShoppingItemProps {
  id: number
  name: string
  price: number
  onDelete: (id: number) => void
}

function ShoppingItem({ id, name, price, onDelete }: ShoppingItemProps) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <span className="fw-bold">{name}</span>
        <span className="text-muted ms-2">— {price} сом</span>
      </div>
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={() => onDelete(id)}
        aria-label={`Удалить ${name}`}
      >
        Удалить
      </button>
    </li>
  )
}

export default ShoppingItem
