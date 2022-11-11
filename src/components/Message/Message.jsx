import PropTypes from 'prop-types';
import { Thumb, Title } from './Message.styled';

export default function InfoMessage({ message }) {
  return (
    <Thumb>
      <Title>{message}</Title>
    </Thumb>
  );
}

InfoMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
