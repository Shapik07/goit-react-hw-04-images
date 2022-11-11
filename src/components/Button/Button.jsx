import PropTypes from 'prop-types';
import { LoadMoreButton } from './Button.styled';

export function Button({ children, onClick }) {
  return (
    <LoadMoreButton type="button" onClick={onClick}>
      {children}
    </LoadMoreButton>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
