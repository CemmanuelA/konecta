import React, { Component } from 'react'
import { Grid, Button, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './productList.scss';
import { withRouter } from 'react-router-dom';

class productList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
        this.getProducts();
    }

   /*  componentDidUpdate() {
        this.getProducts();
    } */
    getProducts = () => {
        fetch('http://localhost/proyectos/inventory-back/product/read.php')
        .then(function(response) {
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson);
         this.setState({
             products: myJson
         })
        });
    }

    handleNavigate = () => {
        this.props.history.push('/producto');
    }

    handleEdit = (product) => {
        console.log(product);
        this.props.history.push({
            pathname:"/producto",
            state:{
                ...product
            } 
        });
    }

    render() {
        return (
            <Grid className="list-container" container  justify="center" alignItems="center">
                <Grid item  xs={10}> 
                    <Button variant="contained" color="primary" onClick={() => this.handleNavigate()}>
                        Crear producto
                    </Button>
                </Grid>
                <Grid item xs={10}>
                {
                     this.state.products.length ?
                     this.state.products.map( (product, index) => (
                         <ListItem key={product.name + index} divider>                        
                             <ListItemText >
                                 <Grid container spacing={1}>
                                     {/* Description */}
                                     <Grid item xs={4} container direction="column" justify="center">
                                         <h4>Nombre</h4>
                                         <p>{product.name}</p>
                                     </Grid>
                                     {/* Price */}
                                     <Grid item xs={2} container direction="column" justify="center">
                                         <h4>Precio</h4>
                                         <p>{product.price}</p>
                                     </Grid>
                                     <Grid item xs={2} container direction="column" justify="center">
                                         <h4>Referencia</h4>
                                         <p>{product.ref}</p>
                                     </Grid>
                                     {/*Amount */}
                                     <Grid item xs={2} container direction="column" justify="center">
                                         <h4>Stock</h4>
                                         <p>{product.stock}</p>
                                     </Grid>
                                 </Grid>
                             </ListItemText>
                             <ListItemSecondaryAction>
                                 <IconButton edge="end" aria-label="Edit" onClick={ () => this.handleEdit(product)}>
                                     <EditIcon />
                                 </IconButton>
                                 <IconButton edge="end" aria-label="delete">
                                     <DeleteIcon />
                                 </IconButton>
                             </ListItemSecondaryAction>
                         </ListItem>
                     ))
                     :
                     <h3> No hay productos en el carrito</h3>
                }
                </Grid>
            </Grid>
        )
    }
}

export default withRouter(productList);