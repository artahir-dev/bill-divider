import './UserCard.scss';

export default function UserCard({ user, draggable, onDragStart }) {
  return (
    <div
      // id={user.id}
      // key={user.id}
      className="user-card"
      style={{ cursor: draggable ? 'grab' : 'auto' }}
      draggable={draggable ? 'true' : 'false'}
      onDragStart={(e) => onDragStart?.(e, user)}
    >
      <span className="user-card__emoji">{user.emoji || '❓'}</span>
      <h4 className="user-card__name">{user.name}</h4>
    </div>
  );
}
