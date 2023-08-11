import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
    })
}));

interface CardComponentProps {
    item: {
        picture?: {
            large?: string;
        };
        name?: {
            first?: string;
            last?: string;
            title?: string;
        };
        id?: {
            value: string;
        };
        // Other properties of the 'item' object
    };
    deleteCard?: (item: {
        picture?: {
            large?: string;
        };
        name?: {
            first?: string;
            last?: string;
            title?: string;
        };
        id?: {
            value: string;
        };
        // Other properties of the 'item' object
    }) => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ item, deleteCard }) => {
    return (
        <Card
            sx={{
                width: 300,
                background: "#202124",
                boxShadow: "1px 2px 2px silver"
            }}
        >
            <CardMedia
                component="img"
                height="194"
                image={item?.picture?.large}
                alt="Paella dish"
            />
            <CardContent>
                <Typography
                    style={{
                        fontSize: "20px",
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#fff"
                    }}
                    variant="body2"
                    color="text.secondary"
                >
                    {item.name?.title} {item.name?.first} {item.name?.last}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton sx={{ width: "100%" }} aria-label="share">
                    <Stack sx={{ width: "100%" }} direction="row">
                        <Button
                            onClick={() => {
                                if (deleteCard) {
                                    deleteCard(item);
                                }
                            }}
                            sx={{ width: "100%", background: "rgb(136, 156, 231);" }}
                            variant="contained"
                        >
                            Delete
                            <DeleteIcon />
                        </Button>
                    </Stack>
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default CardComponent;
