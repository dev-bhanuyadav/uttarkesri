'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useBuilderStore } from '@/store/builderStore';
import { cn } from '@/lib/utils';

export function BuilderPreview() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { layout, previewDevice, zoom } = useBuilderStore();

  const sendLayout = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;
    iframe.contentWindow.postMessage(
      { type: 'uk-builder-layout', layout: JSON.parse(JSON.stringify(layout)) },
      '*'
    );
  }, [layout]);

  useEffect(() => {
    sendLayout();
  }, [layout, sendLayout]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const onLoad = () => {
      setTimeout(sendLayout, 100);
    };
    iframe.addEventListener('load', onLoad);
    return () => iframe.removeEventListener('load', onLoad);
  }, [sendLayout]);

  const width =
    previewDevice === 'desktop' ? '100%' : previewDevice === 'tablet' ? 768 : 375;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-uk-dark-bg">
      <div
        className="flex-1 flex justify-center overflow-auto p-4"
        style={{ zoom: zoom / 100 }}
      >
        <div
          className="bg-white rounded-uk-lg overflow-hidden shadow-2xl transition-all duration-200"
          style={{
            width: typeof width === 'number' ? width : width,
            maxWidth: '100%',
            minHeight: 600,
          }}
        >
          <iframe
            ref={iframeRef}
            src="/admin/builder/preview"
            title="Builder preview"
            className="w-full border-0 rounded-uk-lg"
            style={{ height: 800, minHeight: '80vh' }}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
}
