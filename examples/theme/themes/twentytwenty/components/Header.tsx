import { useGeneralSettings } from '@wpengine/headless';
import Link from 'next/link';

export const Header = () => {
  const siteInfo = useGeneralSettings();

  return (
    <header id="site-header" className="header-footer-group" role="banner">
      <div className="header-inner section-inner">
        <div className="header-titles-wrapper">
          <div className="header-titles">
            <Link href="/">
              <a href="/" className="site-title">
                {siteInfo?.title}
              </a>
            </Link>
            <div className="site-description">{siteInfo?.description}</div>
          </div>
        </div>
      </div>
    </header>
  );
};
