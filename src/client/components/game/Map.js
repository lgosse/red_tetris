import React from "react";
import global from "../../styles/global";

const Map = (props) => {
    const mapVoid = {
        width: '5px',
        height: '5px',
        marginLeft: '1px',
        marginTop: '1px'
    };
    const mapItem = {
        width: '5px',
        height: '5px',
        backgroundColor: global.color.accent,
        marginLeft: '1px',
        marginTop: '1px'
    };

    const lines = props.map.map((line, i) => {
        const cols = line.map((col, j) => {
            return (
            <div
                style= { col == 0 ? mapVoid : mapItem }
                key= {j}>
            </div>
            );
        });
        return <div key={i} style={{ display: 'flex' }}>{cols}</div>;
    });

    return (
        <div style={ {padding: '2px', backgroundColor: 'rgba(0, 0, 0, 0.2)'} }>
            {lines}
        </div>
    );
};

export default Map;