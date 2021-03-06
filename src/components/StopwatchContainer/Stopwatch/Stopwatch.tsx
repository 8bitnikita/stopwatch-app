import { useState } from "react";
import { Buttons } from "../../Buttons/Buttons";
import { Display } from "../../Display/Display";
import styles from "./Stopwatch.module.css";

type StopwatchType = {
	hours: any;
	minutes: any;
	seconds: any;
	milliseconds: any;
	isRunning: boolean;
	startTimer: any;

	millisecondsChange: (milliseconds: any) => void;
	secondsChange: (seconds: any) => void;
	minutesChange: (minutes: any) => void;
	hoursChange: (hours: any) => void;
	runningChange: (isRunning: boolean) => void;
	startTimerChange: (startTimer: any) => void;
};

export const Stopwatch: React.FC<StopwatchType> = (props) => {
	let [mlsec, setMlsec] = useState(0);
	let [sec, setSec] = useState(0);
	let [min, setMin] = useState(0);
	let [hour, setHour] = useState(0);

	const onStartHandler = () => {
		if (!props.isRunning) {
			props.runningChange(true);
			props.startTimerChange(
				setInterval(() => {
					//MILLISECONDS
					setMlsec(++mlsec);
					mlsec < 10
						? props.millisecondsChange("0" + mlsec)
						: props.millisecondsChange(mlsec);
					if (mlsec === 99) {
						mlsec = 0;

						//SECONDS
						setSec(++sec);
						sec < 10
							? props.secondsChange("0" + sec)
							: props.secondsChange(sec);

						if (sec === 60) {
							sec = 0;
							props.secondsChange("0" + sec);

							// MINUTES
							setMin(++min);
							min < 10
								? props.minutesChange("0" + min)
								: props.minutesChange(min);
							if (min === 60) {
								min = 0;
								props.minutesChange("0" + min);

								// HOURS
								setHour(++hour);
								hour < 10
									? props.hoursChange("0" + hour)
									: props.hoursChange(hour);
							}
						}
					}
				}, 10)
			);
		} else {
			clearInterval(props.startTimer);
			props.runningChange(false);
		}
	};

	const onResetHandler = () => {
		clearInterval(props.startTimer);
		props.runningChange(false);
		setMlsec(0);
		setSec(0);
		setMin(0);
		setHour(0);
		props.millisecondsChange("0" + 0);
		props.secondsChange("0" + 0);
		props.minutesChange("0" + 0);
		props.hoursChange("0" + 0);
	};

	return (
		<div className={styles.stopwatch}>
			<Display
				hours={props.hours}
				minutes={props.minutes}
				seconds={props.seconds}
				milliseconds={props.milliseconds}
			/>
			<Buttons
				onStartHandler={onStartHandler}
				onResetHandler={onResetHandler}
				isRunning={props.isRunning}
			/>
		</div>
	);
};
