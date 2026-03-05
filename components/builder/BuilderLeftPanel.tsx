'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useBuilderStore } from '@/store/builderStore';
import { SECTION_DEFINITIONS, SECTION_CATEGORIES, createSectionFromDefinition } from '@/lib/builder/sectionRegistry';
import { cn } from '@/lib/utils';

function LayerRow({ section }: { section: { id: string; nameHi: string; isVisible: boolean; style?: { backgroundColor?: string }; order: number } }) {
  const { selectedSectionId, selectSection, setSectionVisibility } = useBuilderStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-2 px-2 py-2 rounded-uk-md border cursor-pointer',
        selectedSectionId === section.id ? 'border-uk-saffron bg-uk-dark-card' : 'border-transparent hover:bg-uk-dark-surface',
        !section.isVisible && 'opacity-50',
        isDragging && 'opacity-90 z-50'
      )}
      onClick={() => selectSection(section.id)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setSectionVisibility(section.id, !section.isVisible);
        }}
        className="shrink-0 text-uk-sm"
        title={section.isVisible ? 'छुपाएं' : 'दिखाएं'}
      >
        {section.isVisible ? '👁️' : '👁️‍🗨️'}
      </button>
      <button
        type="button"
        className="shrink-0 touch-none cursor-grab active:cursor-grabbing"
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
      >
        ☰
      </button>
      <span
        className="w-3 h-3 rounded-full shrink-0"
        style={{ backgroundColor: (section.style as { backgroundColor?: string })?.backgroundColor || '#666' }}
      />
      <span className="flex-1 truncate text-uk-sm font-devanagari">{section.nameHi}</span>
    </div>
  );
}

export function BuilderLeftPanel() {
  const [activeTab, setActiveTab] = useState<'sections' | 'layers'>('sections');
  const [search, setSearch] = useState('');
  const {
    layout,
    selectedSectionId,
    addSection,
    reorderSections,
  } = useBuilderStore();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const sections = layout.sections
    .slice()
    .sort((a, b) => a.order - b.order);

  const filteredDefinitions = search.trim()
    ? SECTION_DEFINITIONS.filter(
        (d) =>
          d.nameHi.toLowerCase().includes(search.toLowerCase()) ||
          d.name.toLowerCase().includes(search.toLowerCase())
      )
    : SECTION_DEFINITIONS;

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    reorderSections(oldIndex, newIndex);
  }

  return (
    <aside className="w-70 flex-shrink-0 flex flex-col bg-uk-dark-surface border-r border-uk-dark-border overflow-hidden">
      <div className="flex border-b border-uk-dark-border">
        <button
          type="button"
          className={cn(
            'flex-1 py-2 text-uk-sm font-medium',
            activeTab === 'sections' ? 'bg-uk-dark-card text-uk-saffron border-b-2 border-uk-saffron' : 'text-uk-dark-muted'
          )}
          onClick={() => setActiveTab('sections')}
        >
          📦 Sections
        </button>
        <button
          type="button"
          className={cn(
            'flex-1 py-2 text-uk-sm font-medium',
            activeTab === 'layers' ? 'bg-uk-dark-card text-uk-saffron border-b-2 border-uk-saffron' : 'text-uk-dark-muted'
          )}
          onClick={() => setActiveTab('layers')}
        >
          🗂️ Layers
        </button>
      </div>

      {activeTab === 'sections' && (
        <div className="flex-1 overflow-auto p-2">
          <input
            type="search"
            placeholder="Section खोजें..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 rounded-uk-md bg-uk-dark-card border border-uk-dark-border text-uk-dark-text text-uk-sm mb-3"
          />
          {SECTION_CATEGORIES.map((cat) => {
            const items = filteredDefinitions.filter((d) => d.category === cat.key);
            if (items.length === 0) return null;
            return (
              <div key={cat.key} className="mb-4">
                <p className="text-uk-xs text-uk-dark-muted font-medium mb-2">{cat.nameHi}</p>
                <div className="space-y-1">
                  {items.map((def) => (
                    <button
                      key={def.type}
                      type="button"
                      onClick={() => addSection(def.type)}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-uk-md bg-uk-dark-card border border-uk-dark-border text-left text-uk-sm hover:border-uk-saffron hover:bg-uk-dark-card/80"
                    >
                      <span className="w-8 h-8 rounded-uk-sm bg-uk-dark-border flex items-center justify-center text-uk-xs">
                        {def.nameHi.slice(0, 1)}
                      </span>
                      <span className="font-devanagari">{def.nameHi}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'layers' && (
        <div className="flex-1 overflow-auto p-2">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-1">
                {sections.map((section) => (
                  <LayerRow key={section.id} section={section} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </aside>
  );
}
