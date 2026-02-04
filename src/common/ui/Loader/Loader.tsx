import './Loader.css'
import CircularLoader from './CircularLoader';


export default function Loader() {
  return (
    <div className='mt-[15%]'>
      <CircularLoader />
    </div>
  );
}