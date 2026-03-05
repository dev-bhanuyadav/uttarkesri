'use client';

import { useEffect } from 'react';
import { BuilderTopBar } from '@/components/builder/BuilderTopBar';
import { BuilderLeftPanel } from '@/components/builder/BuilderLeftPanel';
import { BuilderPreview } from '@/components/builder/BuilderPreview';
import { BuilderRightPanel } from '@/components/builder/BuilderRightPanel';
import { useBuilderStore } from '@/store/builderStore';

export default function BuilderPage() {
  const { loadLayout, layout, page, markSaved } = useBuilderStore();

  useEffect(() => {
    fetch(`/api/admin/builder/layout?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.layout?.sections?.length) {
          loadLayout(data.layout);
        }
      })
      .catch(() => {});
  }, [page, loadLayout]);

  useEffect(() => {
    const saveDraft = document.getElementById('builder-save-draft');
    const publish = document.getElementById('builder-publish');
    function onSaveDraft() {
      fetch('/api/admin/builder/layout/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, pageName: layout.pageName, layoutJson: layout }),
      })
        .then((res) => res.ok && markSaved());
    }
    function onPublish() {
      fetch('/api/admin/builder/layout/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, pageName: layout.pageName, layoutJson: layout }),
      })
        .then((res) => res.ok && markSaved());
    }
    saveDraft?.addEventListener('click', onSaveDraft);
    publish?.addEventListener('click', onPublish);
    return () => {
      saveDraft?.removeEventListener('click', onSaveDraft);
      publish?.removeEventListener('click', onPublish);
    };
  }, [page, layout, markSaved]);

  return (
    <div className="h-screen flex flex-col bg-uk-dark-bg">
      <BuilderTopBar />
      <div className="flex-1 flex min-h-0">
        <BuilderLeftPanel />
        <BuilderPreview />
        <BuilderRightPanel />
      </div>
    </div>
  );
}
