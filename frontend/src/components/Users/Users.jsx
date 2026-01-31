import './Users.scss';
import UserCard from '../UserCard/UserCard';
import formatAmount from '../../utils/formatAmount';

export default function Users({ users, result, openModal, onCopy }) {
  function handleUserDragStart(e, user) {
    e.dataTransfer.setData('user', JSON.stringify(user));
  }

  return (
    <>
      <div className="user-section__header">
        <h3 className="user-section__header__heading">Users</h3>
        <div className="user-section__header__actions">
          <span
            title="Copy result"
            className="user-section__header__actions__copy"
            onClick={onCopy}
          >
            📋
          </span>
          <button
            title="Add new user"
            className="user-section__header__actions__add-button"
            onClick={() => openModal('createUser')}
          >
            +
          </button>
        </div>
      </div>
      <div className="user-section__body">
        <div className="user-section__body__grid">
          {users
            .filter((user) => result[user.id] != null)
            .map((user) => (
              <div className="user-section__body__grid__card">
                <UserCard
                  user={user}
                  draggable={true}
                  onDragStart={handleUserDragStart}
                />
                <div className="user-section__body__grid__card__result">
                  {formatAmount(result[user.id])}
                </div>
              </div>
            ))}
          {users
            .filter((user) => result[user.id] == null)
            .map((user) => (
              <div className="user-section__body__grid__card">
                <UserCard
                  user={user}
                  draggable={true}
                  onDragStart={handleUserDragStart}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
