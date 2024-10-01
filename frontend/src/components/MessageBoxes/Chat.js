import React from 'react'
import './Chat.css'
 
function Chat() {
    return (
        <div>
            <div className="message-window">
                <div className="visible-messages">
                    <div className="other-message-row">
                        <div className="other-message-box">
                            hi
                        </div>
                    </div>
                    <div className="self-message-row">
                        <div className="self-message-box">
                            hi
                        </div>
                    </div>
                    <div className="other-message-row">
                        <div className="other-message-box">
                            how are you?
                        </div>
                    </div>
                    <div className="self-message-row">
                        <div className="self-message-box">
                            im good
                        </div>
                    </div>
                    <div className="self-message-row">
                        <div className="self-message-box">
                            you?
                        </div>
                    </div>
                    <div className="other-message-row">
                        <div className="other-message-box">
                            a hopeless romantic all my life surrunded by couples all the time i guess i should take it as a sign oh why oh why oh why oh why
                            im feeling lonely oh i wish id find a lover that could hold me now im crying in my room so skeptical of love say it say it but still
                            i want it more more more i gave a second chance to cupid but now im left here feeling stupid oh the way he makes me feel that love isnt
                            real cupid is so dumb
                        </div>
                    </div>
                    <div className="other-message-row">
                        <div className="other-message-box">
                            i look for his arrows every day i guess he got lost or flew away waiting around is a waste been counting the days since november is loving
                            as good as they say im feeling lonely oh i wish id find a lover that could hold me now im crying in my room so skeptical of love say it say
                            but still i want it more more more i gave a second chance to cupid but now im left here feeling stupid oh the way he makes me feel that love
                            isnt real cupid is so dumb
                        </div>
                    </div>
                    <div className="self-message-row">
                        <div className="self-message-box">
                            on god brotha
                        </div>
                    </div>
                    <div className="self-message-row">
                        <div className="self-message-box">
                            anyway you said you wanted to learn geometry?
                        </div>
                    </div>
                    <div className="other-message-row">
                        <div className="other-message-box">
                            i sure did
                        </div>
                    </div>
                    <div className="other-message-row">
                        <div className="other-message-box">
                            you go to utd right? wanna meet up at SU soon
                        </div>
                    </div>
                    <div className="self-message-row">
                        <div className="self-message-box">
                            im a bit busy, maybe we could meet online instead?
                        </div>
                    </div>
                    <div className="self-message-row">
                        <div className="self-message-box">
                            we could try a teams meeting or smt
                        </div>
                    </div>
                </div>
            </div>
            <div className="chat-box">
                <input type="text" id="text" placeholder="Message..." autoComplete="off"/>
            </div>
        </div>
    )
}

export default Chat