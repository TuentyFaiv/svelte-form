import { css, cx } from "@emotion/css";

export const field = css`
  position: relative;
  display: block;
  box-sizing: border-box;
  width: 100%;
  z-index: 0;
  &[data-type="password"] {
    & > span {
      right: 42px;
    }
  }
  &[data-type="checkbox"] {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    &::before {
      position: absolute;
      display: block;
      box-sizing: inherit;
      content: "";
      width: 16px;
      min-width: 16px;
      height: 16px;
      min-height: 16px;
      border-radius: var(--s-form-radius);
      border: var(--s-form-border);
      transform: translateY(-50%);
      top: 50%;
      left: 0;
      z-index: 0;
    }
    & > p {
      margin-bottom: 0;
    }
    & > span {
      transform: translateY(115%);
      left: 0;
      right: auto;
      bottom: 0;
      cursor: default;
    }
    &[data-checked="true"] {
      &::after {
        position: absolute;
        display: block;
        box-sizing: inherit;
        content: attr(data-checked-icon);
        width: 16px;
        min-width: 16px;
        height: 16px;
        min-height: 16px;
        border-radius: var(--s-form-radius);
        background-color: var(--s-form-success);
      }
    }
  }
`;

export const label = css`
  display: block;
  box-sizing: inherit;
  width: 100%;
  margin: 0 0 5px;
  color: var(--s-form-text);
  font-size: 16px;
  line-height: 18px;
  font-family: system-ui, sans-serif;
`;

const shared = css`
  width: 100%;
  box-sizing: inherit;
  padding: 4px 8px;
  color: var(--s-form-text);
  font-size: 14px;
  line-height: 16px;
  font-family: system-ui, sans-serif;
  border: var(--s-form-border);
  border-radius: var(--s-form-radius);
  &::placeholder {
    color: var(--s-form-placeholder);
    font-size: 14px;
    line-height: 16px;
    font-family: system-ui, sans-serif;
  }
`;

export const area = cx(
  shared,
  css`
    padding: 8px;
    resize: vertical;
    &::placeholder {
    }
  `,
);

export const check = css`
  visibility: hidden;
`;

export const input = cx(
  shared,
  css`
    &::placeholder {
    }
  `
);

export const show = css`
  position: absolute;
  display: block;
  box-sizing: inherit;
  width: 26px;
  height: 26px;
  padding: 0;
  background-color: transparent;
  color: var(--s-form-text);
  font-size: 12px;
  line-height: 12px;
  font-family: system-ui, sans-serif;
  border: 0;
  bottom: 0;
  right: 10px;
  z-index: 0;
  &:hover {
    cursor: pointer;
  }
  & > span {
    display: block;
    box-sizing: inherit;
    width: 100%;
    padding: 2px 5px;
    border-radius: 100%;
    border: 3px solid var(--s-form-primary);
    &::before {
      display: block;
      content: "";
      width: 6px;
      height: 6px;
      margin: 0 auto;
      border-radius: 50%;
      background-color: var(--s-form-primary);
    }
  }
  &:not(.show) > span {
    position: relative;
    z-index: 0;
    ::after {
      position: absolute;
      display: block;
      content: "";
      width: 100%;
      height: 3px;
      background-color: var(--s-form-primary);
      transform: rotateZ(-30deg) translateY(-50%) translateX(-50%);
      bottom: 7px;
      left: 50%;
      z-index: 0;
    }
  }
`;

export const icon = css`
  display: block;
  box-sizing: inherit;
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  font-family: system-ui, sans-serif;
  transform: translateY(50%);
  border-radius: var(--s-form-radius);
  bottom: 13px;
  right: 5px;
  z-index: 0;
`;
