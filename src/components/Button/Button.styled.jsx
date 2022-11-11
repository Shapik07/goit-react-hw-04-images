import styled from 'styled-components';

export const LoadMoreButton = styled.button`
  margin: 0 auto;
  padding: 8px 16px;
  border-radius: 2px;
  background-color: #3f51b5;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
  color: #fff;
  border: 0;
  text-decoration: none;
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
  width: 180px;
  &:hover,
  &:focus {
    background-color: #303f9f;
  }
`;
