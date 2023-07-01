import { css } from "@emotion/css";

// import Icon from "@icons/icon-select.svg";

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
  font-family: system-ui, sans-serif;
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
  &:is(:hover, :focus, :focus-within) > p {
    &::after {}
  }
  &.active {
    & > p {
      &::after {
        transform: rotateZ(-45deg) rotateX(-180deg) translateY(-50%);
      }
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
  font-family: system-ui, sans-serif;
  z-index: 0;
  &[data-placeholder="true"] {
    color: var(--s-form-placeholder);
  }
  & > img {
    position: absolute;
    display: block;
    box-sizing: inherit;
    width: 24px;
    height: 24px;
    object-fit: contain;
    top: 50%;
    right: 0;
    transform: translateY(-50%) translateX(2px);
    z-index: 0;
  }
`;

export const options = css`
  position: absolute;
  display: flex;
  box-sizing: inherit;
  width: 100%;
  max-height: 150px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 0 0 4px 4px;
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
    background-color: #ccc;
  }
`;

export const option = css`
  display: block;
  width: 100%;
  font-size: 14px;
  box-sizing: inherit;
  padding: 5px 10px;
  font-family: system-ui, sans-serif;
  line-height: 14px;
  &[aria-disabled="true"] {
    pointer-events: none;
  }
  &:hover {
    background-color: #ccc;
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
  background-color: red;
  color: white;
  font-size: 12px;
  font-family: system-ui, sans-serif;
  line-height: 12px;
  transform: translateY(50%);
  border-radius: 4px;
  bottom: 7px;
  right: 31px;
  z-index: 0;
`;
