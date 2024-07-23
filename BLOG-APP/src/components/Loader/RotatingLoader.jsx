import { RotatingLines } from "react-loader-spinner";

export default function RotatingLoader() {
  return (
    <RotatingLines
      visible={true}
      height="60"
      width="60"
      color="#306cce"
      strokeWidth="2"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
