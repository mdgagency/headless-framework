import Link from 'next/link';

interface EntryHeaderProps {
  title: string;
  single?: boolean;
  link: string;
}
export const EntryHeader: React.FC<EntryHeaderProps> = ({
  single,
  title,
  link,
}) => {
  return (
    <header className="entry-header has-text-align-center">
      <div className="entry-header-inner section-inner medium">
        {single ? (
          <h1 className="entry-title">{title}</h1>
        ) : (
          <h2 className="entry-title heading-size-1">
            <Link href={link}>
              <a href={link}>{title}</a>
            </Link>
          </h2>
        )}
      </div>
    </header>
  );
};
