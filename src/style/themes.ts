import type { editor } from 'monaco-editor';

import dracula from 'monaco-themes/themes/Dracula.json';
import monokai from 'monaco-themes/themes/Monokai.json';
import solarizedDark from 'monaco-themes/themes/Solarized-dark.json';
import solarizedLight from 'monaco-themes/themes/Solarized-light.json';

type Color = `#${string}`;

export interface Theme {
  id: string;
  primary: Color;
  secondary: Color;
  highlight: Color;
  background: Color;
  lightOrDark: 'light' | 'dark';
  highlightedLine: {
    color: Color;
    backgroundColor: Color;
  };
  editor: editor.IStandaloneThemeData;
}

export interface Themes {
  'dark': Theme;
  'light': Theme;
  'dracula': Theme;
  'monokai': Theme;
  'solarized': Theme;
  'solarized-light': Theme;
}

const themes: Themes = {
  'dark': {
    id: 'dark',
    primary: '#c9d1d9', // fg.default
    secondary: '#010409', // canvas.inset
    highlight: '#161b22', // canvas.overlay
    background: '#0d1117', // canvas.default
    lightOrDark: 'dark',

    highlightedLine: {
      color: '#f0f6fc', // fg.onEmphasis
      backgroundColor: '#161b22', // canvas.overlay
    },

    editor: makeMonacoTheme({
      base: 'vs-dark',
      colors: {
        primary: '#c9d1d9', // fg.default
        background: '#0d1117', // canvas.default
        comment: '#8b949e',
        delimiter: '#d2a8ff',
        annotation: '#a5d6ff',
        constant: '#ff7b72',
        number: '#f2cc60',
        string: '#79c0ff',
        operator: '#ff7b72',
        keyword: '#ff7b72',
        type: '#ffa657',
        variable: '#ffa657',
      },
    }),
  },
  'light': {
    id: 'light',
    primary: '#aaddff',
    secondary: '#022550',
    highlight: '#36368c',
    background: '#ffffff',
    lightOrDark: 'light',

    highlightedLine: {
      color: '#000000',
      backgroundColor: '#e0f6ff',
    },

    editor: makeMonacoTheme({
      base: 'vs',
      colors: {
        primary: '#000000',
        background: '#ffffff',
        comment: '#708090',
        delimiter: '#999999',
        annotation: '#999999',
        constant: '#990055',
        number: '#990055',
        string: '#669900',
        operator: '#9a6e3a',
        keyword: '#0077aa',
        type: '#DD4A68',
        variable: '#ee9900',
      },
    }),
  },
  'dracula': {
    id: 'dracula',
    primary: '#f8f8f2',
    secondary: '#383a59',
    highlight: '#44475a',
    background: '#282a36',
    lightOrDark: 'dark',
    highlightedLine: {
      color: '#586e75',
      backgroundColor: '#44475a',
    },
    editor: dracula as editor.IStandaloneThemeData,
  },
  'monokai': {
    id: 'monokai',
    primary: '#F8F8F2',
    secondary: '#222218',
    highlight: '#49483E',
    background: '#272822',
    lightOrDark: 'dark',
    highlightedLine: {
      color: '#49483E',
      backgroundColor: '#3E3D32',
    },
    editor: monokai as editor.IStandaloneThemeData,
  },
  'solarized': {
    id: 'solarized',
    primary: '#839496', // base0
    secondary: '#073642', // base02
    highlight: '#002b36', // base03
    background: '#002B36', // base03
    lightOrDark: 'dark',
    highlightedLine: {
      color: '#93a1a1', // base1
      backgroundColor: '#073642', // base02
    },
    editor: solarizedDark as editor.IStandaloneThemeData,
  },
  'solarized-light': {
    id: 'solarized-light',
    primary: '#586E75', // base01
    secondary: '#eee8d5', // base2
    highlight: '#FDF6E3', // base3
    background: '#FDF6E3', // base3
    lightOrDark: 'light',
    highlightedLine: {
      color: '#586e75', // base01
      backgroundColor: '#eee8d5', // base2
    },
    editor: solarizedLight as editor.IStandaloneThemeData,
  },
};

export default themes;

interface MonacoThemeProps {
  base: 'vs' | 'vs-dark';
  colors: {
    primary: Color;
    background: Color;
    string: Color;
    comment: Color;
    delimiter: Color;
    annotation: Color;
    constant: Color;
    number: Color;
    operator: Color;
    keyword: Color;
    type: Color;
    variable: Color;
  };
}

export function makeMonacoTheme(
  props: MonacoThemeProps
): editor.IStandaloneThemeData {
  const colors = Object.fromEntries(
    Object.entries(props.colors).map(([key, color]) => [
      key,
      color.substring(1),
    ])
  ) as Record<keyof MonacoThemeProps['colors'], string>;

  return {
    base: props.base,
    inherit: true,
    rules: [
      {
        token: '' /* minimap */,
        foreground: colors.primary,
        background: colors.background,
      },
      { token: 'string', foreground: colors.string },
      { token: 'keyword', foreground: colors.keyword },
      { token: 'constant', foreground: colors.constant },
      { token: 'number', foreground: colors.number },
      { token: 'annotation', foreground: colors.annotation },
      { token: 'variable', foreground: colors.variable },
      { token: 'operator', foreground: colors.operator },
      { token: 'operators', foreground: colors.operator },
      { token: 'punctuation', foreground: colors.operator },
      { token: 'delimiter', foreground: colors.delimiter },
      { token: 'delimiter.square', foreground: colors.delimiter },
      { token: 'delimiter.bracket', foreground: colors.delimiter },
      { token: 'delimiter.parenthesis', foreground: colors.delimiter },
      { token: 'identifier', foreground: colors.primary },
      { token: 'type', foreground: colors.type },
      { token: 'comment', foreground: colors.comment },
    ],
    colors: {
      'editor.background': `#${colors.background}`,
      'editor.foreground': `#${colors.primary}`,
    },
  };
}
