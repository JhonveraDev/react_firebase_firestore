import React, { useState, useEffect } from 'react'
import { db } from '../config/firebase';

const LinkForm = (props) => {

    const initialStateValues = {
        url: '',
        name: '',
        description: ''
    }

    const [values, setValues] = useState({ initialStateValues });

    const hadleInputChange = e => {
        //Captura de los valores
        const { name, value } = e.target;
        // console.log(name,value);
        //Establecer los valores del estado inicial
        setValues({ ...values, [name]: value })//reemplaza el valor existente de initialStateValues  y lo Actualiza
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        props.addOrEditLink(values);
        setValues({ ...initialStateValues })//Intercambia nuevamente el estado al inicial
    }

    const getLinkById = async (id) => {
        const doc = await db.collection('links').doc(id).get();
        setValues({ ...doc.data() })
    }

    useEffect(() => {
        if (props.currentId === '') {
            setValues({ ...initialStateValues })
        } else {
            getLinkById(props.currentId)
        }
    }, [props.currentId])

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input type="text" className="form-control" placeholder="https://someurl.com" name="url" onChange={hadleInputChange} value={values.url}></input>
            </div>
            <br />
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input type="text" className="form-control" placeholder="Website Name" name="name" onChange={hadleInputChange} value={values.name}></input>
            </div>
            <br />
            <div className="form-groupo">
                <textarea name="description" rows="3" className="form-control" placeholder="Write a Description" onChange={hadleInputChange} value={values.description}></textarea>
            </div>
            <br />
            <button className="btn btn-primary btn-block">
                {props.currentId === '' ? 'Save' : 'Update'}
            </button>
        </form>
    )
}

export default LinkForm;