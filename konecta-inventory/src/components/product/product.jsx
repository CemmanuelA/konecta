import React, { Component } from 'react'
import { Grid, Button } from '@material-ui/core';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MyTextField, MySelectField } from '../shared/textField/textField';

import './product.scss';
import { withRouter } from 'react-router-dom';

 class product extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            name: '',
            ref: '',
            price: '',
            weight: '',
            category: '',
            stock: '',
        }
    }
     
    categoryList = [
        {
            label: 'Cuidado', value: 1
        },
        {
            label: 'Belleza', value: 2
        },
        {
            label: 'Medicamentos', value: 3
        }
    ]
     errorSchema = Yup.object().shape({
        name: Yup.string()
        .min(3,'Muy corto')
        .required('Campo requerido'),
        ref: Yup.string()
        .min(6, 'Mínimo 6 caracteres')
        .required('Campo requerido'),
        price: Yup.number()
        .typeError('El precio debe ser un número')
        .required('Campo requerido'),
        weight: Yup.number()
        .typeError('El precio debe ser un número')
        .required('Campo requerido'),
        category: Yup.string()
        .required('Campo requerido'),
        stock: Yup.number()
        .typeError('La cantidad debe ser un número')
        .required('Campo requerido')

    });

    handleCreate = (values) => {
        console.log('crear');
        console.log(values);
        const url = 'http://localhost/proyectos/inventory-back/product/insert.php';
        values.category = this.categoryList.find( category => category.value === values.category);
        const data = values;

        fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
        
    }
    handleUpdate = () => {
        console.log('update');
    }
    handleDelete = () => {
        console.log('Eliminar');
    }
    render() {
        return (
           <Grid className="form-container" container justify="center">
               <Grid item xs={10}>
                    <Formik
                            initialValues={this.props.location.state || this.initialState}
                            validationSchema={this.errorSchema}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                setSubmitting(true);
                                if (!this.props.location.state) {
                                    this.handleCreate(values);
                                    resetForm(this.initialState);
                                }
                                 else { 
                                     this.handleUpdate(values);
                                 }
                                 setSubmitting(false);
                            }}
                        >
                            {({ values, errors, isSubmitting })=> (
                                <Form autoComplete="off">
                                    <h2 style={{textAlign: "center"}}>
                                        {
                                            !this.props.location.state ?
                                            'Crear producto' :
                                            'Actualizar producto'
                                        }
                                    </h2>
                                    <Grid container direction="column" spacing={4} >
                                        <Grid item >
                                            <MyTextField label="Nombre" 
                                                type="text" 
                                                name="name"/>
                                        </Grid>

                                        <Grid item>
                                            <MyTextField label="Referencia" type="text" name="ref"/>
                                        </Grid>

                                        <Grid item>
                                            <MyTextField label="Precio" type="text" name="price"/>
                                        </Grid>

                                        <Grid item>
                                            <MyTextField label="Peso (g)" type="text" name="weight"/>
                                        </Grid>

                                        <Grid item xs>
                                            <MySelectField label="category" name="category" items={this.categoryList} />
                                        </Grid>

                                        <Grid item>
                                            <MyTextField label="Stock" type="text" name="stock"/>
                                        </Grid>

                                        <Grid container direction="row" justify="flex-end" spacing={2} className="mt-2">
                                            <Grid item className="btn-container">
                                                    <Button variant="contained"  disabled={isSubmitting} color="primary" type="submit">
                                                       {
                                                           !this.props.location.state ?
                                                           'Crear producto' :
                                                           'Actualizar producto'
                                                       }
                                                    </Button>
                                            </Grid>
                                            {
                                                this.props.location.state ?
                                                <Grid item className="btn-container">
                                                    <Button variant="contained"  color="secondary" type="button" onClick={ () => this.handleDelete()}>
                                                        Eliminar
                                                    </Button>
                                                </Grid> :
                                                null
                                            }
                                             <Grid item className="btn-container">
                                                    <Button  color="primary" type="button" onClick={ () => this.props.history.push('/inventario')}>
                                                        Inventario
                                                    </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}

                        </Formik>
               </Grid>
           </Grid>
        )
    }
}

export default withRouter(product);