import React, { Component } from 'react';

import './custom.css'

import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;


export default class App extends Component {

    constructor() {
        super();
        this.state = { data: [], loading: false };
    }
    
    doSearch = (e) => {
        
        const searchBox = $("#SearchBox");
        const q = searchBox.val();
        
        this.populateData(q);
        
        searchBox.val("");
    }

    renderDataTable = () => {

        let data = [];
        if (this.state.data.length > 0) 
            data = JSON.parse(this.state.data);
        
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    <th>Images</th>
                </tr>
                </thead>
                <tbody>
                {data.map(d =>
                    <tr key={d.id}>
                        <td>
                            <div style={{'width':'100%','height':0,'padding-bottom':'56%','position':'relative'}}>
                                <iframe src={d.embed_url} 
                                        style={{'position':'absolute','width':'100%','height':'100%'}} frameBorder="0" className="giphy-embed"
                                        allowFullScreen />
                            </div>
                            <br/>
                            <a target="_blank" href={'mailto:somebody@somewhere.com?subject=I Love this&body=' + d.url}>SHARE THIS</a>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }

    async populateData(q) {
        $("#loading").css("display","inline-block");
        const response = await fetch('/api/search/' +q);
        const data = await response.json();
        this.setState({ data: JSON.stringify(data.data), loading: true });
    }
    
    render () {
        $("#loading").css("display","none");
        return (
            <div>
                <input type="text" id="SearchBox" name="SearchBox"  /> &nbsp;&nbsp;<button onClick={this.doSearch}>SEARCH</button>
                &nbsp;&nbsp; <img alt="loading" id="loading" style={{'display':'none','height' : '50px','position':'absolute'}} src="loading.webp" />
                <br/><br/>
                <div id="resultDiv">
                    {this.renderDataTable()}
                </div>
               
            </div>
        );
    }

}
