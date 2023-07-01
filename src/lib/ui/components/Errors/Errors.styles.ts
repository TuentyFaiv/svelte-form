import { css } from "@emotion/css";

export const list = css`
  display: flex;
  box-sizing: border-box;
  margin: 16px 0 0;
  padding: 0;
  gap: 6px;
  list-style: none;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

export const item = css`
  display: block;
  margin: 0;
  padding: 3px 5px;
  background-color: var(--s-form-error);
  border-radius: var(--s-form-radius);
  color: var(--s-form-text-error);
  font-size: 12px;
  line-height: 12px;
  font-family: system-ui, sans-serif;
`;