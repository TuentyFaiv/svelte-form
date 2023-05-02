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
  padding: 3px 10px 4px;
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
  box-sizing: inherit;
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
  & > span {
    display: block;
    box-sizing: inherit;
    width: 100%;
    padding: 2px 5px;
    border-radius: 100%;
    border: 3px solid #ccc;
    &::before {
      display: block;
      content: "";
      width: 6px;
      height: 6px;
      margin: 0 auto;
      border-radius: 50%;
      background-color: #ccc;
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
      background-color: #ccc;
      transform: rotateZ(-30deg) translateY(-50%) translateX(-50%);
      bottom: 7px;
      left: 50%;
      z-index: 0;
    }
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
