import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { filterActiveNew, fetchFilters } from './filtersSlice'

import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
    const dispatch = useDispatch();
    const { filters, filtersLoadingStatus, filterActive } = useSelector(state => state.filters);

    useEffect(() => {
        dispatch(fetchFilters());
            // eslint-disable-next-line
    }, []);
    
    if (filtersLoadingStatus === 'loading') {
        return <Spinner/>
    } else if (filtersLoadingStatus === 'error') {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>            
    }

    const renderFilters = (filters) => {
        if (filters && filters.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>  
        }

        return filters.map(item => {
            const clazz = `btn ${item.clazz} ${filterActive === item.name ? 'active': ''}`
            return <button 
                    key={item.name} 
                    id={item.name} 
                    className={clazz}
                    onClick={() => dispatch(filterActiveNew(item.name))}
                >
                    {item.label}
                </button>
        })
    }

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;