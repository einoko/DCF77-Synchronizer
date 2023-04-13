import { useEffect, useState } from "react";
import { useSpring, animated, SpringValue } from "react-spring";
import { getDETime } from "../lib/helpers";

interface HandProps {
  rotation: number;
  handComponent: React.FC<{ springProps: { rotation: SpringValue<number> } }>;
}

const HourHand = ({
  springProps,
}: {
  springProps: { rotation: SpringValue<number> };
}) => {
  return (
    <animated.g
      transform={springProps.rotation.to(
        (r: number) => `rotate(${r}, 190, 190)`
      )}
    >
      <circle className="cls-4" cx="190" cy="190" r="8" />
      <path
        className="cls-4"
        d="M190,62h0a6,6,0,0,1,6,6V184a6,6,0,0,1-6,6h0a6,6,0,0,1-6-6V68A6,6,0,0,1,190,62Z"
      />
    </animated.g>
  );
};

const MinuteHand = ({
  springProps,
}: {
  springProps: { rotation: SpringValue<number> };
}) => {
  return (
    <animated.g
      transform={springProps.rotation.to(
        (r: number) => `rotate(${r}, 190, 190)`
      )}
    >
      <circle className="cls-4" cx="190" cy="190" r="6" />
      <animated.path
        className="cls-4"
        d="M190,33h0a4,4,0,0,1,4,4V186a4,4,0,0,1-4,4h0a4,4,0,0,1-4-4V37A4,4,0,0,1,190,33Z"
      />
    </animated.g>
  );
};

const SecondHand = ({
  springProps,
}: {
  springProps: { rotation: SpringValue<number> };
}) => {
  return (
    <animated.g
      transform={springProps.rotation.to(
        (r: number) => `rotate(${r}, 190, 190)`
      )}
    >
      <circle className="cls-5" cx="190" cy="190" r="4" />
      <circle className="cls-6" cx="190" cy="190" r="10" />
      <rect
        className="cls-5"
        x="188"
        y="30"
        width="4"
        height="193"
        rx="1"
        ry="1"
      />
    </animated.g>
  );
};

const Hand: React.FC<HandProps> = ({ handComponent, rotation }) => {
  const [accumulatedRotation, setAccumulatedRotation] = useState<number>(0);
  const [prevRotation, setPrevRotation] = useState<number>(rotation);

  useEffect(() => {
    if (rotation < prevRotation) {
      setAccumulatedRotation(accumulatedRotation + 360);
    }
    setPrevRotation(rotation);
  }, [rotation, prevRotation, accumulatedRotation]);

  const springProps = useSpring({
    rotation: rotation + accumulatedRotation,
    config: {
      mass: 0.2,
      tension: 2000,
      friction: 15,
    },
  });

  return handComponent({ springProps });
};

const AnalogClock: React.FC = () => {
  const [time, setTime] = useState(getDETime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getDETime());
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const hourHandRotation =
    (time.getHours() % 12) * 30 + time.getMinutes() * 0.5;
  const minuteHandRotation = time.getMinutes() * 6 + time.getSeconds() * 0.1;
  const secondHandRotation = time.getSeconds() * 6;

  return (
    <div>
      <animated.svg viewBox="0 0 380 380">
        <defs>
          <style>
            {`.cls-1{fill:#fff;}.cls-2,.cls-3,.cls-6{fill:none;}.cls-2{stroke:#565656;}.cls-2,.cls-6{stroke-width:2px;}.cls-3{stroke:#333;stroke-width:6px;}.cls-4{fill:#333;}.cls-5{fill:#d0021b;}.cls-6{stroke:#d0021b;}`}
          </style>
        </defs>
        <title>Animated Clock</title>
        <g>
          <g>
            <g>
              <circle className="cls-1" cx="190" cy="190" r="190" />
            </g>
            <g id="minutes">
              <polygon
                className="cls-2"
                points="190 190 131.29 370.7 190 190 112.72 363.57 190 190 95 354.55 190 190 78.32 343.71 190 190 62.87 331.2 190 190 48.8 317.13 190 190 36.29 301.68 190 190 25.45 285 190 190 16.43 267.28 190 190 9.3 248.71 190 190 4.15 229.5 190 190 1.04 209.86 190 190 0 190 190 190 1.04 170.14 190 190 4.15 150.5 190 190 9.3 131.29 190 190 16.43 112.72 190 190 25.45 95 190 190 36.29 78.32 190 190 48.8 62.87 190 190 62.87 48.8 190 190 78.32 36.29 190 190 95 25.45 190 190 112.72 16.43 190 190 131.29 9.3 190 190 150.5 4.15 190 190 170.14 1.04 190 190 190 0 190 190 209.86 1.04 190 190 229.5 4.15 190 190 248.71 9.3 190 190 267.28 16.43 190 190 285 25.45 190 190 301.68 36.29 190 190 317.13 48.8 190 190 331.2 62.87 190 190 343.71 78.32 190 190 354.55 95 190 190 363.57 112.72 190 190 370.7 131.29 190 190 375.85 150.5 190 190 378.96 170.14 190 190 380 190 190 190 378.96 209.86 190 190 375.85 229.5 190 190 370.7 248.71 190 190 363.57 267.28 190 190 354.55 285 190 190 343.71 301.68 190 190 331.2 317.13 190 190 317.13 331.2 190 190 301.68 343.71 190 190 285 354.55 190 190 267.28 363.57 190 190 248.71 370.7 190 190 229.5 375.85 190 190 209.86 378.96 190 190 190 380 190 190 170.14 378.96 190 190 150.5 375.85 190 190"
              />
              <circle className="cls-1" cx="190" cy="190" r="180" />
            </g>
            <g id="hours">
              <polygon
                className="cls-3"
                points="190 190 95 354.55 190 190 25.45 285 190 190 0 190 190 190 25.45 95 190 190 95 25.45 190 190 190 0 190 190 285 25.45 190 190 354.55 95 190 190 380 190 190 190 354.55 285 190 190 285 354.55 190 190 190 380 190 190"
              />
              <circle className="cls-1" cx="190" cy="190" r="160" />
            </g>
            <Hand handComponent={HourHand} rotation={hourHandRotation} />
            <Hand handComponent={MinuteHand} rotation={minuteHandRotation} />
            <Hand handComponent={SecondHand} rotation={secondHandRotation} />
          </g>
        </g>
      </animated.svg>
    </div>
  );
};

export default AnalogClock;
