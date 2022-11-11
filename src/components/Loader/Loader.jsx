import { BallTriangle } from 'react-loader-spinner';
import { Thumb } from './Loader.styled';

export default function Loader() {
  return (
    <Thumb>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="blue"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </Thumb>
  );
}
