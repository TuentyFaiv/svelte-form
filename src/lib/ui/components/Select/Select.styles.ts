import { css } from "@emotion/css";

// import Icon from "@icons/icon-select.svg";

export const field = css`
  /* position: relative;
  display: block;
  width: 100%;
  z-index: 1; */
  &[data-disabled="true"] {
    /* pointer-events: none; */
  }
  &:hover {
    /* cursor: pointer; */
  }
`;

export const label = css``;

export const select = css`
  /* width: 100%; */
  &:is(:hover, :focus, :focus-within) {}
  &:is(:hover, :focus, :focus-within) > p {
    &::after {}
  }
  &.active {
    & > p {
      &::after {
        /* transform: rotateX(180deg); */
      }
    }
  }
`;

export const value = css`
  /* position: relative;
  width: 100%; */
  /* z-index: 0; */
  &::after {
    /* position: absolute;
    content: "";
    width: 25px;
    min-width: 25px;
    height: 25px;
    min-height: 25px;
    transition: transform .5s ease;
    will-change: transform;
    top: 0;
    right: 0;
    z-index: 0; */
  }
`;

export const options = css`
  /* position: absolute;
  width: 100%;
  max-height: 150px;
  transform: translateX(-50%);
  overflow-y: auto;
  top: 100%;
  left: 50%;
  z-index: 0; */
  &::-webkit-scrollbar {
    /* width: 10px;
    background: transparent; */
  }
  &::-webkit-scrollbar-thumb {
    /* width: 10px; */
  }
`;

export const option = css`
  /* display: block;
  width: 100%; */
  &:hover {
    & > span {
      /* pointer-events: none; */
    }
  }
`;

export const error = css`
  /* position: absolute;
  display: block;
  transform: translateY(-50%);
  top: 50%;
  z-index: 0; */
`;
