import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
  return <ThreeDots
        color="lightblue"
        height={30}
        width={100}
        ariaLabel="three-dots-loading"
      />;
};

export default Loader;