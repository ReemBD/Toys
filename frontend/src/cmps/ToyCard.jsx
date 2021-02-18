import React from 'react';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { utilService } from '../services/utilService.js'
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

 function SimpleCard({ toy, onRemoveToy, loggedinUser }) {
    const bull = <span className={'bullet'}>•</span>;
    const { name, type, createdAt, price } = toy
    return (
        <Card className={'card-preview flex space-between'}>
            <div className="card-details">
                <CardContent>
                    <Typography className={'type'} color="textSecondary" gutterBottom>
                                              {type}

                    </Typography>
                    <Typography variant="h5" component="h2">
                    {name} 
                    </Typography>
                    <Typography className={'pos'} color="textSecondary">
                        {price}$
                    </Typography>
                    <Typography variant="body2" component="p">
                        Created At {utilService.formatTime(createdAt)}
                        <br />
                    </Typography>

                </CardContent>
                <CardActions>
                    <Button size="small"> <Link to={`/toy/${toy._id}`}>See More</Link></Button>
                    {loggedinUser?.isAdmin && <Button onClick={() => { onRemoveToy(toy) }}>Delete</Button>}
                    {loggedinUser?.isAdmin && <Button className="edit-btn" ><Link to={`/edit/${toy._id}`}>Edit</Link></Button>}
                </CardActions>
            </div>
            <img src={toy.imgUrl} alt="" />
        </Card>
    );
}

const mapStateToProps = state => {
    const {loggedinUser} = state.user
    return {
        loggedinUser
    }
}

export default connect(mapStateToProps)(SimpleCard)