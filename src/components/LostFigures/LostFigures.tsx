import React, {FC} from 'react';
import {Figure} from "../../models/figures/Figure";
import s from "./LostFigures.module.scss"
interface LostFiguresProps {
    title: string;
    figures: Figure[]
}

const LostFigures: FC<LostFiguresProps> = ({title, figures}) => {
    return (
        <div className={s.lost}>
            <h3>{title}</h3>
            <div>
                {figures.map(figure =>
                    <div key={figure.id}>{figure.name} - {figure.logo && <img src={figure.logo} alt={figure.name}/>}  </div>
                )}
            </div>
        </div>
    );
};

export default LostFigures;