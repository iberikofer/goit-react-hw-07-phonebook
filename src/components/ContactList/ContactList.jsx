import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/slices/contactsSlice';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const onDelete = contactId => {
    dispatch(deleteContact(contactId));
  };

  const buildMarkup = () => {
    const filteredContacts =
      contacts.length > 0
        ? filter
          ? contacts.filter(contact => contact.name.includes(filter))
          : contacts
        : [];

    return filteredContacts.length > 0 ? (
      filteredContacts.map(contact => (
        <li key={contact.id}>
          {contact.name}: {contact.number}{' '}
          <button onClick={() => onDelete(contact.id)}>Delete</button>
        </li>
      ))
    ) : filteredContacts.length === 0 && contacts.length > 0 ? (
      <p>No matches for your filter :(</p>
    ) : (
      <p>There are no contacts in your phonebook =(</p>
    );
  };

  return (
    <div style={{ marginBottom: 230 }}>
      <ul>{buildMarkup()}</ul>
    </div>
  );
};

export default ContactList;
