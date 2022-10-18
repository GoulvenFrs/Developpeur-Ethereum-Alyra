
import React from "react";
 
const Popup = props => {
  return (
    <div className="popup-box">
        {props.type==="error" &&
            <div className="box1">
                <button className="close-icon" onClick={props.handleClose}>x</button>
                <p className="popupTitle1" >Oopsi !</p>
                <p>It appears you're facing an issue :</p>
                <p className="popupError">{props.content}</p>
            </div>
        }
        {props.type==="registerVoter" &&
            <div className="box2">
                <button className="close-icon" onClick={props.handleClose}>x</button>
                <p className="popupTitle1">Well done !</p>
                <p>You're registration is in good way, you should soonly receive a Metamask notification !</p>
                <p className="popupTitle2">#JeSaisPasGérerLesEventAvecEthersJs</p>
            </div>
        }
        {props.type==="submitList" &&
            <div className="box2">
                <button className="close-icon" onClick={props.handleClose}>x</button>
                <p className="popupTitle1">Well done !</p>
                <p>The registration of your voters is in good way, you should soonly receive a Metamask notification !</p>
                <p  className="popupTitle2">#JeSaisPasGérerLesEventAvecEthersJs</p>
            </div>
        }
        {props.type==="openPropo" &&
            <div className="box2">
                <button className="close-icon" onClick={props.handleClose}>x</button>
                <p className="popupTitle1">Well done !</p>
                <p>The opening of the proposal phase is in good way, you should soonly receive a Metamask notification !</p>
                <p className="popupTitle2">#JeSaisPasGérerLesEventAvecEthersJs</p>
            </div>
        }
        {props.type==="submitPropo" &&
            <div className="box2">
                <button className="close-icon" onClick={props.handleClose}>x</button>
                <p className="popupTitle1">Well done !</p>
                <p>The registration of your proposal is in good way, you should soonly receive a Metamask notification !</p>
                <p  className="popupTitle2">#JeSaisPasGérerLesEventAvecEthersJs</p>
            </div>
        }
        {props.type==="closePropo" &&
            <div className="box2">
                <button className="close-icon" onClick={props.handleClose}>x</button>
                <p className="popupTitle1">Well done !</p>
                <p>The closing of the proposal phase is in good way, you should soonly receive a Metamask notification !</p>
                <p  className="popupTitle2">#JeSaisPasGérerLesEventAvecEthersJs</p>
            </div>
        }
        {props.type==="openVote" &&
            <div className="box2">
                <button className="close-icon" onClick={props.handleClose}>x</button>
                <p className="popupTitle1">Well done !</p>
                <p >The opening of the vote phase is in good way, you should soonly receive a Metamask notification !</p>
                <p className="popupTitle2">#JeSaisPasGérerLesEventAvecEthersJs</p>
            </div>
        }
        {props.type==="sendVote" &&
            <div className="box2">
                <button className="close-icon" onClick={props.handleClose}>x</button>
                <p className="popupTitle1">Well done !</p>
                <p >You're vote is in good way, you should soonly receive a Metamask notification !</p>
                <p className="popupTitle2">#JeSaisPasGérerLesEventAvecEthersJs</p>
            </div>
        }
        {props.type==="closeVote" &&
            <div className="box2">
                <button className="close-icon" onClick={props.handleClose}>x</button>
                <p className="popupTitle1">Well done !</p>
                <p >The closing of the vote phase is in good way, you should soonly receive a Metamask notification !</p>
                <p className="popupTitle2">#JeSaisPasGérerLesEventAvecEthersJs</p>
            </div>
        }
        {props.type==="findWinner" &&
            <div className="box2">
                <button className="close-icon" onClick={props.handleClose}>x</button>
                <p className="popupTitle1">Well done !</p>
                <p >The talliing of the vote is in good way, you should soonly receive a Metamask notification !</p>
                <p className="popupTitle2">#JeSaisPasGérerLesEventAvecEthersJs</p>
            </div>
        }
    </div>
  );
};
 
export default Popup;