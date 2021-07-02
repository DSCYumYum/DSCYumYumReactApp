import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "10%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  reviewList: {
    margin: "0px 10vw",
    color: "red"
  },
}));

function getInfo(text) {
  axios
    .post("http://localhost:3001/", {
      text: text,
    })
    .then((res) => {
      console.log(text);
      console.log(res);
    });
}

function Review({ title }) {
  const classes = useStyles();

  var [text, setText] = useState("");
  var [info, setInfo] = useState([]);

  function getInfo(text) {
    axios
      .post("http://localhost:3001/", {
        text: text,
      })
      .then((res) => {
        setInfo(res.data);
      });
  }

  useEffect(() => {
    console.log("성공이야 제발");
    getInfo(title);
  }, [title]);

  return (
    <div className={classes.root}>
      <div style={titleStyle}>
        <FontAwesomeIcon
          icon={faSearchLocation}
          style={{
            color: "#238cfa",
            paddingRight: "10px",
          }}
        />
        <span>{title} 에브리타임 리뷰</span>
      </div>

      <div>
        <Paper className={classes.reviewList}>
          {info.map((v, i) => {
            if (title === "") return "";
            return (
              <Accordion key={i}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Review {i + 1}
                  </Typography>
                  <Typography className={classes.secondaryHeading}>
                    {v.substring(0, 30)}...
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <Divider></Divider>
                    <br></br>
                    {v}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Paper>
      </div>
    </div>
  );
}

const titleStyle = {
  display: "flex",
  alignItems: "center",
  margin: "5vh 0 2vh 10vw",
  fontFamily: "Do Hyeon",
  fontSize: "30px",
};

export default Review;
