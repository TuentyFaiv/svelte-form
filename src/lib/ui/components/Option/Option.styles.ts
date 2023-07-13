import { css } from "@emotion/css";

export const options = css`
  position: relative;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 0;
  margin: 0;
  justify-content: center;
  align-items: stretch;
  border: none;
  gap: 10px;
  flex-wrap: wrap;
  z-index: 0;
`;

export const field = css`
  display: block;
  box-sizing: inherit;
  flex: 1;
  width: 100%;
  padding: 8px;
  border-radius: var(--s-form-radius);
  border: var(--s-form-border);
  &:hover {
    cursor: pointer;
    border-color: var(--s-form-accent); 
    border-width: 2px;
  }
  &[data-checked="true"] {
    border-color: var(--s-form-success);
    border-width: 2px;
  }
  &[data-checked="false"] {
    & > p {
    }
  }
`;

export const label = css`
  width: 100%;
  box-sizing: inherit;
  padding: 0;
  margin: 0;
  color: var(--s-form-text);
  font-size: 16px;
  line-height: 18px;
  font-family: var(--s-form-font);
  text-align: center;
`;

export const input = css`
  position: absolute;
  display: block;
  box-sizing: inherit;
  margin: 0;
  visibility: hidden;
  top: 0;
  left: 0;
  z-index: 0;
`;

export const content = css`
  width: 100%;
  box-sizing: inherit;
`;

export const error = css`
  position: absolute;
  display: block;
  box-sizing: inherit;
  padding: 3px 5px;
  background-color: var(--s-form-error);
  color: var(--s-form-text-error);
  font-size: 12px;
  line-height: 12px;
  font-family: var(--s-form-font);
  border-radius: var(--s-form-radius);
  transform: translateY(115%);
  left: 0;
  bottom: 0;
  cursor: default;
  z-index: 0;
`;
