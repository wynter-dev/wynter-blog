'use client';

import {useEffect} from 'react';

export default function AdBanner({adSlot, className}: {
  adSlot: string;
  className?: string;
}) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Adsense error:', e);
    }
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{display: 'block'}}
        data-ad-client="ca-pub-6689558343928586"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
