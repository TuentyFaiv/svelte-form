import { css } from "@emotion/css";

export const field = css`
  position: relative;
  display: block;
  width: 100%;
  box-sizing: border-box;
  z-index: 0;
  &[data-type="password"] {
    & > span {
      right: 42px;
    }
  }
`;

export const label = css`
  display: block;
  width: 100%;
  box-sizing: inherit;
  margin: 0 0 5px;
  font-size: 16px;
  font-family: system-ui, sans-serif;
`;

export const area = css``;

export const check = css``;

export const input = css`
  width: 100%;
  box-sizing: inherit;
  padding: 2px 10px 3px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  font-family: system-ui, sans-serif;
  line-height: 14px;
  &::placeholder {
    font-size: 14px;
    font-family: system-ui, sans-serif;
    line-height: 14px;
  }
`;

export const show = css`
  position: absolute;
  display: block;
  width: 26px;
  height: 26px;
  padding: 0;
  box-sizing: border-box;
  background-color: transparent;
  font-size: 12px;
  font-family: system-ui, sans-serif;
  line-height: 12px;
  border: 0;
  bottom: 0;
  right: 10px;
  z-index: 0;
  &:hover {
    cursor: pointer;
  }
`;

export const icon = css`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  bottom: 13px;
  right: 5px;
  z-index: 0;
`;
