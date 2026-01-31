import './Row.scss';
import UserCard from '../UserCard/UserCard';
import formatAmount from '../../utils/formatAmount';

export default function Row({
  row,
  addRecord,
  removeRecord,
  removeRow,
  onTotalChange,
}) {
  function handleRowDragOver(e) {
    e.target.style.backgroundColor = '#121212ff';
    e.preventDefault();
  }

  function handleRowDragLeave(e) {
    e.target.style.backgroundColor = '';
    e.preventDefault();
  }

  function handleRowDrop(e) {
    e.preventDefault();
    const userJson = e.dataTransfer.getData('user');
    const user = JSON.parse(userJson);
    addRecord(row.id, user);
    e.target.style.backgroundColor = '';
  }

  return (
    <div className="row">
      <div
        className="row__users-container"
        onDragOver={handleRowDragOver}
        onDragLeave={handleRowDragLeave}
        onDrop={handleRowDrop}
      >
        {/* <div className="row__users-container__placeholder"></div> */}
        {row.records?.map((record, index) => (
          <div className="row__users-container__record">
            {index !== 0 ? (
              <div className="row__users-container__record__add">+</div>
            ) : null}
            <div className="row__users-container__record__card">
              <UserCard user={record.user} />
              <div className="row__users-container__record__card__amount">
                {formatAmount(record.amount)}
              </div>
              <div
                title="Remove user"
                className="row__users-container__record__card__remove"
                onClick={() => removeRecord(row.id, record.user)}
              >
                ⛔
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row__total-container">
        <div>Total</div>
        <input
          className="row__total-container__input"
          type="number"
          value={row.total ?? 0}
          onChange={(e) => onTotalChange(row.id, e.target.value)}
        />
      </div>
      <div
        title="Remove row"
        className="row__remove"
        onClick={() => removeRow(row.id)}
      >
        ⛔
      </div>
    </div>
  );
}
