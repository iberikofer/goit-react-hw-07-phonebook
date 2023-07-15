import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';

export const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleSubbmit = e => {
    e.preventDefault();
    const contactObj = {
      name: e.target.elements.name.value,
      number: e.target.elements.number.value,
      id: nanoid(),
    };

    const checkPhonebookName =
      Array.isArray(contacts) &&
      contacts?.find(contact => contact.name === contactObj.name);
    if (!checkPhonebookName) {
      dispatch(addContact(contactObj));
      e.target.reset();
    } else {
      window.alert(`${contactObj.name} is already in your contacts.`);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubbmit}
        style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
      >
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          style={{ borderRadius: 15, padding: 5 }}
        />
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          style={{ borderRadius: 15, padding: 5 }}
        />
        <button type="submit">Add contact</button>
      </form>
    </div>
  );
};

export default ContactForm;
