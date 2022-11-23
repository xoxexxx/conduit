export const BackendErrorMessages = ({ backendErrors }) => {
  const err = Object.keys(backendErrors).map((name) => {
    const messages = backendErrors[name].join(" ");
    return `${name} ${messages}`;
  });
  return (
    <ul className="errz">
      {err.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  );
};
