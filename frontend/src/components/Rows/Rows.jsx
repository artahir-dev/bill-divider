import './Rows.scss';
import Row from '../Row/Row.jsx';

export default function Rows({ rows = [], setRows }) {
  function addRecord(rowId, user) {
    for (const row of rows) {
      if (row.id === rowId) {
        for (const record of row.records ?? []) {
          if (record.user.id === user.id) {
            return;
          }
        }
      }
    }

    const newRows = rows.map((row) => {
      if (row.id === rowId) {
        let newRecords = [
          {
            user,
            amount: 0,
          },
          ...(row.records ?? []),
        ];

        newRecords = newRecords.map((record) => ({
          ...record,
          amount: row.total / newRecords.length || 0,
        }));

        return {
          ...row,
          records: newRecords,
        };
      }
      return row;
    });

    setRows(newRows);
  }

  function removeRecord(rowId, user) {
    const newRows = rows.map((row) => {
      if (row.id === rowId) {
        let newRecords = row.records.filter(
          (record) => record.user.id !== user.id
        );

        newRecords = newRecords.map((record) => ({
          ...record,
          amount: row.total / newRecords.length || 0,
        }));

        return {
          ...row,
          records: newRecords,
        };
      }
      return row;
    });

    setRows(newRows);
  }

  function handleTotalChange(rowId, value) {
    const newRows = rows.map((row) => {
      if (row.id === rowId) {
        return {
          ...row,
          records: (row.records ?? []).map((record) => ({
            ...record,
            amount: value / row.records.length,
          })),
          total: value,
        };
      }
      return row;
    });

    setRows(newRows);
  }

  function addRow() {
    const newRows = [
      ...rows,
      {
        id: Date.now().toString(),
        total: 0,
        records: [],
      },
    ];
    setRows(newRows);
  }

  function removeRow(rowId) {
    const newRows = rows.filter((row) => row.id !== rowId);
    setRows(newRows);
  }

  return (
    <div className="rows">
      <h3 className="rows__heading">Rows</h3>
      <div className="rows__container">
        {rows.map((row) => (
          <Row
            row={row}
            addRecord={addRecord}
            removeRecord={removeRecord}
            removeRow={removeRow}
            onTotalChange={handleTotalChange}
          />
        ))}
      </div>
      <button className="rows__add-button" onClick={addRow}>
        +
      </button>
    </div>
  );
}
