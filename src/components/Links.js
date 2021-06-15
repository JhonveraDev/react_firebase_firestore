import React, { useEffect, useState } from 'react'
import LinkForm from './LinkForm'
import { toast } from 'react-toastify';

import { db } from '../config/firebase';

const Links = () => {

    const [links, setLinks] = useState([])
    const [currentId, setCurrentId] = useState('')

    //Funcion para guardar datos 
    const addOrEditLink = async (linkObject) => {
        // console.log(linkObject)
        //Guardar en Base de datos

        if (currentId === '') {
            await db.collection('links').doc().set(linkObject)
            toast('New Link added', { type: 'success', autoClose: 2000 })
        } else {
            await db.collection('links').doc(currentId).update(linkObject)
            toast('Update Link', { type: 'info', autoClose: 2000 })
            setCurrentId('');

        }
    }

    const onDeleteLink = async (id) => {
        // console.log(id)
        if (window.confirm('are you sure want to delete this link?')
        ) {
            await db.collection('links').doc(id).delete();
            toast.error('Link Delete', { type: 'error', autoClose: 2000 })
        }
    }

    const getLinks = async () => {
        db.collection('links').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                console.log(doc.data())
                console.log(doc.id)
                docs.push({ ...doc.data(), id: doc.id })
            })
            setLinks(docs);
        });
    }

    useEffect(() => {
        getLinks();
        console.log('Obteniendo datos')
    }, []);

    return (
        <div>
            <div className="col-md-4 p-2">
                <LinkForm {...{ addOrEditLink, currentId, links }}></LinkForm>
            </div>
            <div className="col-md-8 p-2">
                {links.map(link => (
                    <div className="card mb-1" key={link.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4>{link.name}</h4>
                                <div>
                                    <i className="material-icons text-danger" onClick={() => onDeleteLink(link.id)}>close</i>
                                    <i className="material-icons" onClick={() => setCurrentId(link.id)}>create</i>
                                </div>
                            </div>
                            <p>{link.description}</p>
                            <a href={link.url} target="_blank" rel="noreferrer">Go to Website</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Links;