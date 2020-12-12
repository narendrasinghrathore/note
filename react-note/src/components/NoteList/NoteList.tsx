export const NoteList = ({ list }: { list: string[] }) => {
  const noItems = list.length === 0;
  return (
    <ul>
      {noItems && <li>No items to show.</li>}
      {list.map((note: string) => (
        <li>{note}</li>
      ))}
    </ul>
  );
};
