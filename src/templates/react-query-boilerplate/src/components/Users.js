import AsyncData from "../Infra";

export default function Users() {
  const { isLoading, error, data } = AsyncData("users");

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>
        <strong>👀</strong> USERS
      </h1>
      {data.map((user) => (
        <p key={user.id}>
          {user.id} - {user.name}
        </p>
      ))}
    </div>
  );
}
