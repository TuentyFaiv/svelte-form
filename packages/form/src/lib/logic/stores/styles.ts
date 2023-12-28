import type { CssVars } from "../typing/globals/styles.js";

export class FormVarStyles {
  static instance: FormVarStyles | null = null;
  #hasDocument: boolean = typeof document !== "undefined";

  private constructor(vars: CssVars) {
    const globals = `
      :root {
        --s-form-space: ${vars.space ?? "1rem"};
        --s-form-primary-opacity: ${vars.primaryOpacity ?? "1"};
        --s-form-primary: ${vars.primary ?? "rgba(204, 204, 204, var(--s-form-primary-opacity))"};
        --s-form-secondary-opacity: ${vars.secondaryOpacity ?? "1"};
        --s-form-secondary: ${vars.secondary ?? "rgba(255, 255, 255, var(--s-form-secondary-opacity))"};
        --s-form-accent: ${vars.accent ?? "#000000"};
        --s-form-error: ${vars.error ?? "#FF0000"};
        --s-form-warning: ${vars.warning ?? "#FFA500"};
        --s-form-success: ${vars.success ?? "#008000"};
        --s-form-shadow-opacity: ${vars.shadowOpacity ?? "0.5"};
        --s-form-shadow-size: ${vars.shadowSize ?? "0 0 5px 0"};
        --s-form-shadow-color: ${vars.shadowColor ?? "rgba(0, 0, 0, var(--s-form-shadow-opacity))"};
        --s-form-shadow: ${vars.shadow ?? "var(--s-form-shadow-size) var(--s-form-shadow-color)"};
        --s-form-border-width: ${vars.borderWidth ?? "1px"};
        --s-form-border-style: ${vars.borderStyle ?? "solid"};
        --s-form-border: ${vars.border ?? "var(--s-form-border-width) var(--s-form-border-style) var(--s-form-primary)"};
        --s-form-text: ${vars.text ?? "#000000"};
        --s-form-placeholder: ${vars.placeholder ?? "#B8B2B2"};
        --s-form-text-error: ${vars.texterror ?? "#FFFFFF"};
        --s-form-radius: ${vars.radius ?? "4px"};
        --s-form-font: ${vars.font ?? "system-ui, sans-serif"};
      }
    `;
    const sheet = this.#hasDocument ? new CSSStyleSheet() : null;
    if (sheet && this.#hasDocument && sheet instanceof CSSStyleSheet) {
      sheet.replaceSync(globals);
      document.adoptedStyleSheets = [sheet];
    }
  }

  static create(vars: CssVars = {}, update = false): FormVarStyles {
    if (!this.instance) {
      this.instance = new FormVarStyles(vars);
    }

    if (update) this.instance.update(vars);

    return this.instance;
  }

  // eslint-disable-next-line class-methods-use-this
  update(vars: CssVars): void {
    const toUpdate = Object.entries(vars).reduce((acc, [key, value]) => {
      if (value) {
        return `${acc}--s-form-${key}: ${value};`;
      }

      return acc;
    }, "");

    const sheet = this.#hasDocument ? new CSSStyleSheet() : null;

    if (sheet && this.#hasDocument && sheet instanceof CSSStyleSheet) {
      sheet.insertRule(`:root { ${toUpdate} }`);
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
    }
  }
}
