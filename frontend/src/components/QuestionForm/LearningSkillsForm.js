import { useState, useRef, useEffect } from "react"
import "animate.css"

const LearningSkillsForm = () => {
    const [Tab, setTab] = useState("browse")
    const [contentHeight, setContentHeight] = useState(0);
    const contentRef = useRef(null);

    const handleTab = (tab) => {
        setTab(tab);
    }

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.clientHeight + 80); 
        }
    }, [Tab]);

    return(
        <div className="questionaireCard c" style={{ height: contentHeight }}>
            <div className="tabs c">
                <div className={`tab c left ${Tab === "browse" ? 'active' : ''}`}>
                    <button className="" onClick={()=>handleTab("browse")}>
                        <p className="tabTitle c">Add by Category</p>
                    </button>
                </div>
                <div className={`tab c right ${Tab === "custom" ? 'active' : ''}`}>
                    <button className={Tab=="custom" ? 'active' : ''} onClick={()=>handleTab("custom")}>
                        <p className="tabTitle c">Add Custom skill</p>
                    </button>
                </div>      
            </div>
            <div className="tabContent c " ref={contentRef}>
            {Tab === 'browse' && (
                    <div className="animate__animated animate__fadeIn animate__delay-2s c">
                        <div className="dropdownTitle c">
                            <p className="dropdownText c">By Category</p>
                            <select className="dropdown c">
                                <option value="rating c">Highest Rating</option>
                                <option value="alphabetical c">Alphabetical</option>
                            </select>
                        </div>
                        <div className="dropdownTitle c">
                            <p className="dropdownText c" >By Name</p>
                            <select className="dropdown c">
                                <option value="rating c">Highest Rating</option>
                                <option value="alphabetical c">Alphabetical</option>
                            </select>
                        </div>
                        <div className="dropdownTitle c">
                            <label className="c dropdownText" htmlFor="Name">Skill Description</label>
                            <input className="c dropdown" type="text" placeholder='enter description' name="Description" required
                            />
                        </div>
                    </div>
                )}
            {Tab === 'custom' && (
                    <div className="animate__animated animate__fadeIn animate__delay-2s c">
                        <div className="dropdownTitle c">
                        <label className="c dropdownText" htmlFor="Name">Skill Name</label>
                        <input className="c dropdown" type="text" placeholder='enter skill' name="Name" required
                            />
                        </div>
                        <div className="dropdownTitle c">
                            <label className="c dropdownText" htmlFor="Name">Skill Description</label>
                            <input className="c dropdown" type="text" placeholder='enter description' name="Description" required
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LearningSkillsForm