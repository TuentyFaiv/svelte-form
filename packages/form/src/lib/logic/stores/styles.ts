import { setContext } from "svelte";
import { readable } from "svelte/store";

import type { Config, FaivCSSVars, FaivFormTheme } from "../typing/stores/styles.js";

// const faivtheme = {
//   // =~= Theme Properties =~=
//   "--theme-font-family-base": "system-ui",
//   "--theme-font-family-heading": "system-ui",
//   "--theme-font-color-base": "0 0 0",
//   "--theme-font-color-dark": "255 255 255",
//   "--theme-rounded-base": "4px",
//   "--theme-rounded-container": "4px",
//   "--theme-border-base": "1px",
//   // =~= Theme On-X Colors =~=
//   "--on-primary": "var(--color-surface-900)",
//   "--on-secondary": "255 255 255",
//   "--on-tertiary": "0 0 0",
//   "--on-success": "0 0 0",
//   "--on-warning": "var(--color-surface-900)",
//   "--on-error": "255 255 255",
//   "--on-surface": "var(--color-surface-50)",
//   // =~= Theme Colors  =~=
//   // primary | #21C08B
//   "--color-primary-50": "222 246 238", // #def6ee
//   "--color-primary-100": "211 242 232", // #d3f2e8
//   "--color-primary-200": "200 239 226", // #c8efe2
//   "--color-primary-300": "166 230 209", // #a6e6d1
//   "--color-primary-400": "100 211 174", // #64d3ae
//   "--color-primary-500": "33 192 139", // #21C08B
//   "--color-primary-600": "30 173 125", // #1ead7d
//   "--color-primary-700": "25 144 104", // #199068
//   "--color-primary-800": "20 115 83", // #147353
//   "--color-primary-900": "16 94 68", // #105e44
//   // secondary | #6E2AB2
//   "--color-secondary-50": "233 223 243", // #e9dff3
//   "--color-secondary-100": "226 212 240", // #e2d4f0
//   "--color-secondary-200": "219 202 236", // #dbcaec
//   "--color-secondary-300": "197 170 224", // #c5aae0
//   "--color-secondary-400": "154 106 201", // #9a6ac9
//   "--color-secondary-500": "110 42 178", // #6E2AB2
//   "--color-secondary-600": "99 38 160", // #6326a0
//   "--color-secondary-700": "83 32 134", // #532086
//   "--color-secondary-800": "66 25 107", // #42196b
//   "--color-secondary-900": "54 21 87", // #361557
//   // tertiary | #ec8004
//   "--color-tertiary-50": "252 236 217", // #fcecd9
//   "--color-tertiary-100": "251 230 205", // #fbe6cd
//   "--color-tertiary-200": "250 223 192", // #fadfc0
//   "--color-tertiary-300": "247 204 155", // #f7cc9b
//   "--color-tertiary-400": "242 166 79", // #f2a64f
//   "--color-tertiary-500": "236 128 4", // #ec8004
//   "--color-tertiary-600": "212 115 4", // #d47304
//   "--color-tertiary-700": "177 96 3", // #b16003
//   "--color-tertiary-800": "142 77 2", // #8e4d02
//   "--color-tertiary-900": "116 63 2", // #743f02
//   // success | #37be39
//   "--color-success-50": "225 245 225", // #e1f5e1
//   "--color-success-100": "215 242 215", // #d7f2d7
//   "--color-success-200": "205 239 206", // #cdefce
//   "--color-success-300": "175 229 176", // #afe5b0
//   "--color-success-400": "115 210 116", // #73d274
//   "--color-success-500": "55 190 57", // #37be39
//   "--color-success-600": "50 171 51", // #32ab33
//   "--color-success-700": "41 143 43", // #298f2b
//   "--color-success-800": "33 114 34", // #217222
//   "--color-success-900": "27 93 28", // #1b5d1c
//   // warning | #FFB800
//   "--color-warning-50": "255 244 217", // #fff4d9
//   "--color-warning-100": "255 241 204", // #fff1cc
//   "--color-warning-200": "255 237 191", // #ffedbf
//   "--color-warning-300": "255 227 153", // #ffe399
//   "--color-warning-400": "255 205 77", // #ffcd4d
//   "--color-warning-500": "255 184 0", // #FFB800
//   "--color-warning-600": "230 166 0", // #e6a600
//   "--color-warning-700": "191 138 0", // #bf8a00
//   "--color-warning-800": "153 110 0", // #996e00
//   "--color-warning-900": "125 90 0", // #7d5a00
//   // error | #BF3A3A
//   "--color-error-50": "245 225 225", // #f5e1e1
//   "--color-error-100": "242 216 216", // #f2d8d8
//   "--color-error-200": "239 206 206", // #efcece
//   "--color-error-300": "229 176 176", // #e5b0b0
//   "--color-error-400": "210 117 117", // #d27575
//   "--color-error-500": "191 58 58", // #BF3A3A
//   "--color-error-600": "172 52 52", // #ac3434
//   "--color-error-700": "143 44 44", // #8f2c2c
//   "--color-error-800": "115 35 35", // #732323
//   "--color-error-900": "94 28 28", // #5e1c1c
//   // surface | #35384B
//   "--color-surface-50": "225 225 228", // #e1e1e4
//   "--color-surface-100": "215 215 219", // #d7d7db
//   "--color-surface-200": "205 205 210", // #cdcdd2
//   "--color-surface-300": "174 175 183", // #aeafb7
//   "--color-surface-400": "114 116 129", // #727481
//   "--color-surface-500": "53 56 75", // #35384B
//   "--color-surface-600": "48 50 68", // #303244
//   "--color-surface-700": "40 42 56", // #282a38
//   "--color-surface-800": "32 34 45", // #20222d
//   "--color-surface-900": "26 27 37", // #1a1b25
// };

export class FaivFormStyles {
  static instance: FaivFormStyles | null = null;
  #prefix = "--faivform-";
  #hasDocument: boolean = typeof document !== "undefined";

  private constructor(theme: Omit<Config, "fields"> = {}) {
    const defaultOnLight: FaivCSSVars = {
      primary: {
        color: theme?.onLight?.primary?.color ?? `rgb(var(${this.#prefix}primary-500) / var(${this.#prefix}primary-opacity))`,
        opacity: theme?.onLight?.primary?.opacity ?? "1",
        text: theme?.onLight?.primary?.text ?? `rgb(var(${this.#prefix}placeholder-900) / var(${this.#prefix}primary-text-opacity))`,
        "text-opacity": theme?.onLight?.primary?.["text-opacity"] ?? "1",
        font: theme?.onLight?.primary?.font ?? `var(${this.#prefix}font)`,
      },
      secondary: {
        color: theme?.onLight?.secondary?.color ?? `rgb(var(${this.#prefix}secondary-500) / var(${this.#prefix}secondary-opacity))`,
        opacity: theme?.onLight?.secondary?.opacity ?? "1",
        text: theme?.onLight?.secondary?.text ?? `rgb(var(${this.#prefix}white) / var(${this.#prefix}secondary-text-opacity))`,
        "text-opacity": theme?.onLight?.secondary?.["text-opacity"] ?? "1",
        font: theme?.onLight?.secondary?.font ?? `var(${this.#prefix}font)`,
      },
      accent: {
        color: theme?.onLight?.accent?.color ?? `rgb(var(${this.#prefix}accent-500) / var(${this.#prefix}accent-opacity))`,
        opacity: theme?.onLight?.accent?.opacity ?? "1",
        text: theme?.onLight?.accent?.text ?? `rgb(var(${this.#prefix}black) / var(${this.#prefix}accent-text-opacity))`,
        "text-opacity": theme?.onLight?.accent?.["text-opacity"] ?? "1",
        font: theme?.onLight?.accent?.font ?? `var(${this.#prefix}font)`,
      },
      success: {
        color: theme?.onLight?.success?.color ?? `rgb(var(${this.#prefix}success-500) / var(${this.#prefix}success-opacity))`,
        opacity: theme?.onLight?.success?.opacity ?? "1",
        text: theme?.onLight?.success?.text ?? `rgb(var(${this.#prefix}black) / var(${this.#prefix}success-text-opacity))`,
        "text-opacity": theme?.onLight?.success?.["text-opacity"] ?? "1",
        font: theme?.onLight?.success?.font ?? `var(${this.#prefix}font)`,
      },
      warning: {
        color: theme?.onLight?.warning?.color ?? `rgb(var(${this.#prefix}warning-500) / var(${this.#prefix}warning-opacity))`,
        opacity: theme?.onLight?.warning?.opacity ?? "1",
        text: theme?.onLight?.warning?.text ?? `rgb(var(${this.#prefix}placeholder-900) / var(${this.#prefix}warning-text-opacity))`,
        "text-opacity": theme?.onLight?.warning?.["text-opacity"] ?? "1",
        font: theme?.onLight?.warning?.font ?? `var(${this.#prefix}font)`,
      },
      error: {
        color: theme?.onLight?.error?.color ?? `rgb(var(${this.#prefix}error-500) / var(${this.#prefix}error-opacity))`,
        opacity: theme?.onLight?.error?.opacity ?? "1",
        text: theme?.onLight?.error?.text ?? `rgb(var(${this.#prefix}white) / var(${this.#prefix}error-text-opacity))`,
        "text-opacity": theme?.onLight?.error?.["text-opacity"] ?? "1",
        font: theme?.onLight?.error?.font ?? `var(${this.#prefix}font)`,
      },
      placeholder: {
        color: theme?.onLight?.placeholder?.color ?? `rgb(var(${this.#prefix}white) / var(${this.#prefix}placeholder-opacity))`,
        opacity: theme?.onLight?.placeholder?.opacity ?? "1",
        text: theme?.onLight?.placeholder?.text ?? `rgb(var(${this.#prefix}placeholder-300) / var(${this.#prefix}placeholder-text-opacity))`,
        "text-opacity": theme?.onLight?.placeholder?.["text-opacity"] ?? "1",
        font: theme?.onLight?.placeholder?.font ?? `var(${this.#prefix}font)`,
      },
      shadow: {
        base: theme?.onLight?.shadow?.base ?? `var(${this.#prefix}shadow-size) var(${this.#prefix}shadow-color)`,
        // eslint-disable-next-line max-len
        size: theme?.onLight?.shadow?.size ?? `0 calc(var(${this.#prefix}space) / 4) calc((var(${this.#prefix}space) / 4) + (calc(var(${this.#prefix}space) / 2)))`,
        color: theme?.onLight?.shadow?.color ?? `rgb(var(${this.#prefix}placeholder-600) / var(${this.#prefix}shadow-opacity))`,
        opacity: theme?.onLight?.shadow?.opacity ?? "0.25",
      },
      border: {
        base: theme?.onLight?.border?.base ?? `var(${this.#prefix}border-width) var(${this.#prefix}border-style) var(${this.#prefix}border-color)`,
        width: theme?.onLight?.border?.width ?? "1px",
        style: theme?.onLight?.border?.style ?? "solid",
        color: theme?.onLight?.border?.color ?? `rgb(var(${this.#prefix}primary-500) / var(${this.#prefix}border-opacity))`,
        opacity: theme?.onLight?.border?.opacity ?? "1",
      },
    };
    const defaultOnDark: FaivCSSVars = {
      primary: {
        color: theme?.onLight?.primary?.color ?? `rgb(var(${this.#prefix}primary-300) / var(${this.#prefix}primary-opacity))`,
        opacity: theme?.onLight?.primary?.opacity ?? "1",
        text: theme?.onLight?.primary?.text ?? `rgb(var(${this.#prefix}placeholder-50) / var(${this.#prefix}primary-text-opacity))`,
        "text-opacity": theme?.onLight?.primary?.["text-opacity"] ?? "1",
        font: theme?.onLight?.primary?.font ?? `var(${this.#prefix}font)`,
      },
      secondary: {
        color: theme?.onLight?.secondary?.color ?? `rgb(var(${this.#prefix}secondary-300) / var(${this.#prefix}secondary-opacity))`,
        opacity: theme?.onLight?.secondary?.opacity ?? "1",
        text: theme?.onLight?.secondary?.text ?? `rgb(var(${this.#prefix}placeholder-900) / var(${this.#prefix}secondary-text-opacity))`,
        "text-opacity": theme?.onLight?.secondary?.["text-opacity"] ?? "1",
        font: theme?.onLight?.secondary?.font ?? `var(${this.#prefix}font)`,
      },
      accent: {
        color: theme?.onLight?.accent?.color ?? `rgb(var(${this.#prefix}accent-300) / var(${this.#prefix}accent-opacity))`,
        opacity: theme?.onLight?.accent?.opacity ?? "1",
        text: theme?.onLight?.accent?.text ?? `rgb(var(${this.#prefix}black) / var(${this.#prefix}accent-text-opacity))`,
        "text-opacity": theme?.onLight?.accent?.["text-opacity"] ?? "1",
        font: theme?.onLight?.accent?.font ?? `var(${this.#prefix}font)`,
      },
      success: {
        color: theme?.onLight?.success?.color ?? `rgb(var(${this.#prefix}success-400) / var(${this.#prefix}success-opacity))`,
        opacity: theme?.onLight?.success?.opacity ?? "1",
        text: theme?.onLight?.success?.text ?? `rgb(var(${this.#prefix}black) / var(${this.#prefix}success-text-opacity))`,
        "text-opacity": theme?.onLight?.success?.["text-opacity"] ?? "1",
        font: theme?.onLight?.success?.font ?? `var(${this.#prefix}font)`,
      },
      warning: {
        color: theme?.onLight?.warning?.color ?? `rgb(var(${this.#prefix}warning-400) / var(${this.#prefix}warning-opacity))`,
        opacity: theme?.onLight?.warning?.opacity ?? "1",
        text: theme?.onLight?.warning?.text ?? `rgb(var(${this.#prefix}placeholder-900) / var(${this.#prefix}warning-text-opacity))`,
        "text-opacity": theme?.onLight?.warning?.["text-opacity"] ?? "1",
        font: theme?.onLight?.warning?.font ?? `var(${this.#prefix}font)`,
      },
      error: {
        color: theme?.onLight?.error?.color ?? `rgb(var(${this.#prefix}error-400) / var(${this.#prefix}error-opacity))`,
        opacity: theme?.onLight?.error?.opacity ?? "1",
        text: theme?.onLight?.error?.text ?? `rgb(var(${this.#prefix}white) / var(${this.#prefix}error-text-opacity))`,
        "text-opacity": theme?.onLight?.error?.["text-opacity"] ?? "1",
        font: theme?.onLight?.error?.font ?? `var(${this.#prefix}font)`,
      },
      placeholder: {
        color: theme?.onLight?.placeholder?.color ?? `rgb(var(${this.#prefix}placeholder-900) / var(${this.#prefix}placeholder-opacity))`,
        opacity: theme?.onLight?.placeholder?.opacity ?? "1",
        text: theme?.onLight?.placeholder?.text ?? `rgb(var(${this.#prefix}placeholder-400) / var(${this.#prefix}placeholder-text-opacity))`,
        "text-opacity": theme?.onLight?.placeholder?.["text-opacity"] ?? "1",
        font: theme?.onLight?.placeholder?.font ?? `var(${this.#prefix}font)`,
      },
      shadow: {
        base: theme?.onLight?.shadow?.base ?? `var(${this.#prefix}shadow-size) var(${this.#prefix}shadow-color)`,
        // eslint-disable-next-line max-len
        size: theme?.onLight?.shadow?.size ?? `0 calc(var(${this.#prefix}space) / 4) calc((var(${this.#prefix}space) / 4) + (calc(var(${this.#prefix}space) / 2)))`,
        color: theme?.onLight?.shadow?.color ?? `rgb(var(${this.#prefix}primary-300) / var(${this.#prefix}shadow-opacity))`,
        opacity: theme?.onLight?.shadow?.opacity ?? "0.25",
      },
      border: {
        base: theme?.onLight?.border?.base ?? `var(${this.#prefix}border-width) var(${this.#prefix}border-style) var(${this.#prefix}border-color)`,
        width: theme?.onLight?.border?.width ?? "1px",
        style: theme?.onLight?.border?.style ?? "solid",
        color: theme?.onLight?.border?.color ?? `rgb(var(${this.#prefix}primary-300) / var(${this.#prefix}border-opacity))`,
        opacity: theme?.onLight?.border?.opacity ?? "1",
      },
    };

    const defaultLight: FaivFormTheme = {
      font: theme?.light?.font ?? "system-ui, sans-serif",
      space: theme?.light?.space ?? "1rem",
      radius: theme?.light?.radius ?? `calc(var(${this.#prefix}space) / 4)`,
      white: theme?.light?.white ?? "255 255 255",
      black: theme?.light?.black ?? "0 0 0",
      primary: {
        50: theme?.light?.primary?.["50"] ?? "222 246 238", // #def6ee
        100: theme?.light?.primary?.["100"] ?? "211 242 232", // #d3f2e8
        200: theme?.light?.primary?.["200"] ?? "200 239 226", // #c8efe2
        300: theme?.light?.primary?.["300"] ?? "166 230 209", // #a6e6d1
        400: theme?.light?.primary?.["400"] ?? "100 211 174", // #64d3ae
        500: theme?.light?.primary?.["500"] ?? "33 192 139", // #21C08B
        600: theme?.light?.primary?.["600"] ?? "30 173 125", // #1ead7d
        700: theme?.light?.primary?.["700"] ?? "25 144 104", // #199068
        800: theme?.light?.primary?.["800"] ?? "20 115 83", // #147353
        900: theme?.light?.primary?.["900"] ?? "16 94 68", // #105e44
      },
      secondary: {
        50: theme?.light?.secondary?.["50"] ?? "233 223 243", // #e9dff3
        100: theme?.light?.secondary?.["100"] ?? "226 212 240", // #e2d4f0
        200: theme?.light?.secondary?.["200"] ?? "219 202 236", // #dbcaec
        300: theme?.light?.secondary?.["300"] ?? "197 170 224", // #c5aae0
        400: theme?.light?.secondary?.["400"] ?? "154 106 201", // #9a6ac9
        500: theme?.light?.secondary?.["500"] ?? "110 42 178", // #6E2AB2
        600: theme?.light?.secondary?.["600"] ?? "99 38 160", // #6326a0
        700: theme?.light?.secondary?.["700"] ?? "83 32 134", // #532086
        800: theme?.light?.secondary?.["800"] ?? "66 25 107", // #42196b
        900: theme?.light?.secondary?.["900"] ?? "54 21 87", // #361557
      },
      accent: {
        50: theme?.light?.accent?.["50"] ?? "252 236 217", // #fcecd9
        100: theme?.light?.accent?.["100"] ?? "251 230 205", // #fbe6cd
        200: theme?.light?.accent?.["200"] ?? "250 223 192", // #fadfc0
        300: theme?.light?.accent?.["300"] ?? "247 204 155", // #f7cc9b
        400: theme?.light?.accent?.["400"] ?? "242 166 79", // #f2a64f
        500: theme?.light?.accent?.["500"] ?? "236 128 4", // #ec8004
        600: theme?.light?.accent?.["600"] ?? "212 115 4", // #d47304
        700: theme?.light?.accent?.["700"] ?? "177 96 3", // #b16003
        800: theme?.light?.accent?.["800"] ?? "142 77 2", // #8e4d02
        900: theme?.light?.accent?.["900"] ?? "116 63 2", // #743f02
      },
      success: {
        50: theme?.light?.success?.["50"] ?? "225 245 225", // #e1f5e1
        100: theme?.light?.success?.["100"] ?? "215 242 215", // #d7f2d7
        200: theme?.light?.success?.["200"] ?? "205 239 206", // #cdefce
        300: theme?.light?.success?.["300"] ?? "175 229 176", // #afe5b0
        400: theme?.light?.success?.["400"] ?? "115 210 116", // #73d274
        500: theme?.light?.success?.["500"] ?? "55 190 57", // #37be39
        600: theme?.light?.success?.["600"] ?? "50 171 51", // #32ab33
        700: theme?.light?.success?.["700"] ?? "41 143 43", // #298f2b
        800: theme?.light?.success?.["800"] ?? "33 114 34", // #217222
        900: theme?.light?.success?.["900"] ?? "27 93 28", // #1b5d1c
      },
      warning: {
        50: theme?.light?.warning?.["50"] ?? "255 244 217", // #fff4d9
        100: theme?.light?.warning?.["100"] ?? "255 241 204", // #fff1cc
        200: theme?.light?.warning?.["200"] ?? "255 237 191", // #ffedbf
        300: theme?.light?.warning?.["300"] ?? "255 227 153", // #ffe399
        400: theme?.light?.warning?.["400"] ?? "255 205 77", // #ffcd4d
        500: theme?.light?.warning?.["500"] ?? "255 184 0", // #FFB800
        600: theme?.light?.warning?.["600"] ?? "230 166 0", // #e6a600
        700: theme?.light?.warning?.["700"] ?? "191 138 0", // #bf8a00
        800: theme?.light?.warning?.["800"] ?? "153 110 0", // #996e00
        900: theme?.light?.warning?.["900"] ?? "125 90 0", // #7d5a00
      },
      error: {
        50: theme?.light?.error?.["100"] ?? "242 216 216", // #f2d8d8
        100: theme?.light?.error?.["200"] ?? "239 206 206", // #efcece
        200: theme?.light?.error?.["300"] ?? "229 176 176", // #e5b0b0
        300: theme?.light?.error?.["400"] ?? "210 117 117", // #d27575
        400: theme?.light?.error?.["300"] ?? "250 142 142", // #fa8e8e
        500: theme?.light?.error?.["500"] ?? "191 58 58", // #BF3A3A
        600: theme?.light?.error?.["600"] ?? "172 52 52", // #ac3434
        700: theme?.light?.error?.["700"] ?? "143 44 44", // #8f2c2c
        800: theme?.light?.error?.["800"] ?? "115 35 35", // #732323
        900: theme?.light?.error?.["900"] ?? "94 28 28", // #5e1c1c
      },
      placeholder: {
        50: theme?.light?.placeholder?.["50"] ?? "225 225 228", // #e1e1e4
        100: theme?.light?.placeholder?.["100"] ?? "215 215 219", // #d7d7db
        200: theme?.light?.placeholder?.["200"] ?? "205 205 210", // #cdcdd2
        300: theme?.light?.placeholder?.["300"] ?? "174 175 183", // #aeafb7
        400: theme?.light?.placeholder?.["400"] ?? "114 116 129", // #727481
        500: theme?.light?.placeholder?.["500"] ?? "53 56 75", // #35384B
        600: theme?.light?.placeholder?.["600"] ?? "48 50 68", // #303244
        700: theme?.light?.placeholder?.["700"] ?? "40 42 56", // #282a38
        800: theme?.light?.placeholder?.["800"] ?? "32 34 45", // #20222d
        900: theme?.light?.placeholder?.["900"] ?? "26 27 37", // #1a1b25
      },
    };
    const defaultDark: FaivFormTheme = {
      font: theme?.dark?.font ?? "system-ui, sans-serif",
      space: theme?.dark?.space ?? "1rem",
      radius: theme?.dark?.radius ?? `calc(var(${this.#prefix}space) / 4)`,
      white: theme?.dark?.white ?? "255 255 255",
      black: theme?.dark?.black ?? "0 0 0",
      primary: {
        50: theme?.dark?.primary?.["50"] ?? "222 246 238", // #def6ee
        100: theme?.dark?.primary?.["100"] ?? "211 242 232", // #d3f2e8
        200: theme?.dark?.primary?.["200"] ?? "200 239 226", // #c8efe2
        300: theme?.dark?.primary?.["300"] ?? "166 230 209", // #a6e6d1
        400: theme?.dark?.primary?.["400"] ?? "100 211 174", // #64d3ae
        500: theme?.dark?.primary?.["500"] ?? "33 192 139", // #21C08B
        600: theme?.dark?.primary?.["600"] ?? "30 173 125", // #1ead7d
        700: theme?.dark?.primary?.["700"] ?? "25 144 104", // #199068
        800: theme?.dark?.primary?.["800"] ?? "20 115 83", // #147353
        900: theme?.dark?.primary?.["900"] ?? "16 94 68", // #105e44
      },
      secondary: {
        50: theme?.dark?.secondary?.["50"] ?? "233 223 243", // #e9dff3
        100: theme?.dark?.secondary?.["100"] ?? "226 212 240", // #e2d4f0
        200: theme?.dark?.secondary?.["200"] ?? "219 202 236", // #dbcaec
        300: theme?.dark?.secondary?.["300"] ?? "197 170 224", // #c5aae0
        400: theme?.dark?.secondary?.["400"] ?? "154 106 201", // #9a6ac9
        500: theme?.dark?.secondary?.["500"] ?? "110 42 178", // #6E2AB2
        600: theme?.dark?.secondary?.["600"] ?? "99 38 160", // #6326a0
        700: theme?.dark?.secondary?.["700"] ?? "83 32 134", // #532086
        800: theme?.dark?.secondary?.["800"] ?? "66 25 107", // #42196b
        900: theme?.dark?.secondary?.["900"] ?? "54 21 87", // #361557
      },
      accent: {
        50: theme?.dark?.accent?.["50"] ?? "252 236 217", // #fcecd9
        100: theme?.dark?.accent?.["100"] ?? "251 230 205", // #fbe6cd
        200: theme?.dark?.accent?.["200"] ?? "250 223 192", // #fadfc0
        300: theme?.dark?.accent?.["300"] ?? "247 204 155", // #f7cc9b
        400: theme?.dark?.accent?.["400"] ?? "242 166 79", // #f2a64f
        500: theme?.dark?.accent?.["500"] ?? "236 128 4", // #ec8004
        600: theme?.dark?.accent?.["600"] ?? "212 115 4", // #d47304
        700: theme?.dark?.accent?.["700"] ?? "177 96 3", // #b16003
        800: theme?.dark?.accent?.["800"] ?? "142 77 2", // #8e4d02
        900: theme?.dark?.accent?.["900"] ?? "116 63 2", // #743f02
      },
      success: {
        50: theme?.dark?.success?.["50"] ?? "225 245 225", // #e1f5e1
        100: theme?.dark?.success?.["100"] ?? "215 242 215", // #d7f2d7
        200: theme?.dark?.success?.["200"] ?? "205 239 206", // #cdefce
        300: theme?.dark?.success?.["300"] ?? "175 229 176", // #afe5b0
        400: theme?.dark?.success?.["400"] ?? "115 210 116", // #73d274
        500: theme?.dark?.success?.["500"] ?? "55 190 57", // #37be39
        600: theme?.dark?.success?.["600"] ?? "50 171 51", // #32ab33
        700: theme?.dark?.success?.["700"] ?? "41 143 43", // #298f2b
        800: theme?.dark?.success?.["800"] ?? "33 114 34", // #217222
        900: theme?.dark?.success?.["900"] ?? "27 93 28", // #1b5d1c
      },
      warning: {
        50: theme?.dark?.warning?.["50"] ?? "255 244 217", // #fff4d9
        100: theme?.dark?.warning?.["100"] ?? "255 241 204", // #fff1cc
        200: theme?.dark?.warning?.["200"] ?? "255 237 191", // #ffedbf
        300: theme?.dark?.warning?.["300"] ?? "255 227 153", // #ffe399
        400: theme?.dark?.warning?.["400"] ?? "255 205 77", // #ffcd4d
        500: theme?.dark?.warning?.["500"] ?? "255 184 0", // #FFB800
        600: theme?.dark?.warning?.["600"] ?? "230 166 0", // #e6a600
        700: theme?.dark?.warning?.["700"] ?? "191 138 0", // #bf8a00
        800: theme?.dark?.warning?.["800"] ?? "153 110 0", // #996e00
        900: theme?.dark?.warning?.["900"] ?? "125 90 0", // #7d5a00
      },
      error: {
        50: theme?.dark?.error?.["100"] ?? "242 216 216", // #f2d8d8
        100: theme?.dark?.error?.["200"] ?? "239 206 206", // #efcece
        200: theme?.dark?.error?.["300"] ?? "229 176 176", // #e5b0b0
        300: theme?.dark?.error?.["400"] ?? "210 117 117", // #d27575
        400: theme?.dark?.error?.["300"] ?? "250 142 142", // #fa8e8e
        500: theme?.dark?.error?.["500"] ?? "191 58 58", // #BF3A3A
        600: theme?.dark?.error?.["600"] ?? "172 52 52", // #ac3434
        700: theme?.dark?.error?.["700"] ?? "143 44 44", // #8f2c2c
        800: theme?.dark?.error?.["800"] ?? "115 35 35", // #732323
        900: theme?.dark?.error?.["900"] ?? "94 28 28", // #5e1c1c
      },
      placeholder: {
        50: theme?.dark?.placeholder?.["50"] ?? "225 225 228", // #e1e1e4
        100: theme?.dark?.placeholder?.["100"] ?? "215 215 219", // #d7d7db
        200: theme?.dark?.placeholder?.["200"] ?? "205 205 210", // #cdcdd2
        300: theme?.dark?.placeholder?.["300"] ?? "174 175 183", // #aeafb7
        400: theme?.dark?.placeholder?.["400"] ?? "114 116 129", // #727481
        500: theme?.dark?.placeholder?.["500"] ?? "53 56 75", // #35384B
        600: theme?.dark?.placeholder?.["600"] ?? "48 50 68", // #303244
        700: theme?.dark?.placeholder?.["700"] ?? "40 42 56", // #282a38
        800: theme?.dark?.placeholder?.["800"] ?? "32 34 45", // #20222d
        900: theme?.dark?.placeholder?.["900"] ?? "26 27 37", // #1a1b25
      },
    };

    const sheet = this.#hasDocument ? new CSSStyleSheet() : null;
    if (sheet && this.#hasDocument && sheet instanceof CSSStyleSheet) {
      sheet.replace(this.#root({
        light: defaultLight,
        dark: defaultDark,
        onLight: defaultOnLight,
        onDark: defaultOnDark,
      }));
      document.adoptedStyleSheets = [sheet];
    }
  }

  static create(theme: Omit<Config, "fields"> = {}, update = false): FaivFormStyles {
    if (!this.instance) {
      this.instance = new FaivFormStyles(theme);
    }

    if (update) this.instance.#update(theme);

    return this.instance;
  }

  #root = (theme: Omit<Config, "fields">): string => {
    let styles = "";

    if (theme.light || theme.onLight) {
      styles += `:root {${this.#parseVars(theme.onLight)}${this.#parseTheme(theme.light)}}`;
    }
    if (theme.dark || theme.onDark) {
      styles += `:root:is(.dark, [data-theme="dark"]) {${this.#parseVars(theme.onDark)}${this.#parseTheme(theme.dark)}}`;
    }

    return styles;
  };

  #parseVars = (vars?: FaivCSSVars): string => (vars ? Object.entries(vars).reduce((acc, [key, options]) => {
    if (!options) return acc;

    const parsed = Object.entries(options).reduce((prev, [option, value]) => (
      value ? `${prev}${this.#prefix}${key}-${option}: ${value};` : acc
    ), "");

    return `${acc}${parsed}`;
  }, "") : "");

  #parseTheme = (theme?: FaivFormTheme): string => {
    if (!theme) return "";

    const { font, space, radius, white, black, ...toParse } = theme;

    const themeVars = {
      font, space, radius, white, black,
    };

    const themeStyles = Object.entries(themeVars).reduce((acc, [key, value]) => (
      value ? `${acc}${this.#prefix}${key}: ${value};` : acc
    ), "");

    return Object.keys(toParse).reduce((acc, key) => {
      type ThemeColors = Omit<FaivFormTheme, "font" | "space" | "radius" | "black" | "white">;
      const colors = (toParse as ThemeColors)[key as keyof ThemeColors];

      if (!colors) return acc;

      const colorVars = Object.entries(colors).reduce((prev, [color, value]) => (
        value ? `${prev}${this.#prefix}${key}-${color}: ${value};` : prev
      ), "");

      return `${acc}${colorVars}`;
    }, themeStyles);
  };

  #update(theme: Omit<Config, "fields">): void {
    const sheet = this.#hasDocument ? new CSSStyleSheet() : null;

    if (sheet && this.#hasDocument && sheet instanceof CSSStyleSheet) {
      sheet.insertRule(this.#root(theme));
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
    }
  }
}

export function setConfig({ fields, ...theme }: Config = {}) {
  FaivFormStyles.create(theme, Object.keys(theme).length > 0);
  const {
    field = {},
    option = {},
    select = {},
    file = {},
    errors = {},
    icons = null,
    replace = false,
  } = fields ?? {};
  const styles = readable<Config["fields"]>({
    replace,
    field,
    option,
    select,
    file,
    errors,
    icons,
  });

  setContext("faivform-styles", styles);
}
