import { useState } from 'react';
import Modal from '../Modal/Modal';
import './CreateModal.scss';
import { createUser } from '../../services/user';
import EMOJIS from '../../assets/emojis';

function CreateModal({ isOpen, onClose, addUser }) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = {
        name,
        emoji,
      };
      const user = await createUser(formData);
      addUser(user);
      setName('');
      setEmoji('');
      onClose();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="create-modal__heading">Create User</h3>
      <form className="create-modal__form" onSubmit={handleSubmit}>
        <div className="create-modal__form__group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="create-modal__form__group">
          <label htmlFor="emoji">Emoji</label>
          <select
            id="emoji"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            required
          >
            <option value="" disabled hidden>
              Select an emoji
            </option>
            {EMOJIS.map((emj) => (
              <option key={emj} value={emj}>
                {emj}
              </option>
            ))}
          </select>
        </div>

        <button className="create-modal__form__submit-button" type="submit">
          Submit
        </button>
      </form>
    </Modal>
  );
}

export default CreateModal;
