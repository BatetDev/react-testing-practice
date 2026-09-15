function User({ user }) {
  const { name, email } = user;

  return (
    <div className='person'>
      <h3>{name}</h3>
      <span>{email}</span>
    </div>
  );
}

export default User;
