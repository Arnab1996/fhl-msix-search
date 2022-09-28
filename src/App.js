import {React, useState} from "react";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import useFetch from "./hooks/useFetch";
import ResponsiveAppBar from "./components/AppBar";
import Logo from './static/images/MSIX.jpg'
import "./App.css";
import Footer from "./components/Footer";
import {Grid, Paper, Stack} from "@mui/material";
import Divider from '@mui/material/Divider';
import Box from "@mui/material/Box";
import MediaCard from "./components/Cards";
import Animations from "./components/Variants";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import Typography from "@mui/material/Typography";

function App() {
    const {data, setData} = useFetch();
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignSelf: 'center',
                '& > :not(style)': {
                    m: 1,
                    width: '100%',
                    height: '95%',
                },
            }}
        >
            <div className="main">
                <ResponsiveAppBar/>
                <img
                    width={264}
                    height={164}
                    src={Logo}
                    alt="MSIX logo"
                    loading="lazy"
                />
                <h1>MSIX Smart Search</h1>
                <div className="search">
                    <br/>
                    <Grid sx={{flexGrow: 1}} container wrap="nowrap" spacing={1}>
                        <Grid item xs={30}>
                            <TextField
                                id="outlined-basic"
                                type="search"
                                placeholder="Search for MSIX issues"
                                value={data.slug}
                                onChange={
                                    (e) => {
                                        setData({...data, slug: e.target.value});
                                        setPage(1);
                                    }
                                }
                                fullWidth
                                label="Search"
                            />
                        </Grid>
                        <Grid item xs={2} m={1}>
                            <Tooltip title="Search">
                                <IconButton>
                                    <SearchIcon/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </div>
                <br/>
                <Divider variant="middle" style={{width: '80%'}}/>
                <br/>

                {(() => {
                    if (data.results.value !== undefined && data.results.value.length > 0) {
                        return MediaCard(data.results.value.length > 0 ?
                                data.results.value[page - 1].metadata_storage_name : "Default Header",
                            data.results.value[page - 1].content,
                            page
                        )
                    } else {
                        return <Animations/>
                    }
                })()}

                <br/>

                <div className="footer">

                    {(() => {
                        if (data.results.value !== undefined && data.results.value.length > 0) {
                            return <>
                                <Box component="span" mt={2} sx={{p: 2, border: '2px dashed grey'}}>
                                    <Stack spacing={2}>
                                        <Typography variant="overline" display="block" gutterBottom>Search
                                            accuracy: {parseFloat(data.results.value[page - 1]["@search.score"]).toFixed(2)}</Typography>
                                        <Pagination count={data.results.value.length} variant="outlined"
                                                    color="secondary" shape="rounded"
                                                    onChange={handleChange}/>
                                    </Stack>
                                </Box>
                            </>
                        }
                    })()}
                    <Footer/>
                </div>
                <Typography variant="body2" color="text.secondary">
                    <Grid item xs>
                        （・⊝・） Made for FHL purpose only (=^ェ^=)
                    </Grid>
                </Typography>
                <Divider variant="middle" style={{width: '80%'}}/>
            </div>
            <Paper elevation={24}/>
        </Box>
    );
}

export default App;