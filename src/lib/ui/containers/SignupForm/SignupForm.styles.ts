import { css } from "@emotion/css";

export const container = css`
  box-sizing: border-box;
  width: 100%;
  max-width: 780px;
  margin: 0 auto;
`;

export const box = css`
  box-sizing: inherit;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 25px;
`;

export const submit = css`
  box-sizing: inherit;
  display: block;
  width: 100%;
  border: none;
  background-color: lightgray;
  border-radius: 4px;
  padding: 10px 20px;
`;
