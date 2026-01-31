import { useEffect, useState } from 'react';
import './App.scss';
import { fetchUsers } from './services/user';
import CreateModal from './components/CreateModal/CreateModal';
import Rows from './components/Rows/Rows';
import Users from './components/Users/Users';
import formatAmount from './utils/formatAmount';

const defaultRows = [
  {
    id: 1,
    total: 0,
    records: [],
    // records: [
    //   {
    //     user: {
    //       id: '1756492359455',
    //       name: 'artahir',
    //       emoji: '🤣',
    //     },
    //     amount: 0,
    //   },
    // ],
  },
];

function App() {
  const [users, setUsers] = useState([]);
  const [rows, setRows] = useState(
    JSON.parse(localStorage.getItem('rows') ?? 'null') ?? defaultRows
  );
  const [result, setResult] = useState({});
  const [modals, setModals] = useState({
    createUser: false,
  });

  function openModal(modal) {
    setModals({ ...modals, [modal]: true });
  }

  function closeModal(modal) {
    setModals({ ...modals, [modal]: false });
  }

  function addUser(user) {
    setUsers([...users, user]);
  }

  async function handleCopyResult() {
    try {
      let first = true;
      let text = '';
      for (const user of users) {
        if (result[user.id] != null) {
          if (!first) text += '\n';
          text += `${user.name}: ${formatAmount(result[user.id])}`;
          first = false;
        }
      }
      await navigator.clipboard.writeText(text);

      const copyElement = document.querySelector(
        '.user-section__header__actions__copy'
      );
      copyElement.classList.add('copied');
      setTimeout(() => {
        copyElement.classList.remove('copied');
      }, 300);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  async function loadUsers() {
    try {
      const users = await fetchUsers();
      setUsers(users);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const newResult = {};
    for (const row of rows) {
      for (const record of row.records ?? []) {
        newResult[record.user.id] =
          record.amount + (newResult[record.user.id] ?? 0);
      }
    }
    setResult(newResult);
  }, [rows]);

  useEffect(() => {
    localStorage.setItem('rows', JSON.stringify(rows));
  }, [rows]);

  return (
    <div className="bill-divider__container">
      {/* Header */}
      <div className="bill-divider__header">
        <h2 className="bill-divider__header__heading">Bill Divider</h2>
      </div>
      {/* Body */}
      <div className="bill-divider__body">
        {/* Left Section */}
        <div className="bill-divider__body__left-section">
          <Rows rows={rows} setRows={setRows} />
        </div>
        {/* Right Section */}
        <div className="bill-divider__body__right-section">
          <Users
            users={users}
            result={result}
            openModal={openModal}
            onCopy={handleCopyResult}
          />
        </div>
      </div>
      {/* Modals */}
      <CreateModal
        isOpen={modals.createUser}
        onClose={() => closeModal('createUser')}
        addUser={addUser}
      />
    </div>
  );
}

export default App;
