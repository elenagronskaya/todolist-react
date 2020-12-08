import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { selectAlert} from '../../redux/alert/selectors';

import AddTodoList from '../../components/common/modal';
 

import {
    selectTodos,
    fetchTodos,
} from '../../redux/todo';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const TodosList = () => {
    const dispatch = useDispatch();
    const alert = useSelector(selectAlert);
    const [openAddTodoList, setOpenAddTodoList] = useState(false);
    
    
    const {
        loading,
        todos, 
        error} = useSelector(selectTodos);

    
    
    const handleClickOpen = () => {
        setOpenAddTodoList(true);
      };
      const handleClose = (e) => {
        setOpenAddTodoList(false);
        dispatch({type: 'REMOVE_ALERT'})
      };
    
    useEffect(() => {
       dispatch(fetchTodos());
    }, [dispatch]
    );

        if (loading){
            return <div>Loading...</div>
        }

        
        if (error){
            return <div>Error...</div>
        }
    

    return(
        <>
         <Grid container>
            {todos.map(({title, id, date}) => (
                <Grid item xs = {3} key ={id}>
                    <Card>
                        <CardActionArea component={Link} to={`/todos/${id}`}>
                            <CardContent>
                                <Typography variant="h5">{title}</Typography>
                                <Typography variant="caption" color="textSecondary">{moment(date).format('MM/DD/YYYY h:mm')}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
            <AddTodoList openAddTodoList={openAddTodoList} setOpenAddTodoList={setOpenAddTodoList}
            isUpdate={false} dispatchActionName={'ADD_TODO'} updateItem = {null}
            />
            
            <Button variant="contained" color="primary" onClick={handleClickOpen}>Add todo</Button>
        
        </Grid>
        <Snackbar open={alert.show}>
        <Alert onClose={handleClose} severity={alert.type}>
            {alert.msg}
        </Alert>
    </Snackbar>
    </>
    )
}

export default TodosList;