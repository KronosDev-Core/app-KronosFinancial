/** @type {import('tailwindcss').Config} */

let plugin = require('tailwindcss/plugin');
const { flagEnabled } = require('tailwindcss/lib/featureFlags');

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'index.html'],
  theme: {
    extend: {
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
      gridTemplateRows: {
        12: 'repeat(12, minmax(0, 1fr))',
      },
      gridRow: {
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant, config }) {
      let pseudoVariants = [
        // Positional
        ['first', ':first-child'],
        ['last', ':last-child'],
        ['only', ':only-child'],
        ['odd', ':nth-child(odd)'],
        ['even', ':nth-child(even)'],
        'first-of-type',
        'last-of-type',
        'only-of-type',

        // State
        'visited',
        'target',
        ['open', '[open]'],

        // Forms
        'default',
        'checked',
        'indeterminate',
        'placeholder-shown',
        'autofill',
        'required',
        'valid',
        'invalid',
        'in-range',
        'out-of-range',
        'read-only',

        // Content
        'empty',

        // Interactive
        'focus-within',
        [
          'hover',
          flagEnabled(config(), 'hoverOnlyWhenSupported')
            ? '&:hover'
            : '@media (hover: hover) and (pointer: fine) { &:hover }',
        ],
        'focus',
        'focus-visible',
        'active',
        'disabled',
      ].map((variant) =>
        Array.isArray(variant) ? variant : [variant, `&:${variant}`]
      );

      for (let [name, state] of pseudoVariants) {
        addVariant(`peerDepth-${name}`, (ctx) => {
          let result = typeof state === 'function' ? state(ctx) : state;
          return result.replace(/&(\S+)/, ':merge(.peerDepth)$1 > &');
        });
      }

      
    }),
  ],
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    fillColor: ['responsive', 'hover', 'focus', 'group-hover'],
    bgColor: ['responsive', 'hover', 'focus', 'group-hover'],
  },
};
