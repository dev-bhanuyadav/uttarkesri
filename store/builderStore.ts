import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { PageLayoutConfig, BuilderSection, GlobalThemeConfig, PageSlug } from '@/types/builder';
import {
  SECTION_DEFINITIONS,
  createSectionFromDefinition,
  getDefinitionByType,
} from '@/lib/builder/sectionRegistry';

const MAX_UNDO = 50;

interface BuilderState {
  page: PageSlug;
  pageName: string;
  layout: PageLayoutConfig;
  selectedSectionId: string | null;
  undoStack: PageLayoutConfig[];
  redoStack: PageLayoutConfig[];
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  zoom: number;
  hasUnsavedChanges: boolean;
  lastSavedAt: Date | null;
}

const defaultTheme: GlobalThemeConfig = {
  colors: {
    primary: '#CC0000',
    secondary: '#1A2744',
    accent: '#FF6600',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    textPrimary: '#1A1A1A',
    textMuted: '#666666',
    border: '#E8E8E8',
    link: '#CC0000',
    linkHover: '#990000',
  },
  fonts: { hindi: 'Noto Sans Devanagari', bodySize: 16, bodyLineHeight: 1.8 },
  spacing: { sectionPadding: 48, cardGap: 24, borderRadiusCard: 8, borderRadiusButton: 6 },
};

function defaultHomeLayout(): PageLayoutConfig {
  const defs = SECTION_DEFINITIONS.filter(
    (d) =>
      ['TricolorStrip', 'TopBar', 'MainHeader', 'NavBar', 'BreakingTicker', 'HeroSection', 'LatestNewsGrid', 'Footer'].includes(d.type)
  );
  const sections: BuilderSection[] = defs.map((d, i) =>
    createSectionFromDefinition(d, i + 1)
  );
  return {
    page: 'homepage',
    pageName: 'होम पेज',
    globalTheme: defaultTheme,
    sections,
    header: { rows: [] },
    footer: {},
  };
}

type BuilderActions = {
  setPage: (page: PageSlug, pageName: string) => void;
  setLayout: (layout: PageLayoutConfig) => void;
  loadLayout: (layout: PageLayoutConfig) => void;
  selectSection: (id: string | null) => void;
  getSelectedSection: () => BuilderSection | null;
  addSection: (type: string, index?: number) => void;
  removeSection: (id: string) => void;
  duplicateSection: (id: string) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  updateSection: (id: string, patch: Partial<BuilderSection>) => void;
  setSectionVisibility: (id: string, visible: boolean) => void;
  setGlobalTheme: (theme: Partial<GlobalThemeConfig>) => void;
  pushUndo: () => void;
  undo: () => void;
  redo: () => void;
  setPreviewDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
  setZoom: (zoom: number) => void;
  markSaved: () => void;
  markUnsaved: () => void;
  resetToDefault: () => void;
};

function pushUndoState(getState: () => BuilderState): PageLayoutConfig {
  const { layout } = getState();
  return JSON.parse(JSON.stringify(layout));
}

export const useBuilderStore = create<BuilderState & BuilderActions>()(
  subscribeWithSelector(
    immer((set, get) => ({
      page: 'homepage',
      pageName: 'होम पेज',
      layout: defaultHomeLayout(),
      selectedSectionId: null,
      undoStack: [],
      redoStack: [],
      previewDevice: 'desktop',
      zoom: 100,
      hasUnsavedChanges: false,
      lastSavedAt: null,

      setPage: (page, pageName) =>
        set((s) => {
          s.page = page;
          s.pageName = pageName;
        }),

      setLayout: (layout) =>
        set((s) => {
          s.layout = layout;
          s.hasUnsavedChanges = true;
        }),

      loadLayout: (layout) =>
        set((s) => {
          s.layout = layout;
          s.undoStack = [];
          s.redoStack = [];
          s.hasUnsavedChanges = false;
        }),

      selectSection: (id) =>
        set((s) => {
          s.selectedSectionId = id;
        }),

      getSelectedSection: () => {
        const { layout, selectedSectionId } = get();
        if (!selectedSectionId) return null;
        return layout.sections.find((sec) => sec.id === selectedSectionId) ?? null;
      },

      addSection: (type, index) =>
        set((s) => {
          s.undoStack = [...s.undoStack.slice(-(MAX_UNDO - 1)), JSON.parse(JSON.stringify(s.layout))];
          s.redoStack = [];
          const def = getDefinitionByType(type);
          if (!def) return;
          const order = index !== undefined ? index + 1 : s.layout.sections.length + 1;
          const section = createSectionFromDefinition(def, order);
          const insertAt = index !== undefined ? index : s.layout.sections.length;
          s.layout.sections.splice(insertAt, 0, section);
          s.layout.sections.forEach((sec, i) => {
            sec.order = i + 1;
          });
          s.hasUnsavedChanges = true;
          s.selectedSectionId = section.id;
        }),

      removeSection: (id) =>
        set((s) => {
          s.undoStack = [...s.undoStack.slice(-(MAX_UNDO - 1)), JSON.parse(JSON.stringify(s.layout))];
          s.redoStack = [];
          const i = s.layout.sections.findIndex((sec) => sec.id === id);
          if (i === -1) return;
          s.layout.sections.splice(i, 1);
          s.layout.sections.forEach((sec, idx) => {
            sec.order = idx + 1;
          });
          if (s.selectedSectionId === id) s.selectedSectionId = null;
          s.hasUnsavedChanges = true;
        }),

      duplicateSection: (id) =>
        set((s) => {
          s.undoStack = [...s.undoStack.slice(-(MAX_UNDO - 1)), JSON.parse(JSON.stringify(s.layout))];
          s.redoStack = [];
          const i = s.layout.sections.findIndex((sec) => sec.id === id);
          if (i === -1) return;
          const orig = s.layout.sections[i];
          const def = getDefinitionByType(orig.type);
          if (!def) return;
          const copy = createSectionFromDefinition(def, orig.order + 1);
          copy.content = JSON.parse(JSON.stringify(orig.content));
          copy.style = JSON.parse(JSON.stringify(orig.style));
          copy.layout = JSON.parse(JSON.stringify(orig.layout));
          copy.nameHi = orig.nameHi + ' (कॉपी)';
          s.layout.sections.splice(i + 1, 0, copy);
          s.layout.sections.forEach((sec, idx) => {
            sec.order = idx + 1;
          });
          s.hasUnsavedChanges = true;
          s.selectedSectionId = copy.id;
        }),

      reorderSections: (fromIndex, toIndex) =>
        set((s) => {
          s.undoStack = [...s.undoStack.slice(-(MAX_UNDO - 1)), JSON.parse(JSON.stringify(s.layout))];
          s.redoStack = [];
          const [removed] = s.layout.sections.splice(fromIndex, 1);
          s.layout.sections.splice(toIndex, 0, removed);
          s.layout.sections.forEach((sec, i) => {
            sec.order = i + 1;
          });
          s.hasUnsavedChanges = true;
        }),

      updateSection: (id, patch) =>
        set((s) => {
          const sec = s.layout.sections.find((x) => x.id === id);
          if (!sec) return;
          Object.assign(sec, patch);
          s.hasUnsavedChanges = true;
        }),

      setSectionVisibility: (id, visible) =>
        set((s) => {
          const sec = s.layout.sections.find((x) => x.id === id);
          if (sec) sec.isVisible = visible;
          s.hasUnsavedChanges = true;
        }),

      setGlobalTheme: (theme) =>
        set((s) => {
          s.layout.globalTheme = { ...s.layout.globalTheme, ...theme };
          s.hasUnsavedChanges = true;
        }),

      pushUndo: () =>
        set((s) => {
          const snapshot = pushUndoState(get);
          s.redoStack = [];
          s.undoStack = [...s.undoStack.slice(-(MAX_UNDO - 1)), snapshot];
        }),

      undo: () =>
        set((s) => {
          if (s.undoStack.length === 0) return;
          const prev = s.undoStack[s.undoStack.length - 1];
          s.redoStack = [...s.redoStack, JSON.parse(JSON.stringify(s.layout))];
          s.undoStack = s.undoStack.slice(0, -1);
          s.layout = JSON.parse(JSON.stringify(prev));
        }),

      redo: () =>
        set((s) => {
          if (s.redoStack.length === 0) return;
          const next = s.redoStack[s.redoStack.length - 1];
          s.undoStack = [...s.undoStack, JSON.parse(JSON.stringify(s.layout))];
          s.redoStack = s.redoStack.slice(0, -1);
          s.layout = JSON.parse(JSON.stringify(next));
        }),

      setPreviewDevice: (device) =>
        set((s) => {
          s.previewDevice = device;
        }),

      setZoom: (zoom) =>
        set((s) => {
          s.zoom = Math.max(50, Math.min(150, zoom));
        }),

      markSaved: () =>
        set((s) => {
          s.hasUnsavedChanges = false;
          s.lastSavedAt = new Date();
          s.undoStack = [];
          s.redoStack = [];
        }),

      markUnsaved: () =>
        set((s) => {
          s.hasUnsavedChanges = true;
        }),

      resetToDefault: () =>
        set((s) => {
          s.layout = defaultHomeLayout();
          s.selectedSectionId = null;
          s.undoStack = [];
          s.redoStack = [];
          s.hasUnsavedChanges = true;
        }),
    }))
  )
);
