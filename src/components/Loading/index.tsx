import { ClimbingBoxLoader } from "react-spinners";

const Loading: React.FC = () => {
  return (
    <div className="loading">
      <ClimbingBoxLoader size={20} color={'#0F2C59'} loading={true} />
    </div>
  )
}

export default Loading;