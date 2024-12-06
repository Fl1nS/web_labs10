import React, { useState } from "react";
import { Link, useParams } from 'react-router-dom';
import Button from "./Button";
import { Select } from 'antd';
import useFetchCars from "../FetchCars";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/itemSlice";
import { CgArrangeFront } from "react-icons/cg";

function Item() {
    const { id } = useParams();
    const { cars, loading, error} = useFetchCars();
    const [selectedType, setSelectedType] = useState("Тип приводу");
    const [selectedPower, setSelectedPower] = useState("Потужність");
    const [count, setCount] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const car = cars.find(item => String(item._id) === id);

    const handleChangeType = (value) => {
        setSelectedType(value);
    }
    const handleChangePower = (value) => {
        setSelectedPower(value);
    }

    const handleViewMoreClick = (id) => {
        navigate(`/cars/${id}`);
    };

    if (loading) {
        return <div className="load">Завантаження...</div>;
    }
    if (error) {
        return <p>Помилка: {error}</p>;
    }

    const handleAdd = () => {
        if ( car ) {
            dispatch(addItem({ ...car, type: selectedType, power: selectedPower, quantity: count}));
        }
    }

    return(<div>
        <div className="item-decriptions">
            <img className="item-img" src={car.img}/>
            <div>
                <h2>{car.title}</h2>
                <p className="item-description">{CgArrangeFront.description}</p>
                <div className="item-selects">
                    <div className="item-select">
                        <label className="label" htmlFor="select">Пальне</label>
                        <Select id="select" className="select" value={selectedType} onChange={handleChangeType} onCountChange={setCount}>
                            <Select.Option value="бензиновий">бензиновий</Select.Option>
                            <Select.Option value="електричний">електричний</Select.Option>
                        </Select>
                    </div>
                    <div className="item-select">
                        <label className="label" htmlFor="select">Колір</label>
                        <Select className="select" value={selectedPower} onChange={handleChangePower} onCountChange={setCount}>
                            <Select.Option value="Червона">Червона</Select.Option>
                            <Select.Option value="Жовта">Жовта</Select.Option>
                            <Select.Option value="Зелена">Зелена</Select.Option>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
        <div className="item-nav">
            <p className="item-price">Price: {`${car.price} грн`}</p>
            <div>
                <Link className="link" to="/catalog">
                    <Button className="back-btn"  text="Go back"/>
                </Link>
                <Link className="link" to="/cart">
                    <Button className="add-btn" text="Add to cart" onClick={handleAdd}/>
                </Link>
            </div>
        </div>
    </div>)
}

export default Item;