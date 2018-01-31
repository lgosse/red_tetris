import React from "react";
import global from "../../styles/global";

const Map = (props) => {
    const mapItem = {
        width: '5px',
        height: '5px',
        backgroundColor: global.color.accent
    };

    const lines = props.map.map((line, i) => {
        const cols = line.map((col, j) => {
            return (
            <td
                style= { col == 0 ? null : mapItem }
                key= {j}>
            </td>
            );
        });
        return <tr key={i} >{cols}</tr>;
    });

    return (
        //TABLE INTERDIT ?????????
        <table style={ {padding: '2px', borderSpacing: '1px', backgroundColor: 'rgba(0, 0, 0, 0.2)'} }>
            <tbody>
                {lines}
            </tbody>
        </table>
    );
};

export default Map;