import React, {useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCountries, filterByContinent, filterByActivity, orderByName, orderByPopulation, getActivities } from "../../redux/actions/index";
import {
    LESS_POPULATION, 
    HIGHER_POPULATION, 
    ALL, ALL_AFRICA, 
    ALL_ASIA, 
    ALL_EUROPE, 
    ALL_OCEANIA, 
    ASC, 
    DESC 
} from "../../types/const";
import Card from '../Card/card.jsx';
import Paginado from '../Paginated/paginated.jsx';
import style from '../Cards/cards.module.css';

export default function Cards () {
    const dispatch = useDispatch();
    const activities = useSelector((state) => state.activities);

    const countries = useSelector((state) => state.countries);

    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage] = useState(10);
    const lastCountry = currentPage * countriesPerPage;
    const firstCountry = lastCountry - countriesPerPage;
    const currentCountry = countries.slice(firstCountry, lastCountry);
    const [, setOrden] = useState('');

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    function reloadButton(ele) {
        ele.preventDefault()
        dispatch(getCountries())
    }

    function handleFilterContinent(ele) {
        dispatch(filterByContinent(ele.target.value));
        setCurrentPage(1);
    }

    function handleFilterActivity(ele) {
        dispatch(filterByActivity(ele.target.value));
        setCurrentPage(1);
    }

    function handleSort(ele) {
        ele.preventDefault();
        dispatch(orderByName(ele.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${ele.target.value}`)
    }

    function handleSort2(ele) {
        ele.preventDefault();
        dispatch(orderByPopulation(ele.target.value));
        setCurrentPage(1);
        setOrden(`Ordenador ${ele.target.value}`);
    }

    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivities());
    }, [dispatch]);

    return (
        <div className={style.Cards__Container}>
        <div className={style.Filter__Container}>
            <button id='b1' className={style.Filter__Option} onClick={(ele) => reloadButton(ele)}>Reload</button>
            <select 
                className={style.Filter__Option}
                onChange={(ele) => {
                handleSort(ele);
                }}
            >
                <option>Filter By Alphabetic Order</option>
                <option value={ASC}>A - Z</option>
                <option value={DESC}>Z - A</option>
            </select>

            <select 
                className={style.Filter__Option}
                onChange={(ele) => {
                handleSort2(ele);
                }}
            >
                <option>Filter By Population</option>
                <option value={HIGHER_POPULATION}>HIGHER POPULATION</option>
                <option value={LESS_POPULATION}>LOWER POPULATION</option>
            </select>

            <select 
                className={style.Filter__Option}
                onChange={(ele) => handleFilterActivity(ele)}>
                <option value='todos'>Activities</option>
                {activities.map((val) => (
                <option value={val.name}>{val.name}</option>
                ))}
            </select>

            <select
                className={style.Filter__Option}
                onChange={(ele) => handleFilterContinent(ele)}
            >
                <option value={ALL}>All Continents</option>
                <option value={ALL_AFRICA}>Africa</option>
                <option value="Americas">America</option>
                <option value={ALL_ASIA}>Asia</option>
                <option value={ALL_EUROPE}>Europe</option>
                <option value={ALL_OCEANIA}>Oceania</option>
            </select>
        </div>

        <div className={style.Cards__Box}>
            {currentCountry?.map((country) => {
            return (
                <div className={style.Card} key={country.id}>
                <Link className={style.Card__Link} to={'/home/' + country.id}>
                    <Card
                    name={country.name}
                    flag={country.flag}
                    continent={country.continent}
                    capital={country.capital}
                    population={country.population}
                    />
                </Link>
                </div> 
            );
            })}
        </div> 
        
        <Paginado
            countriesPerPage={countriesPerPage}
            countries={countries.length}
            paginado={paginado}
        /> 

        </div>
    )
    }