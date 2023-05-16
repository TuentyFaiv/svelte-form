import { css } from "@emotion/css";

export const list = css`
  display: flex;
  box-sizing: border-box;
  margin: 25px 0 0;
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
  font-size: 14px;
  font-family: system-ui, sans-serif;
  line-height: 14px;
`;