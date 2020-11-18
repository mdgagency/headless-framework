import React, { useLayoutEffect, useRef } from 'react';
import { useRouter } from 'next/router';

interface InnerHtmlProps<T = Element> extends React.HTMLAttributes<T> {
  html?: string | null;
  element?: keyof JSX.IntrinsicElements;
}

export function InnerHtml<T = Element>({
  html,
  element,
  ...props
}: InnerHtmlProps<T>) {
  const router = useRouter();
  const elRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!elRef.current) {
      return;
    }

    const links: NodeListOf<HTMLAnchorElement> = elRef.current.querySelectorAll(
      'a',
    );

    links.forEach((link) => {
      link.addEventListener('click', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        // No need to wait for this, we don't care about when it finishes
        void router.push(link.href, undefined, {
          shallow: true,
        });
      });
    });
  });

  return React.createElement(element || 'div', {
    dangerouslySetInnerHTML: {
      __html: html || '',
    },
    ref: elRef,
    ...props,
  });
}
