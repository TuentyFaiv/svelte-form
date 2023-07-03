import { css } from "@emotion/css";

export const field = css`
  position: relative;
  display: block;
  box-sizing: border-box;
  width: 100%;
  z-index: 1;
  &[data-disabled="true"] {
    pointer-events: none;
  }
  &:hover {
    cursor: pointer;
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

export const select = css`
  position: relative;
  box-sizing: inherit;
  width: 100%;
  padding: 4px 8px;
  border: var(--s-form-border);
  border-radius: var(--s-form-radius);
  z-index: 0;
  &:is(:hover, :focus, :focus-within) {}
  &:is(:hover, :focus, :focus-within) > p {}
  &.active > p {
    & > img {
      transform: translateY(-50%) translateX(2px) rotateX(180deg);
    }
  }
`;

export const value = css`
  position: relative;
  box-sizing: inherit;
  width: 100%;
  min-height: 14px;
  margin: 0;
  color: var(--s-form-text);
  font-size: 14px;
  line-height: 16px;
  font-family: var(--s-form-font);
  z-index: 0;
  &[data-placeholder="true"] {
    color: var(--s-form-placeholder);
  }
`;

export const icon = css`
  position: absolute;
  display: block;
  box-sizing: inherit;
  width: 24px;
  height: 24px;
  object-fit: contain;
  top: 50%;
  right: 0;
  transform: translateY(-50%) translateX(2px);
  transition: transform .5s ease-in-out;
  z-index: 0;
`;

export const options = css`
  position: absolute;
  display: flex;
  box-sizing: inherit;
  width: 100%;
  max-height: 150px;
  background-color: var(--s-form-secondary);
  border: var(--s-form-border);
  border-radius: 0 0 var(--s-form-radius) var(--s-form-radius);
  overflow-y: auto;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  transform: translateX(-50%);
  top: 100%;
  left: 50%;
  z-index: 0;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: var(--s-form-primary);
  }
`;

export const option = css`
  display: block;
  box-sizing: inherit;
  width: 100%;
  padding: 5px 10px;
  color: var(--s-form-text);
  font-size: 14px;
  line-height: 16px;
  font-family: var(--s-form-font);
  &[aria-disabled="true"] {
    pointer-events: none;
  }
  &:hover {
    background-color: var(--s-form-primary);
    & > span {
      pointer-events: none;
    }
  }
`;

export const error = css`
  position: absolute;
  display: block;
  padding: 3px 5px;
  box-sizing: inherit;
  background-color: var(--s-form-error);
  color: var(--s-form-text-error);
  font-size: 12px;
  line-height: 12px;
  font-family: var(--s-form-font);
  transform: translateY(50%);
  border-radius: var(--s-form-radius);
  bottom: 8px;
  right: 26px;
  z-index: 0;
`;
