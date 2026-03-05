'use client';

import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useBuilderStore } from '@/store/builderStore';
import { cn } from '@/lib/utils';

export function BuilderRightPanel() {
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'layout'>('content');
  const { getSelectedSection, selectedSectionId, updateSection, removeSection, duplicateSection } = useBuilderStore();
  const section = getSelectedSection();

  if (!section) {
    return (
      <aside className="w-80 flex-shrink-0 bg-uk-dark-surface border-l border-uk-dark-border flex flex-col items-center justify-center text-uk-dark-muted text-uk-sm p-6">
        <p className="font-devanagari text-center">किसी सेक्शन को चुनें या नया जोड़ें</p>
      </aside>
    );
  }

  const bgColor = (section.style?.backgroundColor as string) || '#ffffff';

  return (
    <aside className="w-80 flex-shrink-0 flex flex-col bg-uk-dark-surface border-l border-uk-dark-border overflow-hidden">
      <div className="p-2 border-b border-uk-dark-border flex items-center justify-between">
        <span className="font-devanagari font-medium text-uk-sm truncate">{section.nameHi}</span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => duplicateSection(section.id)}
            className="p-1.5 rounded-uk-sm hover:bg-uk-dark-card text-uk-xs"
            title="Duplicate"
          >
            📋
          </button>
          <button
            type="button"
            onClick={() => removeSection(section.id)}
            className="p-1.5 rounded-uk-sm hover:bg-uk-red/20 text-red-400 text-uk-xs"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="flex border-b border-uk-dark-border">
        {(['content', 'style', 'layout'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 py-2 text-uk-xs',
              activeTab === tab ? 'bg-uk-dark-card text-uk-saffron border-b-2 border-uk-saffron' : 'text-uk-dark-muted'
            )}
          >
            {tab === 'content' ? '⚙️ Content' : tab === 'style' ? '🎨 Style' : '📐 Layout'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-3">
        {activeTab === 'content' && (
          <div className="space-y-3 text-uk-sm">
            <p className="text-uk-dark-muted text-uk-xs">
              सेक्शन-विशिष्ट कंट्रोल यहाँ दिखेंगे। (Type: {section.type})
            </p>
            <label className="block">
              <span className="block text-uk-xs text-uk-dark-muted mb-1">दृश्यता</span>
              <input
                type="checkbox"
                checked={section.isVisible}
                onChange={(e) => updateSection(section.id, { isVisible: e.target.checked })}
                className="rounded"
              />
              <span className="ml-2">सेक्शन दिखाएं</span>
            </label>
          </div>
        )}

        {activeTab === 'style' && (
          <div className="space-y-4">
            <div>
              <label className="block text-uk-xs text-uk-dark-muted mb-1">पृष्ठभूमि रंग</label>
              <div className="flex gap-2 items-center">
                <div
                  className="w-10 h-10 rounded-uk-md border border-uk-dark-border cursor-pointer"
                  style={{ backgroundColor: bgColor }}
                />
                <HexColorPicker
                  color={bgColor}
                  onChange={(color) => updateSection(section.id, { style: { ...section.style, backgroundColor: color } })}
                  style={{ width: '100%', height: 120 }}
                />
              </div>
              <input
                type="text"
                value={bgColor}
                onChange={(e) => updateSection(section.id, { style: { ...section.style, backgroundColor: e.target.value } })}
                className="mt-2 w-full px-2 py-1 rounded-uk-sm bg-uk-dark-card border border-uk-dark-border text-uk-dark-text text-uk-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-uk-xs text-uk-dark-muted mb-1">Padding Top (px)</label>
              <input
                type="number"
                value={(section.style?.padding as { top?: number })?.top ?? 24}
                onChange={(e) =>
                  updateSection(section.id, {
                    style: {
                      ...section.style,
                      padding: { ...(section.style?.padding as object), top: Number(e.target.value) || 0 },
                    },
                  })
                }
                className="w-full px-2 py-1 rounded-uk-sm bg-uk-dark-card border border-uk-dark-border text-uk-dark-text text-uk-sm"
              />
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="space-y-3 text-uk-sm">
            <div>
              <label className="block text-uk-xs text-uk-dark-muted mb-1">चौड़ाई</label>
              <select
                value={(section.layout?.width as string) ?? 'boxed'}
                onChange={(e) =>
                  updateSection(section.id, {
                    layout: { ...section.layout, width: e.target.value as 'full' | 'boxed' | 'narrow' },
                  })
                }
                className="w-full px-2 py-1.5 rounded-uk-sm bg-uk-dark-card border border-uk-dark-border text-uk-dark-text"
              >
                <option value="full">Full width</option>
                <option value="boxed">Boxed (1280px)</option>
                <option value="narrow">Narrow (900px)</option>
              </select>
            </div>
            <div>
              <label className="block text-uk-xs text-uk-dark-muted mb-1">एनिमेशन</label>
              <select
                value={(section.layout?.animation as { effect?: string })?.effect ?? 'fadeIn'}
                onChange={(e) =>
                  updateSection(section.id, {
                    layout: {
                      ...section.layout,
                      animation: {
                        ...(section.layout?.animation as object),
                        effect: e.target.value as 'none' | 'fadeIn' | 'slideUp' | 'slideLeft' | 'zoomIn' | 'bounce',
                      },
                    },
                  })
                }
                className="w-full px-2 py-1.5 rounded-uk-sm bg-uk-dark-card border border-uk-dark-border text-uk-dark-text"
              >
                <option value="none">None</option>
                <option value="fadeIn">Fade In</option>
                <option value="slideUp">Slide Up</option>
                <option value="slideLeft">Slide Left</option>
                <option value="zoomIn">Zoom In</option>
                <option value="bounce">Bounce</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
