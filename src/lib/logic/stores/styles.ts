import type { CssVars } from "../typing/globals/styles.js";

export class FormVarStyles {
  static instance: FormVarStyles | null = null;
  #hasDocument: boolean = typeof document !== "undefined";

  private constructor(vars: CssVars) {
    const globals = `
      :root {
        --s-form-primary: ${vars.primary ?? "#CCCCCC"};
        --s-form-secondary: ${vars.secondary ?? "#FFFFFF"};
        --s-form-accent: ${vars.accent ?? "#000000"};
        --s-form-error: ${vars.error ?? "#FF0000"};
        --s-form-warning: ${vars.warning ?? "#FFA500"};
        --s-form-success: ${vars.success ?? "#008000"};
        --s-form-shadow: ${vars.shadow ?? "0 0 5px 0 rgba(0, 0, 0, 0.5)"};
        --s-form-border: ${vars.border ?? "1px solid var(--s-form-primary)"};
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
