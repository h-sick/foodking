import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface headerprops {
  isScroll: boolean;
  isMain: boolean;
}

export const StyledHeader = styled.header<headerprops>`
  height: 60px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  box-shadow: 0 4px 11px rgb(0 0 0 / 10%);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 900;
  border-bottom: 0;
  box-shadow: none;

  background-color: ${({ isScroll, isMain }) =>
    isMain ? (isScroll ? 'white' : 'transparent') : 'white'};

  a {
    margin: 0 25px;

    img {
      width: 100px;
      height: 33px;
    }
  }

  input {
    width: 100%;
    height: 27px;
    margin-left: 13px;
    border: none;
    font-size: 14px;
    font-weight: 700;

    &:focus {
      outline: none;
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin-left: auto;

    li {
      width: 130px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: ${({ isScroll, isMain, theme }) =>
        isMain
          ? isScroll
            ? `1px solid ${theme.colors.gray900}`
            : 'none'
          : `1px solid ${theme.colors.gray900}`};

      span {
        color: ${({ isScroll, isMain, theme }) =>
          isMain
            ? isScroll
              ? `${theme.colors.gray800}`
              : `${theme.colors.white}`
            : `${theme.colors.gray800}`};

        font-size: 14px;
        font-weight: 700;
      }
    }
  }

  div {
    height: 100%;
    width: 86px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: ${({ isScroll, isMain, theme }) =>
      isMain
        ? isScroll
          ? `1px solid ${theme.colors.gray900}`
          : 'none'
        : `1px solid ${theme.colors.gray900}`};

    .profileImgBtn {
      border: 2px solid ${({ theme }) => theme.colors.orange};
      border-radius: 34px;
      overflow: hidden;
      width: 38px;
      height: 38px;
    }

    button {
      border: none;
      color: ${({ isScroll, isMain, theme }) =>
        isMain
          ? isScroll
            ? `${theme.colors.gray500}`
            : 'white'
          : `${theme.colors.gray500}`};
      cursor: pointer;
      background-color: transparent;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export const blankDiv = css`
  width: 0px;
  height: 60px;
`;

interface headerInputprops {
  isMain: boolean;
}

export const HeaderInput = styled.div<headerInputprops>(({ isMain }) =>
  isMain
    ? {
        visibility: 'hidden',
      }
    : {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '27px',
        flexGrow: '1',
        borderLeft: 'none !important',
      },
);

export const headerLink = css`
  text-decoration-line: none;
`;

export const searchIcon = css`
  width: 25px;
  height: 25px;
  color: gray;
`;
