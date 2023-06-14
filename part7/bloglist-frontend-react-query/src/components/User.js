const User = ({ blogs }) => {
  if (blogs) {
    return (
      <div>
        <h2>{blogs[0].user.name}</h2>
        <h4>added blogs</h4>
        <ul>
          {blogs.map((b) => (
            <li key={b.id}>{b.title}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return "No blogs added";
  }
};

export default User;
