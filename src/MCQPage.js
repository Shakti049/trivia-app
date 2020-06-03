import React, { Component } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IconContext } from "react-icons";
import Button from '@material-ui/core/Button';
import "./MCQPage.css";

class MCQPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            questiondiv1: true,
            questiondiv2: false,
            resultPage: false,
            favCrickter: "",
            color1: "",
            color2: "",
            color3: "",
            color4: "",
            poper: false,
            storage: [],
            localStorage: [],
        };
    }

    nextQ = (page, value) => {
        const { color1, color2, color3, color4 } = this.state;
        if (value !== "") {
            if (page === "next") {
                this.setState({
                    questiondiv1: false,
                    questiondiv2: true,
                });
            } else if (page === "prev") {
                this.setState({
                    questiondiv1: true,
                    questiondiv2: false,
                });
            } else {
                this.setState({
                    questiondiv1: false,
                    questiondiv2: false,
                    resultPage: true,
                });
                let data = {};
                let temp = `${color1 === "" ? "" : `${color1},`} ${color2 === "" ? "" : `${color2},`} ${color3 === "" ? "" : `${color3},`} ${color4 === "" ? "" : `${color4},`}`;
                temp = temp.substring(0, temp.length -1);
                if (temp.charAt(temp.length -1) === ",") {
                    console.log("work");
                    temp = temp.substring(0, temp.length -1);
                }
                data = {
                    time: this.props.match.params.time,
                    name: this.props.match.params.id,
                    ans1: this.state.favCrickter,
                    ans2: temp,
                };
                localStorage.getItem("info") && this.state.localStorage.push(JSON.parse(localStorage.getItem("info")));
                this.state.localStorage && this.state.localStorage[0] && this.state.localStorage[0].map((x) => {
                    this.state.storage.push(x);
                });
                this.state.storage.push(data);
                localStorage.setItem("info", JSON.stringify(this.state.storage));
            }
            this.setState({
                poper: false,
            });
        } else {
            this.setState({
                poper: true,
            });
        }
    }

    check = () => {
        const { color1, color2, color3, color4 } = this.state;
        if (color1 === "" && color2 === "" && color3 === "" && color4 === "") {
            this.setState({
                poper: true,
            });
        } else {
            this.nextQ();
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    }

    history = () => {
        this.setState({
            resultPage: false,
            history: true,
        });
    }

    comma = () => {
        const { color1, color2, color3, color4 } = this.state;
        let temp = `${color1 === "" ? "" : `${color1},`} ${color2 === "" ? "" : `${color2},`} ${color3 === "" ? "" : `${color3},`} ${color4 === "" ? "" : `${color4},`}`;
        temp = temp.substring(0, temp.length -1);
        if (temp.charAt(temp.length -1) === ",") {
            console.log("work");
            temp = temp.substring(0, temp.length -1);
        }
        return temp;
    }

    render() {
        const { questiondiv1, questiondiv2, resultPage, favCrickter, history } = this.state;
        return (
            <div style={{ display: "flex", alignItems: "center", height: "100vh" }}>
                {
                    questiondiv1 && <div className="questiondiv1">
                        <div style={{ width: "10%", height: "100%" }}></div>
                        <div style={{ width: "75%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <h3 style={{ paddingTop: "40px" }}>Q1. Who is the best cricketer in the world ?</h3>
                            <div style={{ width: "25%", height: "60%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <div style={{ display: "flex", flexDirection: "row", height: "40px" }}>
                                    <input style={{ marginTop: "3px", marginRight: "10px" }} type="radio" name="favCrickter" value="Sachin Tendulkar" checked={this.state.favCrickter === "Sachin Tendulkar"} onChange={this.handleChange} />
                                    <p>Sachin Tendulkar</p>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", height: "40px" }}>
                                    <input style={{ marginTop: "3px", marginRight: "10px" }} type="radio" name="favCrickter" value="Virat Kohli" checked={this.state.favCrickter === "Virat Kohli"} onChange={this.handleChange} />
                                    <p>Virat Kohli</p>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", height: "40px" }}>
                                    <input style={{ marginTop: "3px", marginRight: "10px" }} type="radio" name="favCrickter" value="Adam Gilchrist" checked={this.state.favCrickter === "Adam Gilchrist"} onChange={this.handleChange} />
                                    <p>Adam Gilchrist</p>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", height: "40px" }}>
                                    <input style={{ marginTop: "3px", marginRight: "10px" }} type="radio" name="favCrickter" value="Jacques Kallis" checked={this.state.favCrickter === "Jacques Kallis"} onChange={this.handleChange} />
                                    <p>Jacques Kallis</p>
                                </div>
                            </div>
                            <div style={{ width: "25%", height: "20%"}}>
                                {
                                    this.state.poper && <p style={{color: "#ff3b3b"}}>Please select an option</p>
                                }
                            </div>
                        </div>
                        <div style={{ width: "10%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <IconContext.Provider value={{ className: "nextIcon" }}>
                                <div onClick={() => this.nextQ("next", favCrickter)}>
                                    <IoIosArrowForward />
                                </div>
                            </IconContext.Provider>
                        </div>
                    </div>
                }
                {
                    questiondiv2 && <div className="questiondiv1">
                        <div style={{ width: "10%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <IconContext.Provider value={{ className: "nextIcon" }}>
                                <div onClick={() => this.nextQ("prev")}>
                                    <IoIosArrowBack />
                                </div>
                            </IconContext.Provider>
                        </div>
                        <div style={{ width: "75%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
                            <h3 style={{ paddingTop: "40px" }}>Q2. What are the colors in the Indian national flag ?</h3>
                            <div style={{ width: "25%", height: "60%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <div style={{ display: "flex", flexDirection: "row", height: "40px" }}>
                                    <input style={{ marginTop: "3px", marginRight: "10px" }} type="radio" name="color1" value="White" checked={this.state.color1 === "White"} onChange={this.handleChange} />
                                    <p>White</p>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", height: "40px" }}>
                                    <input style={{ marginTop: "3px", marginRight: "10px" }} type="radio" name="color2" value="Yellow" checked={this.state.color2 === "Yellow"} onChange={this.handleChange} />
                                    <p>Yellow</p>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", height: "40px" }}>
                                    <input style={{ marginTop: "3px", marginRight: "10px" }} type="radio" name="color3" value="Orange" checked={this.state.color3 === "Orange"} onChange={this.handleChange} />
                                    <p>Orange</p>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", height: "40px" }}>
                                    <input style={{ marginTop: "3px", marginRight: "10px" }} type="radio" name="color4" value="Green" checked={this.state.color4 === "Green"} onChange={this.handleChange} />
                                    <p>Green</p>
                                </div>
                            </div>
                            <div style={{ width: "25%", height: "20%"}}>
                                {
                                    this.state.poper && <p style={{color: "#ff3b3b"}}>Please select an option</p>
                                }
                            </div>
                        </div>
                        <div style={{ width: "10%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Button variant="contained" color="primary" onClick={() => this.check()}>
                                Done
                            </Button>
                        </div>
                    </div>
                }
                {
                    resultPage && <div className="questiondiv1">
                        <div style={{ width: "10%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}></div>
                        <div style={{ width: "75%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <h3 style={{marginTop: "20px"}}>Summary</h3>
                            <div style={{ height: "50%", width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: "40px" }}>
                                <h4 className="answer">Q1. Who is the best cricketer in the world ?</h4>
                                {favCrickter}
                                <h4 className="answer">Q2. What are the colors in the Indian national flag ?</h4>
                                {this.comma()}
                            </div>
                            <div style={{ width: "100%", height: "20%", display: "flex", flexDirection: "row", alignItems: "flex-end"}}>
                                <Button variant="contained" size="small" onClick={() => this.history()}>
                                    History
                                </Button>
                                <div style={{flex:1}}></div>
                                <Button variant="contained" color="primary" size="small" onClick={() => this.props.history.push("/")}>
                                    Finish
                                </Button>
                            </div>
                        </div>
                        <div style={{ width: "10%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}></div>
                    </div>
                }
                {
                    history && <div style={{ height: "100vh", width: "100vw", backgroundColor: "rgb(253, 253, 253)" }}>
                        <div style={{ height: "10%", width: "100%", display: "flex", alignItems: "center", backgroundColor: "rgb(163, 221, 255)", boxShadow: "0px 0px 5px black" }}>
                            <h1 style={{ marginLeft: "5%" }}>History</h1>
                            <div style={{flex:1}}></div>
                            <div style={{marginRight: "30px"}}>
                                <Button variant="contained" color="primary" size="small" onClick={() => this.props.history.push("/")}>
                                    Home
                                </Button>
                            </div>
                        </div>
                        <div style={{ height: "90%", width: "95%", overflow: "auto", marginLeft: "5%" }}>
                            {
                                this.state.storage.map((x, i) => <div key={i} style={{height: "30%", width: "60%", borderBottom: "1px solid grey", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                                    <div style={{display: "flex", flexDirection: "row", height: "30px"}}><h4>Game {i + 1} : </h4>{ x.name}</div>
                                    <div style={{display: "flex", flexDirection: "row", height: "30px"}}><h4>Name : </h4>{ x.time}</div>
                                    <div style={{height: "50px"}}><h4>Q1. Who is the best cricketer in the world ? </h4> {x.ans1}</div>
                                    <div style={{height: "50px"}}><h4>Q2. What are the colors in the Indian national flag ? </h4> {x.ans2}</div>
                                </div>)
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default MCQPage;