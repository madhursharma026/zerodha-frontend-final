import { DndContext, closestCenter } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { ListGroup } from 'react-bootstrap'
import styles from './LeftSidebar.module.css'
import TokenRow from './TokenRow'

export default function TokenList({ items, setItems, onBuy, onSell, onDelete }) {
  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return
    const oldIndex = items.findIndex((i) => i.name === active.id)
    const newIndex = items.findIndex((i) => i.name === over.id)
    setItems(arrayMove(items, oldIndex, newIndex))
  }

  const renderSkeleton = () => <div className={styles.skeleton}></div>

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={items.map((i) => i.name)} strategy={verticalListSortingStrategy}>
        <ListGroup variant="flush" className="mediumFontSize">
          {items.map((item) => (
            <TokenRow
              key={item.name}
              item={item}
              isProfit={parseFloat(item.change) > 0}
              onBuy={onBuy}
              onSell={onSell}
              onDelete={onDelete}
            />
          ))}
        </ListGroup>
      </SortableContext>
    </DndContext>
  )
}
