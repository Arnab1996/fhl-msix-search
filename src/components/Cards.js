import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "../App.css";
import {Grid} from "@mui/material";

export default function MediaCard(Header, Text, Page) {

    return (
        <Card sx={{alignSelf: 'center', width: '70%', maxWidth: 895}} variant="outlined">
            <CardMedia
                component="img"
                height="140"
                image={require(`../static/images/${Page % 4}.jpg`)}
                alt={`${Page} Card`}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" align="center">
                    {Header.split(".")[0]}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    <Grid item xs>
                        <div className="display-linebreak">
                            <pre>
                                {Text}
                            </pre>
                        </div>
                    </Grid>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}
