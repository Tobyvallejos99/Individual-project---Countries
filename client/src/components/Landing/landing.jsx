import React from 'react';
import {Link} from 'react-router-dom';
import style from './landing.module.css'

export default function LandingPage() {
    return (
        <div className={style.landingPage}>
        <div className={style.landing__box}>
            <h1 className={style.landing__title}><b>Welcome To the World</b></h1>
        </div>
        <Link to = '/Home'>
            <button className={style.landing__button}>Start</button>
            </Link>
        </div>
    )
    }