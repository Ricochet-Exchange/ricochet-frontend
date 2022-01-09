import React from 'react';

const Logo = () => (
  <svg width="86" height="40" viewBox="0 0 86 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0)">
      <path d="M61.7789 29.7715H58.0566V18.7942C58.0566 18.7942 61.7795 19.0278 61.7795 21.1471L61.7789 29.7715Z" fill="#EDF3FB" />
      <path d="M58.2661 8.09521H67.3565C69.9377 8.09521 74.581 8.93826 74.581 14.839C74.581 20.8602 68.5574 21.1012 68.5574 21.1012L74.2479 29.7715H70.4861L65.5468 22.3053V18.7942C65.5468 18.7942 70.943 19.5357 70.943 14.7196C70.943 11.1041 67.1753 11.1041 67.1753 11.1041L60.1476 10.8637C60.1476 10.8637 58.2661 10.3833 58.2661 8.09521Z" fill="#EDF3FB" />
      <path d="M65.168 0.0270996H24.3126L34.6727 7.6139L0 20.0173L34.9263 32.6618L24.4604 40.0001L65.168 40.0076C76.6734 40.0076 86 31.0549 86 20.0173C86 8.97976 76.6734 0.0270996 65.168 0.0270996ZM65.168 35.5508C56.2271 35.5519 48.9805 28.597 48.9805 20.0173C48.9805 11.4377 56.2271 4.48277 65.168 4.48277C74.1089 4.48277 81.3567 11.4377 81.3567 20.0173C81.3567 28.597 74.1089 35.5519 65.168 35.5519V35.5508Z" fill="url(#paint0_linear)" />
    </g>
    <defs>
      <linearGradient id="paint0_linear" x1="86" y1="19.9999" x2="-1.64705e-09" y2="19.9999" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EDF3FB" />
        <stop offset="1" stopColor="#678EB5" />
      </linearGradient>
      <clipPath id="clip0">
        <rect width="86" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const Bank = ({
  style = {},
  fill = 'white',
  width = '50px',
  className = '',
  viewBox = '0 0 50 50',
}) => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ''}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      fill={fill}
      d="M39.32,19.1v-.22a2.12,2.12,0,0,0-1-1.69L26,9.59a2,2,0,0,0-2,0L12,17.45a2.2,2.2,0,0,0-.92,1.68,1.35,1.35,0,0,0,1.37,1.34h1.21a1.45,1.45,0,0,0-.1.51V33.55a1.62,1.62,0,0,0,0,.19H12.05a1.37,1.37,0,0,0-1.37,1.38v2.55A1.37,1.37,0,0,0,12.05,39H38a1.37,1.37,0,0,0,1.37-1.37V35.12A1.37,1.37,0,0,0,38,33.74H36.42a1.62,1.62,0,0,0,0-.19V21a1.45,1.45,0,0,0-.1-.51H38A1.37,1.37,0,0,0,39.32,19.1Zm-27.08,0a1,1,0,0,1,.39-.69l12-7.83a.7.7,0,0,1,.37-.09.67.67,0,0,1,.33.08l12.4,7.59a1,1,0,0,1,.38.69v.22a.19.19,0,0,1-.19.19H12.43A.18.18,0,0,1,12.24,19.13ZM26.47,33.55a.2.2,0,0,1-.2.19H23.73a.2.2,0,0,1-.2-.19V21a.2.2,0,0,1,.2-.2h2.54a.2.2,0,0,1,.2.2Zm-4-13.08a1.45,1.45,0,0,0-.1.51V33.55a1.62,1.62,0,0,0,0,.19H18.8a1.62,1.62,0,0,0,0-.19V21a1.45,1.45,0,0,0-.1-.51ZM14.72,33.55V21a.2.2,0,0,1,.2-.2h2.55a.2.2,0,0,1,.19.2V33.55a.2.2,0,0,1-.19.19H14.92A.2.2,0,0,1,14.72,33.55Zm23.42,1.57v2.55a.19.19,0,0,1-.19.19H12.05a.2.2,0,0,1-.2-.19V35.12a.2.2,0,0,1,.2-.2H38A.19.19,0,0,1,38.14,35.12Zm-5.6-1.38a.2.2,0,0,1-.2-.19V21a.2.2,0,0,1,.2-.2h2.54a.2.2,0,0,1,.2.2V33.55a.2.2,0,0,1-.2.19Zm-1.34,0H27.61a1.62,1.62,0,0,0,0-.19V21a1.45,1.45,0,0,0-.1-.51h3.71a1.45,1.45,0,0,0-.1.51V33.55A1.62,1.62,0,0,0,31.2,33.74Z"
    />
  </svg>
);

const Vault = ({
  style = {},
  fill = 'white',
  width = '50px',
  className = '',
  viewBox = '0 0 50 50',
}) => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ''}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      fill={fill}
      d="M35.36,40H15.73a5.17,5.17,0,0,1-5.16-5.17V15.19A5.17,5.17,0,0,1,15.73,10H35.36a5.17,5.17,0,0,1,5.16,5.17V34.81A5.17,5.17,0,0,1,35.36,40ZM15.73,11.59a3.6,3.6,0,0,0-3.6,3.6V34.81a3.6,3.6,0,0,0,3.6,3.6H35.36a3.6,3.6,0,0,0,3.6-3.6V15.19a3.6,3.6,0,0,0-3.6-3.6Z"
    />
    <path
      fill={fill}
      d="M21.35,27.94l-4.57,4.37a.78.78,0,0,0,.54,1.34.8.8,0,0,0,.54-.21l4.58-4.38A5,5,0,0,1,21.35,27.94Z"
    />
    <path
      fill={fill}
      d="M21.42,22a5,5,0,0,1,1.1-1.11l-4.31-4.31a.78.78,0,1,0-1.11,1.1Z"
    />
    <path
      fill={fill}
      d="M34.34,16.59a.8.8,0,0,0-1.11,0l-4.57,4.38a5.22,5.22,0,0,1,1.08,1.12l4.57-4.37A.79.79,0,0,0,34.34,16.59Z"
    />
    <path
      fill={fill}
      d="M29.67,28a5,5,0,0,1-1.1,1.11l4.31,4.31a.82.82,0,0,0,.56.23A.78.78,0,0,0,34,32.34Z"
    />
    <path
      fill={fill}
      d="M25.55,30.76A5.76,5.76,0,1,1,31.3,25,5.77,5.77,0,0,1,25.55,30.76Zm0-10.27A4.51,4.51,0,1,0,30.05,25,4.51,4.51,0,0,0,25.55,20.49Z"
    />
    <circle fill={fill} cx="25.55" cy="25" r="2.31" />
    <path
      fill={fill}
      d="M10.1,20.29a.63.63,0,0,1-.62-.63v-2.5a.63.63,0,0,1,1.25,0v2.5A.63.63,0,0,1,10.1,20.29Z"
    />
    <path
      fill={fill}
      d="M10.1,33.72a.63.63,0,0,1-.62-.63v-2.5a.63.63,0,0,1,1.25,0v2.5A.63.63,0,0,1,10.1,33.72Z"
    />
  </svg>
);

const Arrowdown = ({
  style = {},
  fill = 'white',
  width = '15.603',
  height = '9.052',
  className = '',
  viewBox = '0 0 15.603 9.052',
}) => (
  <svg
    width={width}
    style={style}
    height={height}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ''}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      id="Path_104"
      data-name="Path 104"
      d="M0,0,6.24,6.722,0,12.775"
      transform="translate(14.189 1.414) rotate(90)"
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="2"
    />
  </svg>
);

const Vmark = ({
  style = {},
  fill = '#69eaae',
  width = '29.289',
  height = '20',
  className = '',
  viewBox = '0 0 29.289 20',
}) => (
  <svg
    width={width}
    style={style}
    height={height}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ''}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g id="Group_159" transform="translate(-627.931 -568.38)">
      <path id="Path_101" d="M637.744,588.38l-9.448-10a1.338,1.338,0,0,1,1.945-1.837l7.627,8.075,17.1-15.878a1.338,1.338,0,1,1,1.82,1.961Z" fill={fill} />
    </g>
  </svg>
);

const Xmark = ({
  style = {},
  fill = '#4f56b5',
  width = '30.253',
  height = '30.252',
  className = '',
  viewBox = '0 0 30.253 30.252',
}) => (
  <svg
    width={width}
    style={style}
    height={height}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ''}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path id="Path_99" d="M570.593,575.977l13.419-13.418a1,1,0,1,0-1.414-1.415l-13.419,13.419-13.42-13.419a1,1,0,0,0-1.414,1.415l13.42,13.418L554.345,589.4a1,1,0,0,0,1.414,1.415l13.42-13.419L582.6,590.811a1,1,0,1,0,1.414-1.415Z" transform="translate(-554.052 -560.852)" fill={fill} />
  </svg>
);

export default {
  Logo, Bank, Vault, Arrowdown, Vmark, Xmark,
};
