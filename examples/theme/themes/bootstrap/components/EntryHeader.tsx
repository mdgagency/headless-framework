import Link from 'next/link';

interface EntryHeaderProps {
  title: string;
  single?: boolean;
  slug?: string;
}
export const EntryHeader: React.FC<EntryHeaderProps> = ({
  single,
  title,
  slug,
}) => {
  return (
    <header className="entry-header has-text-align-center">
      <div className="entry-header-inner section-inner medium">
        {single ? (
          <h1 className="">{title}</h1>
        ) : (
          <h2 className="">
            <Link href={`/${slug}`}>
              <a href={`/${slug}`}>{title}</a>
            </Link>
          </h2>
        )}
      </div>
    </header>
  );
};
