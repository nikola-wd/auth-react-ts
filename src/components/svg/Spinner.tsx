const Spinner = () => {
  return (
    <svg
      width="14px"
      height="14px"
      viewBox="0 0 14 14"
      className="spinner"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <circle
          cx="7"
          cy="7"
          r="6"
          stroke="#fff"
          strokeOpacity=".24"
          strokeWidth="2"
        />
        <path
          fill="#fff"
          fillOpacity=".6"
          fillRule="nonzero"
          d="M7 0a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5V0z"
        />
      </g>
    </svg>
  );
};

export default Spinner;
