import React from "react";
import {Switch, Route, Link} from 'react-router-dom';
import "./Association.css"

function Association() {
    return (
        <>
            <a href="http://www.korea-baseball.com/"><img id="kbsa"src="img/kbsa.png" alt="error"/></a>
            <a href="https://www.kfa.or.kr/"><img id="kfa"src="img/kfa.png" alt="error"/></a>
            <a href="https://www.koreabasketball.or.kr/"><img id="kbb"src="img/kba.png" alt="error"/></a>
            <a href="http://www.koreaswim.or.kr/"><img id="ksf"src="img/ksf.png" alt="error"/></a>
            <a href="http://www.koreabadminton.org"><img id="bka"src="img/bka.png" alt="error"/></a>
            <a href="http://www.archery.or.kr/"><img id="kaa"src="img/kaa.png" alt="error"/></a>
            <a href="https://skating.or.kr/"><img id="ksa"src="img/ksa.png" alt="error"/></a>
            <img id="search"src="img/Group 89.png" alt="error"/>
            <div id="tabs">
                <Link to={"/Home"}><img id="home"src="img/tab/Home.png" alt="error"/></Link>
                <Link to={"/Clubs"}><img id="club"src="img/tab/구단.png" alt="error"/></Link>
                <Link to={"/Kind"}><img id="kind"src="img/tab/종목.png" alt="error"/></Link>
                <Link to={"/Fields"}><img id="field"src="img/tab/경기장.png" alt="error"/></Link>
                <Link to={"/Associations"}><img id="association"src="img/tab/연맹.png" alt="error"/></Link>
                <Link to={"/MyInfo"}><img id="info"src="img/tab/내정보.png" alt="error"/></Link>
                <Link to={"/Weather"}><img id="weather"src="img/tab/날씨.png" alt="error"/></Link>
                <img id="red"src="img/tab/Rectangle 198.png" alt="error"/>
                <img id="line"src="img/tab/Line 58.png" alt="error"/>
            </div>
        </>
    );
}

export default Association;