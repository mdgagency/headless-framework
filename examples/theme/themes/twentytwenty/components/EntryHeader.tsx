interface EntryHeaderProps {
  title: string;
  single?: boolean;
}
export const EntryHeader: React.FC<EntryHeaderProps> = ({ single, title }) => {
  return (
    <header className="entry-header has-text-align-center">
      <div className="entry-header-inner section-inner medium">
        {single ? (
          <h1 className="entry-title">{title}</h1>
        ) : (
          <h2 className="entry-title heading-size-1">
            <a href="">{title}</a>
          </h2>
        )}
      </div>
    </header>
  );
};
