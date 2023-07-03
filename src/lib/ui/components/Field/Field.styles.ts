import { css, cx } from "@emotion/css";

export const field = css`
  position: relative;
  display: block;
  box-sizing: border-box;
  width: 100%;
  z-index: 0;
  &[data-type="password"] {
    & > span {
      right: 36px;
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
  font-family: var(--s-form-font);
`;

const shared = css`
  width: 100%;
  box-sizing: inherit;
  padding: 4px 8px;
  color: var(--s-form-text);
  font-size: 14px;
  line-height: 16px;
  font-family: var(--s-form-font);
  border: var(--s-form-border);
  border-radius: var(--s-form-radius);
  &::placeholder {
    color: var(--s-form-placeholder);
    font-size: 14px;
    line-height: 16px;
    font-family: var(--s-form-font);
  }
`;

export const area = cx(
  shared,
  css`
    padding: 8px;
    min-height: 100px;
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
  `,
);

export const action = css`
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
  font-family: var(--s-form-font);
  border: 0;
  bottom: 0;
  right: 6px;
  z-index: 0;
  &:hover {
    cursor: pointer;
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
  font-family: var(--s-form-font);
  transform: translateY(50%);
  border-radius: var(--s-form-radius);
  bottom: 13px;
  right: 5px;
  z-index: 0;
`;
