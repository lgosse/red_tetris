import React from "react";
import { connect } from "react-redux";
import Side from "../../components/game/Side";
import Grid from "./Grid";


export const Game = ({party, player}) => {
    const maptest = [
        [0,0,1,1,1,1,1,1,1],
        [0,0,1,1,1,1,1,1,1],
        [1,0,0,1,0,1,1,1,1],
        [0,0,0,1,1,1,1,1,1],
        [0,0,1,1,1,1,1,1,1],
        [0,0,0,1,1,1,1,1,1],
        [0,0,1,1,1,1,1,1,1],
        [0,0,1,1,1,1,1,1,1],
        [1,0,0,1,0,1,1,1,1],
        [0,0,0,1,1,1,1,1,1],
        [0,0,1,1,1,1,1,1,1],
        [0,0,1,1,1,1,1,1,1],
        [1,0,0,1,0,1,1,1,1],
        [1,1,0,1,0,0,1,1,1]
     ];
      
    party.players = [
        {
          nickname: 'Lucas',
          map: maptest
        },
        {
          nickname: 'Thomas',
          map: maptest
        },
        {
          nickname: 'Aymée',
          map: maptest
        },
        {
          nickname: 'Otmane',
          map: maptest
        }
    ];
    return (
        <div style={{width: '100%'}}>
            <div style={{width: '100%'}}>(Nom){party.name}</div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Grid party={party} player={player} />
                <Side players={party.players} />
            </div>
        </div>
    );
};


export const mapStateToGameProps = state => {
    return {
      party: state.party,
      player: state.player
    };
  };
  
export const mapDispatchToGameProps = dispatch => {
    return {};
};
  
export default connect(mapStateToGameProps, mapDispatchToGameProps)(
    Game
);