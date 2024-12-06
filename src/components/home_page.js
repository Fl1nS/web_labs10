import React from "react";
import imgCar from "../img/car2.jpg";

const HomePage = () => {
    return (
        <main className="home">
            <img className="home-img" src={imgCar}/>
            <div className="home-description">
                <h1 className="title">Mashynes</h1>
                <p className="description">Досить потужний та незламний магазин машин. Ми пропонуємо (заставляємо) купити у нас машини по вигідній ціні та найкращій якості.</p>
            </div>
        </main>
    )
}

export default HomePage;