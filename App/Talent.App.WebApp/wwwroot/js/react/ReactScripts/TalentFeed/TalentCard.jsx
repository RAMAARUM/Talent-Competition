import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import { Popup, Icon, Card, Image, Button, Segment, Label } from 'semantic-ui-react'

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            talent: "",
            profileDisplay: false
        }
        this.handleProfileSwap = this.handleProfileSwap.bind(this)
        this.handleVideoSwap = this.handleVideoSwap.bind(this)
    };
    componentDidMount() {
        this.loadData()
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getTalent',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let jobSeekers = [];
                if (res.data) {
                    jobSeekers = res.data
                }
                this.updateWithoutSave(jobSeekers)
            }.bind(this),
            error: function (res) {
                console.log(res.status + "status")
            }
        })
    }

    updateWithoutSave(jobSeekers) {
        this.setState({
            talents: jobSeekers
        })
    }
    handleProfileSwap() {
        this.setState({
            profileDisplay: true
        })

    }
    handleVideoSwap() {
        this.setState({
            profileDisplay: false
        })

    }

    render() {
        const { talents } = this.state;
        
        return (
            <div>
                {talents ?
                    <Card.Group fluid>
                        {talents.map(talent => (
                            <Card fluid>
                                <React.Fragment>
                                    <Card.Content>
                                        <Card.Header>
                                            {talent.name}
                                            <div className="ui right floated">
                                                <Icon name='star' corner=' top right' />
                                            </div>
                                        </Card.Header>
                                    </Card.Content>
                                    <Card.Description fluid >
                                        {this.state.profileDisplay ?
                                            <React.Fragment>
                                                <div className="ui grid segment">
                                                    <Image wrapped size='medium' src='/images/rachel.png' />
                                                    <div>
                                                        <h3>Talent snapshots</h3>
                                                        <br />
                                                        <strong>CURRENT EMPLOYER</strong>
                                                        <br />
                                                        {talent.currentEmployment}
                                                        <br />
                                                        <br />
                                                        <strong>VISA STATUS</strong>
                                                        <br />
                                                        {talent.visa}
                                                        <br />
                                                        <br />
                                                        <strong>POSITION</strong>
                                                        <br />
                                                        {talent.level}
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <div className="ui grid segment">
                                                    <video width="540" controls>
                                                    </video>
                                                </div>
                                            </React.Fragment>}
                                    </Card.Description>

                                    <Card.Description fluid>

                                        <div className="ui grid ">
                                            <div className="four wide column">
                                                {this.state.profileDisplay ?
                                                    <Icon name='video' size='big' onClick={this.handleVideoSwap} />
                                                    :
                                                    <Icon name='user' size='big' onClick={this.handleProfileSwap} />
                                                }
                                            </div>

                                            <div className="four wide column">
                                                <Icon name='file pdf outline' size='big' />
                                            </div>

                                            <div className="four wide column">
                                                <Icon name='linkedin' size='big' />
                                            </div>
                                            <div className="ui right floated two wide column">
                                                <Icon name='github' size='big' />
                                            </div>
                                        </div>
                                        <br />
                                    </Card.Description>

                                    <Card.Content extra>
                                        <Label basic color="blue" >  {talent.skills[0]} </Label>
                                    </Card.Content>
                                </React.Fragment>

                            </Card>))
                        }

                    </Card.Group>
                    : null}
            </div>
        )
    }
}

