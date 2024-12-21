import { useEffect } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { filtersFetching, filtersFetched, filtersFetchingError } from "../../actions";

import { heroAdded } from "../../actions";
import { useHttp } from "../../hooks/http.hook";

import './heroesAddForm.scss'

const HeroesAddForm = () => {
    const { request } = useHttp();
    const dispatch = useDispatch();
    const { filters, filtersLoadingStatus } = useSelector(state => state.filters);

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(res => dispatch(filtersFetched(res)))
            .catch(dispatch(filtersFetchingError()))
            // eslint-disable-next-line
    }, [])

    const onAdd = (values) => {
        const id = uuidv4();
        const hero = { id, ...values };

        request("http://localhost:3001/heroes", 'POST', JSON.stringify(hero))
            .then(res => res)
            .then(dispatch(heroAdded(hero)))
            .catch(error => console.log(error))
    }

    const renderFilters = (filters, status) => {
        if (status === 'loading') {
            return <option>Загрузка...</option>
        } else if (status === 'error') {
            return <option>Ошибка загрузки</option>
        }

        if (filters && filters.length > 0) {
            // eslint-disable-next-line
            return filters.map(item => {
                if (item.name !== 'all') {
                    return <option key={item.name} value={item.name}>{item.label}</option>
                }
            })
        }
    }

    const elements = renderFilters(filters, filtersLoadingStatus)

    return (
        <Formik
            initialValues={{
                name: '',
                description: '',
                element: ''
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                        .min(2, 'Минимум 2 символа для заполнения')
                        .required('Обязательное поле!'),
                description: Yup.string()
                        .required('Обязательное поле!'),
                element: Yup.string()
                        .required('Обязательное поле!'),
            })}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                onAdd(values)
                setSubmitting(false)
                resetForm()
            }}>
            {({isSubmitting}) => (
                <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field 
                        type="text" 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Как меня зовут?"/>
                    <ErrorMessage component="div" className="error" name="name"/>
                </div>
    
                <div className="mb-3">
                    <label htmlFor="description" className="form-label fs-4">Описание</label>
                    <Field
                        name="description" 
                        className="form-control" 
                        id="description" 
                        as="textarea"
                        placeholder="Что я умею?"
                        style={{"height": '130px'}}/>
                    <ErrorMessage component="div" className="error" name="description"/>
                </div>
    
                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field 
                        className="form-select" 
                        as="select"
                        id="element" 
                        name="element">
                        <option >Я владею элементом...</option>
                        {elements}
                    </Field>
                    <ErrorMessage component="div" className="error" name="element"/>
                </div>
    
                <button type="submit" disabled={isSubmitting} className="btn btn-primary">Создать</button>
            </Form>
            )}
        </Formik>
    )
}

export default HeroesAddForm;