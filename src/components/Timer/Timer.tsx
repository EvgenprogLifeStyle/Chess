import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../../models/Player";
import {Colors} from "../../models/Colors";
import s from './Timer.module.scss'

interface TimeProps {
    currentPlayer: Player | null;
    restart: () => void
}


const Timer: FC<TimeProps> = ({currentPlayer, restart}) => {
    const [blackTime, setBlackTime] = useState(300)
    const [whiteTime, setWhiteTime] = useState(300)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTime()
    }, [currentPlayer])

    function startTime() {
        if (timer.current) clearInterval(timer.current)

        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1)
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1)
    }

    function handleRestart() {
        setBlackTime(300)
        setWhiteTime(300)
        restart()
    }

    return (
        <div className={s.timer}>
            <div>
                <button onClick={handleRestart}>Restart game</button>
            </div>
            <div className={s.timer__body}>
                <div>Черные - {blackTime}</div>
                <div>Белые - {whiteTime}</div>
            </div>
        </div>
    );
};

export default Timer;